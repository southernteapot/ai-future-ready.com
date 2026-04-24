---
title: "Pricing and Pro Data"
type: index
id: "pricing"
description: "Free public access, Pro Data, commercial data licensing, agent-readiness audits, sponsor policy, and model pricing references for AI Future Ready."
last_updated: "2026-04-24"
---

# Pricing and Pro Data

This site stays plain, readable, and useful without an account. The paid products are for teams that need structured data, commercial reuse, change tracking, or help making their own sites agent-readable.

## Plans

| Plan | Intended user | Includes | Status |
|------|---------------|----------|--------|
| Free | Humans and AI agents browsing the public reference | HTML pages, raw markdown, `llms.txt`, public JSON API, search index, change feed, and sitemap | Available |
| Pro Data | Builders, researchers, and internal tools that need structured AI market data | Full JSON exports, richer pricing snapshots, source metadata, change history, recommendation slices, hashes, and commercial-ready metadata | Draft |
| Commercial Data License | Companies using the dataset inside products, workflows, RAG systems, or model routers | Commercial reuse rights, attribution terms, snapshot delivery, support window, and integration notes | Draft |
| Agent Readiness Audit | Teams that want their own docs or website to work well for AI agents | `llms.txt`, markdown export review, structured API plan, metadata audit, robots/sitemap review, and agent access score | Draft |

## Paid Products

- [Pro Data](pro-data.md) - detailed dataset, API, and export plan.
- [Pro Data Sample](pro-data-sample.md) - public sample export shape with no checkout or account.
- [Commercial Data License](commercial-license.md) - draft licensing shape for product and internal use.
- [Agent Readiness Audit](agent-readiness-audit.md) - service package for making a site readable by agents.
- [Change Alerts](change-alerts.md) - draft alert and digest product for model, price, source, and recommendation changes.
- [Sponsor Policy](sponsor-policy.md) - disclosure and ranking rules for commercial relationships.
- [Public Roadmap](roadmap.md) - current, next, later, and not-planned items.
- [Contact](../contact.md) - request checklist. No checkout or payment flow is configured.

## Free Access

Free access includes:

- Human-readable HTML pages.
- Raw markdown at `/content/[type]/[slug].md`.
- `llms.txt` and `llms-full.txt`.
- Public JSON at `/api/v1/`.
- Per-item JSON pages.
- Search index.
- Sitemap and robots files.
- Basic change feed.
- MCP docs and local MCP server instructions.

Free access does not include a service-level agreement, custom exports, private support, commercial reuse rights beyond ordinary public reading, or guaranteed pricing freshness.

## Public Data Samples

The public sample endpoint shows the planned Pro Data shape without requiring an account:

```text
/api/v1/samples/pro-data.json
```

The generated pricing snapshot endpoint is public:

```text
/api/v1/pricing-snapshots.json
```

## Pro Data Summary

Pro Data is for agents and software systems that need reliable structured data rather than pages.

The first paid version should include:

- Full content export as JSON and markdown.
- Model pricing snapshots with `last_verified`, provider source URLs, and confidence fields.
- Provider profiles with source-backed verification metadata.
- Task recommendation files for coding, research, cheap, local, private, support, education, and agentic workflows.
- Change history with hashes so agents can detect meaningful updates.
- Bulk download files suitable for RAG, internal docs, and model-routing systems.
- Commercial-friendly metadata fields such as license notes, attribution, update cadence, and source status.

See [Pro Data](pro-data.md) for the fuller draft.

## Disclosure Policy

Paid placements, sponsorships, referral links, and affiliate links should be labeled clearly in both markdown and JSON. Sponsored content must not silently influence recommendation scores.

Recommended fields:

```yaml
sponsored: true
sponsor: "Example Company"
disclosure: "Paid sponsorship. Recommendation scores are not changed by sponsorship."
```

## Model Pricing Reference

All model pricing data below is also available as structured fields in the [JSON API](/api/v1/models.json). Agents can compare costs programmatically without parsing this table.

Up-to-date pricing comparison for AI model APIs.

## Proprietary Models

