import contentData from "./content-data.json";

const data = contentData as Record<
  string,
  Record<string, { meta: Record<string, unknown>; content: string; raw: string }>
>;

export interface ContentMeta {
  title: string;
  type: string;
  description: string;
  last_updated: string;
  [key: string]: unknown;
}

export interface ContentItem {
  meta: ContentMeta;
  content: string;
  raw: string;
  slug: string;
}

function toItem(
  entry: { meta: Record<string, unknown>; content: string; raw: string },
  slug: string
): ContentItem {
  return { meta: entry.meta as ContentMeta, content: entry.content, raw: entry.raw, slug };
}

export function getContent(type: string, slug: string): ContentItem | null {
  const entry = data[type]?.[slug];
  if (!entry) return null;
  return toItem(entry, slug);
}

export function getIndex(type: string): ContentItem | null {
  return getContent(type, "_index");
}

export function getAllContent(type: string): ContentItem[] {
  const typeData = data[type];
  if (!typeData) return [];
  return Object.entries(typeData)
    .filter(([slug]) => slug !== "_index")
    .map(([slug, entry]) => toItem(entry, slug));
}

export function getMasterIndex(): ContentItem | null {
  const entry = data["_root"]?.["_index"];
  if (!entry) return null;
  return toItem(entry, "_index");
}

export function getContentTypes(): string[] {
  return Object.keys(data).filter((k) => k !== "_root");
}

export function getSlugs(type: string): string[] {
  const typeData = data[type];
  if (!typeData) return [];
  return Object.keys(typeData).filter((k) => k !== "_index");
}
