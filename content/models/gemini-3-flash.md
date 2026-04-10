---
title: "Gemini 3 Flash"
type: model
id: "gemini-3-flash"
provider: "Google"
model_type: "proprietary"
release_date: "2025-12"
description: "Google's fast, cost-efficient model replacing Gemini 2.5 Flash. Designed for high-throughput applications with up to 1M token context at an extremely low price."
last_updated: "2026-04-10"
context_window: "1M tokens"
website: "https://deepmind.google"
license: "Proprietary"
modality:
- "text"
- "image"
- "video"
- "audio"
tags:
- "google"
- "proprietary"
- "text"
- "image"
- "video"
- "audio"
pricing:
  input: "$0.15 / 1M tokens"
  output: "$0.60 / 1M tokens"
  note: "Free tier available"
benchmarks:
  reasoning: 82
  coding: 80
  math: 79
  writing: 83
  multilingual: 85
  speed: 95
best_for:
- "High-volume tasks"
- "Cost-sensitive applications"
- "Quick queries"
- "Prototyping"
---

# Gemini 3 Flash

The cheapest way to run a competent model at scale. At $0.15/$0.60 per million tokens with a free tier on top, Gemini 3 Flash costs roughly one-tenth of what Claude Haiku charges -- and it comes with a 1M token context window that Haiku's 200K can't touch.

Flash is not a frontier model and doesn't pretend to be. An 82/100 reasoning score and 80/100 coding score are adequate for classification, summarization, extraction, and simple Q&A. The 95/100 speed score means responses come back almost instantly. For high-throughput pipelines where you're processing thousands of documents, Flash is the model that makes the economics work.

The multilingual score of 85/100 is surprisingly good for a budget model, beating Haiku (80) and several more expensive options. Native multimodal support across text, image, video, and audio -- inherited from the Gemini architecture -- means Flash punches above its weight on media processing tasks.

**When to pick something else:** The moment you need reliable reasoning on complex prompts, step up to Gemini 3.1 Pro or Claude Sonnet 4.6. Flash's coding score of 80 means it'll struggle with non-trivial programming tasks. For anything mission-critical, the savings aren't worth the quality gap.
