"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Users, Star } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Rating, RatingButton } from "@/components/ui/shadcn-io/rating";

import { RatingFormSchema } from "@/lib/validation/supervisor";
import { Profile } from "@/components/features/supervisor/interns/profile";

export default function InternsPage() {
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const form = useForm<z.infer<typeof RatingFormSchema>>({
    resolver: zodResolver(RatingFormSchema),
    defaultValues: {
      rating: 0,
      feedback: "",
    },
  });

  function onSubmit(data: z.infer<typeof RatingFormSchema>) {
    console.log(data);
    setIsSubmitted(true);
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
      <Profile />
      
      {/* More Information Section */}
      <div className="bg-card rounded-lg p-2 md:p-6 space-y-8">
        <div>
          <h3 className="text-muted-foreground text-sm font-medium mb-2">
            Skills
          </h3>
          <div className="text-foreground flex flex-wrap gap-2">
            {skillsOptions.map((skill, index) => (
              <p key={index} className="bg-muted py-2 px-4 rounded-3xl ">
                {skill.value}
              </p>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-muted-foreground text-sm font-medium mb-2">
            Experience
          </h3>
          <p className="text-foreground text-base">Beginner</p>
        </div>
        <div>
          <h3 className="text-muted-foreground text-sm font-medium mb-2">
            Interests
          </h3>
          <p className="text-foreground">UI/UX, Product Design</p>
        </div>
        <div>
          <h3 className="text-muted-foreground text-sm font-medium mb-2">
            Expectations
          </h3>
          <p className="text-foreground">
            Get hands-on experience in a real-world work environment
          </p>
        </div>
      </div>

      {/* Rate Section */}
      {isSubmitted ? (
        <div className="bg-card rounded-lg p-2 md:p-6 space-y-8 flex flex-col">
          <div>
            <h3 className="text-muted-foreground text-sm font-medium mb-2">
              Ratings
            </h3>
            <p className="text-foreground flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, index) => {
                const rating = form.getValues("rating"); // your saved rating
                return (
                  <Star
                    key={index}
                    className={`w-5 h-5 ${
                      index < rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                );
              })}
            </p>
          </div>
          <div>
            <h3 className="text-muted-foreground text-sm font-medium mb-2">
              Feedback
            </h3>
            <p className="text-foreground">{form.getValues("feedback")}</p>
          </div>
        </div>
      ) : (
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="bg-card rounded-lg p-2 md:p-6 space-y-8 flex flex-col"
            >
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-foreground">
                      Rate Intern
                    </FormLabel>
                    <FormControl>
                      <Rating
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        {Array.from({ length: 5 }).map((_, index) => (
                          <RatingButton className="text-primary" key={index} />
                        ))}
                      </Rating>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="feedback"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-foreground">
                      Feedback
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="w-full p-3 h-24 resize-none text-foreground border border-muted-foreground-50 rounded-md placeholder:text-muted-foreground"
                        placeholder="Leave feedback"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="bg-muted text-muted-foreground px-6 py-3 rounded-3xl font-bold text-sm transition self-end hover:bg-primary hover:text-foreground">
                Save
              </Button>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
}
