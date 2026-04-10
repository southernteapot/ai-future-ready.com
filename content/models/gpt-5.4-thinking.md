---
title: "GPT-5.4 Thinking"
type: model
id: "gpt-5.4-thinking"
provider: "OpenAI"
model_type: "proprietary"
release_date: "2026-03"
description: "Extended thinking mode of GPT-5.4 for the hardest problems. Uses chain-of-thought reasoning for math, science, and complex analysis. Successor to the o1/o3 reasoning line."
last_updated: "2026-04-10"
context_window: "256K tokens"
website: "https://openai.com"
license: "Proprietary"
modality:
- "text"
- "image"
- "audio"
tags:
- "openai"
- "proprietary"
- "text"
- "image"
- "audio"
pricing:
  input: "$10.00 / 1M tokens"
  output: "$40.00 / 1M tokens"
benchmarks:
  reasoning: 98
  coding: 93
  math: 97
  writing: 85
  multilingual: 88
  speed: 45
best_for:
- "Advanced math"
- "Scientific reasoning"
- "Complex problem solving"
- "Competition-level coding"
---

# GPT-5.4 Thinking

The highest-reasoning model you can buy from any provider. With a 98/100 reasoning score and 97/100 in math, GPT-5.4 Thinking is the successor to the o1/o3 line and it shows -- 80% fewer hallucinations than o3 while being substantially more capable.

This is a specialist. You pay $10/$40 per million tokens (double to quadruple the base GPT-5.4 rate) and you get a model that thinks slowly and deliberately. The 256K context window is a quarter of what the base model offers, and the speed score of 45/100 means you'll be waiting. That's the tradeoff: when the problem is genuinely hard -- competition math, multi-step scientific reasoning, formal proofs -- nothing else comes close.

The open-source alternative here is DeepSeek R1, which hits 94/100 in math at $0.55/$2.19 per million tokens. R1 is impressive for the price, but GPT-5.4 Thinking pulls ahead on reasoning breadth and produces more polished outputs. If you're doing AIME-level problems professionally, the cost premium is justified.

**When to pick something else:** For anything that isn't genuinely difficult reasoning, use the base GPT-5.4 -- it's faster, cheaper, and has a larger context window. For coding specifically, Claude Opus 4.6 outperforms this model while costing less. Don't use Thinking mode for writing tasks; its 85/100 writing score reflects the fact that chain-of-thought optimization comes at the expense of prose quality.
