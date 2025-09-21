import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { departments } from "@/lib/constants";

import { toast } from "sonner";
import { CircleAlert } from "lucide-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const maskEmail = (email: string) => {
  const [user, domain] = email.split("@");
  const maskedEmail = `${user.slice(0, Math.min(3, user.length))}***@${domain}`;

  return maskedEmail;
};

export const getUserInitials = (
  firstname: string = "",
  lastname: string = ""
) => {
  return `${firstname[0]}${lastname[0]}`;
};

// departments returned from the backend are one-indexed
export const getDepartment = (index: number) => departments[index - 1];

export const getReactSelectOptions = (options: string[]) => {
  return options.map((option) => ({ label: option, value: option }));
};

export const getDepartmentOptions = () => {
  return departments.map((department, index) => ({
    value: index + 1,
    label: department,
  }));
};