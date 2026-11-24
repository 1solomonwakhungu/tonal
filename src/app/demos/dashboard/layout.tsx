import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Pulse Console — Analytics Dashboard Demo",
  description:
    "Cloud analytics console built with Tonal: tonal app shell, KPI tiles, interactive SVG throughput chart, and searchable services table.",
  path: "/demos/dashboard",
});

export default function DashboardDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
