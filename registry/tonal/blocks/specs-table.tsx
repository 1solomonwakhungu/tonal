import * as React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface SpecRow {
  label: string;
  values: string[];
}

export const DEFAULT_SPEC_MODELS: string[] = ["Lumen 10 Pro", "Lumen 10"];

export const DEFAULT_SPEC_ROWS: SpecRow[] = [
  {
    label: "Display",
    values: [
      '6.7" Pro LTPO OLED · 1–120Hz',
      '6.3" LTPO OLED · 60–120Hz',
    ],
  },
  {
    label: "Camera",
    values: [
      "Triple Pro · 50MP + 48MP + 5x Tele",
      "Dual Advanced · 50MP + 48MP",
    ],
  },
  {
    label: "Chip",
    values: ["Lumen Silicon G5 · 16 GB RAM", "Lumen Silicon G5 · 12 GB RAM"],
  },
  {
    label: "Battery",
    values: [
      "Up to 32 hours · 45W fast charge",
      "Up to 28 hours · 35W fast charge",
    ],
  },
  {
    label: "Build",
    values: [
      "Matte satin glass · Recycled aluminum",
      "Polished glass · Recycled aluminum",
    ],
  },
];

export interface SpecsTableProps {
  title?: string;
  featureLabel?: string;
  models?: string[];
  rows?: SpecRow[];
  highlightFirstModel?: boolean;
  className?: string;
}

export function SpecsTable({
  title = "Compare Lumen 10 models",
  featureLabel = "Feature",
  models = DEFAULT_SPEC_MODELS,
  rows = DEFAULT_SPEC_ROWS,
  highlightFirstModel = true,
  className,
}: SpecsTableProps) {
  return (
    <section className={cn("flex flex-col gap-6", className)}>
      {title && (
        <h2 className="t-headline text-[28px] sm:text-[34px]">{title}</h2>
      )}

      <div className="rounded-[var(--t-radius-card)] border border-[var(--t-border-subtle)] overflow-hidden bg-[var(--t-bg)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[480px]">
            <thead>
              <tr className="bg-[var(--t-surface)] text-[13px] font-medium text-[var(--t-ink-muted)] border-b border-[var(--t-border-subtle)]">
                <th
                  scope="col"
                  className="py-4 px-6 font-medium text-[var(--t-ink-muted)] w-1/4 min-w-[130px]"
                >
                  {featureLabel}
                </th>
                {models.map((model) => (
                  <th
                    key={model}
                    scope="col"
                    className="py-4 px-6 font-medium text-[var(--t-ink)]"
                  >
                    {model}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--t-border-subtle)] text-[14px]">
              {rows.map((row) => (
                <tr
                  key={row.label}
                  className="hover:bg-[var(--t-surface)]/50 transition-colors duration-150"
                >
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-[var(--t-ink-muted)] align-top"
                  >
                    {row.label}
                  </th>
                  {models.map((model, idx) => (
                    <td
                      key={`${row.label}-${model}`}
                      className={cn(
                        "py-4 px-6 align-top",
                        highlightFirstModel && idx === 0
                          ? "text-[var(--t-ink)]"
                          : "text-[var(--t-ink-secondary)]"
                      )}
                    >
                      {row.values[idx] ?? "—"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
