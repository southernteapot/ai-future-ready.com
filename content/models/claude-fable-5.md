---
title: "Claude Fable 5"
type: model
id: "claude-fable-5"
provider: "Anthropic"
model_type: "proprietary"
api_model_id: "claude-fable-5"
release_date: "2026-06-09"
description: "Anthropic's most capable widely released model. First public Mythos-class model, released under Project Glasswing safeguards. 80.3% SWE-bench Pro. 1M context, adaptive thinking always on."
last_updated: "2026-06-10"
last_verified: "2026-06-10"
availability_status: "available"
deprecated: false
tool_schema_format: "anthropic"
pricing_confidence: "high"
model_listing_confidence: "high"
benchmark_confidence: "low"
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
- "frontier"
pricing:
  input: "$10.00 / 1M tokens"
  output: "$50.00 / 1M tokens"
  input_per_1m: 10
  output_per_1m: 50
  currency: "USD"
  note: "Double Opus 4.8 pricing. Uses the Opus 4.7 tokenizer: the same text produces roughly 30% more tokens than pre-4.7 Claude models."
benchmarks:
  reasoning: 99
  coding: 99
  math: 97
  writing: 97
  multilingual: 92
  speed: 60
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
- title: "Anthropic: Claude Fable 5 and Claude Mythos 5"
  url: "https://www.anthropic.com/news/claude-fable-5-mythos-5"
- title: "Anthropic Claude models overview"
  url: "https://platform.claude.com/docs/en/about-claude/models/overview"
- title: "TechCrunch: Anthropic releases Claude Fable 5"
  url: "https://techcrunch.com/2026/06/09/anthropic-released-claude-fable-5-its-most-powerful-model-publicly-days-after-warning-ai-is-getting-too-dangerous/"
benchmark_sources:
- title: "Anthropic: Claude Fable 5 and Claude Mythos 5"
  url: "https://www.anthropic.com/news/claude-fable-5-mythos-5"
- title: "AI Future Ready benchmark methodology"
  url: "https://ai-future-ready.com/guides/benchmark-methodology"
best_for:
- "Hardest reasoning and research tasks"
- "Long-horizon agentic coding"
- "High-stakes knowledge work"
- "Scientific analysis"
---

# Claude Fable 5

The most capable model anyone can buy as of June 2026. Fable 5 is the first Mythos-class model Anthropic has released publicly -- the same underlying model as the restricted Claude Mythos 5, but with safeguards that block responses in specific high-risk areas like cybersecurity and biology. When a safeguard triggers (Anthropic says under 5% of sessions on average), the query is answered by Opus 4.8 instead.

The capability gap is real, not marketing. On SWE-bench Pro, Fable 5 scores 80.3% against 69.2% for Opus 4.8, 58.6% for GPT-5.5, and 54.2% for Gemini 3.1 Pro. Anthropic reports state-of-the-art results across software engineering, knowledge work, vision, and scientific research. Adaptive thinking is always on -- there is no extended-thinking toggle -- and the model decides how much reasoning each task needs.

The costs are equally real. At $10/$50 per million tokens it is double Opus 4.8, and it uses the Opus 4.7 tokenizer, so the same text produces roughly 30% more tokens than on pre-4.7 models. One policy caveat matters for enterprises: Anthropic requires 30-day data retention on all Fable 5 traffic, even for customers with prior zero-retention agreements.

**When to pick something else:** If your workload doesn't need the absolute frontier, Opus 4.8 delivers most of the capability at half the price with no retention caveat. For high-volume or latency-sensitive work, Sonnet 4.6 remains the practical default. If your domain regularly touches the safeguarded areas, the silent fallback to Opus 4.8 makes behavior harder to predict -- benchmark your actual traffic before committing.
