"use client";

import Image from "next/image";

import { z } from "zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { VerifyAccountForm } from "./verify-account-form";
import { maskEmail } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { SignupFormSchema } from "@/lib/validation/intern";

type VerifyAccountDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const VerifyAccountDialog = ({
  open,
  setOpen,
}: VerifyAccountDialogProps) => {
  const queryClient = useQueryClient();

  const signupData = queryClient.getQueryData<z.infer<typeof SignupFormSchema>>(
    ["signupData"]
  );

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
            We have just sent a verification code to{" "}
            {maskEmail(signupData?.email ?? "")}
          </DialogDescription>
        </DialogHeader>

        <VerifyAccountForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};
