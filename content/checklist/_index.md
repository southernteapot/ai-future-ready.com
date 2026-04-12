---
title: "The Agent-Ready Website Checklist"
type: checklist
id: "agent-ready-checklist"
description: "A practical checklist and spec for making any website work for AI agents. Criteria, examples, failure modes, and a maturity model — from scrape-only to agent-native."
last_updated: "2026-04-12"
version: "0.1"
tags:
  - checklist
  - spec
  - agent-ready
  - architecture
---

# The Agent-Ready Website Checklist
**v0.1 — April 2026**

## What this is

A practical specification for making websites work for AI agents — not just humans with browsers.

"Agent-ready" means an AI agent can visit your site, understand what's available, get the content it needs in a structured format, verify that it's trustworthy, and act on it. No scraping. No guessing. No hallucinating missing data.

## Why this matters now

AI agents are already browsing the web on behalf of people. They compare products, research decisions, summarize documentation, check prices, and recommend options. When an agent visits your site, it hits the same pages a human does — and gets HTML soup, navigation chrome, cookie banners, and JavaScript-rendered content it can't parse.

The result: your content gets skipped, misrepresented, or replaced by a competitor whose site agents can actually read.

This is not a future problem. It's happening now. And the fix isn't a chatbot widget — it's building the site right.

## Who this is for

- **Business owners** who want their products and services accurately represented when AI agents research on behalf of customers
- **Developers** building or maintaining websites, documentation, or content platforms
- **Publishers** whose content is consumed by AI agents for research, comparison, and recommendation
- **Technical operators** evaluating their infrastructure's readiness for agent traffic

---

## The Criteria

Ten areas, organized from "agents can find you" to "agents can trust and act on your content."

---

### 1. Discovery

**What it is.** Agents visiting your site for the first time can understand what content exists and how to access it — without crawling every page.

**Why it matters.** An agent with no discovery mechanism must spider your entire site to find content. Most won't bother. They'll index your homepage, miss everything else, and move on to a competitor with a clear index.

**What good looks like.**
- An `llms.txt` file at the root lists all content sections and items with descriptions and URLs. This is the front door for AI agents.
- `robots.txt` explicitly allows agent access to content and API paths.
- An XML sitemap includes both HTML page URLs and machine-readable content URLs (markdown, JSON).
- A `/.well-known/ai.json` endpoint declares agent capabilities: where to find the index, API, raw content, and search.

**Common failure mode.** The site has a sitemap but it only lists HTML pages. `robots.txt` blocks AI user agents. There's no `llms.txt`. An agent arrives, finds the homepage, and has no idea there are 200 product pages behind the navigation menu.

**How this site does it.**
- [`/llms.txt`](/llms.txt) — machine-readable index of all content
- [`/robots.txt`](/robots.txt) — allows agent access
- [`/sitemap.xml`](/sitemap.xml) — includes both HTML and raw content URLs
- [`/search-index.json`](/search-index.json) — structured search index with titles, descriptions, and tags

---

### 2. Raw Content Access

**What it is.** The actual content — not the rendered HTML page — is available at a predictable URL in a format agents can parse directly.

**Why it matters.** HTML pages mix content with layout, navigation, ads, modals, and scripts. Extracting the actual information requires parsing, and parsing fails constantly. Raw content access means agents get the content itself — clean, structured, no extraction needed.

**What good looks like.**
- Every content page has a corresponding raw file at a predictable path. If the page is at `/models/gpt-5.4`, the raw content is at `/content/models/gpt-5.4.md`.
- The raw format is self-contained: content + metadata in one file (e.g., markdown with YAML frontmatter).
- No JavaScript rendering required. No authentication for public content. No CAPTCHA.
- A bulk-access option exists (e.g., `/llms-full.txt` with all content in one file) so agents don't need one request per page.

**Common failure mode.** Content is generated server-side from a CMS or database. The only way to get it is to fetch the HTML page and strip the chrome. Some pages require JavaScript to render, so headless agents get empty `<div id="root"></div>`. The site has an API, but it requires an API key for public content.

**How this site does it.**
- Every page: `/content/[type]/[slug].md` — raw markdown with YAML frontmatter
- [`/llms-full.txt`](/llms-full.txt) — all content concatenated into one file
- No JS rendering, no auth, no CAPTCHA on any content path

---

### 3. Structured Metadata

**What it is.** Every content item carries machine-readable metadata in a consistent schema — not just a title and body, but typed fields that describe what the content is and what it contains.

