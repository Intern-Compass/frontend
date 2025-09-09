"use client";

import Image from "next/image";

import {
  Dialog,
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
          <DialogTitle className="flex flex-col items-center gap-2 mb-2">
            <Image
              src="/assets/images/verification.png"
              alt=""
              width={116}
              height={116}
            />
            Enter verification code
          </DialogTitle>
          <DialogDescription className="text-center mb-6">
            We have just sent a verification code to fik*******@gmail.com
          </DialogDescription>
        </DialogHeader>

        <VerifyAccountForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};
