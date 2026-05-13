import type { Request, Response } from "express";
import { fallbackDestinations } from "../data/destinations.js";
import { isDatabaseConnected } from "../lib/database.js";
import { Destination, type DestinationDocument } from "../models/Destination.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { HttpError } from "../utils/httpError.js";

export const listDestinations = asyncHandler(async (req: Request, res: Response) => {
  const search = String(req.query.search ?? "").toLowerCase();
  const style = String(req.query.style ?? "").toLowerCase();
  const budget = String(req.query.budget ?? "").toLowerCase();

  const source: DestinationDocument[] =
    isDatabaseConnected() && (await Destination.countDocuments()) > 0
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

export const getDestinationById = asyncHandler(async (req: Request, res: Response) => {
  if (!isDatabaseConnected()) {
    const destinationId = String(req.params.id).toLowerCase();
    const destination = fallbackDestinations.find((item) => item.name.toLowerCase() === destinationId);

    if (!destination) {
      throw new HttpError(404, "Destination not found");
    }

    return res.json({ destination });
  }

  const destination = await Destination.findById(req.params.id);

  if (!destination) {
    throw new HttpError(404, "Destination not found");
  }

  return res.json({ destination });
});

export const createDestination = asyncHandler(async (req: Request, res: Response) => {
  const destination = await Destination.create(req.body);
  res.status(201).json({ destination });
});

export const updateDestination = asyncHandler(async (req: Request, res: Response) => {
  const destination = await Destination.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!destination) {
    throw new HttpError(404, "Destination not found");
  }

  res.json({ destination });
});

export const deleteDestination = asyncHandler(async (req: Request, res: Response) => {
  const destination = await Destination.findByIdAndDelete(req.params.id);

  if (!destination) {
    throw new HttpError(404, "Destination not found");
  }

  res.status(204).send();
});
