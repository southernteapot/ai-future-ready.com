import type { ContentMeta } from "./content";

const SITE = {
  name: "AI Future Ready",
  url: "https://aifutureready.com",
};

const PUBLISHER = {
  "@type": "Organization",
  name: SITE.name,
  url: SITE.url,
};

/**
 * Generate JSON-LD structured data based on content type and metadata.
 */
export function generateJsonLd(
  meta: ContentMeta,
  path: string
): Record<string, unknown> | null {
  const url = `${SITE.url}${path}`;

  switch (meta.type) {
    case "model": {
      const model: Record<string, unknown> = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: meta.title,
        description: meta.description,
        url,
        applicationCategory: "AI Model",
        operatingSystem: "Cloud / API",
      };
      if (typeof meta.provider === "string") {
        model.author = { "@type": "Organization", name: meta.provider };
      }
      if (meta.pricing && typeof meta.pricing === "object") {
        const p = meta.pricing as Record<string, string>;
        model.offers = {
          "@type": "Offer",
          description: `Input: ${p.input}, Output: ${p.output}`,
        };
      }
      if (meta.release_date) {
        model.datePublished = String(meta.release_date);
      }
      return model;
    }

    case "agent":
      return {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: meta.title,
        description: meta.description,
        url,
        applicationCategory: "AI Agent Platform",
        ...(typeof meta.website === "string" && {
          sameAs: meta.website,
        }),
        ...(typeof meta.license === "string" && {
          license: meta.license,
        }),
        ...(typeof meta.pricing === "string" && {
          offers: { "@type": "Offer", description: meta.pricing },
        }),
      };

    case "blog":
      return {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: meta.title,
        description: meta.description,
        url,
        ...(typeof meta.date === "string" && {
          datePublished: meta.date,
        }),
        dateModified: meta.last_updated,
        author: PUBLISHER,
        publisher: PUBLISHER,
      };

    case "guide":
      return {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: meta.title,
        description: meta.description,
        url,
        dateModified: meta.last_updated,
        author: PUBLISHER,
        publisher: PUBLISHER,
        articleSection: "Guide",
      };

    case "use-case":
      return {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: meta.title,
        description: meta.description,
        url,
        dateModified: meta.last_updated,
        author: PUBLISHER,
        publisher: PUBLISHER,
        articleSection: "Use Case",
      };

    case "index":
      return {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: meta.title,
        description: meta.description,
        url,
        publisher: PUBLISHER,
      };

    case "glossary":
      return {
        "@context": "https://schema.org",
        "@type": "DefinedTermSet",
        name: meta.title,
        description: meta.description,
        url,
        publisher: PUBLISHER,
      };

    case "timeline":
      return {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: meta.title,
        description: meta.description,
        url,
        publisher: PUBLISHER,
      };

    default:
      return {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: meta.title,
        description: meta.description,
        url,
        publisher: PUBLISHER,
      };
  }
}
