"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { RegistryPreview } from "@/components/registry-preview";

export function PreviewFrameClient({ slug }: { slug: string }) {
  const searchParams = useSearchParams();
  const theme = searchParams?.get("theme") === "dark" ? "dark" : "light";
  const mode = searchParams?.get("mode") === "commerce" ? "commerce" : "pill";

  React.useEffect(() => {
    document.documentElement.dataset.tonalTheme = theme;
    document.documentElement.dataset.tonalMode = mode;
  }, [theme, mode]);

  return (
    <div
      data-tonal-theme={theme}
      data-tonal-mode={mode}
      className="min-h-screen bg-[var(--t-bg)] text-[var(--t-ink)] p-4 sm:p-6"
    >
      <RegistryPreview slug={slug} />
    </div>
  );
}
