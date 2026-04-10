---
title: "Qwen 3.5 397B-A17B"
type: model
id: "qwen-3.5"
provider: "Alibaba"
model_type: "open-source"
release_date: "2026-02"
description: "Alibaba's generational leap. Natively multimodal, 256K context, 201 languages. The flagship 397B-A17B MoE model activates only 17B parameters per token. Apache 2.0. Most downloaded model family on HuggingFace."
last_updated: "2026-04-10"
context_window: "256K tokens"
website: "https://qwenlm.github.io"
license: "Apache 2.0"
modality:
- "text"
- "image"
tags:
- "alibaba"
- "open-source"
- "text"
- "image"
pricing:
  input: "Free (self-hosted)"
  output: "Free (self-hosted)"
  free: true
  note: "Alibaba Cloud API available"
benchmarks:
  reasoning: 91
  coding: 92
  math: 94
  writing: 84
  multilingual: 97
  speed: 82
parameters: "397B total (17B active)"
hardware_requirements: "4x A100 80GB (FP16); single GPU with Q4 quantization (17B active)"
best_for:
- "Multilingual applications"
- "Math/coding"
- "Edge deployment (smaller variants)"
- "Research"
---

# Qwen 3.5 397B-A17B

The most well-rounded open model available today. Qwen 3.5 does not have the single highest score in any one category, but it has no real weaknesses either -- 91 reasoning, 92 coding, 94 math, 97 multilingual. It is the model you pick when you need one model to do everything well, in 201 languages, with a 256K context window.

The MoE architecture is brilliantly efficient: 397B total parameters but only 17B active per token. That means you can run it on a single GPU with Q4 quantization while getting knowledge capacity that rivals dense models five times its inference cost. The speed score of 82 reflects this -- not the fastest, but remarkably quick for what it delivers.

Being the most downloaded model family on HuggingFace matters. The community ecosystem is deep: fine-tunes, adapters, tooling, and deployment guides are everywhere. Apache 2.0 licensing means no commercial restrictions. Native multimodal support (text and image) is baked in, not bolted on. Alibaba Cloud API is there if you prefer managed hosting.

Self-hosting the flagship requires 4x A100 80GB at FP16, but the smaller Qwen 3.5 variants scale down gracefully for edge deployment. The family approach -- from tiny to massive -- is one of its biggest practical advantages.

**When to pick something else:** For pure coding tasks, GLM-5's 93 beats Qwen's 92 and its SWE-bench numbers are clearly ahead. For math-only workloads, Kimi K2.5 at 97 is untouchable. For running on a single consumer GPU without quantization, look at Gemma 4 or Mistral Small 3.
