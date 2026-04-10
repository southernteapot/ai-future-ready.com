---
title: "GPT-OSS-120B"
type: model
id: "gpt-oss-120b"
provider: "OpenAI"
model_type: "open-source"
release_date: "2026"
description: "OpenAI's first fully open-weight LLMs since GPT-2. Matches or surpasses o4-mini on core benchmarks. Can run on a single 80GB GPU. Optimized for vLLM, llama.cpp, and Ollama."
last_updated: "2026-04-10"
context_window: "128K tokens"
website: "https://openai.com"
license: "OpenAI Open Weight License"
modality:
- "text"
tags:
- "openai"
- "open-source"
- "text"
pricing:
  input: "Free (open weights)"
  output: "Free (open weights)"
  free: true
benchmarks:
  reasoning: 85
  coding: 86
  math: 85
  writing: 87
  multilingual: 86
  speed: 75
parameters: "120B"
hardware_requirements: "1x H100 80GB (FP16); 1x RTX 4090 with Q4 quantization"
best_for:
- "Enterprise self-hosting"
- "OpenAI ecosystem compatibility"
- "Production deployment"
- "Fine-tuning"
---

# GPT-OSS-120B

The model nobody thought OpenAI would release. After years of closed-source dominance, GPT-OSS-120B is OpenAI's first open-weight release since GPT-2 in 2019, and it matches or beats their own o4-mini across the board. The benchmarks are remarkably flat -- 85-87 across reasoning, coding, math, writing, and multilingual -- making it one of the most balanced models at any size.

What makes this interesting is not the raw numbers (Qwen 3.5 and GLM-5 beat it on most benchmarks) but the ecosystem play. First-class optimization for vLLM, llama.cpp, and Ollama means deployment is trivially easy. If your team already knows OpenAI's API patterns, the mental model translates directly. A single H100 runs it at FP16, or an RTX 4090 handles Q4 quantization.

The writing score of 87 is quietly the best in its class among open models at this size, reflecting OpenAI's years of RLHF expertise. For teams that need polished, human-sounding output from a self-hosted model, this is hard to beat. The 120B dense architecture is less efficient than MoE alternatives, which explains the speed score of 75.

The OpenAI Open Weight License is more permissive than expected but still not Apache 2.0 -- read the fine print before building commercial products.

**When to pick something else:** If raw performance matters more than ecosystem, Qwen 3.5 and GLM-5 are stronger on every technical benchmark. If you need maximum efficiency on consumer hardware, MoE models like Mistral Small 4 or Nemotron-Cascade 2 run circles around a 120B dense model.
