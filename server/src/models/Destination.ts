import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

export interface DestinationDocument {
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

const destinationSchema = new Schema<DestinationDocument>(
  {
    name: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
    region: { type: String, required: true, trim: true },
    style: [{ type: String, required: true }],
    budgetLevel: {
      type: String,
      enum: ["value", "balanced", "premium"],
      required: true
    },
    bestMonths: [{ type: String, required: true }],
    averageDailyCost: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    highlights: [{ type: String, required: true }],
    rating: { type: Number, required: true },
    safetyScore: { type: Number, required: true },
    summary: { type: String, required: true }
  },
  { timestamps: true }
);

destinationSchema.index({ name: "text", country: "text", region: "text", style: "text" });

export const Destination =
  models.Destination || model<DestinationDocument>("Destination", destinationSchema);
