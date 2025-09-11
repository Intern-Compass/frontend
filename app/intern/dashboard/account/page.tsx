"use client";

import React from "react";
import CreatableReactSelect from "react-select/creatable";
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

import { UsersRound } from "lucide-react";

import { ProfileFormSchema } from "@/lib/validation/intern";

export default function AccountPage() {
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const form = useForm<z.infer<typeof ProfileFormSchema>>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: {
      skills: [],
      experience: "",
      interests: "",
      expectations: "",
    },
  });

  function onSubmit(data: z.infer<typeof ProfileFormSchema>) {
    console.log(data);

    setIsSubmitted(true);
    toast("You submitted the following values", {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
          <code className="text-muted-foreground">
            {JSON.stringify(data, null, 2)}
          </code>
        </pre>
      ),
    });
  }

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

  return (
    <div className="flex-1 bg-white p-4 md:p-8">
      {/* Profile Section */}
      <div className="bg-card rounded-lg p-2 md:p-6">
        <div className="mb-4 flex items-center">
          <UsersRound />
          <h2 className="text-2xl font-medium ml-2">Profile</h2>
        </div>
        {/* Intern Details */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4">
            <h3 className="text-foreground font-medium mb-2">Name</h3>
            <p className="text-muted-foreground text-sm">John Doe</p>
          </div>
          <div className="p-4">
            <h3 className="text-foreground font-medium mb-2">Email</h3>
            <p className="text-muted-foreground text-sm">johndoe@gmail.com</p>
          </div>
          <div className="p-4">
            <h3 className="text-foreground font-medium mb-2">
              Internship Duration
            </h3>
            <p className="text-muted-foreground text-sm">6 months</p>
          </div>
          <div className="p-4">
            <h3 className="text-foreground font-medium mb-2">School</h3>
            <p className="text-muted-foreground text-sm">
              Convenant University
            </p>
          </div>
          <div className="p-4">
            <h3 className="text-foreground font-medium mb-2">Phone no</h3>
            <p className="text-muted-foreground text-sm">08062061234</p>
          </div>
          <div className="p-4">
            <h3 className="text-foreground font-medium mb-2">Department</h3>
            <p className="text-muted-foreground text-sm">
              Information Technology
            </p>
          </div>
        </div>
      </div>

      {/* More Information Section */}
      {isSubmitted ? (
        <div className="bg-card rounded-lg p-2 md:p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-medium">More Information</h2>
            <button
              className="px-6 py-2 rounded-3xl font-bold text-sm transition bg-primary text-foreground hover:bg-muted hover:text-muted-foreground"
              onClick={() => setIsSubmitted(false)}
            >
              Edit
            </button>
          </div>

          <div className="w-full">
            <div className="p-4">
              <h3 className="text-muted-foreground text-sm font-medium mb-2">
                Skills
              </h3>
              <div className="text-foreground flex flex-wrap gap-2">
                {form.getValues("skills").map((skill, i) => (
                  <p key={i} className="bg-muted py-2 px-4 rounded-3xl ">
                    {skill.name}
                  </p>
                ))}
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-muted-foreground text-sm font-medium mb-2">
                Experience
              </h3>
              <div>{form.getValues("experience")}</div>
            </div>
            <div className="p-4">
              <h3 className="text-muted-foreground text-sm font-medium mb-2">
                Interests
              </h3>
              <div>{form.getValues("interests")}</div>
            </div>
            <div className="p-4">
              <h3 className="text-muted-foreground text-sm font-medium mb-2">
                Expectations
              </h3>
              <div>{form.getValues("expectations")}</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-card rounded-lg p-2 md:p-6">
          <h2 className="text-2xl font-medium mb-6">More Information</h2>
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
        </div>
      )}
    </div>
  );
}
1;
