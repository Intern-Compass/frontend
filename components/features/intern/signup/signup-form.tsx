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

import { cn } from "@/lib/utils";

import { VerifyAccountDialog } from "@/components/features/auth/verify-account-dialog";
import { registerIntern } from "@/lib/api/auth";
import { isAxiosError } from "axios";

interface SkillOptionType {
  value: string;
  label: string;
}

interface DepartmentOptionType {
  value: number;
  label: string;
}

const skillsOptions: SkillOptionType[] = [
  { value: "Cybersecurity", label: "Cybersecurity" },
  { value: "Developer", label: "Developer" },
  { value: "Frontend", label: "Front-end" },
  { value: "Backend", label: "Back-end" },
  { value: "UI / UX", label: "UI/UX" },
];

export const programmingLanguages = [
  { value: "JavaScript", label: "JavaScript" },
  { value: "TypeScript", label: "TypeScript" },
  { value: "Python", label: "Python" },
  { value: "Java", label: "Java" },
  { value: "C#", label: "C#" },
  { value: "C / C++", label: "C / C++" },
  { value: "Go", label: "Go" },
  { value: "Rust", label: "Rust" },
  { value: "PHP", label: "PHP" },
  { value: "Ruby", label: "Ruby" },
  { value: "Swift", label: "Swift" },
  { value: "Kotlin", label: "Kotlin" },
  { value: "Dart", label: "Dart" },
  { value: "Scala", label: "Scala" },
  { value: "SQL / PL/SQL", label: "SQL / PL/SQL" },
  { value: "Bash / Shell scripting", label: "Bash / Shell scripting" },
];

export const technicalPathways = [
  { value: "Frontend Web Development", label: "Frontend Web Development" },
  { value: "Backend / API Development", label: "Backend / API Development" },
  { value: "Fullstack Development", label: "Fullstack Development" },
  { value: "Mobile App Development", label: "Mobile App Development" },
  { value: "Cloud Computing / DevOps", label: "Cloud Computing / DevOps" },
  {
    value: "Data Science / Machine Learning",
    label: "Data Science / Machine Learning",
  },
  {
    value: "Cybersecurity / Ethical Hacking",
    label: "Cybersecurity / Ethical Hacking",
  },
  { value: "Embedded Systems / IoT", label: "Embedded Systems / IoT" },
  { value: "Game Development", label: "Game Development" },
  { value: "Blockchain / Web3", label: "Blockchain / Web3" },
  { value: "Software Testing / QA", label: "Software Testing / QA" },
  { value: "AI / NLP / Computer Vision", label: "AI / NLP / Computer Vision" },
  {
    value: "Database Administration / Big Data",
    label: "Database Administration / Big Data",
  },
];

export const softSkills = [
  { value: "Communication", label: "Communication" },
  { value: "Presentation Skills", label: "Presentation Skills" },
  { value: "Active Listening", label: "Active Listening" },
  { value: "Negotiation", label: "Negotiation" },
  { value: "Leadership", label: "Leadership" },
  { value: "Team Management", label: "Team Management" },
  { value: "Project Management", label: "Project Management" },
  { value: "Strategic Planning", label: "Strategic Planning" },
  { value: "Decision Making", label: "Decision Making" },
  { value: "Problem Solving", label: "Problem Solving" },
  { value: "Critical Thinking", label: "Critical Thinking" },
  { value: "Conflict Resolution", label: "Conflict Resolution" },
  { value: "Time Management", label: "Time Management" },
  { value: "Organization", label: "Organization" },
  { value: "Adaptability / Flexibility", label: "Adaptability / Flexibility" },
  { value: "Collaboration / Teamwork", label: "Collaboration / Teamwork" },
  {
    value: "Empathy / Emotional Intelligence",
    label: "Empathy / Emotional Intelligence",
  },
  { value: "Customer Focus", label: "Customer Focus" },
  { value: "Business Acumen", label: "Business Acumen" },
  { value: "Innovation / Creativity", label: "Innovation / Creativity" },
  { value: "Stakeholder Management", label: "Stakeholder Management" },
  { value: "Change Management", label: "Change Management" },
  { value: "Other", label: "Other" },
];

export const departments: DepartmentOptionType[] = [
  { value: 0, label: "Chief Executive Officer Office" },
  { value: 1, label: "Chief Operating Officer Office" },
  { value: 2, label: "Company Secretariat" },
  { value: 3, label: "Corporate Services and Sustainability" },
  { value: 4, label: "Customer Relations and Experience" },
  { value: 5, label: "Digital Services" },
  { value: 6, label: "Enterprise Business" },
  { value: 7, label: "Finance" },
  { value: 8, label: "Fixed BroadBand" },
  { value: 9, label: "Human Resources" },
  { value: 10, label: "Information Technology" },
  { value: 11, label: "Internal Audit and Forensic Services" },
  { value: 12, label: "Marketing" },
  { value: 13, label: "Network" },
  { value: 14, label: "Risk and Compliance" },
  { value: 15, label: "Sales and Distribution" },
  { value: 16, label: "Strategy and Innovation" },
];

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
                          options={departments}
                          value={
                            departments.find(
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
                        <CreatableReactSelect<SkillOptionType, true>
                          isMulti
                          isClearable
                          options={technicalPathways}
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
                        <CreatableReactSelect<SkillOptionType, true>
                          isMulti
                          isClearable
                          options={programmingLanguages}
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
                        <CreatableReactSelect<SkillOptionType, true>
                          isMulti
                          isClearable
                          options={softSkills}
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
