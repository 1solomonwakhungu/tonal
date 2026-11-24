"use client";

import * as React from "react";
import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type ToastTone = "neutral" | "success" | "warning" | "danger" | "info";

export interface TonalToastData {
  id: string;
  title: string;
  description?: string;
  tone?: ToastTone;
  durationMs?: number;
}

interface ToastContextValue {
  toasts: TonalToastData[];
  toast: (input: Omit<TonalToastData, "id">) => string;
  dismiss: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

const toneAccent: Record<ToastTone, string> = {
  neutral: "text-[var(--t-ink-secondary)]",
  success: "text-[var(--t-success,#137333)]",
  warning: "text-[var(--t-warning,#b06000)]",
  danger: "text-[var(--t-danger,#c5221f)]",
  info: "text-[var(--t-blue)]",
};

export function TonalToastItem({
  item,
  onDismiss,
}: {
  item: TonalToastData;
  onDismiss?: (id: string) => void;
}) {
  const tone = item.tone ?? "neutral";
  const Icon =
    tone === "success"
      ? CheckCircle2
      : tone === "warning" || tone === "danger"
        ? AlertCircle
        : Info;

  return (
    <div
      role="status"
      className={cn(
        "pointer-events-auto w-full max-w-sm rounded-[18px] bg-[var(--t-elevated)] border border-[var(--t-border-subtle)] px-4 py-3.5 shadow-[0_14px_32px_-12px_rgba(0,0,0,0.28)] flex items-start gap-3 text-[var(--t-ink)]"
      )}
    >
      <Icon className={cn("h-4 w-4 mt-0.5 shrink-0", toneAccent[tone])} />
      <div className="min-w-0 flex-1">
        <div className="text-[13.5px] font-medium leading-snug">
          {item.title}
        </div>
        {item.description && (
          <p className="text-[12.5px] text-[var(--t-ink-muted)] mt-0.5 leading-relaxed">
            {item.description}
          </p>
        )}
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={() => onDismiss(item.id)}
          aria-label="Dismiss notification"
          className="h-6 w-6 rounded-full hover:bg-[var(--t-surface-muted)] grid place-items-center text-[var(--t-ink-muted)] hover:text-[var(--t-ink)] cursor-pointer shrink-0 transition-colors"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}

export function TonalToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toasts, setToasts] = React.useState<TonalToastData[]>([]);
  const timersRef = React.useRef<Map<string, number>>(new Map());

  const dismiss = React.useCallback((id: string) => {
    const timer = timersRef.current.get(id);
    if (timer !== undefined) {
      window.clearTimeout(timer);
      timersRef.current.delete(id);
    }
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = React.useCallback(
    (input: Omit<TonalToastData, "id">) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      const duration = input.durationMs ?? 3600;
      setToasts((prev) => [...prev.slice(-3), { ...input, id }]);
      if (duration > 0) {
        const timer = window.setTimeout(() => dismiss(id), duration);
        timersRef.current.set(id, timer);
      }
      return id;
    },
    [dismiss]
  );

  React.useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      timers.clear();
    };
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="false"
        className="pointer-events-none fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-2.5 max-w-[calc(100vw-2.5rem)]"
      >
        {toasts.map((item) => (
          <TonalToastItem key={item.id} item={item} onDismiss={dismiss} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useTonalToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) {
    return {
      toasts: [] as TonalToastData[],
      toast: () => "",
      dismiss: () => {},
    };
  }
  return ctx;
}
