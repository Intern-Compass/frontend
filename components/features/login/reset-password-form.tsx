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

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { EyeIcon, EyeOffIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { ResetPasswordFormSchema } from "@/lib/zod";
import { axiosAuthInstance } from "@/lib/axios";

interface ResetPasswordFormProps {
  otpCode: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  resetCurrentStep: () => void;
}

interface ResetPasswordFormType {
  code: string;
  password: string;
}

export const ResetPasswordForm = ({
  otpCode,
  setOpen,
  resetCurrentStep,
}: ResetPasswordFormProps) => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<z.infer<typeof ResetPasswordFormSchema>>({
    resolver: zodResolver(ResetPasswordFormSchema),
    defaultValues: {
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
      code: otpCode,
      password: formData.newPassword,
    };

    mutation.mutate(formValues, {
      onSuccess: (data) => {
        console.log("Success")

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
