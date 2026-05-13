"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  clearStoredSession,
  createDemoSession,
  getStoredSession,
  saveStoredSession,
  type AuthSession,
  type AuthUser
} from "@/lib/auth";
import { loginUser, registerUser, setApiAuthToken, type LoginPayload, type RegisterPayload } from "@/lib/api";
import type { Role } from "@/lib/types";

interface AuthContextValue {
  session: AuthSession | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  isReady: boolean;
  login: (payload: LoginPayload) => Promise<AuthSession>;
  register: (payload: RegisterPayload) => Promise<AuthSession>;
  loginDemo: (role?: Role) => AuthSession;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const storedSession = getStoredSession();

    if (storedSession) {
      setApiAuthToken(storedSession.token);
      setSession(storedSession);
    } else {
      setApiAuthToken();
    }

    setIsReady(true);
  }, []);

  function applySession(nextSession: AuthSession) {
    saveStoredSession(nextSession);
    setApiAuthToken(nextSession.token);
    setSession(nextSession);
    return nextSession;
  }

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      user: session?.user ?? null,
      isAuthenticated: !!session,
      isReady,
      login: async (payload) => applySession(await loginUser(payload)),
      register: async (payload) => applySession(await registerUser(payload)),
      loginDemo: (role = "traveler") => applySession(createDemoSession(role)),
      logout: () => {
        clearStoredSession();
        setApiAuthToken();
        setSession(null);
      }
    }),
    [isReady, session]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
