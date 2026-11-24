"use client";

import * as React from "react";
import { Command, Search, Sparkles } from "lucide-react";
import { TonalButton } from "@registry/tonal/button";
import { SurfaceTile } from "@registry/tonal/surface-tile";
import { TonalChip } from "@registry/tonal/chip";
import { ChevronLink } from "@registry/tonal/chevron-link";
import { TonalAccordion } from "@registry/tonal/accordion";
import { TonalDialog } from "@registry/tonal/dialog";
import { TonalInput, TonalSelect, TonalTextarea } from "@registry/tonal/input";
import { TonalSegmentedControl } from "@registry/tonal/segmented-control";
import { useTonalToast } from "@registry/tonal/toast";
import { TonalCommand } from "@registry/tonal/command";
import { EditorialHero } from "@registry/tonal/blocks/editorial-hero";
import { TonalAppShell } from "@registry/tonal/blocks/tonal-app-shell";
import { KpiGrid } from "@registry/tonal/blocks/kpi-grid";
import { TonalAreaChart } from "@registry/tonal/blocks/tonal-area-chart";
import { TonalTable } from "@registry/tonal/blocks/tonal-table";
import { CapabilityTabs } from "@registry/tonal/blocks/capability-tabs";
import { PricingGrid } from "@registry/tonal/blocks/pricing-grid";
import { SpecsTable } from "@registry/tonal/blocks/specs-table";
import { getContrastRatio, getWcagGrade } from "@/lib/theme-studio";

const TOKEN_SPEC_GROUPS = [
  {
    label: "Surface Steps",
    tokens: [
      { name: "--t-bg", label: "Canvas" },
      { name: "--t-surface", label: "Neutral" },
      { name: "--t-surface-muted", label: "Muted" },
      { name: "--t-surface-warm", label: "Porcelain" },
      { name: "--t-surface-cool", label: "Workspace" },
      { name: "--t-surface-sky", label: "Sky" },
      { name: "--t-surface-mint", label: "Mint" },
      { name: "--t-surface-sand", label: "Sand" },
    ],
  },
  {
    label: "Ink & Semantic Status",
    tokens: [
      { name: "--t-ink", label: "Primary Ink" },
      { name: "--t-ink-secondary", label: "Secondary Ink" },
      { name: "--t-blue", label: "Action Blue" },
      { name: "--t-success", label: "Success" },
      { name: "--t-warning", label: "Warning" },
      { name: "--t-danger", label: "Danger" },
      { name: "--t-warning-surface", label: "Warning Surface" },
      { name: "--t-danger-surface", label: "Danger Surface" },
    ],
  },
];

const CONTRAST_PAIRS = [
  { label: "Primary ink on Canvas (Light)", fg: "#202124", bg: "#ffffff" },
  { label: "Action Blue on Canvas (Light)", fg: "#1967d2", bg: "#ffffff" },
  { label: "Primary ink on Canvas (Dark)", fg: "#e3e3e3", bg: "#131314" },
  { label: "Action Blue on Canvas (Dark)", fg: "#8ab4f8", bg: "#131314" },
  { label: "Success on Mint (Light)", fg: "#137333", bg: "#e6f4ea" },
  { label: "Danger on Rose (Light)", fg: "#c5221f", bg: "#fce8e6" },
];

