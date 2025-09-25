"use client";

import { useRouter, redirect } from "next/navigation";

import { useMutation, useQueryClient } from "@tanstack/react-query";

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


import { CreateTodoFormSchema } from "@/lib/validation/intern";
import { cn } from "@/lib/utils";

import { format } from "date-fns";
import { createTodo } from "@/lib/api/intern";

interface CreateTodoFormProps {
  closeDialog: () => void;
}

export const CreateTodoForm = ({ closeDialog }: CreateTodoFormProps) => {
  const router = useRouter();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createTodo
  });

  const form = useForm<z.infer<typeof CreateTodoFormSchema>>({
    resolver: zodResolver(CreateTodoFormSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  function onSubmit(data: z.infer<typeof CreateTodoFormSchema>) {
    mutation.mutate(data, {
      onSuccess: () => {
        closeDialog();

        queryClient.invalidateQueries({ queryKey: ["todos"] });
      },
      onError: (error) => {
        // console.log(error);
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
                  className="resize-none h-25 placeholder:text-gray-400 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
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
