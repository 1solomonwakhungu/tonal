import type { Metadata } from "next";

const title = "Pulse Console — Analytics Dashboard Demo";
const description =
  "Cloud analytics console built with Tonal: tonal app shell, KPI tiles, interactive SVG throughput chart, and searchable services table.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/demos/dashboard" },
  openGraph: {
    title,
    description,
    url: "/demos/dashboard",
  },
};

export default function DashboardDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
