"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { TonalChip, type TonalChipProps } from "../chip";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface TonalTableRow {
  id: string;
  name: string;
  meta?: string;
  status: string;
  statusTone?: TonalChipProps["tone"];
  metricPrimary: string;
  metricSecondary: string;
  updated: string;
}

export interface TonalTableColumns {
  name?: string;
  status?: string;
  metricPrimary?: string;
  metricSecondary?: string;
  updated?: string;
}

export const DEFAULT_TABLE_ROWS: TonalTableRow[] = [
  {
    id: "tonal-storefront",
    name: "Lumen Storefront Web",
    meta: "us-central1",
    status: "Healthy",
    statusTone: "mint",
    metricPrimary: "842K / wk",
    metricSecondary: "118 ms",
    updated: "4 mins ago",
  },
  {
    id: "aura-inference",
    name: "Aura 2.5 Inference Gateway",
    meta: "us-east4",
    status: "Healthy",
    statusTone: "mint",
    metricPrimary: "620K / wk",
    metricSecondary: "148 ms",
    updated: "19 mins ago",
  },
  {
    id: "canvas-realtime",
    name: "Canvas Docs Sync Engine",
    meta: "europe-west1",
    status: "Deploying",
    statusTone: "blue",
    metricPrimary: "294K / wk",
    metricSecondary: "164 ms",
    updated: "Just now",
  },
  {
    id: "registry-cdn",
    name: "Tonal Registry Edge CDN",
    meta: "global",
    status: "Healthy",
    statusTone: "mint",
    metricPrimary: "84K / wk",
    metricSecondary: "34 ms",
    updated: "2 hours ago",
  },
  {
    id: "search-preview",
    name: "Staging Search Indexer",
    meta: "us-west1",
    status: "Paused",
    statusTone: "neutral",
    metricPrimary: "0 / wk",
    metricSecondary: "—",
    updated: "3 days ago",
  },
];

function inferStatusTone(status: string): TonalChipProps["tone"] {
  const normalized = status.toLowerCase();
  if (
    normalized === "healthy" ||
    normalized === "active" ||
    normalized === "live"
  ) {
    return "mint";
  }
  if (
    normalized === "deploying" ||
    normalized === "syncing" ||
    normalized === "pending"
  ) {
    return "blue";
  }
  return "neutral";
}

export interface TonalTableProps {
  title?: string;
  rows?: TonalTableRow[];
  statuses?: string[];
  columns?: TonalTableColumns;
  searchPlaceholder?: string;
  emptyMessage?: string;
  onRowClick?: (row: TonalTableRow) => void;
  className?: string;
}

