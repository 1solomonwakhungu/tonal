import * as React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { TonalChip, type TonalChipProps } from "../chip";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface KpiMetric {
  id?: string;
  title: string;
  value: string;
  delta?: string;
  tone?: TonalChipProps["tone"];
  subtitle?: string;
}

export const DEFAULT_KPIS: KpiMetric[] = [
  {
    id: "active-users",
    title: "Active Users",
    value: "24,890",
    delta: "+14.2%",
    tone: "mint",
    subtitle: "vs previous 7 days",
  },
  {
    id: "api-requests",
    title: "API Requests",
    value: "1.84M",
    delta: "+22.6%",
    tone: "mint",
    subtitle: "99.98% success rate",
  },
  {
    id: "median-latency",
    title: "Median Latency",
    value: "142 ms",
    delta: "-18 ms",
    tone: "blue",
    subtitle: "p95 at 290 ms",
  },
  {
    id: "estimated-spend",
    title: "Estimated Spend",
    value: "$418",
    delta: "On track",
    tone: "neutral",
    subtitle: "of $1,200 monthly cap",
  },
];

export interface KpiGridProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: KpiMetric[];
  columns?: 2 | 3 | 4;
}

const columnClasses: Record<2 | 3 | 4, string> = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4",
};

export function KpiGrid({
  items = DEFAULT_KPIS,
  columns = 4,
  className,
  ...props
}: KpiGridProps) {
  return (
    <div
      className={cn("grid gap-3.5", columnClasses[columns], className)}
      {...props}
    >
      {items.map((kpi) => (
        <div
          key={kpi.id ?? kpi.title}
          className="rounded-[18px] bg-[var(--t-surface)] p-4 flex flex-col justify-between gap-3 transition-colors duration-200 [transition-timing-function:var(--t-ease)]"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="text-[12.5px] font-medium text-[var(--t-ink-muted)] truncate">
              {kpi.title}
            </span>
            {kpi.delta && (
              <TonalChip
                tone={kpi.tone ?? "neutral"}
                className="px-2 py-0.5 text-[11px] shrink-0"
              >
                {kpi.delta}
              </TonalChip>
            )}
          </div>
          <div>
            <div className="text-[28px] font-medium tracking-[-0.03em] leading-none text-[var(--t-ink)] tabular-nums mb-1.5">
              {kpi.value}
            </div>
            {kpi.subtitle && (
              <div className="text-[11.5px] text-[var(--t-ink-muted)]">
                {kpi.subtitle}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
