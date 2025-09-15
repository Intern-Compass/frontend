import { z } from "zod";

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
