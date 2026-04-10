---
title: "Claude Sonnet 4.6"
type: model
id: "claude-sonnet-4.6"
provider: "Anthropic"
model_type: "proprietary"
release_date: "2026-02"
description: "The first Sonnet model preferred over a previous Opus in coding evaluations. Excellent balance of speed, quality, and cost with a full 1M token context window."
last_updated: "2026-04-10"
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
  input: "$3.00 / 1M tokens"
  output: "$15.00 / 1M tokens"
benchmarks:
  reasoning: 91
  coding: 93
  math: 89
  writing: 92
  multilingual: 87
  speed: 82
best_for:
- "Daily coding tasks"
- "Content creation"
- "General analysis"
- "Cost-effective quality"
---

# Claude Sonnet 4.6

The best daily-driver model in AI right now. Sonnet 4.6 is the first mid-tier model to beat a previous Opus in coding evaluations, and at $3/$15 per million tokens with a 1M context window, the value proposition is hard to argue with.

A 93/100 coding score puts Sonnet in striking distance of frontier models that cost two to three times as much. It's faster than Opus 4.6 (82 vs 62 speed score), and the writing quality at 92/100 means you're not sacrificing much for the speedup. For the vast majority of coding, analysis, and content work, Sonnet handles it without breaking a sweat.

Compared to GPT-5.4, Sonnet is cheaper on input ($3 vs $5) and matches on output ($15), while trading some reasoning headroom (91 vs 95). Against Gemini 3.1 Pro, Sonnet wins on coding and writing but costs more. The honest assessment: Sonnet 4.6 is the model you should default to unless you have a specific reason to reach for something else.

**When to pick something else:** When the task genuinely requires the last 5% of capability -- complex multi-file refactors, intricate reasoning chains -- upgrade to Opus 4.6. For high-volume, cost-sensitive workloads where quality can flex a bit, Haiku 4.5 at $1/$5 or Gemini 3 Flash at $0.15/$0.60 will save you serious money.
