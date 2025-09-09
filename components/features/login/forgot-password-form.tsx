"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { useMutation } from "@tanstack/react-query";

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

import { ForgotPasswordFormSchema } from "@/lib/zod";
import { axiosAuthInstance } from "@/lib/axios";

interface ForgotPasswordFormProps {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

export const ForgotPasswordForm = ({
  setCurrentStep,
}: ForgotPasswordFormProps) => {
  const form = useForm<z.infer<typeof ForgotPasswordFormSchema>>({
    resolver: zodResolver(ForgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof ForgotPasswordFormSchema>) => {
      const response = await axiosAuthInstance.post("/forgot-password", data);

      return response.data;
    },
  });

  function onSubmit(data: z.infer<typeof ForgotPasswordFormSchema>) {
     mutation.mutate(data, {
       onSuccess: (data) => {
         setCurrentStep(2);
       },
     });

    toast("You submitted the following values", {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-muted-foreground font-medium">Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full cursor-pointer rounded-3xl text-foreground font-medium">Continue</Button>
      </form>
    </Form>
  );
};
