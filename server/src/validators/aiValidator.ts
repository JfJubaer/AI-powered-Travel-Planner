import { z } from "zod";

export const itinerarySchema = z.object({
  destination: z.string().min(2),
  durationDays: z.coerce.number().int().min(1).max(21),
  budget: z.coerce.number().min(200).max(100000),
  style: z.string().min(2)
});

export const recommendationSchema = z.object({
  origin: z.string().min(2),
  month: z.string().min(3),
  budget: z.coerce.number().min(200).max(100000),
  travelers: z.coerce.number().int().min(1).max(20),
  style: z.string().min(2),
  interests: z.array(z.string()).default([])
});
