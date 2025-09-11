import { useState, useEffect } from "react";

import { z } from "zod";

import { cn } from "@/lib/utils";

import { useMutation } from "@tanstack/react-query";
import { VerifyAccountFormSchema } from "@/lib/validation/intern";
import { axiosAuthInstance } from "@/lib/axios";

interface ResendOTPButtonProps {
  className?: string;
}

export const ResendOTPButton = ({ className }: ResendOTPButtonProps) => {
  const [timer, setTimer] = useState(30);
  const [isDisabled, setIsDisabled] = useState(true);

  const mutation = useMutation({
    mutationFn: async (newUser: z.infer<typeof VerifyAccountFormSchema>) => {
      const response = await axiosAuthInstance.post("/resend", newUser);

      return response.data;
    },
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

    // mutation.mutate(data, {
    //   onSuccess: (data) => {
    //   },
    // });
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
