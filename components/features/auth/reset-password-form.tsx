"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

import { useMutation } from "@tanstack/react-query";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { CircleAlert, EyeIcon, EyeOffIcon } from "lucide-react";

import { ResetPasswordFormSchema } from "@/lib/validation/auth";
import { resetPassword } from "@/lib/api/auth";
import { isAxiosError } from "axios";

export const ResetPasswordForm = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<z.infer<typeof ResetPasswordFormSchema>>({
    resolver: zodResolver(ResetPasswordFormSchema),
    defaultValues: {
      token,
      newPassword: "",
      confirmPassword: "",
    },
  });

  const mutation = useMutation({
    mutationFn: resetPassword,
  });

  async function onSubmit(formData: z.infer<typeof ResetPasswordFormSchema>) {
    const formValues = {
      token: formData.token,
      password: formData.newPassword,
    };

    mutation.mutate(formValues, {
      onSuccess: (data) => {
         toast.success(
           "Your password has been reset successfully, please proceed to log in."
         );

        router.replace("/login");
      },
      onError: (error) => {
        console.log(error);

        if (isAxiosError(error)) {
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
      },
    });
  }

  return (
    <Form {...form}>
      <form
        method="POST"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel
                htmlFor="new-password"
                className="text-muted-foreground font-medium"
              >
                New Password
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showNewPassword ? "text" : "password"}
                    autoComplete="new-password"
                    id="new-password"
                    className="pr-12"
                    {...field}
                  />
                  <Button
                    type="button"
                    id="toggle-password"
                    aria-label="Show password as plain text. Warning: this will display your password on the screen."
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      setShowNewPassword((prevState) => !prevState)
                    }
                    disabled={form.getValues("newPassword").length === 0}
                    className="absolute right-2 top-1/2 -translate-y-1/2 disabled:cursor-not-allowed"
                  >
                    {showNewPassword ? (
                      <EyeOffIcon aria-hidden="true" className="size-4" />
                    ) : (
                      <EyeIcon aria-hidden="true" className="size-4" />
                    )}
                    <span className="sr-only">
                      {showNewPassword ? "Hide" : "Show"} password
                    </span>
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel
                htmlFor="confirm-new-password"
                className="text-muted-foreground font-medium"
              >
                Confirm Password
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    id="confirm-new-password"
                    className="pr-12"
                    {...field}
                  />
                  <Button
                    type="button"
                    id="toggle-confirm-password"
                    aria-label="Show password as plain text. Warning: this will display your password on the screen."
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      setShowConfirmPassword((prevState) => !prevState)
                    }
                    disabled={form.getValues("confirmPassword").length === 0}
                    className="absolute right-2 top-1/2 -translate-y-1/2 disabled:cursor-not-allowed"
                  >
                    {showConfirmPassword ? (
                      <EyeOffIcon aria-hidden="true" className="size-4" />
                    ) : (
                      <EyeIcon aria-hidden="true" className="size-4" />
                    )}
                    <span className="sr-only">
                      {showConfirmPassword ? "Hide" : "Show"} password
                    </span>
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={mutation.isPending}
          className="w-full rounded-3xl text-foreground cursor-pointer font-medium"
        >
          Reset Password
        </Button>
      </form>
    </Form>
  );
};
