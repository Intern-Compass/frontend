"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { useMutation } from "@tanstack/react-query";

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

import { REGEXP_ONLY_DIGITS } from "input-otp";
import { ResendOTPButton } from "./resend-otp-button";
import { VerifyAccountFormSchema } from "@/lib/zod";
import { axiosAuthInstance } from "@/lib/axios";

interface VerifyAccountFormProps {
  incrementCurrentStep: () => void;
  saveOtpCode: (code: string) => void;
}

export const VerifyAccountForm = ({
  incrementCurrentStep,
  saveOtpCode,
}: VerifyAccountFormProps) => {
  const form = useForm<z.infer<typeof VerifyAccountFormSchema>>({
    resolver: zodResolver(VerifyAccountFormSchema),
    defaultValues: {
      code: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof VerifyAccountForm>) => {
      const response = await axiosAuthInstance.post("/verify-code", data);

      return response.data;
    },
  });

  function onSubmit(formData: z.infer<typeof VerifyAccountFormSchema>) {
    mutation.mutate(formData, {
      onSuccess: (data) => {
        saveOtpCode(formData.code);
        incrementCurrentStep();
      },
    });

    toast("You submitted the following values", {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">{JSON.stringify(formData, null, 2)}</code>
        </pre>
      ),
    });
  }

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
          className="w-full text-foreground font-medium rounded-3xl cursor-pointer"
        >
          Verify my account
        </Button>
      </form>
    </Form>
  );
};
