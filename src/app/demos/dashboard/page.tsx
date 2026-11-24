"use client";

import * as React from "react";
import {
  Activity,
  CheckCircle2,
  Clock,
  Plus,
  Sparkles,
} from "lucide-react";
import { TonalButton } from "@registry/tonal/button";
import { TonalChip } from "@registry/tonal/chip";
import { TonalDialog } from "@registry/tonal/dialog";
import { TonalInput, TonalSelect } from "@registry/tonal/input";
import { TonalSegmentedControl } from "@registry/tonal/segmented-control";
import { useTonalToast } from "@registry/tonal/toast";
import {
  DEFAULT_APP_SHELL_NAV,
  TonalAppShell,
  TonalQuotaCard,
} from "@registry/tonal/blocks/tonal-app-shell";
import { KpiGrid, type KpiMetric } from "@registry/tonal/blocks/kpi-grid";
import {
  TonalAreaChart,
  type AreaChartPoint,
} from "@registry/tonal/blocks/tonal-area-chart";
import {
  DEFAULT_TABLE_ROWS,
  TonalTable,
  type TonalTableRow,
} from "@registry/tonal/blocks/tonal-table";

type RangeKey = "7d" | "30d" | "90d";
type NavKey = "overview" | "projects" | "usage" | "billing";

interface RangeDataset {
  label: string;
  kpis: KpiMetric[];
  points: AreaChartPoint[];
}

const DATASETS: Record<RangeKey, RangeDataset> = {
  "7d": {
    label: "Last 7 days",
    kpis: [
      {
        title: "Active Users",
        value: "24,890",
        delta: "+14.2%",
        tone: "mint",
        subtitle: "vs previous 7 days",
      },
      {
        title: "API Requests",
        value: "1.84M",
        delta: "+22.6%",
        tone: "mint",
        subtitle: "99.98% success rate",
      },
      {
        title: "Median Latency",
        value: "142 ms",
        delta: "-18 ms",
        tone: "blue",
        subtitle: "p95 at 290 ms",
      },
      {
        title: "Estimated Spend",
        value: "$418",
        delta: "On track",
        tone: "neutral",
        subtitle: "of $1,200 monthly cap",
      },
    ],
    points: [
      { label: "Mon", value: 210, secondary: "158 ms median" },
      { label: "Tue", value: 248, secondary: "151 ms median" },
      { label: "Wed", value: 236, secondary: "149 ms median" },
      { label: "Thu", value: 289, secondary: "144 ms median" },
      { label: "Fri", value: 312, secondary: "138 ms median" },
      { label: "Sat", value: 264, secondary: "141 ms median" },
      { label: "Sun", value: 281, secondary: "142 ms median" },
    ],
  },
  "30d": {
    label: "Last 30 days",
    kpis: [
      {
        title: "Active Users",
        value: "96,420",
        delta: "+19.8%",
        tone: "mint",
        subtitle: "vs previous 30 days",
      },
      {
        title: "API Requests",
        value: "7.42M",
        delta: "+31.4%",
        tone: "mint",
        subtitle: "99.97% success rate",
      },
      {
        title: "Median Latency",
        value: "136 ms",
        delta: "-24 ms",
        tone: "blue",
        subtitle: "p95 at 275 ms",
      },
      {
        title: "Estimated Spend",
        value: "$1,640",
        delta: "+6.2%",
        tone: "neutral",
        subtitle: "of $2,500 monthly cap",
      },
    ],
    points: [
      { label: "W1", value: 1420, secondary: "162 ms median" },
      { label: "W2", value: 1680, secondary: "150 ms median" },
      { label: "W3", value: 1940, secondary: "141 ms median" },
      { label: "W4", value: 2380, secondary: "136 ms median" },
    ],
  },
  "90d": {
    label: "Last 90 days",
    kpis: [
      {
        title: "Active Users",
        value: "248.1K",
        delta: "+42.5%",
        tone: "mint",
        subtitle: "vs previous quarter",
      },
      {
        title: "API Requests",
        value: "21.9M",
        delta: "+54.0%",
        tone: "mint",
        subtitle: "99.98% success rate",
      },
      {
        title: "Median Latency",
        value: "129 ms",
        delta: "-39 ms",
        tone: "blue",
        subtitle: "global edge routing",
      },
      {
        title: "Estimated Spend",
        value: "$4,820",
        delta: "Within budget",
        tone: "neutral",
        subtitle: "quarterly allocation",
      },
    ],
    points: [
      { label: "Sep", value: 5800, secondary: "168 ms median" },
      { label: "Oct", value: 7200, secondary: "145 ms median" },
      { label: "Nov", value: 8900, secondary: "129 ms median" },
    ],
  },
};

