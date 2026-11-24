import type { MetadataRoute } from "next";

const SITE_URL = "https://tonal.harlo.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-11-23");

  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/demos/hardware`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/demos/ai`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/demos/workspace`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/demos/dashboard`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
