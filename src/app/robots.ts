import { SITE_URL } from "@/lib/env";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/at/",
    },
    sitemap: new URL("/sitemap.xml", `https://${SITE_URL}`).toString(),
  };
}
