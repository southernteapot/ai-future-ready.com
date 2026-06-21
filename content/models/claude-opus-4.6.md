---
title: "Claude Opus 4.6"
type: model
id: "claude-opus-4.6"
provider: "Anthropic"
model_type: "proprietary"
api_model_id: "claude-opus-4-6"
release_date: "2026-02"
description: "Anthropic's most capable model and the first Opus-class model with a 1M token context window. Leads on coding benchmarks with 80.8% SWE-bench. Internal codename \"Fennec.\""
last_updated: "2026-06-10"
last_verified: "2026-06-10"
knowledge_cutoff: "2025-05"
availability_status: "legacy"
deprecated: false
superseded_by: "claude-opus-4.7"
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
  input: "$5.00 / 1M tokens"
  output: "$25.00 / 1M tokens"
  input_per_1m: 5
  output_per_1m: 25
  currency: "USD"
  cache_read_per_1m: 0.5
  cache_write_5m_per_1m: 6.25
  cache_write_1h_per_1m: 10
  batch_input_per_1m: 2.5
  batch_output_per_1m: 12.5
  note: "Significantly cheaper than Opus 4.5"
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
- title: "Anthropic Claude models overview"
  url: "https://platform.claude.com/docs/en/about-claude/models/overview"
- title: "Anthropic API pricing"
  url: "https://platform.claude.com/docs/en/about-claude/pricing"
- title: "Anthropic Transparency Hub"
  url: "https://www.anthropic.com/transparency/model-report"
benchmark_sources:
- title: "AI Future Ready benchmark methodology"
  url: "https://ai-future-ready.com/guides/benchmark-methodology"
best_for:
- "Complex coding projects"
- "Long-form analysis"
- "Agentic workflows"
- "Tasks requiring accuracy"
---

# Claude Opus 4.6

A legacy model as of mid-2026, but still available and still strong. Opus 4.6 led the coding benchmarks at release (80.8% SWE-bench, 97/100 coding score) and has since been superseded twice: by Opus 4.7 in April 2026 and Opus 4.8 in May 2026. Anthropic now lists it under legacy models. New projects should start on [Opus 4.8](claude-opus-4.8.md).

The 1M context window with no surcharge is a genuine differentiator -- Opus can hold an entire mid-size codebase in one pass. The agent teams feature is unique to Claude and worth exploring if you're building multi-step workflows. Writing quality at 95/100 is also best-in-class among frontier models, making this the rare model that excels at both code and prose.

At $5/$25 per million tokens, the output pricing is higher than GPT-5.4's $15, but significantly cheaper than the previous Opus 4.5. The speed score of 62/100 means Opus is not the model for rapid-fire chat -- it thinks carefully, and you feel it. For complex tasks that's a feature, not a bug.

**When to pick something else:** For new work, [Opus 4.8](claude-opus-4.8.md) at the same $5/$25 rate card is the obvious upgrade -- but note the tokenizer change introduced in Opus 4.7 produces ~30% more tokens for the same text, so effective costs rise even though prices don't. If you mostly need quick answers and speed matters, Sonnet 4.6 is 80% of the quality at nearly half the output cost. One reason to stay on 4.6 deliberately: it is the last Opus on the old tokenizer.
