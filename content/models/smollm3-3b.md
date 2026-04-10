---
title: "SmolLM3 3B"
type: model
id: "smollm3-3b"
provider: "Hugging Face"
model_type: "open-source"
release_date: "2026"
description: "Fully open instruct and reasoning model with unprecedented transparency — Hugging Face published the complete engineering blueprint. Outperforms Llama-3.2-3B and Qwen2.5-3B at the 3B scale."
last_updated: "2026-04-10"
context_window: "32K tokens"
website: "https://huggingface.co/HuggingFaceTB/SmolLM3-3B"
license: "Apache 2.0"
modality:
- "text"
tags:
- "hugging face"
- "open-source"
- "text"
pricing:
  input: "Free (Apache 2.0)"
  output: "Free (Apache 2.0)"
  free: true
benchmarks:
  reasoning: 68
  coding: 70
  math: 66
  writing: 70
  multilingual: 65
  speed: 96
parameters: "3B"
hardware_requirements: "2GB VRAM; runs on Raspberry Pi"
best_for:
- "Research"
- "Transparency-focused projects"
- "Education"
- "Lightweight deployment"
---

# SmolLM3 3B

The most transparent model ever released. Hugging Face did not just open-source the weights -- they published the complete engineering blueprint: training data, recipes, intermediate checkpoints, and every decision that shaped the model. For researchers studying how language models actually work, nothing else comes close.

At 3B parameters, SmolLM3 outperforms both Llama-3.2-3B and Qwen2.5-3B at the same scale, with coding at 70 and writing at 70 leading its benchmark profile. Speed at 96/100 is near-maximum, and the 2GB VRAM requirement means it runs on a Raspberry Pi. Literally.

The benchmarks are modest in absolute terms -- reasoning 68, math 66, multilingual 65 -- because 3B parameters can only do so much. But the coding score of 70 is surprisingly useful for lightweight code completion and scripting assistance. The model punches above its weight where Hugging Face's training data curation shines.

Apache 2.0 licensing and Hugging Face's native integration mean SmolLM3 is trivially easy to deploy, fine-tune, and study. It is the default choice for anyone teaching a course on LLMs or building a research project that needs full reproducibility.

**When to pick something else:** For any production workload where quality matters, step up to Mistral Small 3 (24B) or Gemma 4's MoE variant. For multilingual edge deployment, Cohere Tiny Aya beats SmolLM3 handily at 85 vs 65 on multilingual despite being nearly the same size. SmolLM3 is for research and learning first, deployment second.
