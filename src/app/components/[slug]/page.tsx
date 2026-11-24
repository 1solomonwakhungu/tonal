import * as React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Package } from "lucide-react";
import { TonalChip } from "@registry/tonal/chip";
import { CodePreviewCard } from "@/components/code-preview-card";
import { RegistryPreview } from "@/components/registry-preview";
import { ComponentInstallTabs } from "@/components/component-install-tabs";
import { getCatalogItem, REGISTRY_CATALOG } from "@/lib/registry-catalog";
import { createPageMetadata } from "@/lib/page-metadata";
import {
  getRegistryItemSourceWithHighlight,
  highlightCode,
} from "@/lib/registry-source";

export function generateStaticParams() {
  return REGISTRY_CATALOG.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = getCatalogItem(slug);
  if (!meta) return { title: "Component not found" };

  return createPageMetadata({
    title: meta.title,
    ogTitle: `${meta.title} — Tonal`,
    description: meta.description,
    path: `/components/${meta.slug}`,
  });
}

export default async function ComponentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = getCatalogItem(slug);
  const source = await getRegistryItemSourceWithHighlight(slug);

  if (!meta || !source) {
    notFound();
  }

  const usageHtml = await highlightCode(
    meta.usage,
    meta.slug === "tonal-tokens" ? "css" : "tsx"
  );

  const currentIdx = REGISTRY_CATALOG.findIndex((c) => c.slug === slug);
  const prevItem = currentIdx > 0 ? REGISTRY_CATALOG[currentIdx - 1] : null;
  const nextItem =
    currentIdx >= 0 && currentIdx < REGISTRY_CATALOG.length - 1
      ? REGISTRY_CATALOG[currentIdx + 1]
      : null;

  return (
    <div className="mx-auto max-w-5xl px-5 sm:px-8 pt-8 sm:pt-10 flex flex-col gap-10">
      {/* Breadcrumb & Header */}
      <div className="flex flex-col gap-4">
        <Link
          href="/#primitives"
          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[var(--t-ink-muted)] hover:text-[var(--t-ink)] self-start"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          All registry items
        </Link>

        <div className="flex flex-wrap items-center gap-2.5">
          <TonalChip tone="blue" className="capitalize">
            {meta.category}
          </TonalChip>
          <span className="text-[12px] font-mono text-[var(--t-ink-muted)]">
            /r/{meta.slug}.json
          </span>
        </div>

        <h1 className="t-display text-[36px] sm:text-[48px]">{meta.title}</h1>
        <p className="t-body text-[16px] max-w-2xl">{meta.description}</p>
      </div>

      {/* Live Preview + Highlighted Source */}
      <CodePreviewCard
        title={meta.title}
        description="Toggle Tablet or Mobile for real isolated iframe breakpoints, or switch to Code for full source."
        registryName={meta.slug}
        code={source.code}
        highlightedHtml={source.highlightedHtml}
        filePath={source.files[0]?.path}
        dependencies={source.dependencies}
        registryDependencies={source.registryDependencies}
        showDocsLink={false}
      >
        <RegistryPreview slug={meta.slug} />
      </CodePreviewCard>

      {/* Install CLI */}
      <section className="flex flex-col gap-3">
        <h2 className="t-headline text-[22px]">Installation</h2>
        <ComponentInstallTabs slug={meta.slug} />
      </section>

      {/* Dependencies */}
      {(source.registryDependencies.length > 0 ||
        source.dependencies.length > 0) && (
        <section className="flex flex-col gap-3">
          <h2 className="t-headline text-[22px]">Dependencies</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-[20px] border border-[var(--t-border-subtle)] bg-[var(--t-surface)] p-5 flex flex-col gap-3">
              <div className="text-[12px] font-medium uppercase tracking-wider text-[var(--t-ink-muted)]">
                Tonal Registry Dependencies
              </div>
              {source.registryDependencies.length === 0 ? (
                <p className="text-[13.5px] text-[var(--t-ink-muted)]">
                  Standalone — no internal registry dependencies.
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {source.registryDependencies.map((dep) => {
                    const depSlug = dep
                      .replace(/^https?:\/\/.*\/r\//, "")
                      .replace(/\.json$/, "");
                    return (
                      <Link
                        key={dep}
                        href={`/components/${depSlug}`}
                        className="inline-flex items-center gap-1.5 rounded-full bg-[var(--t-blue-tint)] text-[var(--t-blue-hover)] px-3 py-1 text-[12.5px] font-mono hover:underline"
                      >
                        @{depSlug}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="rounded-[20px] border border-[var(--t-border-subtle)] bg-[var(--t-surface)] p-5 flex flex-col gap-3">
              <div className="text-[12px] font-medium uppercase tracking-wider text-[var(--t-ink-muted)]">
                npm Packages
              </div>
              {source.dependencies.length === 0 ? (
                <p className="text-[13.5px] text-[var(--t-ink-muted)]">
                  Zero runtime npm dependencies.
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {source.dependencies.map((pkg) => (
                    <span
                      key={pkg}
                      className="inline-flex items-center gap-1.5 rounded-full bg-[var(--t-bg)] border border-[var(--t-border-subtle)] text-[var(--t-ink-secondary)] px-3 py-1 text-[12.5px] font-mono"
                    >
                      <Package className="h-3.5 w-3.5 text-[var(--t-ink-muted)]" />
                      {pkg}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Usage Example */}
      <section className="flex flex-col gap-3">
        <h2 className="t-headline text-[22px]">Usage</h2>
        <div className="rounded-[20px] overflow-hidden border border-[var(--t-border-subtle)] bg-[#0d1117] p-5 overflow-x-auto">
          <div
            className="text-[13px] leading-[1.6] font-mono [&>pre]:!bg-transparent [&>pre]:!m-0 [&>pre]:!p-0"
            dangerouslySetInnerHTML={{ __html: usageHtml }}
          />
        </div>
      </section>

      {/* Props Reference */}
      {meta.props.length > 0 && (
        <section className="flex flex-col gap-3">
          <h2 className="t-headline text-[22px]">Props &amp; Tokens API</h2>
          <div className="rounded-[20px] border border-[var(--t-border-subtle)] bg-[var(--t-bg)] overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[560px]">
              <thead>
                <tr className="bg-[var(--t-surface)] text-[12px] font-medium text-[var(--t-ink-muted)] border-b border-[var(--t-border-subtle)]">
                  <th className="py-3 px-4">Prop</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Default</th>
                  <th className="py-3 px-4">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--t-border-subtle)] text-[13.5px]">
                {meta.props.map((prop) => (
                  <tr key={prop.name}>
                    <td className="py-3.5 px-4 font-mono text-[12.5px] font-medium text-[var(--t-ink)]">
                      {prop.name}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[12px] text-[var(--t-blue)]">
                      {prop.type}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[12px] text-[var(--t-ink-muted)]">
                      {prop.defaultValue ?? "—"}
                    </td>
                    <td className="py-3.5 px-4 text-[var(--t-ink-secondary)]">
                      {prop.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Prev / Next Navigation */}
      <nav
        aria-label="Component pagination"
        className="pt-6 border-t border-[var(--t-border-subtle)] flex items-center justify-between gap-4"
      >
        {prevItem ? (
          <Link
            href={`/components/${prevItem.slug}`}
            className="inline-flex items-center gap-2 text-[14px] font-medium text-[var(--t-ink-secondary)] hover:text-[var(--t-blue)]"
          >
            <ArrowLeft className="h-4 w-4" />
            {prevItem.title}
          </Link>
        ) : (
          <span />
        )}
        {nextItem ? (
          <Link
            href={`/components/${nextItem.slug}`}
            className="inline-flex items-center gap-2 text-[14px] font-medium text-[var(--t-ink-secondary)] hover:text-[var(--t-blue)]"
          >
            {nextItem.title}
            <ArrowRight className="h-4 w-4" />
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
}
