---
title: "DeepSeek R1"
type: model
id: "deepseek-r1"
provider: "DeepSeek"
model_type: "open-source"
release_date: "2025-01"
description: "Powerful open-source reasoning model that exceeds OpenAI o1 on AIME and MATH benchmarks. Transparent chain-of-thought reasoning at extremely low cost. MIT license. Updated with R1-0528 in May 2025."
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
  input: "$0.55 / 1M tokens"
  output: "$2.19 / 1M tokens"
  note: "Also available open-source (MIT)"
benchmarks:
  reasoning: 92
  coding: 88
  math: 94
  writing: 72
  multilingual: 70
  speed: 55
parameters: "671B total (37B active)"
hardware_requirements: "8x A100 80GB (FP16); 2x A100 with Q4 quantization"
best_for:
- "Mathematical reasoning"
- "Code generation"
- "Scientific analysis"
- "Budget-conscious deployment"
---

# DeepSeek R1

The open-source reasoning model that changed the game. DeepSeek R1 beat OpenAI's o1 on AIME and MATH benchmarks, scoring 94/100 in math -- and it does it under an MIT license at $0.55/$2.19 per million tokens. That's roughly 5% of what GPT-5.4 Thinking costs for math performance that's in the same conversation.

R1's transparent chain-of-thought is both a feature and a constraint. You can see exactly how the model reasons through a problem, which is invaluable for education, research, and debugging. But the thinking process is slow (55/100 speed) and the outputs are less refined than what you get from proprietary models. The R1-0528 update improved stability, but this is still a model optimized for getting the right answer, not for presenting it beautifully.

The profile is extremely spiky. Math (94) and reasoning (92) are near-frontier. Writing (72) and multilingual (70) are genuinely weak. R1 will solve a differential equation better than most proprietary models, then produce a mediocre summary of its own solution. Self-hosting requires the same 8x A100 setup as V3.2, or you can use the API and let DeepSeek handle infrastructure.

**When to pick something else:** For anything involving writing, conversation, or multilingual work, use literally any other model on this list. For the absolute ceiling on reasoning, GPT-5.4 Thinking (98/100) still leads, though at 20x the cost. For general-purpose coding and reasoning without the writing penalty, DeepSeek V3.2 is the more balanced sibling.
