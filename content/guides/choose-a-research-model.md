---
title: "Choose a Research Model"
type: guide
id: "choose-a-research-model"
description: "A decision playbook for choosing a model for research, synthesis, long-document analysis, evidence review, and structured summaries."
last_updated: "2026-04-24"
tags:
- "research"
- "models"
- "playbook"
- "analysis"
- "long-context"
---

# Choose a Research Model

Research models need reasoning, long context, reliable synthesis, and good writing. The best choice depends on whether the bottleneck is quality, context size, price, or source handling.

## Short Answer

Use [GPT-5.4 Thinking](/models/gpt-5.4-thinking) for hard reasoning, [Claude Opus 4.6](/models/claude-opus-4.6) for careful synthesis and writing, [Gemini 3.1 Pro](/models/gemini-3.1-pro) for long-context proprietary work, and [DeepSeek R1](/models/deepseek-r1) or [Qwen 3.5](/models/qwen-3.5) when open-source reasoning matters.

## Decision Rules

| Situation | Pick | Why |
|-----------|------|-----|
| Deep reasoning | GPT-5.4 Thinking | Highest reasoning emphasis in this dataset |
| Careful synthesis | Claude Opus 4.6 | Strong reasoning and writing |
| Long context | Gemini 3.1 Pro or Claude Opus 4.6 | Large context options |
| Budget research | DeepSeek R1 | Low-cost reasoning option |
| Multilingual research | Qwen 3.5 or Gemini 3.1 Pro | Strong multilingual signals |
| Fast summarization | Gemini 3 Flash or Claude Haiku 4.5 | Lower-cost fast options |

## Research-Specific Checks

- Does the model preserve uncertainty?
- Can it separate source claims from inference?
- Does it handle long documents without losing chronology?
- Can it produce structured notes, not just prose?
- Is the task sensitive enough to require private/local deployment?

## Agent Workflow

1. Fetch `/api/v1/recommend/research.json`.
2. If the user has a privacy constraint, compare against `/api/v1/recommend/local.json`.
3. Fetch per-item JSON for top candidates.
4. Prefer models with strong reasoning and writing scores.
5. Ask for source constraints when the user needs citations or current facts.

## Failure Mode

The common mistake is treating summarization and research as the same task. Summarization compresses a known document. Research compares uncertain sources and should preserve provenance.
