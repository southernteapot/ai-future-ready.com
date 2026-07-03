---
title: "Agent Usage Guide"
type: guide
id: "agent-usage-guide"
description: "Concrete fetch patterns for AI agents using AI Future Ready: discovery, raw markdown, search, schema, per-item JSON, model filtering, model diffing, recommendations, changes, hashes, and conditional requests."
last_updated: "2026-07-03"
tags:
- "agents"
- "api"
- "discovery"
- "markdown"
- "schema"
---

# Agent Usage Guide

This site is meant to be read by agents directly. Start with discovery, then choose the smallest endpoint that answers your task.

Transport notes: every content and API endpoint sends `Access-Control-Allow-Origin: *` (browser-context agents can fetch cross-origin), an `ETag`, and `Cache-Control: public, max-age=3600, stale-while-revalidate=86400`. No authentication, no rate limits — be polite by using conditional requests and the changes endpoint instead of re-crawling.

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

You do not need to know the `/content/` mapping in advance. From any canonical page URL, all of these reach the same markdown:

```bash
# Append .md to the canonical URL (redirects to the /content/ path)
curl -L https://ai-future-ready.com/models/claude-opus-4.6.md

# Ask for markdown explicitly (redirects the same way)
curl -L -H "Accept: text/markdown" https://ai-future-ready.com/models/claude-opus-4.6

# Or read the <link rel="alternate" type="text/markdown"> tag in the HTML head
```

Raw markdown is roughly 10x cheaper in tokens than the rendered HTML page.

## 4. Fetch one content item as JSON

```bash
curl https://ai-future-ready.com/api/v1/models/claude-opus-4.6.json
```

Use per-item JSON when you need typed metadata, generated relationship data, content hashes, and the markdown body without parsing frontmatter yourself.

## 5. Learn the schema

```bash
curl https://ai-future-ready.com/api/v1/schema.json
curl https://ai-future-ready.com/api/v1/status.json
```

Use the schema endpoint before assuming field names. It lists observed fields, value types, coverage, examples, and generated fields. Use the status endpoint when you need build freshness, stale-content counts, internal-link health, and source metadata coverage.

## 6. Search

```bash
curl "https://ai-future-ready.com/api/v1/search.json?q=cheap+coding+model"
curl "https://ai-future-ready.com/api/v1/search.json?q=vision&type=model&limit=5"
```

Use the search endpoint for one-call ranked lookup across titles, descriptions, tags, providers, and IDs. Every term must match; results include markdown, HTML, and API URLs plus `token_estimate` so you can budget follow-up fetches.

```bash
curl https://ai-future-ready.com/search-index.json
```

If you prefer to match locally (offline indexing, embeddings, custom ranking), the full structured index is one fetch.

## 7. Get recommendations

```bash
curl https://ai-future-ready.com/api/v1/recommend.json
curl https://ai-future-ready.com/api/v1/recommend/coding.json
curl https://ai-future-ready.com/api/v1/recommend/cheap.json
curl https://ai-future-ready.com/api/v1/recommend/local.json
curl https://ai-future-ready.com/api/v1/recommend/agentic.json
```

Use recommendation endpoints when your task is "choose the best model for X" rather than "read every model page."

## 8. Filter and compare models

```bash
curl "https://ai-future-ready.com/api/v1/models-filter.json?capability=vision&availability_status=available&context_min=1000000"
curl "https://ai-future-ready.com/api/v1/diff.json?a=gpt-5.4&b=claude-opus-4.6"
curl "https://ai-future-ready.com/api/v1/cost.json?input_tokens=1000000&output_tokens=1000000"
```

Use model filtering for routing constraints. Use model diffing when you need a structured side-by-side comparison of two known models. Use model cost calculation when you need a ranked budget estimate for a token workload.

## 9. Track changes

```bash
curl "https://ai-future-ready.com/api/v1/changes.json?since=2026-04-01"
curl "https://ai-future-ready.com/api/v1/changes.json?type=model"
curl https://ai-future-ready.com/feed.json
```

Use `changes.json` for queryable deltas. Use `feed.json` or `feed.xml` for feed readers and polling workflows.

## 10. Verify cached content

Every generated JSON item includes:

```json
{
  "content_hash": "sha256-of-raw-markdown",
  "sha256": "same-value"
}
```

Compare this value against your cached copy before re-reading large content.

For transport-level caching, send the `ETag` you received back as `If-None-Match` — a `304 Not Modified` costs almost nothing:

```bash
curl -s -D - https://ai-future-ready.com/api/v1/models.json -o models.json   # note the ETag header
curl -s -o /dev/null -w "%{http_code}\n" \
  -H 'If-None-Match: "<etag-from-previous-response>"' \
  https://ai-future-ready.com/api/v1/models.json                              # 304 if unchanged
```

## 11. Common workflows

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
