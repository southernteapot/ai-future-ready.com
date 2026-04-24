---
title: "Pro Data Sample"
type: pricing
id: "pro-data-sample"
description: "A public sample showing the shape of the planned Pro Data package: model record, provider record, pricing snapshot, recommendation, change record, and source record."
last_updated: "2026-04-24"
status: "sample"
tags:
- "pricing"
- "pro-data"
- "sample"
- "api"
- "agents"
---

# Pro Data Sample

This page documents the public sample export for the planned Pro Data product.

Sample endpoint:

```text
/api/v1/samples/pro-data.json
```

The sample exists so buyers and agents can inspect the shape before any checkout, account system, or paid API is built.

## Included Records

- one complete model summary
- one provider summary
- one pricing snapshot
- one recommendation record
- one change record
- one source record
- schema notes

## Intended Use

Use the sample to evaluate:

- whether the JSON shape fits your application
- which fields are already public
- which fields would need stronger verification before production use
- how hashes and `last_verified` fields work
- how recommendations explain their score basis

## Not Included

- no API key
- no checkout
- no paid account
- no private fields
- no service-level guarantee
- no real-time pricing guarantee

## Planned Pro Data Upgrade

The full Pro Data package should add:

- all model records
- all provider records
- historical pricing snapshots
- field-level change records
- bulk NDJSON export
- CSV pricing export
- source verification status
- commercial license metadata

