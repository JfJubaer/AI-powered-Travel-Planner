import cors from "cors";
import express from "express";
import { aiRouter } from "./routes/ai.js";
import { dashboardRouter } from "./routes/dashboard.js";
import { destinationRouter } from "./routes/destinations.js";

export function createApp() {
  const app = express();

  app.use(
    cors({
      origin: process.env.CLIENT_URL ?? "http://localhost:3000",
      credentials: true,
    }),
  );
  app.use(express.json({ limit: "1mb" }));

  app.get("/health", (_req, res) => {
    res.json({ status: "ok", service: "ai-travel-planner-api" });
  });

  app.use("/api/ai", aiRouter);
  app.use("/api/dashboard", dashboardRouter);
  app.use("/api/destinations", destinationRouter);

  app.use((_req, res) => {
    res.status(404).json({ message: "Route not found" });
  });

  return app;
}
