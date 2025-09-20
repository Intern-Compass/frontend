"use client";

import { useState, useEffect } from "react";

import { z } from "zod";

import { cn } from "@/lib/utils";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RegisterInternApiSchema, RegisterInternFormSchema } from "@/lib/validation/auth";

import { registerIntern } from "@/lib/api/auth";

interface ResendOTPButtonProps {
  className?: string;
}

export const ResendOTPButton = ({ className }: ResendOTPButtonProps) => {
  const queryClient = useQueryClient();

  const [timer, setTimer] = useState(30);
  const [isDisabled, setIsDisabled] = useState(true);

  const mutation = useMutation({
    mutationFn: registerIntern,
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isDisabled) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isDisabled]);

  const handleResend = () => {
    setTimer(30);
    setIsDisabled(true);

    const signupData = queryClient.getQueryData<
      z.infer<typeof RegisterInternApiSchema>
    >(["signupData"]);

    if (signupData) {
      mutation.mutate(signupData, {
        onSuccess: (data) => {},
      });
    }
  };

  return (
    <button
      onClick={handleResend}
      disabled={isDisabled}
      className={cn(
        isDisabled ? "cursor-not-allowed" : "cursor-pointer",
        className
      )}
    >
      {isDisabled ? `Resend in ${timer}s` : "Resend OTP"}
    </button>
  );
};
