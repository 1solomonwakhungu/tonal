"use client";

import * as React from "react";
import { Sparkles } from "lucide-react";
import { SurfaceTile } from "@registry/tonal/surface-tile";
import { TonalButton } from "@registry/tonal/button";
import { TonalChip } from "@registry/tonal/chip";
import { ChevronLink } from "@registry/tonal/chevron-link";
import { CapabilityTabs } from "@registry/tonal/blocks/capability-tabs";
import { PricingGrid } from "@registry/tonal/blocks/pricing-grid";
import { useTonalToast } from "@registry/tonal/toast";

export default function AiDemoPage() {
  const { toast } = useTonalToast();

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 pt-8 flex flex-col gap-16">
      {/* Sub-header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-[var(--t-border-subtle)]">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-2 text-[19px] font-medium tracking-[-0.02em] text-[var(--t-ink)]">
            <Sparkles className="h-5 w-5 text-[var(--t-blue)]" />
            Aura
          </span>
          <TonalChip tone="blue">Demo Website 2 / 4</TonalChip>
        </div>
        <div className="flex items-center gap-5 text-[13.5px] text-[var(--t-ink-muted)]">
          <a href="#capabilities" className="hover:text-[var(--t-ink)]">
            Capabilities
          </a>
          <a href="#pricing" className="hover:text-[var(--t-ink)]">
            Pricing
          </a>
          <TonalButton
            size="sm"
            onClick={() =>
              toast({
                title: "Aura 2.5 Studio ready",
                description: "Explore the interactive capability switcher below.",
                tone: "info",
              })
            }
          >
            Try Aura
          </TonalButton>
        </div>
      </div>

      {/* Centered Calm AI Studio Hero */}
      <section className="text-center max-w-3xl mx-auto flex flex-col items-center pt-4">
        <TonalChip tone="blue" className="mb-5">
          Introducing Aura 2.5
        </TonalChip>
        <h1 className="t-display text-[42px] sm:text-[64px] mb-5">
          Intelligence that stays out of your way.
        </h1>
        <p className="t-body text-[17px] sm:text-[18px] max-w-xl mb-8">
          A calm AI assistant built for deep writing, clean code, and long
          documents — designed with breathable white space and zero clutter.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#capabilities"
            className="inline-flex items-center justify-center gap-2 font-medium leading-none tracking-[-0.01em] px-7 py-3.5 text-[15px] rounded-[var(--t-radius-btn)] bg-[var(--t-cta-bg)] text-[var(--t-cta-fg,#ffffff)] hover:bg-[var(--t-cta-hover)] transition-all duration-200 [transition-timing-function:var(--t-ease)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--t-blue)]"
          >
            Start free
          </a>
          <ChevronLink href="#pricing">See plans &amp; limits</ChevronLink>
        </div>
      </section>

      {/* Dogfooded CapabilityTabs Registry Block */}
      <section id="capabilities">
        <CapabilityTabs />
      </section>

      {/* 3-Column Bento Highlights */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <SurfaceTile tone="neutral">
          <div className="text-[36px] font-medium tracking-[-0.03em] text-[var(--t-ink)] mb-2">
            2M
          </div>
          <h2 className="t-headline text-[20px] mb-2">Long context memory</h2>
          <p className="t-body text-[14px]">
            Drop entire codebases, PDFs, or product specs into one thread
            without losing the plot.
          </p>
        </SurfaceTile>

        <SurfaceTile tone="warm">
          <div className="text-[36px] font-medium tracking-[-0.03em] text-[var(--t-ink)] mb-2">
            0.4s
          </div>
          <h2 className="t-headline text-[20px] mb-2">Instant first token</h2>
          <p className="t-body text-[14px]">
            Optimized for fluid back-and-forth thinking so responses arrive
            before your focus breaks.
          </p>
        </SurfaceTile>

        <SurfaceTile tone="sky">
          <div className="text-[36px] font-medium tracking-[-0.03em] text-[var(--t-blue-hover)] mb-2">
            Private
          </div>
          <h2 className="t-headline text-[20px] mb-2">Yours by default</h2>
          <p className="t-body text-[14px]">
            Enterprise-grade encryption and clear retention controls built in
            from day one.
          </p>
        </SurfaceTile>
      </section>

      {/* Dogfooded PricingGrid Registry Block */}
      <div id="pricing">
        <PricingGrid
          onSelectTier={(tier) =>
            toast({
              title: `Selected ${tier.name}`,
              description: `${tier.price} ${tier.period ?? ""} — demo plan action triggered.`,
              tone: "success",
            })
          }
        />
      </div>
    </div>
  );
}
