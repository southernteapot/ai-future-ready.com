---
title: "Llama 4 Scout"
type: model
id: "llama-4-scout"
provider: "Meta"
model_type: "open-source"
release_date: "2025-04"
description: "Meta's efficient open-source MoE model with 109B total parameters (17B active). Features the largest context window of any model at 10M tokens."
last_updated: "2026-04-10"
context_window: "10M tokens"
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
benchmarks:
  reasoning: 80
  coding: 79
  math: 77
  writing: 81
  multilingual: 79
  speed: 88
parameters: "109B total (17B active)"
hardware_requirements: "1x A100 80GB (FP16); single RTX 4090 with Q4 quantization"
best_for:
- "Long-context applications"
- "Fine-tuning"
- "Edge deployment"
- "Learning AI development"
---

# Llama 4 Scout

The 10M token context window is the headline, and it's not a gimmick. Scout can ingest entire codebases, full legal document sets, or months of conversation history in a single pass -- no other model comes close. At 109B total parameters with only 17B active, it runs on a single A100 or a quantized RTX 4090.

Scout is the practical choice for teams that need long-context processing on their own hardware. The Llama Community License keeps it free for most commercial use, and the lightweight architecture means inference costs stay manageable even at massive context lengths. Speed at 88/100 is strong, making it viable for interactive applications despite the huge context.

The quality tradeoffs are real. Reasoning (80), coding (79), and math (77) are all a clear step below Maverick and well behind proprietary models. Scout is not the model you choose for hard problems -- it's the model you choose for problems that require absorbing enormous amounts of text before answering. Think retrieval-heavy RAG pipelines, long-form document QA, or codebase-wide search.

**When to pick something else:** For anything quality-sensitive that doesn't require extreme context, Maverick is the better Llama. For coding, DeepSeek V3.2 at $0.27/$1.10 is both smarter and cheaper via API. Scout's unique value is that 10M context window -- if you don't need it, you're leaving quality on the table by choosing this over stronger models.
