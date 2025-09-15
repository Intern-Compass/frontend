"use client";

import Image from "next/image";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ForgotPasswordForm } from "@/components/features/intern/login/forgot-password-form";

export const ForgotPasswordDialog = () => {
  const [open, setOpen] = useState(false);

  const closeDialog = () => {
    setOpen(false);
  }

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
            <Image
              src="/assets/images/https_.png"
              alt=""
              width={116}
              height={116}
            />
            Reset your password
          </DialogTitle>
          <DialogDescription className="flex flex-col items-center text-center gap-2 mb-6">
            Enter the email you used for registration and we'll send you a one
            time code to reset your password.
          </DialogDescription>
        </DialogHeader>
        <ForgotPasswordForm closeDialog={closeDialog} />
      </DialogContent>
    </Dialog>
  );
};
