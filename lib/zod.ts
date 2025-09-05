import { format } from "date-fns";
import { z } from "zod";

export const LoginFormSchema = z
  .object({
    email: z
      .email({
        error: "Please provide a valid email address.",
      })
      .max(30, {
        error: "Email cannot exceed 30 characters.",
      })
      .toLowerCase(),
    password: z
      .string()
      .min(8, {
        error: "Password must contain at least 8 characters.",
      })
      .max(64, {
        error: "Password cannot exceed 64 characters.",
      })
      .regex(/[a-z]/, {
        error: "Password must contain at least one lowercase letter.",
      })
      .regex(/[A-Z]/, {
        error: "Password must contain at least one uppercase letter.",
      })
      .regex(/\d/, {
        error: "Password must contain at least one digit.",
      })
      .regex(/[^A-Za-z0-9]/, {
        error: "Password must contain at least one special character.",
      }),
    rememberMe: z.boolean(),
  })
  .required();

export const SignupFormSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(1, {
        error: "First name must start with a letter.",
      })
      .max(30, {
        error: "First name cannot exceed 30 characters.",
      })
      .regex(/^[A-Za-z][A-Za-z'-]{1,29}$/, {
        error:
          "First name should start with a letter, and can contain letters, dashes and apostrophes.",
      }),
    surname: z
      .string()
      .trim()
      .min(1, {
        error: "Surname must start with a letter.",
      })
      .max(30, {
        error: "Surname cannot exceed 30 characters.",
      })
      .regex(/^[A-Za-z][A-Za-z'’-]{1,29}$/, {
        error:
          "Surname should start with a letter, and can contain letters, dashes and apostrophes.",
      }),
    email: z
      .email({
        error: "Please provide a valid email address.",
      })
      .max(30, {
        error: "Email cannot exceed 30 characters.",
      })
      .toLowerCase(),
    password: z
      .string()
      .min(8, {
        error: "Password must contain at least 8 characters.",
      })
      .max(64, {
        error: "Password cannot exceed 64 characters.",
      })
      .regex(/[a-z]/, {
        error: "Password must contain at least one lowercase letter.",
      })
      .regex(/[A-Z]/, {
        error: "Password must contain at least one uppercase letter.",
      })
      .regex(/\d/, {
        error: "Password must contain at least one number.",
      })
      .regex(/[^A-Za-z0-9]/, {
        error: "Password must contain at least one special character.",
      }),
  })
  .required();

export const ProfileFormSchema = z
  .object({
    skills: z.array(z.string()).min(1, {
      error: "Select at least one skill.",
    }),
    experience: z.string().min(2, {
      error: "Input at least one experience.",
    }),
    interests: z.string().min(2, {
      error: "Input at least one interest.",
    }),
    expectations: z.string().min(10, {
      error: "Tell us your expectations in at least one sentence.",
    }),
  })
  .required();

export const CreateTodoFormSchema = z
  .object({
    title: z
      .string()
      .min(1, {
        error: "Please provide a valid title.",
      })
      .trim(),
    description: z
      .string()
      .min(1, {
        error: "Please provide a valid description.",
      })
      .trim(),
    date: z.iso
      .date({
        error: "Please provide a valid date format: YYYY-MM-DD",
      })
      .default(format(new Date(), "yyyy-MM-dd")),
  })
  .required();
