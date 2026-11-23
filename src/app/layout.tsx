import type { Metadata } from "next";
import "@fontsource-variable/dm-sans";
import "./globals.css";
import { TonalShell } from "@/components/tonal-shell";

export const metadata: Metadata = {
  title: "Tonal — Editorial Tonal UI Registry",
  description:
    "Flat tonal surfaces, DM Sans typography, and zero bloat — shipped as a shadcn-compatible registry.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <TonalShell>{children}</TonalShell>
      </body>
    </html>
  );
}
