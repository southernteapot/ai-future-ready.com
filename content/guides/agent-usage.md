---
title: "Agent Usage Guide"
type: guide
id: "agent-usage-guide"
description: "Concrete fetch patterns for AI agents using AI Future Ready: discovery, raw markdown, schema, per-item JSON, recommendations, changes, and hashes."
last_updated: "2026-04-24"
tags:
- "agents"
- "api"
- "discovery"
- "markdown"
- "schema"
---

# Agent Usage Guide

This site is meant to be read by agents directly. Start with discovery, then choose the smallest endpoint that answers your task.

## 1. Discover the site

```bash
curl https://ai-future-ready.com/.well-known/ai.json
curl https://ai-future-ready.com/llms.txt
```

Use `/.well-known/ai.json` to find available protocols. Use `/llms.txt` when you want a compact content map.

## 2. Fetch the whole corpus

```bash
curl https://ai-future-ready.com/llms-full.txt
```

Use this when you want a single-file snapshot for indexing, embedding, or offline reasoning.

## 3. Fetch one content item as markdown

```bash
curl https://ai-future-ready.com/content/models/claude-opus-4.6.md
```

The markdown file is canonical. It includes YAML frontmatter and body text in one self-contained document.

## 4. Fetch one content item as JSON

```bash
curl https://ai-future-ready.com/api/v1/models/claude-opus-4.6.json
```

Use per-item JSON when you need typed metadata, generated relationship data, content hashes, and the markdown body without parsing frontmatter yourself.

## 5. Learn the schema

```bash
curl https://ai-future-ready.com/api/v1/schema.json
```

Use the schema endpoint before assuming field names. It lists observed fields, value types, coverage, examples, and generated fields.

## 6. Search by structured index

```bash
curl https://ai-future-ready.com/search-index.json
```

Use the search index for lightweight discovery across titles, descriptions, tags, providers, routes, hashes, and generated relationships.

## 7. Get recommendations

```bash
curl https://ai-future-ready.com/api/v1/recommend.json
curl https://ai-future-ready.com/api/v1/recommend/coding.json
curl https://ai-future-ready.com/api/v1/recommend/cheap.json
curl https://ai-future-ready.com/api/v1/recommend/local.json
curl https://ai-future-ready.com/api/v1/recommend/agentic.json
```

Use recommendation endpoints when your task is "choose the best model for X" rather than "read every model page."

## 8. Track changes

```bash
curl "https://ai-future-ready.com/api/v1/changes.json?since=2026-04-01"
curl "https://ai-future-ready.com/api/v1/changes.json?type=model"
curl https://ai-future-ready.com/feed.json
```

Use `changes.json` for queryable deltas. Use `feed.json` or `feed.xml` for feed readers and polling workflows.

## 9. Verify cached content

Every generated JSON item includes:

```json
{
  "content_hash": "sha256-of-raw-markdown",
  "sha256": "same-value"
}
```

Compare this value against your cached copy before re-reading large content.

## 10. Common workflows

Find the best model for coding:

```bash
curl https://ai-future-ready.com/api/v1/recommend/coding.json
```

Fetch details for the top result:

```bash
curl https://ai-future-ready.com/api/v1/models/claude-opus-4.6.json
```

Check whether content changed since your last crawl:

```bash
curl "https://ai-future-ready.com/api/v1/changes.json?since=2026-04-10"
```

Fetch raw source for citation or summarization:

```bash
curl https://ai-future-ready.com/content/models/claude-opus-4.6.md
```
