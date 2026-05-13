"use client";

import { CheckCircle2, Info, TriangleAlert, X } from "lucide-react";
import { createContext, useContext, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

type ToastVariant = "success" | "error" | "info";

interface ToastOptions {
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
}

interface ToastItem extends ToastOptions {
  id: string;
}

const ToastContext = createContext<{ toast: (options: ToastOptions) => void } | null>(null);

const toastStyles: Record<ToastVariant, string> = {
  success: "border-emerald-500/25 bg-emerald-500/10 text-emerald-950 dark:text-emerald-50",
  error: "border-destructive/25 bg-destructive/10 text-rose-950 dark:text-rose-50",
  info: "border-primary/25 bg-primary/10 text-slate-950 dark:text-slate-50"
};

const toastIcons = {
  success: CheckCircle2,
  error: TriangleAlert,
  info: Info
} satisfies Record<ToastVariant, typeof Info>;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  function removeToast(id: string) {
    setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id));
  }

  const value = useMemo(
    () => ({
      toast: ({ duration = 4000, variant = "info", ...options }: ToastOptions) => {
        const id =
          typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
            ? crypto.randomUUID()
            : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

        setToasts((currentToasts) => [...currentToasts, { id, duration, variant, ...options }]);
        window.setTimeout(() => removeToast(id), duration);
      }
    }),
    []
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed right-4 top-20 z-[70] flex w-full max-w-sm flex-col gap-3" aria-live="polite" aria-atomic="true">
        {toasts.map((toast) => {
          const variant = toast.variant ?? "info";
          const Icon = toastIcons[variant];

          return (
            <div
              key={toast.id}
              className={cn(
                "pointer-events-auto rounded-2xl border px-4 py-3 shadow-soft backdrop-blur-xl",
                toastStyles[variant]
              )}
            >
              <div className="flex items-start gap-3">
                <span className="mt-0.5 rounded-full bg-white/70 p-1 text-current dark:bg-white/10">
                  <Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">{toast.title}</p>
                  {toast.description ? <p className="mt-1 text-sm opacity-85">{toast.description}</p> : null}
                </div>
                <button
                  type="button"
                  onClick={() => removeToast(toast.id)}
                  className="rounded-full p-1 opacity-70 transition-opacity hover:opacity-100"
                  aria-label="Dismiss notification"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used inside ToastProvider");
  }

  return context;
}
