import { z } from "zod";

export const itinerarySchema = z.object({
  destination: z.string().min(2),
  startDate: z.string().min(4),
  durationDays: z.coerce.number().int().min(1).max(21),
  travelers: z.coerce.number().int().min(1).max(20),
  budget: z.coerce.number().min(200).max(100000),
  style: z.string().min(2),
  pace: z.string().min(2),
  interests: z.array(z.string()).default([]),
  role: z.enum(["traveler", "agency", "admin"]).default("traveler")
});

export const recommendationSchema = z.object({
  origin: z.string().min(2),
  month: z.string().min(3),
  budget: z.coerce.number().min(200).max(100000),
  travelers: z.coerce.number().int().min(1).max(20),
  style: z.string().min(2),
  interests: z.array(z.string()).default([])
});
