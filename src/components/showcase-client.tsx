"use client";

import * as React from "react";
import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  Check,
  Copy,
  Layers,
  Palette,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { TonalButton } from "@registry/tonal/button";
import { SurfaceTile } from "@registry/tonal/surface-tile";
import { TonalChip } from "@registry/tonal/chip";
import { CodePreviewCard } from "@/components/code-preview-card";
import { RegistryPreview } from "@/components/registry-preview";
import { REGISTRY_CATALOG } from "@/lib/registry-catalog";
import type { RegistrySourceMap } from "@/lib/registry-source";
import { cn } from "@/lib/utils";

type GalleryCategory = "all" | "primitives" | "blocks" | "tokens";

const DEFAULT_ORIGIN = "https://tonal.harlo.dev";

const DEMO_SITES = [
  {
    href: "/demos/hardware",
    tag: "Hardware Storefront",
    title: "Lumen Store",
    desc: "Flagship hardware storefront with dynamic finish backdrops, slide-over bag drawer, editorial bento tiles, specs table, and FAQ.",
    tone: "warm" as const,
    icon: Smartphone,
  },
  {
    href: "/demos/ai",
    tag: "AI Product Site",
    title: "Aura Studio",
    desc: "Calm AI studio aesthetic powered by CapabilityTabs, PricingGrid, and tonal surface steps.",
    tone: "cool" as const,
    icon: Sparkles,
  },
  {
    href: "/demos/workspace",
    tag: "Productivity SaaS",
    title: "Canvas Workspace",
    desc: "Productivity workspace editorial landing page with segmented app switcher, share dialog, and customer quote bento.",
    tone: "mint" as const,
    icon: Layers,
  },
  {
    href: "/demos/dashboard",
    tag: "App & Analytics Console",
    title: "Pulse Dashboard",
    desc: "Cloud console powered by TonalAppShell, KpiGrid, TonalAreaChart, TonalTable, TonalDialog, and form controls.",
    tone: "sky" as const,
    icon: Activity,
  },
];

const SWATCHES = [
  { name: "Canvas", token: "--t-bg" },
  { name: "Neutral", token: "--t-surface" },
  { name: "Porcelain", token: "--t-surface-warm" },
  { name: "Workspace", token: "--t-surface-cool" },
  { name: "Ink", token: "--t-ink" },
  { name: "Action Blue", token: "--t-blue" },
];

const CATEGORY_TABS: Array<{ id: GalleryCategory; label: string }> = [
  { id: "all", label: "All" },
  { id: "primitives", label: "Primitives" },
  { id: "blocks", label: "Blocks" },
  { id: "tokens", label: "Tokens" },
];

