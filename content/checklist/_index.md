---
title: "Agent-Ready Checklist"
type: checklist
id: "agent-ready-checklist"
description: "Score your website's agent-readiness. 100-point rubric across 5 categories: content structure, machine access, discovery, trust, and relationships."
last_updated: "2026-04-11"
version: "0.1.0"
total_points: 100
categories:
  - name: "Content Structure"
    max_points: 20
  - name: "Machine Access"
    max_points: 20
  - name: "Discovery"
    max_points: 20
  - name: "Trust & Provenance"
    max_points: 20
  - name: "Relationships & Context"
    max_points: 20
scoring:
  agent_native: 90
  structured: 70
  accessible: 40
  not_ready: 0
tags:
  - checklist
  - audit
  - scoring
  - agent-ready
---

# Agent-Ready Checklist

Score your website against this rubric. 100 points total across 5 categories. Be honest — partial credit counts.

## How to Score

For each item, assign the points listed if your site meets the criteria. Partial implementations get partial credit. Add up your total at the end.

---

## 1. Content Structure (20 points)

How well your content is organized for machine consumption.

| Points | Criteria |
|--------|----------|
| 5 | **Structured source format.** Content is stored as markdown, structured JSON, or equivalent — not only as HTML templates. An agent can get the content without parsing rendered HTML. |
| 5 | **Consistent metadata schema.** Every content item of the same type has the same metadata fields (title, description, type, date). No missing fields, no inconsistent naming. |
| 5 | **Stable identifiers.** Every content item has a permanent, unique ID in its metadata that survives URL changes. This is not the URL — it is a canonical identifier. |
| 3 | **Typed content.** Content declares its type (product, article, doc, glossary entry, etc.) and each type has a defined schema. |
| 2 | **No embedded rendering logic.** Content does not require JavaScript, server-side rendering, or a specific framework to parse. Raw content is self-contained. |

**Your score: ___ / 20**

---

## 2. Machine Access (20 points)

Whether agents can get your content without scraping.

| Points | Criteria |
|--------|----------|
| 5 | **Raw content access.** Source content (markdown, structured text, JSON) is available at predictable URLs — not just rendered HTML. Example: `/content/[type]/[slug].md` |
| 5 | **Structured API.** A JSON API returns typed, queryable content. Supports listing by type, fetching by ID, and includes metadata. |
| 4 | **No barriers.** Public content does not require JavaScript rendering, CAPTCHAs, authentication, or aggressive rate limiting for agent access. |
| 3 | **Predictable URL patterns.** An agent can construct a content URL from a type and slug without discovering it first. URL structure is documented. |
| 3 | **Bulk access option.** Agents can fetch all content efficiently — a full export file, paginated API, or equivalent. Not one request per page. |

**Your score: ___ / 20**

---

## 3. Discovery (20 points)

How easily agents find what's available.

| Points | Criteria |
|--------|----------|
| 6 | **llms.txt.** A machine-readable index at `/llms.txt` lists all content sections and items with descriptions and links. |
| 4 | **XML sitemap.** Includes both human-readable page URLs and machine-readable content URLs (markdown, JSON). |
| 4 | **robots.txt allows access.** Explicitly allows agent access to content directories and API endpoints. Does not block known AI user agents. |
| 3 | **Content index page.** A structured index of all content types and counts, accessible as both HTML and JSON. |
| 3 | **Well-known discovery.** A `/.well-known/ai.json` endpoint declares available agent protocols (llms.txt location, API base URL, raw content path, etc.). |

**Your score: ___ / 20**

---

## 4. Trust & Provenance (20 points)

Whether agents can assess content reliability.

| Points | Criteria |
|--------|----------|
| 5 | **Last-updated timestamps.** Every content item has an accurate `last_updated` date in its metadata. |
| 4 | **Authorship.** Content attributes an author or maintaining organization. |
| 3 | **Created date.** Content includes its original publication date, distinct from last-updated. |
| 3 | **Last-verified date.** For factual content, a `last_verified` field indicates when accuracy was confirmed — distinct from editorial changes. |
| 3 | **Content integrity.** A hash or version identifier lets agents detect changes to cached content without re-fetching the full body. |
| 2 | **Confidence signals.** Volatile fields (pricing, availability, scores) are marked with recency or confidence metadata. |

**Your score: ___ / 20**

---

## 5. Relationships & Context (20 points)

How well content is connected and contextualized.

| Points | Criteria |
|--------|----------|
| 5 | **Taxonomy and tags.** Content is categorized with consistent tags that agents can use for filtering and grouping. |
| 5 | **Cross-references.** Related content is linked in metadata (not just inline links) with typed relationships. |
| 4 | **Search index.** A structured search index (JSON) is available with titles, descriptions, tags, and URLs for all content. |
| 3 | **Change feed.** An RSS, Atom, or JSON feed provides timestamped updates so agents know what's new. |
| 3 | **Schema declarations.** Each content type publishes its metadata schema so agents know what fields to expect. |

**Your score: ___ / 20**

---

## Total Score

| Range | Level | What It Means |
|-------|-------|---------------|
| **90-100** | Agent-Native | Your site is built for agents as a first-class audience. Full metadata, discovery, trust signals, and relationships. |
| **70-89** | Structured | Agents can efficiently find, query, and verify your content. You're ahead of most of the web. |
| **40-69** | Accessible | Agents can read your content, but discovery and trust are limited. Room to improve. |
| **0-39** | Not Agent-Ready | Agents must scrape, guess, and hope. Your content is invisible or unreliable to AI. |

---

## This Site's Score

AI Future Ready scores itself:

| Category | Score |
|----------|-------|
| Content Structure | 18 / 20 |
| Machine Access | 19 / 20 |
| Discovery | 17 / 20 |
| Trust & Provenance | 12 / 20 |
| Relationships & Context | 14 / 20 |
| **Total** | **80 / 100** |

We're Level 2 (Structured), working toward Level 3. The gaps are in provenance metadata (no `last_verified`, limited confidence signals) and relationships (no typed cross-references or change feed yet). We're building those next.

Honesty about your own score is part of the point.

---

## What Next

**Score above 70?** You're ahead of most of the web. Focus on the categories where you lost points.

**Score below 40?** Start with the basics: structured content, raw access, and llms.txt. Those three changes get you most of the way to Accessible.

**Want a professional evaluation?** We offer agent-ready audits — a detailed scorecard with specific recommendations for your site. [Get in touch](mailto:brian@aifutureready.com).

**Want to implement it yourself?** Read the [Agent-Ready Web Standard](/standard) for the full specification.
