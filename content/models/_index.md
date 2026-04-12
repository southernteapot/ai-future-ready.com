---
title: "AI Models"
type: index
id: "models"
description: "Comprehensive comparison of 33+ AI models — proprietary and open source — with benchmarks, pricing, and use-case recommendations."
last_updated: "2026-04-10"
---

# AI Models

Comprehensive comparison of current AI models with benchmarks, pricing, and recommendations. Every model has structured YAML metadata with typed fields — pricing, benchmarks, context windows — queryable via the [JSON API](/api/v1/models.json) and [recommendation engine](/api/v1/recommend.json).

## Proprietary Models

| Model | Provider | Context | Reasoning | Coding | Pricing (input) |
|-------|----------|---------|-----------|--------|-----------------|
| [GPT-5.4](gpt-5.4.md) | OpenAI | 1M tokens | 95 | 92 | $5.00 / 1M tokens |
| [GPT-5.4 Thinking](gpt-5.4-thinking.md) | OpenAI | 256K tokens | 98 | 93 | $10.00 / 1M tokens |
| [Claude Opus 4.6](claude-opus-4.6.md) | Anthropic | 1M tokens | 96 | 97 | $5.00 / 1M tokens |
| [Claude Sonnet 4.6](claude-sonnet-4.6.md) | Anthropic | 1M tokens | 91 | 93 | $3.00 / 1M tokens |
| [Claude Haiku 4.5](claude-haiku-4.5.md) | Anthropic | 200K tokens | 82 | 84 | $1.00 / 1M tokens |
| [Gemini 3.1 Pro](gemini-3.1-pro.md) | Google | 1M tokens | 93 | 91 | $2.00 / 1M tokens |
| [Gemini 3 Flash](gemini-3-flash.md) | Google | 1M tokens | 82 | 80 | $0.15 / 1M tokens |
| [Grok 4.1](grok-4.1.md) | xAI | 128K tokens | 91 | 90 | $3.00 / 1M tokens |
| [Grok 4.20](grok-4.20.md) | xAI | 2M tokens | 85 | 88 | $2.00 / 1M tokens |

## Open Source Models

| Model | Provider | Parameters | Context | Reasoning | Coding | License |
|-------|----------|------------|---------|-----------|--------|---------|
| [Llama 4 Maverick](llama-4-maverick.md) | Meta | 400B total (17B active) | 1M tokens | 87 | 82 | Llama Community License |
| [Llama 4 Scout](llama-4-scout.md) | Meta | 109B total (17B active) | 10M tokens | 80 | 79 | Llama Community License |
| [DeepSeek V3.2](deepseek-v3.2.md) | DeepSeek | 671B total (37B active) | 128K tokens | 88 | 88 | MIT |
| [DeepSeek R1](deepseek-r1.md) | DeepSeek | 671B total (37B active) | 128K tokens | 92 | 88 | MIT |
| [Mistral 3](mistral-3.md) | Mistral AI | 675B total (41B active) | 128K tokens | 86 | 87 | Apache 2.0 |
| [Qwen 3](qwen-3.md) | Alibaba | 1T+ total (MoE, various active sizes) | 128K tokens | 88 | 90 | Apache 2.0 |
| [Hermes 4 405B](hermes-4-405b.md) | Nous Research | 405B (also available in 14B, 70B) | 128K tokens | 88 | 84 | Llama Community License |
| [MiniMax M2.7](minimax-m2.7.md) | MiniMax | MoE (undisclosed active/total) | 128K tokens | 90 | 95 | Modified MIT |
| [GLM-5](glm-5.md) | Zhipu AI | 744B total (40B active) | 128K tokens | 90 | 93 | MIT |
| [Kimi K2.5](kimi-k2.5.md) | Moonshot AI | MoE (undisclosed) | 128K tokens | 93 | 85 | MIT |
| [Qwen 3.5 397B-A17B](qwen-3.5.md) | Alibaba | 397B total (17B active) | 256K tokens | 91 | 92 | Apache 2.0 |
| [GPT-OSS-120B](gpt-oss-120b.md) | OpenAI | 120B | 128K tokens | 85 | 86 | OpenAI Open Weight License |
| [Gemma 3](gemma-3.md) | Google | 1B to 27B variants | 128K tokens | 75 | 73 | Gemma Terms of Use |
| [Gemma 4](gemma-4.md) | Google | E2B, E4B, 26B MoE (3.8B active), 31B Dense | 256K tokens | 84 | 83 | Apache 2.0 |
| [Command R+](command-r-plus.md) | Cohere | 104B | 128K tokens | 82 | 78 | CC-BY-NC 4.0 |
| [Yi-1.5 34B](yi-1.5-34b.md) | 01.AI | 34B (also 6B, 9B variants) | 32K tokens | 80 | 79 | Apache 2.0 |
| [Phi-4](phi-4.md) | Microsoft | 14B | 16K tokens | 78 | 80 | MIT |
| [Falcon 3](falcon-3.md) | Technology Innovation Institute | 3B to 10B variants | 32K tokens | 70 | 68 | Apache 2.0 |
| [SmolLM3 3B](smollm3-3b.md) | Hugging Face | 3B | 32K tokens | 68 | 70 | Apache 2.0 |
| [Cohere Tiny Aya 3.35B](cohere-tiny-aya.md) | Cohere | 3.35B | 32K tokens | 65 | 62 | CC-BY-NC 4.0 |
| [Mistral Small 3 24B](mistral-small-3.md) | Mistral AI | 24B | 128K tokens | 79 | 80 | Apache 2.0 |
| [Mistral Small 4](mistral-small-4.md) | Mistral AI | 119B total (6.5B active) | 128K tokens | 76 | 78 | Apache 2.0 |
| [Nemotron 3 Super](nemotron-3-super.md) | NVIDIA | 120B total (12B active) | 128K tokens | 80 | 82 | NVIDIA Open Model License |
| [Nemotron-Cascade 2](nemotron-cascade-2.md) | NVIDIA | 30B total (3B active) | 1M tokens | 88 | 90 | NVIDIA Open Model License |
