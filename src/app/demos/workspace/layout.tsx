import type { Metadata } from "next";

const title = "Canvas Workspace — Productivity SaaS Demo";
const description =
  "Productivity workspace landing page built with Tonal: live app-tab stage switcher, tonal feature tiles, and editorial customer quote layout.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/demos/workspace" },
  openGraph: {
    title,
    description,
    url: "/demos/workspace",
  },
};

export default function WorkspaceDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
