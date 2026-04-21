---
title: "MCP Access"
type: reference
id: "mcp-access"
description: "How to connect AI Future Ready through the Model Context Protocol (MCP), including startup commands, available tools, and example workflows."
last_updated: "2026-04-21"
---

# MCP Access

This site ships with a local MCP server so agents can query the dataset through tools instead of scraping pages or manually fetching markdown files.

## Start the server

Run it from the project root:

```bash
npx tsx scripts/mcp-server.ts
```

If you use Claude Code, add it as an MCP server:

```bash
claude mcp add ai-future-ready npx tsx scripts/mcp-server.ts
```

## What it exposes

The MCP server wraps the content in `content/` and makes it available through focused tools:

| Tool | What it does |
|------|--------------|
| `search_models` | Search models by name, provider, or keyword |
| `get_model` | Return the full markdown for one model |
| `recommend_model` | Rank models by task, budget, and type |
| `get_agent_platform` | Return the full markdown for one agent platform |
| `list_models` | List all model entries |
| `list_agents` | List all agent platforms |
| `get_glossary` | Look up a glossary term or return the full glossary |
| `get_comparison` | Return a comparison page by slug |
| `get_changelog` | Return the changelog for knowledge-cutoff refresh |

## When to use MCP vs raw files

Use MCP when you want:

- structured tool calls instead of URL fetching
- filtered recommendations such as "best cheap coding model"
- a small answer without downloading every markdown file

Use raw files and feeds when you want:

- complete source documents with YAML frontmatter
- bulk sync via `llms-full.txt`
- change detection via [`/feed.json`](/feed.json)

## Good agent workflows

1. Read [`/llms.txt`](/llms.txt) or [`/feed.json`](/feed.json) to discover what exists or what changed.
2. Use MCP for targeted queries such as model search, recommendations, or changelog refresh.
3. Fetch the raw markdown source when you need the full document or exact frontmatter.

## Related endpoints

- [`/api/v1/index.json`](/api/v1/index.json) — structured API index
- [`/content/_index.md`](/content/_index.md) — master markdown index
- [`/feed.json`](/feed.json) — JSON change feed
- [`/changelog`](/changelog) — human-readable updates page
