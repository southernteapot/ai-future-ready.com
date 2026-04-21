---
title: "Agent API Reference"
type: index
id: "api-reference"
description: "Documentation for this site's agent-facing APIs — JSON endpoints, raw content access, discovery files, and search index."
last_updated: "2026-04-21"
---

# Agent API Reference

This site exposes structured content through multiple machine-readable access paths. All endpoints are public, require no authentication, and return typed data.

## Discovery

| Endpoint | Format | Description |
|----------|--------|-------------|
| [`/llms.txt`](/llms.txt) | Text | Machine-readable index of all content — the front door for agents |
| [`/llms-full.txt`](/llms-full.txt) | Text | All content concatenated into one file for bulk access |
| [`/search-index.json`](/search-index.json) | JSON | Structured index with titles, descriptions, tags, and URLs |
| [`/feed.json`](/feed.json) | JSON Feed | Timestamped update feed for change detection |
| [`/feed.xml`](/feed.xml) | RSS | RSS mirror of the change feed |
| [`/sitemap.xml`](/sitemap.xml) | XML | Sitemap with both HTML and raw content URLs |
| [`/robots.txt`](/robots.txt) | Text | Agent access permissions |

## JSON API

Base URL: `/api/v1/`

| Endpoint | Description |
|----------|-------------|
| [`/api/v1/index.json`](/api/v1/index.json) | All content types with descriptions and counts |
| [`/api/v1/models.json`](/api/v1/models.json) | All models with pricing, benchmarks, context windows, and metadata |
| [`/api/v1/agents.json`](/api/v1/agents.json) | All agent platforms with categories, licensing, and languages |
| [`/api/v1/comparisons.json`](/api/v1/comparisons.json) | Model comparison summaries |
| [`/api/v1/blog.json`](/api/v1/blog.json) | Blog posts with dates, categories, and descriptions |
| [`/api/v1/recommend.json`](/api/v1/recommend.json) | Pre-scored model rankings by task (coding, writing, math, reasoning) |

All endpoints return JSON with consistent field naming. No authentication required.

## MCP Access

This project also includes a local MCP server for agents that prefer tool calls over raw document fetches.

- Docs: [`/mcp`](/mcp)
- Server command: `npx tsx scripts/mcp-server.ts`
- Claude Code example: `claude mcp add ai-future-ready npx tsx scripts/mcp-server.ts`

## Raw Content

Every content page is available as raw markdown with YAML frontmatter at a predictable URL:

```
/content/[type]/[slug].md        → individual item
/content/[type]/_index.md        → type index
/content/_index.md               → site index
```

**Examples:**
- [`/content/models/claude-opus-4.6.md`](/content/models/claude-opus-4.6.md) — model page with full metadata
- [`/content/agents/crewai.md`](/content/agents/crewai.md) — agent platform with structured fields
- [`/content/blog/ai-agent-revolution-2026.md`](/content/blog/ai-agent-revolution-2026.md) — blog post with frontmatter

## Metadata Schema

Every content item includes at minimum:

| Field | Type | Description |
|-------|------|-------------|
| `title` | string | Human-readable title |
| `type` | string | Content category |
| `id` | string | Permanent canonical identifier |
| `description` | string | One-line summary |
| `last_updated` | date | ISO 8601 date of last change |

Model-specific fields: `provider`, `pricing` (input/output), `benchmarks`, `context_window`, `best_for`, `tags`

Agent-specific fields: `category`, `license`, `pricing`, `languages`, `github`, `website`

See the [Agent-Ready Web Standard](/standard) for the full metadata specification.
