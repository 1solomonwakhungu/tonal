import type { Metadata } from "next";

export function createPageMetadata({
  title,
  ogTitle,
  description,
  path,
}: {
  title: string;
  ogTitle?: string;
  description: string;
  path: string;
}): Metadata {
  const socialTitle = ogTitle ?? title;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: "Tonal",
      title: socialTitle,
      description,
      url: path,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "Tonal — Editorial tonal UI system",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: ["/opengraph-image"],
    },
  };
}
