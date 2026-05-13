import type { Request, Response } from "express";
import { User } from "../models/User.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { HttpError } from "../utils/httpError.js";

const publicProjection = "-password";

function assertSelfOrAdmin(req: Request) {
  if (req.user?.role !== "admin" && req.user?.id !== req.params.id) {
    throw new HttpError(403, "You can only access your own user profile");
  }
}

export const listUsers = asyncHandler(async (_req: Request, res: Response) => {
  const users = await User.find().select(publicProjection).sort({ createdAt: -1 });
  res.json({ users });
});

export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  assertSelfOrAdmin(req);

  const user = await User.findById(req.params.id).select(publicProjection);

  if (!user) {
    throw new HttpError(404, "User not found");
  }

  res.json({ user });
});

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  assertSelfOrAdmin(req);

  if (req.body.role && req.user?.role !== "admin") {
    throw new HttpError(403, "Only admins can change user roles");
  }

  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  }).select(publicProjection);

  if (!user) {
    throw new HttpError(404, "User not found");
  }

  res.json({ user });
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    throw new HttpError(404, "User not found");
  }

  res.status(204).send();
});
