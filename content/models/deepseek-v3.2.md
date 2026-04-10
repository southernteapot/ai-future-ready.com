---
title: "DeepSeek V3.2"
type: model
id: "deepseek-v3.2"
provider: "DeepSeek"
model_type: "open-source"
release_date: "2025-09"
description: "On par with GPT-5.1 and Gemini 3.0 Pro on benchmarks. Uses sparse attention for efficiency. MIT license. Dramatically cheaper than Western alternatives."
last_updated: "2026-04-10"
context_window: "128K tokens"
website: "https://deepseek.com"
license: "MIT"
modality:
- "text"
tags:
- "deepseek"
- "open-source"
- "text"
pricing:
  input: "$0.27 / 1M tokens"
  output: "$1.10 / 1M tokens"
  free: true
  note: "MIT license for self-hosting"
benchmarks:
  reasoning: 88
  coding: 88
  math: 87
  writing: 84
  multilingual: 80
  speed: 82
parameters: "671B total (37B active)"
hardware_requirements: "8x A100 80GB (FP16); 2x A100 with Q4 quantization"
best_for:
- "Cost-effective AI"
- "General-purpose tasks"
- "Self-hosting"
- "API-based applications"
---

# DeepSeek V3.2

The model that proved frontier quality doesn't require frontier pricing. At $0.27/$1.10 per million tokens, DeepSeek V3.2 costs roughly 5% of what GPT-5.4 charges -- and with 88/100 on both reasoning and coding, the quality gap is far smaller than the price gap suggests. The MIT license means you can self-host with zero licensing concerns.

V3.2 uses sparse attention across its 671B parameter MoE architecture (37B active) to keep inference fast. The 82/100 speed score is respectable, and the model's efficiency makes it one of the most cost-effective options for self-hosting if you have the hardware (8x A100 for FP16, or 2x A100 quantized). For API users who don't want to manage infrastructure, DeepSeek's hosted API is already one of the cheapest in the market.

The weaknesses are real but narrow. Safety guardrails are less polished than what you get from Anthropic or OpenAI. Writing quality at 84/100 is functional but won't win any style awards. The 128K context window is adequate but a quarter of what Claude, GPT-5.4, and Gemini offer. And the ecosystem -- tooling, community libraries, enterprise support -- is thinner than Llama's or the major proprietary platforms.

**When to pick something else:** If you need the absolute best coding model, Claude Opus 4.6 justifies the premium. For creative writing, Claude or GPT-5.4 produce noticeably better prose. For maximum open-source community support, Llama 4 Maverick has a larger ecosystem. But for general-purpose AI at the lowest cost, V3.2 is the rational choice.
