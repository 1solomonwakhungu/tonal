"use client";

import * as React from "react";
import { ShoppingBag, Trash2 } from "lucide-react";
import { EditorialHero } from "@registry/tonal/blocks/editorial-hero";
import { SpecsTable } from "@registry/tonal/blocks/specs-table";
import { SurfaceTile } from "@registry/tonal/surface-tile";
import { TonalButton } from "@registry/tonal/button";
import { TonalChip } from "@registry/tonal/chip";
import { ChevronLink } from "@registry/tonal/chevron-link";
import { TonalAccordion } from "@registry/tonal/accordion";
import { TonalDialog } from "@registry/tonal/dialog";
import { useTonalToast } from "@registry/tonal/toast";

interface ProductItem {
  id: string;
  name: string;
  tagline: string;
  price: number;
  priceLabel: string;
  tone: "neutral" | "cool" | "warm";
  shape: "phone" | "watch" | "buds";
  badge: string;
}

const FLAGSHIP_PRODUCT: ProductItem = {
  id: "lumen-10-pro",
  name: "Lumen 10 Pro",
  tagline: "Sculpted matte glass flagship.",
  price: 999,
  priceLabel: "From $999",
  tone: "warm",
  shape: "phone",
  badge: "Flagship",
};

const PRODUCTS: ProductItem[] = [
  {
    id: "lumen-10",
    name: "Lumen 10",
    tagline: "Everyday flagship.",
    price: 799,
    priceLabel: "From $799",
    tone: "neutral",
    shape: "phone",
    badge: "Popular",
  },
  {
    id: "lumen-watch-4",
    name: "Lumen Watch 4",
    tagline: "Sculpted glass. Precision health.",
    price: 349,
    priceLabel: "From $349",
    tone: "cool",
    shape: "watch",
    badge: "New",
  },
  {
    id: "lumen-buds-pro",
    name: "Lumen Buds Pro",
    tagline: "Studio-quiet active noise cancelation.",
    price: 229,
    priceLabel: "$229",
    tone: "warm",
    shape: "buds",
    badge: "Updated",
  },
];

const ALL_CATALOG_PRODUCTS: ProductItem[] = [FLAGSHIP_PRODUCT, ...PRODUCTS];

