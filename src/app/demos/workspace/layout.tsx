import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Canvas Workspace — Productivity SaaS Demo",
  description:
    "Productivity workspace landing page built with Tonal: live app-tab stage switcher, tonal feature tiles, and editorial customer quote layout.",
  alternates: { canonical: "/demos/workspace" },
};

export default function WorkspaceDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
