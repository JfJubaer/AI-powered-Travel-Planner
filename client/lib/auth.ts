import type { Role } from "./types";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string | null;
}

export interface AuthSession {
  user: AuthUser;
  token: string;
  isDemo?: boolean;
}

export type AuthWorkspaceRole = "user" | "admin";
export type AuthApiRole = "traveler" | "admin";

const AUTH_STORAGE_KEY = "ai-travel-planner.auth";

function isRole(value: unknown): value is Role {
  return value === "traveler" || value === "agency" || value === "admin";
}

function isStoredSession(value: unknown): value is AuthSession {
  if (!value || typeof value !== "object") {
    return false;
  }

  const session = value as Partial<AuthSession>;
  const user = session.user as Partial<AuthUser> | undefined;

  return (
    typeof session.token === "string" &&
    !!user &&
    typeof user.id === "string" &&
    typeof user.name === "string" &&
    typeof user.email === "string" &&
    isRole(user.role)
  );
}

export function mapWorkspaceRoleToApiRole(role: AuthWorkspaceRole): AuthApiRole {
  return role === "admin" ? "admin" : "traveler";
}

export function getRoleLabel(role: Role) {
  if (role === "admin") {
    return "Admin";
  }

  if (role === "agency") {
    return "Agency";
  }

  return "User";
}

export function getDashboardRoute(role: Role) {
  return role === "admin" ? "/dashboard/admin" : "/dashboard";
}

export function getStoredSession() {
  if (typeof window === "undefined") {
    return null;
  }

  const rawValue = window.localStorage.getItem(AUTH_STORAGE_KEY);

  if (!rawValue) {
    return null;
  }

  try {
    const parsedValue: unknown = JSON.parse(rawValue);
    return isStoredSession(parsedValue) ? parsedValue : null;
  } catch {
    return null;
  }
}

export function saveStoredSession(session: AuthSession) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
}

export function clearStoredSession() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(AUTH_STORAGE_KEY);
}

export function createDemoSession(role: Role = "traveler"): AuthSession {
  const isAdmin = role === "admin";

  return {
    token: `demo-${role}-token`,
    isDemo: true,
    user: {
      id: isAdmin ? "demo-admin" : "demo-user",
      name: isAdmin ? "Admin Demo" : "Traveler Demo",
      email: isAdmin ? "admin-demo@aitravelplanner.dev" : "traveler-demo@aitravelplanner.dev",
      role
    }
  };
}
