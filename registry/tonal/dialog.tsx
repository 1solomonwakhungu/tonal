"use client";

import * as React from "react";
import { X } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface TonalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  variant?: "modal" | "drawer";
  size?: "sm" | "md" | "lg";
  footer?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const modalSizes = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-xl",
};

const drawerSizes = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
};

export function TonalDialog({
  open,
  onOpenChange,
  title,
  description,
  variant = "modal",
  size = "md",
  footer,
  children,
  className,
}: TonalDialogProps) {
  const titleId = React.useId();
  const descId = React.useId();
  const panelRef = React.useRef<HTMLDivElement>(null);
  const previousFocusRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (!open) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      const panel = panelRef.current;
      if (!panel) return;
      const autoFocusTarget = panel.querySelector<HTMLElement>("[data-autofocus], input, select, textarea, button");
      if (autoFocusTarget) {
        autoFocusTarget.focus();
      } else {
        panel.focus();
      }
    }, 0);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onOpenChange(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      previousFocusRef.current?.focus?.();
    };
  }, [open, onOpenChange]);

  if (!open) return null;

  const isDrawer = variant === "drawer";

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 bg-black/45 backdrop-blur-[2px] flex",
        isDrawer ? "justify-end" : "items-center justify-center p-4"
      )}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onOpenChange(false);
        }
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descId : undefined}
        tabIndex={-1}
        className={cn(
          "w-full bg-[var(--t-elevated)] text-[var(--t-ink)] border border-[var(--t-border-subtle)] shadow-[0_24px_48px_-16px_rgba(0,0,0,0.38)] flex flex-col focus:outline-none",
          isDrawer
            ? cn("h-full rounded-l-[28px] p-6 sm:p-7", drawerSizes[size])
            : cn("rounded-[28px] p-6 sm:p-7 max-h-[88vh]", modalSizes[size]),
          className
        )}
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="min-w-0">
            <h2 id={titleId} className="t-headline text-[21px] sm:text-[22px]">
              {title}
            </h2>
            {description && (
              <p
                id={descId}
                className="text-[13.5px] text-[var(--t-ink-muted)] mt-1 leading-relaxed"
              >
                {description}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            aria-label="Close dialog"
            className="h-8 w-8 shrink-0 rounded-full hover:bg-[var(--t-surface-muted)] grid place-items-center text-[var(--t-ink-muted)] hover:text-[var(--t-ink)] cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--t-ring,var(--t-blue))]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">{children}</div>

        {footer && (
          <div className="mt-5 pt-4 border-t border-[var(--t-border-subtle)] flex items-center justify-end gap-2">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
