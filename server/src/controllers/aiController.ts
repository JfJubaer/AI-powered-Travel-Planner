import type { Request, Response } from "express";
import { isDatabaseConnected } from "../lib/database.js";
import { Trip } from "../models/Trip.js";
import { generateItinerary, recommendDestinations } from "../services/aiService.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createItinerary = asyncHandler(async (req: Request, res: Response) => {
  const itinerary = await generateItinerary(req.body);

  if (isDatabaseConnected()) {
    await Trip.create({
      user: req.user?.id,
      destination: itinerary.destination,
      durationDays: req.body.durationDays,
      travelers: req.body.travelers,
      budget: req.body.budget,
      style: req.body.style,
      pace: req.body.pace,
      itinerary: itinerary.itinerary,
      estimatedTotal: itinerary.estimatedTotal,
      createdByRole: req.user?.role ?? req.body.role
    });
  }

  res.json(itinerary);
});

export const createRecommendations = asyncHandler(async (req: Request, res: Response) => {
  const recommendations = await recommendDestinations(req.body);
  res.json({ recommendations });
});
