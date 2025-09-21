"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import CreatableSelect from "react-select/creatable";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { ProfileFormSchema } from "@/lib/validation/intern";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import axiosInstance from "@/lib/axios";

import { attachNewSkills, getAllSkills } from "@/lib/api/intern";

export interface Skill {
  name: string;
}

type OptionType = {
  value: string;
  label: string;
};

const skillsOptions: OptionType[] = [
  { value: "cybersecurity", label: "Cybersecurity" },
  { value: "developer", label: "Developer" },
  { value: "frontend", label: "Front-end" },
  { value: "backend", label: "Back-end" },
  { value: "ui/ux", label: "UI/UX" },
];

interface AccountFormProps {
  hideForm: () => void;
}

export const AccountForm = ({ hideForm }: AccountFormProps) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: attachNewSkills,
  });

  const {
    isPending,
    isError,
    data: allSkills,
    error,
  } = useQuery({
    queryKey: ["allSkills"],
    queryFn: getAllSkills,
  });

  const labelledSkills = (allSkills ?? []).map((skill: Skill) => ({
    label: skill.name,
    value: skill.name.toLowerCase(),
  }));

  const form = useForm<z.infer<typeof ProfileFormSchema>>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: {
      skills: [],
      experience: "",
      interests: "",
      expectations: "",
    },
  });

  function onSubmit(formData: z.infer<typeof ProfileFormSchema>) {
    if (formData.skills && formData.skills.length > 0) {
      mutation.mutate(formData.skills, {
        onSuccess: () => {
          hideForm();

          queryClient.invalidateQueries({ queryKey: ["userSkills"] });
        },
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="lg:w-4/5 space-y-6 flex flex-col px-4"
      >
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
                  options={isPending ? skillsOptions : labelledSkills}
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
          name="experience"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-muted-foreground">
                Experience
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="w-full p-3 text-foreground border border-muted-foreground-50 rounded-md placeholder:text-muted-foreground-50"
                  placeholder="Enter experience acquired"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="interests"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-muted-foreground">
                Interests
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="w-full p-3 text-foreground  border border-muted-foreground-50 rounded-md placeholder:text-muted-foreground-50"
                  placeholder="Enter interests"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="expectations"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-muted-foreground">
                Expectations
              </FormLabel>
              <FormControl>
                <Textarea
                  className="w-full p-3 h-24 resize-none text-foreground border border-muted-foreground-50 rounded-md placeholder:text-muted-foreground"
                  placeholder="Describe your expectations for your internship period"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="bg-muted text-muted-foreground px-6 py-3 rounded-3xl font-bold text-sm transition self-end hover:bg-primary hover:text-foreground">
          Upload
        </Button>
      </form>
    </Form>
  );
};
