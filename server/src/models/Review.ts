import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

export interface ReviewDocument extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  destinationId: mongoose.Types.ObjectId;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema<ReviewDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"]
    },
    destinationId: {
      type: Schema.Types.ObjectId,
      ref: "Destination",
      required: [true, "Destination ID is required"]
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating must not exceed 5"]
    },
    comment: {
      type: String,
      required: [true, "Review comment is required"],
      trim: true,
      minlength: [10, "Comment must be at least 10 characters"],
      maxlength: [2000, "Comment must not exceed 2000 characters"]
    }
  },
  { timestamps: true }
);

// Compound index to prevent duplicate reviews from same user on same destination
reviewSchema.index({ userId: 1, destinationId: 1 }, { unique: true });

// Indexes for common queries
reviewSchema.index({ destinationId: 1 });
reviewSchema.index({ rating: -1 });
reviewSchema.index({ createdAt: -1 });

export const Review =
  models.Review || model<ReviewDocument>("Review", reviewSchema);
