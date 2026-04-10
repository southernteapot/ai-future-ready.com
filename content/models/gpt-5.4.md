---
title: "GPT-5.4"
type: model
id: "gpt-5.4"
provider: "OpenAI"
model_type: "proprietary"
release_date: "2026-03"
description: "OpenAI's flagship model combining frontier reasoning, coding, and agentic capabilities. Unifies the best of GPT-5.3-Codex into a single model with 45% fewer hallucinations than GPT-4o."
last_updated: "2026-04-10"
context_window: "1M tokens"
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
  input: "$5.00 / 1M tokens"
  output: "$15.00 / 1M tokens"
  note: "Pricing varies by variant"
benchmarks:
  reasoning: 95
  coding: 92
  math: 95
  writing: 93
  multilingual: 90
  speed: 80
best_for:
- "Complex reasoning"
- "Coding"
- "Multimodal analysis"
- "Agentic workflows"
---

# GPT-5.4

OpenAI's everything model. GPT-5.4 merges the reasoning line and the coding line into a single endpoint, and the result is the most well-rounded proprietary model available. A 95/100 reasoning score and 94.6% AIME put it at or near the top of every general benchmark.

The real selling point is ecosystem. No other model has deeper integration with the tools people already use -- Microsoft 365, ChatGPT plugins, the Assistants API, and a sprawling third-party landscape. If you're building on OpenAI's platform, staying on GPT-5.4 is the path of least resistance. The 1M context window now matches Claude and Gemini, removing what used to be a disadvantage.

Where it trails: coding. At 74.9% SWE-bench, it's solid but clearly behind Claude Opus 4.6's 80.8%. The 45% hallucination reduction over GPT-4o sounds impressive until you compare it to Grok 4.20's industry-leading factual accuracy. And at $5/$15 per million tokens, it's not cheap -- Gemini 3.1 Pro delivers comparable reasoning at $2/$12.

**When to pick something else:** For pure coding dominance, Claude Opus 4.6 is the better call. For budget-conscious work that doesn't sacrifice much quality, Gemini 3.1 Pro or DeepSeek V3.2 undercut GPT-5.4 significantly. If you need extended thinking for competition-level math, use GPT-5.4 Thinking instead of burning tokens on the base model.
