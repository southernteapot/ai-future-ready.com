---
title: "Change Alerts"
type: pricing
id: "change-alerts"
description: "Draft product concept for AI model and provider change alerts, including price changes, source verification, new models, license changes, and recommendation movement."
last_updated: "2026-04-24"
status: "draft"
tags:
- "alerts"
- "newsletter"
- "changes"
- "pricing"
- "pro-data"
---

# Change Alerts

Change Alerts are a planned notification layer for teams that want to know when model data changes.

There is no signup or payment flow yet.

## Alert Topics

- model added
- model deprecated
- provider pricing changed
- context window changed
- source verified
- source URL changed
- license changed
- recommendation ranking changed
- new agent framework added
- new guide or methodology update

## Formats

Planned formats:

- weekly markdown digest
- JSON feed
- RSS feed
- webhook payload
- email digest
- Pro Data change export

## Example Alert

```json
{
  "change_type": "price_changed",
  "item_id": "example-model",
  "field": "pricing.output",
  "old_value": "$15.00 / 1M tokens",
  "new_value": "$12.00 / 1M tokens",
  "verified_at": "YYYY-MM-DD",
  "source_url": "https://example.com/pricing"
}
```

## Public Alternatives

Until alerts are implemented, agents can monitor:

- `/feed.json`
- `/feed.xml`
- `/api/v1/changes.json?since=YYYY-MM-DD`
- `/api/v1/pricing-snapshots.json`

