---
title: "Nemotron-Cascade 2"
type: model
id: "nemotron-cascade-2"
provider: "NVIDIA"
model_type: "open-source"
release_date: "2026-03"
description: "NVIDIA's 30B MoE with only 3B active parameters that achieves gold-medal performance on IMO, IOI, and ICPC. Beats the larger Nemotron 3 Super 120B on coding and instruction following. Fits on a single RTX 4090 (24GB VRAM with Q4). Hybrid Mamba-2 + Transformer architecture enables a 1M token context window."
last_updated: "2026-04-10"
context_window: "1M tokens"
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
  note: "Also via Ollama, NVIDIA NIM"
benchmarks:
  reasoning: 88
  coding: 90
  math: 92
  writing: 78
  multilingual: 75
  speed: 92
parameters: "30B total (3B active)"
hardware_requirements: "1x RTX 4090 24GB (Q4); 1x RTX 3090 with Q3 quantization"
best_for:
- "Competitive math/coding"
- "Consumer GPU deployment"
- "Agentic workflows"
- "On-device reasoning"
---

# Nemotron-Cascade 2

The most impressive model-per-FLOP ever released. Nemotron-Cascade 2 activates just 3B parameters per token from a 30B MoE, yet it won gold medals at IMO, IOI, and ICPC World Finals. It scores 92 on math, 90 on coding, and 88 on reasoning -- numbers that beat NVIDIA's own Nemotron 3 Super 120B, a model four times its size. All on a single RTX 4090.

The hybrid Mamba-2 + Transformer architecture is the secret weapon. It enables a 1M token context window with sub-linear memory scaling, something pure Transformer models cannot match. Speed at 92/100 means this is not just powerful but fast -- 92.4% on AIME 2025 and 87.2% on LiveCodeBench v6, delivered in real time on consumer hardware.

The trade-offs are real and predictable: writing at 78 and multilingual at 75 reflect a model laser-focused on STEM reasoning. MMLU-Pro at 79.8% confirms that broad knowledge is not the strength. If you need an assistant for general conversation or multilingual tasks, look elsewhere. If you need a reasoning engine that solves competition-level math and coding problems on an RTX 3090, nothing else comes close.

Open weights with published SFT and RL datasets make this a research goldmine. Ollama and NVIDIA NIM support means deployment is turnkey. The NVIDIA Open Model License is the only friction point -- not Apache 2.0, so check the terms for your use case.

**When to pick something else:** For general-purpose use, Qwen 3.5 or GPT-OSS-120B are far more balanced. For multilingual reasoning, Kimi K2.5 scores higher on math (97 vs 92) but needs much more hardware. Nemotron-Cascade 2 is the best reasoning model you can run on hardware you already own.
