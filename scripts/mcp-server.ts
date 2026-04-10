#!/usr/bin/env npx tsx
/**
 * MCP Server for AI Future Ready
 *
 * Exposes AI model/agent data as MCP tools that any compatible agent
 * (Claude Code, etc.) can discover and call.
 *
 * Run: npx tsx scripts/mcp-server.ts
 * Or add to Claude Code: claude mcp add ai-future-ready npx tsx scripts/mcp-server.ts
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");

// ─── Helpers ─────────────────────────────────────────────

function readContent(type: string, slug: string) {
  const filePath = path.join(CONTENT_DIR, type, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { meta: data, content, raw, slug };
}

function listSlugs(type: string): string[] {
  const dir = path.join(CONTENT_DIR, type);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md") && f !== "_index.md")
    .map((f) => f.replace(/\.md$/, ""));
}

function getAllOfType(type: string) {
  return listSlugs(type).map((slug) => readContent(type, slug)!).filter(Boolean);
}

// ─── Server ──────────────────────────────────────────────

const server = new McpServer({
  name: "ai-future-ready",
  version: "1.0.0",
});

// ─── Tools ───────────────────────────────────────────────

server.tool(
  "search_models",
  "Search AI models by name, provider, or keyword. Returns matching models with benchmarks and pricing.",
  { query: z.string().describe("Search term (model name, provider, or keyword)") },
  async ({ query }) => {
    const models = getAllOfType("models");
    const q = query.toLowerCase();
    const matches = models.filter((m) => {
      const meta = m.meta as Record<string, unknown>;
      return (
        String(meta.title || "").toLowerCase().includes(q) ||
        String(meta.provider || "").toLowerCase().includes(q) ||
        String(meta.description || "").toLowerCase().includes(q) ||
        (Array.isArray(meta.tags) && meta.tags.some((t: string) => t.toLowerCase().includes(q)))
      );
    });
    if (matches.length === 0) {
      return { content: [{ type: "text" as const, text: `No models found matching "${query}".` }] };
    }
    const text = matches
      .map((m) => {
        const meta = m.meta as Record<string, unknown>;
        const pricing = meta.pricing as Record<string, string> | undefined;
        return `## ${meta.title}\n${meta.description}\nProvider: ${meta.provider} | Context: ${meta.context_window} | Pricing: ${pricing?.input} / ${pricing?.output}`;
      })
      .join("\n\n");
    return { content: [{ type: "text" as const, text }] };
  }
);

server.tool(
  "get_model",
  "Get full details for a specific AI model by its slug (e.g. 'claude-opus-4.6', 'gpt-5.4').",
  { slug: z.string().describe("Model slug, e.g. 'claude-opus-4.6'") },
  async ({ slug }) => {
    const item = readContent("models", slug);
    if (!item) {
      const available = listSlugs("models").join(", ");
      return { content: [{ type: "text" as const, text: `Model "${slug}" not found. Available: ${available}` }] };
    }
    return { content: [{ type: "text" as const, text: item.raw }] };
  }
);

server.tool(
  "recommend_model",
  "Get AI model recommendations based on task, budget, and requirements.",
  {
    task: z.enum(["coding", "writing", "math", "reasoning", "multilingual", "speed"]).optional().describe("Primary task"),
    budget: z.enum(["free", "cheap", "any"]).optional().describe("Budget constraint"),
    type: z.enum(["open-source", "proprietary", "any"]).optional().describe("Model type preference"),
    limit: z.number().optional().default(5).describe("Number of recommendations"),
  },
  async ({ task, budget, type: modelType, limit }) => {
    const models = getAllOfType("models");
    const scored = models.map((m) => {
      const meta = m.meta as Record<string, unknown>;
      const benchmarks = (meta.benchmarks || {}) as Record<string, number>;
      const pricing = (meta.pricing || {}) as Record<string, unknown>;
      const isFree = pricing.free === true;
      let score = 0;

      if (task && benchmarks[task]) {
        score += benchmarks[task] * 2;
      } else {
        const vals = Object.values(benchmarks).filter((v) => typeof v === "number");
        if (vals.length) score += vals.reduce((a, b) => a + b, 0) / vals.length;
      }

      if (budget === "free" && !isFree) score -= 500;
      if (budget === "cheap" && !isFree) {
        const pm = String(pricing.input || "").match(/\$([\d.]+)/);
        if (pm) {
          const p = parseFloat(pm[1]);
          if (p <= 1) score += 25;
          else if (p <= 3) score += 15;
          else score -= 10;
        }
      }

      if (modelType === "open-source" && meta.model_type !== "open-source") score -= 500;
      if (modelType === "proprietary" && meta.model_type !== "proprietary") score -= 500;

      return { slug: m.slug, title: meta.title, provider: meta.provider, score, pricing: { input: pricing.input, output: pricing.output }, task_score: task ? benchmarks[task] : null };
    });

    const results = scored.filter((m) => m.score > 0).sort((a, b) => b.score - a.score).slice(0, limit);
    const text = results.map((r, i) => `${i + 1}. **${r.title}** (${r.provider}) — ${r.task_score ? `${task}: ${r.task_score}/100` : `score: ${r.score}`} — ${r.pricing.input} / ${r.pricing.output}`).join("\n");
    return { content: [{ type: "text" as const, text: text || "No models match your criteria." }] };
  }
);

server.tool(
  "get_agent_platform",
  "Get details about an AI agent platform by slug (e.g. 'langgraph', 'claude-code').",
  { slug: z.string().describe("Agent platform slug") },
  async ({ slug }) => {
    const item = readContent("agents", slug);
    if (!item) {
      const available = listSlugs("agents").join(", ");
      return { content: [{ type: "text" as const, text: `Agent "${slug}" not found. Available: ${available}` }] };
    }
    return { content: [{ type: "text" as const, text: item.raw }] };
  }
);

server.tool(
  "list_models",
  "List all available AI models with their provider and type.",
  {},
  async () => {
    const models = getAllOfType("models");
    const text = models
      .map((m) => {
        const meta = m.meta as Record<string, unknown>;
        return `- ${meta.title} (${meta.provider}, ${meta.model_type})`;
      })
      .join("\n");
    return { content: [{ type: "text" as const, text }] };
  }
);

server.tool(
  "list_agents",
  "List all available AI agent platforms.",
  {},
  async () => {
    const agents = getAllOfType("agents");
    const text = agents
      .map((a) => {
        const meta = a.meta as Record<string, unknown>;
        return `- ${meta.title} (${meta.category_label}, ${meta.license})`;
      })
      .join("\n");
    return { content: [{ type: "text" as const, text }] };
  }
);

server.tool(
  "get_glossary",
  "Look up AI/ML terms from the glossary.",
  { query: z.string().describe("Term to look up, or 'all' for the full glossary") },
  async ({ query }) => {
    const item = readContent("glossary", "_index");
    if (!item) return { content: [{ type: "text" as const, text: "Glossary not available." }] };
    if (query === "all") {
      return { content: [{ type: "text" as const, text: item.content }] };
    }
    // Find the specific term
    const q = query.toLowerCase();
    const lines = item.content.split("\n");
    let found = "";
    let capturing = false;
    for (const line of lines) {
      if (line.startsWith("### ") && line.toLowerCase().includes(q)) {
        capturing = true;
        found += line + "\n";
      } else if (capturing && line.startsWith("### ")) {
        break;
      } else if (capturing) {
        found += line + "\n";
      }
    }
    return { content: [{ type: "text" as const, text: found.trim() || `Term "${query}" not found in glossary.` }] };
  }
);

server.tool(
  "get_comparison",
  "Get a head-to-head model comparison (e.g. 'claude-vs-gpt', 'best-coding-models').",
  { slug: z.string().describe("Comparison slug: claude-vs-gpt, claude-vs-gemini, gpt-vs-gemini, open-source-vs-proprietary, best-coding-models, cheapest-models") },
  async ({ slug }) => {
    const item = readContent("comparisons", slug);
    if (!item) {
      const available = listSlugs("comparisons").join(", ");
      return { content: [{ type: "text" as const, text: `Comparison "${slug}" not found. Available: ${available}` }] };
    }
    return { content: [{ type: "text" as const, text: item.raw }] };
  }
);

server.tool(
  "get_changelog",
  "Get recent AI industry changes, model releases, and events. Useful for catching up on what happened after your knowledge cutoff.",
  {},
  async () => {
    const filePath = path.join(CONTENT_DIR, "changelog.md");
    if (!fs.existsSync(filePath)) return { content: [{ type: "text" as const, text: "Changelog not available." }] };
    const raw = fs.readFileSync(filePath, "utf-8");
    return { content: [{ type: "text" as const, text: raw }] };
  }
);

// ─── Start ───────────────────────────────────────────────

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(console.error);
