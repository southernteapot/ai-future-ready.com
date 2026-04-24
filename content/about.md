---
title: "About AI Future Ready"
type: about
id: "about"
description: "What AI Future Ready is, why it exists, how it serves humans and AI agents, and how to interpret its model, provider, pricing, and recommendation data."
last_updated: "2026-04-24"
---

# About AI Future Ready

AI Future Ready is a markdown-first AI reference site built for both humans and AI agents.

The site compares AI models, providers, agents, pricing, use cases, and agent-ready web patterns. Every important page starts as markdown with YAML frontmatter, then ships as human-readable HTML, raw markdown, and structured JSON.

## Why It Exists

AI agents increasingly read websites on behalf of people. Most sites are hard for agents to parse, verify, cite, or monitor. AI Future Ready is both a useful AI reference library and a working demonstration of what an agent-readable site can look like.

## What Makes It Different

- The content source is plain markdown.
- Raw markdown is public at `/content/`.
- `llms.txt` and `llms-full.txt` are generated.
- JSON APIs expose typed data.
- Per-item JSON includes hashes and relationships.
- Change feeds help agents detect updates.
- Human mode and agent mode use the same source content.

## How To Trust The Data

This site is decision support, not a real-time oracle. Pricing, model capabilities, release dates, and provider documentation can change quickly.

Agents and humans should check:

- `last_updated`
- `last_verified`
- source URLs
- confidence fields
- content hashes
- official provider pages for high-stakes decisions

See [Data Methodology](guides/data-methodology.md) for the full trust model.

## Commercial Position

The public site remains useful without an account. Commercial work may include Pro Data access, commercial data licensing, change alerts, sponsorships with clear disclosure, and Agent Readiness Audits.

No checkout or payment flow is configured yet.