function DialogPreview() {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  return (
    <div className="flex flex-wrap items-center gap-3">
      <TonalButton size="sm" onClick={() => setModalOpen(true)}>
        Open Modal
      </TonalButton>
      <TonalButton
        size="sm"
        variant="outline"
        onClick={() => setDrawerOpen(true)}
      >
        Open Slide-over Drawer
      </TonalButton>

      <TonalDialog
        open={modalOpen}
        onOpenChange={setModalOpen}
        title="Deploy registry update"
        description="Publishes compiled manifests to /r/registry.json with zero downtime."
        footer={
          <>
            <TonalButton
              size="sm"
              variant="ghost"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </TonalButton>
            <TonalButton size="sm" onClick={() => setModalOpen(false)}>
              Publish now
            </TonalButton>
          </>
        }
      >
        <TonalInput
          label="Release tag"
          defaultValue="v0.2.0"
          hint="Press Escape or click outside to dismiss."
        />
      </TonalDialog>

      <TonalDialog
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        variant="drawer"
        title="Quick settings"
        description="Slide-over sheet for carts, filters, or contextual details."
        footer={
          <TonalButton size="sm" onClick={() => setDrawerOpen(false)}>
            Done
          </TonalButton>
        }
      >
        <div className="flex flex-col gap-3 text-[14px] text-[var(--t-ink-secondary)]">
          <SurfaceTile tone="cool" padding="sm">
            Zero-shadow tonal surfaces stay calm in both light and dark modes.
          </SurfaceTile>
          <SurfaceTile tone="warm" padding="sm">
            Focus automatically returns to the trigger when closed.
          </SurfaceTile>
        </div>
      </TonalDialog>
    </div>
  );
}

function InputPreview() {
  const [region, setRegion] = React.useState("us-central1");
  return (
    <div className="flex flex-col gap-3.5 max-w-md">
      <TonalInput
        variant="pill"
        placeholder="Search services..."
        leadingIcon={<Search className="h-4 w-4" />}
      />
      <TonalInput
        label="Project name"
        placeholder="e.g. Tonal Docs Edge"
        hint="Lowercase letters and hyphens recommended."
      />
      <TonalSelect
        label="Primary region"
        value={region}
        onChange={(e) => setRegion(e.target.value)}
        options={[
          { value: "us-central1", label: "us-central1 (Iowa)" },
          { value: "europe-west1", label: "europe-west1 (Belgium)" },
          { value: "global", label: "global (Anycast Edge)" },
        ]}
      />
      <TonalTextarea
        label="Release notes"
        rows={2}
        error="Please enter at least 10 characters before publishing."
      />
    </div>
  );
}

function SegmentedPreview() {
  const [range, setRange] = React.useState<"7d" | "30d" | "90d">("7d");
  return (
    <div className="flex flex-col items-start gap-3">
      <TonalSegmentedControl
        value={range}
        onValueChange={setRange}
        ariaLabel="Timeframe"
        options={[
          { value: "7d", label: "7D" },
          { value: "30d", label: "30D" },
          { value: "90d", label: "90D", badge: "Q4" },
        ]}
      />
      <p className="text-[12.5px] text-[var(--t-ink-muted)]">
        Selected range: <strong className="text-[var(--t-ink)]">{range}</strong>{" "}
        (try Left/Right arrow keys when focused)
      </p>
    </div>
  );
}

function ToastPreview() {
  const { toast } = useTonalToast();
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <TonalButton
        size="sm"
        onClick={() =>
          toast({
            title: "Deployed to edge",
            description: "19 registry manifests updated cleanly.",
            tone: "success",
          })
        }
      >
        Success Toast
      </TonalButton>
      <TonalButton
        size="sm"
        variant="tonal"
        onClick={() =>
          toast({
            title: "Quota approaching limit",
            description: "85% of monthly edge requests used.",
            tone: "warning",
          })
        }
      >
        Warning
      </TonalButton>
      <TonalButton
        size="sm"
        variant="outline"
        onClick={() =>
          toast({
            title: "Build verification failed",
            description: "Check console output for details.",
            tone: "danger",
          })
        }
      >
        Danger
      </TonalButton>
    </div>
  );
}

