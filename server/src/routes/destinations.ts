import { Router } from "express";
import { fallbackDestinations } from "../data/destinations.js";
import { isDatabaseConnected } from "../lib/database.js";
import { Destination, type DestinationDocument } from "../models/Destination.js";

export const destinationRouter = Router();

destinationRouter.get("/", async (req, res) => {
  const search = String(req.query.search ?? "").toLowerCase();
  const style = String(req.query.style ?? "").toLowerCase();
  const budget = String(req.query.budget ?? "").toLowerCase();

  const source: DestinationDocument[] = isDatabaseConnected() && (await Destination.countDocuments()) > 0
    ? await Destination.find().lean<DestinationDocument[]>()
    : fallbackDestinations;

  const destinations = source.filter((destination) => {
    const matchesSearch = search
      ? [destination.name, destination.country, destination.region].some((value) => value.toLowerCase().includes(search))
      : true;
    const matchesStyle = style ? destination.style.some((value) => value.toLowerCase().includes(style)) : true;
    const matchesBudget = budget ? destination.budgetLevel === budget : true;

    return matchesSearch && matchesStyle && matchesBudget;
  });

  res.json({ destinations });
});
