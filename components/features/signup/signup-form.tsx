"use client";

import { useState } from "react";

import ReactSelect from "react-select";
import CreatableReactSelect from "react-select/creatable";

import { useMutation } from "@tanstack/react-query";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { format } from "date-fns";
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
import { axiosAuthInstance } from "@/lib/axios";
import { VerifyAccountDialog } from "@/components/features/signup/verify-account-dialog";

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
  { value: "1", label: "Chief Executive Officer Office" },
  { value: "2", label: "Chief Operating Officer Office" },
  { value: "3", label: "Company Secretariat" },
  { value: "4", label: "Corporate Services and Sustainability" },
  { value: "5", label: "Customer Relations and Experience" },
  { value: "6", label: "Digital Services" },
  { value: "7", label: "Enterprise Business" },
  { value: "8", label: "Finance" },
  { value: "9", label: "Fixed BroadBand" },
  { value: "10", label: "Human Resources" },
  { value: "11", label: "Information Technology" },
  { value: "12", label: "Internal Audit and Forensic Services" },
  { value: "13", label: "Marketing" },
  { value: "14", label: "Network" },
  { value: "15", label: "Risk and Compliance" },
  { value: "16", label: "Sales and Distribution" },
  { value: "17", label: "Strategy and Innovation" },
];

export const SignupForm = () => {
  const [currentStep, setCurrentStep] = useState(1);

  // controls the verify-account dialog
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

  const mutation = useMutation({
    mutationFn: async (newUser: z.infer<typeof SignupFormSchema>) => {
      const response = await axiosAuthInstance.post("/register", newUser);

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

  const areStepOneInputsValid = !(
    form.getFieldState("firstname").invalid ||
    form.getFieldState("lastname").invalid ||
    form.getFieldState("phone_number").invalid ||
    form.getFieldState("email").invalid ||
    form.getFieldState("password").invalid
  );

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

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

    console.log(
      form.getFieldState("firstname").invalid ||
        form.getFieldState("lastname").invalid ||
        form.getFieldState("phone_number").invalid ||
        form.getFieldState("email").invalid ||
        form.getFieldState("password").invalid
    );
  };

  function onSubmit(data: z.infer<typeof SignupFormSchema>) {
    mutation.mutate(data, {
      onSuccess: (data) => {
        setOpen(true);
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
                  className="py-2 px-8 mb-4 rounded-[9999px] font-medium leading-5 bg-primary cursor-pointer text-foreground hover:bg-primary"
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
                            disabled={(date) => date > new Date()}
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
                          <ReactSelect<OptionType, false>
                            className="basic-single"
                            classNamePrefix="select"
                            isClearable
                            isSearchable
                            options={departments}
                            value={
                              departments.find(
                                (option) => option.value === field.value
                              ) ?? null
                            }
                            onChange={(option) =>
                              field.onChange(option?.value ?? "")
                            }
                            onBlur={field.onBlur}
                            name={field.name}
                            ref={field.ref}
                          />
                        </FormControl>
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
                        <CreatableReactSelect<OptionType, true>
                          isMulti
                          isClearable
                          options={skillsOptions}
                          classNamePrefix="select"
                          className="basic-multi-select w-full text-foreground border-muted-foreground-50 rounded-md text-sm placeholder:text-muted-foreground-50"
                          placeholder="Type or select at least three skills"
                          value={
                            field.value?.map((val) => ({
                              value: val.name,
                              label: val.name,
                            })) ?? []
                          }
                          onChange={(selected) =>
                            field.onChange(
                              selected.map((option) => ({ name: option.value }))
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
