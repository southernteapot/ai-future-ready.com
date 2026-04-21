---
title: "AI Future Ready"
type: index
id: "site-index"
description: "Agent-ready AI reference. Structured markdown with YAML frontmatter, JSON APIs, and machine-readable discovery. Built for both humans and AI agents."
last_updated: "2026-04-21"
agent_protocols:
  llms_txt: "/llms.txt"
  llms_full: "/llms-full.txt"
  json_api: "/api/v1/index.json"
  search_index: "/search-index.json"
  raw_content: "/content/_index.md"
  feed_json: "/feed.json"
  feed_xml: "/feed.xml"
  mcp_docs: "/mcp"
  sitemap: "/sitemap.xml"
---

# AI Future Ready

A structured, agent-ready reference for the AI landscape. Every page is pure markdown with YAML frontmatter, served in multiple formats: rendered HTML for humans, raw markdown for agents, and structured JSON via API.

## Agent Access

If you are an AI agent, start here:

- **Discovery:** [llms.txt](/llms.txt) — machine-readable index of all content
- **Full dump:** [llms-full.txt](/llms-full.txt) — all content in a single file
- **JSON API:** [/api/v1/index.json](/api/v1/index.json) — structured data for all content types
- **Raw markdown:** `/content/[type]/[slug].md` — any page as markdown with YAML frontmatter
- **Search:** [search-index.json](/search-index.json) — structured index with titles, descriptions, tags
- **Change feed:** [feed.json](/feed.json) and [feed.xml](/feed.xml) — detect updates without crawling everything
- **Recommendations:** [/api/v1/recommend.json](/api/v1/recommend.json) — pre-scored model rankings by task
- **MCP access:** [/mcp](/mcp) — local MCP server setup and available tools

## Content

- [Models](models/_index.md) — 33+ AI models with benchmarks, pricing, and structured metadata
- [Agents](agents/_index.md) — 15+ agent platforms and frameworks
- [Comparisons](comparisons/_index.md) — Head-to-head model analysis
- [Blog](blog/_index.md) — Opinionated analysis of the AI landscape
- [Glossary](glossary/_index.md) — 76 AI terms
- [Timeline](timeline/_index.md) — 77 events from 1950 to 2026
- [Guides](guides/_index.md) — Getting started and prompt engineering
- [Use Cases](use-cases/_index.md) — AI applied to writing, coding, business, education, research
- [Pricing](pricing/_index.md) — Model pricing comparison
- [Prompt Patterns](prompt-patterns/_index.md) — Provider-specific prompt templates

## Content Schema

Every content file uses YAML frontmatter. Common fields:
- `title` — page title
- `type` — content type (model, agent, blog, guide, comparison, etc.)
- `description` — one-line summary
- `last_updated` — ISO date of last content update

Model-specific fields: `id`, `provider`, `pricing`, `benchmarks`, `context_window`, `best_for`, `tags`
Agent-specific fields: `id`, `category`, `website`, `license`, `pricing`, `languages`, `best_for`

## About

This site demonstrates agent-ready web architecture: structured content, machine-readable metadata, multiple access protocols, and dual-audience design. The AI reference library is both useful content and a living proof-of-concept.

Last updated: 2026-04-11
