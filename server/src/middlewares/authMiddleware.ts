import type { NextFunction, Request, Response } from "express";
import { HttpError } from "../utils/httpError.js";
import { type Role, verifyToken } from "../utils/auth.js";

export function authenticate(req: Request, _res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : undefined;

  if (!token) {
    return next(new HttpError(401, "Authentication token is required"));
  }

  try {
    req.user = verifyToken(token);
    return next();
  } catch {
    return next(new HttpError(401, "Invalid or expired authentication token"));
  }
}

export function authorize(...allowedRoles: Role[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new HttpError(401, "Authentication is required"));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(new HttpError(403, "You do not have permission to access this resource"));
    }

    return next();
  };
}
