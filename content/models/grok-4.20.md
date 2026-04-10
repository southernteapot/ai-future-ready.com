---
title: "Grok 4.20"
type: model
id: "grok-4.20"
provider: "xAI"
model_type: "proprietary"
release_date: "2026-03"
description: "xAI's latest flagship with the lowest hallucination rate of any model (78% Omniscience) and #1 instruction following (83% IFBench). Features a novel multi-agent architecture and 2M token context window. 248 tokens/second output speed."
last_updated: "2026-04-10"
context_window: "2M tokens"
website: "https://x.ai"
license: "Proprietary"
modality:
- "text"
- "image"
tags:
- "xai"
- "proprietary"
- "text"
- "image"
pricing:
  input: "$2.00 / 1M tokens"
  output: "$6.00 / 1M tokens"
  note: "Fast tier; Standard tier $20/$60"
benchmarks:
  reasoning: 85
  coding: 88
  math: 83
  writing: 87
  multilingual: 82
  speed: 90
best_for:
- "Factual accuracy"
- "Legal/medical/financial AI"
- "Agentic workflows"
- "Instruction following"
---

# Grok 4.20

The most factually accurate model available. With 78% on Omniscience and the #1 spot on IFBench (83%), Grok 4.20 is purpose-built for use cases where hallucinations are unacceptable -- legal research, medical summarization, financial analysis. If your failure mode is "the model confidently made something up," this is where you look.

The 2M token context window is the largest among proprietary models, and at 248 tokens/second it's fast enough for interactive use. The multi-agent architecture lets you run parallel workflows, which is a meaningful differentiator for complex agentic tasks. The fast tier pricing of $2/$6 per million tokens is surprisingly affordable.

The tradeoff is raw intelligence. An 85/100 reasoning score and 83/100 math score put Grok 4.20 well behind GPT-5.4 (95/95), Claude Opus 4.6 (96/93), and even Gemini 3.1 Pro (93/92) on traditional benchmarks. The standard tier at $20/$60 is steep. This is a model optimized for reliability over brilliance -- it won't solve your hardest problems, but it's less likely to make things up while trying.

**When to pick something else:** For complex reasoning, coding, or math, almost any frontier model outperforms Grok 4.20 on those axes. Claude Opus 4.6 or GPT-5.4 are better general-purpose choices. Reach for Grok 4.20 specifically when factual accuracy and instruction following are your top priorities, and you can live with less raw reasoning power.
