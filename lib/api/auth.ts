import { z } from "zod";

import { axiosAuthInstance } from "@/lib/axios";

import {
  LoginFormSchema,
  RegisterInternFormSchema,
  RegisterSupervisorFormSchema,
  ForgotPasswordFormSchema,
  ResetPasswordFormSchema,
  ResetPasswordApiSchema,
} from "@/lib/validation/auth";

export const login = async (user: z.infer<typeof LoginFormSchema>) => {
  const params = new URLSearchParams();
  params.append("username", user.email);
  params.append("password", user.password);
  params.append("rememberMe", user.rememberMe.toString());

  const response = await axiosAuthInstance.post("/token", params, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return response.data;
};

export const registerIntern = async (
  newIntern: z.infer<typeof RegisterInternFormSchema>
) => {
  const response = await axiosAuthInstance.post("/register-intern", newIntern);

  return response.data;
};

export const registerSupervisor = async (
  newSupervisor: z.infer<typeof RegisterSupervisorFormSchema>
) => {
  const response = await axiosAuthInstance.post(
    "/register-supervisor",
    newSupervisor
  );

  return response.data;
};

export const forgotPassword = async (
  data: z.infer<typeof ForgotPasswordFormSchema>
) => {
  const response = await axiosAuthInstance.post("/forgot-password", data);

  return response.data;
};

export const resetPassword = async (
  data: z.infer<typeof ResetPasswordApiSchema>
) => {
  const response = await axiosAuthInstance.post("/reset-password", data);

  return response.data;
};