| Model | Provider | Input | Output | Free Tier | Notes |
|-------|----------|-------|--------|-----------|-------|
| GPT-5.4 | OpenAI | $5.00 / 1M tokens | $15.00 / 1M tokens | No | Pricing varies by variant |
| GPT-5.4 Thinking | OpenAI | $10.00 / 1M tokens | $40.00 / 1M tokens | No |  |
| Claude Opus 4.6 | Anthropic | $5.00 / 1M tokens | $25.00 / 1M tokens | No | Significantly cheaper than Opus 4.5 |
| Claude Sonnet 4.6 | Anthropic | $3.00 / 1M tokens | $15.00 / 1M tokens | No |  |
| Claude Haiku 4.5 | Anthropic | $1.00 / 1M tokens | $5.00 / 1M tokens | No |  |
| Gemini 3.1 Pro | Google | $2.00 / 1M tokens | $12.00 / 1M tokens | No | Free tier via Google AI Studio |
| Gemini 3 Flash | Google | $0.15 / 1M tokens | $0.60 / 1M tokens | No | Free tier available |
| Grok 4.1 | xAI | $3.00 / 1M tokens | $15.00 / 1M tokens | No | Available via xAI API |
| Grok 4.20 | xAI | $2.00 / 1M tokens | $6.00 / 1M tokens | No | Fast tier; Standard tier $20/$60 |

## Open Source Models

| Model | Provider | Self-Hosted | API Pricing | License |
|-------|----------|-------------|-------------|---------|
| Llama 4 Maverick | Meta | Free | Free / Free (self-hosted) | Llama Community License |
| Llama 4 Scout | Meta | Free | Free / Free (self-hosted) | Llama Community License |
| DeepSeek V3.2 | DeepSeek | Free | Free / $0.27 / 1M tokens | MIT |
| DeepSeek R1 | DeepSeek | Free | $0.55 / 1M tokens | MIT |
| Mistral 3 | Mistral AI | Free | $2.00 / 1M tokens | Apache 2.0 |
| Qwen 3 | Alibaba | Free | Free / Free (self-hosted) | Apache 2.0 |
| Hermes 4 405B | Nous Research | Free | Free / Free (self-hosted) | Llama Community License |
| MiniMax M2.7 | MiniMax | Free | Free / $0.53 / 1M tokens | Modified MIT |
| GLM-5 | Zhipu AI | Free | Free / Free (self-hosted) | MIT |
| Kimi K2.5 | Moonshot AI | Free | Free / Free (self-hosted) | MIT |
| Qwen 3.5 397B-A17B | Alibaba | Free | Free / Free (self-hosted) | Apache 2.0 |
| GPT-OSS-120B | OpenAI | Free | Free / Free (open weights) | OpenAI Open Weight License |
| Gemma 3 | Google | Free | Free / Free (open weights) | Gemma Terms of Use |
| Gemma 4 | Google | Free | Free / Free (Apache 2.0) | Apache 2.0 |
| Command R+ | Cohere | Free | $2.50 / 1M tokens | CC-BY-NC 4.0 |
| Yi-1.5 34B | 01.AI | Free | Free / Free (Apache 2.0) | Apache 2.0 |
| Phi-4 | Microsoft | Free | Free / Free (open weights) | MIT |
| Falcon 3 | Technology Innovation Institute | Free | Free / Free (Apache 2.0) | Apache 2.0 |
| SmolLM3 3B | Hugging Face | Free | Free / Free (Apache 2.0) | Apache 2.0 |
| Cohere Tiny Aya 3.35B | Cohere | Free | Free / Free (CC-BY-NC) | CC-BY-NC 4.0 |
| Mistral Small 3 24B | Mistral AI | Free | Free / Free (Apache 2.0) | Apache 2.0 |
| Mistral Small 4 | Mistral AI | Free | Free / Free (Apache 2.0) | Apache 2.0 |
| Nemotron 3 Super | NVIDIA | Free | Free / Free (open weights) | NVIDIA Open Model License |
| Nemotron-Cascade 2 | NVIDIA | Free | Free / Free (open weights) | NVIDIA Open Model License |

*Prices as of April 2026. Check provider websites for current rates.*
