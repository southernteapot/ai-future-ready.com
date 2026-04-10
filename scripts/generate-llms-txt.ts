/**
 * Generates llms.txt (index) and llms-full.txt (all content inlined)
 * in public/. Run before build or on content change.
 *
 * Usage: npx tsx scripts/generate-llms-txt.ts
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");
const PUBLIC_DIR = path.join(process.cwd(), "public");

interface Entry {
  title: string;
  description: string;
  mdPath: string;
  raw: string;
  section: string;
}

function readMd(filePath: string): { title: string; description: string; raw: string } | null {
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data } = matter(raw);
  return {
    title: (data.title as string) || path.basename(filePath, ".md"),
    description: (data.description as string) || "",
    raw,
  };
}

function getFilesInDir(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md") && f !== "_index.md")
    .sort();
}

// Section ordering
const SECTIONS = [
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

// Collect all entries
const allEntries: Entry[] = [];

for (const section of SECTIONS) {
  const dir = path.join(CONTENT_DIR, section.dir);

  // _index.md
  const index = readMd(path.join(dir, "_index.md"));
  if (index) {
    allEntries.push({
      ...index,
      mdPath: `/content/${section.dir}/_index.md`,
      section: section.label,
    });
  }

  // Individual files
  for (const file of getFilesInDir(dir)) {
    const entry = readMd(path.join(dir, file));
    if (entry) {
      allEntries.push({
        ...entry,
        mdPath: `/content/${section.dir}/${file}`,
        section: section.label,
      });
    }
  }
}

// ─── llms.txt (index only) ──────────────────────────────

const indexLines: string[] = [
  "# AI Future Ready",
  "> Comprehensive AI reference — models, agents, glossary, timeline, guides, use cases, and more. Designed for AI agents and humans alike.",
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
const standaloneFiles = [
  { file: "changelog.md", label: "Changelog" },
  { file: "compatibility.md", label: "Compatibility Matrix" },
];

for (const sf of standaloneFiles) {
  const entry = readMd(path.join(CONTENT_DIR, sf.file));
  if (entry) {
    indexLines.push("");
    indexLines.push(`## ${sf.label}`);
    indexLines.push(`- [${entry.title}](/content/${sf.file}): ${entry.description}`);
    // Also add to allEntries for llms-full.txt
    allEntries.push({ ...entry, mdPath: `/content/${sf.file}`, section: sf.label });
  }
}

indexLines.push("");
fs.writeFileSync(path.join(PUBLIC_DIR, "llms.txt"), indexLines.join("\n"), "utf-8");
console.log(`wrote public/llms.txt (${indexLines.length} lines)`);

// ─── llms-full.txt (all content inlined) ─────────────────

const fullLines: string[] = [
  "# AI Future Ready — Full Content",
  "> All content from aifutureready.com in a single file.",
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
      href: entry.mdPath
        .replace(/^\/content/, "")
        .replace(/\.md$/, ""),
      mdPath: entry.mdPath,
      provider: (data.provider as string) || undefined,
      tags: (data.tags as string[]) || [],
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
    description: "Structured JSON API for AI reference data.",
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
      title: (data.title as string) || slug,
      description: (data.description as string) || "",
      last_updated: (data.last_updated as string) || "",
      markdown_url: `/content/${t}/${f}`,
      html_url: `/${t}/${slug}`,
      ...(data.provider && { provider: data.provider }),
      ...(data.pricing && { pricing: data.pricing }),
      ...(data.benchmarks && { benchmarks: data.benchmarks }),
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

// ─── robots.txt ──────────────────────────────────────────

fs.writeFileSync(
  path.join(PUBLIC_DIR, "robots.txt"),
  `User-agent: *
Allow: /
Allow: /content/

Sitemap: https://ai-future-ready.com/sitemap.xml
Host: https://ai-future-ready.com
`,
  "utf-8"
);
console.log("wrote public/robots.txt");

// ─── sitemap.xml ─────────────────────────────────────────

const baseUrl = "https://ai-future-ready.com";
const today = new Date().toISOString().split("T")[0];
const sitemapEntries: string[] = [];

sitemapEntries.push(`  <url><loc>${baseUrl}</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>`);

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
