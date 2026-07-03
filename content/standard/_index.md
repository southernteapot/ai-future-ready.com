---
title: "The Agent-Ready Web Standard"
type: standard
id: "agent-ready-web-standard"
version: "0.2"
description: "Technical standard for agent-ready websites: raw content at canonical URLs, metadata schemas, llms.txt, JSON APIs, CORS, discovery, trust signals, hashes, change feeds, and usage policy."
last_updated: "2026-07-03"
status: "draft"
tags:
  - standard
  - specification
  - agent-ready
  - architecture
---

# The Agent-Ready Web Standard
**v0.2 — Draft — July 2026**

Changes in v0.2: markdown must be reachable from canonical URLs (`.md` suffix, content negotiation, alternate links), CORS and conditional-request requirements, query endpoints, and machine-readable usage policy.

This is the technical companion to the [Agent-Ready Website Checklist](/checklist). The checklist tells you *what* to build and *why*. This page specifies *how* — formats, schemas, and protocols.

Start with the [checklist](/checklist) if you haven't read it.

---

## Content Format

Store content in a structured, parseable format with embedded metadata. The recommended approach is markdown with YAML frontmatter:

```markdown
---
title: "Page Title"
type: product
id: "unique-stable-id"
description: "One-line summary."
last_updated: "2026-04-12"
---

# Page Title

Body content in markdown.
```

**Requirements:**
- Every content item of the same type has the same metadata fields
- Fields use consistent types: ISO 8601 dates, standard units, predictable value sets
- Content is self-contained — no external rendering dependencies
- The metadata schema is documented per content type

**Acceptable formats:** Markdown + YAML frontmatter, JSON files, structured XML. The format matters less than consistency and machine-readability.

---

## Metadata Schema

### Required fields (all content types)

| Field | Type | Description |
|-------|------|-------------|
| `title` | string | Human-readable title |
| `type` | string | Content category: `product`, `article`, `doc`, `page`, etc. |
| `id` | string | Permanent unique identifier (not the URL slug) |
| `description` | string | One-line summary |
| `last_updated` | date | ISO 8601 date of last substantive change |

### Recommended fields

| Field | Type | Description |
|-------|------|-------------|
| `created` or `date` | date | First publication date |
| `author` | string | Creator or maintaining organization |
| `tags` | list | Consistent taxonomy tags |
| `last_verified` | date | When factual accuracy was last confirmed |

### Type-specific fields

Each content type should define additional fields. Document the schema so agents know what to expect. Examples:

**Product/model type:**
```yaml
provider: "Company Name"
pricing:
  input: "$5.00 / 1M tokens"
  output: "$25.00 / 1M tokens"
context_window: 1048576
benchmarks:
  mmlu: 93.1
best_for:
  - "Complex reasoning"
```

**Comparison type:**
```yaml
models_compared:
  - "model-a"
  - "model-b"
comparison_type: "head-to-head"
```

---

## Access Protocols

### Raw content

Serve source content at predictable URLs alongside rendered HTML pages:

```
/content/[type]/[slug].md     → markdown with YAML frontmatter
/content/[type]/_index.md     → type index
/content/_index.md            → site index
```

### Markdown from canonical URLs

Agents arrive at canonical page URLs — from search results, citations, and links — not at your raw-content tree. The raw version must be reachable *from* the canonical URL, without prior knowledge of your conventions. Provide all three:

1. **`.md` suffix alias.** `GET /models/gpt-5.4.md` returns (or redirects to) the raw markdown for `/models/gpt-5.4`.
2. **Content negotiation.** `GET /models/gpt-5.4` with `Accept: text/markdown` returns (or redirects to) the raw markdown.
3. **Alternate links.** Every HTML page declares its markdown source in the head:

```html
<link rel="alternate" type="text/markdown" href="/content/models/gpt-5.4.md" />
```

A redirect (307/308) to the raw file is acceptable and has the advantage of teaching agents the canonical raw-content mapping via the `Location` header.

### Cross-origin access (CORS)

Agents running in browser contexts — web apps, sandboxes, extensions — cannot use any of this without CORS. All content and API endpoints must send:

```
Access-Control-Allow-Origin: *
```

on GET responses, and answer preflight `OPTIONS` requests on endpoints accepting other methods or custom headers.

### Caching and conditional requests

Machine endpoints get polled. Serve `ETag` (and/or `Last-Modified`) on content and API responses, honor `If-None-Match` with `304 Not Modified`, and set an explicit `Cache-Control` with a non-zero `max-age` so well-behaved clients can skip redundant fetches entirely.

### JSON API

Provide a structured API at a known base URL:

```
/api/v1/index.json            → all content types and counts
/api/v1/[type].json           → all items of a type with full metadata
/api/v1/[type]/[slug].json    → single item (optional)
```

API responses must return typed fields — not HTML fragments.

### Query endpoints

