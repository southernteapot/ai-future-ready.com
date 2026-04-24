---
title: "Build an AI Research Assistant"
type: guide
id: "build-ai-research-assistant"
description: "A practical recipe for building an AI research assistant that gathers sources, preserves uncertainty, summarizes evidence, and avoids unsupported claims."
last_updated: "2026-04-24"
tags:
- "recipe"
- "research"
- "agents"
- "sources"
- "verification"
---

# Build an AI Research Assistant

A research assistant should help gather, compare, and synthesize sources. It should not pretend uncertain information is certain.

## Minimal Stack

- Search or source connector
- Document fetcher
- Extractor for title, author, date, and URL
- Research model from [Choose a Research Model](/guides/choose-a-research-model)
- Notes store
- Citation or source-link output

## Workflow

1. Convert the user question into search queries.
2. Collect sources with dates and URLs.
3. Extract claims and evidence separately.
4. Cluster agreement and disagreement.
5. Draft answer with uncertainty.
6. Include source list and freshness notes.

## Model Guidance

Use a strong reasoning/writing model for synthesis. Use cheaper models for extraction and deduplication if source volume is large.

## Output Format

Good research output separates:

- answer
- evidence
- uncertainty
- source age
- assumptions
- follow-up checks

## Failure Mode

The common mistake is asking one model to browse, judge, summarize, and cite without preserving source provenance. Keep source metadata attached from the beginning.
