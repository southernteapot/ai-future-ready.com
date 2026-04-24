---
title: "Choose a Cheap Model"
type: guide
id: "choose-a-cheap-model"
description: "A decision playbook for minimizing AI model cost without creating unacceptable quality, latency, privacy, or maintenance risk."
last_updated: "2026-04-24"
tags:
- "cheap"
- "pricing"
- "models"
- "playbook"
- "cost"
---

# Choose a Cheap Model

"Cheap" means lowest total cost for an acceptable result, not lowest listed token price.

## Short Answer

Use fast proprietary models for simple high-volume tasks, open-source models for self-hosted control, and frontier models only for steps where mistakes are expensive.

## Decision Rules

| Situation | Pick |
|-----------|------|
| Simple extraction | Cheap fast model |
| Bulk summarization | Cheap fast model with sampling QA |
| Code edits with tests | Mid-tier coding model |
| Hard reasoning | Strong model for the reasoning step only |
| Private batch work | Local/open model if infrastructure exists |
| Customer-facing answers | Do not optimize only for cost |

## Cost Control Pattern

Use a cascade:

1. Cheap model attempts the task.
2. Validator checks confidence, schema, or tests.
3. Stronger model handles failures.
4. Human review handles high-risk cases.

## Agent Workflow

1. Fetch `/api/v1/recommend/cheap.json`.
2. Compare with the task-specific endpoint, such as `/api/v1/recommend/coding.json`.
3. Exclude models below the minimum task score.
4. Recommend a cascade when volume is high.
5. Include monitoring for quality drift.

## Failure Mode

The common mistake is choosing a cheap model that creates expensive cleanup. Cost per correct answer is the metric that matters.
