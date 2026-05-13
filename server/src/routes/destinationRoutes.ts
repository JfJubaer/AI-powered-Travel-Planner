import { Router } from "express";
import {
  createDestination,
  deleteDestination,
  getDestinationById,
  listDestinations,
  updateDestination
} from "../controllers/destinationController.js";
import { authenticate, authorize } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validate.js";
import {
  destinationCreateSchema,
  destinationIdParamSchema,
  destinationQuerySchema,
  destinationUpdateSchema
} from "../validators/destinationValidator.js";

export const destinationRouter = Router();

destinationRouter.get("/", validate({ query: destinationQuerySchema }), listDestinations);
destinationRouter.get("/:id", validate({ params: destinationIdParamSchema }), getDestinationById);
destinationRouter.post("/", authenticate, authorize("admin"), validate({ body: destinationCreateSchema }), createDestination);
destinationRouter.patch(
  "/:id",
  authenticate,
  authorize("admin"),
  validate({ params: destinationIdParamSchema, body: destinationUpdateSchema }),
  updateDestination
);
destinationRouter.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  validate({ params: destinationIdParamSchema }),
  deleteDestination
);
