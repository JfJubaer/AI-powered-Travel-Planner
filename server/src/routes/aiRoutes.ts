import { Router } from "express";
import { createItinerary, createRecommendations } from "../controllers/aiController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validate.js";
import { itinerarySchema, recommendationSchema } from "../validators/aiValidator.js";

export const aiRouter = Router();

aiRouter.post("/itinerary", validate({ body: itinerarySchema }), createItinerary);
aiRouter.post("/recommendations", validate({ body: recommendationSchema }), createRecommendations);
aiRouter.post("/secure/itinerary", authenticate, validate({ body: itinerarySchema }), createItinerary);
aiRouter.post("/secure/recommendations", authenticate, validate({ body: recommendationSchema }), createRecommendations);
