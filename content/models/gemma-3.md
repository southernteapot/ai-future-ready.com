---
title: "Gemma 3"
type: model
id: "gemma-3"
provider: "Google"
model_type: "open-source"
release_date: "2025"
description: "Google's open model family optimized for on-device and edge deployment. Multimodal from 4B parameters. Sizes from 1B to 27B."
last_updated: "2026-04-10"
context_window: "128K tokens"
website: "https://ai.google.dev/gemma"
license: "Gemma Terms of Use"
modality:
- "text"
- "image"
tags:
- "google"
- "open-source"
- "text"
- "image"
pricing:
  input: "Free (open weights)"
  output: "Free (open weights)"
  free: true
benchmarks:
  reasoning: 75
  coding: 73
  math: 72
  writing: 76
  multilingual: 78
  speed: 93
parameters: "1B to 27B variants"
hardware_requirements: "27B: 16GB VRAM; 4B: runs on phones; 1B: runs on embedded devices"
best_for:
- "On-device AI"
- "Mobile apps"
- "Edge deployment"
- "IoT"
- "Low-resource environments"
---

# Gemma 3

The model that made on-device AI real. Gemma 3 brought multimodal capability down to 4B parameters -- small enough to run on a phone -- while the 1B variant fits on embedded devices. Google optimized these models for the edge first and benchmarks second, and it shows: speed at 93/100 is near the top of anything in our rankings.

The benchmark scores are honest about what you get at this size. Reasoning at 75, coding at 73, math at 72 -- none of these compete with the big MoE models. But that is not the point. The point is that you get a multimodal model with 128K context that runs on 16GB of VRAM at the largest (27B) variant, or on a phone at 4B. No API calls, no latency, no data leaving the device.

Compared to Phi-4 at a similar size class, Gemma 3 trades slightly lower coding scores for better multilingual support (78 vs 72) and native multimodal capability that Phi-4 lacks entirely. The Gemma Terms of Use license is more restrictive than Apache 2.0 but still allows commercial use.

With Gemma 4 now released, Gemma 3 is the previous generation. It remains relevant for deployments where the newer model's hardware requirements are too high, particularly the 1B and 4B tiers that Gemma 4 does not fully replace.

**When to pick something else:** Gemma 4 is strictly better if your hardware supports it. For a small model that prioritizes coding, Phi-4 edges ahead. For multilingual edge deployment, Cohere Tiny Aya covers 70+ languages at a similar size.
