"use client";

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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Upload as UploadIcon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";

import { cn } from "@/lib/utils";
import { CreateProjectFormSchema } from "@/lib/validation/intern";

export const CreateProjectForm = () => {
  const form = useForm<z.infer<typeof CreateProjectFormSchema>>({
    resolver: zodResolver(CreateProjectFormSchema),
    defaultValues: {
      title: "",
      description: "",
      interns: "",
      comments: "",
    },
  });

  function onSubmit(data: z.infer<typeof CreateProjectFormSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-auto space-y-7 mx-8"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className=" text-[#000000] text-center font-semibold">
                Add Project
              </FormLabel>
              <FormControl>
                <Input
                  className="w-full text-[#000000] font-normal"
                  placeholder="Project Title"
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
            <FormItem>
              <FormLabel className="text-[#000000] font-semibold">
                Project Description
              </FormLabel>
              <FormControl>
                <Input
                  className="w-full text-[#000000] font-normal"
                  placeholder="Project description"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="resources"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#000000] font-semibold">
                Add Resources & Materials
              </FormLabel>
              <FormControl>
                <div>
                  <Input
                    id="resources-upload"
                    type="file"
                    multiple
                    className="hidden"
                    onChange={(e) =>
                      field.onChange(
                        e.target.files ? Array.from(e.target.files) : []
                      )
                    }
                  />

                  <label
                    htmlFor="resources-upload"
                    className="flex flex-col items-center justify-center cursor-pointer p-10 font-normal border border-[#E0E0E0] w-full"
                  >
                    {field.value && field.value.length > 0 ? (
                      <ul className="w-full list-disc list-inside text-[#333] space-y-1 text-sm">
                        {field.value.map((file: File, index: number) => (
                          <li
                            key={index}
                            className="break-words whitespace-normal"
                          >
                            {file.name}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <>
                        <UploadIcon className="w-5 h-5 text-[#BFBFBF]" />
                        <span className="text-[#BFBFBF] font-normal text-center">
                          Upload resource(s)
                        </span>
                      </>
                    )}
                  </label>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="interns"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#000000] font-semibold">
                Interns
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className="w-full">
                  <SelectTrigger className="w-full">
                    <SelectValue
                      className="text-[#C1C1C1] font-normal w-full"
                      placeholder="Select Intern(s)"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">Intern 1</SelectItem>
                  <SelectItem value="2">Intern 2</SelectItem>
                  <SelectItem value="3">Intern 3</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="due_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#000000] font-semibold">
                Due date
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                        "hover:bg-transparent hover:text-inherit"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span className="font-normal">Enter Due Date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={(date) => {
                      if (date) {
                        field.onChange(format(date, "yyyy-MM-dd'T'HH:mm:ss"));
                      } else {
                        field.onChange(null);
                      }
                    }}
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="comments"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#000000] font-semibold">
                Add Comments{" "}
                <span className="text-[#929292] font-medium">(Optional)</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="If you enounter any issue, do reach out to me. All the best."
                  className="resize-none w-full text-[#000000] font-normal"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center">
          <button className="py-2 px-8 w-full rounded-full text-[#000000] bg-[#F9C600] font-medium">
            Create Project
          </button>
        </div>
      </form>
    </Form>
  );
};
