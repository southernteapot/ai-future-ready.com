---
title: "Hermes 4 405B"
type: model
id: "hermes-4-405b"
provider: "Nous Research"
model_type: "open-source"
release_date: "2025-08"
description: "Nous Research's flagship open-weight model with hybrid reasoning (toggle between standard and explicit chain-of-thought with think tags). Based on Llama 3.1, trained with rejection sampling via 1,000+ task verifiers. Known for minimal content restrictions and user-directed behavior."
last_updated: "2026-04-10"
context_window: "128K tokens"
website: "https://nousresearch.com"
license: "Llama Community License"
modality:
- "text"
tags:
- "nous research"
- "open-source"
- "text"
pricing:
  input: "Free (self-hosted)"
  output: "Free (self-hosted)"
  free: true
  note: "Or via Nous Portal / OpenRouter"
benchmarks:
  reasoning: 88
  coding: 84
  math: 90
  writing: 85
  multilingual: 78
  speed: 55
parameters: "405B (also available in 14B, 70B)"
hardware_requirements: "4x A100 80GB (FP16); 2x RTX 4090 with Q4 quantization"
best_for:
- "Uncensored use cases"
- "Research"
- "Hybrid reasoning experiments"
- "Fine-tuning"
---

# Hermes 4 405B

The model for people who want minimal guardrails and maximum steerability. Hermes 4 is Nous Research's fine-tune of Llama 3.1, trained with rejection sampling across 1,000+ task verifiers, and it comes with the least restrictive content policy of any major open-weight model. If you need a model that does what you tell it without second-guessing, this is it.

The math performance is the headline benchmark: 96.3% on MATH-500 and a 90/100 math score put Hermes in rare territory for an open model. The hybrid reasoning toggle -- switch between standard generation and explicit chain-of-thought via think tags -- gives you control over the quality/speed tradeoff on a per-query basis. Reasoning at 88/100 is competitive with DeepSeek V3.2 and Qwen 3.

The downsides reflect the Llama 3.1 base. At 405B dense parameters, this model is heavy -- 4x A100 80GB for FP16 -- and the speed score of 55/100 is the slowest of any model on this list except DeepSeek R1. Multilingual support at 78/100 is weak compared to Qwen 3 (95) or Mistral 3 (92). The community, while passionate, is a fraction of Llama's or Qwen's.

**When to pick something else:** For coding, Qwen 3 (90/100) and DeepSeek V3.2 (88/100) are stronger. For general reasoning at lower hardware cost, Llama 4 Maverick's MoE architecture is more efficient. Hermes 4's niche is clear: uncensored, highly steerable, math-strong open weights for researchers and developers who want to push boundaries without content restrictions.
