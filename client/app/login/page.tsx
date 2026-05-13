import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/auth-form";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Login | AI Travel Planner",
  description:
    "Login to your AI Travel Planner account to continue planning and managing trips.",
};

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading login...</div>}>
      <AuthForm mode="login" />
    </Suspense>
  );
}
