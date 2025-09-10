import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const maskEmail = (email: string) => {
  const [user, domain] = email.split("@");
  const maskedEmail = `${user.slice(0, Math.min(3, user.length))}***@${domain}`;

  return maskedEmail;
}