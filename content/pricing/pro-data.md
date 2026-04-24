---
title: "Pro Data"
type: pricing
id: "pro-data"
description: "Draft product definition for the paid AI Future Ready Pro Data package: structured exports, pricing snapshots, source metadata, recommendations, changes, and commercial-ready fields."
last_updated: "2026-04-24"
status: "draft"
price_target:
  individual: "$19-$49/month"
  team: "$199-$499/month"
tags:
- "pricing"
- "pro-data"
- "api"
- "commercial"
- "agents"
---

# Pro Data

Pro Data is the paid dataset and API package for agents, developers, researchers, and internal tools that need structured AI market data without scraping pages.

The public site remains useful and open. Pro Data adds reliability, packaging, update history, and commercial-ready metadata.

## Intended Users

- AI agents that need model and provider data for recommendations.
- Developers building model routers, procurement tools, dashboards, or internal copilots.
- Researchers tracking pricing, model capabilities, and provider changes.
- Teams that want AI model data in RAG systems or internal documentation.
- Companies that need a clean commercial-use path.

## Included Data

### Models

- Canonical model id.
- Provider.
- Model family.
- Model type: proprietary, open-weight, open-source, local, hosted, or hybrid.
- Context window.
- Input modalities.
- Output modalities.
- Best-use labels.
- Strengths and watch-outs.
- Benchmark fields used by this site.
- Task scores used by recommendation endpoints.
- License notes.
- Official website and documentation URLs.
- Related providers, agents, guides, and comparisons.

### Pricing

- Input token price.
- Output token price.
- Cached input price when available.
- Batch discount notes when available.
- Tool-use pricing when available.
- Storage or session pricing when relevant.
- Free-tier notes.
- Self-hosted cost notes for open models.
- `last_verified` date.
- Source URL for each pricing claim.
- Confidence field for pricing freshness.
- Notes for ambiguous or provider-specific pricing.

### Providers

- Provider profile.
- Related models.
- Related agents or SDKs.
- Official model documentation source.
- Official pricing source.
- Provider strengths.
- Deployment considerations.
- Compliance and procurement notes.
- Ecosystem maturity notes.
- Verification date.
- Source confidence fields.

### Recommendations

Pro Data should include task-specific recommendation files for:

- Coding.
- Research.
- Writing.
- Math.
- Reasoning.
- Multilingual work.
- Low-cost workloads.
- Local and private deployment.
- Agentic workflows.
- Image-capable workflows.
- Education.
- Customer support.
- Enterprise procurement.

Each recommendation item should include:

- Score.
- Score basis.
- Model id.
- Provider.
- Pricing summary.
- Relevant tradeoffs.
- Links to source pages.
- Content hash.
- Last updated date.
- Last verified date.

### Change Tracking

- Changed-since endpoint.
- Daily or weekly snapshot files.
- Per-item content hashes.
- Previous and current hash.
- Changed fields when practical.
- Date modified.
- Date verified.
- New item, updated item, deprecated item, and removed item flags.

### Source Metadata

- Official source URLs.
- Source title.
- Source type: model docs, pricing page, blog announcement, repository, paper, benchmark, or license.
- Last checked date.
- Confidence score.
- Human review status.
- Notes about conflicting provider pages.

### Export Formats

- JSON index.
- Per-item JSON.
- NDJSON bulk export.
- Markdown bundle.
- CSV files for pricing and model comparison.
- Full text export for RAG ingestion.
- Hash manifest.
- Schema file.

## Pro API Endpoints

These endpoints are a draft target, not implemented yet:

```text
/api/pro/v1/index.json
/api/pro/v1/models.json
/api/pro/v1/models/{slug}.json
/api/pro/v1/providers.json
/api/pro/v1/pricing-snapshots.json
/api/pro/v1/recommend/{task}.json
/api/pro/v1/changes.json?since=YYYY-MM-DD
/api/pro/v1/snapshots/{date}.json
/api/pro/v1/export.ndjson
/api/pro/v1/hash-manifest.json
```

## Access Levels

### Individual

For solo builders and researchers.

- API key.
- Full JSON export.
- Recommendation endpoints.
- Pricing snapshots.
- Weekly updates.
- Reasonable personal-use limit.

### Team

For internal tools and small companies.

- Multiple API keys.
- Commercial internal use.
- Higher limits.
- Daily or weekly snapshots.
- Change feed.
- Bulk export.
- Email support.

### Enterprise

For production products, procurement workflows, and model-routing systems.

- Commercial redistribution terms.
- Custom export cadence.
- Private fields or internal notes.
- Integration support.
- Source verification requests.
- SLA and procurement paperwork if needed.

## What Pro Data Should Not Do

- It should not hide all useful data from the public site.
- It should not sell unlabeled influence over recommendation rankings.
- It should not claim provider pricing is real-time unless it is actually checked in real time.
- It should not mix sponsored placement with organic recommendations.
- It should not provide legal, financial, or procurement advice as a substitute for review by the buyer.

## Disclosure Rules

Any paid relationship should be exposed in markdown and JSON.

```yaml
commercial:
  plan_required: "pro-data"
  sponsorship_allowed: true
  ranking_influence_allowed: false
  disclosure_required: true
```

## First Implementation Step

The practical first step is to package the existing public dataset into a stronger Pro Data shape:

- Add richer pricing-source fields to models.
- Add source and confidence metadata to every provider.
- Add `pricing-snapshots.json`.
- Add `hash-manifest.json`.
- Add commercial license terms.
- Add a simple contact or checkout path.

