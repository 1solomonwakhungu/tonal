"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { Check, Copy, Download, RotateCcw, Share2 } from "lucide-react";
import { TonalButton } from "@registry/tonal/button";
import { SurfaceTile } from "@registry/tonal/surface-tile";
import { TonalChip } from "@registry/tonal/chip";
import { TonalInput } from "@registry/tonal/input";
import { TonalSegmentedControl } from "@registry/tonal/segmented-control";
import { KpiGrid } from "@registry/tonal/blocks/kpi-grid";
import { useTonalToast } from "@registry/tonal/toast";
import {
  buildStudioTokens,
  DEFAULT_STUDIO_CONFIG,
  generateTokensCss,
  getContrastRatio,
  getWcagGrade,
  mixHex,
  normalizeHex,
  parseStudioConfig,
  serializeStudioConfig,
  THEME_PRESETS,
  type ThemeStudioConfig,
} from "@/lib/theme-studio";
import { cn } from "@/lib/utils";

export function ThemeStudioClient() {
  const searchParams = useSearchParams();
  const { toast } = useTonalToast();

  const [config, setConfig] = React.useState<ThemeStudioConfig>(() =>
    parseStudioConfig(new URLSearchParams(searchParams?.toString() ?? ""))
  );
  const [hexDraft, setHexDraft] = React.useState<string>(config.accentLight);
  const [copiedCss, setCopiedCss] = React.useState(false);

  React.useEffect(() => {
    setHexDraft(config.accentLight);
  }, [config.accentLight]);

  const tokens = React.useMemo(() => buildStudioTokens(config), [config]);
  const cssOutput = React.useMemo(() => generateTokensCss(config), [config]);

  const inkHex = config.theme === "dark" ? "#e3e3e3" : "#202124";
  const contrastChecks = [
    {
      label: "CTA label on CTA background",
      ratio: getContrastRatio(tokens["--t-cta-fg"], tokens["--t-cta-bg"]),
    },
    {
      label: "Accent link on Canvas",
      ratio: getContrastRatio(tokens["--t-blue"], tokens["--t-bg"]),
    },
    {
      label: "Primary ink on Surface",
      ratio: getContrastRatio(inkHex, tokens["--t-surface"]),
    },
  ];
  const allContrastAa = contrastChecks.every((c) => c.ratio >= 4.5);

  const applyPreset = (presetId: string) => {
    const preset = THEME_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    setConfig((prev) => ({
      ...prev,
      presetId: preset.id,
      accentLight: preset.accentLight,
      accentLightHover: preset.accentLightHover,
      accentDark: preset.accentDark,
      accentDarkHover: preset.accentDarkHover,
      surfaceWarmth: preset.surfaceWarmth,
      cardRadius: preset.cardRadius,
      mode: preset.mode,
    }));
  };

  const commitAccentHex = (hex: string) => {
    const cleaned = hex.trim().replace(/^#/, "");
    if (!/^[0-9a-fA-F]{3}$|^[0-9a-fA-F]{6}$/.test(cleaned)) return;
    const normalized = normalizeHex(hex, config.accentLight);
    setConfig((prev) => ({
      ...prev,
      presetId: "custom",
      accentLight: normalized,
      accentLightHover: mixHex(normalized, "#000000", 0.8),
      accentDark: mixHex(normalized, "#ffffff", 0.45),
      accentDarkHover: mixHex(normalized, "#ffffff", 0.3),
    }));
  };

  const handleHexInputChange = (raw: string) => {
    setHexDraft(raw);
    commitAccentHex(raw);
  };

  const copyCss = () => {
    navigator.clipboard?.writeText(cssOutput).catch(() => {});
    setCopiedCss(true);
    setTimeout(() => setCopiedCss(false), 1600);
    toast({
      title: "Copied tokens.css",
      description: "Paste into your globals.css or styles/tonal-tokens.css.",
      tone: "success",
    });
  };

  const downloadCss = () => {
    const blob = new Blob([cssOutput], { type: "text/css;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `tonal-${config.presetId}-tokens.css`;
    a.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast({
      title: "Downloaded tokens.css",
      description: `Saved tonal-${config.presetId}-tokens.css.`,
      tone: "info",
    });
  };

  const copyShareUrl = () => {
    const qs = serializeStudioConfig(config);
    const url = `${window.location.origin}/studio?${qs}`;
    window.history.replaceState(null, "", `/studio?${qs}`);
    navigator.clipboard?.writeText(url).catch(() => {});
    toast({
      title: "Shareable studio link copied",
      description: "Preset, accent hue, radius, and surface warmth encoded in URL.",
      tone: "success",
    });
  };

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 pt-10 flex flex-col gap-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[var(--t-border-subtle)]">
        <div>
          <TonalChip tone="blue" className="mb-3">
            Live Theme Studio
          </TonalChip>
          <h1 className="t-display text-[36px] sm:text-[48px] mb-2">
            Remix Tonal in real time.
          </h1>
          <p className="t-body text-[15.5px] max-w-2xl">
            Tune accent hue, surface warmth, card radii, and Soft Pill vs.
            Commerce corners with live WCAG contrast readouts — then export a
            ready-to-drop <code>tokens.css</code>.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <TonalButton size="sm" variant="outline" onClick={copyShareUrl}>
            <Share2 className="h-3.5 w-3.5" />
            Share URL
          </TonalButton>
          <TonalButton size="sm" variant="outline" onClick={downloadCss}>
            <Download className="h-3.5 w-3.5" />
            Download CSS
          </TonalButton>
          <TonalButton size="sm" onClick={copyCss}>
            {copiedCss ? (
              <Check className="h-3.5 w-3.5" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
            {copiedCss ? "Copied!" : "Copy tokens.css"}
          </TonalButton>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Controls Column */}
        <SurfaceTile
          tone="neutral"
          padding="md"
          className="lg:col-span-4 flex flex-col gap-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="t-headline text-[19px]">Controls</h2>
            <button
              type="button"
              onClick={() => setConfig(DEFAULT_STUDIO_CONFIG)}
              className="inline-flex items-center gap-1 text-[12px] font-medium text-[var(--t-ink-muted)] hover:text-[var(--t-ink)] cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset
            </button>
          </div>

          {/* Curated Presets */}
          <div className="flex flex-col gap-2">
            <span className="text-[12px] font-medium uppercase tracking-wider text-[var(--t-ink-muted)]">
              Curated Presets
            </span>
            <div className="flex flex-col gap-2">
              {THEME_PRESETS.map((preset) => {
                const active = config.presetId === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => applyPreset(preset.id)}
                    className={cn(
                      "flex items-center gap-3 rounded-[14px] px-3.5 py-2.5 text-left border cursor-pointer transition-colors",
                      active
                        ? "bg-[var(--t-elevated)] border-[var(--t-blue)]"
                        : "bg-[var(--t-bg)] border-[var(--t-border-subtle)] hover:border-[var(--t-border)]"
                    )}
                  >
                    <span
                      style={{ backgroundColor: preset.accentLight }}
                      className="h-5 w-5 rounded-full shrink-0 border border-black/10"
                    />
                    <div className="min-w-0">
                      <div className="text-[13.5px] font-medium text-[var(--t-ink)]">
                        {preset.name}
                      </div>
                      <div className="text-[11.5px] text-[var(--t-ink-muted)] truncate">
                        {preset.tagline}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Accent Picker */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="studio-accent-color"
              className="text-[12px] font-medium uppercase tracking-wider text-[var(--t-ink-muted)]"
            >
              Custom Accent Hue
            </label>
            <div className="flex items-center gap-2.5">
              <input
                id="studio-accent-color"
                type="color"
                value={config.accentLight}
                onChange={(e) => commitAccentHex(e.target.value)}
                className="h-10 w-12 rounded-[10px] border border-[var(--t-border)] bg-[var(--t-bg)] p-1 cursor-pointer"
              />
              <TonalInput
                aria-label="Accent hex value"
                value={hexDraft}
                onChange={(e) => handleHexInputChange(e.target.value)}
                onBlur={() => setHexDraft(config.accentLight)}
                className="font-mono text-[13px]"
              />
            </div>
          </div>

          {/* Surface Warmth */}
          <div className="flex flex-col gap-2">
            <span className="text-[12px] font-medium uppercase tracking-wider text-[var(--t-ink-muted)]">
              Surface Temperature
            </span>
            <TonalSegmentedControl
              size="sm"
              ariaLabel="Surface temperature"
              value={config.surfaceWarmth}
              onValueChange={(surfaceWarmth) =>
                setConfig((prev) => ({ ...prev, surfaceWarmth }))
              }
              options={[
                { value: "crisp", label: "Crisp" },
                { value: "warm", label: "Warm" },
                { value: "cool", label: "Cool" },
              ]}
            />
          </div>

          {/* Card Radius */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-[12px]">
              <span className="font-medium uppercase tracking-wider text-[var(--t-ink-muted)]">
                Card Radius
              </span>
              <span className="font-mono text-[var(--t-ink)]">
                {config.cardRadius}px
              </span>
            </div>
            <input
              type="range"
              min={12}
              max={32}
              step={2}
              value={config.cardRadius}
              aria-label="Card radius in pixels"
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  cardRadius: Number(e.target.value),
                }))
              }
              className="w-full accent-[var(--t-blue)] cursor-pointer"
            />
          </div>

          {/* Mode & Appearance */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <span className="text-[11.5px] font-medium uppercase tracking-wider text-[var(--t-ink-muted)]">
                Buttons
              </span>
              <TonalSegmentedControl
                size="sm"
                ariaLabel="Button style"
                value={config.mode}
                onValueChange={(mode) =>
                  setConfig((prev) => ({ ...prev, mode }))
                }
                options={[
                  { value: "pill", label: "Pill" },
                  { value: "commerce", label: "6px" },
                ]}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-[11.5px] font-medium uppercase tracking-wider text-[var(--t-ink-muted)]">
                Preview
              </span>
              <TonalSegmentedControl
                size="sm"
                ariaLabel="Preview appearance"
                value={config.theme}
                onValueChange={(theme) =>
                  setConfig((prev) => ({ ...prev, theme }))
                }
                options={[
                  { value: "light", label: "Light" },
                  { value: "dark", label: "Dark" },
                ]}
              />
            </div>
          </div>

          {/* WCAG Contrast Readout */}
          <div className="flex flex-col gap-2 pt-3 border-t border-[var(--t-border-subtle)]">
            <span className="text-[12px] font-medium uppercase tracking-wider text-[var(--t-ink-muted)]">
              Live WCAG Contrast
            </span>
            {contrastChecks.map((check) => {
              const grade = getWcagGrade(check.ratio);
              return (
                <div
                  key={check.label}
                  className="flex items-center justify-between gap-2 text-[12.5px]"
                >
                  <span className="text-[var(--t-ink-secondary)] truncate">
                    {check.label}
                  </span>
                  <TonalChip
                    tone={
                      grade === "Fail"
                        ? "danger"
                        : grade === "AA Large"
                          ? "warning"
                          : "mint"
                    }
                    className="px-2 py-0.5 text-[11px] font-mono shrink-0"
                  >
                    {check.ratio}:1 {grade}
                  </TonalChip>
                </div>
              );
            })}
          </div>
        </SurfaceTile>

        {/* Live Scoped Preview + Generated CSS */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div
            data-tonal-theme={config.theme}
            data-tonal-mode={config.mode}
            style={tokens as React.CSSProperties}
            className="rounded-[var(--t-radius-hero)] border border-[var(--t-border-subtle)] bg-[var(--t-bg)] text-[var(--t-ink)] p-6 sm:p-8 flex flex-col gap-6 transition-all duration-300"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <TonalChip tone="blue">Live Scoped Stage</TonalChip>
                <TonalChip tone={allContrastAa ? "mint" : "warning"}>
                  {allContrastAa ? "WCAG AA Pass" : "Check Contrast"}
                </TonalChip>
                <TonalChip tone="warning">Preview</TonalChip>
              </div>
              <span className="text-[12px] font-mono text-[var(--t-ink-muted)]">
                radius: {config.cardRadius}px · {config.mode} · {config.theme}
              </span>
            </div>

            <SurfaceTile tone="cool" padding="md" className="flex flex-col gap-4">
              <h2 className="t-headline text-[28px] sm:text-[34px]">
                Calm interfaces that adapt to your brand.
              </h2>
              <p className="t-body text-[14.5px] max-w-xl">
                Every Tonal primitive and block reads these CSS custom
                properties directly — zero theme provider re-renders required.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <TonalButton>Primary Action</TonalButton>
                <TonalButton variant="tonal">Tonal Action</TonalButton>
                <TonalButton variant="outline">Outline</TonalButton>
                <TonalButton variant="dark">Dark CTA</TonalButton>
              </div>
            </SurfaceTile>

            <KpiGrid columns={2} />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TonalInput
                label="Workspace email"
                placeholder="alex@studio.dev"
                hint="Inherits accent focus ring."
              />
              <SurfaceTile tone="warm" padding="sm">
                <div className="text-[13px] font-medium text-[var(--t-ink)] mb-1">
                  Warm Bento Accent
                </div>
                <p className="text-[12.5px] text-[var(--t-ink-muted)] leading-relaxed">
                  Surface warmth subtly shifts Canvas, Neutral, Cool, and
                  Porcelain steps together.
                </p>
              </SurfaceTile>
            </div>
          </div>

          {/* Generated CSS Export */}
          <div className="rounded-[var(--t-radius-card)] overflow-hidden border border-[var(--t-border-subtle)] bg-[#0d1117] text-[#e6edf3]">
            <div className="px-4 py-2.5 border-b border-white/10 bg-white/[0.03] flex items-center justify-between text-[12px] font-mono text-[#bdc1c6]">
              <span>generated-tonal-tokens.css</span>
              <button
                type="button"
                onClick={copyCss}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/15 px-3 py-1 text-[11.5px] font-sans font-medium text-white cursor-pointer"
              >
                {copiedCss ? (
                  <Check className="h-3.5 w-3.5 text-[#81c995]" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
                {copiedCss ? "Copied" : "Copy CSS"}
              </button>
            </div>
            <pre className="p-4 text-[12px] leading-[1.6] font-mono overflow-x-auto max-h-[340px]">
              <code>{cssOutput}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
