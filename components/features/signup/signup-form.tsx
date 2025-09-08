"use client";

import { redirect } from "next/navigation";

import { useState } from "react";

import CreatableSelect from "react-select/creatable";

import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
} from "@tanstack/react-query";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { format, formatISO } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";

import { SignupFormSchema } from "@/lib/zod";

import { EyeIcon, EyeOffIcon, CircleAlert } from "lucide-react";

import { cn } from "@/lib/utils";
import axios from "@/lib/axios";
import { VerifyAccountDialog } from "./verify-account-dialog";
import { DateField } from "./date-field";

type OptionType = {
  value: string;
  label: string;
};

const skillsOptions: OptionType[] = [
  { value: "Cybersecurity", label: "Cybersecurity" },
  { value: "Developer", label: "Developer" },
  { value: "Frontend", label: "Front-end" },
  { value: "Backend", label: "Back-end" },
  { value: "UI/UX", label: "UI/UX" },
];

const departments = [
  { id: "1", name: "Chief Executive Officer Office" },
  { id: "2", name: "Chief Operating Officer Office" },
  { id: "3", name: "Company Secretariat" },
  { id: "4", name: "Corporate Services and Sustainability" },
  { id: "5", name: "Customer Relations and Experience" },
  { id: "6", name: "Digital Services" },
  { id: "7", name: "Enterprise Business" },
  { id: "8", name: "Finance" },
  { id: "9", name: "Fixed BroadBand" },
  { id: "10", name: "Human Resources" },
  { id: "11", name: "Information Technology" },
  { id: "12", name: "Internal Audit and Forensic Services" },
  { id: "13", name: "Marketing" },
  { id: "14", name: "Network" },
  { id: "15", name: "Risk and Compliance" },
  { id: "16", name: "Sales and Distribution" },
  { id: "17", name: "Strategy and Innovation" },
];

export const SignupForm = () => {
  const [currentStep, setCurrentStep] = useState(1);

  // controls the verify-account dialog
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

  const form = useForm<z.infer<typeof SignupFormSchema>>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      phone_number: "",
      email: "",
      password: "",
      school: "",
      work_location: "",
    },
    mode: currentStep === 1 ? "onChange" : "onSubmit",
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  console.log(form.getValues("date_of_birth"));
  console.log(formatISO(new Date()));

  const handleNext = async () => {
    const areStepOneInputsValid = await form.trigger([
      "firstname",
      "lastname",
      "phone_number",
      "email",
      "password",
    ]);
    if (areStepOneInputsValid) {
      setCurrentStep(2);
    }
  };

  function onSubmit(data: z.infer<typeof SignupFormSchema>) {
    setOpen(true);
    console.log(data);

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
    <>
      <Form {...form}>
        <form
          method="POST"
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full my-[5.6875rem]"
        >
          <div className="space-y-6 my-8">
            {currentStep === 1 && (
              <>
                <FormField
                  control={form.control}
                  name="firstname"
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
                  name="lastname"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="font-medium text-sm leading-5 text-muted-foreground">
                        Last name
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
                  name="phone_number"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="font-medium text-sm leading-5 text-muted-foreground">
                        Phone number
                      </FormLabel>
                      <FormControl>
                        <Input
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
                              <EyeOffIcon
                                aria-hidden="true"
                                className="size-4"
                              />
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

                <Button
                  type="button"
                  onClick={handleNext}
                  className={cn(
                    "py-2 px-8 mb-4 rounded-[9999px] font-medium leading-5 text-muted-foreground hover:bg-transparent",
                    form.formState.isValid
                      ? "bg-primary cursor-pointer text-foreground hover:bg-primary"
                      : "bg-muted cursor-not-allowed hover:bg-muted"
                  )}
                >
                  Next
                </Button>
              </>
            )}

            {currentStep === 2 && (
              <>
                <FormField
                  control={form.control}
                  name="school"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="font-medium text-sm leading-5 text-muted-foreground">
                        School
                      </FormLabel>
                      <FormControl>
                        <Input
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
                  name="date_of_birth"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date of birth</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={
                              field.value ? new Date(field.value) : undefined
                            }
                            onSelect={(date) => {
                              if (date) {
                                field.onChange(date.toISOString());
                              } else {
                                field.onChange(null);
                              }
                            }}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
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
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a department" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {departments.map(({ id, name }) => (
                            <SelectItem key={id} value={id}>
                              {name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="internship_start_date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Internship start date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={
                              field.value ? new Date(field.value) : undefined
                            }
                            onSelect={(date) => {
                              if (date) {
                                field.onChange(date.toISOString());
                              } else {
                                field.onChange(null);
                              }
                            }}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
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
                  name="internship_end_date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Internship end date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={
                              field.value ? new Date(field.value) : undefined
                            }
                            onSelect={(date) => {
                              if (date) {
                                field.onChange(date.toISOString());
                              } else {
                                field.onChange(null);
                              }
                            }}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
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
                  name="skills"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-muted-foreground">
                        Skills
                      </FormLabel>
                      <FormControl>
                        <CreatableSelect<OptionType, true>
                          isMulti
                          isClearable
                          options={skillsOptions}
                          classNamePrefix="select"
                          className="basic-multi-select w-full text-foreground border-muted-foreground-50 rounded-md text-sm placeholder:text-muted-foreground-50"
                          placeholder="Tap to select"
                          value={skillsOptions.filter((opt) =>
                            field.value?.some(
                              (val: { name: string }) => val.name === opt.value
                            )
                          )}
                          onChange={(selected) =>
                            field.onChange(
                              selected.map((opt) => ({ name: opt.value }))
                            )
                          }
                          onBlur={field.onBlur}
                          name={field.name}
                          ref={field.ref}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="work_location"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="font-medium text-sm leading-5 text-muted-foreground">
                        Work location
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="text-foreground border border-input p-3 leading-6 placeholder:text-muted-foreground-50"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-between">
                  <Button type="button" onClick={() => setCurrentStep(1)}>
                    Back
                  </Button>
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
                </div>
              </>
            )}
          </div>
        </form>
      </Form>

      <VerifyAccountDialog open={open} setOpen={setOpen} />
    </>
  );
};
