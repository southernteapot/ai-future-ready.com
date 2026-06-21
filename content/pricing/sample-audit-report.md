---
title: "Sample Audit Report"
type: pricing
id: "sample-audit-report"
description: "A complete sample Agent Readiness Audit report for a fictional SaaS documentation site, showing the exact format, scoring, and priority fix list buyers receive."
last_updated: "2026-06-10"
status: "sample"
tags:
- "pricing"
- "audit"
- "agent-ready"
- "sample"
- "report"
---

# Sample Audit Report

This is a complete sample of the report an [Agent Readiness Audit](agent-readiness-audit.md) produces. The subject is **Acme Docs**, a fictional SaaS documentation site of about 120 pages. Every finding below is the kind of thing real audits surface; the site itself is invented.

---

## Agent Readiness Audit: docs.acme.example

**Audited:** 2026-06-10 · **Pages sampled:** 48 of ~120 · **Auditor:** AI Future Ready

### Overall Score: 31 / 100 — Largely invisible to agents

| Category | Weight | Score | Notes |
|----------|--------|-------|-------|
| Discovery | 20 | 4 | No `llms.txt`. Sitemap covers 60% of pages. No `.well-known/ai.json`. |
| Raw content access | 20 | 0 | No markdown/text endpoints. All content requires JS rendering. |
| Structured metadata | 20 | 8 | Title/description present. No canonical IDs, no typed fields. |
| Freshness and verification | 15 | 5 | No last-updated dates on 41 of 48 sampled pages. |
| Change tracking | 10 | 0 | No feed, no changelog, no changed-since API. |
| Citation and source quality | 10 | 8 | URLs are stable. Headings are clean and citable. |
| Performance and accessibility | 5 | 6 | Fast TTFB. Content blocked behind client-side rendering. |

### What this means in practice

An AI agent asked "how do I rotate an Acme API key?" cannot answer from your docs today. The page exists, but it is invisible: it renders client-side only, appears in no machine-readable index, and gives an agent no way to confirm the answer is current. Agents fall back to third-party blog posts — some outdated, none controlled by you.

### Priority fixes

1. **Serve raw content.** Expose each docs page as markdown at a stable URL (e.g. `/docs/api-keys.md`). Highest impact single change. (Effort: low if docs are markdown-sourced.)
2. **Add `llms.txt`.** A one-page index of your most important content with raw URLs. (Effort: hours.)
3. **Complete the sitemap** and include raw content URLs. (Effort: hours.)
4. **Add `last_updated` to every page** — visible in HTML and in metadata. (Effort: low.)
5. **Publish a changelog or feed** so agents can check what changed without re-crawling. (Effort: medium.)
6. **Add canonical IDs and typed metadata** for product names, versions, and endpoints. (Effort: medium, schedule after 1–5.)

### What we did not flag

Robots policy already allows the major AI crawlers. URL structure is stable and clean — do not change it while fixing the above.

### Re-audit estimate

Implementing fixes 1–5 moves the projected score to roughly **74 / 100**, ahead of most documentation sites we sample.

---

## What you receive

Every real audit delivers this report as markdown (yours to publish or keep private), the scored table with per-category evidence, the prioritized fix list with effort estimates, a suggested `llms.txt` written for your site, and a 30-minute walkthrough call. See [Agent Readiness Audit](agent-readiness-audit.md) for packages and pricing, or the [checklist](/checklist) to self-assess first.
