---
title: "Phi-4"
type: model
id: "phi-4"
provider: "Microsoft"
model_type: "open-source"
release_date: "2025"
description: "Microsoft's small-but-capable model using state-of-the-art training techniques and high-quality data. Punches well above its weight class despite small parameter count."
last_updated: "2026-04-10"
context_window: "16K tokens"
website: "https://azure.microsoft.com/en-us/products/phi"
license: "MIT"
modality:
- "text"
tags:
- "microsoft"
- "open-source"
- "text"
pricing:
  input: "Free (open weights)"
  output: "Free (open weights)"
  free: true
  note: "MIT license"
benchmarks:
  reasoning: 78
  coding: 80
  math: 79
  writing: 77
  multilingual: 72
  speed: 92
parameters: "14B"
hardware_requirements: "8GB VRAM (Q4); 12GB VRAM (FP16)"
best_for:
- "Resource-constrained environments"
- "Learning"
- "Prototyping"
- "Edge deployment"
---

# Phi-4

Microsoft's proof that training data quality can beat parameter count. At just 14B parameters, Phi-4 scores 80 on coding and 79 on math -- numbers that models three times its size struggled to reach a generation ago. It runs on 8GB of VRAM with Q4 quantization, meaning virtually any modern GPU can handle it.

The speed score of 92/100 is the practical payoff. Phi-4 is fast enough for real-time applications where latency matters more than peak intelligence. Reasoning at 78 and writing at 77 are respectable for the size class. The weak point is multilingual at 72 -- Microsoft clearly optimized for English-first workloads.

The 16K context window is the hard constraint. In a landscape where 128K is common and 256K is appearing, 16K limits Phi-4 to shorter documents and conversations. This is fine for code completion, chat prototyping, and educational use, but rules it out for document-heavy enterprise workflows.

MIT license and Microsoft backing give it strong institutional credibility. The model is a favorite for learning and experimentation -- small enough to iterate quickly, capable enough to produce useful results. Azure integration is seamless if you are in that ecosystem.

**When to pick something else:** Gemma 4 E4B offers multimodal capability at a similar size with a much larger context window. Mistral Small 3 at 24B gives substantially better benchmarks while still fitting on a single RTX 4090. Phi-4 is best as a prototyping tool or when 8GB VRAM is genuinely all you have.
