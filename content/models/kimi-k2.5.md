---
title: "Kimi K2.5"
type: model
id: "kimi-k2.5"
provider: "Moonshot AI"
model_type: "open-source"
api_model_id: "moonshotai/Kimi-K2.5"
release_date: "2025"
description: "Open multimodal agentic model from Moonshot AI achieving 96% on AIME 2025, outperforming most proprietary models on math. Strong reasoning and mathematical capabilities."
last_updated: "2026-04-30"
last_verified: "2026-04-30"
availability_status: "available"
deprecated: false
tool_schema_format: "openai-compatible"
pricing_confidence: "low"
model_listing_confidence: "high"
benchmark_confidence: "medium"
context_window: "128K tokens"
website: "https://www.moonshot.cn"
license: "Modified MIT"
modality:
- "text"
- "image"
tags:
- "moonshot ai"
- "open-source"
- "text"
- "image"
pricing:
  input: "Free (self-hosted)"
  output: "Free (self-hosted)"
  free: true
  note: "Kimi API available"
benchmarks:
  reasoning: 93
  coding: 85
  math: 97
  writing: 78
  multilingual: 80
  speed: 72
capabilities:
- "function_calling"
- "vision"
- "structured_output"
- "streaming"
- "tool_search"
- "long_context"
- "reasoning"
sources:
- title: "Kimi K2.5 model card"
  url: "https://huggingface.co/moonshotai/Kimi-K2.5"
- title: "Kimi K2.5 NVIDIA NIM model card"
  url: "https://build.nvidia.com/moonshotai/kimi-k2.5/modelcard"
benchmark_sources:
- title: "AI Future Ready benchmark methodology"
  url: "https://ai-future-ready.com/guides/benchmark-methodology"
parameters: "MoE (undisclosed)"
hardware_requirements: "Multi-GPU setup required"
best_for:
- "Mathematical reasoning"
- "STEM applications"
- "Scientific computing"
- "Education"
---

# Kimi K2.5

The math benchmark destroyer. Kimi K2.5 scores 97/100 on math and 96% on AIME 2025, numbers that beat most proprietary models including several that cost orders of magnitude more to run. Moonshot AI built a model that is absurdly specialized and absurdly good at that specialty.

Reasoning at 93/100 is genuinely impressive, and coding at 85 is solid enough for STEM workflows. But the drop-off is telling: writing sits at 78, multilingual at 80, and speed at 72. This is not a general-purpose model. It is a reasoning engine that happens to generate text.

The MoE architecture with undisclosed parameter counts and a "multi-GPU setup required" hardware spec make self-hosting opaque. Moonshot keeps the exact architecture close to the chest, which is unusual for an MIT-licensed model. The Kimi API is available if you prefer not to guess at infrastructure requirements.

For STEM education, scientific computing, and any pipeline where mathematical accuracy is the bottleneck, K2.5 is the open-source answer. It outperforms DeepSeek R1 on pure math while matching it on reasoning, and it does so under a permissive MIT license.

**When to pick something else:** For anything involving prose, creative output, or general assistant tasks, K2.5 is the wrong tool. Qwen 3.5 or GLM-5 give you stronger all-around capability. If you need math reasoning on consumer hardware, Nemotron-Cascade 2 gets surprisingly close at a fraction of the compute.
