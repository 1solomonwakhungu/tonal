import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lumen Store — Hardware Storefront Demo",
  description:
    "Flagship hardware storefront built with Tonal: interactive finish hero, editorial bento tiles, comparison specs table, and FAQ accordion.",
  alternates: { canonical: "/demos/hardware" },
};

export default function HardwareDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
