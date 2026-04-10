import type { MetadataRoute } from "next";
import { getContentTypes, getSlugs } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://aifutureready.com";
  const entries: MetadataRoute.Sitemap = [];

  // Homepage
  entries.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1,
  });

  const types = getContentTypes();

  for (const type of types) {
    // Category index page (HTML)
    entries.push({
      url: `${baseUrl}/${type}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    });

    // Raw markdown index
    entries.push({
      url: `${baseUrl}/content/${type}/_index.md`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    });

    // Individual content pages
    for (const slug of getSlugs(type)) {
      // HTML page
      entries.push({
        url: `${baseUrl}/${type}/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });

      // Raw markdown
      entries.push({
        url: `${baseUrl}/content/${type}/${slug}.md`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.5,
      });
    }
  }

  return entries;
}