export default function DashboardDemoPage() {
  const { toast } = useTonalToast();
  const [activeNav, setActiveNav] = React.useState<NavKey>("overview");
  const [range, setRange] = React.useState<RangeKey>("7d");
  const [rows, setRows] = React.useState<TonalTableRow[]>(DEFAULT_TABLE_ROWS);
  const [showModal, setShowModal] = React.useState(false);
  const [newName, setNewName] = React.useState("");
  const [newRegion, setNewRegion] = React.useState("us-central1");

  const data = DATASETS[range];

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    const trimmed = newName.trim();
    setRows((prev) => [
      {
        id: trimmed.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now(),
        name: trimmed,
        meta: newRegion,
        status: "Deploying",
        statusTone: "blue",
        metricPrimary: "0 / wk",
        metricSecondary: "—",
        updated: "Just now",
      },
      ...prev,
    ]);
    setNewName("");
    setShowModal(false);
    setActiveNav("projects");
    toast({
      title: `Created "${trimmed}"`,
      description: `Deploying to ${newRegion} edge region.`,
      tone: "success",
    });
  };

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 pt-6 flex flex-col gap-6">
      {/* Sub-header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-[var(--t-border-subtle)]">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-2 text-[19px] font-medium tracking-[-0.02em] text-[var(--t-ink)]">
            <Activity className="h-5 w-5 text-[var(--t-blue)]" />
            Pulse Console
          </span>
          <TonalChip tone="blue">Demo Website 4 / 4</TonalChip>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex items-center gap-1.5 text-[12.5px] text-[var(--t-chip-mint-fg)] bg-[var(--t-surface-mint)] px-3 py-1 rounded-full font-medium">
            <CheckCircle2 className="h-3.5 w-3.5" />
            All systems operational
          </span>
          <TonalButton size="sm" onClick={() => setShowModal(true)}>
            <Plus className="h-4 w-4" />
            New project
          </TonalButton>
        </div>
      </div>

      {/* Dogfooded TonalAppShell */}
      <TonalAppShell
        items={DEFAULT_APP_SHELL_NAV}
        activeId={activeNav}
        onSelect={(id) => setActiveNav(id as NavKey)}
        sidebarFooter={
          <TonalQuotaCard
            percent={68}
            onAction={() => setActiveNav("billing")}
          />
        }
        header={
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="t-headline text-[26px] sm:text-[30px]">
                {activeNav === "overview" && "Workspace Overview"}
                {activeNav === "projects" && "Deployments & Services"}
                {activeNav === "usage" && "Usage & Edge Quotas"}
                {activeNav === "billing" && "Plan & Billing Summary"}
              </h1>
              <p className="text-[14px] text-[var(--t-ink-muted)] mt-0.5">
                {data.label} · Production telemetry across {rows.length}{" "}
                projects
              </p>
            </div>

            <TonalSegmentedControl
              size="sm"
              ariaLabel="Date range"
              value={range}
              onValueChange={setRange}
              options={[
                { value: "7d", label: "7D" },
                { value: "30d", label: "30D" },
                { value: "90d", label: "90D" },
              ]}
            />
          </div>
        }
      >
        {/* Dogfooded KpiGrid */}
        <KpiGrid items={data.kpis} columns={4} />

        {/* Dogfooded TonalAreaChart + Insight Tile */}
        {(activeNav === "overview" || activeNav === "usage") && (
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
            <TonalAreaChart
              className="xl:col-span-8"
              points={data.points}
              title="Request throughput"
              subtitle="Hover or focus any point to inspect throughput and latency"
              badge="Edge cached 94%"
              valueSuffix="K requests"
            />

            <div className="xl:col-span-4 rounded-[20px] bg-[var(--t-surface-warm)] p-5 flex flex-col justify-between gap-5">
              <div>
                <div className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[var(--t-blue-hover)] mb-2.5">
                  <Sparkles className="h-3.5 w-3.5" />
                  Automated insight
                </div>
                <h3 className="text-[18px] font-medium tracking-[-0.02em] text-[var(--t-ink)] leading-[1.25] mb-2">
                  Latency dropped 14% after enabling edge caching.
                </h3>
                <p className="text-[13px] leading-[1.55] text-[var(--t-ink-secondary)]">
                  <strong>Lumen Storefront Web</strong> saw the sharpest
                  improvement across EU and US West regions with zero cold
                  starts.
                </p>
              </div>

              <div className="rounded-[14px] bg-[var(--t-elevated)] p-3.5 border border-[var(--t-border-subtle)] flex items-center justify-between text-[12.5px]">
                <span className="inline-flex items-center gap-1.5 text-[var(--t-ink-muted)]">
                  <Clock className="h-3.5 w-3.5" />
                  Next digest
                </span>
                <span className="font-medium text-[var(--t-ink)]">
                  Tomorrow 9:00 AM
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Billing View Callout */}
        {activeNav === "billing" && (
          <div className="rounded-[20px] bg-[var(--t-surface-sky)] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <TonalChip
                tone="blue"
                className="bg-[var(--t-elevated)] border border-[var(--t-border-subtle)] mb-2"
              >
                Pro Workspace Plan
              </TonalChip>
              <h3 className="t-headline text-[22px] mb-1">
                $418 accrued this billing period
              </h3>
              <p className="text-[13.5px] text-[var(--t-ink-secondary)]">
                Next invoice on December 1 · Auto-pay via Visa ending in 4242.
              </p>
            </div>
            <TonalButton
              variant="dark"
              size="sm"
              onClick={() =>
                toast({
                  title: "Invoice downloaded",
                  description: "pulse-invoice-2026-11.pdf saved.",
                  tone: "info",
                })
              }
            >
              Download invoice PDF
            </TonalButton>
          </div>
        )}

        {/* Dogfooded TonalTable */}
        <TonalTable
          title="Services"
          rows={rows}
          statuses={["All", "Healthy", "Deploying", "Paused"]}
          onRowClick={(row) =>
            toast({
              title: row.name,
              description: `${row.meta ?? "global"} · ${row.status} · ${row.metricSecondary}`,
              tone: "neutral",
            })
          }
        />
      </TonalAppShell>

      {/* Dogfooded TonalDialog + TonalInput + TonalSelect */}
      <TonalDialog
        open={showModal}
        onOpenChange={setShowModal}
        title="Create project"
        description="Provision a new edge service in Pulse Console."
      >
        <form onSubmit={handleCreateProject} className="flex flex-col gap-4">
          <TonalInput
            label="Project name"
            required
            data-autofocus
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="e.g. Tonal Docs Edge"
          />
          <TonalSelect
            label="Primary region"
            value={newRegion}
            onChange={(e) => setNewRegion(e.target.value)}
            options={[
              { value: "us-central1", label: "us-central1 (Iowa)" },
              { value: "us-east4", label: "us-east4 (Virginia)" },
              { value: "europe-west1", label: "europe-west1 (Belgium)" },
              { value: "global", label: "global (Anycast Edge)" },
            ]}
          />
          <div className="flex justify-end gap-2 pt-2">
            <TonalButton
              type="button"
              variant="ghost"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </TonalButton>
            <TonalButton type="submit">Create service</TonalButton>
          </div>
        </form>
      </TonalDialog>
    </div>
  );
}
