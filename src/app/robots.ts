import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/content/"],
      },
    ],
    sitemap: "https://aifutureready.com/sitemap.xml",
    host: "https://aifutureready.com",
  };
}
