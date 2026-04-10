---
title: "MiniMax M2.7"
type: model
id: "minimax-m2.7"
provider: "MiniMax"
model_type: "open-source"
release_date: "2026-03"
description: "Third iteration of MiniMax's M2 line with tighter factual accuracy and lower cost. Intelligence index of 49.62 places it near frontier models at a fraction of the price. Open weights."
last_updated: "2026-04-10"
context_window: "128K tokens"
website: "https://minimax.io"
license: "Modified MIT"
modality:
- "text"
tags:
- "minimax"
- "open-source"
- "text"
pricing:
  input: "$0.53 / 1M tokens"
  output: "$0.53 / 1M tokens"
  free: true
  note: "Also free self-hosted"
benchmarks:
  reasoning: 90
  coding: 95
  math: 88
  writing: 82
  multilingual: 83
  speed: 85
parameters: "MoE (undisclosed active/total)"
hardware_requirements: "Multi-GPU setup recommended"
best_for:
- "Autonomous coding"
- "Cost-effective deployment"
- "Agentic workflows"
- "Enterprise automation"
---

# MiniMax M2.7

The open-source coding sleeper hit. MiniMax M2.7 posts a 95/100 coding score -- higher than every model on this list except Claude Opus 4.6 (97) -- at $0.53 per million tokens for both input and output. That's not a typo. You get near-Opus coding performance for roughly one-tenth of one percent of Opus's output cost.

The intelligence index of 49.62 puts M2.7 in the neighborhood of models costing 10-50x more. Reasoning at 90/100 is strong, and the speed score of 85/100 means it's fast enough for interactive use and agentic workflows. The open weights make self-hosting free if you have the multi-GPU hardware. For autonomous coding agents that need to make many API calls, the economics are transformative.

The gaps are in polish and ecosystem. Writing at 82/100 is below average for this tier. Multilingual at 83/100 is adequate but unremarkable. MiniMax is far less established outside China, the documentation skews Chinese-first, and the Modified MIT license adds wrinkles that pure MIT or Apache 2.0 don't have. You won't find the community tooling or enterprise support that surrounds Llama or the proprietary providers.

**When to pick something else:** For writing-heavy tasks, Claude Sonnet 4.6 or GPT-5.4 are clearly better. For a more established open-source ecosystem, Llama 4 Maverick or Qwen 3 have larger communities. For European compliance, Mistral 3 is the safer bet. But if your primary workload is code generation and cost matters, M2.7 offers a price-to-performance ratio that nothing else in the market can match.
