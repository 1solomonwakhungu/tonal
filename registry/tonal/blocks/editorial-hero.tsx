"use client";

import * as React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { TonalButton } from "../button";
import { ChevronLink } from "../chevron-link";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface FinishOption {
  id: string;
  label: string;
  swatch: string;
  surface: string;
  deviceGradient: string;
  barRim: string;
  markColor: string;
  accentDot: string;
}

const DEFAULT_FINISHES: FinishOption[] = [
  {
    id: "porcelain",
    label: "Porcelain",
    swatch: "#EAE6DD",
    surface: "var(--t-surface-warm)",
    deviceGradient: "linear-gradient(160deg, #FAF9F6 0%, #E7E3DA 100%)",
    barRim: "#D6D2C8",
    markColor: "rgba(32, 33, 36, 0.25)",
    accentDot: "var(--t-blue)",
  },
  {
    id: "bay",
    label: "Bay",
    swatch: "#AECBFA",
    surface: "var(--t-surface-sky)",
    deviceGradient: "linear-gradient(160deg, #C9DDFD 0%, #99BFFA 100%)",
    barRim: "#8AB4F8",
    markColor: "rgba(23, 78, 166, 0.35)",
    accentDot: "var(--t-blue)",
  },
  {
    id: "aloe",
    label: "Aloe",
    swatch: "#A8DAB5",
    surface: "var(--t-surface-mint)",
    deviceGradient: "linear-gradient(160deg, #C8EBD2 0%, #9AD5AC 100%)",
    barRim: "#81C995",
    markColor: "rgba(19, 115, 51, 0.35)",
    accentDot: "var(--t-chip-mint-fg)",
  },
  {
    id: "obsidian",
    label: "Obsidian",
    swatch: "#3C4043",
    surface: "var(--t-surface-muted)",
    deviceGradient: "linear-gradient(160deg, #474A4E 0%, #26282B 100%)",
    barRim: "#5F6368",
    markColor: "rgba(255, 255, 255, 0.25)",
    accentDot: "var(--t-ink)",
  },
];

export interface EditorialHeroProps {
  eyebrow?: string;
  headline?: string;
  subtitle?: string;
  ctaLabel?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  onPrimaryClick?: () => void;
  headingLevel?: "h1" | "h2";
  finishes?: FinishOption[];
  className?: string;
}

export function EditorialHero({
  eyebrow = "New · Lumen 10 Pro",
  headline = "Designed to get out of the way.",
  subtitle = "Precision-milled glass, all-day adaptive battery, and our quietest camera system yet.",
  ctaLabel = "Buy from $999",
  secondaryLabel = "Compare models",
  secondaryHref = "#specs",
  onPrimaryClick,
  headingLevel = "h1",
  finishes = DEFAULT_FINISHES,
  className,
}: EditorialHeroProps) {
  const safeFinishes = finishes.length > 0 ? finishes : DEFAULT_FINISHES;
  const [selectedId, setSelectedId] = React.useState<string>(safeFinishes[0].id);
  const selected =
    safeFinishes.find((f) => f.id === selectedId) ?? safeFinishes[0];
  const Heading = headingLevel;

  return (
    <section
      style={{ backgroundColor: selected.surface }}
      className={cn(
        "rounded-[var(--t-radius-hero)] px-7 py-10 sm:px-12 sm:py-14 transition-colors duration-300 [transition-timing-function:var(--t-ease)]",
        className
      )}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-7 flex flex-col items-start">
          <span className="text-[13px] font-medium text-[var(--t-ink-muted)] mb-3">
            {eyebrow}
          </span>
          <Heading className="t-display text-[36px] sm:text-[52px] mb-4">
            {headline}
          </Heading>
          <p className="t-body text-[16px] max-w-md mb-7">{subtitle}</p>

          <div className="flex flex-wrap items-center gap-4 mb-8">
            <TonalButton size="lg" onClick={onPrimaryClick}>
              {ctaLabel}
            </TonalButton>
            <ChevronLink href={secondaryHref}>{secondaryLabel}</ChevronLink>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[12.5px] font-medium text-[var(--t-ink-muted)] min-w-[68px]">
              {selected.label}
            </span>
            <div
              className="flex items-center gap-2.5"
              role="group"
              aria-label="Product finish"
            >
              {safeFinishes.map((f) => {
                const active = f.id === selected.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    aria-label={f.label}
                    aria-pressed={active}
                    title={f.label}
                    onClick={() => setSelectedId(f.id)}
                    style={{ backgroundColor: f.swatch }}
                    className={cn(
                      "h-6 w-6 rounded-full border border-[var(--t-border)] cursor-pointer transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--t-blue)]",
                      active
                        ? "ring-2 ring-[var(--t-ink)] ring-offset-2 ring-offset-[var(--t-bg)] scale-105"
                        : "hover:scale-105"
                    )}
                  />
                );
              })}
            </div>
          </div>
        </div>

        <div className="md:col-span-5 flex flex-col items-center gap-4">
          <div
            style={{ background: selected.deviceGradient }}
            className="w-[172px] h-[272px] rounded-[34px] border border-[var(--t-border)] shadow-[0_24px_44px_-20px_rgba(0,0,0,0.32)] p-4 pt-8 flex flex-col items-center justify-between transition-all duration-300 hover:-translate-y-1"
          >
            <div
              style={{ borderColor: selected.barRim }}
              className="w-full h-9 rounded-full bg-[#202124] border-[3px] flex items-center justify-between px-3 transition-colors duration-300"
            >
              <div className="flex items-center gap-2">
                <span className="h-4 w-4 rounded-full bg-gradient-to-br from-[#5f6368] to-[#111214] border border-[#444746]" />
                <span className="h-4 w-4 rounded-full bg-gradient-to-br from-[#5f6368] to-[#111214] border border-[#444746]" />
              </div>
              <span className="h-2 w-2 rounded-full bg-[#f4f2ee]/85" />
            </div>
            <span
              style={{ color: selected.markColor }}
              className="text-[22px] font-medium tracking-[-0.02em] mb-10 select-none"
            >
              L
            </span>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--t-elevated)] px-4 py-1.5 text-[12px] font-medium text-[var(--t-ink-secondary)] border border-[var(--t-border-subtle)] shadow-[0_6px_16px_-8px_rgba(0,0,0,0.22)]">
            <span
              style={{ backgroundColor: selected.accentDot }}
              className="h-2 w-2 rounded-full"
            />
            Surface token: {selected.surface.replace(/^var\((.+)\)$/, "$1")}
          </div>
        </div>
      </div>
    </section>
  );
}