**Why it matters.** Metadata is how agents filter, compare, and decide without reading full documents. An agent comparing AI model pricing doesn't need to read five articles — it needs the `pricing` field from five metadata blocks. Without structured metadata, agents must read and interpret natural language for every query. That's slow, expensive, and error-prone.

**What good looks like.**
- Every content item has at minimum: `title`, `type`, `description`, `last_updated`.
- Content of the same type has the same fields. Every model page has `pricing`, `context_window`, `benchmarks`. Every agent page has `category`, `license`, `languages`.
- Fields use consistent formats: ISO dates, standard units, predictable value types.
- The metadata format is documented — agents know what fields to expect for each content type.

**Common failure mode.** The site uses metadata inconsistently. Some pages have a `date` field, others use `published_at`, others have no date. Product pages have pricing in the body text but not in structured fields. The metadata schema is undocumented, so agents must infer the structure from examples.

**How this site does it.**
Every markdown file has YAML frontmatter with typed fields:
```yaml
title: "Claude Opus 4.6"
type: model
id: "claude-opus-4.6"
provider: "Anthropic"
context_window: 1048576
pricing:
  input: "$5.00 / 1M tokens"
  output: "$25.00 / 1M tokens"
benchmarks:
  mmlu: 93.1
  humaneval: 93.8
best_for:
  - "Complex reasoning"
  - "Long-document analysis"
```

---

### 4. Canonical Identifiers

**What it is.** Every content item has a permanent, unique ID in its metadata that survives URL changes, redesigns, and restructuring.

**Why it matters.** URLs change. Sites get redesigned. Paths get reorganized. If an agent cached content by URL, that cache breaks silently. Canonical IDs give agents a stable handle to reference, cache, and cross-link content — regardless of what the URL does.

**What good looks like.**
- Every content item has an `id` field in its metadata: `id: "claude-opus-4.6"`.
- The ID is stable. It doesn't change when the URL changes, when the title changes, or when the site is reorganized.
- IDs are unique across the entire site, not just within a content type.
- IDs are documented as the canonical way to reference content.

**Common failure mode.** Content is identified by URL slug only. The site redesign changes `/products/ai-model-x` to `/models/ai-model-x`, and every agent that cached the old URL now has a broken reference with no way to find the new one. Or: the site uses auto-generated IDs (UUIDs, database row IDs) that are meaningless to agents and unstable across environments.

**How this site does it.**
Every content file includes `id` in frontmatter — a human-readable, permanent identifier:
```yaml
id: "claude-opus-4.6"   # stable across URL changes
id: "crewai"             # not a UUID, not a row ID
```

---

### 5. Provenance & Timestamps

**What it is.** Content carries metadata about when it was created, when it was last changed, and who is responsible for it.

**Why it matters.** Agents need to assess freshness. A model comparison from six months ago may be outdated. Pricing data from last week is probably current. Without timestamps, agents can't distinguish between fresh analysis and stale information — and they can't tell users how current the data is.

**What good looks like.**
- `last_updated` — when the content was last substantively changed (ISO 8601)
- `created` or `date` — when the content was first published
- `last_verified` — when factual accuracy was last confirmed, distinct from editorial changes (important for pricing, benchmarks, and other volatile data)
- `author` — who created or maintains the content

**Common failure mode.** Pages have no dates at all. Or: the "last updated" date is actually the last deploy date, so every page shows today's date even if the content hasn't changed in months. Or: the site has `last_updated` but uses it for both editorial and factual verification, so agents can't tell whether the pricing was verified last week or a comma was fixed last week.

**How this site does it.**
```yaml
last_updated: "2026-04-11"
date: "2026-04-01"        # first published
author: "AI Future Ready"
```
Gap we're working on: `last_verified` is not yet implemented on all content. That's an honest Level 3 → Level 4 gap.

---

### 6. Trust & Verification

**What it is.** Mechanisms that let agents verify content integrity and assess confidence in volatile data.

**Why it matters.** Agents cache content. If the cached version is outdated, the agent serves stale data. Content hashes let agents check whether their cache is current without re-fetching the full body. Confidence signals let agents know which fields are reliable and which are volatile.

**What good looks like.**
- A content hash (SHA-256 of the body) in metadata so agents can check cache freshness with a HEAD request.
- Volatile fields (pricing, availability, benchmark scores) carry `_confidence` or `_as_of` markers.
- Sources are attributed where applicable — not just "we said so" but "according to the provider's pricing page as of April 2026."

