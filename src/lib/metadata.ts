import type { Metadata } from "next";
import type { ContentMeta } from "./content";
import { SITE_NAME, SITE_URL } from "./site";

type OpenGraphType = "website" | "article";

export const FEED_ALTERNATE_TYPES = {
  "application/feed+json": `${SITE_URL}/feed.json`,
  "application/rss+xml": `${SITE_URL}/feed.xml`,
};

export const OPEN_GRAPH_IMAGE = {
  url: `${SITE_URL}/opengraph-image`,
  width: 1200,
  height: 630,
  alt: `${SITE_NAME} social preview`,
};

export const TWITTER_IMAGE = `${SITE_URL}/twitter-image`;

function getContentOpenGraphType(type: unknown): OpenGraphType {
  switch (type) {
    case "model":
    case "agent":
    case "blog":
    case "guide":
    case "use-case":
    case "comparison":
      return "article";
    default:
      return "website";
  }
}

export function buildPageMetadata({
  title,
  description,
  path,
  openGraphType = "website",
}: {
  title: string;
  description: string;
  path: string;
  openGraphType?: OpenGraphType;
}): Metadata {
  const url = `${SITE_URL}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
      types: FEED_ALTERNATE_TYPES,
    },
    openGraph: {
      type: openGraphType,
      locale: "en_US",
      url,
      siteName: SITE_NAME,
      title,
      description,
      images: [OPEN_GRAPH_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [TWITTER_IMAGE],
    },
  };
}

export function buildContentMetadata(meta: ContentMeta, path: string): Metadata {
  return buildPageMetadata({
    title: meta.title,
    description: meta.description,
    path,
    openGraphType: getContentOpenGraphType(meta.type),
  });
}
