import type { Metadata } from "next";
import "./globals.css";
import { TonalShell } from "@/components/tonal-shell";

const SITE_URL = "https://tonal.harlo.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Tonal — Editorial Tonal UI Registry",
    template: "%s | Tonal",
  },
  description:
    "Flat tonal surfaces, open-source Google Sans typography, and zero framework bloat — 13 shadcn-compatible primitives, blocks, and design tokens.",
  keywords: [
    "shadcn registry",
    "react components",
    "tailwind css v4",
    "editorial ui",
    "tonal design system",
    "google sans",
    "next.js ui blocks",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Tonal",
    title: "Tonal — Editorial Tonal UI Registry",
    description:
      "Flat tonal surfaces, open-source Google Sans typography, and 13 shadcn-compatible primitives, blocks, and design tokens.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tonal — Editorial Tonal UI Registry",
    description:
      "Flat tonal surfaces, open-source Google Sans typography, and 13 shadcn-compatible primitives, blocks, and design tokens.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans:opsz,wght@17..18,400;17..18,500;17..18,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <TonalShell>{children}</TonalShell>
      </body>
    </html>
  );
}
