---
title: "Claude Sonnet 4.6"
type: model
id: "claude-sonnet-4.6"
provider: "Anthropic"
model_type: "proprietary"
api_model_id: "claude-sonnet-4-6"
release_date: "2026-02-17"
description: "The first Sonnet model preferred over a previous Opus in coding evaluations. Excellent balance of speed, quality, and cost with a full 1M token context window."
last_updated: "2026-04-30"
last_verified: "2026-04-30"
knowledge_cutoff: "2025-08"
availability_status: "available"
deprecated: false
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
pricing:
  input: "$3.00 / 1M tokens"
  output: "$15.00 / 1M tokens"
  input_per_1m: 3
  output_per_1m: 15
  currency: "USD"
  cache_read_per_1m: 0.3
  cache_write_5m_per_1m: 3.75
  cache_write_1h_per_1m: 6
  batch_input_per_1m: 1.5
  batch_output_per_1m: 7.5
benchmarks:
  reasoning: 91
  coding: 93
  math: 89
  writing: 92
  multilingual: 87
  speed: 82
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
- "extended_thinking"
- "adaptive_thinking"
sources:
- title: "Anthropic Claude models overview"
  url: "https://platform.claude.com/docs/en/about-claude/models/overview"
- title: "Anthropic API pricing"
  url: "https://platform.claude.com/docs/en/about-claude/pricing"
- title: "Anthropic release notes"
  url: "https://platform.claude.com/docs/en/release-notes/overview"
benchmark_sources:
- title: "AI Future Ready benchmark methodology"
  url: "https://ai-future-ready.com/guides/benchmark-methodology"
best_for:
- "Daily coding tasks"
- "Content creation"
- "General analysis"
- "Cost-effective quality"
---

# Claude Sonnet 4.6

The best daily-driver model in AI right now. Sonnet 4.6 is the first mid-tier model to beat a previous Opus in coding evaluations, and at $3/$15 per million tokens with a 1M context window, the value proposition is hard to argue with.

A 93/100 coding score puts Sonnet in striking distance of frontier models that cost two to three times as much. It's faster than Opus 4.6 (82 vs 62 speed score), and the writing quality at 92/100 means you're not sacrificing much for the speedup. For the vast majority of coding, analysis, and content work, Sonnet handles it without breaking a sweat.

Compared to GPT-5.4, Sonnet is cheaper on input ($3 vs $5) and matches on output ($15), while trading some reasoning headroom (91 vs 95). Against Gemini 3.1 Pro, Sonnet wins on coding and writing but costs more. The honest assessment: Sonnet 4.6 is the model you should default to unless you have a specific reason to reach for something else.

**When to pick something else:** When the task genuinely requires the last 5% of capability -- complex multi-file refactors, intricate reasoning chains -- upgrade to Opus 4.6. For high-volume, cost-sensitive workloads where quality can flex a bit, Haiku 4.5 at $1/$5 or Gemini 3 Flash at $0.50/$3.00 will save you serious money.
