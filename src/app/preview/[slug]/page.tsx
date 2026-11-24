import * as React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCatalogItem, REGISTRY_CATALOG } from "@/lib/registry-catalog";
import { PreviewFrameClient } from "@/components/preview-frame-client";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return REGISTRY_CATALOG.map((item) => ({ slug: item.slug }));
}

export default async function PreviewFramePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = getCatalogItem(slug);
  if (!meta) notFound();

  return (
    <React.Suspense
      fallback={
        <div className="p-6 text-[13px] text-[var(--t-ink-muted)]">
          Loading preview...
        </div>
      }
    >
      <PreviewFrameClient slug={slug} />
    </React.Suspense>
  );
}
