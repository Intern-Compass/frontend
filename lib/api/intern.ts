import { z } from "zod";

import { axiosAuthInstance } from "@/lib/axios";

import {
  LoginFormSchema,
  SignupFormSchema,
  ForgotPasswordFormSchema,
  ResetPasswordFormSchema,
} from "@/lib/validation/intern";

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

export const register = async (newUser: z.infer<typeof SignupFormSchema>) => {
  const response = await axiosAuthInstance.post("/register-intern", newUser);

  return response.data;
};

export const forgotPassword = async (
  data: z.infer<typeof ForgotPasswordFormSchema>
) => {
  const response = await axiosAuthInstance.post("/forgot-password", data);

  return response.data;
};

export const resetPassword = async (data: {
  code: string;
  password: string;
}) => {
  const response = await axiosAuthInstance.post("/reset-password", data);

  return response.data;
};
