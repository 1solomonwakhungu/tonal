import type { MetadataRoute } from "next";
import { REGISTRY_CATALOG } from "@/lib/registry-catalog";

const SITE_URL = "https://tonal.harlo.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/studio`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
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

  const componentRoutes: MetadataRoute.Sitemap = REGISTRY_CATALOG.map(
    (item) => ({
      url: `${SITE_URL}/components/${item.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })
  );

  return [...staticRoutes, ...componentRoutes];
}
