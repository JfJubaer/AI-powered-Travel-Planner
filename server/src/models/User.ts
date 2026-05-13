import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

export interface UserDocument {
  name: string;
  email: string;
  role: "traveler" | "agency" | "admin";
}

const userSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: {
      type: String,
      enum: ["traveler", "agency", "admin"],
      default: "traveler"
    }
  },
  { timestamps: true }
);

export const User = models.User || model<UserDocument>("User", userSchema);
