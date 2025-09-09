import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";

interface ResendOTPButtonProps {
  className?: string;
}

export const ResendOTPButton: React.FC<ResendOTPButtonProps> = ({className}) => {
  const [timer, setTimer] = useState(30);
  const [isDisabled, setIsDisabled] = useState(true);

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
  };

  return (
    <button
      onClick={handleResend}
      disabled={isDisabled}
      className={cn(isDisabled ? "cursor-not-allowed" : "cursor-pointer", className)}
    >
      {isDisabled ? `Resend in ${timer}s` : "Resend OTP"}
    </button>
  );
};
