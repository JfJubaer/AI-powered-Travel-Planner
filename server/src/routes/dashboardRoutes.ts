import { Router } from "express";
import { getDashboardByRole } from "../controllers/dashboardController.js";

export const dashboardRouter = Router();

dashboardRouter.get("/:role", getDashboardByRole);
