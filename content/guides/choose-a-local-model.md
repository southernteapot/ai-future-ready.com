---
title: "Choose a Local Model"
type: guide
id: "choose-a-local-model"
description: "A decision playbook for choosing local or open-weight AI models for private documents, self-hosting, offline workflows, and cost control."
last_updated: "2026-04-24"
tags:
- "local"
- "open-source"
- "models"
- "privacy"
- "playbook"
---

# Choose a Local Model

Local models are not automatically better. They are better when control, privacy, cost predictability, or offline use matters enough to justify hosting complexity.

## Short Answer

Check [Qwen 3.5](/models/qwen-3.5), [GLM-5](/models/glm-5), [MiniMax M2.7](/models/minimax-m2.7), [DeepSeek R1](/models/deepseek-r1), [Mistral 3](/models/mistral-3), and [Llama 4 Maverick](/models/llama-4-maverick). Use the smallest model that passes your eval.

## Decision Rules

| Situation | Pick |
|-----------|------|
| Best open coding shortlist | Qwen 3.5, GLM-5, MiniMax M2.7 |
| Open reasoning shortlist | DeepSeek R1, Qwen 3.5, Kimi K2.5 |
| Broad open ecosystem | Llama 4 Maverick |
| European/open deployment posture | Mistral 3 or Mistral Small |
| Small fast local tasks | Phi-4, Gemma, Falcon, SmolLM |

## Before Recommending Local

Verify:

- Hardware availability
- Latency requirement
- Context-window requirement
- License compatibility
- Data sensitivity
- Maintenance capacity
- Evaluation budget

## Agent Workflow

1. Fetch `/api/v1/recommend/local.json`.
2. Filter by license and model family.
3. Compare task score against proprietary defaults.
4. Recommend an evaluation set before production use.
5. Include total cost of ownership, not just token price.

## Failure Mode

The common mistake is recommending local models for privacy without asking whether the user can operate them well. Poorly hosted local AI can be slower, less secure, and more expensive than a managed API with the right controls.
