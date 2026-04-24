---
title: "Agent API Reference"
type: index
id: "api-reference"
description: "Use the AI Future Ready agent API: JSON indexes, per-item data, raw markdown, schema, changes, recommendations, pricing snapshots, feeds, and search."
last_updated: "2026-04-24"
---

# Agent API Reference

This site exposes structured content through multiple machine-readable access paths. All endpoints are public, require no authentication, and return typed data.

## Commercial Access

The public API stays open. Paid access is intended for teams that need commercial reuse rights, bulk packaging, richer pricing snapshots, source verification metadata, change history, and support.

| Page | Description |
|------|-------------|
| [`/pricing`](/pricing) | Free access, Pro Data, commercial licensing, audits, and model pricing references |
| [`/pricing/pro-data`](/pricing/pro-data) | Draft Pro Data package, export formats, paid API targets, and included fields |
| [`/pricing/commercial-license`](/pricing/commercial-license) | Draft commercial data license shape |
| [`/pricing/agent-readiness-audit`](/pricing/agent-readiness-audit) | Service package for making external sites agent-readable |
| [`/pricing/pro-data-sample`](/pricing/pro-data-sample) | Public sample of the planned Pro Data JSON shape |
| [`/pricing/sponsor-policy`](/pricing/sponsor-policy) | Disclosure and ranking rules for sponsorships |
| [`/api-reference/data-changelog`](/api-reference/data-changelog) | Data update and change-tracking notes |

Draft paid API targets use `/api/pro/v1/`. They are not implemented yet.

## Discovery

| Endpoint | Format | Description |
|----------|--------|-------------|
| [`/.well-known/ai.json`](/.well-known/ai.json) | JSON | Agent discovery manifest for protocols and capabilities |
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
| [`/api/v1/schema.json`](/api/v1/schema.json) | Observed fields, value types, coverage, examples, and generated fields |
| [`/api/v1/models.json`](/api/v1/models.json) | All models with pricing, benchmarks, context windows, and metadata |
| [`/api/v1/models/claude-opus-4.6.json`](/api/v1/models/claude-opus-4.6.json) | Per-item JSON with metadata, body text, relationships, and hashes |
| [`/api/v1/providers.json`](/api/v1/providers.json) | Provider profiles and ecosystem guidance |
| [`/api/v1/agents.json`](/api/v1/agents.json) | All agent platforms with categories, licensing, and languages |
| [`/api/v1/comparisons.json`](/api/v1/comparisons.json) | Model comparison summaries |
| [`/api/v1/blog.json`](/api/v1/blog.json) | Blog posts with dates, categories, and descriptions |
| [`/api/v1/recommend.json`](/api/v1/recommend.json) | Pre-scored model rankings by task |
| [`/api/v1/recommend/coding.json`](/api/v1/recommend/coding.json) | Task-specific recommendation slice |
| [`/api/v1/model-verification.json`](/api/v1/model-verification.json) | Model-level verification inventory and source-coverage checklist |
| [`/api/v1/pricing-snapshots.json`](/api/v1/pricing-snapshots.json) | Generated current pricing snapshot for model entries |
| [`/api/v1/samples/pro-data.json`](/api/v1/samples/pro-data.json) | Public sample of planned Pro Data fields |
| [`/api/v1/changes.json?since=2026-04-01`](/api/v1/changes.json?since=2026-04-01) | Queryable changed-since endpoint |

All endpoints return JSON with consistent field naming. No authentication required.

Per-item JSON uses this pattern:

```
/api/v1/[type]/[slug].json
```

Recommendation slices use this pattern:

```
/api/v1/recommend/[task].json
```

Supported recommendation tasks include `coding`, `writing`, `math`, `reasoning`, `multilingual`, `speed`, `research`, `cheap`, `local`, `agentic`, `images`, and `education`.

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

Generated JSON fields: `markdown_url`, `html_url`, `api_url`, `content_hash`, `sha256`, `relationships`, `content_text`

See the [Agent-Ready Web Standard](/standard) for the full metadata specification.
