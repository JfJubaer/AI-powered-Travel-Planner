import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

export interface TripDay {
  day: number;
  title: string;
  morning: string;
  afternoon: string;
  evening: string;
  localTip: string;
}

export interface TripDocument {
  destination: string;
  durationDays: number;
  travelers: number;
  budget: number;
  style: string;
  pace: string;
  itinerary: TripDay[];
  estimatedTotal: number;
  createdByRole: "traveler" | "agency" | "admin";
}

const tripDaySchema = new Schema<TripDay>(
  {
    day: { type: Number, required: true },
    title: { type: String, required: true },
    morning: { type: String, required: true },
    afternoon: { type: String, required: true },
    evening: { type: String, required: true },
    localTip: { type: String, required: true }
  },
  { _id: false }
);

const tripSchema = new Schema<TripDocument>(
  {
    destination: { type: String, required: true },
    durationDays: { type: Number, required: true },
    travelers: { type: Number, required: true },
    budget: { type: Number, required: true },
    style: { type: String, required: true },
    pace: { type: String, required: true },
    itinerary: [tripDaySchema],
    estimatedTotal: { type: Number, required: true },
    createdByRole: {
      type: String,
      enum: ["traveler", "agency", "admin"],
      default: "traveler"
    }
  },
  { timestamps: true }
);

export const Trip = models.Trip || model<TripDocument>("Trip", tripSchema);
