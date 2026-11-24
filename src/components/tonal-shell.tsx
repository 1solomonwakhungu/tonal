"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Activity,
  Box,
  Layers,
  Moon,
  Palette,
  Search,
  SlidersHorizontal,
  Smartphone,
  Sparkles,
  Sun,
} from "lucide-react";
import { TonalToastProvider } from "@registry/tonal/toast";
import { TonalCommand, type CommandItem } from "@registry/tonal/command";
import { REGISTRY_CATALOG } from "@/lib/registry-catalog";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/", label: "Registry" },
  { href: "/studio", label: "Studio" },
  { href: "/demos/hardware", label: "Lumen Store" },
  { href: "/demos/ai", label: "Aura AI" },
  { href: "/demos/workspace", label: "Canvas" },
  { href: "/demos/dashboard", label: "Pulse" },
];

export function TonalShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mode, setMode] = React.useState<"pill" | "commerce">("pill");
  const [theme, setTheme] = React.useState<"light" | "dark">("light");
  const [commandOpen, setCommandOpen] = React.useState(false);

  const isBarePreview = pathname?.startsWith("/preview/");

  React.useEffect(() => {
    try {
      const ds = document.documentElement.dataset;
      if (ds.tonalTheme === "dark" || ds.tonalTheme === "light") {
        setTheme(ds.tonalTheme);
      } else {
        const savedTheme = window.localStorage.getItem("tonal-theme");
        if (savedTheme === "dark" || savedTheme === "light") {
          setTheme(savedTheme);
        } else if (
          window.matchMedia?.("(prefers-color-scheme: dark)").matches
        ) {
          setTheme("dark");
        }
      }

      if (ds.tonalMode === "commerce" || ds.tonalMode === "pill") {
        setMode(ds.tonalMode);
      } else {
        const savedMode = window.localStorage.getItem("tonal-mode");
        if (savedMode === "commerce" || savedMode === "pill") {
          setMode(savedMode);
        }
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  React.useEffect(() => {
    if (isBarePreview) return;
    document.documentElement.dataset.tonalTheme = theme;
    document.documentElement.dataset.tonalMode = mode;
  }, [theme, mode, isBarePreview]);

  const updateMode = React.useCallback((next: "pill" | "commerce") => {
    setMode(next);
    try {
      window.localStorage.setItem("tonal-mode", next);
    } catch {
      // Ignore
    }
  }, []);

  const toggleTheme = React.useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      try {
        window.localStorage.setItem("tonal-theme", next);
      } catch {
        // Ignore
      }
      return next;
    });
  }, []);

  React.useEffect(() => {
    if (isBarePreview) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isBarePreview]);

  const commandItems: CommandItem[] = React.useMemo(
    () => [
      {
        id: "action-theme",
        label:
          theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode",
        description: "Toggle editorial light/dark tonal surfaces",
        group: "Quick Actions",
        icon: theme === "dark" ? Sun : Moon,
        keywords: ["theme", "dark", "light", "appearance"],
        onSelect: toggleTheme,
      },
      {
        id: "action-mode",
        label:
          mode === "pill"
            ? "Switch to Commerce Mode (6px)"
            : "Switch to Soft Pill Mode (9999px)",
        description: "Swap button corners and primary CTA ink",
        group: "Quick Actions",
        icon: SlidersHorizontal,
        keywords: ["pill", "commerce", "radius", "mode"],
        onSelect: () => updateMode(mode === "pill" ? "commerce" : "pill"),
      },
      {
        id: "nav-studio",
        label: "Tonal Theme Studio",
        description: "Remix accent palettes, radii & export tokens.css",
        group: "Pages & Demos",
        icon: Palette,
        keywords: ["tokens", "colors", "studio", "contrast", "wcag"],
        onSelect: () => router.push("/studio"),
      },
      {
        id: "demo-hardware",
        label: "Lumen Store (Hardware Demo)",
        description: "Editorial finish hero, slide-over bag & specs table",
        group: "Pages & Demos",
        icon: Smartphone,
        onSelect: () => router.push("/demos/hardware"),
      },
      {
        id: "demo-ai",
        label: "Aura AI (AI Product Demo)",
        description: "Capability switcher & 2-tier pricing grid",
        group: "Pages & Demos",
        icon: Sparkles,
        onSelect: () => router.push("/demos/ai"),
      },
      {
        id: "demo-workspace",
        label: "Canvas Workspace (SaaS Demo)",
        description: "Segmented app switcher, share modal & quote bento",
        group: "Pages & Demos",
        icon: Layers,
        onSelect: () => router.push("/demos/workspace"),
      },
      {
        id: "demo-dashboard",
        label: "Pulse Console (Dashboard Demo)",
        description: "Tonal app shell, KPI grid, area chart & data table",
        group: "Pages & Demos",
        icon: Activity,
        onSelect: () => router.push("/demos/dashboard"),
      },
      ...REGISTRY_CATALOG.map((item) => ({
        id: `comp-${item.slug}`,
        label: item.title,
        description: item.description,
        group:
          item.category === "primitives"
            ? "Primitives"
            : item.category === "blocks"
              ? "Blocks"
              : "Tokens",
        icon: Box,
        keywords: [item.slug, item.category],
        onSelect: () => router.push(`/components/${item.slug}`),
      })),
    ],
    [mode, theme, toggleTheme, updateMode, router]
  );

  if (isBarePreview) {
    return (
      <TonalToastProvider>
        <div className="min-h-screen bg-[var(--t-bg)] text-[var(--t-ink)]">
          {children}
        </div>
      </TonalToastProvider>
    );
  }

  return (
    <TonalToastProvider>
      <div
        data-tonal-mode={mode}
        data-tonal-theme={theme}
        className="min-h-screen bg-[var(--t-bg)] text-[var(--t-ink)] flex flex-col transition-colors duration-200"
      >
        <header className="sticky top-0 z-40 bg-[var(--t-bg)]/90 backdrop-blur-md border-b border-[var(--t-border-subtle)] transition-colors duration-200">
          <div className="mx-auto max-w-6xl px-5 sm:px-8 h-16 flex items-center justify-between gap-3">
            <div className="flex items-center gap-5 min-w-0">
              <Link
                href="/"
                className="flex items-center gap-2.5 text-[17px] font-medium tracking-[-0.02em] text-[var(--t-ink)] shrink-0"
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

              <nav className="hidden lg:flex items-center gap-0.5">
                {NAV_ITEMS.map((item) => {
                  const active =
                    item.href === "/"
                      ? pathname === "/" || pathname?.startsWith("/components/")
                      : pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-[13.5px] font-medium transition-colors duration-200",
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

            <div className="flex items-center gap-2 shrink-0">
              {/* ⌘K Search Trigger */}
              <button
                type="button"
                onClick={() => setCommandOpen(true)}
                aria-label="Open command palette"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--t-surface)] hover:bg-[var(--t-surface-muted)] border border-[var(--t-border-subtle)] px-3 h-8 sm:h-9 text-[12.5px] text-[var(--t-ink-muted)] hover:text-[var(--t-ink)] cursor-pointer transition-colors"
              >
                <Search className="h-3.5 w-3.5 shrink-0" />
                <span className="hidden sm:inline">Search</span>
                <kbd className="hidden sm:inline-flex items-center rounded bg-[var(--t-bg)] border border-[var(--t-border-subtle)] px-1.5 py-0.2 text-[10.5px] font-mono text-[var(--t-ink-muted)]">
                  ⌘K
                </kbd>
              </button>

              {/* Soft Pill / Commerce Switch */}
              <div
                className="inline-flex items-center rounded-full bg-[var(--t-surface-muted)] p-1 border border-[var(--t-border-subtle)]"
                role="group"
                aria-label="Button & accent preset"
              >
                <button
                  type="button"
                  onClick={() => updateMode("pill")}
                  className={cn(
                    "px-2.5 sm:px-3 py-1 rounded-full text-[12px] font-medium cursor-pointer transition-all duration-200",
                    mode === "pill"
                      ? "bg-[var(--t-elevated)] text-[var(--t-ink)] shadow-[0_1px_2px_rgba(0,0,0,0.14)]"
                      : "text-[var(--t-ink-muted)] hover:text-[var(--t-ink)]"
                  )}
                >
                  Soft Pill
                </button>
                <button
                  type="button"
                  onClick={() => updateMode("commerce")}
                  className={cn(
                    "px-2.5 sm:px-3 py-1 rounded-full text-[12px] font-medium cursor-pointer transition-all duration-200",
                    mode === "commerce"
                      ? "bg-[var(--t-elevated)] text-[var(--t-ink)] shadow-[0_1px_2px_rgba(0,0,0,0.14)]"
                      : "text-[var(--t-ink-muted)] hover:text-[var(--t-ink)]"
                  )}
                >
                  Commerce
                </button>
              </div>

              {/* Light / Dark Toggle */}
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

          {/* Mobile / Tablet route switcher */}
          <div className="lg:hidden flex items-center gap-1.5 overflow-x-auto px-5 pb-2.5">
            {NAV_ITEMS.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/" || pathname?.startsWith("/components/")
                  : pathname === item.href;
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
              <span>Editorial tonal UI · shadcn registry v0.2</span>
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
              <Link href="/studio" className="hover:text-[var(--t-ink)]">
                Theme Studio
              </Link>
              <Link href="/demos/hardware" className="hover:text-[var(--t-ink)]">
                Lumen Store
              </Link>
              <Link href="/demos/ai" className="hover:text-[var(--t-ink)]">
                Aura AI
              </Link>
              <Link
                href="/demos/workspace"
                className="hover:text-[var(--t-ink)]"
              >
                Canvas Workspace
              </Link>
              <Link
                href="/demos/dashboard"
                className="hover:text-[var(--t-ink)]"
              >
                Pulse Dashboard
              </Link>
            </div>
          </div>
        </footer>

        <TonalCommand
          open={commandOpen}
          onOpenChange={setCommandOpen}
          items={commandItems}
        />
      </div>
    </TonalToastProvider>
  );
}