**Common failure mode.** No integrity mechanism at all. Agents cache content for weeks and serve outdated pricing. Volatile data (pricing, availability, performance numbers) looks the same as stable data (descriptions, feature lists), so agents treat everything with equal confidence. Or: the site marks all data as "verified" but never actually re-verifies.

**How this site does it.**
Partial implementation — this is an area we score ourselves honestly on:
- Pricing fields include source attribution in content
- `last_updated` timestamps are accurate (not deploy dates)
- Gap: no content hashes yet, no `_confidence` markers on volatile fields

---

### 7. Relationships & Context

**What it is.** Content links to related content through structured metadata — typed relationships, not just inline hyperlinks.

**Why it matters.** An agent looking at a model page needs to know: what comparisons include this model? What agents use it? What use cases is it recommended for? Inline links help humans navigate, but agents need machine-readable relationship data to build a graph of your content and traverse it programmatically.

**What good looks like.**
- Content metadata includes `related` fields with typed relationships:
  ```yaml
  related:
    - id: "claude-vs-gpt"
      type: comparison
      relationship: "compared_in"
  ```
- Content is categorized with consistent tags and taxonomy.
- A search index provides structured access to titles, descriptions, tags, and URLs for all content.

**Common failure mode.** Relationships exist only as inline links in body text. Agents must parse natural language to discover that "see also: our comparison of Claude and GPT" means the current page is related to a comparison page. Tags are inconsistent — some pages use "AI," others use "artificial-intelligence," others have no tags.

**How this site does it.**
- [`/search-index.json`](/search-index.json) — structured index with tags, types, and descriptions
- Content uses consistent `tags` and `best_for` fields
- Gap: formal typed `related` fields in frontmatter are not yet implemented on all content

---

### 8. Change Visibility

**What it is.** Agents can find out what's changed without polling every page — through feeds, changelogs, or similar mechanisms.

**Why it matters.** An agent that indexed your site last week needs to know what's new. Without a change feed, the only option is to re-crawl everything and diff. That's wasteful and unreliable. A feed lets agents efficiently stay current.

**What good looks like.**
- An RSS, Atom, or JSON feed at a known URL provides timestamped updates.
- A changelog documents significant content changes.
- Feed entries include enough metadata for agents to decide whether to re-fetch (title, date, type, summary — not just a link).

**Common failure mode.** No feed at all. Or: the feed only includes blog posts, not content updates. Or: the feed exists but entries are auto-generated from deploys (every page appears as "updated" on every deploy). Agents can't distinguish real changes from noise.

**How this site does it.**
- [`/changelog`](/changelog) — human-readable changelog of significant content changes
- Gap: no JSON/RSS feed yet. This is a planned addition.

---

### 9. Structured APIs

**What it is.** A JSON API that returns typed, queryable content — not just rendered HTML endpoints.

**Why it matters.** Raw content access gives agents individual files. APIs give agents the ability to query: "list all models with context windows above 200K" or "get the cheapest model by input token price." APIs turn your site from a document store into a queryable knowledge base.

**What good looks like.**
- A JSON API at a known base URL (e.g., `/api/v1/`).
- Supports listing all content of a type, fetching by ID/slug, and basic filtering.
- Returns typed fields — not HTML fragments, not escaped markup, but structured data.
- Schema documentation so agents know what endpoints exist and what fields they return.
- A recommendation or pre-computed ranking endpoint for common queries.

**Common failure mode.** The API returns HTML fragments instead of structured data. Or: the API exists but requires authentication for public content. Or: the API has no schema documentation, so agents must reverse-engineer the response format. Or: there's no API at all — the only data access is through rendered pages.

**How this site does it.**
- [`/api/v1/index.json`](/api/v1/index.json) — full content API with typed fields
- [`/api/v1/models.json`](/api/v1/models.json) — models with pricing, benchmarks, context windows
- [`/api/v1/recommend.json`](/api/v1/recommend.json) — pre-scored model rankings by task
- All endpoints return structured JSON with consistent field naming

---

### 10. Graceful Degradation

**What it is.** The site works for both audiences — humans without AI and agents without browsers — without either experience breaking.

**Why it matters.** Agent-ready doesn't mean agent-only. The site still needs to be a good website for humans. And agent access shouldn't require a full browser environment. The two audiences should be served by the same content through different access paths, not by maintaining two separate versions of everything.

