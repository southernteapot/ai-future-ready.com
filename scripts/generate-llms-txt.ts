/**
 * Generates llms.txt (index) and llms-full.txt (all content inlined)
 * in public/. Run before build or on content change.
 *
 * Usage: npx tsx scripts/generate-llms-txt.ts
 */

import fs from "fs";
import path from "path";
import { createHash } from "crypto";
import matter from "gray-matter";
import { SITE_DOMAIN, SITE_URL } from "../src/lib/site";

const CONTENT_DIR = path.join(process.cwd(), "content");
const PUBLIC_DIR = path.join(process.cwd(), "public");
const PUBLIC_CONTENT_DIR = path.join(PUBLIC_DIR, "content");

interface Entry {
  title: string;
  description: string;
  mdPath: string;
  htmlPath: string;
  raw: string;
  section: string;
  meta: Record<string, unknown>;
  contentHash: string;
  updatedAt: string;
  publishedAt: string;
}

function getFilesInDir(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md") && f !== "_index.md")
    .sort();
}

function normalizeDate(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (/^\d{4}$/.test(trimmed)) return `${trimmed}-01-01`;
  if (/^\d{4}-\d{2}$/.test(trimmed)) return `${trimmed}-01`;
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return trimmed;
  return null;
}

function toIsoDate(date: string): string {
  return `${date}T00:00:00.000Z`;
}

function contentHash(raw: string): string {
  return createHash("sha256").update(raw).digest("hex");
}

function toHtmlPath(mdPath: string): string {
  if (mdPath === "/content/_index.md") return "/";
  if (mdPath.startsWith("/content/")) {
    const pathname = mdPath.replace(/^\/content/, "");
    if (pathname.endsWith("/_index.md")) {
      return pathname.replace(/\/_index\.md$/, "") || "/";
    }
    return pathname.replace(/\.md$/, "");
  }
  return mdPath;
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildEntry(filePath: string, mdPath: string, section: string): Entry | null {
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data } = matter(raw);
  const updatedAt = normalizeDate(data.last_updated) ?? "1970-01-01";
  const publishedAt =
    normalizeDate(data.date) ??
    normalizeDate(data.release_date) ??
    updatedAt;

  return {
    title: (data.title as string) || path.basename(filePath, ".md"),
    description: (data.description as string) || "",
    mdPath,
    htmlPath: toHtmlPath(mdPath),
    raw,
    section,
    meta: data as Record<string, unknown>,
    contentHash: contentHash(raw),
    updatedAt,
    publishedAt,
  };
}

// Section ordering
const SECTIONS = [
  { dir: "standard", label: "Standard" },
  { dir: "checklist", label: "Checklist" },
  { dir: "models", label: "Models" },
  { dir: "agents", label: "Agent Platforms" },
  { dir: "comparisons", label: "Comparisons" },
  { dir: "guides", label: "Guides" },
  { dir: "use-cases", label: "Use Cases" },
  { dir: "prompt-patterns", label: "Prompt Patterns" },
  { dir: "blog", label: "Blog" },
  { dir: "glossary", label: "Glossary" },
  { dir: "timeline", label: "Timeline" },
  { dir: "pricing", label: "Pricing" },
];

const STANDALONE_FILES = [
  { file: "changelog.md", label: "Changelog" },
  { file: "compatibility.md", label: "Compatibility Matrix" },
  { file: "mcp.md", label: "MCP Access" },
];

fs.rmSync(PUBLIC_CONTENT_DIR, { recursive: true, force: true });
fs.cpSync(CONTENT_DIR, PUBLIC_CONTENT_DIR, { recursive: true });
console.log("synced public/content");

// Collect all entries
const allEntries: Entry[] = [];

for (const section of SECTIONS) {
  const dir = path.join(CONTENT_DIR, section.dir);

  // _index.md
  const index = buildEntry(
    path.join(dir, "_index.md"),
    `/content/${section.dir}/_index.md`,
    section.label
  );
  if (index) {
    allEntries.push(index);
  }

  // Individual files
  for (const file of getFilesInDir(dir)) {
    const entry = buildEntry(
      path.join(dir, file),
      `/content/${section.dir}/${file}`,
      section.label
    );
    if (entry) {
      allEntries.push(entry);
    }
  }
}

// ─── llms.txt (index only) ──────────────────────────────

const indexLines: string[] = [
  "# AI Future Ready",
  "> The agent-ready web — a specification, checklist, and working demonstration of websites built for both humans and AI agents. Includes a structured AI reference library with models, agents, comparisons, and analysis.",
  "",
  "## Content Sections",
];

