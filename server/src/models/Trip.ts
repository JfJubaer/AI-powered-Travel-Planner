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

export interface TripDocument extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  destinationId: mongoose.Types.ObjectId;
  duration: number;
  itinerary: TripDay[];
  travelers?: number;
  budget?: number;
  style?: string;
  pace?: string;
  estimatedTotal?: number;
  createdByRole: "traveler" | "agency" | "admin";
  createdAt: Date;
  updatedAt: Date;
}

const tripDaySchema = new Schema<TripDay>(
  {
    day: {
      type: Number,
      required: [true, "Day number is required"],
      min: [1, "Day must be at least 1"],
    },
    title: {
      type: String,
      required: [true, "Day title is required"],
      trim: true,
    },
    morning: {
      type: String,
      required: [true, "Morning activity is required"],
      minlength: [5, "Activity must be at least 5 characters"],
    },
    afternoon: {
      type: String,
      required: [true, "Afternoon activity is required"],
      minlength: [5, "Activity must be at least 5 characters"],
    },
    evening: {
      type: String,
      required: [true, "Evening activity is required"],
      minlength: [5, "Activity must be at least 5 characters"],
    },
    localTip: {
      type: String,
      required: [true, "Local tip is required"],
      minlength: [5, "Local tip must be at least 5 characters"],
    },
  },
  { _id: false },
);

const tripSchema = new Schema<TripDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    destinationId: {
      type: Schema.Types.ObjectId,
      ref: "Destination",
      required: [true, "Destination ID is required"],
    },
    duration: {
      type: Number,
      required: [true, "Trip duration is required"],
      min: [1, "Duration must be at least 1 day"],
      max: [365, "Duration cannot exceed 365 days"],
    },
    itinerary: {
      type: [tripDaySchema],
      required: [true, "Itinerary is required"],
      validate: {
        validator: function (itinerary: TripDay[]) {
          return itinerary.length > 0;
        },
        message: "Itinerary must have at least one day",
      },
    },
    travelers: {
      type: Number,
      min: [1, "Must have at least 1 traveler"],
      default: 1,
    },
    budget: {
      type: Number,
      min: [0, "Budget cannot be negative"],
    },
    style: {
      type: String,
      enum: {
        values: ["adventure", "relaxation", "culture", "luxury"],
        message: "Invalid trip style",
      },
    },
    pace: {
      type: String,
      enum: {
        values: ["slow", "moderate", "fast"],
        message: "Pace must be slow, moderate, or fast",
      },
    },
    estimatedTotal: {
      type: Number,
      min: [0, "Estimated total cannot be negative"],
    },
    createdByRole: {
      type: String,
      enum: {
        values: ["traveler", "agency", "admin"],
        message: "Invalid creator role",
      },
      default: "traveler",
    },
  },
  { timestamps: true },
);

// Indexes for common queries
tripSchema.index({ userId: 1 });
tripSchema.index({ destinationId: 1 });
tripSchema.index({ createdAt: -1 });

export const Trip = models.Trip || model<TripDocument>("Trip", tripSchema);
