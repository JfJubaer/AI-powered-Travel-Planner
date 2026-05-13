import { Router } from "express";
import { fallbackDestinations } from "../data/destinations.js";
import { isDatabaseConnected } from "../lib/database.js";
import { Trip } from "../models/Trip.js";

export const dashboardRouter = Router();

dashboardRouter.get("/:role", async (req, res) => {
  const role = req.params.role as "traveler" | "agency" | "admin";
  const validRoles = ["traveler", "agency", "admin"];

  if (!validRoles.includes(role)) {
    return res.status(400).json({ message: "Unsupported role" });
  }

  const tripCount = isDatabaseConnected() ? await Trip.countDocuments(role === "admin" ? {} : { createdByRole: role }) : 24;
  const recentTrips = isDatabaseConnected()
    ? await Trip.find(role === "admin" ? {} : { createdByRole: role }).sort({ createdAt: -1 }).limit(4).lean()
    : [];

  const roleMetrics = {
    traveler: [
      { label: "Saved trips", value: tripCount || 12, trend: "+18%" },
      { label: "Budget accuracy", value: "94%", trend: "+7%" },
      { label: "Upcoming days", value: 16, trend: "2 trips" }
    ],
    agency: [
      { label: "Client plans", value: tripCount || 38, trend: "+21%" },
      { label: "Proposal win rate", value: "47%", trend: "+5%" },
      { label: "Avg. trip value", value: "$4.8k", trend: "+12%" }
    ],
    admin: [
      { label: "Generated plans", value: tripCount || 214, trend: "+32%" },
      { label: "Active destinations", value: fallbackDestinations.length, trend: "curated" },
      { label: "AI success rate", value: "99.2%", trend: "stable" }
    ]
  };

  res.json({
    role,
    metrics: roleMetrics[role],
    recentTrips: recentTrips.length
      ? recentTrips
      : [
          { destination: "Kyoto", style: "Culture", estimatedTotal: 2480, durationDays: 7 },
          { destination: "Lisbon", style: "Food and coast", estimatedTotal: 1640, durationDays: 5 },
          { destination: "Queenstown", style: "Adventure", estimatedTotal: 3900, durationDays: 8 }
        ],
    recommendations: fallbackDestinations.slice(0, 3)
  });
});
