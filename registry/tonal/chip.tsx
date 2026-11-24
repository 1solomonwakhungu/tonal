import * as React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface TonalChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: "blue" | "neutral" | "mint" | "warm" | "warning" | "danger";
}

const chipTones = {
  blue: "bg-[var(--t-blue-tint)] text-[var(--t-blue-hover)]",
  neutral: "bg-[var(--t-surface-muted)] text-[var(--t-ink-secondary)]",
  mint: "bg-[var(--t-surface-mint)] text-[var(--t-chip-mint-fg,#137333)]",
  warm: "bg-[var(--t-surface-warm)] text-[var(--t-ink-secondary)]",
  warning: "bg-[var(--t-warning-surface,#fef7e0)] text-[var(--t-warning,#9c5300)]",
  danger: "bg-[var(--t-danger-surface,#fce8e6)] text-[var(--t-danger,#c5221f)]",
};

export function TonalChip({
  tone = "blue",
  className,
  ...props
}: TonalChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-medium tracking-[-0.005em]",
        chipTones[tone],
        className
      )}
      {...props}
    />
  );
}
