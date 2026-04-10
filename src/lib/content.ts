import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");

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

/**
 * Get a single content file by type and slug.
 * e.g. getContent("models", "claude-opus-4.6") reads content/models/claude-opus-4.6.md
 */
export function getContent(type: string, slug: string): ContentItem | null {
  const filePath = path.join(CONTENT_DIR, type, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const rawFile = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(rawFile);
  return { meta: data as ContentMeta, content, raw: rawFile, slug };
}

/**
 * Get the _index.md for a content type.
 */
export function getIndex(type: string): ContentItem | null {
  return getContent(type, "_index");
}

/**
 * Get all content files for a given type (excluding _index.md).
 */
export function getAllContent(type: string): ContentItem[] {
  const dir = path.join(CONTENT_DIR, type);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md") && f !== "_index.md")
    .map((f) => {
      const slug = f.replace(/\.md$/, "");
      return getContent(type, slug)!;
    })
    .filter(Boolean);
}

/**
 * Get the master index (content/_index.md).
 */
export function getMasterIndex(): ContentItem | null {
  const filePath = path.join(CONTENT_DIR, "_index.md");
  if (!fs.existsSync(filePath)) return null;
  const rawFile = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(rawFile);
  return { meta: data as ContentMeta, content, raw: rawFile, slug: "_index" };
}

/**
 * Get all content types (top-level directories in content/).
 */
export function getContentTypes(): string[] {
  return fs
    .readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
}

/**
 * Get all slugs for a content type (for generateStaticParams).
 */
export function getSlugs(type: string): string[] {
  const dir = path.join(CONTENT_DIR, type);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md") && f !== "_index.md")
    .map((f) => f.replace(/\.md$/, ""));
}
