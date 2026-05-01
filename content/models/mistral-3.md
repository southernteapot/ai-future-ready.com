---
title: "Mistral 3"
type: model
id: "mistral-3"
provider: "Mistral AI"
model_type: "open-source"
release_date: "2025-12"
description: "Mistral's flagship model suite with Apache 2.0 license. A European alternative focused on enterprise compliance, adopting a DeepSeek-style MoE architecture for efficiency."
last_updated: "2026-04-30"
last_verified: "2026-04-30"
availability_status: "available"
deprecated: false
tool_schema_format: "mistral"
pricing_confidence: "low"
model_listing_confidence: "high"
benchmark_confidence: "medium"
context_window: "256K tokens"
website: "https://mistral.ai"
license: "Apache 2.0"
modality:
- "text"
- "image"
tags:
- "mistral ai"
- "open-source"
- "text"
- "image"
pricing:
  input: "$2.00 / 1M tokens"
  output: "$6.00 / 1M tokens"
  input_per_1m: 2
  output_per_1m: 6
  currency: "USD"
benchmarks:
  reasoning: 86
  coding: 87
  math: 84
  writing: 86
  multilingual: 92
  speed: 78
capabilities:
- "function_calling"
- "vision"
- "structured_output"
- "streaming"
- "tool_search"
- "long_context"
- "reasoning"
sources:
- title: "Introducing Mistral 3"
  url: "https://mistral.ai/news/mistral-3"
- title: "Mistral models overview"
  url: "https://mistral.ai/models"
- title: "Mistral pricing"
  url: "https://mistral.ai/pricing"
benchmark_sources:
- title: "AI Future Ready benchmark methodology"
  url: "https://ai-future-ready.com/guides/benchmark-methodology"
parameters: "675B total (41B active)"
hardware_requirements: "8x A100 80GB (FP16); multi-GPU setup required"
best_for:
- "European compliance"
- "Multilingual applications"
- "Enterprise deployment"
- "Code generation"
---

# Mistral 3

The model you pick when European compliance isn't optional. Mistral 3 ships under Apache 2.0 from a Paris-based company, making it the cleanest open-source option for organizations navigating EU AI Act requirements and GDPR data sovereignty. The 92/100 multilingual score -- second only to Qwen 3 -- reflects genuine strength across European languages.

The DeepSeek-style MoE architecture (675B total, 41B active) keeps Mistral 3 efficient, and the benchmark profile is solid if unspectacular: 87/100 coding, 86/100 reasoning, 86/100 writing. Its 256K context window and multimodal support make it more capable than the older Mistral Small line for document and image-heavy workflows. Self-hosting requires a serious multi-GPU setup (8x A100), but the Apache 2.0 license gives you complete freedom in how you deploy.

The challenge is that Mistral 3 doesn't clearly lead in any single dimension except European compliance. DeepSeek V3.2 offers similar capability at a fraction of the API cost. Qwen 3 beats it on multilingual, math, and coding. Llama 4 Maverick has a far larger community. Mistral's ecosystem is growing but remains smaller than its competitors'.

**When to pick something else:** If European compliance isn't a factor, DeepSeek V3.2 delivers comparable quality at $0.28/$0.42 -- far cheaper via hosted API. For the strongest open-source coding, Qwen 3 (90/100) or MiniMax M2.7 (95/100) pull ahead. Mistral 3's value proposition is clearest for European enterprises that need a local, compliant, well-rounded model under a permissive license.
