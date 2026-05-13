import mongoose from "mongoose";

export async function connectDatabase() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.warn("MONGODB_URI is not set. API will use in-memory fallback data.");
    return;
  }

  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (error) {
    console.warn("MongoDB connection failed. API will continue with fallback data.");
    console.warn(error);
  }
}

export function isDatabaseConnected() {
  return mongoose.connection.readyState === 1;
}