**What good looks like.**
- Humans get clean, readable HTML pages with standard navigation.
- Agents get raw content, JSON APIs, and discovery files — no browser needed.
- Both audiences see the same underlying content (single source of truth).
- If an agent endpoint is down, the human site still works. If the HTML rendering breaks, the raw content is still available.
- No JavaScript is required to access content in either path.

**Common failure mode.** The site builds a separate "API version" of content that drifts out of sync with the website. Or: the site is a single-page app that returns empty HTML without JavaScript — agents get nothing, and the "raw content" path was never built. Or: the agent path works but the human experience is neglected (or vice versa), making one audience a second-class citizen.

**How this site does it.**
- Same markdown source renders to both HTML (for humans) and raw files (for agents)
- JSON API is generated from the same content at build time
- No JavaScript required on any page — works in any browser, any agent
- Human navigation and agent discovery coexist without conflict

---

## Maturity Model

Not every site needs to implement all ten criteria on day one. This model describes a progression from where most sites are today to where the web is heading.

### Level 0: Scrape-Only

The default state of most websites today.

- Content is locked in HTML templates
- No structured metadata beyond basic `<title>` and `<meta>` tags
- No raw content access — agents must parse rendered HTML
- No discovery — agents crawl and guess
- JavaScript may be required to see content

*Most corporate sites, news sites, and e-commerce platforms are here.*

### Level 1: Readable

The site is at least parseable by agents, even if not optimized for them.

- Content is in the HTML (not behind JavaScript rendering)
- Basic metadata exists: `<title>`, `<meta description>`, Open Graph tags
- `robots.txt` doesn't block agents
- XML sitemap exists
- HTML is semantic (headings, lists, tables — not just `<div>` soup)

*Sites built with SSR frameworks, WordPress with good themes, and well-structured static sites are often here.*

### Level 2: Structured

Agents can get content in a useful format without scraping HTML.

- **Everything in Level 1, plus:**
- Raw content available at predictable URLs (markdown, JSON, or equivalent)
- Consistent metadata schema across content of the same type
- `llms.txt` file for agent discovery
- `last_updated` timestamps on all content
- Stable, documented URL patterns

*This is where the leverage starts. Most of the agent-readiness benefit comes from reaching Level 2.*

### Level 3: Agent-Ready

Agents can efficiently find, query, verify, and cross-reference content.

- **Everything in Level 2, plus:**
- JSON API with typed, queryable fields
- Canonical identifiers that survive URL changes
- Authorship and provenance metadata
- Structured search index
- Tags and taxonomy for filtering
- Bulk access option (full content dump or paginated API)

*This is the target for most sites that take agent traffic seriously. This site is here.*

### Level 4: Agent-Native

The site is built for agents as a first-class audience, with full trust infrastructure and relationship data.

- **Everything in Level 3, plus:**
- `/.well-known/ai.json` discovery endpoint
- Typed relationships between content in metadata
- JSON/RSS change feed
- Content integrity hashes
- Confidence signals on volatile fields
- `last_verified` timestamps distinct from `last_updated`
- Schema documentation for all content types
- MCP server or equivalent tool integration

*This is the frontier. Very few sites are here today. It's where the web is going.*

---

## What Level Are You?

Be honest. Most sites are Level 0 or Level 1. That's not a failure — it's the current state of the web. But the gap between Level 1 and Level 2 is where agents go from "guessing" to "understanding," and it's smaller than you think.

**The highest-leverage moves to reach Level 2:**
1. Add `llms.txt` — takes an hour, gives agents a front door
2. Serve raw content at predictable URLs — markdown or JSON alongside your HTML
3. Add consistent metadata — at minimum: title, type, description, last_updated
4. Make sure `robots.txt` allows agent access

Four changes. That gets you further than any AI chatbot widget.

---

## Next Steps

**Use this checklist.** Walk through the ten criteria for your own site. Be honest about where you are. Most of the value is in identifying the gaps, not in achieving a perfect score.

**Start with Level 2.** Don't try to go from Level 0 to Level 4. The four changes above — llms.txt, raw content, metadata, robots.txt — deliver most of the benefit.

**Read the full standard.** The [Agent-Ready Web Standard](/standard) provides deeper technical detail on each criterion, including format specifications and implementation patterns.

**Want help implementing?** We're building tools and services around this spec. If you want a professional agent-readiness evaluation with a detailed scorecard and implementation roadmap: [brian@aifutureready.com](mailto:brian@aifutureready.com?subject=Agent-Ready%20Audit).

**This is v0.1.** The spec will evolve as the agent ecosystem matures. If you implement it, we want to hear what worked and what didn't.
