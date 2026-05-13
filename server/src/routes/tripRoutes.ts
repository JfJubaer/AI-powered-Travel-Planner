import { Router } from "express";
import { createTrip, deleteTrip, getTripById, listTrips, updateTrip } from "../controllers/tripController.js";
import { authenticate, authorize } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validate.js";
import { createTripSchema, tripIdParamSchema, updateTripSchema } from "../validators/tripValidator.js";

export const tripRouter = Router();

tripRouter.use(authenticate);

tripRouter.get("/", authorize("traveler", "agency", "admin"), listTrips);
tripRouter.post("/", authorize("traveler", "agency", "admin"), validate({ body: createTripSchema }), createTrip);
tripRouter.get("/:id", validate({ params: tripIdParamSchema }), getTripById);
tripRouter.patch("/:id", validate({ params: tripIdParamSchema, body: updateTripSchema }), updateTrip);
tripRouter.delete("/:id", validate({ params: tripIdParamSchema }), deleteTrip);
