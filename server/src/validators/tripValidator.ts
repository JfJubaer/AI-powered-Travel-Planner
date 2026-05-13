import { z } from "zod";

export const tripIdParamSchema = z.object({
  id: z.string().min(1)
});

export const createTripSchema = z.object({
  destination: z.string().min(2),
  durationDays: z.coerce.number().int().min(1).max(30),
  travelers: z.coerce.number().int().min(1).max(20),
  budget: z.coerce.number().min(100),
  style: z.string().min(2),
  pace: z.string().min(2),
  estimatedTotal: z.coerce.number().min(0).default(0),
  itinerary: z
    .array(
      z.object({
        day: z.coerce.number().int().min(1),
        title: z.string().min(2),
        morning: z.string().min(2),
        afternoon: z.string().min(2),
        evening: z.string().min(2),
        localTip: z.string().min(2)
      })
    )
    .default([])
});

export const updateTripSchema = createTripSchema.partial();
