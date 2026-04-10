---
title: "Llama 4 Maverick"
type: model
id: "llama-4-maverick"
provider: "Meta"
model_type: "open-source"
release_date: "2025-04"
description: "Meta's flagship open-source MoE model with 400B total parameters (17B active). Scored #2 on LMArena leaderboard (ELO 1,417). Native multimodal capabilities."
last_updated: "2026-04-10"
context_window: "1M tokens"
website: "https://llama.meta.com"
license: "Llama Community License"
modality:
- "text"
- "image"
tags:
- "meta"
- "open-source"
- "text"
- "image"
pricing:
  input: "Free (self-hosted)"
  output: "Free (self-hosted)"
  free: true
  note: "Or use via third-party APIs"
benchmarks:
  reasoning: 87
  coding: 82
  math: 84
  writing: 86
  multilingual: 84
  speed: 80
parameters: "400B total (17B active)"
hardware_requirements: "4x A100 80GB or 8x RTX 4090 (FP16); single GPU with heavy quantization"
best_for:
- "Self-hosted applications"
- "Fine-tuning"
- "Privacy-sensitive tasks"
- "Production deployment"
---

# Llama 4 Maverick

The open-source model that got closest to proprietary quality. Maverick hit #2 on the LMArena leaderboard (ELO 1,417) and its MoE architecture means only 17B of its 400B parameters are active per inference -- making it surprisingly efficient to run for something this capable.

For self-hosting, Maverick is the safe default. The Llama Community License is permissive enough for most commercial use, the community is massive, and the fine-tuning ecosystem is the most mature in open source. If you need a model you control completely -- for privacy, compliance, or cost predictability -- Maverick should be your first evaluation.

The honest gap: coding. At 40% on LiveCodeBench versus 85% for GPT-5, Maverick is not competitive for serious software engineering work. The 82/100 coding score looks decent in isolation but lags behind DeepSeek V3.2 (88), Qwen 3 (90), and every frontier proprietary model. Writing (86) and reasoning (87) are solid but not exceptional. You need 4x A100 80GB GPUs for full-precision hosting, though quantized versions can run on consumer hardware.

**When to pick something else:** For coding, DeepSeek V3.2 or Qwen 3 are better open-source options. For maximum quality without self-hosting constraints, Claude Sonnet 4.6 at $3/$15 will outperform Maverick on every benchmark. But if you need the largest open-source community, the deepest integration ecosystem, and a model you can fine-tune and deploy on your own infrastructure, Maverick remains the standard choice.