export default function HardwareDemoPage() {
  const { toast } = useTonalToast();
  const [bag, setBag] = React.useState<Record<string, number>>({});
  const [bagOpen, setBagOpen] = React.useState(false);

  const bagItems = React.useMemo(
    () =>
      Object.entries(bag)
        .filter(([, qty]) => qty > 0)
        .map(([id, qty]) => ({
          product: ALL_CATALOG_PRODUCTS.find((p) => p.id === id)!,
          qty,
        }))
        .filter((entry) => Boolean(entry.product)),
    [bag]
  );

  const cartCount = bagItems.reduce((sum, entry) => sum + entry.qty, 0);
  const subtotal = bagItems.reduce(
    (sum, entry) => sum + entry.product.price * entry.qty,
    0
  );

  const addToBag = (product: ProductItem, openDrawer = false) => {
    setBag((prev) => ({ ...prev, [product.id]: (prev[product.id] ?? 0) + 1 }));
    if (openDrawer) {
      setBagOpen(true);
    } else {
      toast({
        title: `Added ${product.name}`,
        description: `${product.priceLabel} · Tap Bag to review your items.`,
        tone: "success",
      });
    }
  };

  const removeFromBag = (id: string) => {
    setBag((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 pt-8 flex flex-col gap-16">
      {/* Sub-header simulating a dedicated Storefront */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-[var(--t-border-subtle)]">
        <div className="flex items-center gap-3">
          <span className="text-[19px] font-medium tracking-[-0.02em] text-[var(--t-ink)]">
            Lumen Store
          </span>
          <TonalChip tone="neutral">Demo Website 1 / 4</TonalChip>
        </div>
        <nav
          aria-label="Storefront sections"
          className="flex items-center gap-4 text-[13.5px] text-[var(--t-ink-muted)]"
        >
          <a
            href="#lineup"
            className="hover:text-[var(--t-ink)] rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--t-blue)]"
          >
            Lineup
          </a>
          <a
            href="#specs"
            className="hover:text-[var(--t-ink)] rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--t-blue)]"
          >
            Compare
          </a>
          <a
            href="#faq"
            className="hover:text-[var(--t-ink)] rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--t-blue)]"
          >
            FAQ
          </a>
          <TonalButton
            size="sm"
            variant="tonal"
            onClick={() => setBagOpen(true)}
          >
            <ShoppingBag aria-hidden="true" className="h-3.5 w-3.5" />
            Bag ({cartCount})
          </TonalButton>
        </nav>
      </div>

      {/* Hero with interactive finish switcher */}
      <EditorialHero
        eyebrow="New · Lumen 10 Pro"
        headline="Engineered for calm."
        subtitle="Sculpted matte glass in Porcelain, Bay, Aloe, and Obsidian. Tap any finish below to see the surface adapt."
        ctaLabel="Buy from $999"
        secondaryLabel="Compare specs"
        onPrimaryClick={() => addToBag(FLAGSHIP_PRODUCT, true)}
      />

      {/* 2-Column Editorial Bento */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SurfaceTile
          tone="cool"
          padding="lg"
          className="flex flex-col justify-between gap-10"
        >
          <div>
            <p className="text-[13px] font-medium text-[var(--t-ink-muted)] mb-2">
              Pro Camera System
            </p>
            <h2 className="t-headline text-[30px] sm:text-[34px] mb-3">
              True-to-life color in any light.
            </h2>
            <p className="t-body text-[15px] max-w-md">
              A redesigned 5x optical telephoto lens captures crisp detail at
              dusk without over-sharpening or artificial HDR glow.
            </p>
          </div>
          <div className="rounded-[20px] bg-[var(--t-elevated)] p-4 sm:p-5 border border-[var(--t-border-subtle)] flex items-center justify-between gap-3">
            <div>
              <div className="text-[11.5px] sm:text-[12px] text-[var(--t-ink-muted)]">
                Optical Zoom
              </div>
              <div className="text-[20px] sm:text-[28px] font-medium tracking-[-0.03em]">
                5× / 30×
              </div>
            </div>
            <div className="h-10 sm:h-12 w-px bg-[var(--t-border-subtle)] shrink-0" />
            <div>
              <div className="text-[11.5px] sm:text-[12px] text-[var(--t-ink-muted)]">
                Main Sensor
              </div>
              <div className="text-[20px] sm:text-[28px] font-medium tracking-[-0.03em]">
                50 MP
              </div>
            </div>
            <div className="h-10 sm:h-12 w-px bg-[var(--t-border-subtle)] shrink-0" />
            <div>
              <div className="text-[11.5px] sm:text-[12px] text-[var(--t-ink-muted)]">
                Aperture
              </div>
              <div className="text-[20px] sm:text-[28px] font-medium tracking-[-0.03em]">
                ƒ/1.68
              </div>
            </div>
          </div>
        </SurfaceTile>

        <SurfaceTile
          tone="mint"
          padding="lg"
          className="flex flex-col justify-between gap-10"
        >
          <div>
            <p className="text-[13px] font-medium text-[var(--t-chip-mint-fg)] mb-2">
              All-Day Battery
            </p>
            <h2 className="t-headline text-[30px] sm:text-[34px] mb-3">
              Charges fast. Lasts past tomorrow.
            </h2>
            <p className="t-body text-[15px] max-w-md">
              Adaptive power learns your routine and keeps background tasks
              whisper-quiet so you end the night with energy to spare.
            </p>
          </div>
          <div className="rounded-[20px] bg-[var(--t-elevated)] p-5 border border-[var(--t-border-subtle)] flex flex-col gap-3">
            <div className="flex items-center justify-between text-[13px]">
              <span className="font-medium text-[var(--t-ink)]">
                Typical mixed use
              </span>
              <span className="font-medium text-[var(--t-chip-mint-fg)]">
                32 hrs
              </span>
            </div>
            <div className="h-2.5 w-full rounded-full bg-[var(--t-surface-mint)] overflow-hidden">
              <div className="h-full w-[84%] rounded-full bg-[var(--t-chip-mint-fg)]" />
            </div>
            <div className="text-[12px] text-[var(--t-ink-muted)]">
              Up to 70% charge in 30 minutes with 45W USB-C charger.
            </div>
          </div>
        </SurfaceTile>
      </section>

      {/* 3-Up Product Lineup */}
      <section
        id="lineup"
        className="scroll-mt-28 lg:scroll-mt-20 flex flex-col gap-6"
      >
        <div className="text-center max-w-xl mx-auto">
          <p className="text-[13px] font-medium text-[var(--t-ink-muted)] mb-1">
            The Lumen Ecosystem
          </p>
          <h2 className="t-headline text-[30px] sm:text-[38px]">
            Everything works effortlessly together.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRODUCTS.map((p) => (
            <SurfaceTile
              key={p.id}
              tone={p.tone}
              className="flex flex-col items-center text-center justify-between gap-6"
            >
              <div className="flex flex-col items-center">
                <TonalChip
                  tone="neutral"
                  className="mb-4 bg-[var(--t-bg)] border border-[var(--t-border-subtle)]"
                >
                  {p.badge}
                </TonalChip>
                <h3 className="t-headline text-[24px] mb-1.5">{p.name}</h3>
                <p className="t-body text-[14px] mb-1">{p.tagline}</p>
                <p className="text-[14px] font-medium text-[var(--t-ink)]">
                  {p.priceLabel}
                </p>
              </div>

              {/* Dark-mode-aware geometric hardware silhouette */}
              <div className="h-36 flex items-center justify-center">
                {p.shape === "phone" && (
                  <div className="w-20 h-32 rounded-[18px] bg-[var(--t-elevated)] border border-[var(--t-border)] shadow-[0_14px_26px_-14px_rgba(0,0,0,0.28)] pt-4 px-2.5">
                    <div className="w-full h-4 rounded-full bg-[var(--t-ink)]" />
                  </div>
                )}
                {p.shape === "watch" && (
                  <div className="relative flex flex-col items-center">
                    <div className="w-9 h-7 rounded-t-lg bg-[var(--t-blue-tint-hover)]" />
                    <div className="w-20 h-20 rounded-full bg-[#202124] border-4 border-[var(--t-border)] shadow-[0_12px_24px_-12px_rgba(0,0,0,0.34)] flex items-center justify-center text-white text-[14px] font-medium">
                      10:09
                    </div>
                    <div className="w-9 h-7 rounded-b-lg bg-[var(--t-blue-tint-hover)]" />
                  </div>
                )}
                {p.shape === "buds" && (
                  <div className="w-24 h-28 rounded-[999px] bg-[var(--t-elevated)] border border-[var(--t-border)] shadow-[0_14px_26px_-14px_rgba(0,0,0,0.24)] flex flex-col items-center pt-7">
                    <div className="w-16 h-px bg-[var(--t-border)] mb-3" />
                    <div className="w-2 h-2 rounded-full bg-[var(--t-success,#34a853)]" />
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4">
                <TonalButton size="sm" onClick={() => addToBag(p)}>
                  Add to bag
                </TonalButton>
                <ChevronLink href="#specs">Specs</ChevronLink>
              </div>
            </SurfaceTile>
          ))}
        </div>
      </section>

      {/* Dogfooded Specs Comparison Table Registry Block */}
      <div id="specs" className="scroll-mt-28 lg:scroll-mt-20">
        <SpecsTable />
      </div>

      {/* FAQ */}
      <section
        id="faq"
        className="scroll-mt-28 lg:scroll-mt-20 max-w-3xl mx-auto w-full flex flex-col gap-6"
      >
        <h2 className="t-headline text-[28px] sm:text-[34px] text-center">
          Frequently asked questions
        </h2>
        <TonalAccordion
          items={[
            {
              question: "Does Lumen 10 Pro ship unlocked?",
              answer:
                "Yes. Every phone ordered from Lumen Store arrives factory unlocked and ready for eSIM or physical SIM on major global carriers.",
            },
            {
              question: "Can I trade in my current device?",
              answer:
                "Trade-in credit is estimated upfront and refunded directly to your original payment method once your previous phone is inspected.",
            },
            {
              question: "How many years of software updates are included?",
              answer:
                "Seven years of OS upgrades, security patches, and feature drops starting from the device release date.",
            },
          ]}
        />
      </section>

      {/* Slide-Over Bag Drawer (TonalDialog variant="drawer") */}
      <TonalDialog
        open={bagOpen}
        onOpenChange={setBagOpen}
        variant="drawer"
        title={`Your Bag (${cartCount})`}
        description="Free express carbon-neutral delivery on all Lumen hardware."
        footer={
          bagItems.length > 0 ? (
            <div className="w-full flex items-center justify-between gap-3">
              <div>
                <div className="text-[11.5px] text-[var(--t-ink-muted)]">
                  Estimated subtotal
                </div>
                <div className="text-[18px] font-medium text-[var(--t-ink)] tabular-nums">
                  ${subtotal.toLocaleString()}
                </div>
              </div>
              <TonalButton
                onClick={() => {
                  setBag({});
                  setBagOpen(false);
                  toast({
                    title: "Order reserved",
                    description: "Demo checkout complete — your bag is cleared.",
                    tone: "success",
                  });
                }}
              >
                Checkout
              </TonalButton>
            </div>
          ) : undefined
        }
      >
        {bagItems.length === 0 ? (
          <SurfaceTile tone="neutral" padding="md" className="text-center">
            <p className="text-[14px] text-[var(--t-ink-muted)]">
              Your bag is empty. Add any device from the Lumen lineup to try the
              slide-over drawer.
            </p>
          </SurfaceTile>
        ) : (
          <div className="flex flex-col gap-3">
            {bagItems.map(({ product, qty }) => (
              <div
                key={product.id}
                className="rounded-[18px] bg-[var(--t-surface)] p-4 flex items-center justify-between gap-3"
              >
                <div>
                  <div className="text-[14.5px] font-medium text-[var(--t-ink)]">
                    {product.name}
                  </div>
                  <div className="text-[12.5px] text-[var(--t-ink-muted)]">
                    Qty {qty} · ${(product.price * qty).toLocaleString()}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeFromBag(product.id)}
                  aria-label={`Remove ${product.name}`}
                  className="h-8 w-8 rounded-full hover:bg-[var(--t-surface-muted)] grid place-items-center text-[var(--t-ink-muted)] hover:text-[var(--t-danger,#c5221f)] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--t-blue)]"
                >
                  <Trash2 aria-hidden="true" className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </TonalDialog>
    </div>
  );
}
