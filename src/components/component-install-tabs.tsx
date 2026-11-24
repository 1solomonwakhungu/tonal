"use client";

import * as React from "react";
import { Check, Copy, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

type Runner = "npx" | "pnpm" | "bun";

const RUNNERS: Array<{ id: Runner; label: string; prefix: string }> = [
  { id: "npx", label: "npm / npx", prefix: "npx shadcn@latest add" },
  { id: "pnpm", label: "pnpm", prefix: "pnpm dlx shadcn@latest add" },
  { id: "bun", label: "bun", prefix: "bunx --bun shadcn@latest add" },
];

export function ComponentInstallTabs({
  slug,
  defaultOrigin = "https://tonal.harlo.dev",
}: {
  slug: string;
  defaultOrigin?: string;
}) {
  const [runner, setRunner] = React.useState<Runner>("npx");
  const [origin, setOrigin] = React.useState(defaultOrigin);
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== "undefined" && window.location.origin) {
      setOrigin(window.location.origin);
    }
  }, []);

  const active = RUNNERS.find((r) => r.id === runner) ?? RUNNERS[0];
  const cmd = `${active.prefix} ${origin}/r/${slug}.json`;

  const handleCopy = () => {
    navigator.clipboard?.writeText(cmd).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="rounded-[20px] border border-[var(--t-border-subtle)] bg-[var(--t-surface)] overflow-hidden">
      <div className="px-4 py-2.5 border-b border-[var(--t-border-subtle)] flex flex-wrap items-center justify-between gap-2">
        <div
          className="inline-flex items-center gap-1"
          role="tablist"
          aria-label="Package manager"
        >
          {RUNNERS.map((item) => {
            const isActive = item.id === runner;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setRunner(item.id)}
                className={cn(
                  "px-3 py-1 rounded-full text-[12px] font-medium cursor-pointer transition-colors",
                  isActive
                    ? "bg-[var(--t-bg)] text-[var(--t-ink)] shadow-[0_1px_2px_rgba(0,0,0,0.08)]"
                    : "text-[var(--t-ink-muted)] hover:text-[var(--t-ink)]"
                )}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 rounded-full bg-[var(--t-bg)] hover:bg-[var(--t-surface-muted)] border border-[var(--t-border-subtle)] px-3 py-1 text-[12px] font-medium text-[var(--t-ink-secondary)] cursor-pointer transition-colors"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-[var(--t-success,#137333)]" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              Copy command
            </>
          )}
        </button>
      </div>

      <div className="px-4 py-3.5 flex items-center gap-2.5 font-mono text-[13px] text-[var(--t-ink)] overflow-x-auto bg-[var(--t-bg)]">
        <Terminal className="h-4 w-4 text-[var(--t-ink-muted)] shrink-0" />
        <code className="whitespace-nowrap">{cmd}</code>
      </div>
    </div>
  );
}
