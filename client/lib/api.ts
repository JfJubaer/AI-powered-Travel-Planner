import axios from "axios";
import type {
  DashboardMetric,
  DestinationDetails,
  DashboardTrip,
  Destination,
  ItineraryResult,
  RecommendationResult,
  Role
} from "./types";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api",
  timeout: 25000
});

export interface ItineraryPayload {
  destination: string;
  startDate: string;
  durationDays: number;
  travelers: number;
  budget: number;
  style: string;
  pace: string;
  interests: string[];
  role: Role;
}

export interface RecommendationPayload {
  origin: string;
  month: string;
  budget: number;
  travelers: number;
  style: string;
  interests: string[];
}

export async function createItinerary(payload: ItineraryPayload) {
  const { data } = await api.post<ItineraryResult>("/ai/itinerary", payload);
  return data;
}

export async function createRecommendations(payload: RecommendationPayload) {
  const { data } = await api.post<{ recommendations: RecommendationResult[] }>("/ai/recommendations", payload);
  return data.recommendations;
}

export interface DestinationFilters {
  search?: string;
  country?: string;
  style?: string;
  budget?: string;
  sortBy?: "rating" | "popularity";
  page?: number;
  limit?: number;
}

export interface DestinationListResponse {
  destinations: Destination[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  availableCountries: string[];
}

export async function getDestinations(filters?: DestinationFilters) {
  const { data } = await api.get<DestinationListResponse>("/destinations", {
    params: filters
  });
  return data;
}

export async function getDestinationDetails(id: string) {
  const { data } = await api.get<DestinationDetails>(`/destinations/${id}`);
  return data;
}

export async function getDashboard(role: Role) {
  const { data } = await api.get<{
    role: Role;
    metrics: DashboardMetric[];
    recentTrips: DashboardTrip[];
    recommendations: Destination[];
  }>(`/dashboard/${role}`);
  return data;
}
