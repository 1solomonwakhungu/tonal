"use client";

import * as React from "react";
import { EditorialHero } from "@registry/tonal/blocks/editorial-hero";
import { SurfaceTile } from "@registry/tonal/surface-tile";
import { TonalButton } from "@registry/tonal/button";
import { TonalChip } from "@registry/tonal/chip";
import { ChevronLink } from "@registry/tonal/chevron-link";
import { TonalAccordion } from "@registry/tonal/accordion";

const PRODUCTS = [
  {
    name: "Lumen 10",
    tagline: "Everyday flagship.",
    price: "From $799",
    tone: "neutral" as const,
    shape: "phone",
    badge: "Popular",
  },
  {
    name: "Lumen Watch 4",
    tagline: "Sculpted glass. Precision health.",
    price: "From $349",
    tone: "cool" as const,
    shape: "watch",
    badge: "New",
  },
  {
    name: "Lumen Buds Pro",
    tagline: "Studio-quiet active noise cancelation.",
    price: "$229",
    tone: "warm" as const,
    shape: "buds",
    badge: "Updated",
  },
];

const SPECS = [
  { label: "Display", pro: '6.7" Super Actua OLED · 1–120Hz', base: '6.3" Actua OLED · 60–120Hz' },
  { label: "Camera", pro: "Triple Pro · 50MP + 48MP + 5x Tele", base: "Dual Advanced · 50MP + 48MP" },
  { label: "Chip", pro: "Lumen Silicon G5 · 16 GB RAM", base: "Lumen Silicon G5 · 12 GB RAM" },
  { label: "Battery", pro: "Up to 32 hours · 45W fast charge", base: "Up to 28 hours · 35W fast charge" },
  { label: "Materials", pro: "Matte satin glass · Recycled aluminum", base: "Polished glass · Recycled aluminum" },
];

