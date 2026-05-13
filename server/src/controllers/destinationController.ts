import type { Request, Response } from "express";
import mongoose from "mongoose";
import { fallbackDestinations } from "../data/destinations.js";
import {
  destinationDetailsBySlug,
  type DestinationBudgetDetails,
  type DestinationDetailMetadata,
  type DestinationGalleryImage,
  type DestinationReview,
  type DestinationSeasonNote,
  type DestinationTravelTip,
} from "../data/destinationDetails.js";
import { isDatabaseConnected } from "../lib/database.js";
import { Destination, type DestinationRecord } from "../models/Destination.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { HttpError } from "../utils/httpError.js";

export const listDestinations = asyncHandler(async (req: Request, res: Response) => {
  const search = String(req.query.search ?? "").toLowerCase();
  const country = String(req.query.country ?? "").toLowerCase();
  const style = String(req.query.style ?? "").toLowerCase();
  const budget = String(req.query.budget ?? "").toLowerCase();
  const sortBy = req.query.sortBy === "popularity" ? "popularity" : "rating";
  const page = Math.max(Number(req.query.page ?? 1) || 1, 1);
  const limit = Math.min(Math.max(Number(req.query.limit ?? 12) || 12, 1), 48);

  const source: DestinationRecord[] =
    isDatabaseConnected() && (await Destination.countDocuments()) > 0
      ? await Destination.find().lean<DestinationRecord[]>()
      : fallbackDestinations;

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
  const rawDestinationId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const destinationId = String(rawDestinationId).toLowerCase();
  const usingDatabase = isDatabaseConnected() && (await Destination.countDocuments()) > 0;
  const source: DestinationRecord[] = usingDatabase
    ? await Destination.find().lean<DestinationRecord[]>()
      : fallbackDestinations;

  let destination = findDestination(source, destinationId);

  if (!destination && usingDatabase && mongoose.Types.ObjectId.isValid(rawDestinationId)) {
    destination = (await Destination.findById(rawDestinationId).lean<DestinationRecord | null>()) ?? undefined;
  }

  if (!destination) {
    throw new HttpError(404, "Destination not found");
  }

  const relatedDestinations = source
    .filter((candidate) => candidate.name !== destination.name)
    .sort((left, right) => getRelatedScore(right, destination) - getRelatedScore(left, destination))
    .slice(0, 3);

  const metadata = getDestinationDetailMetadata(destination);

  return res.json({
    destination,
    galleryImages: metadata.galleryImages,
    budgetDetails: metadata.budgetDetails,
    bestTimeToVisit: metadata.bestTimeToVisit,
    reviews: metadata.reviews,
    travelTips: metadata.travelTips,
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

function findDestination(source: DestinationRecord[], requestedId: string) {
  return source.find((item) => {
    const slug = slugifyDestination(item.name);
    return item.name.toLowerCase() === requestedId || slug === requestedId;
  });
}

function slugifyDestination(name: string) {
  return name
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function getRelatedScore(candidate: DestinationRecord, current: DestinationRecord) {
  const sharedStyles = candidate.style.filter((style) => current.style.includes(style)).length;
  const sameRegion = candidate.region === current.region ? 4 : 0;
  const sameBudget = candidate.budgetLevel === current.budgetLevel ? 2 : 0;

  return sharedStyles * 5 + sameRegion + sameBudget + candidate.rating;
}

function getDestinationDetailMetadata(destination: DestinationRecord): DestinationDetailMetadata {
  const slug = slugifyDestination(destination.name);

  return (
    destinationDetailsBySlug[slug] ?? {
      galleryImages: buildGalleryImages(destination),
      budgetDetails: buildBudgetDetails(destination),
      bestTimeToVisit: buildBestTimeToVisit(destination),
      reviews: buildReviews(destination),
      travelTips: buildTravelTips(destination),
    }
  );
}

function buildGalleryImages(destination: DestinationRecord): DestinationGalleryImage[] {
  return [
    {
      src: appendImageParams(destination.imageUrl, "w=1600&q=80"),
      alt: `${destination.name} signature view`,
    },
    {
      src: appendImageParams(destination.imageUrl, "w=1400&q=80&sat=-10"),
      alt: `${destination.name} neighborhood atmosphere`,
    },
    {
      src: appendImageParams(destination.imageUrl, "w=1400&q=80&exp=5"),
      alt: `${destination.name} travel moment`,
    },
  ];
}

function appendImageParams(imageUrl: string, params: string) {
  return `${imageUrl}${imageUrl.includes("?") ? "&" : "?"}${params}`;
}

function buildBudgetDetails(destination: DestinationRecord): DestinationBudgetDetails {
  const stayEstimate = Math.round(destination.averageDailyCost * 0.45);
  const foodEstimate = Math.round(destination.averageDailyCost * 0.25);
  const transportEstimate = Math.max(8, Math.round(destination.averageDailyCost * 0.1));
  const experienceEstimate = Math.max(18, Math.round(destination.averageDailyCost * 0.2));

  return {
    stay: `$${stayEstimate} to $${stayEstimate + 55} for comfortable stays in well-located neighborhoods.`,
    food: `$${foodEstimate} to $${foodEstimate + 18} for a good daily rhythm of casual meals and one standout stop.`,
    transport: `$${transportEstimate} to $${transportEstimate + 12} depending on airport transfers, taxis, and local transit use.`,
    experiences: `$${experienceEstimate} to $${experienceEstimate + 35} for admissions, guides, and a signature activity.`,
    note: `${destination.name} is best planned around one anchor experience per day, then a lighter budget buffer for spontaneous stops.`,
  };
}

function buildBestTimeToVisit(destination: DestinationRecord): DestinationSeasonNote[] {
  return destination.bestMonths.slice(0, 3).map((month, index) => ({
    label: index === 0 ? "Best pick" : index === 1 ? "Strong option" : "Good backup",
    months: month,
    reason:
      index === 0
        ? `This is usually the most balanced month for weather, atmosphere, and overall trip quality in ${destination.name}.`
        : `A smart alternative if you want to experience ${destination.name} with a slightly different pace or crowd level.`,
  }));
}

function buildReviews(destination: DestinationRecord): DestinationReview[] {
  return [
    {
      author: "Alex M.",
      rating: destination.rating,
      date: "2026-04-12",
      tripType: "Independent trip",
      comment: `${destination.name} delivered exactly what I wanted: strong atmosphere, practical pacing, and memorable highlights that felt worth building a whole itinerary around.`,
    },
    {
      author: "Priya S.",
      rating: Math.max(4.2, destination.rating - 0.1),
      date: "2025-11-03",
      tripType: "Couples trip",
      comment: `The destination felt easy to navigate once we booked the key moments ahead of time. The mix of scenery, food, and local character was a real strength.`,
    },
    {
      author: "Daniel R.",
      rating: Math.max(4.1, destination.rating - 0.2),
      date: "2025-08-22",
      tripType: "Friends trip",
      comment: `Great pick if you want one place that can support both high-energy days and slower windows without the trip feeling flat.`,
    },
  ];
}

function buildTravelTips(destination: DestinationRecord): DestinationTravelTip[] {
  return [
    {
      title: "Start with the signature highlight",
      description: `Put one of ${destination.highlights[0] ?? destination.name}'s best-known experiences early in the trip so the rest of the itinerary can stay flexible.`,
    },
    {
      title: "Keep your days geographically tight",
      description: `Choose one neighborhood or cluster at a time. ${destination.name} usually feels better when you trade volume for flow.`,
    },
    {
      title: "Budget for one standout splurge",
      description: `Even in a ${destination.budgetLevel} destination, one premium meal, view, or guided activity often lifts the whole trip.`,
    },
  ];
}
