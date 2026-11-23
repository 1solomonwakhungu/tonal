"use client";

import * as React from "react";
import {
  Activity,
  BarChart3,
  CheckCircle2,
  Clock,
  CreditCard,
  FolderKanban,
  LayoutGrid,
  Plus,
  Search,
  Sparkles,
  TrendingUp,
  X,
} from "lucide-react";
import { TonalButton } from "@registry/tonal/button";
import { TonalChip } from "@registry/tonal/chip";
import { ChevronLink } from "@registry/tonal/chevron-link";
import { cn } from "@/lib/utils";

type RangeKey = "7d" | "30d" | "90d";
type NavKey = "overview" | "projects" | "usage" | "billing";

interface RangeDataset {
  label: string;
  kpis: {
    title: string;
    value: string;
    delta: string;
    tone: "mint" | "blue" | "neutral";
    sub: string;
  }[];
  points: { label: string; requests: number; latency: number }[];
}

const DATASETS: Record<RangeKey, RangeDataset> = {
  "7d": {
    label: "Last 7 days",
    kpis: [
      { title: "Active Users", value: "24,890", delta: "+14.2%", tone: "mint", sub: "vs previous 7 days" },
      { title: "API Requests", value: "1.84M", delta: "+22.6%", tone: "mint", sub: "99.98% success rate" },
      { title: "Median Latency", value: "142 ms", delta: "-18 ms", tone: "blue", sub: "p95 at 290 ms" },
      { title: "Estimated Spend", value: "$418", delta: "On track", tone: "neutral", sub: "of $1,200 monthly cap" },
    ],
    points: [
      { label: "Mon", requests: 210, latency: 158 },
      { label: "Tue", requests: 248, latency: 151 },
      { label: "Wed", requests: 236, latency: 149 },
      { label: "Thu", requests: 289, latency: 144 },
      { label: "Fri", requests: 312, latency: 138 },
      { label: "Sat", requests: 264, latency: 141 },
      { label: "Sun", requests: 281, latency: 142 },
    ],
  },
  "30d": {
    label: "Last 30 days",
    kpis: [
      { title: "Active Users", value: "96,420", delta: "+19.8%", tone: "mint", sub: "vs previous 30 days" },
      { title: "API Requests", value: "7.42M", delta: "+31.4%", tone: "mint", sub: "99.97% success rate" },
      { title: "Median Latency", value: "136 ms", delta: "-24 ms", tone: "blue", sub: "p95 at 275 ms" },
      { title: "Estimated Spend", value: "$1,640", delta: "+6.2%", tone: "neutral", sub: "of $2,500 monthly cap" },
    ],
    points: [
      { label: "W1", requests: 1420, latency: 162 },
      { label: "W2", requests: 1680, latency: 150 },
      { label: "W3", requests: 1940, latency: 141 },
      { label: "W4", requests: 2380, latency: 136 },
    ],
  },
  "90d": {
    label: "Last 90 days",
    kpis: [
      { title: "Active Users", value: "248.1K", delta: "+42.5%", tone: "mint", sub: "vs previous quarter" },
      { title: "API Requests", value: "21.9M", delta: "+54.0%", tone: "mint", sub: "99.98% success rate" },
      { title: "Median Latency", value: "129 ms", delta: "-39 ms", tone: "blue", sub: "global edge routing" },
      { title: "Estimated Spend", value: "$4,820", delta: "Within budget", tone: "neutral", sub: "quarterly allocation" },
    ],
    points: [
      { label: "Sep", requests: 5800, latency: 168 },
      { label: "Oct", requests: 7200, latency: 145 },
      { label: "Nov", requests: 8900, latency: 129 },
    ],
  },
};

interface ProjectRow {
  id: string;
  name: string;
  region: string;
  status: "Healthy" | "Deploying" | "Paused";
  requests: string;
  latency: string;
  updated: string;
}