export function ShowcaseClient({ sources }: { sources: RegistrySourceMap }) {
  const [origin, setOrigin] = React.useState<string>(DEFAULT_ORIGIN);
  const [copiedInstall, setCopiedInstall] = React.useState(false);
  const [copiedToken, setCopiedToken] = React.useState<string | null>(null);
  const [activeCategory, setActiveCategory] =
    React.useState<GalleryCategory>("all");

  React.useEffect(() => {
    if (typeof window !== "undefined" && window.location.origin) {
      setOrigin(window.location.origin);
    }
  }, []);

  const getLiveOrigin = () =>
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : origin;

  const installCmd = `npx shadcn@latest add ${origin}/r/editorial-hero.json`;

  const categoryCounts: Record<GalleryCategory, number> = React.useMemo(
    () => ({
      all: REGISTRY_CATALOG.length,
      primitives: REGISTRY_CATALOG.filter((i) => i.category === "primitives")
        .length,
      blocks: REGISTRY_CATALOG.filter((i) => i.category === "blocks").length,
      tokens: REGISTRY_CATALOG.filter((i) => i.category === "tokens").length,
    }),
    []
  );

  const visibleItems =
    activeCategory === "all"
      ? REGISTRY_CATALOG
      : REGISTRY_CATALOG.filter((item) => item.category === activeCategory);

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 pt-10 sm:pt-14 flex flex-col gap-16">
      {/* Hero */}
      <section className="text-center max-w-3xl mx-auto flex flex-col items-center">
        <TonalChip tone="blue" className="mb-5">
          shadcn-compatible registry · v0.2 · {REGISTRY_CATALOG.length} items
        </TonalChip>
        <h1 className="t-display text-[42px] sm:text-[62px] mb-5">
          Editorial tonal UI, minus the bloat.
        </h1>
        <p className="t-body text-[17px] sm:text-[18px] max-w-xl mb-8">
          Tonal distills flagship hardware and workspace interfaces down to
          open-source Google Sans, flat tonal surfaces, 24px bento tiles, and
          quiet controls you own directly in your codebase.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-7">
          <Link href="/demos/hardware">
            <TonalButton size="lg">Explore Live Demos</TonalButton>
          </Link>
          <Link href="/studio">
            <TonalButton variant="tonal" size="lg">
              <Palette className="h-4 w-4" />
              Theme Studio
            </TonalButton>
          </Link>
          <a href="#primitives">
            <TonalButton variant="outline" size="lg">
              Browse Components
            </TonalButton>
          </a>
        </div>

        <button
          type="button"
          onClick={() => {
            const liveCmd = `npx shadcn@latest add ${getLiveOrigin()}/r/editorial-hero.json`;
            navigator.clipboard?.writeText(liveCmd).catch(() => {});
            setCopiedInstall(true);
            setTimeout(() => setCopiedInstall(false), 1600);
          }}
          className="inline-flex items-center gap-3 rounded-full bg-[var(--t-surface)] hover:bg-[var(--t-surface-muted)] border border-[var(--t-border-subtle)] px-5 py-2.5 text-[13px] font-mono text-[var(--t-ink-secondary)] cursor-pointer transition-colors"
        >
          <span className="truncate max-w-[260px] sm:max-w-none">
            {installCmd}
          </span>
          {copiedInstall ? (
            <Check className="h-4 w-4 text-[var(--t-success,#188038)] shrink-0" />
          ) : (
            <Copy className="h-4 w-4 text-[var(--t-ink-muted)] shrink-0" />
          )}
        </button>
      </section>

      {/* 4 Full Local Websites */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <p className="text-[13px] font-medium text-[var(--t-ink-muted)] mb-1">
              Full websites powered by Tonal registry blocks
            </p>
            <h2 className="t-headline text-[28px] sm:text-[34px]">
              Four real sites. One tonal token system.
            </h2>
          </div>
          <p className="text-[13.5px] text-[var(--t-ink-muted)]">
            Press <kbd className="font-mono text-[var(--t-ink)]">⌘K</kbd> or
            toggle{" "}
            <strong className="text-[var(--t-ink)]">
              Soft Pill / Commerce
            </strong>{" "}
            above.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {DEMO_SITES.map((site) => {
            const Icon = site.icon;
            return (
              <Link key={site.href} href={site.href} className="group block">
                <SurfaceTile
                  tone={site.tone}
                  className="h-full flex flex-col justify-between gap-6 transition-transform duration-200 [transition-timing-function:var(--t-ease)] group-hover:-translate-y-1"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--t-bg)] text-[var(--t-ink)] border border-[var(--t-border-subtle)]">
                        <Icon className="h-5 w-5" />
                      </span>
                      <ArrowUpRight className="h-5 w-5 text-[var(--t-ink-muted)] group-hover:text-[var(--t-ink)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                    <p className="text-[12px] font-medium text-[var(--t-ink-muted)] mb-1.5">
                      {site.tag}
                    </p>
                    <h3 className="t-headline text-[24px] mb-2">
                      {site.title}
                    </h3>
                    <p className="t-body text-[14px]">{site.desc}</p>
                  </div>
                  <span className="text-[14px] font-medium text-[var(--t-blue)] group-hover:underline underline-offset-4">
                    Open live website ›
                  </span>
                </SurfaceTile>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Token Palette Strip */}
      <section className="flex flex-col gap-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[13px] font-medium text-[var(--t-ink-muted)] mb-1">
              Foundation
            </p>
            <h2 className="t-headline text-[26px] sm:text-[32px]">
              Core tonal tokens
            </h2>
          </div>
          <div className="flex items-center gap-4 text-[12.5px]">
            <span className="text-[var(--t-ink-muted)]">
              {copiedToken
                ? `Copied ${copiedToken}`
                : "Click any swatch to copy"}
            </span>
            <Link
              href="/studio"
              className="font-medium text-[var(--t-blue)] hover:underline underline-offset-4"
            >
              Remix in Theme Studio ›
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3.5">
          {SWATCHES.map((s) => (
            <button
              key={s.token}
              type="button"
              onClick={() => {
                const value = `var(${s.token})`;
                navigator.clipboard?.writeText(value).catch(() => {});
                setCopiedToken(value);
                setTimeout(() => setCopiedToken(null), 1500);
              }}
              className="text-left rounded-[16px] border border-[var(--t-border-subtle)] bg-[var(--t-bg)] p-3 cursor-pointer hover:border-[var(--t-blue)] transition-colors"
            >
              <div
                style={{ backgroundColor: `var(${s.token})` }}
                className="h-12 rounded-[10px] border border-[var(--t-border-subtle)] mb-2.5"
              />
              <div className="text-[13px] font-medium text-[var(--t-ink)]">
                {s.name}
              </div>
              <div className="text-[11px] font-mono text-[var(--t-ink-muted)] truncate">
                {s.token}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Interactive Registry Components */}
      <section id="primitives" className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-[13px] font-medium text-[var(--t-ink-muted)] mb-1">
              Installable via shadcn CLI · Syntax-highlighted source · True
              responsive iframes
            </p>
            <h2 className="t-headline text-[28px] sm:text-[34px]">
              Primitives, Blocks &amp; Tokens
            </h2>
          </div>

          {/* Category Filter Pill Bar */}
          <div
            className="inline-flex flex-wrap items-center gap-1 rounded-full bg-[var(--t-surface)] p-1 border border-[var(--t-border-subtle)] self-start md:self-auto"
            role="group"
            aria-label="Filter registry components by category"
          >
            {CATEGORY_TABS.map((cat) => {
              const active = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  aria-pressed={active}
                  className={cn(
                    "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[13px] font-medium cursor-pointer transition-colors duration-200 [transition-timing-function:cubic-bezier(0.2,0,0,1)]",
                    active
                      ? "bg-[var(--t-bg)] text-[var(--t-ink)] shadow-[0_1px_2px_rgba(0,0,0,0.08)]"
                      : "text-[var(--t-ink-muted)] hover:text-[var(--t-ink)]"
                  )}
                >
                  <span>{cat.label}</span>
                  <span
                    className={cn(
                      "text-[11px] font-mono px-1.5 py-0.5 rounded-full",
                      active
                        ? "bg-[var(--t-surface)] text-[var(--t-ink-secondary)]"
                        : "text-[var(--t-ink-muted)]"
                    )}
                  >
                    {categoryCounts[cat.id]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {visibleItems.map((item) => {
            const sourceItem = sources[item.slug];
            return (
              <CodePreviewCard
                key={item.slug}
                title={item.title}
                description={item.description}
                registryName={item.slug}
                code={sourceItem?.code ?? ""}
                highlightedHtml={sourceItem?.highlightedHtml}
                filePath={sourceItem?.files[0]?.path}
                dependencies={sourceItem?.dependencies}
                registryDependencies={sourceItem?.registryDependencies}
                className={item.fullWidth ? "lg:col-span-2" : undefined}
              >
                <RegistryPreview slug={item.slug} origin={origin} />
              </CodePreviewCard>
            );
          })}
        </div>
      </section>
    </div>
  );
}
