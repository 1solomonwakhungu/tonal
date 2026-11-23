"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun } from "lucide-react";
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
  const [theme, setTheme] = React.useState<"light" | "dark">("light");

  React.useEffect(() => {
    try {
      const saved = window.localStorage.getItem("tonal-theme");
      if (saved === "light" || saved === "dark") {
        setTheme(saved);
      }
    } catch {
      // Ignore storage access errors
    }
  }, []);

  React.useEffect(() => {
    document.documentElement.dataset.tonalTheme = theme;
  }, [theme]);

  const toggleTheme = React.useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      try {
        window.localStorage.setItem("tonal-theme", next);
      } catch {
        // Ignore storage access errors
      }
      return next;
    });
  }, []);

  return (
    <div
      data-tonal-mode={mode}
      data-tonal-theme={theme}
      className="min-h-screen bg-[var(--t-bg)] text-[var(--t-ink)] flex flex-col transition-colors duration-200"
    >
      <header className="sticky top-0 z-40 bg-[var(--t-bg)]/90 backdrop-blur-md border-b border-[var(--t-border-subtle)] transition-colors duration-200">
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

          <div className="flex items-center gap-2">
            <div
              className="inline-flex items-center rounded-full bg-[var(--t-surface-muted)] p-1 border border-[var(--t-border-subtle)]"
              role="group"
              aria-label="Button & accent preset"
            >
              <button
                type="button"
                onClick={() => setMode("gm3")}
                className={cn(
                  "px-3 py-1 rounded-full text-[12px] font-medium cursor-pointer transition-all duration-200",
                  mode === "gm3"
                    ? "bg-[var(--t-elevated)] text-[var(--t-ink)] shadow-[0_1px_2px_rgba(0,0,0,0.14)]"
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
                    ? "bg-[var(--t-elevated)] text-[var(--t-ink)] shadow-[0_1px_2px_rgba(0,0,0,0.14)]"
                    : "text-[var(--t-ink-muted)] hover:text-[var(--t-ink)]"
                )}
              >
                Store Commerce
              </button>
            </div>

            <button
              type="button"
              onClick={toggleTheme}
              aria-label={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
              title={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
              className="inline-flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full bg-[var(--t-surface)] border border-[var(--t-border-subtle)] text-[var(--t-ink-secondary)] hover:text-[var(--t-ink)] hover:bg-[var(--t-surface-muted)] cursor-pointer transition-colors duration-200"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
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