for (const section of SECTIONS) {
  const index = allEntries.find(
    (e) => e.mdPath === `/content/${section.dir}/_index.md`
  );
  if (index) {
    indexLines.push(`- [${section.label}](${index.mdPath}): ${index.description}`);
  }
}

let currentSection = "";
for (const entry of allEntries) {
  if (entry.mdPath.endsWith("/_index.md")) continue;

  if (entry.section !== currentSection) {
    currentSection = entry.section;
    indexLines.push("", `## ${currentSection}`);
  }

  indexLines.push(`- [${entry.title}](${entry.mdPath}): ${entry.description}`);
}

// Standalone files
for (const sf of STANDALONE_FILES) {
  const entry = buildEntry(
    path.join(CONTENT_DIR, sf.file),
    `/content/${sf.file}`,
    sf.label
  );
  if (entry) {
    indexLines.push("");
    indexLines.push(`## ${sf.label}`);
    indexLines.push(`- [${entry.title}](/content/${sf.file}): ${entry.description}`);
    allEntries.push(entry);
  }
}

indexLines.push("");
fs.writeFileSync(path.join(PUBLIC_DIR, "llms.txt"), indexLines.join("\n"), "utf-8");
console.log(`wrote public/llms.txt (${indexLines.length} lines)`);

// ─── llms-full.txt (all content inlined) ─────────────────

const fullLines: string[] = [
  "# AI Future Ready — Full Content",
  `> All content from ${SITE_DOMAIN} in a single file.`,
  `> Generated: ${new Date().toISOString().split("T")[0]}`,
  `> Total files: ${allEntries.length}`,
  "",
];

for (const entry of allEntries) {
  fullLines.push(
    "---",
    "",
    `<!-- file: ${entry.mdPath} -->`,
    "",
    entry.raw.trim(),
    "",
  );
}

fullLines.push("---", "");

const fullContent = fullLines.join("\n");
fs.writeFileSync(path.join(PUBLIC_DIR, "llms-full.txt"), fullContent, "utf-8");

const sizeKb = Math.round(Buffer.byteLength(fullContent, "utf-8") / 1024);
console.log(`wrote public/llms-full.txt (${fullLines.length} lines, ${sizeKb} KB)`);

// ─── search-index.json ───────────────────────────────────

const searchIndex = allEntries
  .filter((e) => !e.mdPath.endsWith("/_index.md"))
  .map((entry) => {
    // Extract frontmatter fields for richer search
    const { data } = matter(entry.raw);
    return {
      title: entry.title,
      description: entry.description,
      section: entry.section,
      id: (data.id as string) || undefined,
      href: entry.htmlPath,
      mdPath: entry.mdPath,
      provider: (data.provider as string) || undefined,
      tags: (data.tags as string[]) || [],
      last_updated: (data.last_updated as string) || undefined,
      published_at: (data.date as string) || (data.release_date as string) || undefined,
      content_hash: entry.contentHash,
    };
  });

fs.writeFileSync(
  path.join(PUBLIC_DIR, "search-index.json"),
  JSON.stringify(searchIndex),
  "utf-8"
);
console.log(`wrote public/search-index.json (${searchIndex.length} entries)`);

// ─── api/v1/index.json (static API) ─────────────────────

const apiDir = path.join(PUBLIC_DIR, "api", "v1");
fs.mkdirSync(apiDir, { recursive: true });

