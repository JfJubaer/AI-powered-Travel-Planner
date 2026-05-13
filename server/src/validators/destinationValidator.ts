import { z } from "zod";

export const destinationQuerySchema = z.object({
  search: z.string().optional().default(""),
  style: z.string().optional().default(""),
  budget: z.string().optional().default("")
});

export const destinationIdParamSchema = z.object({
  id: z.string().min(1)
});

export const destinationCreateSchema = z.object({
  name: z.string().min(2),
  country: z.string().min(2),
  region: z.string().min(2),
  style: z.array(z.string().min(2)).min(1),
  budgetLevel: z.enum(["value", "balanced", "premium"]),
  bestMonths: z.array(z.string().min(3)).min(1),
  averageDailyCost: z.coerce.number().min(1),
  imageUrl: z.string().url(),
  highlights: z.array(z.string().min(2)).min(1),
  rating: z.coerce.number().min(0).max(5),
  safetyScore: z.coerce.number().min(0).max(100),
  summary: z.string().min(10)
});

export const destinationUpdateSchema = destinationCreateSchema.partial();
