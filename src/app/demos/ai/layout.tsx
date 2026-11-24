import type { Metadata } from "next";

const title = "Aura Studio — AI Product Demo";
const description =
  "Calm AI product landing page built with Tonal: cool tonal surfaces, interactive capability prompt switcher, and 2-tier editorial pricing.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/demos/ai" },
  openGraph: {
    title,
    description,
    url: "/demos/ai",
  },
};

export default function AiDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
