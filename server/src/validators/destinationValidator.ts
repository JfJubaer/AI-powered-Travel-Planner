import { z } from "zod";

export const destinationQuerySchema = z.object({
  search: z.string().optional().default(""),
  country: z.string().optional().default(""),
  style: z.string().optional().default(""),
  budget: z.string().optional().default(""),
  sortBy: z.enum(["rating", "popularity"]).optional().default("rating"),
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(48).optional().default(12)
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
