---
title: "AI Future Ready"
type: index
id: "site-index"
description: "Agent-ready AI reference. Structured markdown with YAML frontmatter, JSON APIs, and machine-readable discovery. Built for both humans and AI agents."
last_updated: "2026-04-24"
agent_protocols:
  well_known_ai: "/.well-known/ai.json"
  llms_txt: "/llms.txt"
  llms_full: "/llms-full.txt"
  json_api: "/api/v1/index.json"
  schema: "/api/v1/schema.json"
  changes: "/api/v1/changes.json"
  search_index: "/search-index.json"
  raw_content: "/content/_index.md"
  feed_json: "/feed.json"
  feed_xml: "/feed.xml"
  mcp_docs: "/mcp"
  sitemap: "/sitemap.xml"
view_modes:
  default: "agent"
  agent: "Raw markdown view with YAML frontmatter."
  human: "Rendered markdown view with richer typography and color."
commercial:
  pricing: "/pricing"
  pro_data: "/pricing/pro-data"
  commercial_license: "/pricing/commercial-license"
  agent_readiness_audit: "/pricing/agent-readiness-audit"
  pro_data_sample: "/api/v1/samples/pro-data.json"
  pricing_snapshots: "/api/v1/pricing-snapshots.json"
  contact: "/contact"
  about: "/about"
---

# AI Future Ready

A structured, agent-ready reference for the AI landscape. Every page is pure markdown with YAML frontmatter, served in multiple formats: rendered HTML for humans, raw markdown for agents, and structured JSON via API.

## View Modes

- **Agent mode:** raw markdown, visible YAML frontmatter, terminal-style monospace, source-faithful.
- **Human mode:** rendered markdown, stronger typography, color, spacing, and table formatting.

The view switch changes presentation only. Raw markdown, `llms.txt`, JSON APIs, hashes, feeds, and content URLs do not change.

## Agent Access

If you are an AI agent, start here:

- **Discovery:** [llms.txt](/llms.txt) — machine-readable index of all content
- **Well-known manifest:** [/.well-known/ai.json](/.well-known/ai.json) — protocol discovery for agents
- **Full dump:** [llms-full.txt](/llms-full.txt) — all content in a single file
- **JSON API:** [/api/v1/index.json](/api/v1/index.json) — structured data for all content types
- **Schema:** [/api/v1/schema.json](/api/v1/schema.json) — field types, required fields, examples, and generated fields
- **Raw markdown:** `/content/[type]/[slug].md` — any page as markdown with YAML frontmatter
- **Search:** [search-index.json](/search-index.json) — structured index with titles, descriptions, tags
- **Changes:** [/api/v1/changes.json](/api/v1/changes.json) — queryable changes with `?since=YYYY-MM-DD`
- **Change feed:** [feed.json](/feed.json) and [feed.xml](/feed.xml) — detect updates without crawling everything
- **Recommendations:** [/api/v1/recommend.json](/api/v1/recommend.json) — pre-scored model rankings by task
- **Agent usage:** [Agent Usage Guide](guides/agent-usage.md) — concrete fetch patterns for AI agents
- **MCP access:** [/mcp](/mcp) — local MCP server setup and available tools
- **Commercial access:** [Pricing](pricing/_index.md), [Pro Data](pricing/pro-data.md), [Commercial Data License](pricing/commercial-license.md), and [Agent Readiness Audit](pricing/agent-readiness-audit.md)
- **Public sample:** [/api/v1/samples/pro-data.json](/api/v1/samples/pro-data.json) — representative Pro Data shape
- **Pricing snapshots:** [/api/v1/pricing-snapshots.json](/api/v1/pricing-snapshots.json) — generated model pricing snapshot

## Content

- [Models](models/_index.md) — 33+ AI models with benchmarks, pricing, and structured metadata
- [Providers](providers/_index.md) — Provider profiles for model ecosystems and selection tradeoffs
- [Agents](agents/_index.md) — 15+ agent platforms and frameworks
- [API Reference](api-reference/_index.md) — Agent-facing API, discovery, schema, samples, and changelog docs
- [Comparisons](comparisons/_index.md) — Head-to-head model analysis
- [Blog](blog/_index.md) — Opinionated analysis of the AI landscape
- [Glossary](glossary/_index.md) — 76 AI terms
- [Timeline](timeline/_index.md) — 77 events from 1950 to 2026
- [Guides](guides/_index.md) — Model-selection playbooks, recipes, methodology, and foundations
- [Use Cases](use-cases/_index.md) — AI applied to writing, coding, business, education, research
- [Pricing](pricing/_index.md) — Free access, Pro Data, commercial licensing, agent-readiness audits, and model pricing references
- [Prompt Patterns](prompt-patterns/_index.md) — Provider-specific prompt templates
- [About](about.md) — What the site is, why it exists, and how to trust the data
- [Contact](contact.md) — Request checklist for Pro Data, audits, licensing, or sponsorship; no payment flow is configured

## Content Schema

Every content file uses YAML frontmatter. Common fields:
- `title` — page title
- `type` — content type (model, agent, blog, guide, comparison, etc.)
- `description` — one-line summary
- `last_updated` — ISO date of last content update
- `last_verified` — ISO date factual claims were last checked, when available
- `content_hash` / `sha256` — generated SHA-256 hash of the raw markdown in JSON outputs
- `relationships` — generated internal links and related content in JSON outputs

Model-specific fields: `id`, `provider`, `pricing`, `benchmarks`, `context_window`, `best_for`, `tags`
Agent-specific fields: `id`, `category`, `website`, `license`, `pricing`, `languages`, `best_for`

## About

This site demonstrates agent-ready web architecture: structured content, machine-readable metadata, multiple access protocols, and dual-audience design. The AI reference library is both useful content and a living proof-of-concept.

Last updated: 2026-04-24
