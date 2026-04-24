---
title: "Data Changelog"
type: reference
id: "data-changelog"
description: "How AI Future Ready tracks data updates, pricing changes, model changes, verification updates, hashes, and alert-ready change records."
last_updated: "2026-04-24"
tags:
- "api"
- "changelog"
- "changes"
- "pricing"
- "agents"
---

# Data Changelog

The data changelog is the machine-readable history of meaningful dataset changes. It is separate from editorial blog updates.

## Current Endpoints

| Endpoint | Purpose |
|----------|---------|
| `/api/v1/changes.json?since=YYYY-MM-DD` | Query changed items by date and optional type |
| `/feed.json` | JSON Feed for update monitoring |
| `/feed.xml` | RSS mirror |
| `/api/v1/pricing-snapshots.json` | Current generated pricing snapshot for models |
| `/api/v1/samples/pro-data.json` | Representative Pro Data sample |

## Change Types

Planned change types:

- `model_added`
- `model_updated`
- `provider_updated`
- `price_changed`
- `source_verified`
- `score_changed`
- `license_changed`
- `deprecated`
- `removed`

The current public change feed reports updated items with hashes. Field-level diffing is a planned Pro Data feature.

## Hash Rules

Each per-item JSON record includes:

- `content_hash`
- `sha256`
- `generated_at`
- `last_updated`
- `last_verified` when available

Agents can compare hashes to detect whether a page changed without reparsing the full document.

## Alert Rules

Agents and monitoring systems should alert on:

- changed model pricing
- changed context windows
- changed license terms
- new model entries
- new provider entries
- verification date refreshes
- recommendation score changes
- source URL changes

## Planned Pro Data Fields

```json
{
  "change_type": "price_changed",
  "field": "pricing.output",
  "old_value": "$15.00 / 1M tokens",
  "new_value": "$12.00 / 1M tokens",
  "source_url": "https://example.com/pricing",
  "verified_at": "YYYY-MM-DD",
  "confidence": "high"
}
```

