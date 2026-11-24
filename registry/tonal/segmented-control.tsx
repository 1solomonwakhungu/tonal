"use client";

import * as React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface SegmentedOption<T extends string = string> {
  value: T;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string | number;
}

export interface TonalSegmentedControlProps<T extends string = string> {
  options: SegmentedOption<T>[];
  value?: T;
  defaultValue?: T;
  onValueChange?: (value: T) => void;
  ariaLabel?: string;
  size?: "sm" | "md";
  className?: string;
}

export function TonalSegmentedControl<T extends string = string>({
  options,
  value,
  defaultValue,
  onValueChange,
  ariaLabel = "Options",
  size = "md",
  className,
}: TonalSegmentedControlProps<T>) {
  const [internal, setInternal] = React.useState<T>(
    defaultValue ?? options[0]?.value
  );
  const current = value ?? internal;
  const buttonRefs = React.useRef<Array<HTMLButtonElement | null>>([]);

  const select = (next: T) => {
    if (value === undefined) setInternal(next);
    onValueChange?.(next);
  };

  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (options.length === 0) return;
    let nextIdx: number | null = null;
    if (e.key === "ArrowRight") nextIdx = (idx + 1) % options.length;
    else if (e.key === "ArrowLeft")
      nextIdx = (idx - 1 + options.length) % options.length;
    else if (e.key === "Home") nextIdx = 0;
    else if (e.key === "End") nextIdx = options.length - 1;

    if (nextIdx !== null) {
      e.preventDefault();
      select(options[nextIdx].value);
      buttonRefs.current[nextIdx]?.focus();
    }
  };

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn(
        "inline-flex flex-wrap items-center gap-0.5 rounded-full bg-[var(--t-surface-muted)] p-1 border border-[var(--t-border-subtle)]",
        className
      )}
    >
      {options.map((opt, idx) => {
        const Icon = opt.icon;
        const active = opt.value === current;
        return (
          <button
            key={opt.value}
            ref={(el) => {
              buttonRefs.current[idx] = el;
            }}
            type="button"
            role="tab"
            aria-selected={active}
            tabIndex={active ? 0 : -1}
            onClick={() => select(opt.value)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full font-medium cursor-pointer transition-all duration-200 [transition-timing-function:var(--t-ease)]",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--t-ring,var(--t-blue))]",
              size === "sm" ? "px-3 py-1 text-[12px]" : "px-3.5 py-1.5 text-[13px]",
              active
                ? "bg-[var(--t-elevated)] text-[var(--t-ink)] shadow-[0_1px_2px_rgba(0,0,0,0.12)]"
                : "text-[var(--t-ink-muted)] hover:text-[var(--t-ink)]"
            )}
          >
            {Icon && <Icon className="h-3.5 w-3.5 shrink-0" />}
            <span>{opt.label}</span>
            {opt.badge !== undefined && (
              <span className="text-[11px] font-mono text-[var(--t-ink-muted)]">
                {opt.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
