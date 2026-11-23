"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/", label: "Registry" },
  { href: "/demos/hardware", label: "Lumen Store" },
  { href: "/demos/ai", label: "Aura AI" },
  { href: "/demos/workspace", label: "Canvas Workspace" },
  { href: "/demos/dashboard", label: "Pulse Dashboard" },
];

export function TonalShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mode, setMode] = React.useState<"gm3" | "commerce">("gm3");

  return (
    <div
      data-tonal-mode={mode}
      className="min-h-screen bg-[var(--t-bg)] text-[var(--t-ink)] flex flex-col"
    >
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[var(--t-border-subtle)]">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="flex items-center gap-2.5 text-[17px] font-medium tracking-[-0.02em] text-[var(--t-ink)]"
            >
              <span className="grid grid-cols-2 gap-[3px] w-4 h-4">
                <span className="rounded-full bg-[#4285F4]" />
                <span className="rounded-full bg-[#EA4335]" />
                <span className="rounded-full bg-[#FBBC05]" />
                <span className="rounded-full bg-[#34A853]" />
              </span>
              <span>Tonal</span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "px-3.5 py-1.5 rounded-full text-[13.5px] font-medium transition-colors duration-200",
                      active
                        ? "bg-[var(--t-blue-tint)] text-[var(--t-blue-hover)]"
                        : "text-[var(--t-ink-muted)] hover:text-[var(--t-ink)] hover:bg-[var(--t-surface)]"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div
            className="inline-flex items-center rounded-full bg-[var(--t-surface)] p-1 border border-[var(--t-border-subtle)]"
            role="group"
            aria-label="Button & accent preset"
          >
            <button
              type="button"
              onClick={() => setMode("gm3")}
              className={cn(
                "px-3 py-1 rounded-full text-[12px] font-medium cursor-pointer transition-all duration-200",
                mode === "gm3"
                  ? "bg-white text-[var(--t-ink)] shadow-[0_1px_2px_rgba(32,33,36,0.1)]"
                  : "text-[var(--t-ink-muted)] hover:text-[var(--t-ink)]"
              )}
            >
              GM3 Pills
            </button>
            <button
              type="button"
              onClick={() => setMode("commerce")}
              className={cn(
                "px-3 py-1 rounded-full text-[12px] font-medium cursor-pointer transition-all duration-200",
                mode === "commerce"
                  ? "bg-white text-[var(--t-ink)] shadow-[0_1px_2px_rgba(32,33,36,0.1)]"
                  : "text-[var(--t-ink-muted)] hover:text-[var(--t-ink)]"
              )}
            >
              Store Commerce
            </button>
          </div>
        </div>

        {/* Mobile route switcher */}
        <div className="md:hidden flex items-center gap-1.5 overflow-x-auto px-5 pb-2.5">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "shrink-0 px-3 py-1 rounded-full text-[12.5px] font-medium",
                  active
                    ? "bg-[var(--t-blue-tint)] text-[var(--t-blue-hover)]"
                    : "text-[var(--t-ink-muted)] bg-[var(--t-surface)]"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-[var(--t-border-subtle)] mt-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[13px] text-[var(--t-ink-muted)]">
          <div className="flex items-center gap-2">
            <span className="font-medium text-[var(--t-ink)]">Tonal</span>
            <span>·</span>
            <span>Google Store–inspired shadcn registry</span>
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <a
              href="/r/registry.json"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[var(--t-ink)] transition-colors"
            >
              /r/registry.json
            </a>
            <Link href="/demos/hardware" className="hover:text-[var(--t-ink)]">
              Lumen Store
            </Link>
            <Link href="/demos/ai" className="hover:text-[var(--t-ink)]">
              Aura AI
            </Link>
            <Link href="/demos/workspace" className="hover:text-[var(--t-ink)]">
              Canvas Workspace
            </Link>
            <Link href="/demos/dashboard" className="hover:text-[var(--t-ink)]">
              Pulse Dashboard
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
