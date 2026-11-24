import * as React from "react";
import type { Metadata } from "next";
import { ThemeStudioClient } from "@/components/theme-studio-client";

export const metadata: Metadata = {
  title: "Theme Studio",
  description:
    "Remix Tonal accent hues, surface warmth, card radii, and Soft Pill vs. Commerce presets with live WCAG contrast checks and tokens.css export.",
  alternates: { canonical: "/studio" },
};

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
