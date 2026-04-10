---
title: "Claude Haiku 4.5"
type: model
id: "claude-haiku-4.5"
provider: "Anthropic"
model_type: "proprietary"
release_date: "2025-11"
description: "Anthropic's fastest and most cost-efficient model. Matches Claude Sonnet 4's performance on coding and agent tasks while being dramatically faster and cheaper."
last_updated: "2026-04-10"
context_window: "200K tokens"
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
  input: "$1.00 / 1M tokens"
  output: "$5.00 / 1M tokens"
benchmarks:
  reasoning: 82
  coding: 84
  math: 80
  writing: 83
  multilingual: 80
  speed: 95
best_for:
- "High-volume tasks"
- "Quick queries"
- "Cost-sensitive applications"
- "Prototyping"
---

# Claude Haiku 4.5

The speed king of the Claude lineup. Haiku 4.5 matches what Sonnet 4 could do -- including coding and agentic tasks -- while being dramatically faster (95/100 speed) and costing just $1/$5 per million tokens. That's a previous-generation Sonnet at a fraction of the price.

For prototyping, classification, extraction, and high-volume pipelines, Haiku is the obvious choice. An 84/100 coding score means it handles routine programming tasks without issue. The 200K context window is smaller than the 1M offered by Sonnet and Opus, but for most real workloads you won't hit that ceiling.

The direct competitor is Gemini 3 Flash at $0.15/$0.60 -- significantly cheaper, with a 1M context window. Flash wins on price and context size, but Haiku edges it on coding (84 vs 80) and writing (83 vs 83). If you're in the Anthropic ecosystem and want the fastest Claude available, Haiku is the pick. If raw cost is the only metric, Flash is hard to beat.

**When to pick something else:** Anything requiring deep reasoning or nuanced multi-step analysis should go to Sonnet 4.6 or Opus 4.6. Haiku's 82/100 reasoning score is good but not frontier-class. For budget workloads where you don't need the Claude instruction-following style, Gemini 3 Flash saves you 85% on input costs.
