import jwt from "jsonwebtoken";
import type { SignOptions } from "jsonwebtoken";

export type Role = "traveler" | "agency" | "admin";

export interface JwtPayload {
  id: string;
  role: Role;
}

export function getJwtSecret() {
  return process.env.JWT_SECRET ?? "development-jwt-secret-change-me";
}

export function signToken(payload: JwtPayload) {
  const options: SignOptions = {
    expiresIn: (process.env.JWT_EXPIRES_IN ?? "7d") as SignOptions["expiresIn"]
  };

  return jwt.sign(payload, getJwtSecret(), {
    ...options
  });
}

export function verifyToken(token: string) {
  return jwt.verify(token, getJwtSecret()) as JwtPayload;
}
