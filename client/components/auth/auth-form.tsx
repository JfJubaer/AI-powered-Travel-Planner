"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuth } from "@/components/auth-provider";
import { AuthShell } from "@/components/auth/auth-shell";
import { useToast } from "@/components/toast-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getDashboardRoute } from "@/lib/auth";
import { getApiErrorMessage } from "@/lib/api";
import type { Role } from "@/lib/types";
import { cn } from "@/lib/utils";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email address."),
  password: z.string().min(1, "Password is required.")
});

const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters.").max(80, "Name must be 80 characters or fewer."),
    email: z.string().email("Enter a valid email address."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .regex(/[A-Z]/, "Include at least one uppercase letter.")
      .regex(/[a-z]/, "Include at least one lowercase letter.")
      .regex(/\d/, "Include at least one number."),
    confirmPassword: z.string().min(1, "Confirm your password.")
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"]
  });

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

interface AuthFormProps {
  mode: "login" | "register";
}

function resolveRedirectPath(searchParams: { get: (name: string) => string | null }, role: Role) {
  const redirectValue = searchParams.get("redirect");
  return redirectValue?.startsWith("/") ? redirectValue : getDashboardRoute(role);
}

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, isReady, login, register, user } = useAuth();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  });

  useEffect(() => {
    if (isReady && isAuthenticated && user) {
      router.replace(resolveRedirectPath(searchParams, user.role));
    }
  }, [isAuthenticated, isReady, router, searchParams, user]);

  async function handleLogin(values: LoginFormValues) {
    try {
      setIsSubmitting(true);
      const session = await login(values);

      toast({
        variant: "success",
        title: "Welcome back",
        description: `Signed in as ${session.user.name}.`
      });

      router.push(resolveRedirectPath(searchParams, session.user.role));
    } catch (error) {
      toast({
        variant: "error",
        title: "Unable to sign in",
        description: getApiErrorMessage(error, "Please check your credentials and try again.")
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleRegister(values: RegisterFormValues) {
    try {
      setIsSubmitting(true);
      const session = await register({
        name: values.name.trim(),
        email: values.email.trim().toLowerCase(),
        password: values.password
      });

      toast({
        variant: "success",
        title: "Account created",
        description: `Welcome aboard, ${session.user.name}.`
      });

      router.push(resolveRedirectPath(searchParams, session.user.role));
    } catch (error) {
      toast({
        variant: "error",
        title: "Unable to create account",
        description: getApiErrorMessage(error, "Please review your details and try again.")
      });
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <AuthShell
      badge={mode === "login" ? "Secure sign in" : "Create your account"}
      title={mode === "login" ? "Login" : "Register"}
      description={
        mode === "login"
          ? "Sign in to continue planning trips, reviewing saved destinations, or managing the platform."
          : "Create a polished traveler or admin workspace with strong form validation from the start."
      }
      footerText={mode === "login" ? "Need an account?" : "Already have an account?"}
      footerLink={mode === "login" ? "/register" : "/login"}
      footerLabel={mode === "login" ? "Register here" : "Login here"}
    >
      <div className="space-y-6">
        {mode === "login" ? (
          <form className="space-y-5" onSubmit={loginForm.handleSubmit(handleLogin)}>
            <FormField
              label="Email"
              htmlFor="login-email"
              error={loginForm.formState.errors.email?.message}
            >
              <Input
                id="login-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                {...loginForm.register("email")}
              />
            </FormField>

            <FormField
              label="Password"
              htmlFor="login-password"
              error={loginForm.formState.errors.password?.message}
            >
              <PasswordInput
                id="login-password"
                autoComplete="current-password"
                placeholder="Enter your password"
                visible={showPassword}
                onToggleVisibility={() => setShowPassword((currentValue) => !currentValue)}
                {...loginForm.register("password")}
              />
            </FormField>

            <div className="flex flex-col gap-3 pt-1 sm:flex-row">
              <Button type="submit" className="h-11 flex-1" disabled={isSubmitting}>
                {isSubmitting ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
                {isSubmitting ? "Signing in..." : "Login"}
              </Button>
              <Button asChild variant="ghost" className="h-11 flex-1">
                <Link href="/register">Create account</Link>
              </Button>
            </div>
          </form>
        ) : (
          <form className="space-y-5" onSubmit={registerForm.handleSubmit(handleRegister)}>
            <FormField
              label="Full name"
              htmlFor="register-name"
              error={registerForm.formState.errors.name?.message}
            >
              <Input
                id="register-name"
                type="text"
                autoComplete="name"
                placeholder="Zubier Ahmed"
                {...registerForm.register("name")}
              />
            </FormField>

            <FormField
              label="Email"
              htmlFor="register-email"
              error={registerForm.formState.errors.email?.message}
            >
              <Input
                id="register-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                {...registerForm.register("email")}
              />
            </FormField>

            <div className="grid gap-5 md:grid-cols-2">
              <FormField
                label="Password"
                htmlFor="register-password"
                error={registerForm.formState.errors.password?.message}
              >
                <PasswordInput
                  id="register-password"
                  autoComplete="new-password"
                  placeholder="Create a password"
                  visible={showPassword}
                  onToggleVisibility={() => setShowPassword((currentValue) => !currentValue)}
                  {...registerForm.register("password")}
                />
              </FormField>

              <FormField
                label="Confirm password"
                htmlFor="register-confirm-password"
                error={registerForm.formState.errors.confirmPassword?.message}
              >
                <PasswordInput
                  id="register-confirm-password"
                  autoComplete="new-password"
                  placeholder="Repeat your password"
                  visible={showConfirmPassword}
                  onToggleVisibility={() => setShowConfirmPassword((currentValue) => !currentValue)}
                  {...registerForm.register("confirmPassword")}
                />
              </FormField>
            </div>

            <Button type="submit" className="h-11 w-full" disabled={isSubmitting}>
              {isSubmitting ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
              {isSubmitting ? "Creating account..." : "Register"}
            </Button>
          </form>
        )}
      </div>
    </AuthShell>
  );
}

function FormField({
  label,
  htmlFor,
  error,
  children
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <Label htmlFor={htmlFor}>{label}</Label>
        {error ? <span className="text-xs font-medium text-destructive">{error}</span> : null}
      </div>
      {children}
    </div>
  );
}

type PasswordInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  visible: boolean;
  onToggleVisibility: () => void;
};

function PasswordInput({ visible, onToggleVisibility, className, ...props }: PasswordInputProps) {
  return (
    <div className="relative">
      <Input type={visible ? "text" : "password"} className={cn("pr-11", className)} {...props} />
      <button
        type="button"
        onClick={onToggleVisibility}
        className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
        aria-label={visible ? "Hide password" : "Show password"}
      >
        {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  );
}
