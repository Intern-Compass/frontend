"use client";

import { useEffect, useState } from "react";

import ReactSelect from "react-select";
import CreatableReactSelect from "react-select/creatable";

import { useMutation, useQueryClient } from "@tanstack/react-query";

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

import { Input } from "@/components/ui/input";

import { RegisterInternFormSchema } from "@/lib/validation/auth";

import { EyeIcon, EyeOffIcon, CircleAlert } from "lucide-react";

import { cn, getDepartmentOptions, getReactSelectOptions } from "@/lib/utils";

import { VerifyAccountDialog } from "@/components/features/auth/verify-account-dialog";
import { registerIntern } from "@/lib/api/auth";
import { isAxiosError } from "axios";
import {
  programmingLanguages,
  softSkills,
  technicalPathways,
} from "@/lib/constants";

interface OptionType {
  value: string;
  label: string;
}

interface DepartmentOptionType {
  value: number;
  label: string;
}

const programmingLanguageOptions = getReactSelectOptions(programmingLanguages);
const technicalPathwayOptions = getReactSelectOptions(technicalPathways);
const softSkillOptions = getReactSelectOptions(softSkills);

const departmentOptions = getDepartmentOptions();

export const SignupForm = () => {
  const queryClient = useQueryClient();

  const [currentStep, setCurrentStep] = useState(0);

  // controls the verify-account dialog
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!open) {
      queryClient.removeQueries({ queryKey: ["signupData"] });
    }
  }, [open]);

  const form = useForm<z.infer<typeof RegisterInternFormSchema>>({
    resolver: zodResolver(RegisterInternFormSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      phone_number: "",
      email: "",
      password: "",
      school: "",
      technical_pathways: [],
      programming_languages: [],
      soft_skills: [],
      work_location: "",
    },
    mode: currentStep === 0 ? "onChange" : "onSubmit",
  });

  const mutation = useMutation({
    mutationFn: registerIntern,
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handlePrevButton = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleNextButton = async () => {
    const areStepOneInputsValid = await form.trigger([
      "firstname",
      "lastname",
      "phone_number",
      "email",
      "password",
    ]);

    if (areStepOneInputsValid) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  function onSubmit(formData: z.infer<typeof RegisterInternFormSchema>) {
    const {
      technical_pathways,
      programming_languages,
      soft_skills,
      ...fields
    } = formData;

    const modifiedFormData = {
      ...fields,
      skills: [...technical_pathways, ...programming_languages, ...soft_skills],
    };

    mutation.mutate(modifiedFormData, {
      onSuccess: (_, variables) => {
        queryClient.setQueryData(["signupData"], variables);

        toast.success(
          "A link to activate your account has been emailed to the address provided."
        );
        setOpen(true);
      },
      onError: (error) => {
        console.log(error);

        if (isAxiosError(error)) {
          if (error.status === 409) {
            toast(
              <div className="flex items-start gap-3 font-sans">
                <CircleAlert className="text-error-base" />

                <div className="flex flex-col gap-2.5 text-sm leading-5">
                  <span className="text-foreground font-medium">
                    User already exists.
                  </span>
                  <span className="text-foreground/75 font-normal">
                    Please log in with your registered email or phone number.
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
          } else {
            toast(
              <div className="flex items-start gap-3 font-sans">
                <CircleAlert className="text-error-base" />

                <div className="flex flex-col gap-2.5 text-sm leading-5">
                  <span className="text-foreground font-medium">
                    Something went wrong.
                  </span>
                  <span className="text-foreground/75 font-normal">
                    Please try again later.
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
  }

  return (
    <>
      <Form {...form}>
        <form
          method="POST"
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-120"
        >
          <div className="space-y-6 my-8">
            {currentStep === 0 && (
              <>
                {/* First name */}
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
                {/* Last name */}
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
                {/* Phone number */}
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
                          placeholder="0X0XXXXXXXXX"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Email */}
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
                {/* Password */}
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
                {/* Buttons */}
                <Button
                  type="button"
                  onClick={handleNextButton}
                  className="py-2 px-8 mb-4 rounded-[9999px] font-medium leading-5 bg-primary cursor-pointer text-foreground hover:bg-primary"
                >
                  Next
                </Button>
              </>
            )}

            {currentStep === 1 && (
              <>
                {/* School */}
                <FormField
                  control={form.control}
                  name="school"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium text-sm leading-5 text-muted-foreground">
                        School
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="text-foreground border border-input p-3 leading-6 placeholder:text-muted-foreground-50"
                          placeholder="Enter your school"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* D.O.B */}
                <FormField
                  control={form.control}
                  name="date_of_birth"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="font-medium text-sm leading-5 text-muted-foreground">
                        Date of birth
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span className="text-muted-foreground-50">
                                  Pick a date
                                </span>
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
                                field.onChange(format(date, "yyyy-MM-dd"));
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
                {/* Department */}
                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium text-sm leading-5 text-muted-foreground">
                        Department
                      </FormLabel>
                      <FormControl>
                        <ReactSelect<DepartmentOptionType, false>
                          className="basic-single"
                          classNamePrefix="select"
                          isClearable
                          isSearchable
                          options={departmentOptions}
                          value={
                            departmentOptions.find(
                              (option) => option.value === field.value
                            ) ?? null
                          }
                          onChange={(option) =>
                            field.onChange(option?.value ?? undefined)
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
                {/* Start Date */}
                <FormField
                  control={form.control}
                  name="internship_start_date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="font-medium text-sm leading-5 text-muted-foreground">
                        Internship start date
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
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
                                field.onChange(format(date, "yyyy-MM-dd"));
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
                {/* End Date */}
                <FormField
                  control={form.control}
                  name="internship_end_date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="font-medium text-sm leading-5 text-muted-foreground">
                        Internship end date
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
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
                                field.onChange(format(date, "yyyy-MM-dd"));
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
                {/* Skills */}
                <FormField
                  control={form.control}
                  name="technical_pathways"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium text-sm leading-5 text-muted-foreground">
                        Technical pathway
                      </FormLabel>
                      <FormControl>
                        <CreatableReactSelect<OptionType, true>
                          isMulti
                          isClearable
                          options={technicalPathwayOptions}
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
                {/* Skills */}
                <FormField
                  control={form.control}
                  name="programming_languages"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium text-sm leading-5 text-muted-foreground">
                        Programming languages (if applicable)
                      </FormLabel>
                      <FormControl>
                        <CreatableReactSelect<OptionType, true>
                          isMulti
                          isClearable
                          options={programmingLanguageOptions}
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
                {/* Skills */}
                <FormField
                  control={form.control}
                  name="soft_skills"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium text-sm leading-5 text-muted-foreground">
                        Soft skills
                      </FormLabel>
                      <FormControl>
                        <CreatableReactSelect<OptionType, true>
                          isMulti
                          isClearable
                          options={softSkillOptions}
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
                {/* Location */}
                <FormField
                  control={form.control}
                  name="work_location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium text-sm leading-5 text-muted-foreground">
                        Work location
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="text-foreground border border-input p-3 leading-6 placeholder:text-muted-foreground-50"
                          placeholder="123 plot, add street and state"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Buttons */}
                <div className="flex justify-between">
                  <Button
                    type="button"
                    className="text-foreground hover:bg-muted-foreground hover:text-white cursor-pointer rounded-3xl"
                    onClick={handlePrevButton}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    disabled={mutation.isPending}
                    className={cn(
                      "w-2/3 py-2 px-8 mb-4 rounded-3xl font-medium leading-5 text-muted-foreground hover:bg-transparent",
                      form.formState.isValid
                        ? "bg-primary cursor-pointer text-foreground hover:bg-muted-foreground hover:text-white"
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
