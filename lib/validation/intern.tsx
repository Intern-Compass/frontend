import { format } from "date-fns";
import { z } from "zod";

export const ProfileFormSchema = z.object({
  skills: z
    .array(z.object({ name: z.string() }), {
      // handles empty input case
      error: "Please select at least three skills.",
    })
    .min(3, {
      error: "Please select at least three skills.",
    }),
  experience: z.string().optional(),
  interests: z.string().optional(),
  expectations: z.string().optional(),
});

export const CreateTodoFormSchema = z
  .object({
    title: z
      .string()
      .min(1, {
        error: "Please provide a valid title.",
      })
      .trim(),
    description: z.string().trim(),
  })
  .required();

export const CreateProjectFormSchema = z
  .object({
    title: z
      .string()
      .min(1, {
        error: "Please provide a valid title.",
      })
      .trim(),
    description: z
      .string()
      .min(1, {
        error: "Please provide a valid description.",
      })
      .trim(),
    resources: z
      .any()
      .refine((files) => files?.length === 1, "File is required.")
      .refine(
        (files) => files?.[0]?.size <= 5 * 1024 * 1024,
        "File must be less than 5MB."
      ),
    interns: z
      .string()
      .min(1, {
        error: "Please provide an intern.",
      })
      .trim(),
    due_date: z.iso.date({
      error: "Please provide a valid due date.",
    }),
    comments: z.string().trim(),
  })
  .required();

export const RatingFormSchema = z.object({
  rating: z
    .number({
      error: "Please provide a rating.",
    })
    .min(1, {
      error: "Rating must be at least 1 star.",
    })
    .max(5, {
      error: "Rating cannot exceed 5 stars.",
    }),
  feedback: z.string().min(10, {
    error: "Please leave a feedback.",
  }),
});
