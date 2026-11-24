import type { Metadata } from "next";

const title = "Lumen Store — Hardware Storefront Demo";
const description =
  "Flagship hardware storefront built with Tonal: interactive finish hero, editorial bento tiles, comparison specs table, and FAQ accordion.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/demos/hardware" },
  openGraph: {
    title,
    description,
    url: "/demos/hardware",
  },
};

export default function HardwareDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
