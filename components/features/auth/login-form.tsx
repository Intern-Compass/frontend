"use client";

import { useRouter, redirect } from "next/navigation";

import { useState } from "react";

import { useMutation } from "@tanstack/react-query";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import { CircleAlert, EyeIcon, EyeOffIcon } from "lucide-react";

import { LoginFormSchema } from "@/lib/validation/auth";
import Link from "next/link";
import { cn } from "@/lib/utils";

import {
  axiosAuthInstance,
  axiosInternInstance,
  axiosSkillsInstance,
  axiosSupervisorInstance,
} from "@/lib/axios";
import { isAxiosError } from "axios";
import { ForgotPasswordDialog } from "@/components/features/auth/forgot-password-dialog";
import { login } from "@/lib/api/auth";

export const LoginForm = () => {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: login,
  });

  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  function onSubmit(formData: z.infer<typeof LoginFormSchema>) {
    mutation.mutate(formData, {
      onSuccess: (data) => {
        if (data.user_type === "intern") {
          router.push("/intern/dashboard");

          axiosInternInstance.defaults.headers.common[
            "Authorization"
          ] = `${data.token_type} ${data.access_token}`;

          axiosSkillsInstance.defaults.headers.common[
            "Authorization"
          ] = `${data.token_type} ${data.access_token}`;
        } else if (data.user_type === "supervisor") {
          router.push("/supervisor/dashboard");

          axiosSupervisorInstance.defaults.headers.common[
            "Authorization"
          ] = `${data.token_type} ${data.access_token}`;
        }
      },
      onError: (error) => {
        console.log(error);

        if (isAxiosError(error)) {
          if (error.status === 401) {
            toast(
              <div className="flex items-start gap-3 font-sans">
                <CircleAlert className="text-error-base" />

                <div className="flex flex-col gap-2.5 text-sm leading-5">
                  <span className="text-foreground font-medium">
                    Invalid Email or Password.
                  </span>
                  <span className="text-foreground/75 font-normal">
                    Please check your credentials and try again.
                  </span>
                </div>
              </div>,
              {
                classNames: {
                  toast: "!bg-error-light",
                },
                position: "top-center",
              }
            );
          }
        }
      },
    });

    // toast(
    //   <div className="flex items-start gap-3 font-sans">
    //     <CircleAlert className="text-error-base" />

    //     <div className="flex flex-col gap-2.5 text-sm leading-5">
    //       <span className="text-foreground font-medium">
    //         Email already registered.
    //       </span>
    //       <span className="text-foreground/75 font-normal">
    //         Already have an account? [Log in instead]
    //       </span>
    //     </div>
    //   </div>,
    //   {
    //     classNames: {
    //       toast: "!bg-error-light",
    //     },
    //     position: "top-center",
    //   }
    // );
    // toast(
    //   <div className="flex items-start gap-3 font-sans">
    //     <CircleAlert className="text-error-base" />

    //     <div className="flex flex-col gap-2.5 text-sm leading-5">
    //       <span className="text-foreground font-medium">
    //         Invalid Email or Password.
    //       </span>
    //       <span className="text-foreground/75 font-normal">
    //         Please check your credentials and try again.
    //       </span>
    //     </div>
    //   </div>,
    //   {
    //     classNames: {
    //       toast: "!bg-error-light",
    //     },
    //     position: "top-center",
    //   }
    // );
    // toast(
    //   <div className="flex items-start gap-3 font-sans">
    //     <CircleAlert className="text-error-base" />

    //     <div className="flex flex-col gap-2.5 text-sm leading-5">
    //       <span className="text-foreground font-medium">User not found.</span>
    //       <span className="text-foreground/75 font-normal">
    //         Please register your account first.
    //       </span>
    //     </div>
    //   </div>,
    //   {
    //     classNames: {
    //       toast: "!bg-error-light",
    //     },
    //     position: "top-center",
    //   }
    // );
  }

  return (
    <div className="relative">
      <Form {...form}>
        <form
          method="POST"
          encType="application/x-www-form-urlencoded"
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full my-8 mb-16 max-w-120"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-6">
                <FormLabel className="font-medium text-sm leading-5 text-muted-foreground">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="firstname.lastname@mtn.com"
                    className="text-foreground border border-input p-3 leading-6 placeholder:text-muted-foreground-50"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mb-6">
                <FormLabel
                  htmlFor="password"
                  className="font-medium text-sm leading-5 text-muted-foreground"
                >
                  Password
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      aria-describedby="password-constraints"
                      autoComplete="current-password"
                      id="password"
                      placeholder="*********"
                      className="text-foreground border border-input p-3 pr-11 leading-6 placeholder:text-muted-foreground-50"
                      {...field}
                    />
                    <Button
                      type="button"
                      id="toggle-password"
                      aria-label="Show password as plain text. Warning: this will display your password on the screen."
                      variant="ghost"
                      size="icon"
                      onClick={togglePasswordVisibility}
                      disabled={form.getValues("password").length === 0}
                      className="absolute right-2 top-1/2 -translate-y-1/2 disabled:cursor-not-allowed"
                    >
                      {showPassword ? (
                        <EyeOffIcon aria-hidden="true" className="size-4" />
                      ) : (
                        <EyeIcon aria-hidden="true" className="size-4" />
                      )}
                      <span className="sr-only">
                        {showPassword ? "Hide" : "Show"} password
                      </span>
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-between mb-8">
            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex items-center gap-x-1">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:text-foreground"
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-normal">
                    Remember me
                  </FormLabel>
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            disabled={mutation.isPending}
            className={cn(
              "w-full mb-4 py-2 px-8 rounded-[9999px] font-medium leading-5 text-muted-foreground hover:bg-transparent",
              form.formState.isValid
                ? "bg-primary cursor-pointer text-foreground hover:bg-muted-foreground hover:text-white"
                : "bg-muted cursor-not-allowed hover:bg-muted"
            )}
          >
            Login
          </Button>
        </form>
      </Form>

      <ForgotPasswordDialog />
    </div>
  );
};
