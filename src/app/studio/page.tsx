import * as React from "react";
import { ThemeStudioClient } from "@/components/theme-studio-client";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Theme Studio",
  ogTitle: "Theme Studio — Tonal",
  description:
    "Remix Tonal accent hues, surface warmth, card radii, and Soft Pill vs. Commerce presets with live WCAG contrast checks and tokens.css export.",
  path: "/studio",
});

export default function StudioPage() {
  return (
    <React.Suspense
      fallback={
        <div className="mx-auto max-w-6xl px-5 sm:px-8 pt-10 text-[14px] text-[var(--t-ink-muted)]">
          Loading Theme Studio...
        </div>
      }
    >
      <ThemeStudioClient />
    </React.Suspense>
  );
}
