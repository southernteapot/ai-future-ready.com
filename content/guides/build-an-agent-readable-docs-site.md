---
title: "Build an Agent-Readable Docs Site"
type: guide
id: "build-agent-readable-docs-site"
description: "A practical recipe for making documentation readable by AI agents with markdown source, discovery files, schema, search index, feeds, and hashes."
last_updated: "2026-04-24"
tags:
- "recipe"
- "agent-ready"
- "docs"
- "markdown"
- "discovery"
---

# Build an Agent-Readable Docs Site

Use this recipe when a user wants agents to read, cite, monitor, and use their documentation reliably.

## Minimum Viable Agent-Readable Site

- Markdown source for every page
- YAML or JSON metadata
- `/llms.txt`
- `/content/` raw files
- `/api/v1/index.json`
- `/search-index.json`
- `/feed.json`
- `/sitemap.xml`
- `robots.txt` that allows content and API paths

## Better Version

Add:

- `/.well-known/ai.json`
- `/api/v1/schema.json`
- per-item JSON
- content hashes
- changed-since endpoint
- source and verification metadata

## Content Rules

- One canonical source per page.
- Stable IDs that survive URL changes.
- Dates that mean content change, not deploy time.
- Typed metadata for fields agents filter on.
- Raw content that works without JavaScript.

## Agent Test

An agent should be able to answer:

- What content exists?
- What changed since my last visit?
- What is the raw source for this page?
- What schema should I expect?
- Can I verify my cached copy?

## Failure Mode

The common mistake is shipping a JSON API that drifts from the human docs. Use one content source and generate every representation from it.
