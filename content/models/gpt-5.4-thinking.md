---
title: "GPT-5.4 Thinking"
type: model
id: "gpt-5.4-thinking"
provider: "OpenAI"
model_type: "proprietary"
api_model_id: "gpt-5.4"
variant_of: "gpt-5.4"
release_date: "2026-03-05"
description: "Extended reasoning use of GPT-5.4 for the hardest problems. In the API, use the GPT-5.4 model with higher reasoning effort; in ChatGPT this is exposed as GPT-5.4 Thinking."
last_updated: "2026-04-30"
last_verified: "2026-04-30"
knowledge_cutoff: "2025-08-31"
availability_status: "available"
deprecated: false
superseded_by: "gpt-5.5"
tool_schema_format: "openai"
pricing_confidence: "high"
model_listing_confidence: "high"
benchmark_confidence: "medium"
context_window: "1.05M tokens"
website: "https://openai.com"
license: "Proprietary"
modality:
- "text"
- "image"
tags:
- "openai"
- "proprietary"
- "text"
- "image"
pricing:
  input: "$2.50 / 1M tokens"
  output: "$15.00 / 1M tokens"
  input_per_1m: 2.5
  output_per_1m: 15
  currency: "USD"
  cache_read_per_1m: 0.25
  long_context_input_per_1m: 5
  long_context_output_per_1m: 22.5
  note: "Higher reasoning effort is billed as output tokens; prompts over 272K input tokens use long-context pricing."
benchmarks:
  reasoning: 98
  coding: 93
  math: 97
  writing: 85
  multilingual: 88
  speed: 45
capabilities:
- "function_calling"
- "vision"
- "web_search"
- "file_search"
- "code_execution"
- "computer_use"
- "structured_output"
- "streaming"
- "prompt_caching"
- "tool_search"
- "mcp"
- "long_context"
- "reasoning"
sources:
- title: "OpenAI GPT-5.4 model documentation"
  url: "https://developers.openai.com/api/docs/models/gpt-5.4"
- title: "Introducing GPT-5.4"
  url: "https://openai.com/index/introducing-gpt-5-4/"
- title: "OpenAI API pricing"
  url: "https://developers.openai.com/api/docs/pricing"
benchmark_sources:
- title: "Introducing GPT-5.4 evaluations"
  url: "https://openai.com/index/introducing-gpt-5-4/"
best_for:
- "Advanced math"
- "Scientific reasoning"
- "Complex problem solving"
- "Competition-level coding"
---

# GPT-5.4 Thinking

The highest-reasoning configuration in OpenAI's GPT-5.4 family. With a 98/100 reasoning score and 97/100 in math, GPT-5.4 Thinking is the successor to the o1/o3 line in this site's taxonomy, optimized for tasks where extra reasoning tokens are worth the latency and cost.

This is a specialist mode, not a separate API model. In the API, use `gpt-5.4` with higher reasoning effort; in ChatGPT, OpenAI exposes this behavior as GPT-5.4 Thinking. Reasoning tokens are billed as output tokens, so hard problems can still cost materially more than straightforward calls even though the listed token rates match the base model. The speed score of 45/100 means you'll be waiting. That's the tradeoff: when the problem is genuinely hard -- competition math, multi-step scientific reasoning, formal proofs -- nothing else comes close.

The open-source alternative here is DeepSeek R1, which hits 94/100 in math at $0.55/$2.19 per million tokens. R1 is impressive for the price, but GPT-5.4 Thinking pulls ahead on reasoning breadth and produces more polished outputs. If you're doing AIME-level problems professionally, the cost premium is justified.

**When to pick something else:** For anything that isn't genuinely difficult reasoning, use the base GPT-5.4 with lower reasoning effort -- it's faster and cheaper in practice because it emits fewer reasoning tokens. For coding specifically, Claude Opus 4.6 is still the stronger pick in this dataset. Don't use Thinking mode for writing tasks; its 85/100 writing score reflects the fact that reasoning optimization comes at the expense of prose quality.
