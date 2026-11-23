"use client";

import * as React from "react";
import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  Check,
  Copy,
  Layers,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { TonalButton } from "@registry/tonal/button";
import { SurfaceTile } from "@registry/tonal/surface-tile";
import { TonalChip } from "@registry/tonal/chip";
import { ChevronLink } from "@registry/tonal/chevron-link";
import { TonalAccordion } from "@registry/tonal/accordion";
import { EditorialHero } from "@registry/tonal/blocks/editorial-hero";
import { CodePreviewCard } from "@/components/code-preview-card";
import type { RegistrySourceMap } from "@/lib/registry-source";
import { cn } from "@/lib/utils";

type GalleryCategory = "all" | "primitives" | "blocks" | "tokens";

const DEFAULT_ORIGIN = "http://localhost:3456";

const DEMO_SITES = [
  {
    href: "/demos/hardware",
    tag: "Hardware Storefront",
    title: "Lumen Store",
    desc: "Google Store–style flagship site with dynamic finish backdrops, editorial bento tiles, comparison specs, and FAQ.",
    tone: "warm" as const,
    icon: Smartphone,
  },
  {
    href: "/demos/ai",
    tag: "AI Product Site",
    title: "Aura Studio",
    desc: "DeepMind / Gemini aesthetic with cool tonal surfaces, interactive capability prompt switcher, and clean 2-tier pricing.",
    tone: "cool" as const,
    icon: Sparkles,
  },
  {
    href: "/demos/workspace",
    tag: "Productivity SaaS",
    title: "Canvas Workspace",
    desc: "Google Workspace editorial landing page with live app-tab mockup previews, feature spotlights, and customer quotes.",
    tone: "mint" as const,
    icon: Layers,
  },
  {
    href: "/demos/dashboard",
    tag: "App & Analytics Console",
    title: "Pulse Dashboard",
    desc: "Google Cloud / AI Studio–style tonal app shell with KPI tiles, interactive SVG throughput chart, and filterable service table.",
    tone: "sky" as const,
    icon: Activity,
  },
];

const SWATCHES = [
  { name: "Canvas", token: "--t-bg", hex: "#FFFFFF" },
  { name: "Neutral", token: "--t-surface", hex: "#F8F9FA" },
  { name: "Porcelain", token: "--t-surface-warm", hex: "#F4F2EE" },
  { name: "Workspace", token: "--t-surface-cool", hex: "#F0F4F9" },
  { name: "Ink", token: "--t-ink", hex: "#202124" },
  { name: "Action Blue", token: "--t-blue", hex: "#1967D2" },
];

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
    label: "Ink & Accent",
    tokens: [
      { name: "--t-ink", label: "Primary Ink" },
      { name: "--t-ink-secondary", label: "Secondary Ink" },
      { name: "--t-ink-muted", label: "Muted Ink" },
      { name: "--t-blue", label: "Action Blue" },
    ],
  },
];

const CATEGORY_TABS: Array<{ id: GalleryCategory; label: string }> = [
  { id: "all", label: "All" },
  { id: "primitives", label: "Primitives" },
  { id: "blocks", label: "Blocks" },
  { id: "tokens", label: "Tokens" },
];

