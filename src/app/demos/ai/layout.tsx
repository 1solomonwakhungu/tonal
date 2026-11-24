import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Aura Studio — AI Product Demo",
  description:
    "Calm AI product landing page built with Tonal: cool tonal surfaces, interactive capability prompt switcher, and 2-tier editorial pricing.",
  path: "/demos/ai",
});

export default function AiDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
