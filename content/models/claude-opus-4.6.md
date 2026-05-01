---
title: "Claude Opus 4.6"
type: model
id: "claude-opus-4.6"
provider: "Anthropic"
model_type: "proprietary"
api_model_id: "claude-opus-4-6"
release_date: "2026-02"
description: "Anthropic's most capable model and the first Opus-class model with a 1M token context window. Leads on coding benchmarks with 80.8% SWE-bench. Internal codename \"Fennec.\""
last_updated: "2026-04-30"
last_verified: "2026-04-30"
knowledge_cutoff: "2025-05"
availability_status: "available"
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

The best coding model available. At 80.8% SWE-bench and a 97/100 coding score, Opus 4.6 leads every other model on the benchmarks that matter most for real-world software engineering. If you're choosing between this and GPT-5.4, the decision comes down to whether you value SWE-bench leadership (Opus) or broader ecosystem integrations (GPT).

The 1M context window with no surcharge is a genuine differentiator -- Opus can hold an entire mid-size codebase in one pass. The agent teams feature is unique to Claude and worth exploring if you're building multi-step workflows. Writing quality at 95/100 is also best-in-class among frontier models, making this the rare model that excels at both code and prose.

At $5/$25 per million tokens, the output pricing is higher than GPT-5.4's $15, but significantly cheaper than the previous Opus 4.5. The speed score of 62/100 means Opus is not the model for rapid-fire chat -- it thinks carefully, and you feel it. For complex tasks that's a feature, not a bug.

**When to pick something else:** If you mostly need quick answers and speed matters, Sonnet 4.6 is 80% of the quality at nearly half the output cost. For math-heavy work, GPT-5.4 Thinking edges ahead with a 97/100 math score vs. Opus's 93. And if you're locked into the OpenAI ecosystem with existing tooling, the switching cost may not be worth it.
