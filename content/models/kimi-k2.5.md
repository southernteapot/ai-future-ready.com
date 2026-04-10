---
title: "Kimi K2.5"
type: model
id: "kimi-k2.5"
provider: "Moonshot AI"
model_type: "open-source"
release_date: "2025"
description: "Chinese AI model achieving 96% on AIME 2025, outperforming most proprietary models on math. Strong reasoning and mathematical capabilities."
last_updated: "2026-04-10"
context_window: "128K tokens"
website: "https://www.moonshot.cn"
license: "MIT"
modality:
- "text"
tags:
- "moonshot ai"
- "open-source"
- "text"
pricing:
  input: "Free (self-hosted)"
  output: "Free (self-hosted)"
  free: true
  note: "Kimi API available"
benchmarks:
  reasoning: 93
  coding: 85
  math: 97
  writing: 78
  multilingual: 80
  speed: 72
parameters: "MoE (undisclosed)"
hardware_requirements: "Multi-GPU setup required"
best_for:
- "Mathematical reasoning"
- "STEM applications"
- "Scientific computing"
- "Education"
---

# Kimi K2.5

The math benchmark destroyer. Kimi K2.5 scores 97/100 on math and 96% on AIME 2025, numbers that beat most proprietary models including several that cost orders of magnitude more to run. Moonshot AI built a model that is absurdly specialized and absurdly good at that specialty.

Reasoning at 93/100 is genuinely impressive, and coding at 85 is solid enough for STEM workflows. But the drop-off is telling: writing sits at 78, multilingual at 80, and speed at 72. This is not a general-purpose model. It is a reasoning engine that happens to generate text.

The MoE architecture with undisclosed parameter counts and a "multi-GPU setup required" hardware spec make self-hosting opaque. Moonshot keeps the exact architecture close to the chest, which is unusual for an MIT-licensed model. The Kimi API is available if you prefer not to guess at infrastructure requirements.

For STEM education, scientific computing, and any pipeline where mathematical accuracy is the bottleneck, K2.5 is the open-source answer. It outperforms DeepSeek R1 on pure math while matching it on reasoning, and it does so under a permissive MIT license.

**When to pick something else:** For anything involving prose, creative output, or general assistant tasks, K2.5 is the wrong tool. Qwen 3.5 or GLM-5 give you stronger all-around capability. If you need math reasoning on consumer hardware, Nemotron-Cascade 2 gets surprisingly close at a fraction of the compute.
