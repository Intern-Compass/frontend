"use client";

import { useRouter, redirect } from "next/navigation";

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
import { Textarea } from "@/components/ui/textarea";

import { CircleAlert } from "lucide-react";

import { CreateTodoFormSchema } from "@/lib/zod";
import { cn } from "@/lib/utils";

import axios from "@/lib/axios";
import { format } from "date-fns";

export const CreateTodoForm = () => {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (newTodo: {
      title: string;
      description: string;
      date: string;
    }) => {
      const response = await axios.post("/auth/token", newTodo);

      console.log(response.data);
      return response.data;
    },
  });

  const form = useForm<z.infer<typeof CreateTodoFormSchema>>({
    resolver: zodResolver(CreateTodoFormSchema),
    defaultValues: {
      title: "",
      description: "",
      date: format(new Date(), "yyyy-mm-dd"),
    },
  });

  function onSubmit(data: z.infer<typeof CreateTodoFormSchema>) {
    mutation.mutate(data, {
      onSuccess: () => {
        router.push("/dashboard");
      },
      onError: (error) => {
        console.log(error);

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
      },
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full my-[5.6875rem]"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="mb-6">
              <FormLabel className="font-medium text-sm leading-5 text-muted-foreground">
                Title
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
          name="description"
          render={({ field }) => (
            <FormItem className="mb-6">
              <FormLabel className="font-medium text-sm leading-5 text-muted-foreground">
                Description
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="firstname.lastname@mtn.com"
                  className="text-foreground border border-input p-3 leading-6 placeholder:text-muted-foreground-50"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={mutation.isPending}
          className={cn(
            "w-full mb-4 py-2 px-8 rounded-[9999px] font-medium leading-5 text-muted-foreground hover:bg-transparent",
            form.formState.isValid
              ? "bg-primary cursor-pointer text-foreground hover:bg-primary"
              : "bg-muted cursor-not-allowed hover:bg-muted"
          )}
        >
          Create
        </Button>
      </form>
    </Form>
  );
};
