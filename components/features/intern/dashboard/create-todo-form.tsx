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

import { CreateTodoFormSchema } from "@/lib/validation/intern";
import { cn } from "@/lib/utils";

import { axiosAuthInstance } from "@/lib/axios";
import { format } from "date-fns";

export const CreateTodoForm = () => {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (newTodo: {
      title: string;
      description: string;
      date: string;
    }) => {
      const response = await axiosAuthInstance.post("/token", newTodo);

      console.log(response.data);
      return response.data;
    },
  });

  const form = useForm<z.infer<typeof CreateTodoFormSchema>>({
    resolver: zodResolver(CreateTodoFormSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  function onSubmit(data: z.infer<typeof CreateTodoFormSchema>) {
    console.log(data);
    mutation.mutate(data, {
      onSuccess: () => {
        // router.push("/intern/dashboard");
      },
      onError: (error) => {
        // console.log(error);
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
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="font-medium text-black space-y-4">
                Title
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Type your message here."
                  className="placeholder:text-gray-400 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
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
            <FormItem className="space-y-2">
              <FormLabel className="font-medium text-black">
                Description
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Type your message here."
                  className="placeholder:text-gray-400 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="pt-4 flex justify-center rounded-full">
          <Button
            type="submit"
            disabled={mutation.isPending}
            className="rounded-full text-black"
          >
            Create
          </Button>
        </div>
      </form>
    </Form>
  );
};
