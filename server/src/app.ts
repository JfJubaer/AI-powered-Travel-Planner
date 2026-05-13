import cors from "cors";
import express from "express";
import { aiRouter } from "./routes/aiRoutes.js";
import { authRouter } from "./routes/authRoutes.js";
import { dashboardRouter } from "./routes/dashboardRoutes.js";
import { destinationRouter } from "./routes/destinationRoutes.js";
import { tripRouter } from "./routes/tripRoutes.js";
import { userRouter } from "./routes/userRoutes.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";
import morgan from "morgan";

export function createApp() {
  const app = express();

  app.use(morgan("dev"));

  app.use(
    cors({
      origin:
        process.env.CLIENT_URL ??
        "https://ai-powered-travel-planner-client.vercel.app/",
      credentials: true,
    }),
  );
  app.use(express.json({ limit: "1mb" }));

  app.use("/api/auth", authRouter);
  app.use("/api/ai", aiRouter);
  app.use("/api/dashboard", dashboardRouter);
  app.use("/api/destinations", destinationRouter);
  app.use("/api/trips", tripRouter);
  app.use("/api/users", userRouter);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
