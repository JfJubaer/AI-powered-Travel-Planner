import type { Request, Response } from "express";
import {
  generateItinerary,
  recommendDestinations,
} from "../services/aiService.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { HttpError } from "../utils/httpError.js";

export const createItinerary = asyncHandler(
  async (req: Request, res: Response) => {
    let itinerary;

    try {
      itinerary = await generateItinerary(req.body);
    } catch (error) {
      throw new HttpError(
        503,
        error instanceof Error
          ? error.message
          : "Unable to generate itinerary right now.",
      );
    }

    res.json(itinerary);
  },
);

export const createRecommendations = asyncHandler(
  async (req: Request, res: Response) => {
    const recommendations = await recommendDestinations(req.body);
    res.json({ recommendations });
  },
);
