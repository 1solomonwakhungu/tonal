import type { Metadata } from "next";
import "./globals.css";
import { TonalShell } from "@/components/tonal-shell";

export const metadata: Metadata = {
  title: "Tonal — Editorial Tonal UI Registry",
  description:
    "Flat tonal surfaces, open-source Google Sans typography, and zero bloat — shipped as a shadcn-compatible registry.",
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
