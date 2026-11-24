import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Lumen Store — Hardware Storefront Demo",
  description:
    "Flagship hardware storefront built with Tonal: interactive finish hero, editorial bento tiles, comparison specs table, and FAQ accordion.",
  path: "/demos/hardware",
});

export default function HardwareDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
