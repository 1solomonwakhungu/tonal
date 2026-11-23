"use client";

import * as React from "react";
import { Check, Code2, FileText, Sparkles, Compass } from "lucide-react";
import { SurfaceTile } from "@registry/tonal/surface-tile";
import { TonalButton } from "@registry/tonal/button";
import { TonalChip } from "@registry/tonal/chip";
import { ChevronLink } from "@registry/tonal/chevron-link";

const CAPABILITIES = [
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

export default function AiDemoPage() {
  const [activeCap, setActiveCap] = React.useState(CAPABILITIES[0]);

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 pt-8 flex flex-col gap-16">
      {/* Sub-header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-[var(--t-border-subtle)]">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-2 text-[19px] font-medium tracking-[-0.02em] text-[var(--t-ink)]">
            <Sparkles className="h-5 w-5 text-[var(--t-blue)]" />
            Aura
          </span>
          <TonalChip tone="blue">Demo Website 2 / 3</TonalChip>
        </div>
        <div className="flex items-center gap-5 text-[13.5px] text-[var(--t-ink-muted)]">
          <a href="#capabilities" className="hover:text-[var(--t-ink)]">
            Capabilities
          </a>
          <a href="#pricing" className="hover:text-[var(--t-ink)]">
            Pricing
          </a>
          <TonalButton size="sm">Try Aura</TonalButton>
        </div>
      </div>

      {/* Centered Gemini / DeepMind Hero */}
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
          <TonalButton size="lg">Start free</TonalButton>
          <ChevronLink href="#pricing">See plans &amp; limits</ChevronLink>
        </div>
      </section>

      {/* Interactive Capability Stage */}
      <section id="capabilities">
        <SurfaceTile tone="cool" padding="lg" className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex flex-wrap gap-2">
              {CAPABILITIES.map((cap) => {
                const Icon = cap.icon;
                const active = cap.id === activeCap.id;
                return (
                  <button
                    key={cap.id}
                    type="button"
                    onClick={() => setActiveCap(cap)}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13.5px] font-medium cursor-pointer transition-all duration-200 ${
                      active
                        ? "bg-[var(--t-ink)] text-white"
                        : "bg-white text-[var(--t-ink-secondary)] hover:bg-[#e8f0fe]"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {cap.label}
                  </button>
                );
              })}
            </div>
            <span className="text-[12.5px] font-mono text-[var(--t-ink-muted)]">
              {activeCap.meta}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            <div className="md:col-span-5 rounded-[20px] bg-white p-6 border border-black/[0.05] flex flex-col justify-between gap-4">
              <div>
                <div className="text-[11.5px] font-medium uppercase tracking-wider text-[var(--t-ink-muted)] mb-2">
                  Prompt
                </div>
                <p className="text-[17px] font-medium tracking-[-0.015em] text-[var(--t-ink)] leading-[1.4]">
                  “{activeCap.prompt}”
                </p>
              </div>
              <div className="text-[12px] text-[var(--t-ink-muted)]">
                Context window · 2M tokens
              </div>
            </div>

            <div className="md:col-span-7 rounded-[20px] bg-white p-6 border border-black/[0.05] flex flex-col justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-[11.5px] font-medium uppercase tracking-wider text-[var(--t-blue)] mb-2">
                  <Sparkles className="h-3.5 w-3.5" />
                  Aura Response
                </div>
                <p className="text-[15.5px] leading-[1.65] text-[var(--t-ink-secondary)] whitespace-pre-line">
                  {activeCap.response}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <TonalChip tone="mint">Grounded</TonalChip>
                <TonalChip tone="neutral">No training on your data</TonalChip>
              </div>
            </div>
          </div>
        </SurfaceTile>
      </section>

      {/* 3-Column Bento Highlights */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <SurfaceTile tone="neutral">
          <div className="text-[36px] font-medium tracking-[-0.03em] text-[var(--t-ink)] mb-2">
            2M
          </div>
          <h3 className="t-headline text-[20px] mb-2">Long context memory</h3>
          <p className="t-body text-[14px]">
            Drop entire codebases, PDFs, or product specs into one thread
            without losing the plot.
          </p>
        </SurfaceTile>

        <SurfaceTile tone="warm">
          <div className="text-[36px] font-medium tracking-[-0.03em] text-[var(--t-ink)] mb-2">
            0.4s
          </div>
          <h3 className="t-headline text-[20px] mb-2">Instant first token</h3>
          <p className="t-body text-[14px]">
            Optimized for fluid back-and-forth thinking so responses arrive
            before your focus breaks.
          </p>
        </SurfaceTile>

        <SurfaceTile tone="sky">
          <div className="text-[36px] font-medium tracking-[-0.03em] text-[var(--t-blue-hover)] mb-2">
            Private
          </div>
          <h3 className="t-headline text-[20px] mb-2">Yours by default</h3>
          <p className="t-body text-[14px]">
            Enterprise-grade encryption and clear retention controls built in
            from day one.
          </p>
        </SurfaceTile>
      </section>

      {/* Clean 2-Tier Pricing */}
      <section id="pricing" className="max-w-4xl mx-auto w-full flex flex-col gap-6">
        <div className="text-center">
          <p className="text-[13px] font-medium text-[var(--t-ink-muted)] mb-1">
            Simple plans
          </p>
          <h2 className="t-headline text-[30px] sm:text-[38px]">
            Start free. Upgrade when you need more.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SurfaceTile tone="white" bordered padding="lg" className="flex flex-col justify-between gap-8">
            <div>
              <h3 className="t-headline text-[24px] mb-1">Aura</h3>
              <p className="t-body text-[14px] mb-5">
                Everyday writing, research, and coding help.
              </p>
              <div className="text-[40px] font-medium tracking-[-0.035em] mb-6">
                $0<span className="text-[15px] font-normal text-[var(--t-ink-muted)]"> / month</span>
              </div>
              <ul className="flex flex-col gap-3 text-[14px] text-[var(--t-ink-secondary)]">
                {[
                  "Access to Aura Fast model",
                  "Upload documents and images",
                  "Sync across web and mobile",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-[var(--t-blue)] shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <TonalButton variant="outline" className="w-full">
              Get started free
            </TonalButton>
          </SurfaceTile>

          <SurfaceTile tone="cool" padding="lg" className="flex flex-col justify-between gap-8">
            <div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="t-headline text-[24px]">Aura Pro</h3>
                <TonalChip tone="blue">Recommended</TonalChip>
              </div>
              <p className="t-body text-[14px] mb-5">
                Our flagship reasoning model with 2M context.
              </p>
              <div className="text-[40px] font-medium tracking-[-0.035em] mb-6">
                $20<span className="text-[15px] font-normal text-[var(--t-ink-muted)]"> / month</span>
              </div>
              <ul className="flex flex-col gap-3 text-[14px] text-[var(--t-ink-secondary)]">
                {[
                  "Aura 2.5 Pro with deep reasoning",
                  "2 million token context window",
                  "Priority throughput & API credits",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-[var(--t-blue)] shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <TonalButton className="w-full">Upgrade to Pro</TonalButton>
          </SurfaceTile>
        </div>
      </section>
    </div>
  );
}
