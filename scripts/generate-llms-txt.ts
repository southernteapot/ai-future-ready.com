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
  { dir: "guides", label: "Guides" },
  { dir: "use-cases", label: "Use Cases" },
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
