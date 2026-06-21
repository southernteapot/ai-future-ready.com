---
title: "Claude Opus 4.7"
type: model
id: "claude-opus-4.7"
provider: "Anthropic"
model_type: "proprietary"
api_model_id: "claude-opus-4-7"
release_date: "2026-04"
description: "Short-lived Opus generation between 4.6 and 4.8. Introduced the new tokenizer (~30% more tokens for the same text) and adaptive thinking. Superseded by Opus 4.8 after six weeks."
last_updated: "2026-06-10"
last_verified: "2026-06-10"
knowledge_cutoff: "2026-01"
availability_status: "legacy"
deprecated: false
superseded_by: "claude-opus-4.8"
tool_schema_format: "anthropic"
pricing_confidence: "high"
model_listing_confidence: "high"
benchmark_confidence: "medium"
context_window: "1M tokens"
website: "https://anthropic.com"
license: "Proprietary"
modality:
- "text"
- "image"
tags:
- "anthropic"
- "proprietary"
- "text"
- "image"
- "legacy"
pricing:
  input: "$5.00 / 1M tokens"
  output: "$25.00 / 1M tokens"
  input_per_1m: 5
  output_per_1m: 25
  currency: "USD"
  note: "Same rate card as Opus 4.6 and 4.8, but the new tokenizer produces ~30% more tokens for the same text, raising effective costs by up to 35% versus Opus 4.6."
benchmarks:
  reasoning: 96
  coding: 97
  math: 93
  writing: 95
  multilingual: 88
  speed: 62
capabilities:
- "function_calling"
- "vision"
- "web_search"
- "code_execution"
- "structured_output"
- "streaming"
- "prompt_caching"
- "tool_search"
- "long_context"
- "reasoning"
- "adaptive_thinking"
sources:
- title: "Anthropic Claude models overview (legacy models)"
  url: "https://platform.claude.com/docs/en/about-claude/models/overview"
- title: "Anthropic API pricing"
  url: "https://platform.claude.com/docs/en/about-claude/pricing"
benchmark_sources:
- title: "AI Future Ready benchmark methodology"
  url: "https://ai-future-ready.com/guides/benchmark-methodology"
best_for:
- "Existing Opus 4.7 integrations pending migration"
---

# Claude Opus 4.7

The transitional Opus. Released in mid-April 2026 and superseded by Opus 4.8 just six weeks later, Opus 4.7 mainly matters now for what it introduced: the new tokenizer that all subsequent Anthropic frontier models (Opus 4.8, Fable 5, Mythos 5) use, and always-on adaptive thinking in place of the extended-thinking toggle.

The tokenizer is the trap. The same text produces roughly 30% more tokens than on Opus 4.6 and earlier, which raised effective costs by up to 35% for some workloads despite the unchanged $5/$25 rate card. Teams that skipped 4.7 still hit this when migrating from 4.6 to 4.8. Its reliable knowledge cutoff is January 2026 -- notably fresher than Opus 4.6's May 2025.

**When to pick something else:** Almost always. Opus 4.8 is a config-only upgrade -- same API surface, tokenizer, context window, and pricing -- with better capability and cheaper Fast Mode. There is no reason to start a new project on 4.7.
