---
title: "Use Local Models for Private Documents"
type: guide
id: "local-models-private-documents"
description: "A practical recipe for using local or private AI models with sensitive documents, including retrieval, redaction, access control, and evaluation."
last_updated: "2026-04-24"
tags:
- "recipe"
- "local"
- "privacy"
- "documents"
- "retrieval"
---

# Use Local Models for Private Documents

Private document workflows are usually retrieval systems with model reasoning on top. The model is only one part of the privacy design.

## Minimal Stack

- Document store with access controls
- Parser and chunker
- Local embedding model or private embedding API
- Vector index or keyword search
- Local/private generation model
- Audit logs
- Evaluation set

## Workflow

1. Classify documents by sensitivity.
2. Decide whether embeddings can leave the environment.
3. Build retrieval with access checks.
4. Use a local/private model for answers.
5. Require citations to retrieved chunks.
6. Log prompts, retrieved documents, and outputs.

## Model Guidance

Use [Choose a Local Model](/guides/choose-a-local-model) for model selection. Prefer the smallest model that passes document QA evals.

## Guardrails

- Do not retrieve documents the user cannot access.
- Do not answer without retrieved evidence.
- Redact secrets before logs leave the environment.
- Keep evaluation documents separate from training or tuning.

## Failure Mode

The common mistake is focusing only on model weights. Private document systems fail when retrieval ignores permissions or logs leak sensitive content.
