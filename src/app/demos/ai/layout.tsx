import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aura Studio — AI Product Demo",
  description:
    "Calm AI product landing page built with Tonal: cool tonal surfaces, interactive capability prompt switcher, and 2-tier editorial pricing.",
  alternates: { canonical: "/demos/ai" },
};

export default function AiDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
