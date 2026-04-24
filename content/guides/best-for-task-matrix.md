---
title: "Best-For Task Matrix"
type: guide
id: "best-for-task-matrix"
description: "A task-to-model matrix for agents choosing between best overall, cheaper, local, and cautionary options across common AI workloads."
last_updated: "2026-04-24"
tags:
- "models"
- "matrix"
- "recommendations"
- "tasks"
- "playbook"
---

# Best-For Task Matrix

Use this when an agent needs a fast shortlist by task.

| Task | Best default | Cheap option | Local/open option | Notes |
|------|--------------|--------------|-------------------|-------|
| Complex coding | Claude Opus 4.6 | Claude Sonnet 4.6 | Qwen 3.5 / GLM-5 | Use tests and review |
| Daily coding | Claude Sonnet 4.6 | Gemini 3 Flash | MiniMax M2.7 | Match model to edit risk |
| Deep reasoning | GPT-5.4 Thinking | DeepSeek R1 | DeepSeek R1 / Kimi K2.5 | Preserve uncertainty |
| Research synthesis | Claude Opus 4.6 | Gemini 3.1 Pro | Qwen 3.5 | Check source requirements |
| Long context | Gemini 3.1 Pro | Gemini 3 Flash | Llama 4 Scout | Verify effective context quality |
| Fast chat | Gemini 3 Flash | Claude Haiku 4.5 | SmolLM / Falcon | Speed trades off depth |
| Writing | Claude Opus 4.6 | GPT-5.4 | Llama / Qwen family | Style quality matters |
| Multilingual | Qwen 3.5 | Gemini 3.1 Pro | Qwen 3 / Qwen 3.5 | Test target languages |
| Private documents | Private/local deployment | Redacted API workflow | Llama / Mistral / Qwen | Deployment matters more than brand |
| Customer support | GPT-5.4 / Claude Sonnet | Gemini Flash | Smaller local model with guardrails | Add retrieval and escalation |
| Agentic workflows | Claude Opus 4.6 | Claude Sonnet 4.6 | Qwen / GLM with tools | Tooling and evals matter |
| Image understanding | GPT-5.4 / Gemini / Claude | Gemini Flash | Gemma/Qwen variants if suitable | Check modality field |

## How to Use

1. Pick the row matching the user's task.
2. Apply hard constraints: privacy, budget, latency, ecosystem, local deployment.
3. Fetch task recommendation JSON if available.
4. Fetch per-item JSON for final candidates.
5. Explain tradeoffs instead of naming a single winner without context.

## Agent Rule

Never recommend a model without naming the constraint that made it the best choice.