const INITIAL_PROJECTS: ProjectRow[] = [
  {
    id: "tonal-storefront",
    name: "Lumen Storefront Web",
    region: "us-central1",
    status: "Healthy",
    requests: "842K / wk",
    latency: "118 ms",
    updated: "4 mins ago",
  },
  {
    id: "aura-inference",
    name: "Aura 2.5 Inference Gateway",
    region: "us-east4",
    status: "Healthy",
    requests: "620K / wk",
    latency: "148 ms",
    updated: "19 mins ago",
  },
  {
    id: "canvas-realtime",
    name: "Canvas Docs Sync Engine",
    region: "europe-west1",
    status: "Deploying",
    requests: "294K / wk",
    latency: "164 ms",
    updated: "Just now",
  },
  {
    id: "registry-cdn",
    name: "Tonal Registry Edge CDN",
    region: "global",
    status: "Healthy",
    requests: "84K / wk",
    latency: "34 ms",
    updated: "2 hours ago",
  },
  {
    id: "search-preview",
    name: "Staging Search Indexer",
    region: "us-west1",
    status: "Paused",
    requests: "0 / wk",
    latency: "—",
    updated: "3 days ago",
  },
];

const SIDEBAR_ITEMS: { id: NavKey; label: string; icon: React.ElementType }[] = [
  { id: "overview", label: "Overview", icon: LayoutGrid },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "usage", label: "Usage & Quotas", icon: BarChart3 },
  { id: "billing", label: "Billing", icon: CreditCard },
];

