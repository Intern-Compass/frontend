"use client";

import { useRouter } from "next/navigation";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useMutation } from "@tanstack/react-query";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { REGEXP_ONLY_DIGITS } from "input-otp";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { EyeIcon, EyeOffIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { ResetPasswordFormSchema } from "@/lib/validation/intern";
import { axiosAuthInstance } from "@/lib/axios";

interface ResetPasswordFormProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  resetCurrentStep: () => void;
}

interface ResetPasswordFormType {
  code: string;
  password: string;
}

export const ResetPasswordForm = ({
  setOpen,
  resetCurrentStep,
}: ResetPasswordFormProps) => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<z.infer<typeof ResetPasswordFormSchema>>({
    resolver: zodResolver(ResetPasswordFormSchema),
    defaultValues: {
      code: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: ResetPasswordFormType) => {
      const response = await axiosAuthInstance.post("/reset-password", data);

      return response.data;
    },
  });

  async function onSubmit(formData: z.infer<typeof ResetPasswordFormSchema>) {
    const formValues = {
      code: formData.code,
      password: formData.newPassword,
    };

    mutation.mutate(formValues, {
      onSuccess: (data) => {
        console.log("Success");
      },
      // onSettled: (data) => {
      //    setOpen(false);
      //    resetCurrentStep();
      //  }
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
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-muted-foreground font-medium">
                OTP code
              </FormLabel>
              <FormControl>
                <InputOTP
                  autoFocus
                  maxLength={6}
                  pattern={REGEXP_ONLY_DIGITS}
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
          className="w-full rounded-3xl text-foreground cursor-pointer font-medium"
        >
          Reset Password
        </Button>
      </form>
    </Form>
  );
};
