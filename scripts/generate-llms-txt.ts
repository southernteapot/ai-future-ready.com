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
const GENERATED_DATE = new Date().toISOString().split("T")[0];

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

interface InternalLink {
  text: string;
  href: string;
  html_path: string;
  markdown_url?: string;
  target_id?: string;
  target_type?: string;
  target_title?: string;
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

function slugFromMdPath(mdPath: string): string {
  return path.posix.basename(mdPath, ".md");
}

function typeFromMdPath(mdPath: string): string {
  const match = mdPath.match(/^\/content\/([^/]+)\//);
  return match?.[1] ?? "standalone";
}

function normalizeRoute(route: string): string {
  if (!route || route === "/") return "/";
  const clean = route.replace(/\/+$/, "");
  return clean || "/";
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

function apiPathForEntry(entry: Entry): string | null {
  if (entry.mdPath.endsWith("/_index.md") || !entry.mdPath.includes("/")) {
    return null;
  }

  if (!entry.mdPath.startsWith("/content/")) return null;
  const withoutPrefix = entry.mdPath.replace(/^\/content\//, "");
  const parts = withoutPrefix.split("/");
  if (parts.length !== 2) return null;

  const [type, file] = parts;
  if (!file.endsWith(".md")) return null;
  return `/api/v1/${type}/${file.replace(/\.md$/, "")}.json`;
}

function getTags(meta: Record<string, unknown>): string[] {
  return Array.isArray(meta.tags)
    ? (meta.tags as unknown[]).filter((tag): tag is string => typeof tag === "string")
    : [];
}

function getStringList(meta: Record<string, unknown>, field: string): string[] {
  return Array.isArray(meta[field])
    ? (meta[field] as unknown[]).filter((item): item is string => typeof item === "string")
    : [];
}

function valueType(value: unknown): string {
  if (Array.isArray(value)) return "array";
  if (value === null) return "null";
  return typeof value;
}

function parseUsd(value: unknown): number | null {
  if (typeof value !== "string") return null;
  if (/free/i.test(value)) return 0;
  const match = value.match(/\$([0-9]+(?:\.[0-9]+)?)/);
  return match ? Number(match[1]) : null;
}

function getPricingCost(meta: Record<string, unknown>): number | null {
  const pricing = meta.pricing as Record<string, unknown> | undefined;
  if (!pricing || typeof pricing !== "object") return null;

  const input = parseUsd(pricing.input);
  const output = parseUsd(pricing.output);
  if (input === null && output === null) return null;
  return (input ?? 0) + (output ?? 0);
}

function getObjectList(meta: Record<string, unknown>, field: string): Record<string, unknown>[] {
  return Array.isArray(meta[field])
    ? (meta[field] as unknown[]).filter(
        (item): item is Record<string, unknown> =>
          typeof item === "object" && item !== null && !Array.isArray(item)
      )
    : [];
}

function getSourceList(value: unknown): Array<{ title: string; url: string }> {
  return Array.isArray(value)
    ? value
        .filter(
          (item): item is Record<string, unknown> =>
            typeof item === "object" && item !== null && !Array.isArray(item)
        )
        .map((item) => ({
          title:
            typeof item.title === "string"
              ? item.title
              : typeof item.url === "string"
                ? item.url
                : "Source",
          url: typeof item.url === "string" ? item.url : "",
        }))
        .filter((item) => item.url)
    : [];
}

function averageScores(benchmarks: Record<string, number>, fields: string[]): number {
  const scores = fields
    .map((field) => benchmarks[field])
    .filter((score): score is number => typeof score === "number");

  if (scores.length === 0) return 0;
  return Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);
}

function stripMarkdownCode(text: string): string {
  return text
    .replace(/```[\s\S]*?```/g, "")
    .replace(/~~~[\s\S]*?~~~/g, "")
    .replace(/`[^`\n]+`/g, "");
}

function resolveHref(href: string, mdPath: string): { htmlPath: string; mdPath?: string } | null {
  if (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("#")
  ) {
    return null;
  }

  const [pathname] = href.split(/[?#]/, 1);
  if (!pathname) return null;

  if (pathname.startsWith("/content/")) {
    const normalizedMdPath = normalizeRoute(pathname);
    return {
      htmlPath: toHtmlPath(normalizedMdPath),
      mdPath: normalizedMdPath,
    };
  }

  if (pathname.startsWith("/")) {
    return { htmlPath: normalizeRoute(pathname) };
  }

  const baseDir = path.posix.dirname(mdPath);
  const resolved = normalizeRoute(path.posix.normalize(path.posix.join(baseDir, pathname)));

  if (resolved.startsWith("/content/") || resolved.endsWith(".md")) {
    return {
      htmlPath: toHtmlPath(resolved),
      mdPath: resolved,
    };
  }

  return { htmlPath: resolved };
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
  { dir: "api-reference", label: "API Reference" },
  { dir: "models", label: "Models" },
  { dir: "providers", label: "Providers" },
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
  { file: "about.md", label: "About" },
  { file: "changelog.md", label: "Changelog" },
  { file: "compatibility.md", label: "Compatibility Matrix" },
  { file: "contact.md", label: "Contact" },
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

const contentEntries = allEntries.filter((e) => !e.mdPath.endsWith("/_index.md"));
const entriesByMdPath = new Map(allEntries.map((entry) => [entry.mdPath, entry]));
const entriesByHtmlPath = new Map(allEntries.map((entry) => [entry.htmlPath, entry]));

function buildInternalLinks(entry: Entry): InternalLink[] {
  const text = stripMarkdownCode(entry.raw);
  const linkPattern = /\[([^\]]+)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
  const links = new Map<string, InternalLink>();
  let match: RegExpExecArray | null;

  while ((match = linkPattern.exec(text)) !== null) {
    const resolved = resolveHref(match[2], entry.mdPath);
    if (!resolved) continue;

    const target =
      (resolved.mdPath && entriesByMdPath.get(resolved.mdPath)) ||
      entriesByHtmlPath.get(resolved.htmlPath);

    links.set(`${resolved.htmlPath}:${match[1]}`, {
      text: match[1],
      href: match[2],
      html_path: resolved.htmlPath,
      ...(resolved.mdPath && { markdown_url: resolved.mdPath }),
      ...(target?.meta.id && { target_id: String(target.meta.id) }),
      ...(target?.meta.type && { target_type: String(target.meta.type) }),
      ...(target?.title && { target_title: target.title }),
    });
  }

  return Array.from(links.values());
}

function buildRelatedEntries(entry: Entry) {
  const tags = new Set(getTags(entry.meta));
  const provider = typeof entry.meta.provider === "string" ? entry.meta.provider : null;
  const type = String(entry.meta.type ?? typeFromMdPath(entry.mdPath));

  return contentEntries
    .filter((candidate) => candidate.mdPath !== entry.mdPath)
    .map((candidate) => {
      const candidateTags = getTags(candidate.meta);
      const shared_tags = candidateTags.filter((tag) => tags.has(tag));
      let score = shared_tags.length;

      if (candidate.section === entry.section) score += 1;
      if (provider && candidate.meta.provider === provider) score += 2;
      if (candidate.meta.type === type) score += 1;

      return {
        id: String(candidate.meta.id ?? slugFromMdPath(candidate.mdPath)),
        title: candidate.title,
        type: String(candidate.meta.type ?? typeFromMdPath(candidate.mdPath)),
        html_url: candidate.htmlPath,
        markdown_url: candidate.mdPath,
        shared_tags,
        score,
      };
    })
    .filter((candidate) => candidate.score > 0)
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
    .slice(0, 6);
}

function buildRelationships(entry: Entry) {
  const internalLinks = buildInternalLinks(entry);
  const explicitFields = [
    "related_models",
    "related_agents",
    "compared_in",
    "alternatives",
    "depends_on",
  ].filter((field) => Array.isArray(entry.meta[field]));

  return {
    links: internalLinks,
    related: buildRelatedEntries(entry),
    explicit: Object.fromEntries(
      explicitFields.map((field) => [field, entry.meta[field]])
    ),
  };
}

function summarizeEntry(entry: Entry) {
  const slug = slugFromMdPath(entry.mdPath);
  const type = typeFromMdPath(entry.mdPath);
  const apiUrl = apiPathForEntry(entry);

  return {
    slug,
    id: (entry.meta.id as string) || slug,
    type: String(entry.meta.type ?? type),
    title: entry.title,
    description: entry.description,
    last_updated: (entry.meta.last_updated as string) || "",
    last_verified: (entry.meta.last_verified as string) || null,
    verification_status: entry.meta.last_verified ? "verified" : "unverified",
    markdown_url: entry.mdPath,
    html_url: entry.htmlPath,
    ...(apiUrl && { api_url: apiUrl }),
    content_hash: entry.contentHash,
    sha256: entry.contentHash,
    ...(entry.meta.provider && { provider: entry.meta.provider }),
    ...(entry.meta.pricing && { pricing: entry.meta.pricing }),
    ...(entry.meta.benchmarks && { benchmarks: entry.meta.benchmarks }),
    ...(entry.meta.tags && { tags: entry.meta.tags }),
    ...(entry.meta.website && { website: entry.meta.website }),
    ...(entry.meta.date && { date: entry.meta.date }),
    ...(entry.meta.release_date && { release_date: entry.meta.release_date }),
    relationships: buildRelationships(entry),
  };
}

function serializeEntry(entry: Entry) {
  const { content } = matter(entry.raw);

  return {
    ...summarizeEntry(entry),
    metadata: entry.meta,
    content_text: content.trim(),
    content_length: Buffer.byteLength(entry.raw, "utf-8"),
    generated_at: GENERATED_DATE,
  };
}

indexLines.push("");
fs.writeFileSync(path.join(PUBLIC_DIR, "llms.txt"), indexLines.join("\n"), "utf-8");
console.log(`wrote public/llms.txt (${indexLines.length} lines)`);

// ─── llms-full.txt (all content inlined) ─────────────────

const fullLines: string[] = [
  "# AI Future Ready — Full Content",
  `> All content from ${SITE_DOMAIN} in a single file.`,
  `> Generated: ${GENERATED_DATE}`,
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
    return {
      title: entry.title,
      description: entry.description,
      section: entry.section,
      id: (entry.meta.id as string) || undefined,
      type: String(entry.meta.type ?? typeFromMdPath(entry.mdPath)),
      href: entry.htmlPath,
      mdPath: entry.mdPath,
      apiPath: apiPathForEntry(entry) || undefined,
      provider: (entry.meta.provider as string) || undefined,
      tags: getTags(entry.meta),
      last_updated: (entry.meta.last_updated as string) || undefined,
      last_verified: (entry.meta.last_verified as string) || undefined,
      verification_status: entry.meta.last_verified ? "verified" : "unverified",
      published_at: (entry.meta.date as string) || (entry.meta.release_date as string) || undefined,
      content_hash: entry.contentHash,
      sha256: entry.contentHash,
      relationships: buildRelationships(entry),
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
fs.rmSync(apiDir, { recursive: true, force: true });
fs.mkdirSync(apiDir, { recursive: true });

// Build per-type JSON
const contentTypes = fs
  .readdirSync(CONTENT_DIR, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

const typeIndex = contentTypes.map((t) => {
  const indexFile = path.join(CONTENT_DIR, t, "_index.md");
  const indexData = fs.existsSync(indexFile) ? matter(fs.readFileSync(indexFile, "utf-8")).data : {};
  const items = contentEntries.filter((entry) => typeFromMdPath(entry.mdPath) === t);
  return {
    type: t,
    title: (indexData.title as string) || t,
    description: (indexData.description as string) || "",
    count: items.length,
    index_markdown_url: `/content/${t}/_index.md`,
    index_html_url: `/${t}`,
    api_url: `/api/v1/${t}.json`,
    item_api_pattern: `/api/v1/${t}/{slug}.json`,
  };
});

const schema: Record<string, unknown> = {
  name: "AI Future Ready content schema",
  version: "v1",
  generated_at: GENERATED_DATE,
  required_fields: ["title", "type", "id", "description", "last_updated"],
  recommended_fields: [
    "last_verified",
    "sources",
    "tags",
    "relationships",
    "content_hash",
    "sha256",
  ],
  content_types: {},
};

for (const t of contentTypes) {
  const fields = new Map<
    string,
    { count: number; types: Set<string>; examples: unknown[] }
  >();
  const items = contentEntries.filter((entry) => typeFromMdPath(entry.mdPath) === t);

  for (const entry of items) {
    for (const [field, value] of Object.entries(entry.meta)) {
      const existing = fields.get(field) ?? {
        count: 0,
        types: new Set<string>(),
        examples: [],
      };
      existing.count += 1;
      existing.types.add(valueType(value));
      if (existing.examples.length < 3) {
        existing.examples.push(value);
      }
      fields.set(field, existing);
    }
  }

  (schema.content_types as Record<string, unknown>)[t] = {
    count: items.length,
    fields: Object.fromEntries(
      Array.from(fields.entries())
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([field, stats]) => [
          field,
          {
            types: Array.from(stats.types).sort(),
            required: stats.count === items.length,
            coverage: `${stats.count}/${items.length}`,
            examples: stats.examples,
          },
        ])
    ),
    generated_fields: {
      markdown_url: "Raw markdown URL for this item.",
      html_url: "Human-readable page URL for this item.",
      api_url: "Per-item JSON URL for this item.",
      content_hash: "SHA-256 hash of the raw markdown file.",
      sha256: "Alias for content_hash.",
      relationships:
        "Generated links, related items, and explicit relationship fields when present.",
    },
  };
}

fs.writeFileSync(
  path.join(apiDir, "schema.json"),
  JSON.stringify(schema),
  "utf-8"
);

fs.mkdirSync(path.join(PUBLIC_DIR, ".well-known"), { recursive: true });
fs.writeFileSync(
  path.join(PUBLIC_DIR, ".well-known", "ai.json"),
  JSON.stringify({
    name: "AI Future Ready",
    description:
      "Agent-ready AI reference site built from markdown, YAML frontmatter, JSON APIs, and machine-readable discovery.",
    generated_at: GENERATED_DATE,
    llms_txt: "/llms.txt",
    llms_full: "/llms-full.txt",
    api: "/api/v1/index.json",
    api_base: "/api/v1/",
    content_schema: "/api/v1/schema.json",
    raw_content: "/content/",
    search: "/search-index.json",
    changes: "/api/v1/changes.json",
    feed_json: "/feed.json",
    feed_xml: "/feed.xml",
    sitemap: "/sitemap.xml",
    robots: "/robots.txt",
    mcp_docs: "/mcp",
    view_modes: {
      default: "agent",
      agent: "Raw markdown view with YAML frontmatter.",
      human: "Rendered markdown view with richer typography and color.",
    },
    commercial: {
      pricing: "/pricing",
      pro_data: "/pricing/pro-data",
      commercial_license: "/pricing/commercial-license",
      agent_readiness_audit: "/pricing/agent-readiness-audit",
      pro_data_sample: "/api/v1/samples/pro-data.json",
      pricing_snapshots: "/api/v1/pricing-snapshots.json",
      model_verification: "/api/v1/model-verification.json",
      contact: "/contact",
      about: "/about",
      paid_api_status: "draft",
      paid_api_base: "/api/pro/v1/",
    },
    capabilities: {
      raw_markdown: true,
      yaml_frontmatter: true,
      json_api: true,
      per_item_json: true,
      content_hashes: true,
      relationship_metadata: true,
      changed_since_queries: true,
      task_recommendations: true,
      presentation_modes: ["agent", "human"],
    },
  }),
  "utf-8"
);

// Main API index
fs.writeFileSync(
  path.join(apiDir, "index.json"),
  JSON.stringify({
    name: "AI Future Ready API",
    version: "v1",
    description: "Structured JSON API for the agent-ready web — standard, checklist, and AI reference data.",
    generated_at: GENERATED_DATE,
    discovery: {
      well_known_ai: "/.well-known/ai.json",
      llms_txt: "/llms.txt",
      llms_full: "/llms-full.txt",
      schema: "/api/v1/schema.json",
      search_index: "/search-index.json",
      changes: "/api/v1/changes.json",
      feed_json: "/feed.json",
      feed_xml: "/feed.xml",
      raw_content: "/content/_index.md",
      mcp_docs: "/mcp",
      pricing_snapshots: "/api/v1/pricing-snapshots.json",
      model_verification: "/api/v1/model-verification.json",
      pro_data_sample: "/api/v1/samples/pro-data.json",
    },
    commercial: {
      pricing: "/pricing",
      pro_data: "/pricing/pro-data",
      commercial_license: "/pricing/commercial-license",
      agent_readiness_audit: "/pricing/agent-readiness-audit",
      pro_data_sample: "/api/v1/samples/pro-data.json",
      pricing_snapshots: "/api/v1/pricing-snapshots.json",
      model_verification: "/api/v1/model-verification.json",
      contact: "/contact",
      about: "/about",
      paid_api_status: "draft",
      paid_api_base: "/api/pro/v1/",
    },
    endpoint_patterns: {
      type_index: "/api/v1/{type}.json",
      item: "/api/v1/{type}/{slug}.json",
      recommendations: "/api/v1/recommend/{task}.json",
      changes_since: "/api/v1/changes.json?since=YYYY-MM-DD",
    },
    content_types: typeIndex,
  }),
  "utf-8"
);

// Per-type JSON files
for (const t of contentTypes) {
  const items = contentEntries
    .filter((entry) => typeFromMdPath(entry.mdPath) === t)
    .sort((a, b) => a.title.localeCompare(b.title));
  const itemDir = path.join(apiDir, t);
  fs.mkdirSync(itemDir, { recursive: true });

  for (const entry of items) {
    fs.writeFileSync(
      path.join(itemDir, `${slugFromMdPath(entry.mdPath)}.json`),
      JSON.stringify(serializeEntry(entry)),
      "utf-8"
    );
  }

  fs.writeFileSync(
    path.join(apiDir, `${t}.json`),
    JSON.stringify({
      type: t,
      count: items.length,
      schema_url: "/api/v1/schema.json",
      item_api_pattern: `/api/v1/${t}/{slug}.json`,
      items: items.map(summarizeEntry),
    }),
    "utf-8"
  );
}

// Recommend JSON — pre-scored for each task
const recommendationTasks = [
  "coding",
  "writing",
  "math",
  "reasoning",
  "multilingual",
  "speed",
  "research",
  "cheap",
  "local",
  "agentic",
  "images",
  "education",
];
const modelEntries = allEntries.filter((e) => e.section === "Models" && !e.mdPath.endsWith("/_index.md"));
const recommendData: Record<string, unknown[]> = {};
const recommendationDir = path.join(apiDir, "recommend");
fs.mkdirSync(recommendationDir, { recursive: true });

function recommendationScore(task: string, entry: Entry): { score: number; basis: string } {
  const benchmarks = (entry.meta.benchmarks || {}) as Record<string, number>;
  const pricing = (entry.meta.pricing || {}) as Record<string, unknown>;
  const bestFor = getStringList(entry.meta, "best_for").join(" ").toLowerCase();
  const tags = getTags(entry.meta).join(" ").toLowerCase();
  const modality = getStringList(entry.meta, "modality").join(" ").toLowerCase();
  const modelType = String(entry.meta.model_type ?? "").toLowerCase();
  const cost = getPricingCost(entry.meta);

  switch (task) {
    case "research":
      return {
        score: averageScores(benchmarks, ["reasoning", "writing", "math"]),
        basis: "average(reasoning, writing, math)",
      };
    case "cheap":
      return {
        score: cost === null ? 0 : Math.max(0, Math.round(100 - Math.min(cost * 2, 100))),
        basis: "lower estimated input+output USD per 1M tokens ranks higher",
      };
    case "local":
      return {
        score:
          averageScores(benchmarks, ["reasoning", "coding", "writing"]) +
          (modelType.includes("open") || pricing.free === true ? 10 : 0),
        basis: "open-source/free availability plus quality average",
      };
    case "agentic":
      return {
        score:
          Math.max(benchmarks.reasoning ?? 0, benchmarks.coding ?? 0) +
          (/agent|workflow/.test(`${bestFor} ${tags}`) ? 5 : 0),
        basis: "max(reasoning, coding) plus agent/workflow signal",
      };
    case "images":
      return {
        score:
          (modality.includes("image") || tags.includes("image") ? 20 : 0) +
          averageScores(benchmarks, ["reasoning", "writing"]),
        basis: "image modality plus reasoning/writing quality",
      };
    case "education":
      return {
        score: averageScores(benchmarks, ["reasoning", "writing", "math"]),
        basis: "average(reasoning, writing, math)",
      };
    default:
      return {
        score: benchmarks[task] || 0,
        basis: `benchmark.${task}`,
      };
  }
}

for (const task of recommendationTasks) {
  const scored = modelEntries.map((entry) => {
    const pricing = (entry.meta.pricing || {}) as Record<string, unknown>;
    const { score, basis } = recommendationScore(task, entry);
    return {
      slug: path.basename(entry.mdPath, ".md"),
      title: entry.title,
      id: String(entry.meta.id ?? slugFromMdPath(entry.mdPath)),
      provider: (entry.meta.provider as string) || "",
      score,
      score_basis: basis,
      pricing: { input: pricing.input, output: pricing.output },
      free: pricing.free === true,
      estimated_input_output_cost_per_1m: getPricingCost(entry.meta),
      model_type: (entry.meta.model_type as string) || "",
      markdown_url: entry.mdPath,
      html_url: entry.htmlPath,
      api_url: apiPathForEntry(entry),
      sha256: entry.contentHash,
    };
  });
  const ranked = scored
    .filter((item) => (item.score as number) > 0)
    .sort((a, b) => (b.score as number) - (a.score as number) || a.title.localeCompare(b.title))
    .slice(0, 10);
  recommendData[task] = ranked;
  fs.writeFileSync(
    path.join(recommendationDir, `${task}.json`),
    JSON.stringify({
      task,
      generated_at: GENERATED_DATE,
      count: ranked.length,
      items: ranked,
    }),
    "utf-8"
  );
}

fs.writeFileSync(path.join(apiDir, "recommend.json"), JSON.stringify(recommendData), "utf-8");

const providerEntries = contentEntries.filter(
  (entry) => entry.section === "Providers" && !entry.mdPath.endsWith("/_index.md")
);
const providerByName = new Map(
  providerEntries
    .map((entry) => [String(entry.meta.provider ?? entry.title).toLowerCase(), entry] as const)
);

const pricingSnapshots = modelEntries
  .map((entry) => {
    const pricing = (entry.meta.pricing || {}) as Record<string, unknown>;
    const provider = String(entry.meta.provider ?? "");
    const providerEntry = providerByName.get(provider.toLowerCase());
    const sources =
      getObjectList(entry.meta, "pricing_sources").length > 0
        ? getObjectList(entry.meta, "pricing_sources")
        : getObjectList(entry.meta, "sources").length > 0
          ? getObjectList(entry.meta, "sources")
          : providerEntry
            ? getObjectList(providerEntry.meta, "sources")
            : [];
    const inputUsd = parseUsd(pricing.input);
    const outputUsd = parseUsd(pricing.output);

    return {
      slug: slugFromMdPath(entry.mdPath),
      id: String(entry.meta.id ?? slugFromMdPath(entry.mdPath)),
      title: entry.title,
      provider,
      model_type: String(entry.meta.model_type ?? ""),
      context_window: String(entry.meta.context_window ?? ""),
      pricing: {
        input: pricing.input ?? null,
        output: pricing.output ?? null,
        note: pricing.note ?? null,
        free: pricing.free === true,
      },
      parsed_usd_per_1m_tokens: {
        input: inputUsd,
        output: outputUsd,
        input_output_total: getPricingCost(entry.meta),
      },
      last_updated: String(entry.meta.last_updated ?? ""),
      last_verified:
        (entry.meta.last_verified as string) ||
        (providerEntry?.meta.last_verified as string) ||
        null,
      pricing_confidence:
        (entry.meta.pricing_confidence as string) ||
        (providerEntry?.meta.pricing_confidence as string) ||
        "unverified",
      sources,
      markdown_url: entry.mdPath,
      html_url: entry.htmlPath,
      api_url: apiPathForEntry(entry),
      sha256: entry.contentHash,
    };
  })
  .sort((a, b) => a.provider.localeCompare(b.provider) || a.title.localeCompare(b.title));

fs.writeFileSync(
  path.join(apiDir, "pricing-snapshots.json"),
  JSON.stringify({
    generated_at: GENERATED_DATE,
    status: "current_public_snapshot",
    warning:
      "Pricing changes frequently. Use last_verified, pricing_confidence, and official sources before making purchase or routing decisions.",
    count: pricingSnapshots.length,
    items: pricingSnapshots,
  }),
  "utf-8"
);

const modelVerification = modelEntries
  .map((entry) => {
    const provider = String(entry.meta.provider ?? "");
    const providerEntry = providerByName.get(provider.toLowerCase());
    const sources = getSourceList(entry.meta.sources);
    const providerSources = providerEntry ? getSourceList(providerEntry.meta.sources) : [];
    const lastVerified =
      (entry.meta.last_verified as string) ||
      (providerEntry?.meta.last_verified as string) ||
      null;

    return {
      slug: slugFromMdPath(entry.mdPath),
      id: String(entry.meta.id ?? slugFromMdPath(entry.mdPath)),
      title: entry.title,
      provider,
      last_updated: String(entry.meta.last_updated ?? ""),
      last_verified: lastVerified,
      verification_status: entry.meta.last_verified ? "model_verified" : "needs_model_verification",
      has_model_sources: sources.length > 0,
      has_provider_sources: providerSources.length > 0,
      pricing_confidence:
        (entry.meta.pricing_confidence as string) ||
        (providerEntry?.meta.pricing_confidence as string) ||
        "unverified",
      model_listing_confidence:
        (entry.meta.model_listing_confidence as string) ||
        (providerEntry?.meta.model_listing_confidence as string) ||
        "unverified",
      benchmark_confidence:
        (entry.meta.benchmark_confidence as string) ||
        (providerEntry?.meta.benchmark_confidence as string) ||
        "low",
      sources,
      provider_sources: providerSources,
      recommended_next_action:
        sources.length > 0 && entry.meta.last_verified
          ? "review_when_stale"
          : "add_model_level_sources_and_last_verified",
      markdown_url: entry.mdPath,
      html_url: entry.htmlPath,
      api_url: apiPathForEntry(entry),
      sha256: entry.contentHash,
    };
  })
  .sort((a, b) => a.provider.localeCompare(b.provider) || a.title.localeCompare(b.title));

fs.writeFileSync(
  path.join(apiDir, "model-verification.json"),
  JSON.stringify({
    generated_at: GENERATED_DATE,
    status: "verification_inventory",
    warning:
      "Provider-level source metadata does not replace model-level verification. Use this file to prioritize source checks.",
    count: modelVerification.length,
    needs_model_verification: modelVerification.filter(
      (item) => item.verification_status === "needs_model_verification"
    ).length,
    items: modelVerification,
  }),
  "utf-8"
);

const samplesDir = path.join(apiDir, "samples");
fs.mkdirSync(samplesDir, { recursive: true });

const sampleModel =
  modelEntries.find((entry) => entry.meta.id === "claude-opus-4.6") ||
  modelEntries[0];
const sampleProvider = sampleModel
  ? providerByName.get(String(sampleModel.meta.provider ?? "").toLowerCase())
  : undefined;
const samplePricing = sampleModel
  ? pricingSnapshots.find((snapshot) => snapshot.id === String(sampleModel.meta.id))
  : undefined;
const sampleRecommendation = Array.isArray(recommendData.coding)
  ? recommendData.coding[0]
  : null;
const sampleSource =
  samplePricing && samplePricing.sources.length > 0
    ? samplePricing.sources[0]
    : null;

fs.writeFileSync(
  path.join(samplesDir, "pro-data.json"),
  JSON.stringify({
    generated_at: GENERATED_DATE,
    status: "public_sample",
    payment_required: false,
    checkout_configured: false,
    description:
      "Representative sample of the planned Pro Data package. This is not a paid API and does not include private fields.",
    schema_notes: {
      stable_ids: true,
      content_hashes: true,
      source_metadata: true,
      pricing_snapshots: true,
      recommendation_records: true,
      change_records: true,
    },
    model: sampleModel ? serializeEntry(sampleModel) : null,
    provider: sampleProvider ? serializeEntry(sampleProvider) : null,
    pricing_snapshot: samplePricing ?? null,
    recommendation: sampleRecommendation,
    change_record: sampleModel
      ? {
          id: String(sampleModel.meta.id ?? slugFromMdPath(sampleModel.mdPath)),
          type: String(sampleModel.meta.type ?? "model"),
          change_type: "updated",
          changed_at: toIsoDate(sampleModel.updatedAt),
          html_url: sampleModel.htmlPath,
          markdown_url: sampleModel.mdPath,
          api_url: apiPathForEntry(sampleModel),
          sha256: sampleModel.contentHash,
        }
      : null,
    source_record: sampleSource,
  }),
  "utf-8"
);

console.log(
  `wrote public/api/v1/ (${contentTypes.length} type files + per-item files + schema + recommend)`
);

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
    _sha256: entry.contentHash,
    _api_url: apiPathForEntry(entry) ? `${SITE_URL}${apiPathForEntry(entry)}` : undefined,
  }));

const changeEntries = [...contentEntries]
  .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt) || a.title.localeCompare(b.title))
  .map((entry) => ({
    id: String(entry.meta.id ?? slugFromMdPath(entry.mdPath)),
    type: String(entry.meta.type ?? typeFromMdPath(entry.mdPath)),
    title: entry.title,
    change_type: "updated",
    changed_at: toIsoDate(entry.updatedAt),
    date_published: toIsoDate(entry.publishedAt),
    html_url: entry.htmlPath,
    markdown_url: entry.mdPath,
    api_url: apiPathForEntry(entry),
    content_hash: entry.contentHash,
    sha256: entry.contentHash,
    section: entry.section,
    last_verified: (entry.meta.last_verified as string) || null,
    verification_status: entry.meta.last_verified ? "verified" : "unverified",
  }));

fs.writeFileSync(
  path.join(process.cwd(), "src", "lib", "changes-data.json"),
  JSON.stringify({
    generated_at: GENERATED_DATE,
    count: changeEntries.length,
    items: changeEntries,
  }),
  "utf-8"
);
console.log(`wrote src/lib/changes-data.json (${changeEntries.length} items)`);

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
Allow: /api/
Allow: /.well-known/ai.json
Allow: /llms.txt
Allow: /llms-full.txt
Allow: /search-index.json

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
sitemapEntries.push(`  <url><loc>${baseUrl}/.well-known/ai.json</loc><changefreq>weekly</changefreq><priority>0.6</priority></url>`);
sitemapEntries.push(`  <url><loc>${baseUrl}/llms.txt</loc><changefreq>weekly</changefreq><priority>0.6</priority></url>`);
sitemapEntries.push(`  <url><loc>${baseUrl}/llms-full.txt</loc><changefreq>weekly</changefreq><priority>0.5</priority></url>`);
sitemapEntries.push(`  <url><loc>${baseUrl}/search-index.json</loc><changefreq>weekly</changefreq><priority>0.5</priority></url>`);
sitemapEntries.push(`  <url><loc>${baseUrl}/api/v1/index.json</loc><changefreq>weekly</changefreq><priority>0.6</priority></url>`);
sitemapEntries.push(`  <url><loc>${baseUrl}/api/v1/schema.json</loc><changefreq>weekly</changefreq><priority>0.5</priority></url>`);
sitemapEntries.push(`  <url><loc>${baseUrl}/api/v1/changes.json</loc><changefreq>daily</changefreq><priority>0.5</priority></url>`);
sitemapEntries.push(`  <url><loc>${baseUrl}/api/v1/recommend.json</loc><changefreq>weekly</changefreq><priority>0.5</priority></url>`);
sitemapEntries.push(`  <url><loc>${baseUrl}/api/v1/pricing-snapshots.json</loc><changefreq>daily</changefreq><priority>0.5</priority></url>`);
sitemapEntries.push(`  <url><loc>${baseUrl}/api/v1/model-verification.json</loc><changefreq>weekly</changefreq><priority>0.5</priority></url>`);
sitemapEntries.push(`  <url><loc>${baseUrl}/api/v1/samples/pro-data.json</loc><changefreq>weekly</changefreq><priority>0.4</priority></url>`);
for (const task of recommendationTasks) {
  sitemapEntries.push(`  <url><loc>${baseUrl}/api/v1/recommend/${task}.json</loc><changefreq>weekly</changefreq><priority>0.4</priority></url>`);
}
sitemapEntries.push(`  <url><loc>${baseUrl}/feed.json</loc><changefreq>daily</changefreq><priority>0.4</priority></url>`);
sitemapEntries.push(`  <url><loc>${baseUrl}/feed.xml</loc><changefreq>daily</changefreq><priority>0.4</priority></url>`);

for (const section of SECTIONS) {
  sitemapEntries.push(`  <url><loc>${baseUrl}/${section.dir}</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`);
  sitemapEntries.push(`  <url><loc>${baseUrl}/content/${section.dir}/_index.md</loc><changefreq>weekly</changefreq><priority>0.6</priority></url>`);
  sitemapEntries.push(`  <url><loc>${baseUrl}/api/v1/${section.dir}.json</loc><changefreq>weekly</changefreq><priority>0.5</priority></url>`);
  const dir = path.join(CONTENT_DIR, section.dir);
  for (const file of getFilesInDir(dir)) {
    const slug = file.replace(/\.md$/, "");
    sitemapEntries.push(`  <url><loc>${baseUrl}/${section.dir}/${slug}</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>`);
    sitemapEntries.push(`  <url><loc>${baseUrl}/content/${section.dir}/${file}</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>`);
    sitemapEntries.push(`  <url><loc>${baseUrl}/api/v1/${section.dir}/${slug}.json</loc><changefreq>monthly</changefreq><priority>0.4</priority></url>`);
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