// Build per-type JSON
const contentTypes = fs
  .readdirSync(CONTENT_DIR, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

const typeIndex = contentTypes.map((t) => {
  const indexFile = path.join(CONTENT_DIR, t, "_index.md");
  const indexData = fs.existsSync(indexFile) ? matter(fs.readFileSync(indexFile, "utf-8")).data : {};
  return {
    type: t,
    title: (indexData.title as string) || t,
    description: (indexData.description as string) || "",
  };
});

// Main API index
fs.writeFileSync(
  path.join(apiDir, "index.json"),
  JSON.stringify({
    name: "AI Future Ready API",
    version: "v1",
    description: "Structured JSON API for the agent-ready web — standard, checklist, and AI reference data.",
    discovery: {
      llms_txt: "/llms.txt",
      llms_full: "/llms-full.txt",
      search_index: "/search-index.json",
      feed_json: "/feed.json",
      feed_xml: "/feed.xml",
      raw_content: "/content/_index.md",
      mcp_docs: "/mcp",
    },
    content_types: typeIndex,
  }),
  "utf-8"
);

// Per-type JSON files
for (const t of contentTypes) {
  const dir = path.join(CONTENT_DIR, t);
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md") && f !== "_index.md");
  const items = files.map((f) => {
    const { data } = matter(fs.readFileSync(path.join(dir, f), "utf-8"));
    const slug = f.replace(/\.md$/, "");
    return {
      slug,
      id: (data.id as string) || slug,
      title: (data.title as string) || slug,
      description: (data.description as string) || "",
      last_updated: (data.last_updated as string) || "",
      markdown_url: `/content/${t}/${f}`,
      html_url: `/${t}/${slug}`,
      content_hash: contentHash(fs.readFileSync(path.join(dir, f), "utf-8")),
      ...(data.provider && { provider: data.provider }),
      ...(data.pricing && { pricing: data.pricing }),
      ...(data.benchmarks && { benchmarks: data.benchmarks }),
      ...(data.tags && { tags: data.tags }),
      ...(data.website && { website: data.website }),
      ...(data.date && { date: data.date }),
      ...(data.release_date && { release_date: data.release_date }),
    };
  });
  fs.writeFileSync(path.join(apiDir, `${t}.json`), JSON.stringify({ type: t, count: items.length, items }), "utf-8");
}

// Recommend JSON — pre-scored for each task
const tasks = ["coding", "writing", "math", "reasoning", "multilingual", "speed"];
const modelEntries = allEntries.filter((e) => e.section === "Models" && !e.mdPath.endsWith("/_index.md"));
const recommendData: Record<string, unknown[]> = {};

for (const task of tasks) {
  const scored = modelEntries.map((entry) => {
    const { data } = matter(entry.raw);
    const benchmarks = (data.benchmarks || {}) as Record<string, number>;
    const pricing = (data.pricing || {}) as Record<string, unknown>;
    return {
      slug: path.basename(entry.mdPath, ".md"),
      title: entry.title,
      provider: (data.provider as string) || "",
      score: benchmarks[task] || 0,
      pricing: { input: pricing.input, output: pricing.output },
      free: pricing.free === true,
      model_type: (data.model_type as string) || "",
      markdown_url: entry.mdPath,
    };
  });
  recommendData[task] = scored.sort((a, b) => (b.score as number) - (a.score as number)).slice(0, 10);
}

fs.writeFileSync(path.join(apiDir, "recommend.json"), JSON.stringify(recommendData), "utf-8");
console.log(`wrote public/api/v1/ (${contentTypes.length} type files + index + recommend)`);

// ─── change feeds ────────────────────────────────────────

const feedEntries = [...allEntries]
  .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
  .map((entry) => ({
    id: `${SITE_URL}${entry.htmlPath}`,
    url: `${SITE_URL}${entry.htmlPath}`,
    title: entry.title,
    summary: entry.description,
    date_published: toIsoDate(entry.publishedAt),
    date_modified: toIsoDate(entry.updatedAt),
    authors: [{ name: "AI Future Ready" }],
    tags: Array.isArray(entry.meta.tags)
      ? (entry.meta.tags as string[])
      : [entry.section.toLowerCase()],
    content_text: entry.description,
    _section: entry.section,
    _markdown_url: `${SITE_URL}${entry.mdPath}`,
    _content_hash: entry.contentHash,
  }));

fs.writeFileSync(
  path.join(PUBLIC_DIR, "feed.json"),
  JSON.stringify(
    {
      version: "https://jsonfeed.org/version/1.1",
      title: "AI Future Ready Updates",
      home_page_url: SITE_URL,
      feed_url: `${SITE_URL}/feed.json`,
      description:
        "Machine-readable change feed for AI Future Ready. Track content updates without re-crawling the full site.",
      items: feedEntries,
    },
    null,
    2
  ),
  "utf-8"
);

const rssItems = feedEntries
  .map(
    (entry) => `  <item>
    <title>${escapeXml(entry.title)}</title>
    <link>${escapeXml(entry.url)}</link>
    <guid isPermaLink="true">${escapeXml(entry.id)}</guid>
    <pubDate>${new Date(entry.date_modified).toUTCString()}</pubDate>
    <description>${escapeXml(entry.summary)}</description>
  </item>`
  )
  .join("\n");

fs.writeFileSync(
  path.join(PUBLIC_DIR, "feed.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>AI Future Ready Updates</title>
  <link>${SITE_URL}</link>
  <description>Machine-readable change feed for AI Future Ready.</description>
  <lastBuildDate>${new Date(feedEntries[0]?.date_modified ?? toIsoDate("1970-01-01")).toUTCString()}</lastBuildDate>
${rssItems}
</channel>
</rss>
`,
  "utf-8"
);
console.log(`wrote public/feed.json and public/feed.xml (${feedEntries.length} items)`);

// ─── robots.txt ──────────────────────────────────────────

fs.writeFileSync(
  path.join(PUBLIC_DIR, "robots.txt"),
  `User-agent: *
Allow: /
Allow: /content/

Sitemap: ${SITE_URL}/sitemap.xml
Host: ${SITE_DOMAIN}
`,
  "utf-8"
);
console.log("wrote public/robots.txt");

// ─── content-data.json (pre-parsed content for runtime) ──

const contentData: Record<string, Record<string, { meta: Record<string, unknown>; content: string; raw: string }>> = {};

// Master index
const masterIndexPath = path.join(CONTENT_DIR, "_index.md");
if (fs.existsSync(masterIndexPath)) {
  const rawFile = fs.readFileSync(masterIndexPath, "utf-8");
  const { data: mData, content: mContent } = matter(rawFile);
  contentData["_root"] = { "_index": { meta: mData, content: mContent, raw: rawFile } };
}

contentData["_standalone"] = {};
for (const sf of STANDALONE_FILES) {
  const standalonePath = path.join(CONTENT_DIR, sf.file);
  if (!fs.existsSync(standalonePath)) continue;

  const rawFile = fs.readFileSync(standalonePath, "utf-8");
  const { data, content } = matter(rawFile);
  const slug = sf.file.replace(/\.md$/, "");
  contentData["_standalone"][slug] = { meta: data, content, raw: rawFile };
}

// All content types
const allDirs = fs.readdirSync(CONTENT_DIR, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name);
for (const t of allDirs) {
  contentData[t] = {};
  const dir = path.join(CONTENT_DIR, t);
  for (const file of fs.readdirSync(dir).filter(f => f.endsWith(".md"))) {
    const slug = file.replace(/\.md$/, "");
    const rawFile = fs.readFileSync(path.join(dir, file), "utf-8");
    const { data, content } = matter(rawFile);
    contentData[t][slug] = { meta: data, content, raw: rawFile };
  }
}

fs.writeFileSync(
  path.join(process.cwd(), "src", "lib", "content-data.json"),
  JSON.stringify(contentData),
  "utf-8"
);
const cdSize = Math.round(Buffer.byteLength(JSON.stringify(contentData), "utf-8") / 1024);
console.log(`wrote src/lib/content-data.json (${cdSize} KB)`);

// ─── sitemap.xml ─────────────────────────────────────────

const baseUrl = SITE_URL;
const sitemapEntries: string[] = [];

sitemapEntries.push(`  <url><loc>${baseUrl}</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>`);
sitemapEntries.push(`  <url><loc>${baseUrl}/feed.json</loc><changefreq>daily</changefreq><priority>0.4</priority></url>`);
sitemapEntries.push(`  <url><loc>${baseUrl}/feed.xml</loc><changefreq>daily</changefreq><priority>0.4</priority></url>`);

for (const section of SECTIONS) {
  sitemapEntries.push(`  <url><loc>${baseUrl}/${section.dir}</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`);
  sitemapEntries.push(`  <url><loc>${baseUrl}/content/${section.dir}/_index.md</loc><changefreq>weekly</changefreq><priority>0.6</priority></url>`);
  const dir = path.join(CONTENT_DIR, section.dir);
  for (const file of getFilesInDir(dir)) {
    const slug = file.replace(/\.md$/, "");
    sitemapEntries.push(`  <url><loc>${baseUrl}/${section.dir}/${slug}</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>`);
    sitemapEntries.push(`  <url><loc>${baseUrl}/content/${section.dir}/${file}</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>`);
  }
}

for (const sf of STANDALONE_FILES) {
  const slug = sf.file.replace(/\.md$/, "");
  sitemapEntries.push(`  <url><loc>${baseUrl}/${slug}</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>`);
  sitemapEntries.push(`  <url><loc>${baseUrl}/content/${sf.file}</loc><changefreq>weekly</changefreq><priority>0.5</priority></url>`);
}

fs.writeFileSync(
  path.join(PUBLIC_DIR, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.join("\n")}
</urlset>
`,
  "utf-8"
);
console.log(`wrote public/sitemap.xml (${sitemapEntries.length} URLs)`);
