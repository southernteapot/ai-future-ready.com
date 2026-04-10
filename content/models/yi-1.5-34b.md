---
title: "Yi-1.5 34B"
type: model
id: "yi-1.5-34b"
provider: "01.AI"
model_type: "open-source"
release_date: "2025"
description: "Strong bilingual (English/Chinese) model from 01.AI that competes with much larger models on benchmarks. Excellent reasoning and code generation at a deployable 34B size. Apache 2.0 license."
last_updated: "2026-04-10"
context_window: "32K tokens"
website: "https://01.ai"
license: "Apache 2.0"
modality:
- "text"
tags:
- "01.ai"
- "open-source"
- "text"
pricing:
  input: "Free (Apache 2.0)"
  output: "Free (Apache 2.0)"
  free: true
benchmarks:
  reasoning: 80
  coding: 79
  math: 78
  writing: 80
  multilingual: 82
  speed: 85
parameters: "34B (also 6B, 9B variants)"
hardware_requirements: "1x RTX 4090 24GB (Q4); 1x A100 40GB (FP16)"
best_for:
- "Bilingual EN/CN applications"
- "Cost-effective self-hosting"
- "Fine-tuning"
- "Research"
---

# Yi-1.5 34B

A quietly excellent bilingual model that punches above its weight. Yi-1.5 34B delivers benchmark scores in the 78-82 range across the board on a single RTX 4090, which is remarkable for a dense 34B model. If your workload is English/Chinese and you want Apache 2.0 licensing on consumer hardware, this is the most cost-effective option.

The scores are evenly distributed -- reasoning 80, coding 79, math 78, writing 80, multilingual 82 -- with no dramatic peaks or valleys. Speed at 85/100 is strong for its size. The 32K context window is the main limitation in a world where 128K is becoming standard, but for most real-world tasks 32K is sufficient.

Self-hosting is straightforward: an RTX 4090 handles Q4 quantization, or a single A100 40GB runs FP16. The 6B and 9B variants scale down further for lighter deployments. Apache 2.0 means no commercial restrictions. The fine-tuning community is smaller than Llama or Qwen, but the model responds well to LoRA and full fine-tuning for domain-specific tasks.

The catch is that Yi-1.5 is showing its age. Released in 2025, it predates the current generation of MoE models that deliver more capability per compute dollar. Text-only -- no multimodal support -- further limits its use cases.

**When to pick something else:** Gemma 4's 26B MoE variant offers better benchmarks with multimodal support at similar hardware requirements. For English/Chinese specifically, Qwen 3.5's smaller variants dominate. Yi-1.5 remains relevant mainly for teams already invested in the Yi ecosystem or needing a proven, stable base for fine-tuning.
