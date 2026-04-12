---
title: "The Agent-Ready Web Standard"
type: standard
id: "agent-ready-web-standard"
version: "0.1.0"
description: "A specification for building websites that serve both humans and AI agents. Defines the architecture, metadata, access protocols, and trust signals that make web content machine-usable."
last_updated: "2026-04-11"
status: "draft"
tags:
  - standard
  - specification
  - agent-ready
  - architecture
---

# The Agent-Ready Web Standard

**Version 0.1.0 — Draft**

## The Problem

Most websites are built for one audience: humans using browsers. Content is locked inside HTML templates, navigation structures, JavaScript rendering, and authentication walls. AI agents that try to use these sites must scrape, parse, guess, and hallucinate to fill in the gaps.

This is not sustainable. AI agents are a growing share of web traffic. They research products, compare options, summarize content, and act on behalf of users. Every website that an agent cannot reliably read is a website that gets skipped, misrepresented, or replaced by a competitor that agents can understand.

The fix is not adding a chatbot. The fix is building the site right.

## The Standard

An agent-ready website meets five requirements:

1. **Structured Content** — Content is stored in a structured, parseable format with consistent metadata
2. **Machine Access** — Content is available in machine-readable form without scraping HTML
3. **Discovery** — Agents can find what's available without crawling every page
4. **Trust & Provenance** — Content carries metadata that lets agents assess reliability
5. **Relationships & Context** — Content is connected, not isolated

Each requirement has specific, testable criteria. See the [Agent-Ready Checklist](/checklist) for the full scored rubric.

## 1. Structured Content

Content must be more than rendered HTML. It must have:

### Consistent Metadata Schema

Every content item carries machine-readable metadata in a predictable format. At minimum:

- `title` — human-readable title
- `type` — content category (product, article, doc, page, etc.)
- `description` — one-line summary
- `last_updated` — ISO 8601 date of last content change

The specific format (YAML frontmatter, JSON-LD, microdata, RDFa) matters less than consistency. Every page of the same type should have the same metadata fields.

### Stable Identifiers

Every content item has a permanent, unique identifier that survives URL changes, redesigns, and restructuring. This is not the URL — URLs change. This is a canonical ID embedded in the content metadata.

```yaml
id: "claude-opus-4.6"
```

Agents use these identifiers to reference, cache, and cross-link content. If IDs change, agent caches break silently.

### Typed Content

Content declares what it is. A product page is not the same as a blog post is not the same as a glossary entry. Each content type has its own metadata schema, and that schema is documented.

## 2. Machine Access

An agent should never need to parse HTML to get content. The site must provide at least one machine-readable access path:

### Raw Content

The source content (markdown, structured text, or equivalent) is available at a predictable URL pattern. For example:

- `/content/models/claude-opus-4.6.md` — raw markdown with metadata
- `/api/v1/models/claude-opus-4.6.json` — structured JSON

### Structured API

A JSON API exposes content with typed fields, not just rendered text. The API should support:

- Listing all content of a type
- Fetching individual items by ID or slug
- Filtering or searching

### No Scraping Required

Public content should be accessible without JavaScript rendering, CAPTCHAs, authentication, or rate limiting that blocks legitimate agent access. If content is public for humans, it should be public for agents.

## 3. Discovery

An agent visiting the site for the first time should be able to understand what's available without crawling every page.

### llms.txt

A machine-readable index file at `/llms.txt` that lists all content sections and individual items. This is the front door for AI agents. See [llms-txt.org](https://llms-txt.org) for the emerging standard.

### Well-Known Discovery

A discovery endpoint at `/.well-known/ai.json` that declares the site's agent-ready capabilities:

```json
{
  "name": "Example Site",
  "llms_txt": "/llms.txt",
  "api": "/api/v1/",
  "raw_content": "/content/",
  "search": "/search-index.json",
  "feed": "/feed.json",
  "schemas": "/api/v1/schemas/"
}
```

### Sitemap

An XML sitemap that includes both human-readable page URLs and machine-readable content URLs.

### Robots.txt

Explicitly allows agent access to content directories and API endpoints.

## 4. Trust & Provenance

Agents need to assess whether content is reliable. Static content with no provenance metadata is a black box. Agent-ready content provides:

### Timestamps

- `last_updated` — when the content was last modified
- `last_verified` — when the factual accuracy was last confirmed (distinct from "edited a typo")
- `created` — when the content was first published

### Authorship

- `author` — who created or maintains the content
- `source` — where the information came from (if applicable)

### Confidence Signals

Some fields are more volatile than others. Pricing changes weekly. Benchmarks are contested. Agent-ready content marks volatile fields:

```yaml
pricing:
  input: "$5.00 / 1M tokens"
  output: "$25.00 / 1M tokens"
  _confidence: "check-provider"
  _as_of: "2026-04-01"
```

### Content Integrity

A content hash (e.g., SHA-256 of the body) lets agents verify cached content without re-fetching:

```yaml
content_hash: "a3f2b8c..."
```

## 5. Relationships & Context

Content in isolation is less useful than content in context. Agent-ready sites make relationships explicit.

### Typed Relationships

Content links to related content with typed relationships in metadata, not just inline markdown links:

```yaml
related:
  - id: "claude-vs-gpt"
    type: comparison
    relationship: "compared_in"
  - id: "claude-code"
    type: agent
    relationship: "used_by"
```

### Taxonomy

Content is categorized with consistent tags and categories that agents can use for filtering and grouping.

### Change Feed

A JSON feed at `/feed.json` provides timestamped content changes. Agents can subscribe to know what's new without polling every file.

### Schema Declarations

Each content type publishes its metadata schema, so agents know exactly what fields to expect:

```
GET /api/v1/schemas/model.json
```

Returns the field names, types, and descriptions for model content.

## Compliance Levels

Not every site needs all of this. The standard defines three levels:

### Level 1: Accessible (score 40+)

The site provides machine-readable content and basic metadata. An agent can read content without scraping HTML.

**Minimum requirements:**
- Raw content available at predictable URLs
- Consistent metadata (title, type, description, last_updated)
- robots.txt allows agent access
- XML sitemap

### Level 2: Structured (score 70+)

The site provides structured APIs, discovery, and trust signals. An agent can efficiently find, query, and verify content.

**Adds:**
- llms.txt discovery file
- JSON API with typed fields
- Stable content identifiers
- Timestamps and authorship metadata
- Schema documentation

### Level 3: Agent-Native (score 90+)

The site is built for agents as a first-class audience. Full metadata, relationships, change feeds, and trust signals.

**Adds:**
- Well-known discovery endpoint
- Typed relationships between content
- Change feed
- Confidence signals on volatile fields
- Content integrity hashes
- MCP server or equivalent tool integration

## Implementation

This site — [aifutureready.com](https://aifutureready.com) — is a Level 3 implementation of this standard. Every feature described above is live and inspectable.

See the [Agent-Ready Checklist](/checklist) to score your own site.

Need help implementing? Contact us at [brian@aifutureready.com](mailto:brian@aifutureready.com).

## Contributing

This standard is a draft. It will evolve as the agent ecosystem matures. If you have feedback, implementation experience, or want to adopt it, reach out.
