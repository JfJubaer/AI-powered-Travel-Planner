import { Router } from "express";
import { z } from "zod";
import { isDatabaseConnected } from "../lib/database.js";
import { Trip } from "../models/Trip.js";
import { generateItinerary, recommendDestinations } from "../services/aiService.js";

export const aiRouter = Router();

const itinerarySchema = z.object({
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

const recommendationSchema = z.object({
  origin: z.string().min(2),
  month: z.string().min(3),
  budget: z.coerce.number().min(200).max(100000),
  travelers: z.coerce.number().int().min(1).max(20),
  style: z.string().min(2),
  interests: z.array(z.string()).default([])
});

aiRouter.post("/itinerary", async (req, res) => {
  const parsed = itinerarySchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid itinerary request", issues: parsed.error.flatten() });
  }

  const itinerary = await generateItinerary(parsed.data);

  if (isDatabaseConnected()) {
    await Trip.create({
      destination: itinerary.destination,
      durationDays: parsed.data.durationDays,
      travelers: parsed.data.travelers,
      budget: parsed.data.budget,
      style: parsed.data.style,
      pace: parsed.data.pace,
      itinerary: itinerary.itinerary,
      estimatedTotal: itinerary.estimatedTotal,
      createdByRole: parsed.data.role
    });
  }

  return res.json(itinerary);
});

aiRouter.post("/recommendations", async (req, res) => {
  const parsed = recommendationSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid recommendation request", issues: parsed.error.flatten() });
  }

  const recommendations = await recommendDestinations(parsed.data);
  return res.json({ recommendations });
});
