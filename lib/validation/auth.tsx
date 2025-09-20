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
      .min(1, {
        error: "Please input your password.",
      })
      .max(64, {
        error: "Password cannot exceed 64 characters.",
      }),
    rememberMe: z.boolean(),
  })
  .required();

export const RegisterInternFormSchema = z
  .object({
    firstname: z
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
    lastname: z
      .string()
      .trim()
      .min(1, {
        error: "Last name must start with a letter.",
      })
      .max(30, {
        error: "Last name cannot exceed 30 characters.",
      })
      .regex(/^[A-Za-z][A-Za-z'’-]{1,29}$/, {
        error:
          "Surname should start with a letter, and can contain letters, dashes and apostrophes.",
      }),
    phone_number: z
      .string()
      .length(11, {
        error: "Please provide your 11-digit phone number.",
      })
      .regex(/^\d+$/, {
        error: "Phone number must contain only digits.",
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
    school: z.string().min(1, { error: "Please provide a valid school." }),
    date_of_birth: z.iso.date({
      error: "Please provide a valid date.",
    }),
    department: z
      .number({
        error: "Please select a department.",
      })
      .min(0, {
        error: "Please select a valid department.",
      })
      .max(17, {
        error: "Please select a valid department.",
      }),
    internship_start_date: z.iso.date({
      error: "Please provide a valid date.",
    }),
    internship_end_date: z.iso.date({
      error: "Please provide a valid date.",
    }),
    technical_pathways: z.array(z.object({ name: z.string() })).min(1, {
      error: "Please select or type at least one pathway.",
    }),
    programming_languages: z.array(z.object({ name: z.string() })).optional(),
    soft_skills: z.array(z.object({ name: z.string() })).min(1, {
      error: "Please select or type at least one soft skill.",
    }),
    work_location: z.string().trim().min(1, {
      error: "Please provide a valid work location.",
    }),
  })
  .required()
  .refine(
    (data) =>
      new Date(data.internship_end_date) >=
      new Date(data.internship_start_date),
    {
      error: "Internship end date must be greater than internship start date.",
      path: ["internship_end_date"],
    }
  )
  .refine(
    (data) => {
      const totalSelected =
        (data.technical_pathways?.length || 0) +
        (data.programming_languages?.length || 0) +
        (data.soft_skills?.length || 0);

      return totalSelected >= 3;
    },
    {
      message:
        "Please provide a total of 3 values across the fields: technical pathways, programming languages, and soft skills.",
      path: ["technical_pathways"],
    }
  );

export const RegisterInternApiSchema = z
  .object({
    firstname: z
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
    lastname: z
      .string()
      .trim()
      .min(1, {
        error: "Last name must start with a letter.",
      })
      .max(30, {
        error: "Last name cannot exceed 30 characters.",
      })
      .regex(/^[A-Za-z][A-Za-z'’-]{1,29}$/, {
        error:
          "Surname should start with a letter, and can contain letters, dashes and apostrophes.",
      }),
    phone_number: z
      .string()
      .length(11, {
        error: "Please provide your 11-digit phone number.",
      })
      .regex(/^\d+$/, {
        error: "Phone number must contain only digits.",
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
    school: z.string().min(1, { error: "Please provide a valid school." }),
    date_of_birth: z.iso.date({
      error: "Please provide a valid date.",
    }),
    department: z
      .number({
        error: "Please select a department.",
      })
      .min(0, {
        error: "Please select a valid department.",
      })
      .max(17, {
        error: "Please select a valid department.",
      }),
    internship_start_date: z.iso.date({
      error: "Please provide a valid date.",
    }),
    internship_end_date: z.iso.date({
      error: "Please provide a valid date.",
    }),
    skills: z.array(z.object({ name: z.string() })).min(3, {
      error: "Please select or type a minimum of three skills.",
    }),
    work_location: z.string().trim().min(1, {
      error: "Please provide a valid work location.",
    }),
  })
  .required()
  .refine(
    (data) =>
      new Date(data.internship_end_date) >=
      new Date(data.internship_start_date),
    {
      error: "Internship end date must be greater than internship start date.",
      path: ["internship_end_date"],
    }
  );

export const RegisterSupervisorFormSchema = z
  .object({
    firstname: z
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
    lastname: z
      .string()
      .trim()
      .min(1, {
        error: "Last name must start with a letter.",
      })
      .max(30, {
        error: "Last name cannot exceed 30 characters.",
      })
      .regex(/^[A-Za-z][A-Za-z'’-]{1,29}$/, {
        error:
          "Surname should start with a letter, and can contain letters, dashes and apostrophes.",
      }),
    phone_number: z
      .string()
      .length(11, {
        error: "Please provide your 11-digit phone number.",
      })
      .regex(/^\d+$/, {
        error: "Phone number must contain only digits.",
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
    position: z.string().min(1, { error: "Please provide a valid position." }),
    date_of_birth: z.iso.date({
      error: "Please provide a valid date.",
    }),
    department: z
      .number({
        error: "Please select a department.",
      })
      .min(0, {
        error: "Please select a valid department.",
      })
      .max(17, {
        error: "Please select a valid department.",
      }),
    technical_pathways: z.array(z.object({ name: z.string() })).min(1, {
      error: "Please select or type at least one pathway.",
    }),
    programming_languages: z.array(z.object({ name: z.string() })).optional(),
    soft_skills: z.array(z.object({ name: z.string() })).min(1, {
      error: "Please select or type at least one soft skill.",
    }),
    work_location: z.string().trim().min(1, {
      error: "Please provide a valid work location.",
    }),
  })
  .required()
  .refine(
    (data) => {
      const totalSelected =
        (data.technical_pathways?.length || 0) +
        (data.programming_languages?.length || 0) +
        (data.soft_skills?.length || 0);

      return totalSelected >= 3;
    },
    {
      message:
        "Please provide a total of 3 values across the fields: technical pathways, programming languages, and soft skills.",
      path: ["technical_pathways"],
    }
  );

export const RegisterSupervisorApiSchema = z
  .object({
    firstname: z
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
    lastname: z
      .string()
      .trim()
      .min(1, {
        error: "Last name must start with a letter.",
      })
      .max(30, {
        error: "Last name cannot exceed 30 characters.",
      })
      .regex(/^[A-Za-z][A-Za-z'’-]{1,29}$/, {
        error:
          "Surname should start with a letter, and can contain letters, dashes and apostrophes.",
      }),
    phone_number: z
      .string()
      .length(11, {
        error: "Please provide your 11-digit phone number.",
      })
      .regex(/^\d+$/, {
        error: "Phone number must contain only digits.",
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
    position: z.string().min(1, { error: "Please provide a valid position." }),
    date_of_birth: z.iso.date({
      error: "Please provide a valid date.",
    }),
    department: z
      .number({
        error: "Please select a department.",
      })
      .min(0, {
        error: "Please select a valid department.",
      })
      .max(17, {
        error: "Please select a valid department.",
      }),
    skills: z.array(z.object({ name: z.string() })).min(3, {
      error: "Please select or type a minimum of three skills.",
    }),
    work_location: z.string().trim().min(1, {
      error: "Please provide a valid work location.",
    }),
  })
  .required();

export const VerifyAccountFormSchema = z
  .object({
    code: z.string().min(6, {
      error: "Your verification code must be 6 digits long.",
    }),
  })
  .required();

export const ForgotPasswordFormSchema = z
  .object({
    email: z
      .email({
        error: "Please provide a valid email address.",
      })
      .max(30, {
        error: "Email cannot exceed 30 characters.",
      })
      .toLowerCase(),
  })
  .required();

export const ResetPasswordFormSchema = z
  .object({
    token: z.string().min(1, {
      error: "Please provide a valid token.",
    }),
    newPassword: z
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
    confirmPassword: z
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
  })
  .required()
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export const ResetPasswordApiSchema = ResetPasswordFormSchema.transform(
  (data) => ({
    token: data.token,
    password: data.newPassword,
  })
);
