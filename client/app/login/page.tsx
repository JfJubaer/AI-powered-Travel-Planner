import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/auth-form";

export const metadata: Metadata = {
  title: "Login | AI Travel Planner",
  description: "Login to your AI Travel Planner account to continue planning and managing trips."
};

export default function LoginPage() {
  return <AuthForm mode="login" />;
}
