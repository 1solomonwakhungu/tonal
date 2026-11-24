export type CatalogCategory = "primitives" | "blocks" | "tokens";

export interface PropDoc {
  name: string;
  type: string;
  defaultValue?: string;
  description: string;
}

export interface CatalogItemMeta {
  slug: string;
  category: CatalogCategory;
  title: string;
  description: string;
  fullWidth?: boolean;
  usage: string;
  props: PropDoc[];
}

export const REGISTRY_CATALOG: CatalogItemMeta[] = [
  {
    slug: "editorial-hero",
    category: "blocks",
    title: "Editorial Finish Hero",
    description:
      "Split hero with dynamic finish swatches that tint the surrounding tonal surface.",
    fullWidth: true,
    usage: `import { EditorialHero } from "@/components/editorial-hero";

export default function Page() {
  return (
    <EditorialHero
      eyebrow="New · Lumen 10 Pro"
      headline="Engineered for calm."
      ctaLabel="Buy from $999"
    />
  );
}`,
    props: [
      { name: "eyebrow", type: "string", defaultValue: '"New · Lumen 10 Pro"', description: "Muted eyebrow label above the display heading." },
      { name: "headline", type: "string", defaultValue: '"Designed to get out of the way."', description: "Primary display headline." },
      { name: "subtitle", type: "string", description: "Supporting editorial copy." },
      { name: "ctaLabel", type: "string", defaultValue: '"Buy from $999"', description: "Primary button text." },
      { name: "secondaryLabel", type: "string", defaultValue: '"Compare models"', description: "Inline ChevronLink label." },
      { name: "finishes", type: "FinishOption[]", defaultValue: "DEFAULT_FINISHES", description: "Interactive swatch options that dynamically tint the hero surface." },
    ],
  },
  {
    slug: "tonal-button",
    category: "primitives",
    title: "Tonal Button",
    description: "Automatically adapts between Soft Pill and Commerce corners.",
    usage: `import { TonalButton } from "@/components/ui/button";

export function Actions() {
  return (
    <div className="flex gap-3">
      <TonalButton>Primary CTA</TonalButton>
      <TonalButton variant="outline">Secondary</TonalButton>
    </div>
  );
}`,
    props: [
      { name: "variant", type: '"primary" | "dark" | "outline" | "tonal" | "ghost"', defaultValue: '"primary"', description: "Visual emphasis tier." },
      { name: "size", type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: "Padding and font size scale." },
      { name: "...props", type: "ButtonHTMLAttributes", description: "All native HTML button attributes and ref forwarding." },
    ],
  },
  {
    slug: "surface-tile",
    category: "primitives",
    title: "Surface Tile",
    description: "Depth via flat tonal steps instead of muddy drop shadows.",
    usage: `import { SurfaceTile } from "@/components/ui/surface-tile";

<SurfaceTile tone="cool" padding="lg">
  Flat tonal container
</SurfaceTile>`,
    props: [
      { name: "tone", type: '"white" | "neutral" | "warm" | "cool" | "sky" | "mint" | "sand"', defaultValue: '"neutral"', description: "Surface token tint." },
      { name: "bordered", type: "boolean", defaultValue: "false", description: "Adds hairline subtle border (automatic for white)." },
      { name: "padding", type: '"none" | "sm" | "md" | "lg"', defaultValue: '"md"', description: "Internal spacing preset." },
    ],
  },
  {
    slug: "tonal-chip",
    category: "primitives",
    title: "Tonal Chip",
    description: "Soft tinted category pills and semantic status badges.",
    usage: `import { TonalChip } from "@/components/ui/chip";

<TonalChip tone="mint">Healthy</TonalChip>`,
    props: [
      { name: "tone", type: '"blue" | "neutral" | "mint" | "warm" | "warning" | "danger"', defaultValue: '"blue"', description: "Semantic or editorial pill tone." },
    ],
  },
  {
    slug: "chevron-link",
    category: "primitives",
    title: "Chevron Link",
    description: "Quiet editorial inline text action with subtle animated chevron.",
    usage: `import { ChevronLink } from "@/components/ui/chevron-link";

<ChevronLink href="#specs">Compare specs</ChevronLink>`,
    props: [
      { name: "tone", type: '"blue" | "ink"', defaultValue: '"blue"', description: "Link text color hierarchy." },
      { name: "...props", type: "AnchorHTMLAttributes", description: "Standard anchor props." },
    ],
  },
  {
    slug: "tonal-dialog",
    category: "primitives",
    title: "Tonal Dialog & Drawer",
    description: "Accessible modal and slide-over drawer with ESC close and focus restoration.",
    usage: `import { TonalDialog } from "@/components/ui/dialog";

<TonalDialog open={open} onOpenChange={setOpen} title="Create project" variant="modal">
  ...
</TonalDialog>`,
    props: [
      { name: "open", type: "boolean", description: "Controls visibility." },
      { name: "onOpenChange", type: "(open: boolean) => void", description: "Called on ESC, backdrop click, or close button." },
      { name: "title", type: "string", description: "Accessible dialog heading." },
      { name: "description", type: "string", description: "Optional subtitle linked via aria-describedby." },
      { name: "variant", type: '"modal" | "drawer"', defaultValue: '"modal"', description: "Centered dialog or right-aligned slide-over sheet." },
      { name: "size", type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: "Max width preset." },
      { name: "footer", type: "ReactNode", description: "Optional right-aligned action footer." },
    ],
  },
  {
    slug: "tonal-input",
    category: "primitives",
    title: "Tonal Form Controls",
    description: "Calm labeled input (default & pill search), select, and textarea with semantic error states.",
    usage: `import { TonalInput, TonalSelect } from "@/components/ui/input";

<TonalInput label="Project name" placeholder="e.g. Tonal Docs Edge" />`,
    props: [
      { name: "label", type: "string", description: "Visible accessible label linked via htmlFor." },
      { name: "variant", type: '"default" | "pill"', defaultValue: '"default"', description: "Standard rounded field or cool tonal pill search input." },
      { name: "hint", type: "string", description: "Muted helper text." },
      { name: "error", type: "string", description: "Semantic danger border + error message." },
      { name: "leadingIcon", type: "ReactNode", description: "Optional left icon slot." },
    ],
  },
  {
    slug: "tonal-segmented-control",
    category: "primitives",
    title: "Tonal Segmented Control",
    description: "Accessible pill switcher with Arrow/Home/End roving keyboard navigation.",
    usage: `import { TonalSegmentedControl } from "@/components/ui/segmented-control";

<TonalSegmentedControl
  value={range}
  onValueChange={setRange}
  options={[{ value: "7d", label: "7D" }, { value: "30d", label: "30D" }]}
/>`,
    props: [
      { name: "options", type: "SegmentedOption<T>[]", description: "List of values, labels, optional icons & badges." },
      { name: "value", type: "T", description: "Controlled active option." },
      { name: "defaultValue", type: "T", description: "Initial uncontrolled active option." },
      { name: "onValueChange", type: "(value: T) => void", description: "Fires on click or arrow-key selection." },
      { name: "size", type: '"sm" | "md"', defaultValue: '"md"', description: "Compact or regular pill density." },
    ],
  },
  {
    slug: "tonal-toast",
    category: "primitives",
    title: "Tonal Toast",
    description: "Calm floating notifications with semantic tones and polite aria-live announcements.",
    usage: `import { useTonalToast } from "@/components/ui/toast";

const { toast } = useTonalToast();
toast({ title: "Saved", description: "Tokens copied.", tone: "success" });`,
    props: [
      { name: "title", type: "string", description: "Primary notification heading." },
      { name: "description", type: "string", description: "Optional detail line." },
      { name: "tone", type: '"neutral" | "success" | "warning" | "danger" | "info"', defaultValue: '"neutral"', description: "Semantic icon accent." },
      { name: "durationMs", type: "number", defaultValue: "3600", description: "Auto-dismiss delay (0 disables auto-dismiss)." },
    ],
  },
  {
    slug: "tonal-command",
    category: "primitives",
    title: "Tonal Command Palette",
    description: "Keyboard-first ⌘K command menu with grouped results and Arrow/Enter navigation.",
    usage: `import { TonalCommand } from "@/components/ui/command";

<TonalCommand open={open} onOpenChange={setOpen} items={items} />`,
    props: [
      { name: "open", type: "boolean", description: "Controls palette visibility." },
      { name: "onOpenChange", type: "(open: boolean) => void", description: "Close handler for Escape or backdrop." },
      { name: "items", type: "CommandItem[]", description: "Searchable grouped commands with optional shortcuts." },
      { name: "placeholder", type: "string", description: "Search input placeholder." },
    ],
  },
  {
    slug: "tonal-accordion",
    category: "primitives",
    title: "Hairline Accordion",
    description: "Minimal editorial FAQ section with decelerating spring motion.",
    fullWidth: true,
    usage: `import { TonalAccordion } from "@/components/ui/accordion";

<TonalAccordion items={[{ question: "...", answer: "..." }]} />`,
    props: [
      { name: "items", type: "AccordionItemData[]", description: "Question and answer pairs." },
      { name: "className", type: "string", description: "Optional container class overrides." },
    ],
  },
  {
    slug: "tonal-app-shell",
    category: "blocks",
    title: "Tonal App Shell",
    description:
      "Cool tonal outer workspace frame with interactive pill navigation rail, quota card, and elevated content sheet.",
    fullWidth: true,
    usage: `import { TonalAppShell, TonalQuotaCard } from "@/components/tonal-app-shell";

<TonalAppShell items={navItems} activeId={active} onSelect={setActive} sidebarFooter={<TonalQuotaCard />}>
  ...
</TonalAppShell>`,
    props: [
      { name: "items", type: "TonalNavItem[]", defaultValue: "DEFAULT_APP_SHELL_NAV", description: "Sidebar navigation items." },
      { name: "activeId", type: "string", description: "Controlled active nav ID." },
      { name: "onSelect", type: "(id: string) => void", description: "Called when a rail item is selected." },
      { name: "sidebarFooter", type: "ReactNode", defaultValue: "<TonalQuotaCard />", description: "Custom bottom sidebar card or null to hide." },
      { name: "header", type: "ReactNode", description: "Top sheet header slot." },
    ],
  },
  {
    slug: "kpi-grid",
    category: "blocks",
    title: "KPI Metric Grid",
    description:
      "Calm 4-column analytics KPI metric tiles with title, delta chip, crisp display figure, and subtitle.",
    fullWidth: true,
    usage: `import { KpiGrid } from "@/components/kpi-grid";

<KpiGrid items={metrics} columns={4} />`,
    props: [
      { name: "items", type: "KpiMetric[]", defaultValue: "DEFAULT_KPIS", description: "Metric tile records." },
      { name: "columns", type: "2 | 3 | 4", defaultValue: "4", description: "Desktop grid column count." },
    ],
  },
  {
    slug: "tonal-area-chart",
    category: "blocks",
    title: "Tonal Area Chart",
    description:
      "Zero-dependency responsive SVG throughput & trend area chart with hover and keyboard-focusable points.",
    fullWidth: true,
    usage: `import { TonalAreaChart } from "@/components/tonal-area-chart";

<TonalAreaChart title="Request throughput" points={points} valueSuffix="K requests" />`,
    props: [
      { name: "title", type: "string", defaultValue: '"Request throughput"', description: "Chart header title." },
      { name: "points", type: "AreaChartPoint[]", defaultValue: "DEFAULT_CHART_POINTS", description: "Ordered series data points." },
      { name: "badge", type: "string", defaultValue: '"Edge cached 94%"', description: "Top-right callout label." },
      { name: "valueSuffix", type: "string", defaultValue: '"K requests"', description: "Unit suffix in hover/focus readout." },
    ],
  },
  {
    slug: "tonal-table",
    category: "blocks",
    title: "Tonal Data Table",
    description:
      "Interactive pill search field, status filter chips, and hairline data table with hover highlights and resettable empty state.",
    fullWidth: true,
    usage: `import { TonalTable } from "@/components/tonal-table";

<TonalTable title="Services" rows={rows} />`,
    props: [
      { name: "title", type: "string", defaultValue: '"Services"', description: "Table section heading." },
      { name: "rows", type: "TonalTableRow[]", defaultValue: "DEFAULT_TABLE_ROWS", description: "Data rows to display and filter." },
      { name: "statuses", type: "string[]", description: "Custom status filter chips (inferred automatically if omitted)." },
      { name: "onRowClick", type: "(row: TonalTableRow) => void", description: "Optional click handler for interactive rows." },
    ],
  },
  {
    slug: "capability-tabs",
    category: "blocks",
    title: "Capability Switcher",
    description:
      "Interactive calm AI studio capability switcher inside a cool tonal stage with prompt and grounded response panels.",
    fullWidth: true,
    usage: `import { CapabilityTabs } from "@/components/capability-tabs";

<CapabilityTabs items={capabilities} />`,
    props: [
      { name: "items", type: "CapabilityItem[]", defaultValue: "DEFAULT_CAPABILITIES", description: "Prompt + response tabs." },
      { name: "tone", type: "SurfaceTone", defaultValue: '"cool"', description: "Outer stage surface tone." },
      { name: "onSelect", type: "(item: CapabilityItem) => void", description: "Callback when tab changes." },
    ],
  },
  {
    slug: "pricing-grid",
    category: "blocks",
    title: "Tonal Pricing Grid",
    description:
      "Clean 2-tier editorial pricing cards pairing a bordered canvas tier with a cool tonal recommended tier and checkmark list.",
    fullWidth: true,
    usage: `import { PricingGrid } from "@/components/pricing-grid";

<PricingGrid tiers={tiers} onSelectTier={(tier) => console.log(tier.id)} />`,
    props: [
      { name: "tiers", type: "PricingTier[]", defaultValue: "DEFAULT_PRICING_TIERS", description: "2 or 3 pricing tier definitions." },
      { name: "eyebrow", type: "string", defaultValue: '"Simple plans"', description: "Header eyebrow text." },
      { name: "headline", type: "string", description: "Section headline." },
      { name: "onSelectTier", type: "(tier: PricingTier) => void", description: "Fires when any tier CTA is clicked." },
    ],
  },
  {
    slug: "specs-table",
    category: "blocks",
    title: "Specs Comparison Table",
    description:
      "Flagship storefront hairline side-by-side model specifications comparison table.",
    fullWidth: true,
    usage: `import { SpecsTable } from "@/components/specs-table";

<SpecsTable title="Compare Lumen 10 models" models={models} rows={rows} />`,
    props: [
      { name: "title", type: "string", defaultValue: '"Compare Lumen 10 models"', description: "Table heading." },
      { name: "models", type: "string[]", defaultValue: "DEFAULT_SPEC_MODELS", description: "Column model headers." },
      { name: "rows", type: "SpecRow[]", defaultValue: "DEFAULT_SPEC_ROWS", description: "Feature label and per-model values." },
      { name: "highlightFirstModel", type: "boolean", defaultValue: "true", description: "Emphasizes the flagship first model column." },
    ],
  },
  {
    slug: "tonal-tokens",
    category: "tokens",
    title: "Tonal Design Tokens (tokens.css)",
    description:
      "Complete CSS custom properties, Tailwind v4 @theme inline bridge, semantic status tokens, and WCAG contrast matrix.",
    fullWidth: true,
    usage: `/* app/globals.css */
@import "tailwindcss";
@import "../styles/tonal-tokens.css";`,
    props: [
      { name: "data-tonal-theme", type: '"light" | "dark"', defaultValue: '"light"', description: "Switches full light/dark surface and ink hierarchy." },
      { name: "data-tonal-mode", type: '"pill" | "commerce"', defaultValue: '"pill"', description: "Swaps button radius (9999px vs 6px) and primary CTA ink." },
    ],
  },
];

export function getCatalogItem(slug: string): CatalogItemMeta | undefined {
  return REGISTRY_CATALOG.find((item) => item.slug === slug);
}
