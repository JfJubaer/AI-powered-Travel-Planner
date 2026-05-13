import type { Request, Response } from "express";
import { Trip } from "../models/Trip.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { HttpError } from "../utils/httpError.js";

function getTripFilter(req: Request) {
  return req.user?.role === "admin" ? {} : { user: req.user?.id };
}

export const listTrips = asyncHandler(async (req: Request, res: Response) => {
  const trips = await Trip.find(getTripFilter(req)).sort({ createdAt: -1 });
  res.json({ trips });
});

export const getTripById = asyncHandler(async (req: Request, res: Response) => {
  const trip = await Trip.findOne({ _id: req.params.id, ...getTripFilter(req) });

  if (!trip) {
    throw new HttpError(404, "Trip not found");
  }

  res.json({ trip });
});

export const createTrip = asyncHandler(async (req: Request, res: Response) => {
  const trip = await Trip.create({
    ...req.body,
    user: req.user?.id,
    createdByRole: req.user?.role ?? "traveler"
  });

  res.status(201).json({ trip });
});

export const updateTrip = asyncHandler(async (req: Request, res: Response) => {
  const trip = await Trip.findOneAndUpdate({ _id: req.params.id, ...getTripFilter(req) }, req.body, {
    new: true,
    runValidators: true
  });

  if (!trip) {
    throw new HttpError(404, "Trip not found");
  }

  res.json({ trip });
});

export const deleteTrip = asyncHandler(async (req: Request, res: Response) => {
  const trip = await Trip.findOneAndDelete({ _id: req.params.id, ...getTripFilter(req) });

  if (!trip) {
    throw new HttpError(404, "Trip not found");
  }

  res.status(204).send();
});
