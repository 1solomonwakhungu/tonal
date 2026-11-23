"use client";

import * as React from "react";
import {
  Check,
  Copy,
  FileCode2,
  Monitor,
  Smartphone,
  Tablet,
  Terminal,
} from "lucide-react";
import { cn } from "@/lib/utils";

type ViewportMode = "desktop" | "tablet" | "mobile";

const DEFAULT_ORIGIN = "http://localhost:3456";

const VIEWPORTS: Array<{
  id: ViewportMode;
  label: string;
  width: string;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  { id: "desktop", label: "Desktop", width: "100%", icon: Monitor },
  { id: "tablet", label: "Tablet", width: "768px", icon: Tablet },
  { id: "mobile", label: "Mobile", width: "390px", icon: Smartphone },
];

export interface CodePreviewCardProps {
  title: string;
  description: string;
  registryName: string;
  code: string;
  filePath?: string;
  defaultTab?: "preview" | "code";
  className?: string;
  children: React.ReactNode;
}

export function CodePreviewCard({
  title,
  description,
  registryName,
  code,
  filePath,
  defaultTab = "preview",
  className,
  children,
}: CodePreviewCardProps) {
  const [tab, setTab] = React.useState<"preview" | "code">(defaultTab);
  const [viewport, setViewport] = React.useState<ViewportMode>("desktop");
  const [origin, setOrigin] = React.useState<string>(DEFAULT_ORIGIN);
  const [copiedCli, setCopiedCli] = React.useState(false);
  const [copiedCode, setCopiedCode] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== "undefined" && window.location.origin) {
      setOrigin(window.location.origin);
    }
  }, []);

  const getLiveOrigin = () =>
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : origin;

  const cliCmd = `npx shadcn@latest add ${origin}/r/${registryName}.json`;
  const activeViewport =
    VIEWPORTS.find((v) => v.id === viewport) ?? VIEWPORTS[0];

  const copyText = (text: string, setter: (v: boolean) => void) => {
    navigator.clipboard?.writeText(text).catch(() => {});
    setter(true);
    setTimeout(() => setter(false), 1600);
  };

  return (
    <div
      className={cn(
        "rounded-[var(--t-radius-card)] border border-[var(--t-border-subtle)] bg-[var(--t-bg)] overflow-hidden flex flex-col",
        className
      )}
    >
      {/* Header & Toolbar */}
      <div className="px-5 sm:px-6 py-4 border-b border-[var(--t-border-subtle)] bg-[var(--t-bg)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-[16px] font-medium tracking-[-0.015em] text-[var(--t-ink)]">
            {title}
          </h3>
          <p className="text-[13px] text-[var(--t-ink-muted)] mt-0.5">
            {description}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {/* Responsive Viewport Toggles */}
          {tab === "preview" && (
            <div
              className="inline-flex items-center rounded-full bg-[var(--t-surface)] p-0.5 border border-[var(--t-border-subtle)]"
              role="group"
              aria-label="Preview viewport width"
            >
              {VIEWPORTS.map((vp) => {
                const Icon = vp.icon;
                const active = viewport === vp.id;
                return (
                  <button
                    key={vp.id}
                    type="button"
                    onClick={() => setViewport(vp.id)}
                    aria-pressed={active}
                    aria-label={`${vp.label} (${vp.width})`}
                    title={`${vp.label} (${vp.width})`}
                    className={cn(
                      "inline-flex items-center justify-center h-7 w-7 rounded-full cursor-pointer transition-colors duration-200 [transition-timing-function:cubic-bezier(0.2,0,0,1)]",
                      active
                        ? "bg-[var(--t-bg)] text-[var(--t-ink)] shadow-[0_1px_2px_rgba(0,0,0,0.08)]"
                        : "text-[var(--t-ink-muted)] hover:text-[var(--t-ink)]"
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </button>
                );
              })}
            </div>
          )}

          {/* Copy CLI Command Pill */}
          <button
            type="button"
            onClick={() =>
              copyText(
                `npx shadcn@latest add ${getLiveOrigin()}/r/${registryName}.json`,
                setCopiedCli
              )
            }
            className="inline-flex items-center gap-1.5 rounded-full bg-[var(--t-surface)] hover:bg-[var(--t-surface-muted)] border border-[var(--t-border-subtle)] px-3 py-1.5 text-[12px] font-mono text-[var(--t-ink-secondary)] cursor-pointer transition-colors"
            title={cliCmd}
          >
            <Terminal className="h-3.5 w-3.5 text-[var(--t-ink-muted)] shrink-0" />
            <span>{copiedCli ? "Copied CLI!" : `/r/${registryName}.json`}</span>
            {copiedCli ? (
              <Check className="h-3.5 w-3.5 text-[#188038] shrink-0" />
            ) : (
              <Copy className="h-3.5 w-3.5 text-[var(--t-ink-muted)] shrink-0" />
            )}
          </button>

          {/* Preview / Code Switcher */}
          <div className="inline-flex rounded-full bg-[var(--t-surface)] p-0.5 border border-[var(--t-border-subtle)]">
            <button
              type="button"
              onClick={() => setTab("preview")}
              className={cn(
                "px-3 py-1 rounded-full text-[12px] font-medium cursor-pointer transition-colors duration-200 [transition-timing-function:cubic-bezier(0.2,0,0,1)]",
                tab === "preview"
                  ? "bg-[var(--t-bg)] text-[var(--t-ink)] shadow-[0_1px_2px_rgba(0,0,0,0.08)]"
                  : "text-[var(--t-ink-muted)] hover:text-[var(--t-ink)]"
              )}
            >
              Preview
            </button>
            <button
              type="button"
              onClick={() => setTab("code")}
              className={cn(
                "px-3 py-1 rounded-full text-[12px] font-medium cursor-pointer transition-colors duration-200 [transition-timing-function:cubic-bezier(0.2,0,0,1)]",
                tab === "code"
                  ? "bg-[var(--t-bg)] text-[var(--t-ink)] shadow-[0_1px_2px_rgba(0,0,0,0.08)]"
                  : "text-[var(--t-ink-muted)] hover:text-[var(--t-ink)]"
              )}
            >
              Code
            </button>
          </div>
        </div>
      </div>

      {/* Body */}
      {tab === "preview" ? (
        <div
          className={cn(
            "flex-1 transition-colors duration-300 [transition-timing-function:cubic-bezier(0.2,0,0,1)]",
            viewport === "desktop"
              ? "p-6 sm:p-8 bg-[var(--t-bg)]"
              : "p-4 sm:p-6 bg-[var(--t-surface)]"
          )}
        >
          <div
            style={{
              width: activeViewport.width,
              maxWidth: "100%",
              transition:
                "width 320ms cubic-bezier(0.2, 0, 0, 1), padding 320ms cubic-bezier(0.2, 0, 0, 1), border-color 320ms cubic-bezier(0.2, 0, 0, 1)",
            }}
            className={cn(
              "mx-auto overflow-x-auto",
              viewport === "desktop"
                ? "border border-transparent bg-transparent p-0 rounded-none"
                : "border border-[var(--t-border-subtle)] bg-[var(--t-bg)] rounded-[18px] p-4 sm:p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
            )}
          >
            {viewport !== "desktop" && (
              <div className="mb-3 pb-2.5 border-b border-[var(--t-border-subtle)] flex items-center justify-between text-[11px] font-mono text-[var(--t-ink-muted)]">
                <span>{activeViewport.label} frame</span>
                <span>{activeViewport.width}</span>
              </div>
            )}
            {children}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col bg-[#16181c] text-[#e8eaed]">
          <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-2.5 border-b border-white/10 bg-white/[0.03]">
            <div className="flex items-center gap-2 min-w-0 text-[12px] font-mono text-[#bdc1c6]">
              <FileCode2 className="h-3.5 w-3.5 text-[#8ab4f8] shrink-0" />
              <span className="truncate">
                {filePath ?? `registry/tonal/${registryName}`}
              </span>
            </div>
            <button
              type="button"
              onClick={() => copyText(code, setCopiedCode)}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/15 px-3 py-1 text-[11.5px] font-medium text-white cursor-pointer transition-colors shrink-0"
            >
              {copiedCode ? (
                <>
                  <Check className="h-3.5 w-3.5 text-[#81c995]" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  Copy
                </>
              )}
            </button>
          </div>
          <div className="p-4 sm:p-5 overflow-auto max-h-[520px]">
            <pre className="text-[12.5px] leading-[1.6] font-mono">
              <code>{code}</code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
