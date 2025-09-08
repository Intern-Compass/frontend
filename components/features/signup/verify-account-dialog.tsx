"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { VerifyAccountForm } from "./verify-account-form";

type VerifyAccountDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const VerifyAccountDialog = ({
  open,
  setOpen,
}: VerifyAccountDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Enter verification code</DialogTitle>
          <DialogDescription>
            We have just sent a verification code to fik*******@gmail.com
          </DialogDescription>
        </DialogHeader>

        <VerifyAccountForm open={open} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};
