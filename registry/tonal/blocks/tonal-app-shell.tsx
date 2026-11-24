"use client";

import * as React from "react";
import {
  BarChart3,
  ChevronRight,
  CreditCard,
  FolderKanban,
  LayoutGrid,
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ChevronLink } from "../chevron-link";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface TonalNavItem {
  id: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string | number;
}

export const DEFAULT_APP_SHELL_NAV: TonalNavItem[] = [
  { id: "overview", label: "Overview", icon: LayoutGrid },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "usage", label: "Usage & Quotas", icon: BarChart3 },
  { id: "billing", label: "Billing", icon: CreditCard },
];

export interface TonalQuotaCardProps {
  title?: string;
  percent?: number;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
  className?: string;
}

export function TonalQuotaCard({
  title = "Monthly Quota",
  percent = 68,
  description = "7.42M of 11M included edge requests used this cycle.",
  actionLabel = "Manage plan",
  actionHref,
  onAction,
  className,
}: TonalQuotaCardProps) {
  const clamped = Math.max(0, Math.min(100, percent));

  return (
    <div
      className={cn(
        "rounded-[20px] bg-[var(--t-elevated)] p-4 border border-[var(--t-border-subtle)] flex flex-col gap-3",
        className
      )}
    >
      <div className="flex items-center justify-between text-[12.5px]">
        <span className="font-medium text-[var(--t-ink)]">{title}</span>
        <span className="text-[var(--t-ink-muted)] tabular-nums">
          {clamped}%
        </span>
      </div>
      <div
        className="h-2 w-full rounded-full bg-[var(--t-surface-sky)] overflow-hidden"
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={title}
      >
        <div
          className="h-full rounded-full bg-[var(--t-blue)] transition-all duration-300 [transition-timing-function:var(--t-ease)]"
          style={{ width: `${clamped}%` }}
        />
      </div>
      {description && (
        <p className="text-[12px] text-[var(--t-ink-muted)] leading-[1.45]">
          {description}
        </p>
      )}
      {actionLabel &&
        (actionHref ? (
          <ChevronLink
            href={actionHref}
            onClick={onAction ? () => onAction() : undefined}
            className="text-[12.5px]"
          >
            {actionLabel}
          </ChevronLink>
        ) : (
          <button
            type="button"
            onClick={onAction}
            className="group inline-flex items-center gap-1 self-start text-[12.5px] font-medium tracking-[-0.01em] text-[var(--t-blue)] hover:text-[var(--t-blue-hover)] cursor-pointer rounded-[4px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--t-blue)]"
          >
            <span className="group-hover:underline underline-offset-4">
              {actionLabel}
            </span>
            <ChevronRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-200 [transition-timing-function:var(--t-ease)] group-hover:translate-x-0.5"
            />
          </button>
        ))}
    </div>
  );
}

export interface TonalAppShellProps {
  items?: TonalNavItem[];
  activeId?: string;
  defaultActiveId?: string;
  onSelect?: (id: string) => void;
  sidebarLabel?: string;
  sidebarHeader?: React.ReactNode;
  sidebarFooter?: React.ReactNode;
  header?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  sheetClassName?: string;
}

export function TonalAppShell({
  items = DEFAULT_APP_SHELL_NAV,
  activeId,
  defaultActiveId,
  onSelect,
  sidebarLabel = "Workspace",
  sidebarHeader,
  sidebarFooter,
  header,
  children,
  className,
  sheetClassName,
}: TonalAppShellProps) {
  const [internalActive, setInternalActive] = React.useState<string>(
    defaultActiveId ?? items[0]?.id ?? ""
  );

  const currentId = activeId ?? internalActive;
  const activeItem = items.find((item) => item.id === currentId) ?? items[0];

  const handleSelect = (id: string) => {
    if (activeId === undefined) {
      setInternalActive(id);
    }
    onSelect?.(id);
  };

  return (
    <div
      className={cn(
        "rounded-[var(--t-radius-hero)] bg-[var(--t-surface-cool)] p-3 sm:p-4 grid grid-cols-1 lg:grid-cols-12 gap-4 transition-colors duration-300 [transition-timing-function:var(--t-ease)]",
        className
      )}
    >
      {/* Left Navigation Rail */}
      <aside className="lg:col-span-3 flex flex-col justify-between gap-6 p-2">
        <div className="flex flex-col gap-3">
          {sidebarHeader}
          <nav aria-label={sidebarLabel} className="flex flex-col gap-1">
            {sidebarLabel && (
              <div className="px-3 pb-2 text-[11.5px] font-medium uppercase tracking-wider text-[var(--t-ink-muted)]">
                {sidebarLabel}
              </div>
            )}
            {items.map((item) => {
              const Icon = item.icon;
              const isActive = item.id === currentId;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => handleSelect(item.id)}
                  className={cn(
                    "flex items-center justify-between gap-3 px-4 py-2.5 rounded-full text-[14px] font-medium cursor-pointer transition-colors duration-200 [transition-timing-function:var(--t-ease)] text-left",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--t-blue)]",
                    isActive
                      ? "bg-[var(--t-blue-tint)] text-[var(--t-blue-hover)]"
                      : "text-[var(--t-ink-secondary)] hover:bg-[var(--t-surface-muted)] hover:text-[var(--t-ink)]"
                  )}
                >
                  <span className="inline-flex items-center gap-3 min-w-0">
                    {Icon && <Icon className="h-4 w-4 shrink-0" />}
                    <span className="truncate">{item.label}</span>
                  </span>
                  {item.badge !== undefined && (
                    <span className="text-[11.5px] font-medium tabular-nums text-[var(--t-ink-muted)]">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {sidebarFooter !== undefined ? sidebarFooter : <TonalQuotaCard />}
      </aside>

      {/* Main Workspace Sheet */}
      <div
        className={cn(
          "lg:col-span-9 rounded-[22px] bg-[var(--t-bg)] border border-[var(--t-border-subtle)] p-5 sm:p-7 flex flex-col gap-7 transition-colors duration-300 [transition-timing-function:var(--t-ease)]",
          sheetClassName
        )}
      >
        {header}
        {children ?? (
          <div className="flex flex-col gap-2 py-6">
            <h2 className="t-headline text-[24px] sm:text-[28px]">
              {activeItem?.label ?? "Workspace"}
            </h2>
            <p className="text-[14px] text-[var(--t-ink-muted)] max-w-lg">
              Drop KPI grids, charts, or hairline data tables inside this
              elevated workspace sheet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
