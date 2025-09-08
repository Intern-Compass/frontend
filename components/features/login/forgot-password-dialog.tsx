"use client";

import { JSX, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ForgotPasswordForm } from "@/components/features/login/forgot-password-form";
import { VerifyAccountForm } from "@/components/features/login/verify-account-form";
import { ResetPasswordForm } from "@/components/features/login/reset-password-form";

const title: Record<number, string> = {
  1: "Reset your password",
  2: "Enter verification code",
  3: "Create new password",
};

const description: Record<number, string> = {
  1: "Enter the email you used for registration and we'll send you a one time code to reset your password.",
  2: "We have just sent a verification code to fik*******@gmail.com",
  3: "Enter your new password below",
};

const image: Record<number, JSX.Element> = {
  1: <img src="/assets/images/https_.png" alt="" />,
  2: <img src="/assets/images/verification.png" alt="" />,
  3: <img src="/assets/images/https_.png" alt="" />,
};

export const ForgotPasswordDialog = () => {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  // reset the dialog form state to the initial value when the dialog is closed
  useEffect(() => {
    if (!open) {
      setCurrentStep(1);
    }
  }, [open]);

  const form: Record<number, JSX.Element> = {
    1: <ForgotPasswordForm setCurrentStep={setCurrentStep} />,
    2: <VerifyAccountForm setCurrentStep={setCurrentStep} />,
    3: <ResetPasswordForm setOpen={setOpen} setCurrentStep={setCurrentStep} />,
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="link"
          className="absolute bottom-19 right-0 underline underline-offset-1 cursor-pointer leading-5 text-sm text-foreground font-normal"
        >
          Forgot Password?
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex flex-col items-center gap-2 mb-2">
            {image[currentStep]}
            {title[currentStep]}
          </DialogTitle>
          <DialogDescription className="flex flex-col items-center text-center gap-2 mb-6">{description[currentStep]}</DialogDescription>
        </DialogHeader>
        {form[currentStep]}
      </DialogContent>
    </Dialog>
  );
};
