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

## Quick Self-Assessment

Before diving into the details, answer these ten questions about your site. Be honest.

| # | Question | Yes / No |
|---|----------|----------|
| 1 | Can an agent find an index of your content without crawling every page? | |
| 2 | Can an agent get your content as raw text or structured data — not just HTML? | |
| 3 | Does every content item carry consistent, typed metadata (title, type, date, description)? | |
| 4 | Does every content item have a stable ID that survives URL changes? | |
| 5 | Can an agent tell when your content was last updated and by whom? | |
| 6 | Can an agent verify whether its cached copy of your content is still current? | |
| 7 | Can an agent traverse relationships between your content programmatically? | |
| 8 | Can an agent find out what changed since its last visit without re-crawling? | |
| 9 | Can an agent query your content with filters — not just fetch individual pages? | |
| 10 | Does your site work for both humans and agents from the same content source? | |

**Count your "yes" answers:**

- **0–2:** Level 0–1. Agents are scraping and guessing. Start with the [Minimum Viable Agent-Ready Site](#minimum-viable-agent-ready-site) section below.
- **3–5:** Level 2. You have the basics. Read the full criteria to find your gaps.
- **6–8:** Level 3. You're ahead of most of the web. Focus on trust, relationships, and change visibility.
- **9–10:** Level 4. You're building the future web. Tell us how it's going.

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

## Common Anti-Patterns

Things that look like progress but aren't.

**"We added a chatbot."** A chatbot widget is not agent-readiness. It's a single interface bolted onto unstructured content. Agents don't use chatbot widgets — they need programmatic access to your content and metadata. A chatbot makes your site conversational for humans. Agent-readiness makes your site machine-readable for any agent, framework, or workflow.

**"We have an API — behind authentication."** If your content is public on the website but requires an API key to access programmatically, you're telling agents to scrape. Every barrier between public content and machine access is a barrier to accurate representation. Auth makes sense for private data. For public content, it's just friction.

**"We export to PDF."** A PDF is a rendered artifact, not structured data. It's better than nothing, but agents can't reliably extract metadata, filter fields, or traverse relationships from a PDF. It's a step above HTML scraping, but only barely.

**"Our `last_updated` is automatic."** If your CMS sets `last_updated` on every deploy, every page always says "today." That's worse than no date at all — it's actively misleading. Agents rely on timestamps to assess freshness. Automatic timestamps destroy that signal.

**"We have structured data — in JSON-LD for SEO."** JSON-LD in your HTML `<head>` is a start, but it's typically limited to schema.org types for search engines: Organization, Article, Product. Agent-readiness requires richer, content-specific metadata (pricing fields, benchmark scores, context windows) available outside the HTML page. SEO-focused structured data is Level 1. Agent-readiness starts at Level 2.

**"We built a separate API version."** If your API serves different content than your website, you now have two sources of truth that will drift apart. Agent-readiness means serving the same content through multiple access paths — not maintaining parallel content databases. Single source, multiple representations.

---

## Maturity Model

Not every site needs to implement all ten criteria on day one. This model describes a progression from where most sites are today to where the web is heading.

---

### Level 0: Scrape-Only

*Where most of the web is right now.*

**Defining traits.**
- Content is locked inside HTML templates, navigation structures, and JavaScript rendering
- No structured metadata beyond `<title>` and basic `<meta>` tags
- No machine-readable content access — agents must parse rendered HTML
- No discovery mechanism — agents crawl and guess what exists
- Content may require JavaScript, authentication, or CAPTCHA to view

**What agents experience.** They fetch your HTML, strip tags, guess at structure, and hallucinate anything they can't extract. Pricing? Probably wrong. Product details? Partially inferred. Relationships between pages? Invisible.

**Limitations.** Agents can't reliably represent your content. They can't tell what's current, what's related, or what's authoritative. Your site is effectively invisible to AI-mediated discovery.

**What separates this from Level 1.** Semantic HTML and basic metadata. The bar is low.

---

### Level 1: Readable

*The site is parseable, even if not optimized for agents.*

**Defining traits.**
- Content is in the HTML (not behind JavaScript rendering)
- Basic metadata exists: `<title>`, `<meta description>`, Open Graph tags
- `robots.txt` doesn't block agents
- XML sitemap exists
- HTML is semantic — headings, lists, tables, not just nested `<div>` elements

**What this unlocks.** Agents can at least read your content by parsing HTML. The structure is guessable from semantic markup. Basic metadata gives agents a title and summary without reading the full page.

**Limitations.** Agents still have to scrape. They're parsing HTML, not reading structured data. Metadata is limited to what HTML `<meta>` tags can express. There's no discovery beyond the sitemap, and no way to get content without the rendering chrome.

**What separates this from Level 2.** Raw content access and an `llms.txt` file. The jump from "parseable HTML" to "structured, fetchable content" is the most important transition in this model.

*Sites built with server-side rendering, WordPress with clean themes, and well-structured static sites are often here. Most documentation sites are here.*

---

### Level 2: Structured

*Agents can get your content in a useful format without scraping HTML.*

**Defining traits.**
- Raw content available at predictable URLs — markdown, JSON, or equivalent
- Consistent metadata schema across content of the same type
- `llms.txt` file for agent discovery
- `last_updated` timestamps on all content
- Stable, documented URL patterns

**What this unlocks.** Agents can discover your content, fetch it in a clean format, and extract metadata without parsing HTML. This is where agents go from "guessing" to "understanding." An agent can now answer "what models does this site cover?" or "what's the pricing for product X?" from structured data.

**Limitations.** No queryable API — agents must fetch individual files and process them locally. No canonical IDs, so URL changes break agent caches. Limited provenance: agents know when content changed, but not whether it was verified. No relationship data beyond what's in the content body.

**What separates this from Level 3.** A queryable API, canonical identifiers, and provenance metadata. Level 2 is a document store. Level 3 is a knowledge base.

*This is where the leverage starts. Most of the agent-readiness benefit comes from reaching Level 2. If you do nothing else, do this.*

---

### Level 3: Agent-Ready

*Agents can efficiently find, query, verify, and cross-reference your content.*

**Defining traits.**
- JSON API with typed, queryable fields
- Canonical identifiers that survive URL changes
- Authorship and provenance metadata
- Structured search index
- Tags and taxonomy for filtering
- Bulk access option (full content dump or paginated API)

**What this unlocks.** Agents can query your content ("show me all models under $5/M input tokens"), verify freshness, cross-reference items via stable IDs, and build your content into workflows. Your site becomes a reliable data source, not just a readable one.

**Limitations.** Agents can't efficiently detect changes without re-polling. No content integrity verification — agents must re-fetch to check for updates. Relationships between content aren't explicit in metadata. Volatile data (pricing, scores) isn't marked as volatile.

**What separates this from Level 4.** Trust infrastructure (hashes, confidence signals, verification dates) and relationship metadata. Level 3 is a reliable knowledge base. Level 4 is a trusted, interconnected knowledge graph.

*This is the target for most sites that take agent traffic seriously. This site is at Level 3.*

---

### Level 4: Agent-Native

*The site is built for agents as a first-class audience.*

**Defining traits.**
- `/.well-known/ai.json` discovery endpoint
- Typed relationships between content in metadata
- JSON/RSS change feed for efficient update detection
- Content integrity hashes for cache validation
- Confidence signals on volatile fields
- `last_verified` timestamps distinct from `last_updated`
- Schema documentation for all content types
- MCP server or equivalent tool integration

**What this unlocks.** Agents can subscribe to changes instead of polling. They can validate cached content without re-fetching. They can traverse your content graph programmatically. They can distinguish between stable facts and volatile data. They can integrate your content into agentic workflows through tool protocols.

**Limitations.** You're maintaining a sophisticated agent infrastructure. The effort is justified for sites where agent traffic is a primary audience — developer platforms, product catalogs, knowledge bases, documentation. For a five-page marketing site, Level 2 is plenty.

*This is the frontier. Very few sites are here today. It's where the web is heading.*

---

## Minimum Viable Agent-Ready Site

You don't need to implement everything above. Here's the shortest path from Level 0 to Level 2 — the level where agents go from scraping to understanding.

### If you do four things, do these

**1. Create `llms.txt`.**
A plain text file at your site root that lists your content with descriptions and URLs. This is the single highest-leverage change you can make. It takes less than an hour. See [llms-txt.org](https://llms-txt.org) for the format.

```
# Your Site Name

> What your site contains, in one sentence.

## Products
- [Product A](/products/a): One-line description
- [Product B](/products/b): One-line description

## Documentation
- [Getting Started](/docs/start): One-line description
```

**2. Serve raw content alongside HTML.**
For every content page, make the source available at a predictable URL. If you use a CMS, add a route that returns the content body with metadata as JSON. If you use markdown, serve the `.md` files directly.

The URL pattern should be guessable: if the page is at `/products/widget`, the raw content should be at `/content/products/widget.md` or `/api/products/widget.json`.

**3. Add consistent metadata.**
Every content item should have these four fields in a machine-readable format:

```yaml
title: "Page Title"
type: "product"
description: "One-line summary."
last_updated: "2026-04-12"
```

The format (YAML frontmatter, JSON, JSON-LD) matters less than consistency. Every page of the same type should have the same fields.

**4. Open `robots.txt`.**
Make sure you're not blocking agent access to content and API paths. Check that `robots.txt` doesn't disallow your content directories. Add explicit `Allow` directives for content paths.

### Implementation order for going further

After the four basics, here's the priority order for additional criteria — ranked by effort-to-impact ratio:

| Priority | Criterion | Why next |
|----------|-----------|----------|
| 1 | Structured APIs | Transforms your site from fetchable to queryable |
| 2 | Canonical IDs | Prevents cache breakage, costs almost nothing to add |
| 3 | Provenance & timestamps | Lets agents assess freshness — critical for trust |
| 4 | Search index | Enables filtering without hitting every file |
| 5 | Tags & taxonomy | Makes relationships discoverable |
| 6 | Change feed | Lets agents subscribe instead of poll |
| 7 | Content hashes | Enables cache validation |
| 8 | Confidence signals | Distinguishes stable from volatile data |
| 9 | Typed relationships | Full content graph traversal |
| 10 | MCP/tool integration | Direct agent tool access |

You don't need to do all ten. Each one adds value independently. The first three after the basics (API, IDs, provenance) are what separate Level 2 from Level 3.

---

## What Comes Next

This checklist is v0.1 — a starting point, not a finished standard.

**Use it now.** Walk through the ten criteria for your own site. The quick self-assessment at the top takes two minutes. The full criteria will show you exactly where your gaps are.

**Start with Level 2.** Four changes — llms.txt, raw content, metadata, robots.txt — deliver most of the benefit. Don't overthink it.

**Go deeper.** The [Agent-Ready Web Standard](/standard) has the technical specifications: format definitions, metadata schemas, API patterns, and protocol details for implementers.

---

### Want help?

We're building tools and services around this spec.

**Agent-readiness audit.** A professional evaluation of your site — detailed scorecard across all ten criteria, specific gaps identified, prioritized implementation roadmap. Not a generic report. A specific, technical assessment of your site's agent readiness. [brian@aifutureready.com](mailto:brian@aifutureready.com?subject=Agent-Ready%20Audit)

**Coming soon.** Implementation templates, starter configs, and an automated scoring tool. If you want early access, get in touch.

**Built something with this?** We want to hear about it. What worked, what didn't, what's missing from the spec. This is v0.1 for a reason.
