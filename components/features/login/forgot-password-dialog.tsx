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

import Image from "next/image";

const title = [
  "Reset your password",
  "Enter verification code",
  "Create new password",
];

const description = [
  "Enter the email you used for registration and we'll send you a one time code to reset your password.",
  "We have just sent a verification code to fik*******@gmail.com",
  "Enter your new password below",
];

const images = [
  "/assets/images/https_.png",
  "/assets/images/verification.png",
  "/assets/images/https_.png",
];

export const ForgotPasswordDialog = () => {
  const [otpCode, setOtpCode] = useState("");
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const incrementCurrentStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const resetCurrentStep = () => {
    setCurrentStep(0);
  };

  const saveOtpCode = (code: string) => {
    setOtpCode(code);
  };

  // reset the dialog form state to the initial value when the dialog is closed
  useEffect(() => {
    if (!open) {
      resetCurrentStep();
    }
  }, [open]);

  const form: Record<number, JSX.Element> = [
    <ForgotPasswordForm key={0} incrementCurrentStep={incrementCurrentStep} />,
    <VerifyAccountForm
      key={1}
      incrementCurrentStep={incrementCurrentStep}
      saveOtpCode={saveOtpCode}
    />,
    <ResetPasswordForm
      key={2}
      setOpen={setOpen}
      resetCurrentStep={resetCurrentStep}
      otpCode={otpCode}
    />,
  ];

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
            <Image src={images[currentStep]} alt="" width={116} height={116} />
            {title[currentStep]}
          </DialogTitle>
          <DialogDescription className="flex flex-col items-center text-center gap-2 mb-6">
            {description[currentStep]}
          </DialogDescription>
        </DialogHeader>
        {form[currentStep]}
      </DialogContent>
    </Dialog>
  );
};
