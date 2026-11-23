"use client";

import * as React from "react";
import { Check, Copy, Terminal } from "lucide-react";

export function CodePreviewCard({
  title,
  description,
  registryName,
  code,
  children,
}: {
  title: string;
  description: string;
  registryName: string;
  code: string;
  children: React.ReactNode;
}) {
  const [tab, setTab] = React.useState<"preview" | "code">("preview");
  const [copiedCli, setCopiedCli] = React.useState(false);
  const [copiedCode, setCopiedCode] = React.useState(false);

  const cliCmd = `npx shadcn@latest add http://localhost:3456/r/${registryName}.json`;

  const copyText = (text: string, setter: (v: boolean) => void) => {
    navigator.clipboard?.writeText(text).catch(() => {});
    setter(true);
    setTimeout(() => setter(false), 1600);
  };

  return (
    <div className="rounded-[var(--t-radius-card)] border border-[var(--t-border-subtle)] bg-white overflow-hidden">
      <div className="px-6 py-4 border-b border-[var(--t-border-subtle)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-[16px] font-medium tracking-[-0.015em] text-[var(--t-ink)]">
            {title}
          </h3>
          <p className="text-[13px] text-[var(--t-ink-muted)]">{description}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => copyText(cliCmd, setCopiedCli)}
            className="inline-flex items-center gap-1.5 rounded-full bg-[var(--t-surface)] hover:bg-[var(--t-surface-muted)] px-3 py-1.5 text-[12px] font-mono text-[var(--t-ink-secondary)] cursor-pointer transition-colors"
            title={cliCmd}
          >
            <Terminal className="h-3.5 w-3.5 text-[var(--t-ink-muted)]" />
            <span>{copiedCli ? "Copied CLI!" : `/r/${registryName}.json`}</span>
            {copiedCli ? (
              <Check className="h-3.5 w-3.5 text-[#188038]" />
            ) : (
              <Copy className="h-3.5 w-3.5 text-[var(--t-ink-muted)]" />
            )}
          </button>

          <div className="inline-flex rounded-full bg-[var(--t-surface)] p-0.5 border border-[var(--t-border-subtle)]">
            <button
              type="button"
              onClick={() => setTab("preview")}
              className={`px-3 py-1 rounded-full text-[12px] font-medium cursor-pointer transition-colors ${
                tab === "preview"
                  ? "bg-white text-[var(--t-ink)] shadow-[0_1px_2px_rgba(0,0,0,0.08)]"
                  : "text-[var(--t-ink-muted)]"
              }`}
            >
              Preview
            </button>
            <button
              type="button"
              onClick={() => setTab("code")}
              className={`px-3 py-1 rounded-full text-[12px] font-medium cursor-pointer transition-colors ${
                tab === "code"
                  ? "bg-white text-[var(--t-ink)] shadow-[0_1px_2px_rgba(0,0,0,0.08)]"
                  : "text-[var(--t-ink-muted)]"
              }`}
            >
              Code
            </button>
          </div>
        </div>
      </div>

      {tab === "preview" ? (
        <div className="p-6 sm:p-8 bg-white">{children}</div>
      ) : (
        <div className="relative bg-[#1f2023] text-[#e8eaed] p-5 overflow-x-auto">
          <button
            type="button"
            onClick={() => copyText(code, setCopiedCode)}
            className="absolute top-3.5 right-3.5 inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/15 px-3 py-1 text-[11.5px] font-medium text-white cursor-pointer"
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
          <pre className="text-[12.5px] leading-[1.6] font-mono pr-16">
            <code>{code}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