function CommandPreview() {
  const [open, setOpen] = React.useState(false);
  const { toast } = useTonalToast();
  return (
    <div className="flex flex-col items-start gap-2.5">
      <TonalButton size="sm" variant="outline" onClick={() => setOpen(true)}>
        <Command className="h-3.5 w-3.5" />
        Open Command Palette
      </TonalButton>
      <p className="text-[12.5px] text-[var(--t-ink-muted)]">
        Also press <kbd className="font-mono text-[var(--t-ink)]">⌘K</kbd>{" "}
        anywhere in Tonal to jump across components and demos.
      </p>
      <TonalCommand
        open={open}
        onOpenChange={setOpen}
        items={[
          {
            id: "studio",
            label: "Open Theme Studio",
            description: "Remix accent hues & export tokens.css",
            group: "Actions",
            icon: Sparkles,
            shortcut: "G S",
            onSelect: () =>
              toast({ title: "Selected Theme Studio", tone: "info" }),
          },
          {
            id: "hero",
            label: "Editorial Finish Hero",
            description: "Hardware storefront split hero block",
            group: "Blocks",
            onSelect: () =>
              toast({ title: "Selected Editorial Hero", tone: "neutral" }),
          },
        ]}
      />
    </div>
  );
}

export function RegistryPreview({
  slug,
  origin = "https://tonal.harlo.dev",
}: {
  slug: string;
  origin?: string;
}) {
  switch (slug) {
    case "editorial-hero":
      return <EditorialHero />;
    case "tonal-button":
      return (
        <div className="flex flex-wrap items-center gap-3">
          <TonalButton>Primary CTA</TonalButton>
          <TonalButton variant="dark">Dark Store</TonalButton>
          <TonalButton variant="outline">Outlined</TonalButton>
          <TonalButton variant="tonal">Tonal</TonalButton>
          <TonalButton variant="ghost">Ghost</TonalButton>
        </div>
      );
    case "surface-tile":
      return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <SurfaceTile tone="warm" padding="sm">
            <div className="text-[13px] font-medium text-[var(--t-ink)]">
              Porcelain
            </div>
            <div className="text-[11px] font-mono text-[var(--t-ink-muted)] mt-0.5">
              --t-surface-warm
            </div>
          </SurfaceTile>
          <SurfaceTile tone="cool" padding="sm">
            <div className="text-[13px] font-medium text-[var(--t-ink)]">
              Workspace
            </div>
            <div className="text-[11px] font-mono text-[var(--t-ink-muted)] mt-0.5">
              --t-surface-cool
            </div>
          </SurfaceTile>
          <SurfaceTile tone="mint" padding="sm">
            <div className="text-[13px] font-medium text-[var(--t-ink)]">
              Aloe
            </div>
            <div className="text-[11px] font-mono text-[var(--t-ink-muted)] mt-0.5">
              --t-surface-mint
            </div>
          </SurfaceTile>
        </div>
      );
    case "tonal-chip":
      return (
        <div className="flex flex-wrap items-center gap-2.5">
          <TonalChip tone="blue">New release</TonalChip>
          <TonalChip tone="mint">Healthy</TonalChip>
          <TonalChip tone="warm">Porcelain</TonalChip>
          <TonalChip tone="neutral">Registry v0.2</TonalChip>
          <TonalChip tone="warning">Degraded</TonalChip>
          <TonalChip tone="danger">Incident</TonalChip>
        </div>
      );
    case "chevron-link":
      return (
        <div className="flex flex-wrap items-center gap-6">
          <ChevronLink href="#primitives">Learn more</ChevronLink>
          <ChevronLink href="#primitives" tone="ink">
            Compare specs
          </ChevronLink>
        </div>
      );
    case "tonal-dialog":
      return <DialogPreview />;
    case "tonal-input":
      return <InputPreview />;
    case "tonal-segmented-control":
      return <SegmentedPreview />;
    case "tonal-toast":
      return <ToastPreview />;
    case "tonal-command":
      return <CommandPreview />;
    case "tonal-accordion":
      return (
        <TonalAccordion
          items={[
            {
              question: "Do I need a heavy UI framework installed?",
              answer:
                "No. Tonal is pure React + Tailwind CSS v4 powered by CSS custom properties and open-source Google Sans (SIL OFL-1.1).",
            },
            {
              question: "How do I install a Tonal component in another project?",
              answer: `Run npx shadcn@latest add ${origin}/r/editorial-hero.json. Cross-item dependencies resolve automatically via full registry URLs.`,
            },
            {
              question: "How does Soft Pill vs. Commerce mode work?",
              answer:
                "It swaps button radius and primary CTA ink tokens (--t-radius-btn and --t-cta-bg) on a parent data-tonal-mode attribute.",
            },
          ]}
        />
      );
    case "tonal-app-shell":
      return <TonalAppShell />;
    case "kpi-grid":
      return <KpiGrid />;
    case "tonal-area-chart":
      return <TonalAreaChart />;
    case "tonal-table":
      return <TonalTable />;
    case "capability-tabs":
      return <CapabilityTabs />;
    case "pricing-grid":
      return <PricingGrid />;
    case "specs-table":
      return <SpecsTable />;
    case "tonal-tokens":
      return (
        <div className="flex flex-col gap-6">
          {TOKEN_SPEC_GROUPS.map((group) => (
            <div key={group.label} className="flex flex-col gap-2.5">
              <span className="text-[12px] font-medium uppercase tracking-[0.04em] text-[var(--t-ink-muted)]">
                {group.label}
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {group.tokens.map((t) => (
                  <div
                    key={t.name}
                    className="flex items-center gap-2.5 rounded-[var(--t-radius-sm)] border border-[var(--t-border-subtle)] bg-[var(--t-bg)] p-2.5"
                  >
                    <span
                      style={{ backgroundColor: `var(${t.name})` }}
                      className="h-8 w-8 rounded-[8px] border border-[var(--t-border-subtle)] shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="text-[12.5px] font-medium text-[var(--t-ink)] truncate">
                        {t.label}
                      </div>
                      <div className="text-[11px] font-mono text-[var(--t-ink-muted)] truncate">
                        {t.name}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* WCAG Contrast Matrix */}
          <div className="flex flex-col gap-2.5">
            <span className="text-[12px] font-medium uppercase tracking-[0.04em] text-[var(--t-ink-muted)]">
              Verified WCAG Contrast Matrix &amp; Tailwind v4 @theme Bridge
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {CONTRAST_PAIRS.map((pair) => {
                const ratio = getContrastRatio(pair.fg, pair.bg);
                const grade = getWcagGrade(ratio);
                return (
                  <div
                    key={pair.label}
                    className="flex items-center justify-between gap-2 rounded-[var(--t-radius-sm)] border border-[var(--t-border-subtle)] bg-[var(--t-bg)] px-3 py-2.5"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        style={{ backgroundColor: pair.bg, color: pair.fg }}
                        className="h-7 w-7 rounded-[7px] border border-[var(--t-border-subtle)] grid place-items-center text-[11px] font-semibold shrink-0"
                      >
                        Aa
                      </span>
                      <span className="text-[12px] text-[var(--t-ink-secondary)] truncate">
                        {pair.label}
                      </span>
                    </div>
                    <TonalChip
                      tone={grade === "Fail" ? "danger" : "mint"}
                      className="px-2 py-0.5 text-[11px] font-mono shrink-0"
                    >
                      {ratio}:1 {grade}
                    </TonalChip>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-[var(--t-radius-sm)] border border-[var(--t-border-subtle)] bg-[var(--t-surface)] p-4 sm:p-5 flex flex-col gap-2">
            <span className="text-[11.5px] font-mono text-[var(--t-ink-muted)]">
              @theme inline · bg-t-surface · text-t-ink · rounded-t-card ·
              .t-display
            </span>
            <div className="t-headline text-[22px] sm:text-[26px]">
              Editorial hierarchy without heavy elevation.
            </div>
            <p className="t-body text-[14px]">
              Includes Tailwind v4 <code>@theme inline</code> token utilities,
              semantic status tokens, and{" "}
              <code>prefers-reduced-motion</code> guards out of the box.
            </p>
          </div>
        </div>
      );
    default:
      return null;
  }
}
