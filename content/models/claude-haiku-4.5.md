---
title: "Claude Haiku 4.5"
type: model
id: "claude-haiku-4.5"
provider: "Anthropic"
model_type: "proprietary"
api_model_id: "claude-haiku-4-5"
release_date: "2025-10-15"
description: "Anthropic's fastest and most cost-efficient model. Matches Claude Sonnet 4's performance on coding and agent tasks while being dramatically faster and cheaper."
last_updated: "2026-06-10"
last_verified: "2026-06-10"
knowledge_cutoff: "2025-02"
availability_status: "available"
deprecated: false
tool_schema_format: "anthropic"
pricing_confidence: "high"
model_listing_confidence: "high"
benchmark_confidence: "medium"
context_window: "200K tokens"
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
  input: "$1.00 / 1M tokens"
  output: "$5.00 / 1M tokens"
  input_per_1m: 1
  output_per_1m: 5
  currency: "USD"
  cache_read_per_1m: 0.1
  cache_write_5m_per_1m: 1.25
  cache_write_1h_per_1m: 2
  batch_input_per_1m: 0.5
  batch_output_per_1m: 2.5
benchmarks:
  reasoning: 82
  coding: 84
  math: 80
  writing: 83
  multilingual: 80
  speed: 95
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
sources:
- title: "Anthropic Claude Haiku 4.5"
  url: "https://www.anthropic.com/claude/haiku"
- title: "Anthropic Claude models overview"
  url: "https://platform.claude.com/docs/en/about-claude/models/overview"
- title: "Anthropic API pricing"
  url: "https://platform.claude.com/docs/en/about-claude/pricing"
benchmark_sources:
- title: "AI Future Ready benchmark methodology"
  url: "https://ai-future-ready.com/guides/benchmark-methodology"
best_for:
- "High-volume tasks"
- "Quick queries"
- "Cost-sensitive applications"
- "Prototyping"
---

# Claude Haiku 4.5

The speed king of the Claude lineup. Haiku 4.5 matches what Sonnet 4 could do -- including coding and agentic tasks -- while being dramatically faster (95/100 speed) and costing just $1/$5 per million tokens. That's a previous-generation Sonnet at a fraction of the price.

For prototyping, classification, extraction, and high-volume pipelines, Haiku is the obvious choice. An 84/100 coding score means it handles routine programming tasks without issue. The 200K context window is smaller than the 1M offered by Sonnet and Opus, but for most real workloads you won't hit that ceiling.

The direct competitor is Gemini 3 Flash at $0.50/$3.00 -- still cheaper, with a 1M context window. Flash wins on price and context size, but Haiku edges it on coding (84 vs 80) and writing (83 vs 83). If you're in the Anthropic ecosystem and want the fastest Claude available, Haiku is the pick. If raw cost is the only metric, Flash is hard to beat.

**When to pick something else:** Anything requiring deep reasoning or nuanced multi-step analysis should go to Sonnet 4.6 or Opus 4.8. Haiku's 82/100 reasoning score is good but not frontier-class. For budget workloads where you don't need the Claude instruction-following style, Gemini 3 Flash saves you 85% on input costs.
