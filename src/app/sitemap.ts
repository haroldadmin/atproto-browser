import { resolveSiteUrl } from "@/lib/env";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const publicRoutes: string[] = ["/", "/about"];

  return publicRoutes.map((route) => ({
    url: `https://${resolveSiteUrl()}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.5,
  }));
}
