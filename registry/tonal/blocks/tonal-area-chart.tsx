"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface AreaChartPoint {
  label: string;
  value: number;
  secondary?: string;
}

export const DEFAULT_CHART_POINTS: AreaChartPoint[] = [
  { label: "Mon", value: 210, secondary: "158 ms median" },
  { label: "Tue", value: 248, secondary: "151 ms median" },
  { label: "Wed", value: 236, secondary: "149 ms median" },
  { label: "Thu", value: 289, secondary: "144 ms median" },
  { label: "Fri", value: 312, secondary: "138 ms median" },
  { label: "Sat", value: 264, secondary: "141 ms median" },
  { label: "Sun", value: 281, secondary: "142 ms median" },
];

export interface TonalAreaChartProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  points?: AreaChartPoint[];
  valueSuffix?: string;
  className?: string;
}

export function TonalAreaChart({
  title = "Request throughput",
  subtitle = "Hover or focus any point to inspect throughput",
  badge = "Edge cached 94%",
  points = DEFAULT_CHART_POINTS,
  valueSuffix = "K requests",
  className,
}: TonalAreaChartProps) {
  const [activeIdx, setActiveIdx] = React.useState<number | null>(null);
  const gradientId = React.useId().replace(/:/g, "");

  React.useEffect(() => {
    setActiveIdx(null);
  }, [points]);

  const chartW = 640;
  const chartH = 210;
  const padX = 28;
  const padY = 24;

  const safePoints = points.length > 0 ? points : DEFAULT_CHART_POINTS;
  const values = safePoints.map((p) => p.value);
  const maxVal = Math.max(...values) * 1.12;
  const minVal = Math.min(...values) * 0.72;

  const coords = safePoints.map((p, idx) => {
    const x =
      safePoints.length === 1
        ? chartW / 2
        : padX + (idx / (safePoints.length - 1)) * (chartW - padX * 2);
    const ratio = (p.value - minVal) / Math.max(maxVal - minVal, 1);
    const y = chartH - padY - ratio * (chartH - padY * 2);
    return { x, y, ...p };
  });

  const linePath = coords
    .map(
      (pt, i) => `${i === 0 ? "M" : "L"} ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`
    )
    .join(" ");

  const areaPath = `${linePath} L ${coords[coords.length - 1].x.toFixed(1)} ${(
    chartH - padY
  ).toFixed(1)} L ${coords[0].x.toFixed(1)} ${(chartH - padY).toFixed(1)} Z`;

  const activePoint = activeIdx !== null ? coords[activeIdx] : null;

  return (
    <div
      className={cn(
        "rounded-[20px] border border-[var(--t-border-subtle)] bg-[var(--t-bg)] p-5 flex flex-col gap-4",
        className
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-[15.5px] font-medium tracking-[-0.015em] text-[var(--t-ink)]">
            {title}
          </h2>
          <p className="text-[12.5px] text-[var(--t-ink-muted)]">
            {activePoint
              ? `${activePoint.label}: ${activePoint.value}${valueSuffix}${
                  activePoint.secondary ? ` · ${activePoint.secondary}` : ""
                }`
              : subtitle}
          </p>
        </div>
        {badge && (
          <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[var(--t-blue)]">
            <TrendingUp className="h-3.5 w-3.5" />
            {badge}
          </span>
        )}
      </div>

      <div className="w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${chartW} ${chartH}`}
          className="w-full h-auto block"
          role="img"
          aria-label={title}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--t-blue)" stopOpacity="0.2" />
              <stop offset="100%" stopColor="var(--t-blue)" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {[0.2, 0.5, 0.8].map((t) => {
            const y = padY + t * (chartH - padY * 2);
            return (
              <line
                key={t}
                x1={padX}
                y1={y}
                x2={chartW - padX}
                y2={y}
                stroke="var(--t-border-subtle)"
                strokeDasharray="4 4"
              />
            );
          })}

          <path d={areaPath} fill={`url(#${gradientId})`} />
          <path
            d={linePath}
            fill="none"
            stroke="var(--t-blue)"
            strokeWidth="2.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {coords.map((pt, idx) => {
            const isHovered = activeIdx === idx;
            return (
              <g
                key={pt.label}
                tabIndex={0}
                role="button"
                aria-label={`${pt.label}: ${pt.value}${valueSuffix}${
                  pt.secondary ? `, ${pt.secondary}` : ""
                }`}
                onMouseEnter={() => setActiveIdx(idx)}
                onMouseLeave={() => setActiveIdx(null)}
                onFocus={() => setActiveIdx(idx)}
                onBlur={() => setActiveIdx(null)}
                className="cursor-pointer focus:outline-none"
              >
                <circle cx={pt.x} cy={pt.y} r={16} fill="transparent" />
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isHovered ? 6 : 4}
                  fill="var(--t-bg)"
                  stroke="var(--t-blue)"
                  strokeWidth={isHovered ? 3 : 2.5}
                />
                <text
                  x={pt.x}
                  y={chartH - 4}
                  textAnchor="middle"
                  fontSize="11.5"
                  fill={isHovered ? "var(--t-ink)" : "var(--t-ink-muted)"}
                  fontWeight={isHovered ? 600 : 400}
                >
                  {pt.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
