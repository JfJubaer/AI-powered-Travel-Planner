import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

export interface DestinationRecord {
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

export interface DestinationDocument extends mongoose.Document, DestinationRecord {
  createdAt: Date;
  updatedAt: Date;
}

const destinationSchema = new Schema<DestinationDocument>(
  {
    name: {
      type: String,
      required: [true, "Destination name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [120, "Name must not exceed 120 characters"],
    },
    country: {
      type: String,
      required: [true, "Country is required"],
      trim: true,
    },
    region: {
      type: String,
      required: [true, "Region is required"],
      trim: true,
    },
    style: {
      type: [String],
      required: [true, "At least one travel style is required"],
      validate: {
        validator(styles: string[]) {
          return styles.length > 0;
        },
        message: "At least one travel style is required",
      },
    },
    budgetLevel: {
      type: String,
      enum: {
        values: ["value", "balanced", "premium"],
        message: "Budget level must be value, balanced, or premium",
      },
      required: [true, "Budget level is required"],
    },
    bestMonths: {
      type: [String],
      required: [true, "At least one best month is required"],
      validate: {
        validator(months: string[]) {
          return months.length > 0;
        },
        message: "At least one best month is required",
      },
    },
    averageDailyCost: {
      type: Number,
      required: [true, "Average daily cost is required"],
      min: [0, "Cost cannot be negative"],
    },
    imageUrl: {
      type: String,
      required: [true, "Image URL is required"],
      trim: true,
    },
    highlights: {
      type: [String],
      required: [true, "At least one highlight is required"],
      validate: {
        validator(highlights: string[]) {
          return highlights.length > 0;
        },
        message: "At least one highlight is required",
      },
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [0, "Rating must be at least 0"],
      max: [5, "Rating must not exceed 5"],
      default: 0,
    },
    safetyScore: {
      type: Number,
      required: [true, "Safety score is required"],
      min: [0, "Safety score must be at least 0"],
      max: [100, "Safety score must not exceed 100"],
    },
    summary: {
      type: String,
      required: [true, "Summary is required"],
      minlength: [10, "Summary must be at least 10 characters"],
      maxlength: [500, "Summary must not exceed 500 characters"],
    },
  },
  { timestamps: true },
);

// Text search index
destinationSchema.index({
  name: "text",
  country: "text",
  region: "text",
  summary: "text",
  style: "text",
});

// Single field indexes for common queries
destinationSchema.index({ country: 1 });
destinationSchema.index({ rating: -1 });
destinationSchema.index({ budgetLevel: 1 });

export const Destination =
  models.Destination ||
  model<DestinationDocument>("Destination", destinationSchema);