export default function DashboardDemoPage() {
  const [activeNav, setActiveNav] = React.useState<NavKey>("overview");
  const [range, setRange] = React.useState<RangeKey>("7d");
  const [query, setQuery] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("All");
  const [hoveredIdx, setHoveredIdx] = React.useState<number | null>(null);
  const [projects, setProjects] = React.useState<ProjectRow[]>(INITIAL_PROJECTS);
  const [showModal, setShowModal] = React.useState(false);
  const [newName, setNewName] = React.useState("");
  const [newRegion, setNewRegion] = React.useState("us-central1");

  const data = DATASETS[range];

  const filteredProjects = projects.filter((p) => {
    const matchesText =
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.region.toLowerCase().includes(query.toLowerCase());
    const matchesStatus = statusFilter === "All" || p.status === statusFilter;
    return matchesText && matchesStatus;
  });

  // Compute smooth SVG polyline/area coordinates
  const chartW = 640;
  const chartH = 210;
  const padX = 28;
  const padY = 24;
  const values = data.points.map((p) => p.requests);
  const maxVal = Math.max(...values) * 1.12;
  const minVal = Math.min(...values) * 0.72;

  const coords = data.points.map((p, idx) => {
    const x =
      data.points.length === 1
        ? chartW / 2
        : padX + (idx / (data.points.length - 1)) * (chartW - padX * 2);
    const ratio = (p.requests - minVal) / Math.max(maxVal - minVal, 1);
    const y = chartH - padY - ratio * (chartH - padY * 2);
    return { x, y, ...p };
  });

  const linePath = coords
    .map((pt, i) => `${i === 0 ? "M" : "L"} ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`)
    .join(" ");

  const areaPath = `${linePath} L ${coords[coords.length - 1].x.toFixed(1)} ${(
    chartH - padY
  ).toFixed(1)} L ${coords[0].x.toFixed(1)} ${(chartH - padY).toFixed(1)} Z`;

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    setProjects((prev) => [
      {
        id: newName.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now(),
        name: newName.trim(),
        region: newRegion,
        status: "Deploying",
        requests: "0 / wk",
        latency: "—",
        updated: "Just now",
      },
      ...prev,
    ]);
    setNewName("");
    setShowModal(false);
    setActiveNav("projects");
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

      {/* Google Workspace / AI Studio–style Tonal App Shell */}
      <div className="rounded-[var(--t-radius-hero)] bg-[var(--t-surface-cool)] p-3 sm:p-4 grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Navigation Rail (Flat Google Drive / AI Studio style) */}
        <aside className="lg:col-span-3 flex flex-col justify-between gap-6 p-2">
          <div className="flex flex-col gap-1">
            <div className="px-3 pb-2 text-[11.5px] font-medium uppercase tracking-wider text-[var(--t-ink-muted)]">
              Workspace
            </div>
            {SIDEBAR_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveNav(item.id)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2.5 rounded-full text-[14px] font-medium cursor-pointer transition-colors duration-180 text-left",
                    active
                      ? "bg-[var(--t-nav-active-bg)] text-[var(--t-nav-active-fg)]"
                      : "text-[var(--t-ink-secondary)] hover:bg-[var(--t-hover-overlay,rgba(32,33,36,0.04))]"
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Calm Quota Card inside sidebar */}
          <div className="rounded-[20px] bg-[var(--t-elevated)] p-4 border border-[var(--t-border-subtle)] flex flex-col gap-3">
            <div className="flex items-center justify-between text-[12.5px]">
              <span className="font-medium text-[var(--t-ink)]">Monthly Quota</span>
              <span className="text-[var(--t-ink-muted)]">68%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-[var(--t-surface-sky)] overflow-hidden">
              <div className="h-full w-[68%] rounded-full bg-[var(--t-blue)]" />
            </div>
            <p className="text-[12px] text-[var(--t-ink-muted)] leading-[1.45]">
              7.42M of 11M included edge requests used this cycle.
            </p>
            <ChevronLink
              onClick={() => setActiveNav("billing")}
              className="text-[12.5px]"
            >
              Manage plan
            </ChevronLink>
          </div>
        </aside>

        {/* Main Rounded App Sheet */}
        <div className="lg:col-span-9 rounded-[22px] bg-[var(--t-bg)] border border-[var(--t-border-subtle)] p-5 sm:p-7 flex flex-col gap-7">
          {/* Sheet Header + Time-Range Segmented Pill */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="t-headline text-[26px] sm:text-[30px]">
                {activeNav === "overview" && "Good afternoon, Solomon"}
                {activeNav === "projects" && "Deployments & Services"}
                {activeNav === "usage" && "Usage & Edge Quotas"}
                {activeNav === "billing" && "Plan & Billing Summary"}
              </h1>
              <p className="text-[14px] text-[var(--t-ink-muted)] mt-0.5">
                {data.label} · Production telemetry across {projects.length} projects
              </p>
            </div>

            <div
              className="inline-flex self-start rounded-full bg-[var(--t-surface-muted)] p-1 border border-[var(--t-border-subtle)]"
              role="tablist"
              aria-label="Date range"
            >
              {(["7d", "30d", "90d"] as RangeKey[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    setRange(key);
                    setHoveredIdx(null);
                  }}
                  className={cn(
                    "px-3.5 py-1 rounded-full text-[12.5px] font-medium uppercase cursor-pointer transition-all duration-180",
                    range === key
                      ? "bg-[var(--t-elevated)] text-[var(--t-ink)] shadow-[0_1px_2px_rgba(0,0,0,0.14)]"
                      : "text-[var(--t-ink-muted)] hover:text-[var(--t-ink)]"
                  )}
                >
                  {key}
                </button>
              ))}
            </div>
          </div>

          {/* 4 Calm Tonal KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5">
            {data.kpis.map((kpi) => (
              <div
                key={kpi.title}
                className="rounded-[18px] bg-[var(--t-surface)] p-4 flex flex-col justify-between gap-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[12.5px] font-medium text-[var(--t-ink-muted)]">
                    {kpi.title}
                  </span>
                  <TonalChip tone={kpi.tone} className="px-2 py-0.5 text-[11px]">
                    {kpi.delta}
                  </TonalChip>
                </div>
                <div>
                  <div className="text-[28px] font-medium tracking-[-0.03em] leading-none text-[var(--t-ink)] mb-1.5">
                    {kpi.value}
                  </div>
                  <div className="text-[11.5px] text-[var(--t-ink-muted)]">
                    {kpi.sub}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Traffic Trend Chart + AI Insight Tile */}
          {(activeNav === "overview" || activeNav === "usage") && (
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
              <div className="xl:col-span-8 rounded-[20px] border border-[var(--t-border-subtle)] p-5 flex flex-col gap-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h2 className="text-[15.5px] font-medium tracking-[-0.015em] text-[var(--t-ink)]">
                      Request throughput
                    </h2>
                    <p className="text-[12.5px] text-[var(--t-ink-muted)]">
                      {hoveredIdx !== null
                        ? `${coords[hoveredIdx].label}: ${coords[hoveredIdx].requests}K requests · ${coords[hoveredIdx].latency} ms median`
                        : "Hover any point to inspect throughput and latency"}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[var(--t-blue)]">
                    <TrendingUp className="h-3.5 w-3.5" />
                    Edge cached 94%
                  </span>
                </div>

                <div className="w-full overflow-hidden">
                  <svg
                    viewBox={`0 0 ${chartW} ${chartH}`}
                    className="w-full h-auto block"
                    role="img"
                    aria-label="Request throughput chart"
                  >
                    <defs>
                      <linearGradient id="tonalBlueGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--t-blue)" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="var(--t-blue)" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Subtle hairline horizontal guides */}
                    {[0.2, 0.5, 0.8].map((t) => {
                      const y = padY + t * (chartH - padY * 2);
                      return (
                        <line
                          key={t}
                          x1={padX}
                          y1={y}
                          x2={chartW - padX}
                          y2={y}
                          stroke="var(--t-border-subtle)"
                          strokeDasharray="4 4"
                        />
                      );
                    })}

                    <path d={areaPath} fill="url(#tonalBlueGrad)" />
                    <path
                      d={linePath}
                      fill="none"
                      stroke="var(--t-blue)"
                      strokeWidth="2.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {coords.map((pt, idx) => {
                      const isHovered = hoveredIdx === idx;
                      return (
                        <g
                          key={pt.label}
                          onMouseEnter={() => setHoveredIdx(idx)}
                          onMouseLeave={() => setHoveredIdx(null)}
                          className="cursor-pointer"
                        >
                          <circle
                            cx={pt.x}
                            cy={pt.y}
                            r={16}
                            fill="transparent"
                          />
                          <circle
                            cx={pt.x}
                            cy={pt.y}
                            r={isHovered ? 6 : 4}
                            fill="var(--t-bg)"
                            stroke="var(--t-blue)"
                            strokeWidth={isHovered ? 3 : 2.5}
                          />
                          <text
                            x={pt.x}
                            y={chartH - 4}
                            textAnchor="middle"
                            fontSize="11.5"
                            fill={isHovered ? "var(--t-ink)" : "var(--t-ink-muted)"}
                            fontWeight={isHovered ? 600 : 400}
                          >
                            {pt.label}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>
              </div>

              {/* Quiet Editorial Insight Panel (Gemini / Analytics style) */}
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
                  <span className="font-medium text-[var(--t-ink)]">Tomorrow 9:00 AM</span>
                </div>
              </div>
            </div>
          )}

          {/* Billing View Callout */}
          {activeNav === "billing" && (
            <div className="rounded-[20px] bg-[var(--t-surface-sky)] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <TonalChip tone="blue" className="bg-[var(--t-elevated)] border border-[var(--t-border-subtle)] mb-2">
                  Pro Workspace Plan
                </TonalChip>
                <h3 className="t-headline text-[22px] mb-1">
                  $418 accrued this billing period
                </h3>
                <p className="text-[13.5px] text-[var(--t-ink-secondary)]">
                  Next invoice on December 1 · Auto-pay via Visa ending in 4242.
                </p>
              </div>
              <TonalButton variant="dark" size="sm">
                Download invoice PDF
              </TonalButton>
            </div>
          )}

          {/* Searchable Hairline Services Table */}
          <div className="flex flex-col gap-3.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h2 className="text-[16px] font-medium tracking-[-0.015em] text-[var(--t-ink)]">
                Services ({filteredProjects.length})
              </h2>

              <div className="flex flex-wrap items-center gap-2">
                {/* Google-style Pill Search Field */}
                <div className="relative">
                  <Search className="h-4 w-4 text-[var(--t-ink-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Filter projects or region..."
                    className="rounded-full bg-[var(--t-surface-cool)] pl-9 pr-4 py-1.5 text-[13px] text-[var(--t-ink)] placeholder:text-[var(--t-ink-muted)] border border-transparent focus:border-[var(--t-blue)] focus:bg-[var(--t-elevated)] focus:outline-none transition-colors w-56"
                  />
                </div>

                {["All", "Healthy", "Deploying", "Paused"].map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setStatusFilter(st)}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-[12px] font-medium cursor-pointer transition-colors",
                      statusFilter === st
                        ? "bg-[var(--t-ink)] text-[var(--t-bg)]"
                        : "bg-[var(--t-surface)] text-[var(--t-ink-muted)] hover:text-[var(--t-ink)]"
                    )}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-[18px] border border-[var(--t-border-subtle)] overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[540px]">
                <thead>
                  <tr className="bg-[var(--t-surface)] text-[12px] font-medium text-[var(--t-ink-muted)] border-b border-[var(--t-border-subtle)]">
                    <th className="py-3 px-4">Service</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Throughput</th>
                    <th className="py-3 px-4">Median</th>
                    <th className="py-3 px-4 text-right">Updated</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--t-border-subtle)] text-[13.5px]">
                  {filteredProjects.map((row) => (
                    <tr
                      key={row.id}
                      className="hover:bg-[var(--t-surface)] transition-colors"
                    >
                      <td className="py-3.5 px-4">
                        <div className="font-medium text-[var(--t-ink)]">
                          {row.name}
                        </div>
                        <div className="text-[11.5px] font-mono text-[var(--t-ink-muted)]">
                          {row.region}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <TonalChip
                          tone={
                            row.status === "Healthy"
                              ? "mint"
                              : row.status === "Deploying"
                                ? "blue"
                                : "neutral"
                          }
                        >
                          {row.status}
                        </TonalChip>
                      </td>
                      <td className="py-3.5 px-4 text-[var(--t-ink-secondary)]">
                        {row.requests}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[12.5px] text-[var(--t-ink-secondary)]">
                        {row.latency}
                      </td>
                      <td className="py-3.5 px-4 text-right text-[12.5px] text-[var(--t-ink-muted)]">
                        {row.updated}
                      </td>
                    </tr>
                  ))}
                  {filteredProjects.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="py-8 text-center text-[13.5px] text-[var(--t-ink-muted)]"
                      >
                        No services match “{query}”.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Minimal Google-style New Project Dialog */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-[2px] flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-[28px] bg-[var(--t-elevated)] p-7 shadow-[0_24px_48px_-16px_rgba(0,0,0,0.4)] border border-[var(--t-border-subtle)]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="t-headline text-[22px]">Create project</h3>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="h-8 w-8 rounded-full hover:bg-[var(--t-surface-muted)] grid place-items-center text-[var(--t-ink-muted)] cursor-pointer"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <form onSubmit={handleCreateProject} className="flex flex-col gap-4">
              <div>
                <label className="block text-[12.5px] font-medium text-[var(--t-ink-secondary)] mb-1.5">
                  Project name
                </label>
                <input
                  type="text"
                  required
                  autoFocus
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Tonal Docs Edge"
                  className="w-full rounded-[12px] border border-[var(--t-border)] bg-[var(--t-bg)] px-3.5 py-2.5 text-[14px] text-[var(--t-ink)] placeholder:text-[var(--t-ink-muted)] focus:border-[var(--t-blue)] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[12.5px] font-medium text-[var(--t-ink-secondary)] mb-1.5">
                  Primary region
                </label>
                <select
                  value={newRegion}
                  onChange={(e) => setNewRegion(e.target.value)}
                  className="w-full rounded-[12px] border border-[var(--t-border)] px-3.5 py-2.5 text-[14px] text-[var(--t-ink)] bg-[var(--t-bg)] focus:border-[var(--t-blue)] focus:outline-none"
                >
                  <option value="us-central1">us-central1 (Iowa)</option>
                  <option value="us-east4">us-east4 (Virginia)</option>
                  <option value="europe-west1">europe-west1 (Belgium)</option>
                  <option value="global">global (Anycast Edge)</option>
                </select>
              </div>
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
          </div>
        </div>
      )}
    </div>
  );
}
