"use client";

import * as React from "react";
import { Code2, Compass, FileText, Sparkles } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { SurfaceTile, type SurfaceTone } from "../surface-tile";
import { TonalChip, type TonalChipProps } from "../chip";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface CapabilityBadge {
  label: string;
  tone?: TonalChipProps["tone"];
}

export interface CapabilityItem {
  id: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  prompt: string;
  response: string;
  meta?: string;
  contextLabel?: string;
  badges?: CapabilityBadge[];
}

export const DEFAULT_CAPABILITIES: CapabilityItem[] = [
  {
    id: "write",
    label: "Write",
    icon: FileText,
    prompt: "Rewrite our launch note so it sounds calm, clear, and human.",
    response:
      "Meet Aura 2.5 — faster reasoning in a calmer workspace. No cluttered sidebars, no noisy badges. Just crisp answers grounded in your documents.",
    meta: "0.4s latency · Tone: Editorial",
  },
  {
    id: "code",
    label: "Code",
    icon: Code2,
    prompt: "Create a flat tonal card utility in Tailwind v4 with 24px corners.",
    response:
      ".surface-tile { background: var(--t-surface-cool); border-radius: 24px; padding: 32px; transition: background 240ms cubic-bezier(0.2, 0, 0, 1); }",
    meta: "0.6s latency · TypeScript + CSS",
  },
  {
    id: "plan",
    label: "Plan",
    icon: Compass,
    prompt: "Break our 2-week design system sprint into 3 shippable milestones.",
    response:
      "Week 1: Lock 12 CSS tokens + 4 base primitives.\nWeek 2 (Mon–Wed): Ship Hero, Bento, and FAQ blocks.\nWeek 2 (Thu–Fri): Compile shadcn registry JSON & deploy.",
    meta: "0.5s latency · Structured Plan",
  },
];

const DEFAULT_BADGES: CapabilityBadge[] = [
  { label: "Grounded", tone: "mint" },
  { label: "No training on your data", tone: "neutral" },
];

export interface CapabilityTabsProps {
  items?: CapabilityItem[];
  defaultActiveId?: string;
  promptLabel?: string;
  responseLabel?: string;
  defaultContextLabel?: string;
  tone?: SurfaceTone;
  onSelect?: (item: CapabilityItem) => void;
  className?: string;
}

export function CapabilityTabs({
  items = DEFAULT_CAPABILITIES,
  defaultActiveId,
  promptLabel = "Prompt",
  responseLabel = "Aura Response",
  defaultContextLabel = "Context window · 2M tokens",
  tone = "cool",
  onSelect,
  className,
}: CapabilityTabsProps) {
  const baseId = React.useId();
  const [activeId, setActiveId] = React.useState<string>(
    defaultActiveId ?? items[0]?.id ?? ""
  );

  const activeItem =
    items.find((item) => item.id === activeId) ?? items[0] ?? null;

  if (!activeItem) return null;

  const badges = activeItem.badges ?? DEFAULT_BADGES;
  const panelId = `${baseId}-panel`;

  return (
    <SurfaceTile
      tone={tone}
      padding="lg"
      className={cn("flex flex-col gap-6", className)}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div
          role="tablist"
          aria-label="Capabilities"
          className="inline-flex flex-wrap gap-2"
        >
          {items.map((cap) => {
            const Icon = cap.icon;
            const active = cap.id === activeItem.id;
            return (
              <button
                key={cap.id}
                id={`${baseId}-tab-${cap.id}`}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls={panelId}
                onClick={() => {
                  setActiveId(cap.id);
                  onSelect?.(cap);
                }}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13.5px] font-medium cursor-pointer transition-all duration-200 [transition-timing-function:var(--t-ease)]",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--t-blue)]",
                  active
                    ? "bg-[var(--t-ink)] text-[var(--t-bg)]"
                    : "bg-[var(--t-elevated)] text-[var(--t-ink-secondary)] border border-[var(--t-border-subtle)] hover:bg-[var(--t-blue-tint)] hover:text-[var(--t-ink)]"
                )}
              >
                {Icon && <Icon className="h-4 w-4" />}
                {cap.label}
              </button>
            );
          })}
        </div>

        {activeItem.meta && (
          <span className="text-[12.5px] font-mono text-[var(--t-ink-muted)]">
            {activeItem.meta}
          </span>
        )}
      </div>

      <div
        id={panelId}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${activeItem.id}`}
        className="grid grid-cols-1 md:grid-cols-12 gap-5"
      >
        <div className="md:col-span-5 rounded-[20px] bg-[var(--t-elevated)] p-6 border border-[var(--t-border-subtle)] flex flex-col justify-between gap-4">
          <div>
            <div className="text-[11.5px] font-medium uppercase tracking-wider text-[var(--t-ink-muted)] mb-2">
              {promptLabel}
            </div>
            <p className="text-[17px] font-medium tracking-[-0.015em] text-[var(--t-ink)] leading-[1.4]">
              “{activeItem.prompt}”
            </p>
          </div>
          <div className="text-[12px] text-[var(--t-ink-muted)]">
            {activeItem.contextLabel ?? defaultContextLabel}
          </div>
        </div>

        <div className="md:col-span-7 rounded-[20px] bg-[var(--t-elevated)] p-6 border border-[var(--t-border-subtle)] flex flex-col justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[11.5px] font-medium uppercase tracking-wider text-[var(--t-blue)] mb-2">
              <Sparkles className="h-3.5 w-3.5" />
              {responseLabel}
            </div>
            <p className="text-[15.5px] leading-[1.65] text-[var(--t-ink-secondary)] whitespace-pre-line">
              {activeItem.response}
            </p>
          </div>
          {badges.length > 0 && (
            <div className="flex flex-wrap items-center gap-2.5">
              {badges.map((badge) => (
                <TonalChip key={badge.label} tone={badge.tone ?? "neutral"}>
                  {badge.label}
                </TonalChip>
              ))}
            </div>
          )}
        </div>
      </div>
    </SurfaceTile>
  );
}
