---
title: "Cohere Tiny Aya 3.35B"
type: model
id: "cohere-tiny-aya"
provider: "Cohere"
model_type: "open-source"
release_date: "2026-02"
description: "Multilingual specialist supporting 70+ languages at only 3.35B parameters. Designed for laptop and edge deployment. CC-BY-NC license."
last_updated: "2026-04-10"
context_window: "32K tokens"
website: "https://cohere.com"
license: "CC-BY-NC 4.0"
modality:
- "text"
tags:
- "cohere"
- "open-source"
- "text"
pricing:
  input: "Free (CC-BY-NC)"
  output: "Free (CC-BY-NC)"
  free: true
benchmarks:
  reasoning: 65
  coding: 62
  math: 60
  writing: 68
  multilingual: 85
  speed: 96
parameters: "3.35B"
hardware_requirements: "2GB VRAM; runs on laptops and edge devices"
best_for:
- "Multilingual edge deployment"
- "Developing regions"
- "Language preservation"
- "Research"
---

# Cohere Tiny Aya 3.35B

Seventy languages in 2GB of VRAM. Cohere Tiny Aya is the most linguistically capable model you can run on a laptop, and it is not even close. At 3.35B parameters, its multilingual score of 85/100 embarrasses models ten times its size that were trained primarily on English. For language preservation, developing-region deployment, and offline multilingual assistants, this is the only serious option at this scale.

The trade-off is stark: reasoning 65, coding 62, math 60. If your task is primarily English and involves code or math, Tiny Aya is the wrong model. Writing at 68 is adequate for conversational responses in its supported languages, and speed at 96/100 means interactions feel instant. It runs on edge devices and laptops with no GPU required.

Cohere built Aya from their multilingual research program, and the language coverage is not just a number -- these are genuinely functional languages, not tokenizer padding. For communities building tools in Yoruba, Bengali, Swahili, or dozens of other underserved languages, Tiny Aya is often the only model that works at all.

The CC-BY-NC 4.0 license is the catch. Non-commercial only, which blocks startups and commercial products from self-hosting. You can use it for research, education, and internal tools, but any revenue-generating deployment needs Cohere's commercial API.

**When to pick something else:** For commercial multilingual deployment, Qwen 3.5's smaller variants offer 201 languages under Apache 2.0. For English-focused edge tasks, SmolLM3 3B or Phi-4 are stronger. Tiny Aya's niche is narrow but uncontested: maximum language diversity at minimum compute.
