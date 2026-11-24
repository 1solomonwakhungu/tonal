"use client";

import * as React from "react";
import { FileText, Table2, Presentation, Video } from "lucide-react";
import { SurfaceTile, type SurfaceTone } from "@registry/tonal/surface-tile";
import { TonalButton } from "@registry/tonal/button";
import { TonalChip } from "@registry/tonal/chip";
import { ChevronLink } from "@registry/tonal/chevron-link";
import { TonalSegmentedControl } from "@registry/tonal/segmented-control";
import { TonalDialog } from "@registry/tonal/dialog";
import { TonalInput } from "@registry/tonal/input";
import { useTonalToast } from "@registry/tonal/toast";

const APPS: Array<{
  id: "docs" | "sheets" | "slides" | "meet";
  name: string;
  color: string;
  tint: string;
  surfaceTone: SurfaceTone;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  title: string;
  subtitle: string;
  rows: string[];
}> = [
  {
    id: "docs",
    name: "Docs",
    color: "var(--t-blue)",
    tint: "var(--t-surface-sky)",
    surfaceTone: "sky",
    icon: FileText,
    title: "Q4 Product Launch Brief",
    subtitle: "Edited just now · 4 collaborators online",
    rows: [
      "Goal: Ship a calm, unified component system across web storefronts.",
      "Design rule: Flat tonal cards, 24px corners, and Google Sans 500.",
      "Timeline: Registry live Monday, v0.2 interactive primitives by Friday.",
    ],
  },
  {
    id: "sheets",
    name: "Sheets",
    color: "var(--t-chip-mint-fg)",
    tint: "var(--t-surface-mint)",
    surfaceTone: "mint",
    icon: Table2,
    title: "Q4 Launch Tracker",
    subtitle: "Live metrics · Synced automatically",
    rows: [
      "Homepage Conversion · 4.8% (+1.2% vs baseline)",
      "Lighthouse Performance · 99 / 100 across mobile & desktop",
      "Registry Installs · 1,420 projects this week",
    ],
  },
  {
    id: "slides",
    name: "Slides",
    color: "var(--t-warning,#9c5300)",
    tint: "var(--t-surface-sand)",
    surfaceTone: "sand",
    icon: Presentation,
    title: "Design Review Deck",
    subtitle: "12 clean slides · Ready to present",
    rows: [
      "Slide 01 — Why flat tonal surfaces beat heavy drop shadows",
      "Slide 02 — Tight -0.03em tracking on display typography",
      "Slide 03 — Live demo of Soft Pill vs. Commerce",
    ],
  },
  {
    id: "meet",
    name: "Meet",
    color: "var(--t-blue)",
    tint: "var(--t-surface-cool)",
    surfaceTone: "cool",
    icon: Video,
    title: "Design Critique · Studio Room",
    subtitle: "HD video · Real-time captions enabled",
    rows: [
      "Participants: Maya, Jordan, Alex, and Sam",
      "Auto-summary: Approved Porcelain & Bay surface palette",
      "Next action: Publish /r/registry.json to production",
    ],
  },
];

type AppId = (typeof APPS)[number]["id"];

