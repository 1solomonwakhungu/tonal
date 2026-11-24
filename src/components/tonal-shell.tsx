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
  const [mode, setMode] = React.useState<"pill" | "commerce">("pill");
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
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-5 w-5 shrink-0"
              >
                <circle cx="9.5" cy="12" r="6.5" fill="var(--t-ink)" />
                <circle
                  cx="15"
                  cy="12"
                  r="6.5"
                  fill="var(--t-blue)"
                  fillOpacity="0.82"
                />
              </svg>
              <span>Tonal</span>
            </Link>

            <nav aria-label="Primary" className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "px-3.5 py-1.5 rounded-full text-[13.5px] font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--t-blue)]",
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
                aria-pressed={mode === "pill"}
                onClick={() => setMode("pill")}
                className={cn(
                  "px-3 py-1 rounded-full text-[12px] font-medium cursor-pointer transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--t-blue)]",
                  mode === "pill"
                    ? "bg-[var(--t-elevated)] text-[var(--t-ink)] shadow-[0_1px_2px_rgba(0,0,0,0.14)]"
                    : "text-[var(--t-ink-muted)] hover:text-[var(--t-ink)]"
                )}
              >
                Soft Pill
              </button>
              <button
                type="button"
                aria-pressed={mode === "commerce"}
                onClick={() => setMode("commerce")}
                className={cn(
                  "px-3 py-1 rounded-full text-[12px] font-medium cursor-pointer transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--t-blue)]",
                  mode === "commerce"
                    ? "bg-[var(--t-elevated)] text-[var(--t-ink)] shadow-[0_1px_2px_rgba(0,0,0,0.14)]"
                    : "text-[var(--t-ink-muted)] hover:text-[var(--t-ink)]"
                )}
              >
                Commerce
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
              className="inline-flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full bg-[var(--t-surface)] border border-[var(--t-border-subtle)] text-[var(--t-ink-secondary)] hover:text-[var(--t-ink)] hover:bg-[var(--t-surface-muted)] cursor-pointer transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--t-blue)]"
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
        <nav
          aria-label="Mobile navigation"
          className="md:hidden flex items-center gap-1.5 overflow-x-auto px-5 pb-2.5"
        >
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
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
        </nav>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-[var(--t-border-subtle)] mt-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[13px] text-[var(--t-ink-muted)]">
          <div className="flex items-center gap-2">
            <span className="font-medium text-[var(--t-ink)]">Tonal</span>
            <span>·</span>
            <span>Editorial tonal UI · shadcn registry</span>
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <a
              href="https://github.com/1solomonwakhungu/tonal"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[var(--t-ink)] transition-colors"
            >
              GitHub
            </a>
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
