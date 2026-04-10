---
title: "Nemotron 3 Super"
type: model
id: "nemotron-3-super"
provider: "NVIDIA"
model_type: "open-source"
release_date: "2026-03"
description: "NVIDIA's open-weight MoE model with 120B total parameters and 12B active. Designed to fit on hardware most companies already own. Serves as the anchor for NVIDIA's agent toolkit strategy, optimized for TensorRT-LLM and NIM."
last_updated: "2026-04-10"
context_window: "128K tokens"
website: "https://build.nvidia.com"
license: "NVIDIA Open Model License"
modality:
- "text"
tags:
- "nvidia"
- "open-source"
- "text"
pricing:
  input: "Free (open weights)"
  output: "Free (open weights)"
  free: true
  note: "Also via NVIDIA NIM API"
benchmarks:
  reasoning: 80
  coding: 82
  math: 78
  writing: 79
  multilingual: 78
  speed: 88
parameters: "120B total (12B active)"
hardware_requirements: "1x A100 80GB (FP16); 1x RTX 4090 with Q4 quantization"
best_for:
- "Enterprise deployment"
- "NVIDIA hardware optimization"
- "Agent workflows"
- "Production inference"
---

# Nemotron 3 Super

NVIDIA's play to own the enterprise AI stack from GPU to model. Nemotron 3 Super is a 120B MoE model with 12B active parameters, purpose-built for TensorRT-LLM and NIM -- NVIDIA's inference and deployment frameworks. If your company already runs NVIDIA hardware (and statistically, it does), this model is optimized for it in ways that generic open models are not.

Coding at 82 and reasoning at 80 anchor the benchmark profile, with math (78), writing (79), and multilingual (78) rounding out a solidly mid-tier picture. Speed at 88/100 reflects the TensorRT optimization. A single A100 80GB runs it at FP16, or an RTX 4090 handles Q4 quantization -- the kind of hardware sitting in most enterprise data centers already.

The agent toolkit strategy is the bigger story. NVIDIA is positioning Nemotron 3 Super as the default model for their agent workflow ecosystem, meaning it gets first-class support for tool calling, multi-step planning, and agentic deployment patterns. If you are building AI agents on NVIDIA infrastructure, the integration is seamless.

The NVIDIA Open Model License is not Apache 2.0 -- it is more restrictive on redistribution and modification. Community fine-tuning is still thin compared to Llama or Qwen, and the model clearly performs best on NVIDIA hardware, limiting portability.

**When to pick something else:** NVIDIA's own Nemotron-Cascade 2 beats it on coding (90 vs 82) and math (92 vs 78) while being dramatically smaller. For vendor-neutral deployment, Qwen 3.5 or Mistral Small 3 under Apache 2.0 avoid NVIDIA lock-in. Nemotron 3 Super is for NVIDIA-committed enterprises building agent infrastructure.
