import { z } from "zod";

import axiosInstance from "@/lib/axios";

import {
  LoginFormSchema,
  RegisterInternFormSchema,
  RegisterSupervisorFormSchema,
  ForgotPasswordFormSchema,
  ResetPasswordApiSchema,
  VerifyAccountFormSchema,
  RegisterInternApiSchema,
  RegisterSupervisorApiSchema,
} from "@/lib/validation/auth";

export const login = async (user: z.infer<typeof LoginFormSchema>) => {
  const params = new URLSearchParams();
  params.append("username", user.email);
  params.append("password", user.password);
  params.append("rememberMe", user.rememberMe.toString());

  const response = await axiosInstance.post("/auth/token", params, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return response.data;
};

export const registerIntern = async (
  newIntern: z.infer<typeof RegisterInternApiSchema>
) => {
  const response = await axiosInstance.post("/auth/register-intern", newIntern);

  return response.data;
};

export const registerSupervisor = async (
  newSupervisor: z.infer<typeof RegisterSupervisorApiSchema>
) => {
  const response = await axiosInstance.post(
    "/auth/register-supervisor",
    newSupervisor
  );

  return response.data;
};

export const verifyAccount = async (
  newUser: z.infer<typeof VerifyAccountFormSchema>
) => {
  const response = await axiosInstance.post("/auth/verify-code", newUser);

  return response.data;
};

export const forgotPassword = async (
  data: z.infer<typeof ForgotPasswordFormSchema>
) => {
  const response = await axiosInstance.post("/auth/forgot-password", data);

  return response.data;
};

export const resetPassword = async (
  data: z.infer<typeof ResetPasswordApiSchema>
) => {
  const response = await axiosInstance.post("/auth/reset-password", data);

  return response.data;
};

export const getUserDetails = async () => {
  const response = await axiosInstance.get("/auth/get-user");

  return response.data;
};

export const refreshToken = async () => {
  const response = await axiosInstance.post("/auth/refresh");

  return response.data;
};

export const logout = async () => {
  const response = await axiosInstance.post("/auth/logout");

  return response.data;
};
