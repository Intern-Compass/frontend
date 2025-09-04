import { z } from "zod";

export const LoginFormSchema = z
  .object({
    email: z
      .email({
        message: "Please provide a valid email address.",
      })
      .max(30, {
        message: "Email cannot exceed 30 characters.",
      })
      .toLowerCase(),
    password: z
      .string()
      .min(8, {
        message: "Password must contain at least 8 characters.",
      })
      .max(64, {
        message: "Password cannot exceed 64 characters.",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter.",
      })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter.",
      })
      .regex(/\d/, {
        message: "Password must contain at least one digit.",
      })
      .regex(/[^A-Za-z0-9]/, {
        message: "Password must contain at least one special character.",
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
        message: "First name must start with a letter.",
      })
      .max(30, {
        message: "First name cannot exceed 30 characters.",
      })
      .regex(/^[A-Za-z][A-Za-z'-]{1,29}$/, {
        message:
          "First name should start with a letter, and can contain letters, dashes and apostrophes.",
      }),
    surname: z
      .string()
      .trim()
      .min(1, {
        message: "Surname must start with a letter.",
      })
      .max(30, {
        message: "Surname cannot exceed 30 characters.",
      })
      .regex(/^[A-Za-z][A-Za-z'’-]{1,29}$/, {
        message:
          "Surname should start with a letter, and can contain letters, dashes and apostrophes.",
      }),
    email: z
      .email({
        message: "Please provide a valid email address.",
      })
      .max(30, {
        message: "Email cannot exceed 30 characters.",
      })
      .toLowerCase(),
    password: z
      .string()
      .min(8, {
        message: "Password must contain at least 8 characters.",
      })
      .max(64, {
        message: "Password cannot exceed 64 characters.",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter.",
      })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter.",
      })
      .regex(/\d/, {
        message: "Password must contain at least one number.",
      })
      .regex(/[^A-Za-z0-9]/, {
        message: "Password must contain at least one special character.",
      }),
  })
  .required();

export const ProfileFormSchema = z
  .object({
    skills: z.array(z.string()).min(1, {
      message: "Select at least one skill.",
    }),
    experience: z.string().min(2, {
      message: "Input at least one experience.",
    }),
    interests: z.string().min(2, {
      message: "Input at least one interest.",
    }),
    expectations: z.string().min(10, {
      message: "Tell us your expectations in at least one sentence.",
    }),
  })
  .required();
