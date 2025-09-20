"use client";

import { useState, useEffect } from "react";

import { z } from "zod";

import { useMutation } from "@tanstack/react-query";

import axiosInstance from "@/lib/axios";

import { cn } from "@/lib/utils";
import { forgotPassword } from "@/lib/api/auth";

interface ResendOTPButtonProps {
  email: string;
  className?: string;
}

interface ResendOTPFormType {
  email: string;
}

export const ResendOTPButton = ({ email, className }: ResendOTPButtonProps) => {
  const [timer, setTimer] = useState(30);
  const [isDisabled, setIsDisabled] = useState(true);

  const mutation = useMutation({
    mutationFn: forgotPassword,
  });

  const handleResend = () => {
    setTimer(30);
    setIsDisabled(true);

    const formValues = { email };

    mutation.mutate(formValues, {
      onSuccess: (data) => {
        console.log("Success");
      },
      //  onSettled: (data) => {
      //    setOpen(false);
      //    resetCurrentStep();
      //  }
    });
  };

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