export default function WorkspaceDemoPage() {
  const { toast } = useTonalToast();
  const [selectedId, setSelectedId] = React.useState<AppId>("docs");
  const [shareOpen, setShareOpen] = React.useState(false);
  const [inviteEmail, setInviteEmail] = React.useState("");

  const selected = APPS.find((a) => a.id === selectedId) ?? APPS[0];

  const handleShareSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;
    toast({
      title: `Shared "${selected.title}"`,
      description: `Invite sent to ${inviteEmail.trim()}.`,
      tone: "success",
    });
    setInviteEmail("");
    setShareOpen(false);
  };

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 pt-8 flex flex-col gap-16">
      {/* Sub-header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-[var(--t-border-subtle)]">
        <div className="flex items-center gap-3">
          <span className="text-[19px] font-medium tracking-[-0.02em] text-[var(--t-ink)]">
            Canvas Workspace
          </span>
          <TonalChip tone="mint">Demo Website 3 / 4</TonalChip>
        </div>
        <div className="flex items-center gap-3">
          <TonalButton
            variant="ghost"
            size="sm"
            onClick={() =>
              toast({
                title: "Sign in",
                description: "SSO and passkey sign-in preview.",
                tone: "info",
              })
            }
          >
            Sign in
          </TonalButton>
          <TonalButton
            size="sm"
            onClick={() =>
              toast({
                title: "14-day free trial ready",
                description: "Create a Canvas workspace in under 30 seconds.",
                tone: "success",
              })
            }
          >
            Start free trial
          </TonalButton>
        </div>
      </div>

      {/* Centered Hero + Interactive App Stage */}
      <section className="flex flex-col items-center text-center gap-8">
        <div className="max-w-2xl">
          <h1 className="t-display text-[40px] sm:text-[58px] mb-4">
            How modern teams get meaningful work done.
          </h1>
          <p className="t-body text-[17px] mb-7">
            Docs, sheets, slides, and meetings in one calm, browser-native suite
            — built with crisp visual hierarchy so your work stays in focus.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <TonalButton
              size="lg"
              onClick={() =>
                toast({
                  title: "Workspace trial started",
                  description: "Explore Docs, Sheets, Slides, and Meet below.",
                  tone: "success",
                })
              }
            >
              Get started free
            </TonalButton>
            <TonalButton
              variant="outline"
              size="lg"
              onClick={() =>
                toast({
                  title: "Sales inquiry received",
                  description: "Our enterprise team responds within 1 business day.",
                  tone: "info",
                })
              }
            >
              Contact sales
            </TonalButton>
          </div>
        </div>

        {/* Dogfooded TonalSegmentedControl */}
        <TonalSegmentedControl
          ariaLabel="Workspace app preview"
          value={selectedId}
          onValueChange={setSelectedId}
          options={APPS.map((app) => ({
            value: app.id,
            label: app.name,
            icon: app.icon,
          }))}
        />

        {/* Clean Browser Stage */}
        <SurfaceTile
          tone={selected.surfaceTone}
          padding="lg"
          className="w-full text-left"
        >
          <div className="rounded-[20px] bg-[var(--t-bg)] border border-[var(--t-border-subtle)] overflow-hidden">
            <div className="px-6 py-4 border-b border-[var(--t-border-subtle)] flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-9 w-9 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: selected.tint }}
                >
                  <selected.icon
                    className="h-4 w-4"
                    style={{ color: selected.color }}
                  />
                </span>
                <div>
                  <div className="text-[15px] font-medium text-[var(--t-ink)]">
                    {selected.title}
                  </div>
                  <div className="text-[12px] text-[var(--t-ink-muted)]">
                    {selected.subtitle}
                  </div>
                </div>
              </div>
              <TonalButton
                size="sm"
                variant="tonal"
                onClick={() => setShareOpen(true)}
              >
                Share
              </TonalButton>
            </div>

            <div className="p-6 flex flex-col gap-3">
              {selected.rows.map((line, i) => (
                <div
                  key={line}
                  className="rounded-[14px] bg-[var(--t-surface)] px-4 py-3.5 text-[14.5px] text-[var(--t-ink-secondary)] flex items-center gap-3"
                >
                  <span className="text-[11.5px] font-mono text-[var(--t-ink-muted)]">
                    0{i + 1}
                  </span>
                  <span>{line}</span>
                </div>
              ))}
            </div>
          </div>
        </SurfaceTile>
      </section>

      {/* Customer Quote Bento */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <SurfaceTile
          tone="warm"
          padding="lg"
          className="md:col-span-7 flex flex-col justify-between gap-6"
        >
          <blockquote className="t-headline text-[24px] sm:text-[28px] leading-[1.25]">
            “Switching to Canvas cut our weekly status meetings in half. The
            interface feels so quiet that everyone actually reads the doc.”
          </blockquote>
          <div className="text-[13.5px] text-[var(--t-ink-muted)]">
            <strong className="font-medium text-[var(--t-ink)]">
              Elena Park
            </strong>{" "}
            · VP of Product, Northstar Labs
          </div>
        </SurfaceTile>

        <SurfaceTile
          tone="cool"
          padding="lg"
          className="md:col-span-5 flex flex-col justify-between gap-6"
        >
          <div>
            <p className="text-[13px] font-medium text-[var(--t-ink-muted)] mb-2">
              Enterprise Ready
            </p>
            <h2 className="t-headline text-[24px] mb-2">
              99.9% uptime SLA included.
            </h2>
            <p className="t-body text-[14px]">
              Zero-trust SSO, audit logs, and granular sharing rules without
              complex admin setup.
            </p>
          </div>
          <ChevronLink href="/">Back to Tonal Registry</ChevronLink>
        </SurfaceTile>
      </section>

      {/* Share Dialog */}
      <TonalDialog
        open={shareOpen}
        onOpenChange={setShareOpen}
        title={`Share ${selected.title}`}
        description="Invite teammates with edit or view access."
      >
        <form onSubmit={handleShareSubmit} className="flex flex-col gap-4">
          <TonalInput
            label="Teammate email"
            type="email"
            required
            data-autofocus
            placeholder="maya@northstar.dev"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
          />
          <div className="flex justify-end gap-2 pt-2">
            <TonalButton
              type="button"
              variant="ghost"
              onClick={() => setShareOpen(false)}
            >
              Cancel
            </TonalButton>
            <TonalButton type="submit">Send invite</TonalButton>
          </div>
        </form>
      </TonalDialog>
    </div>
  );
}
