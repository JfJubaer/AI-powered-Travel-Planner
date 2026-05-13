import { z } from "zod";

export const userIdParamSchema = z.object({
  id: z.string().min(1)
});

export const updateUserSchema = z.object({
  name: z.string().min(2).max(80).optional(),
  email: z.string().email().toLowerCase().optional(),
  role: z.enum(["traveler", "agency", "admin"]).optional()
});