Static indexes make agents download everything and filter locally. Sites with more than a handful of items should expose at least one server-side query endpoint so a question costs one call:

```
/api/v1/search.json?q=...     → ranked keyword search over all content
```

Domain-specific filters (e.g. `/api/v1/models-filter.json?capability=vision`) follow the same principle: the agent states constraints, the site does the matching.

### Bulk access

Provide a way to fetch all content efficiently:

```
/llms-full.txt                → all content in one file
```

Or: paginated API endpoints, a downloadable archive, or equivalent.

---

## Discovery

### llms.txt

A machine-readable index at `/llms.txt` following the [llms-txt.org](https://llms-txt.org) format:

```
# Site Name

> One-line description.

## Content Type
- [Item Title](/path/to/item): Description
```

### well-known discovery

An endpoint at `/.well-known/ai.json`:

```json
{
  "name": "Site Name",
  "description": "What this site contains.",
  "llms_txt": "/llms.txt",
  "llms_full": "/llms-full.txt",
  "api": "/api/v1/",
  "raw_content": "/content/",
  "search": "/search-index.json",
  "sitemap": "/sitemap.xml"
}
```

### Search index

A JSON file at a known path with structured metadata for all content:

```json
[
  {
    "title": "Page Title",
    "type": "model",
    "id": "page-id",
    "description": "Summary.",
    "url": "/models/page-id",
    "tags": ["tag1", "tag2"]
  }
]
```

### Sitemap

An XML sitemap that includes both:
- Human-readable page URLs: `https://example.com/models/page-id`
- Machine-readable content URLs: `https://example.com/content/models/page-id.md`

### robots.txt

Explicitly allow agent access:

```
User-agent: *
Allow: /content/
Allow: /api/
Allow: /llms.txt
Allow: /search-index.json
```

---

## Trust Signals

### Timestamps

Use three distinct dates where applicable:

| Field | Meaning |
|-------|---------|
| `last_updated` | Last substantive content change |
| `created` / `date` | First publication |
| `last_verified` | Last factual accuracy check (distinct from edits) |

### Confidence markers

For volatile fields, add recency metadata:

```yaml
pricing:
  input: "$5.00 / 1M tokens"
  _as_of: "2026-04-01"
  _confidence: "check-provider"
```

### Content integrity

Include a hash of the body content so agents can check cache freshness:

```yaml
content_hash: "sha256:a3f2b8c..."
```

### Usage policy

An agent deciding whether it may ingest, cache, or republish your content needs the answer in machine-readable form — not buried in a terms-of-service page. Declare it in your discovery manifest:

```json
"usage_policy": {
  "summary": "Free for human and agent consumption with attribution. Commercial redistribution requires a license.",
  "attribution": "Suggested attribution string.",
  "rate_limits": "Expectations, if any.",
  "commercial_license": "/pricing/commercial-license",
  "contact": "you@example.com"
}
```

State at minimum: what consumption is allowed, what requires permission, attribution expectations, and a contact.

---

## Relationship Metadata

### Typed relationships

Link related content in metadata with explicit relationship types:

```yaml
related:
  - id: "other-page-id"
    type: comparison
    relationship: "compared_in"
  - id: "tool-id"
    type: agent
    relationship: "used_by"
```

### Change feed

Provide a JSON or RSS feed at a known URL:

```
/feed.json     → JSON Feed format
/feed.xml      → RSS/Atom
```

Entries must include: title, URL, date, type, and a summary.

---

## Compliance Levels

See the [checklist](/checklist) for the full maturity model. Summary:

| Level | Name | Key Requirements |
|-------|------|-----------------|
| 0 | Scrape-Only | HTML only, no structured access |
| 1 | Readable | Semantic HTML, basic meta, sitemap |
| 2 | Structured | Raw content, consistent metadata, llms.txt |
| 3 | Agent-Ready | JSON API, canonical IDs, provenance, search index |
| 4 | Agent-Native | Relationships, feeds, hashes, confidence signals, MCP |

Most of the agent-readiness benefit comes from reaching Level 2.

---

## Reference Implementation

This site — [ai-future-ready.com](https://ai-future-ready.com) — implements this standard at Level 3, including the v0.2 additions: `.md` suffix aliases and `Accept: text/markdown` negotiation on every canonical URL, `text/markdown` alternate links, CORS on all machine endpoints, explicit cache headers with ETag revalidation, ranked search at [`/api/v1/search.json`](/api/v1/search.json?q=agent-ready), and a machine-readable usage policy in [`/.well-known/ai.json`](/.well-known/ai.json). See the [checklist](/checklist) for our honest self-assessment and the specific gaps we're working on.

**Want this for your own site?** The [Agent Readiness Audit](/pricing/agent-readiness-audit) scores your site against this standard and delivers a priority fix list. [Request an audit](/request-audit) or run the free [self-audit scorecard](/score) first.
