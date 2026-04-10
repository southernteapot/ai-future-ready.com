---
title: "Qwen 3"
type: model
id: "qwen-3"
provider: "Alibaba"
model_type: "open-source"
release_date: "2025-06"
description: "Alibaba's flagship open model family. Overtook Llama as the most-downloaded model family on HuggingFace in late 2025. Hybrid reasoning with think/non-think modes. 119 languages supported."
last_updated: "2026-04-10"
context_window: "128K tokens"
website: "https://qwenlm.github.io"
license: "Apache 2.0"
modality:
- "text"
tags:
- "alibaba"
- "open-source"
- "text"
pricing:
  input: "Free (self-hosted)"
  output: "Free (self-hosted)"
  free: true
  note: "Also via Alibaba Cloud API"
benchmarks:
  reasoning: 88
  coding: 90
  math: 92
  writing: 82
  multilingual: 95
  speed: 80
parameters: "1T+ total (MoE, various active sizes)"
hardware_requirements: "Varies by variant; 0.6B runs on phones, 235B needs multi-GPU"
best_for:
- "Multilingual applications"
- "Math and coding"
- "Asian market deployment"
- "Research"
---

# Qwen 3

The most versatile open-source model family available. Qwen 3 overtook Llama as the most-downloaded family on HuggingFace, and the numbers explain why: 95/100 multilingual (119 languages), 92/100 math (92.3% AIME25), and 90/100 coding. No other open model covers this much ground this well.

The variant range is uniquely broad. The 0.6B model runs on phones. The 235B model rivals frontier proprietary offerings. The hybrid think/non-think reasoning mode lets you toggle between fast responses and deep chain-of-thought depending on the task -- a feature you otherwise only find in proprietary models. Qwen3-Coder-Next is a standout for code generation specifically. All under Apache 2.0, all free to self-host.

Against other open-source models, Qwen 3 wins on math and multilingual by wide margins. It beats Llama 4 Maverick on coding (90 vs 82), math (92 vs 84), and multilingual (95 vs 84). DeepSeek V3.2 matches on reasoning but trails on coding and multilingual. The main weakness is writing at 82/100 -- functional but behind both Llama (86) and Mistral (86).

**When to pick something else:** For English-focused writing tasks, Llama 4 Maverick or Mistral 3 produce better prose. For the largest Western community and ecosystem of tooling, Llama still wins. If you're deploying primarily in European markets with compliance requirements, Mistral 3 is the more natural fit. But for multilingual, math-heavy, or coding-heavy workloads in open source, Qwen 3 is the best option available.
