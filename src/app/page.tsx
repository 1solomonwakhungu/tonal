"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Copy, Sparkles, Layers, Smartphone, Activity } from "lucide-react";
import { TonalButton } from "@registry/tonal/button";
import { SurfaceTile } from "@registry/tonal/surface-tile";
import { TonalChip } from "@registry/tonal/chip";
import { ChevronLink } from "@registry/tonal/chevron-link";
import { TonalAccordion } from "@registry/tonal/accordion";
import { EditorialHero } from "@registry/tonal/blocks/editorial-hero";
import { CodePreviewCard } from "@/components/code-preview-card";

const DEMO_SITES = [
  {
    href: "/demos/hardware",
    tag: "Hardware Storefront",
    title: "Lumen Store",
    desc: "Google Store–style flagship site with dynamic finish backdrops, editorial bento tiles, comparison specs, and FAQ.",
    tone: "warm" as const,
    icon: Smartphone,
    accent: "#1967D2",
  },
  {
    href: "/demos/ai",
    tag: "AI Product Site",
    title: "Aura Studio",
    desc: "DeepMind / Gemini aesthetic with cool #F0F4F9 surfaces, interactive capability prompt switcher, and clean 2-tier pricing.",
    tone: "cool" as const,
    icon: Sparkles,
    accent: "#1967D2",
  },
  {
    href: "/demos/workspace",
    tag: "Productivity SaaS",
    title: "Canvas Workspace",
    desc: "Google Workspace editorial landing page with live app-tab mockup previews, feature spotlights, and customer quotes.",
    tone: "mint" as const,
    icon: Layers,
    accent: "#188038",
  },
  {
    href: "/demos/dashboard",
    tag: "App & Analytics Console",
    title: "Pulse Dashboard",
    desc: "Google Cloud / AI Studio–style tonal app shell with KPI tiles, interactive SVG throughput chart, and filterable service table.",
    tone: "sky" as const,
    icon: Activity,
    accent: "#1967D2",
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

export default function HomePage() {
  const [copiedInstall, setCopiedInstall] = React.useState(false);
  const [copiedHex, setCopiedHex] = React.useState<string | null>(null);

  const installCmd =
    "npx shadcn@latest add http://localhost:3456/r/editorial-hero.json";

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
            navigator.clipboard?.writeText(installCmd).catch(() => {});
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

      {/* 3 Full Local Websites */}
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
            Try toggling <strong>GM3 Pills / Store Commerce</strong> in the top bar.
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
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-[var(--t-ink)] border border-black/[0.06]">
                        <Icon className="h-5 w-5" />
                      </span>
                      <ArrowUpRight className="h-5 w-5 text-[var(--t-ink-muted)] group-hover:text-[var(--t-ink)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                    <p className="text-[12px] font-medium text-[var(--t-ink-muted)] mb-1.5">
                      {site.tag}
                    </p>
                    <h3 className="t-headline text-[24px] mb-2">{site.title}</h3>
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
            {copiedHex ? `Copied ${copiedHex}` : "Click any swatch to copy"}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3.5">
          {SWATCHES.map((s) => (
            <button
              key={s.token}
              type="button"
              onClick={() => {
                navigator.clipboard?.writeText(s.hex).catch(() => {});
                setCopiedHex(s.hex);
                setTimeout(() => setCopiedHex(null), 1500);
              }}
              className="text-left rounded-[16px] border border-[var(--t-border-subtle)] bg-white p-3 cursor-pointer hover:border-[var(--t-blue)] transition-colors"
            >
              <div
                style={{ backgroundColor: s.hex }}
                className="h-12 rounded-[10px] border border-black/[0.08] mb-2.5"
              />
              <div className="text-[13px] font-medium text-[var(--t-ink)]">
                {s.name}
              </div>
              <div className="text-[11.5px] font-mono text-[var(--t-ink-muted)]">
                {s.hex}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Interactive Registry Components */}
      <section id="primitives" className="flex flex-col gap-6">
        <div>
          <p className="text-[13px] font-medium text-[var(--t-ink-muted)] mb-1">
            Installable via shadcn CLI
          </p>
          <h2 className="t-headline text-[28px] sm:text-[34px]">
            Primitives &amp; Editorial Blocks
          </h2>
        </div>

        <CodePreviewCard
          title="Editorial Finish Hero"
          description="Split hero with dynamic finish swatches that tint the surrounding tonal surface."
          registryName="editorial-hero"
          code={`import { EditorialHero } from "@/components/tonal/editorial-hero";

export function Page() {
  return (
    <EditorialHero
      eyebrow="New · Lumen 10 Pro"
      headline="Designed to get out of the way."
      ctaLabel="Buy from $999"
    />
  );
}`}
        >
          <EditorialHero />
        </CodePreviewCard>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CodePreviewCard
            title="Tonal Buttons & Quiet Controls"
            description="Automatically adapts between GM3 pills and Google Store commerce corners."
            registryName="tonal-button"
            code={`import { TonalButton } from "@/components/ui/tonal-button";
import { TonalChip } from "@/components/ui/tonal-chip";
import { ChevronLink } from "@/components/ui/chevron-link";

export function Controls() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <TonalButton>Primary CTA</TonalButton>
      <TonalButton variant="dark">Dark Store</TonalButton>
      <TonalButton variant="outline">Outlined</TonalButton>
      <TonalButton variant="tonal">Tonal</TonalButton>
      <TonalChip tone="mint">In stock</TonalChip>
      <ChevronLink href="#">Learn more</ChevronLink>
    </div>
  );
}`}
          >
            <div className="flex flex-wrap items-center gap-3">
              <TonalButton>Primary CTA</TonalButton>
              <TonalButton variant="dark">Dark Store</TonalButton>
              <TonalButton variant="outline">Outlined</TonalButton>
              <TonalButton variant="tonal">Tonal</TonalButton>
              <TonalChip tone="mint">In stock</TonalChip>
              <ChevronLink href="#primitives">Learn more</ChevronLink>
            </div>
          </CodePreviewCard>

          <CodePreviewCard
            title="Surface Tiles"
            description="Depth via flat tonal steps instead of muddy drop shadows."
            registryName="surface-tile"
            code={`import { SurfaceTile } from "@/components/ui/surface-tile";

export function Tiles() {
  return (
    <div className="grid grid-cols-3 gap-3">
      <SurfaceTile tone="warm" padding="sm">Porcelain</SurfaceTile>
      <SurfaceTile tone="cool" padding="sm">Workspace</SurfaceTile>
      <SurfaceTile tone="mint" padding="sm">Aloe</SurfaceTile>
    </div>
  );
}`}
          >
            <div className="grid grid-cols-3 gap-3">
              <SurfaceTile tone="warm" padding="sm">
                <div className="text-[13px] font-medium">Porcelain</div>
                <div className="text-[11px] font-mono text-[var(--t-ink-muted)]">
                  #F4F2EE
                </div>
              </SurfaceTile>
              <SurfaceTile tone="cool" padding="sm">
                <div className="text-[13px] font-medium">Workspace</div>
                <div className="text-[11px] font-mono text-[var(--t-ink-muted)]">
                  #F0F4F9
                </div>
              </SurfaceTile>
              <SurfaceTile tone="mint" padding="sm">
                <div className="text-[13px] font-medium">Aloe</div>
                <div className="text-[11px] font-mono text-[var(--t-ink-muted)]">
                  #E6F4EA
                </div>
              </SurfaceTile>
            </div>
          </CodePreviewCard>
        </div>

        <CodePreviewCard
          title="Hairline Accordion"
          description="Minimal Google Store–style FAQ section with decelerating spring motion."
          registryName="tonal-accordion"
          code={`import { TonalAccordion } from "@/components/ui/tonal-accordion";

export function Faq() {
  return (
    <TonalAccordion
      items={[
        {
          question: "Do I need Material Web installed?",
          answer: "No. Tonal runs on pure Tailwind CSS and ~12 CSS variables.",
        },
      ]}
    />
  );
}`}
        >
          <TonalAccordion
            items={[
              {
                question: "Do I need Material Web or MUI installed?",
                answer:
                  "No. Tonal is pure React + Tailwind CSS powered by ~12 CSS variables and open-source Google Sans (SIL OFL-1.1).",
              },
              {
                question: "How do I install a Tonal component in another project?",
                answer:
                  "Run npx shadcn@latest add http://localhost:3456/r/editorial-hero.json (or deploy Tonal to Vercel and point to your public URL). You own 100% of the copied code.",
              },
              {
                question: "How does GM3 Pills vs. Store Commerce work?",
                answer:
                  "It only swaps two CSS custom properties (--t-radius-btn and --t-cta-bg) on a parent data-tonal-mode attribute.",
              },
            ]}
          />
        </CodePreviewCard>
      </section>
    </div>
  );
}