export default function HardwareDemoPage() {
  const [cartCount, setCartCount] = React.useState(0);

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 pt-8 flex flex-col gap-16">
      {/* Sub-header simulating a dedicated Storefront */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-[var(--t-border-subtle)]">
        <div className="flex items-center gap-3">
          <span className="text-[19px] font-medium tracking-[-0.02em] text-[var(--t-ink)]">
            Lumen Store
          </span>
          <TonalChip tone="neutral">Demo Website 1 / 3</TonalChip>
        </div>
        <div className="flex items-center gap-4 text-[13.5px] text-[var(--t-ink-muted)]">
          <a href="#lineup" className="hover:text-[var(--t-ink)]">
            Lineup
          </a>
          <a href="#specs" className="hover:text-[var(--t-ink)]">
            Compare
          </a>
          <a href="#faq" className="hover:text-[var(--t-ink)]">
            FAQ
          </a>
          <span className="rounded-full bg-[var(--t-surface)] px-3 py-1 text-[12.5px] font-medium text-[var(--t-ink)]">
            Bag ({cartCount})
          </span>
        </div>
      </div>

      {/* Hero with interactive finish switcher */}
      <EditorialHero
        eyebrow="New · Lumen 10 Pro"
        headline="Engineered for calm."
        subtitle="Sculpted matte glass in Porcelain, Bay, Aloe, and Obsidian. Tap any finish below to see the surface adapt."
        ctaLabel="Buy from $999"
        secondaryLabel="Compare specs"
      />

      {/* 2-Column Editorial Bento */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SurfaceTile tone="cool" padding="lg" className="flex flex-col justify-between gap-10">
          <div>
            <p className="text-[13px] font-medium text-[var(--t-ink-muted)] mb-2">
              Pro Camera System
            </p>
            <h2 className="t-headline text-[30px] sm:text-[34px] mb-3">
              True-to-life color in any light.
            </h2>
            <p className="t-body text-[15px] max-w-md">
              A redesigned 5x optical telephoto lens captures crisp detail at
              dusk without over-sharpening or artificial HDR glow.
            </p>
          </div>
          <div className="rounded-[20px] bg-white p-5 border border-black/[0.06] flex items-center justify-between">
            <div>
              <div className="text-[12px] text-[var(--t-ink-muted)]">Optical Zoom</div>
              <div className="text-[28px] font-medium tracking-[-0.03em]">5× / 30×</div>
            </div>
            <div className="h-12 w-px bg-[var(--t-border-subtle)]" />
            <div>
              <div className="text-[12px] text-[var(--t-ink-muted)]">Main Sensor</div>
              <div className="text-[28px] font-medium tracking-[-0.03em]">50 MP</div>
            </div>
            <div className="h-12 w-px bg-[var(--t-border-subtle)]" />
            <div>
              <div className="text-[12px] text-[var(--t-ink-muted)]">Aperture</div>
              <div className="text-[28px] font-medium tracking-[-0.03em]">ƒ/1.68</div>
            </div>
          </div>
        </SurfaceTile>

        <SurfaceTile tone="mint" padding="lg" className="flex flex-col justify-between gap-10">
          <div>
            <p className="text-[13px] font-medium text-[#137333] mb-2">
              All-Day Battery
            </p>
            <h2 className="t-headline text-[30px] sm:text-[34px] mb-3">
              Charges fast. Lasts past tomorrow.
            </h2>
            <p className="t-body text-[15px] max-w-md">
              Adaptive power learns your routine and keeps background tasks
              whisper-quiet so you end the night with energy to spare.
            </p>
          </div>
          <div className="rounded-[20px] bg-white p-5 border border-black/[0.06] flex flex-col gap-3">
            <div className="flex items-center justify-between text-[13px]">
              <span className="font-medium text-[var(--t-ink)]">Typical mixed use</span>
              <span className="font-medium text-[#137333]">32 hrs</span>
            </div>
            <div className="h-2.5 w-full rounded-full bg-[#e6f4ea] overflow-hidden">
              <div className="h-full w-[84%] rounded-full bg-[#188038]" />
            </div>
            <div className="text-[12px] text-[var(--t-ink-muted)]">
              Up to 70% charge in 30 minutes with 45W USB-C charger.
            </div>
          </div>
        </SurfaceTile>
      </section>

      {/* 3-Up Product Lineup */}
      <section id="lineup" className="flex flex-col gap-6">
        <div className="text-center max-w-xl mx-auto">
          <p className="text-[13px] font-medium text-[var(--t-ink-muted)] mb-1">
            The Lumen Ecosystem
          </p>
          <h2 className="t-headline text-[30px] sm:text-[38px]">
            Everything works effortlessly together.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRODUCTS.map((p) => (
            <SurfaceTile
              key={p.name}
              tone={p.tone}
              className="flex flex-col items-center text-center justify-between gap-6"
            >
              <div className="flex flex-col items-center">
                <TonalChip tone="neutral" className="mb-4 bg-white">
                  {p.badge}
                </TonalChip>
                <h3 className="t-headline text-[24px] mb-1.5">{p.name}</h3>
                <p className="t-body text-[14px] mb-1">{p.tagline}</p>
                <p className="text-[14px] font-medium text-[var(--t-ink)]">
                  {p.price}
                </p>
              </div>

              {/* Clean geometric hardware silhouette */}
              <div className="h-36 flex items-center justify-center">
                {p.shape === "phone" && (
                  <div className="w-20 h-32 rounded-[18px] bg-white border border-black/10 shadow-[0_14px_26px_-14px_rgba(32,33,36,0.22)] pt-4 px-2.5">
                    <div className="w-full h-4 rounded-full bg-[#202124]" />
                  </div>
                )}
                {p.shape === "watch" && (
                  <div className="relative flex flex-col items-center">
                    <div className="w-9 h-7 rounded-t-lg bg-[#d2e3fc]" />
                    <div className="w-20 h-20 rounded-full bg-[#202124] border-4 border-[#e8eaed] shadow-[0_12px_24px_-12px_rgba(32,33,36,0.3)] flex items-center justify-center text-white text-[14px] font-medium">
                      10:09
                    </div>
                    <div className="w-9 h-7 rounded-b-lg bg-[#d2e3fc]" />
                  </div>
                )}
                {p.shape === "buds" && (
                  <div className="w-24 h-28 rounded-[999px] bg-white border border-black/10 shadow-[0_14px_26px_-14px_rgba(32,33,36,0.2)] flex flex-col items-center pt-7">
                    <div className="w-16 h-px bg-[var(--t-border)] mb-3" />
                    <div className="w-2 h-2 rounded-full bg-[#34a853]" />
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4">
                <TonalButton
                  size="sm"
                  onClick={() => setCartCount((c) => c + 1)}
                >
                  Add to bag
                </TonalButton>
                <ChevronLink href="#specs">Specs</ChevronLink>
              </div>
            </SurfaceTile>
          ))}
        </div>
      </section>

      {/* Clean Hairline Comparison Table */}
      <section id="specs" className="flex flex-col gap-6">
        <h2 className="t-headline text-[28px] sm:text-[34px]">
          Compare Lumen 10 models
        </h2>
        <div className="rounded-[var(--t-radius-card)] border border-[var(--t-border-subtle)] overflow-hidden bg-white">
          <div className="grid grid-cols-12 bg-[var(--t-surface)] px-6 py-4 text-[13px] font-medium text-[var(--t-ink-muted)] border-b border-[var(--t-border-subtle)]">
            <div className="col-span-4 sm:col-span-3">Feature</div>
            <div className="col-span-4 sm:col-span-5 text-[var(--t-ink)]">
              Lumen 10 Pro
            </div>
            <div className="col-span-4 text-[var(--t-ink)]">Lumen 10</div>
          </div>
          <div className="divide-y divide-[var(--t-border-subtle)]">
            {SPECS.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-12 px-6 py-4 text-[14px] items-center"
              >
                <div className="col-span-4 sm:col-span-3 font-medium text-[var(--t-ink-muted)]">
                  {row.label}
                </div>
                <div className="col-span-4 sm:col-span-5 text-[var(--t-ink)] pr-3">
                  {row.pro}
                </div>
                <div className="col-span-4 text-[var(--t-ink-secondary)]">
                  {row.base}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-3xl mx-auto w-full flex flex-col gap-6">
        <h2 className="t-headline text-[28px] sm:text-[34px] text-center">
          Frequently asked questions
        </h2>
        <TonalAccordion
          items={[
            {
              question: "Does Lumen 10 Pro ship unlocked?",
              answer:
                "Yes. Every phone ordered from Lumen Store arrives factory unlocked and ready for eSIM or physical SIM on major global carriers.",
            },
            {
              question: "Can I trade in my current device?",
              answer:
                "Trade-in credit is estimated upfront and refunded directly to your original payment method once your previous phone is inspected.",
            },
            {
              question: "How many years of software updates are included?",
              answer:
                "Seven years of OS upgrades, security patches, and feature drops starting from the device release date.",
            },
          ]}
        />
      </section>
    </div>
  );
}