export function TonalTable({
  title = "Services",
  rows = DEFAULT_TABLE_ROWS,
  statuses,
  columns,
  searchPlaceholder = "Filter projects or region...",
  emptyMessage,
  onRowClick,
  className,
}: TonalTableProps) {
  const [query, setQuery] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("All");

  const filterOptions = React.useMemo(() => {
    if (statuses && statuses.length > 0) {
      return statuses.includes("All") ? statuses : ["All", ...statuses];
    }
    const unique = Array.from(new Set(rows.map((r) => r.status)));
    return ["All", ...unique];
  }, [rows, statuses]);

  const colLabels = {
    name: columns?.name ?? "Service",
    status: columns?.status ?? "Status",
    metricPrimary: columns?.metricPrimary ?? "Throughput",
    metricSecondary: columns?.metricSecondary ?? "Median",
    updated: columns?.updated ?? "Updated",
  };

  const filteredRows = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((row) => {
      const matchesText =
        !q ||
        row.name.toLowerCase().includes(q) ||
        (row.meta?.toLowerCase().includes(q) ?? false) ||
        row.status.toLowerCase().includes(q);
      const matchesStatus =
        statusFilter === "All" || row.status === statusFilter;
      return matchesText && matchesStatus;
    });
  }, [rows, query, statusFilter]);

  return (
    <div className={cn("flex flex-col gap-3.5", className)}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h2 className="text-[16px] font-medium tracking-[-0.015em] text-[var(--t-ink)]">
          {title} ({filteredRows.length})
        </h2>

        <div className="flex flex-wrap items-center gap-2">
          {/* Pill Search Field */}
          <div className="relative">
            <Search
              aria-hidden="true"
              className="h-4 w-4 text-[var(--t-ink-muted)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={searchPlaceholder}
              aria-label={searchPlaceholder}
              className="rounded-full bg-[var(--t-surface-cool)] pl-9 pr-4 py-1.5 text-[13px] text-[var(--t-ink)] placeholder:text-[var(--t-ink-muted)] border border-transparent focus:border-[var(--t-blue)] focus:bg-[var(--t-bg)] focus:outline-none transition-colors w-56"
            />
          </div>

          {/* Status Filter Chips */}
          {filterOptions.map((st) => {
            const active = statusFilter === st;
            return (
              <button
                key={st}
                type="button"
                aria-pressed={active}
                onClick={() => setStatusFilter(st)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-[12px] font-medium cursor-pointer transition-colors duration-200 [transition-timing-function:var(--t-ease)]",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--t-blue)]",
                  active
                    ? "bg-[var(--t-ink)] text-[var(--t-bg)]"
                    : "bg-[var(--t-surface)] text-[var(--t-ink-muted)] hover:text-[var(--t-ink)]"
                )}
              >
                {st}
              </button>
            );
          })}
        </div>
      </div>

      {/* Hairline Data Table */}
      <div className="rounded-[18px] border border-[var(--t-border-subtle)] bg-[var(--t-bg)] overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[540px]">
          <thead>
            <tr className="bg-[var(--t-surface)] text-[12px] font-medium text-[var(--t-ink-muted)] border-b border-[var(--t-border-subtle)]">
              <th scope="col" className="py-3 px-4 font-medium">
                {colLabels.name}
              </th>
              <th scope="col" className="py-3 px-4 font-medium">
                {colLabels.status}
              </th>
              <th scope="col" className="py-3 px-4 font-medium">
                {colLabels.metricPrimary}
              </th>
              <th scope="col" className="py-3 px-4 font-medium">
                {colLabels.metricSecondary}
              </th>
              <th scope="col" className="py-3 px-4 font-medium text-right">
                {colLabels.updated}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--t-border-subtle)] text-[13.5px]">
            {filteredRows.map((row) => (
              <tr
                key={row.id}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                tabIndex={onRowClick ? 0 : undefined}
                onKeyDown={
                  onRowClick
                    ? (e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          onRowClick(row);
                        }
                      }
                    : undefined
                }
                className={cn(
                  "hover:bg-[var(--t-surface)] transition-colors duration-150",
                  onRowClick &&
                    "cursor-pointer focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--t-blue)]"
                )}
              >
                <td className="py-3.5 px-4">
                  <div className="font-medium text-[var(--t-ink)]">
                    {row.name}
                  </div>
                  {row.meta && (
                    <div className="text-[11.5px] font-mono text-[var(--t-ink-muted)]">
                      {row.meta}
                    </div>
                  )}
                </td>
                <td className="py-3.5 px-4">
                  <TonalChip
                    tone={row.statusTone ?? inferStatusTone(row.status)}
                  >
                    {row.status}
                  </TonalChip>
                </td>
                <td className="py-3.5 px-4 text-[var(--t-ink-secondary)] tabular-nums">
                  {row.metricPrimary}
                </td>
                <td className="py-3.5 px-4 font-mono text-[12.5px] text-[var(--t-ink-secondary)] tabular-nums">
                  {row.metricSecondary}
                </td>
                <td className="py-3.5 px-4 text-right text-[12.5px] text-[var(--t-ink-muted)]">
                  {row.updated}
                </td>
              </tr>
            ))}

            {filteredRows.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="py-8 px-4 text-center text-[13.5px] text-[var(--t-ink-muted)]"
                >
                  <div>
                    {emptyMessage ??
                      (query.trim()
                        ? `No items match “${query.trim()}”.`
                        : `No items with status “${statusFilter}”.`)}
                  </div>
                  {(query.trim() || statusFilter !== "All") && (
                    <button
                      type="button"
                      onClick={() => {
                        setQuery("");
                        setStatusFilter("All");
                      }}
                      className="mt-2 text-[12.5px] font-medium text-[var(--t-blue)] hover:underline cursor-pointer"
                    >
                      Reset filters
                    </button>
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
