import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

export interface DestinationDocument extends mongoose.Document {
  title: string;
  country: string;
  description: string;
  images: string[];
  budget: "budget" | "moderate" | "luxury";
  rating: number;
  category: string[];
  region?: string;
  highlights?: string[];
  averageDailyCost?: number;
  safetyScore?: number;
  bestMonths?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const destinationSchema = new Schema<DestinationDocument>(
  {
    title: {
      type: String,
      required: [true, "Destination title is required"],
      trim: true,
      minlength: [2, "Title must be at least 2 characters"],
      maxlength: [200, "Title must not exceed 200 characters"],
    },
    country: {
      type: String,
      required: [true, "Country is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: [10, "Description must be at least 10 characters"],
      maxlength: [5000, "Description must not exceed 5000 characters"],
    },
    images: {
      type: [String],
      required: [true, "At least one image is required"],
      validate: {
        validator: function (images: string[]) {
          return images.length > 0;
        },
        message: "At least one image URL is required",
      },
    },
    budget: {
      type: String,
      enum: {
        values: ["budget", "moderate", "luxury"],
        message: "Budget must be budget, moderate, or luxury",
      },
      required: [true, "Budget category is required"],
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [0, "Rating must be at least 0"],
      max: [5, "Rating must not exceed 5"],
      default: 0,
    },
    category: {
      type: [String],
      required: [true, "At least one category is required"],
      enum: {
        values: [
          "beach",
          "mountain",
          "city",
          "culture",
          "adventure",
          "relaxation",
          "wildlife",
          "history",
        ],
        message: "Invalid category",
      },
    },
    region: {
      type: String,
      trim: true,
    },
    highlights: {
      type: [String],
      default: [],
    },
    averageDailyCost: {
      type: Number,
      min: [0, "Cost cannot be negative"],
    },
    safetyScore: {
      type: Number,
      min: [0, "Safety score must be at least 0"],
      max: [10, "Safety score must not exceed 10"],
    },
    bestMonths: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true },
);

// Text search index
destinationSchema.index({
  title: "text",
  country: "text",
  description: "text",
  category: "text",
});

// Single field indexes for common queries
destinationSchema.index({ country: 1 });
destinationSchema.index({ rating: -1 });
destinationSchema.index({ budget: 1 });

export const Destination =
  models.Destination ||
  model<DestinationDocument>("Destination", destinationSchema);
