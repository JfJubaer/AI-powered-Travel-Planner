export interface TripDay {
  day: number;
  title: string;
  morning: string;
  afternoon: string;
  evening: string;
  localTip: string;
}

export interface ItineraryResult {
  destination: string;
  summary: string;
  estimatedTotal: number;
  bestFor: string[];
  itinerary: TripDay[];
  bookingTips: string[];
}

export interface RecommendationResult {
  name: string;
  country: string;
  matchScore: number;
  estimatedDailyCost: number;
  bestMonths: string[];
  why: string;
  highlights: string[];
}

export interface Destination {
  name: string;
  country: string;
  region: string;
  style: string[];
  budgetLevel: "value" | "balanced" | "premium";
  bestMonths: string[];
  averageDailyCost: number;
  imageUrl: string;
  highlights: string[];
  rating: number;
  safetyScore: number;
  summary: string;
}

export interface DestinationGalleryImage {
  src: string;
  alt: string;
}

export interface DestinationBudgetDetails {
  stay: string;
  food: string;
  transport: string;
  experiences: string;
  note: string;
}

export interface DestinationSeasonNote {
  label: string;
  months: string;
  reason: string;
}

export interface DestinationReview {
  author: string;
  rating: number;
  date: string;
  tripType: string;
  comment: string;
}

export interface DestinationTravelTip {
  title: string;
  description: string;
}

export interface DestinationDetails {
  destination: Destination;
  galleryImages: DestinationGalleryImage[];
  budgetDetails: DestinationBudgetDetails;
  bestTimeToVisit: DestinationSeasonNote[];
  reviews: DestinationReview[];
  travelTips: DestinationTravelTip[];
  relatedDestinations: Destination[];
}

export interface DashboardMetric {
  label: string;
  value: string | number;
  trend: string;
}

export interface DashboardTrip {
  destination: string;
  style: string;
  estimatedTotal: number;
  durationDays: number;
}

export type Role = "traveler" | "agency" | "admin";
