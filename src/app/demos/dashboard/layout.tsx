import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pulse Console — Analytics Dashboard Demo",
  description:
    "Cloud analytics console built with Tonal: tonal app shell, KPI tiles, interactive SVG throughput chart, and searchable services table.",
  alternates: { canonical: "/demos/dashboard" },
};

export default function DashboardDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
