---
title: "Mistral Small 4"
type: model
id: "mistral-small-4"
provider: "Mistral AI"
model_type: "open-source"
api_model_id: "mistral-small-2603"
release_date: "2026-03"
description: "Efficient MoE model with 119B total parameters but only 6.5B active — the knowledge capacity of a large model at the inference cost of a small one. Multimodal with hybrid reasoning. Apache 2.0 license."
last_updated: "2026-04-30"
last_verified: "2026-04-30"
availability_status: "available"
deprecated: false
tool_schema_format: "mistral"
pricing_confidence: "high"
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
  input: "$0.15 / 1M tokens"
  output: "$0.60 / 1M tokens"
  input_per_1m: 0.15
  output_per_1m: 0.6
  currency: "USD"
  free: true
  note: "Also available as Apache 2.0 open weights."
benchmarks:
  reasoning: 76
  coding: 78
  math: 74
  writing: 78
  multilingual: 86
  speed: 92
capabilities:
- "function_calling"
- "vision"
- "structured_output"
- "streaming"
- "tool_search"
- "long_context"
- "reasoning"
sources:
- title: "Mistral Small 4 model card"
  url: "https://docs.mistral.ai/models/mistral-small-4-0-26-03"
- title: "Mistral Small 4 lifecycle documentation"
  url: "https://legal.mistral.ai/ai-governance/models/mistral-small-4"
benchmark_sources:
- title: "AI Future Ready benchmark methodology"
  url: "https://ai-future-ready.com/guides/benchmark-methodology"
parameters: "119B total (6.5B active)"
hardware_requirements: "8GB VRAM (Q4, 6.5B active); fits on consumer GPUs"
best_for:
- "Efficient self-hosting"
- "European compliance"
- "Real-time applications"
- "Multimodal tasks"
---

# Mistral Small 4

The model that puts 119B of knowledge into 8GB of VRAM. Mistral Small 4 is an MoE architecture that activates only 6.5B parameters per token, giving you the knowledge depth of a large model at the inference cost of a tiny one. Speed at 92/100 and multimodal capability (text + image) on consumer hardware -- this is what efficient AI deployment looks like.

Benchmark scores are honestly lower than its predecessor Mistral Small 3 in absolute terms (reasoning 76 vs 79, math 74 vs 77), which seems counterintuitive for a newer model. The explanation: Mistral Small 4 trades peak single-task accuracy for dramatically better efficiency and multimodal capability. The multilingual score actually improved to 86, and you gain image understanding that Small 3 lacks entirely.

The hybrid reasoning capability lets the model switch between fast responses and deeper thinking on harder queries. Combined with 256K context and Apache 2.0 licensing, this is Mistral's answer to the European compliance question: full-featured AI that runs on hardware you already have, in a data center you already control.

The Mistral API is available if you prefer managed hosting, but the self-hosting story is the selling point. An 8GB consumer GPU running a model with 119B total parameters was not possible a year ago.

**When to pick something else:** If benchmark scores matter more than efficiency, Mistral Small 3 at 24B actually scores higher on most tasks -- it just needs double the VRAM. For the best MoE efficiency at higher capability, Gemma 4's 26B MoE (3.8B active) offers better benchmarks. For serious reasoning or coding, step up to Qwen 3.5 or GLM-5.
