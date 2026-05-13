import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

export interface UserDocument extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  role: "traveler" | "agency" | "admin";
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<UserDocument>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [100, "Name must not exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },
    role: {
      type: String,
      enum: {
        values: ["traveler", "agency", "admin"],
        message: "Role must be either traveler, agency, or admin",
      },
      default: "traveler",
    },
    avatar: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
);

// Index for email lookups
userSchema.index({ email: 1 });

export const User = models.User || model<UserDocument>("User", userSchema);
