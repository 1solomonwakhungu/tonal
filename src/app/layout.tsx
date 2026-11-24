import type { Metadata } from "next";
import "./globals.css";
import { TonalShell } from "@/components/tonal-shell";

const SITE_URL = "https://tonal.harlo.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Tonal — Editorial Tonal UI Registry",
    template: "%s — Tonal",
  },
  description:
    "Flat tonal surfaces, open-source Google Sans typography, semantic status tokens, and zero bloat — shipped as a shadcn-compatible registry.",
  keywords: [
    "shadcn registry",
    "Tailwind CSS v4",
    "editorial UI",
    "tonal surfaces",
    "React components",
    "design tokens",
    "Next.js UI kit",
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
      "Flat tonal surfaces, open-source Google Sans typography, and zero bloat — 19 shadcn-installable primitives, blocks, and tokens.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tonal — Editorial Tonal UI Registry",
    description:
      "Flat tonal surfaces, Google Sans typography, and zero bloat — shipped as a shadcn-compatible registry.",
  },
};

const THEME_INIT_SCRIPT = `(function(){try{var d=document.documentElement;var p=new URLSearchParams(window.location.search);var qT=p.get('theme');var qM=p.get('mode');var t=(qT==='dark'||qT==='light')?qT:localStorage.getItem('tonal-theme');if(t!=='dark'&&t!=='light'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}var m=(qM==='commerce'||qM==='pill')?qM:localStorage.getItem('tonal-mode');if(m!=='commerce'&&m!=='pill'){m='pill';}d.dataset.tonalTheme=t;d.dataset.tonalMode=m;}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
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
