"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { REGEXP_ONLY_DIGITS } from "input-otp";
import { ResendOTPButton } from "@/components/features/auth/resend-otp-button";
import {
  RegisterInternApiSchema,
  RegisterInternFormSchema,
  VerifyAccountFormSchema,
} from "@/lib/validation/auth";

import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";

import { matchInternToSupervisor } from "@/lib/api/supervisor";
import { CircleAlert } from "lucide-react";
import { isAxiosError } from "axios";
import { verifyAccount } from "@/lib/api/auth";

type VerifyAccountFormProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const VerifyAccountForm = ({ setOpen }: VerifyAccountFormProps) => {
  const queryClient = useQueryClient();

  const signupData = queryClient.getQueryData<
    z.infer<typeof RegisterInternApiSchema>
  >(["signupData"]);

  const router = useRouter();

  // const { isInitialLoading, isError, data, error, refetch, isFetching } =
  //   useQuery({
  //     queryKey: ["matchIntern"],
  //     queryFn: matchInternToSupervisor,
  //     enabled: !!signupData,
  //   });

  const form = useForm<z.infer<typeof VerifyAccountFormSchema>>({
    resolver: zodResolver(VerifyAccountFormSchema),
    defaultValues: {
      code: "",
    },
  });

  function onSubmit(formData: z.infer<typeof VerifyAccountFormSchema>) {
    mutation.mutate(formData, {
      onSuccess: (data) => {
        setOpen(false);

        router.push("/login");
      },
      onError: (error) => {
        console.log(error);

        if (isAxiosError(error)) {
          if (error.status === 401) {
            toast(
              <div className="flex items-start gap-3 font-sans">
                <CircleAlert className="text-error-base" />

                <div className="flex flex-col gap-2.5 text-sm leading-5">
                  <span className="text-foreground font-medium">
                    Invalid Email or Password.
                  </span>
                  <span className="text-foreground/75 font-normal">
                    Please check your credentials and try again.
                  </span>
                </div>
              </div>,
              {
                classNames: {
                  toast: "!bg-error-light",
                },
                position: "top-center",
              }
            );
          } else {
            toast(
              <div className="flex items-start gap-3 font-sans">
                <CircleAlert className="text-error-base" />

                <div className="flex flex-col gap-2.5 text-sm leading-5">
                  <span className="text-foreground font-medium">
                    Something went wrong.
                  </span>
                  <span className="text-foreground/75 font-normal">
                    Please try again later.
                  </span>
                </div>
              </div>,
              {
                classNames: {
                  toast: "!bg-error-light",
                },
                position: "top-center",
              }
            );
          }
        }
      },
    });
  }

  const mutation = useMutation({
    mutationFn: verifyAccount,
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 w-full flex flex-col items-center"
      >
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputOTP
                  autoFocus
                  maxLength={6}
                  pattern={REGEXP_ONLY_DIGITS}
                  onComplete={form.handleSubmit(onSubmit)}
                  {...field}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <p className="text-sm">
          {"Didn't"} get a code?{" "}
          <ResendOTPButton className="text-muted-foreground" />
        </p>

        <Button
          type="submit"
          disabled={mutation.isPending}
          className="w-full text-foreground font-medium rounded-3xl cursor-pointer"
        >
          Verify my account
        </Button>
      </form>
    </Form>
  );
};
