import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

export interface UserDocument {
  name: string;
  email: string;
  password: string;
  role: "traveler" | "agency" | "admin";
}

const userSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: ["traveler", "agency", "admin"],
      default: "traveler"
    }
  },
  { timestamps: true }
);

export const User = models.User || model<UserDocument>("User", userSchema);
