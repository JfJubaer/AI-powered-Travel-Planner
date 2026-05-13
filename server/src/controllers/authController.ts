import bcrypt from "bcryptjs";
import type { Request, Response } from "express";
import { User } from "../models/User.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { type Role, signToken } from "../utils/auth.js";
import { HttpError } from "../utils/httpError.js";

function sanitizeUser(user: { _id: unknown; name: string; email: string; role: string }) {
  return {
    id: String(user._id),
    name: user.name,
    email: user.email,
    role: user.role as Role
  };
}

export const register = asyncHandler(async (req: Request, res: Response) => {
  const existingUser = await User.findOne({ email: req.body.email });

  if (existingUser) {
    throw new HttpError(409, "A user with this email already exists");
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 12);
  const user = await User.create({
    ...req.body,
    password: hashedPassword
  });
  const safeUser = sanitizeUser(user);

  res.status(201).json({
    user: safeUser,
    token: signToken({ id: safeUser.id, role: safeUser.role })
  });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findOne({ email: req.body.email }).select("+password");

  if (!user) {
    throw new HttpError(401, "Invalid email or password");
  }

  const passwordMatches = await bcrypt.compare(req.body.password, user.password);

  if (!passwordMatches) {
    throw new HttpError(401, "Invalid email or password");
  }

  const safeUser = sanitizeUser(user);

  res.json({
    user: safeUser,
    token: signToken({ id: safeUser.id, role: safeUser.role })
  });
});

export const getMe = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.user?.id);

  if (!user) {
    throw new HttpError(404, "User not found");
  }

  res.json({ user: sanitizeUser(user) });
});
