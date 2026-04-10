---
title: "Mistral Small 3 24B"
type: model
id: "mistral-small-3"
provider: "Mistral AI"
model_type: "open-source"
release_date: "2025"
description: "Efficient 24B model that competes with models 2-3x its size. Apache 2.0 license. Strong for real-time applications."
last_updated: "2026-04-10"
context_window: "128K tokens"
website: "https://mistral.ai"
license: "Apache 2.0"
modality:
- "text"
tags:
- "mistral ai"
- "open-source"
- "text"
pricing:
  input: "Free (Apache 2.0)"
  output: "Free (Apache 2.0)"
  free: true
benchmarks:
  reasoning: 79
  coding: 80
  math: 77
  writing: 80
  multilingual: 85
  speed: 90
parameters: "24B"
hardware_requirements: "16GB VRAM (FP16); 1x RTX 4090 with Q4"
best_for:
- "Real-time applications"
- "Cost-effective deployment"
- "European compliance"
- "Edge serving"
---

# Mistral Small 3 24B

The sweet spot for self-hosted production. Mistral Small 3 delivers scores of 79-85 across every benchmark category while running on 16GB of VRAM at FP16 -- that is a single RTX 4090 or even an RTX 4080. For teams that need a real-time, self-hosted model that actually works in production, this hits the price-performance bullseye.

The multilingual score of 85 is the standout, reflecting Mistral AI's European roots and intentional focus on French, German, Spanish, and other EU languages. Coding at 80 and writing at 80 are both solid. Speed at 90/100 means sub-second responses for most queries. The 128K context window handles long documents without the compromises you accept with smaller models.

Apache 2.0 licensing and a Paris-based company make this the default choice for European enterprises navigating GDPR and AI Act compliance. Running the model on your own infrastructure, in your own data center, with no data leaving the EU -- Mistral Small 3 was designed for exactly that use case.

At 24B dense parameters, it is less efficient per-token than the newer MoE models, but the simplicity of a dense architecture has deployment advantages: predictable memory usage, no routing overhead, and battle-tested inference tooling.

**When to pick something else:** Mistral Small 4 is the direct successor with an MoE architecture that fits in 8GB of VRAM -- if your hardware is truly constrained, it is the upgrade path. For maximum multilingual coverage, Qwen 3.5 at 201 languages is in another league. For harder reasoning tasks, step up to a larger model entirely.