interface GalleryEntry {
  registryName: string;
  category: Exclude<GalleryCategory, "all">;
  title: string;
  description: string;
  fullWidth?: boolean;
  preview: React.ReactNode;
}

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

  const galleryItems: GalleryEntry[] = React.useMemo(
    () => [
      {
        registryName: "editorial-hero",
        category: "blocks",
        title: "Editorial Finish Hero",
        description:
          "Split hero with dynamic finish swatches that tint the surrounding tonal surface.",
        fullWidth: true,
        preview: <EditorialHero />,
      },
      {
        registryName: "tonal-button",
        category: "primitives",
        title: "Tonal Button",
        description:
          "Automatically adapts between GM3 pills and Google Store commerce corners.",
        preview: (
          <div className="flex flex-wrap items-center gap-3">
            <TonalButton>Primary CTA</TonalButton>
            <TonalButton variant="dark">Dark Store</TonalButton>
            <TonalButton variant="outline">Outlined</TonalButton>
            <TonalButton variant="tonal">Tonal</TonalButton>
          </div>
        ),
      },
      {
        registryName: "surface-tile",
        category: "primitives",
        title: "Surface Tiles",
        description:
          "Depth via flat tonal steps instead of muddy drop shadows.",
        preview: (
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
        ),
      },
      {
        registryName: "tonal-chip",
        category: "primitives",
        title: "Tonal Chip",
        description:
          "Soft tinted category pills and eyebrow badges for editorial sections.",
        preview: (
          <div className="flex flex-wrap items-center gap-2.5">
            <TonalChip tone="blue">New release</TonalChip>
            <TonalChip tone="mint">In stock</TonalChip>
            <TonalChip tone="warm">Porcelain</TonalChip>
            <TonalChip tone="neutral">Registry v0.1</TonalChip>
          </div>
        ),
      },
      {
        registryName: "chevron-link",
        category: "primitives",
        title: "Chevron Link",
        description:
          "Google-style quiet inline text action with subtle animated chevron.",
        preview: (
          <div className="flex flex-wrap items-center gap-6">
            <ChevronLink href="#primitives">Learn more</ChevronLink>
            <ChevronLink href="#primitives" tone="ink">
              Compare specs
            </ChevronLink>
          </div>
        ),
      },
      {
        registryName: "tonal-accordion",
        category: "primitives",
        title: "Hairline Accordion",
        description:
          "Minimal Google Store–style FAQ section with decelerating spring motion.",
        fullWidth: true,
        preview: (
          <TonalAccordion
            items={[
              {
                question: "Do I need Material Web or MUI installed?",
                answer:
                  "No. Tonal is pure React + Tailwind CSS powered by ~12 CSS variables and open-source Google Sans (SIL OFL-1.1).",
              },
              {
                question:
                  "How do I install a Tonal component in another project?",
                answer: `Run npx shadcn@latest add ${origin}/r/editorial-hero.json. You own 100% of the copied source code directly in your repository.`,
              },
              {
                question: "How does GM3 Pills vs. Store Commerce work?",
                answer:
                  "It only swaps two CSS custom properties (--t-radius-btn and --t-cta-bg) on a parent data-tonal-mode attribute.",
              },
            ]}
          />
        ),
      },
      {
        registryName: "tonal-tokens",
        category: "tokens",
        title: "Tonal Design Tokens (tokens.css)",
        description:
          "Complete live CSS custom properties for surfaces, ink hierarchy, radii, motion curves, and editorial type classes.",
        fullWidth: true,
        preview: (
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

            <div className="rounded-[var(--t-radius-sm)] border border-[var(--t-border-subtle)] bg-[var(--t-surface)] p-4 sm:p-5 flex flex-col gap-2">
              <span className="text-[11.5px] font-mono text-[var(--t-ink-muted)]">
                .t-display · .t-headline · .t-body
              </span>
              <div className="t-headline text-[22px] sm:text-[26px]">
                Editorial hierarchy without heavy elevation.
              </div>
              <p className="t-body text-[14px]">
                Switch to the <strong>Code</strong> tab above to inspect or copy
                the exact live <code>registry/tonal/tokens.css</code> file.
              </p>
            </div>
          </div>
        ),
      },
    ],
    [origin]
  );

  const categoryCounts: Record<GalleryCategory, number> = React.useMemo(
    () => ({
      all: galleryItems.length,
      primitives: galleryItems.filter((i) => i.category === "primitives")
        .length,
      blocks: galleryItems.filter((i) => i.category === "blocks").length,
      tokens: galleryItems.filter((i) => i.category === "tokens").length,
    }),
    [galleryItems]
  );

  const visibleItems =
    activeCategory === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 pt-10 sm:pt-14 flex flex-col gap-16">
      {/* Hero */}
      <section className="text-center max-w-3xl mx-auto flex flex-col items-center">
        <TonalChip tone="blue" className="mb-5">
          shadcn-compatible registry · v0.1
        </TonalChip>
        <h1 className="t-display text-[42px] sm:text-[62px] mb-5">
          The Google editorial look, minus Material bloat.
        </h1>
        <p className="t-body text-[17px] sm:text-[18px] max-w-xl mb-8">
          Tonal distills the Google Store aesthetic down to Google Sans, flat
          tonal surfaces, 24px bento tiles, and quiet controls you own directly
          in your codebase.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-7">
          <Link href="/demos/hardware">
            <TonalButton size="lg">Explore Live Demos</TonalButton>
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
            <Check className="h-4 w-4 text-[#188038] shrink-0" />
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
              Full local websites built with Tonal
            </p>
            <h2 className="t-headline text-[28px] sm:text-[34px]">
              Four real sites. One 12-token system.
            </h2>
          </div>
          <p className="text-[13.5px] text-[var(--t-ink-muted)]">
            Try toggling{" "}
            <strong className="text-[var(--t-ink)]">
              GM3 Pills / Store Commerce
            </strong>{" "}
            in the top bar.
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
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[13px] font-medium text-[var(--t-ink-muted)] mb-1">
              Foundation
            </p>
            <h2 className="t-headline text-[26px] sm:text-[32px]">
              Core tonal tokens
            </h2>
          </div>
          <span className="text-[12.5px] text-[var(--t-ink-muted)]">
            {copiedToken ? `Copied ${copiedToken}` : "Click any swatch to copy"}
          </span>
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
              Installable via shadcn CLI · Live registry source
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
            const sourceItem = sources[item.registryName];
            return (
              <CodePreviewCard
                key={item.registryName}
                title={item.title}
                description={item.description}
                registryName={item.registryName}
                code={sourceItem?.code ?? ""}
                filePath={sourceItem?.files[0]?.path}
                className={item.fullWidth ? "lg:col-span-2" : undefined}
              >
                {item.preview}
              </CodePreviewCard>
            );
          })}
        </div>
      </section>
    </div>
  );
}
