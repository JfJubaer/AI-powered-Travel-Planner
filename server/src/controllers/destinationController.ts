import type { Request, Response } from "express";
import { Destination, type DestinationRecord } from "../models/Destination.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { HttpError } from "../utils/httpError.js";

type DestinationView = DestinationRecord & { _id?: string };

export const listDestinations = asyncHandler(async (req: Request, res: Response) => {
  const search = String(req.query.search ?? "").toLowerCase();
  const country = String(req.query.country ?? "").toLowerCase();
  const style = String(req.query.style ?? "").toLowerCase();
  const budget = String(req.query.budget ?? "").toLowerCase();
  const sortBy = req.query.sortBy === "popularity" ? "popularity" : "rating";
  const page = Math.max(Number(req.query.page ?? 1) || 1, 1);
  const limit = Math.min(Math.max(Number(req.query.limit ?? 12) || 12, 1), 48);

  const source = await Destination.find().lean<DestinationView[]>();

  const availableCountries = [...new Set(source.map((destination) => destination.country))].sort((a, b) =>
    a.localeCompare(b),
  );

  const filteredDestinations = source.filter((destination) => {
    const matchesSearch = search
      ? [destination.name, destination.country, destination.region, destination.summary].some((value) =>
          value.toLowerCase().includes(search),
        ) || destination.style.some((value) => value.toLowerCase().includes(search))
      : true;
    const matchesCountry = country ? destination.country.toLowerCase() === country : true;
    const matchesStyle = style ? destination.style.some((value) => value.toLowerCase().includes(style)) : true;
    const matchesBudget = budget ? destination.budgetLevel === budget : true;

    return matchesSearch && matchesCountry && matchesStyle && matchesBudget;
  });

  const sortedDestinations = filteredDestinations.sort((left, right) => {
    if (sortBy === "popularity") {
      return getPopularityScore(right) - getPopularityScore(left) || right.rating - left.rating;
    }

    return right.rating - left.rating || getPopularityScore(right) - getPopularityScore(left);
  });

  const total = sortedDestinations.length;
  const totalPages = total === 0 ? 0 : Math.ceil(total / limit);
  const currentPage = totalPages === 0 ? 1 : Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * limit;
  const destinations = sortedDestinations.slice(startIndex, startIndex + limit);

  res.json({
    destinations,
    total,
    page: currentPage,
    limit,
    totalPages,
    availableCountries,
  });
});

export const getDestinationById = asyncHandler(async (req: Request, res: Response) => {
  const destinationId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const source = await Destination.find().lean<DestinationView[]>();
  const destination = (await Destination.findById(destinationId).lean<DestinationView | null>()) ?? undefined;

  if (!destination) {
    throw new HttpError(404, "Destination not found");
  }

  const relatedDestinations = source
    .filter((candidate) => candidate.name !== destination.name)
    .sort((left, right) => getRelatedScore(right, destination) - getRelatedScore(left, destination))
    .slice(0, 3);

  return res.json({
    destination,
    relatedDestinations,
  });
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

function getPopularityScore(destination: {
  rating: number;
  safetyScore: number;
  averageDailyCost: number;
  style: string[];
  highlights: string[];
}) {
  const affordabilityBoost = Math.max(0, 280 - destination.averageDailyCost) / 14;

  return Math.round(
    destination.rating * 20 +
      destination.safetyScore * 0.7 +
      affordabilityBoost +
      destination.style.length * 3 +
      destination.highlights.length * 2,
  );
}

function getRelatedScore(candidate: DestinationRecord, current: DestinationRecord) {
  const sharedStyles = candidate.style.filter((style) => current.style.includes(style)).length;
  const sameRegion = candidate.region === current.region ? 4 : 0;
  const sameBudget = candidate.budgetLevel === current.budgetLevel ? 2 : 0;

  return sharedStyles * 5 + sameRegion + sameBudget + candidate.rating;
}
