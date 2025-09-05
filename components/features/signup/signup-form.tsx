"use client";

import { redirect } from "next/navigation";

import { useState } from "react";

import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
} from "@tanstack/react-query";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { SignupFormSchema } from "@/lib/zod";

import { EyeIcon, EyeOffIcon, CircleAlert } from "lucide-react";

import { cn } from "@/lib/utils";
import axios from "@/lib/axios";

export const SignupForm = () => {
  const mutation = useMutation({
    mutationFn: async (newUser: {
      firstName: string;
      surname: string;
      email: string;
      password: string;
    }) => {
      const response = await axios.post("/user", newUser);

      console.log(response.data);
      return response.data;
    },
    //   onSuccess: () => {
    //     // redirect("/login");
    //   },
    //   onError: (error) => {
    //     console.log(error)

    //     // toast(
    //     //   <div className="flex items-start gap-3 font-sans">
    //     //     <CircleAlert className="text-error-base" />

    //     //     <div className="flex flex-col gap-2.5 text-sm leading-5">
    //     //       <span className="text-foreground font-medium">
    //     //         Invalid Email or Password.
    //     //       </span>
    //     //       <span className="text-foreground/75 font-normal">
    //     //         Please check your credentials and try again.
    //     //       </span>
    //     //     </div>
    //     //   </div>,
    //     //   {
    //     //     classNames: {
    //     //       toast: "!bg-error-light",
    //     //     },
    //     //     position: "top-center",
    //     //   }
    //     // );
    //   }
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const form = useForm<z.infer<typeof SignupFormSchema>>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      firstName: "",
      surname: "",
      email: "",
      password: "",
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  function onSubmit(data: z.infer<typeof SignupFormSchema>) {
    mutation.mutate(data, {
      onSuccess: (data) => {
        console.log("Success: ", data);
      },
    });

    // toast(
    //       <div className="flex items-start gap-3 font-sans">
    //         <CircleAlert className="text-error-base" />

    //         <div className="flex flex-col gap-2.5 text-sm leading-5">
    //           <span className="text-foreground font-medium">
    //             Invalid Email or Password.
    //           </span>
    //           <span className="text-foreground/75 font-normal">
    //             Please check your credentials and try again.
    //           </span>
    //         </div>
    //       </div>,
    //       {
    //         classNames: {
    //           toast: "!bg-error-light",
    //         },
    //         position: "top-center",
    //       }
    //     )

    // router.push("/login");
    // toast("You submitted the following values", {
    //   description: (
    //     <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });
  }

  return (
    <Form {...form}>
      <form
        method="POST"
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full my-[5.6875rem]"
      >
        <div className="space-y-6 my-8">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="font-medium text-sm leading-5 text-muted-foreground">
                  First name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="John"
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
            name="surname"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="font-medium text-sm leading-5 text-muted-foreground">
                  Surname
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Doe"
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
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="font-medium text-sm leading-5 text-muted-foreground">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
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
              <FormItem className="space-y-2">
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
        </div>

        <Button
          type="submit"
          disabled={mutation.isPending}
          className={cn(
            "w-full py-2 px-8 mb-4 rounded-[9999px] font-medium leading-5 text-muted-foreground hover:bg-transparent",
            form.formState.isValid
              ? "bg-primary cursor-pointer text-foreground hover:bg-primary"
              : "bg-muted cursor-not-allowed hover:bg-muted"
          )}
        >
          Create Account
        </Button>
      </form>
    </Form>
  );
};
