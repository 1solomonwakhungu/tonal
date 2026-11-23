import * as React from "react";
import { Check } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { SurfaceTile } from "../surface-tile";
import { TonalButton } from "../button";
import { TonalChip } from "../chip";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface PricingTier {
  id: string;
  name: string;
  description: string;
  price: string;
  period?: string;
  badge?: string;
  highlighted?: boolean;
  features: string[];
  ctaLabel: string;
  onSelect?: () => void;
}

export const DEFAULT_PRICING_TIERS: PricingTier[] = [
  {
    id: "free",
    name: "Aura",
    description: "Everyday writing, research, and coding help.",
    price: "$0",
    period: "/ month",
    highlighted: false,
    features: [
      "Access to Aura Fast model",
      "Upload documents and images",
      "Sync across web and mobile",
    ],
    ctaLabel: "Get started free",
  },
  {
    id: "pro",
    name: "Aura Pro",
    description: "Our flagship reasoning model with 2M context.",
    price: "$20",
    period: "/ month",
    badge: "Recommended",
    highlighted: true,
    features: [
      "Aura 2.5 Pro with deep reasoning",
      "2 million token context window",
      "Priority throughput & API credits",
    ],
    ctaLabel: "Upgrade to Pro",
  },
];

export interface PricingGridProps {
  eyebrow?: string;
  headline?: string;
  showHeader?: boolean;
  tiers?: PricingTier[];
  onSelectTier?: (tier: PricingTier) => void;
  className?: string;
}

export function PricingGrid({
  eyebrow = "Simple plans",
  headline = "Start free. Upgrade when you need more.",
  showHeader = true,
  tiers = DEFAULT_PRICING_TIERS,
  onSelectTier,
  className,
}: PricingGridProps) {
  return (
    <section
      className={cn("max-w-4xl mx-auto w-full flex flex-col gap-6", className)}
    >
      {showHeader && (eyebrow || headline) && (
        <div className="text-center">
          {eyebrow && (
            <p className="text-[13px] font-medium text-[var(--t-ink-muted)] mb-1">
              {eyebrow}
            </p>
          )}
          {headline && (
            <h2 className="t-headline text-[30px] sm:text-[38px]">
              {headline}
            </h2>
          )}
        </div>
      )}

      <div
        className={cn(
          "grid grid-cols-1 gap-6",
          tiers.length >= 3 ? "md:grid-cols-3" : "md:grid-cols-2"
        )}
      >
        {tiers.map((tier) => (
          <SurfaceTile
            key={tier.id}
            tone={tier.highlighted ? "cool" : "white"}
            bordered={!tier.highlighted}
            padding="lg"
            className="flex flex-col justify-between gap-8"
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-1">
                <h3 className="t-headline text-[24px]">{tier.name}</h3>
                {tier.badge && <TonalChip tone="blue">{tier.badge}</TonalChip>}
              </div>
              <p className="t-body text-[14px] mb-5">{tier.description}</p>
              <div className="text-[40px] font-medium tracking-[-0.035em] text-[var(--t-ink)] mb-6">
                {tier.price}
                {tier.period && (
                  <span className="text-[15px] font-normal text-[var(--t-ink-muted)]">
                    {" "}
                    {tier.period}
                  </span>
                )}
              </div>
              <ul className="flex flex-col gap-3 text-[14px] text-[var(--t-ink-secondary)]">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2.5">
                    <Check
                      aria-hidden="true"
                      className="h-4 w-4 text-[var(--t-blue)] shrink-0"
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <TonalButton
              variant={tier.highlighted ? "primary" : "outline"}
              className="w-full"
              onClick={
                tier.onSelect || onSelectTier
                  ? () => {
                      tier.onSelect?.();
                      onSelectTier?.(tier);
                    }
                  : undefined
              }
            >
              {tier.ctaLabel}
            </TonalButton>
          </SurfaceTile>
        ))}
      </div>
    </section>
  );
}
