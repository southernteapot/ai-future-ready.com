---
title: "The Agent-Ready Web Standard"
type: standard
id: "agent-ready-web-standard"
version: "0.1"
description: "Technical specification for agent-ready web architecture. Defines content formats, metadata schemas, access protocols, discovery mechanisms, and trust signals."
last_updated: "2026-04-12"
status: "draft"
tags:
  - standard
  - specification
  - agent-ready
  - architecture
---

# The Agent-Ready Web Standard
**v0.1 — Draft — April 2026**

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

### JSON API

Provide a structured API at a known base URL:

```
/api/v1/index.json            → all content types and counts
/api/v1/[type].json           → all items of a type with full metadata
/api/v1/[type]/[slug].json    → single item (optional)
```

API responses must return typed fields — not HTML fragments.

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

This site — [ai-future-ready.com](https://ai-future-ready.com) — implements this standard at Level 3. Every feature described above is live and inspectable. See the [checklist](/checklist) for our honest self-assessment and the specific gaps we're working on.
