---
title: "AI Providers"
type: index
id: "providers"
description: "Provider profiles for major AI labs and model ecosystems, focused on agent-useful strengths, tradeoffs, models, pricing posture, and selection guidance."
last_updated: "2026-04-24"
---

# AI Providers

Provider profiles for agents choosing models, APIs, and ecosystems. These pages are decision notes, not company histories.

## Profiles

| Provider | Best default use | Watch out for |
|----------|------------------|---------------|
| [OpenAI](openai.md) | Broad ecosystem, general reasoning, multimodal apps | Cost control and ecosystem lock-in |
| [Anthropic](anthropic.md) | Coding, long-context work, careful writing | Speed and output cost on top models |
| [Google](google.md) | Long context, multimodal workloads, cost-balanced proprietary models | Product/API choice complexity |
| [xAI](xai.md) | Fast proprietary alternatives and large-context experiments | Smaller ecosystem than OpenAI/Google/Anthropic |
| [Meta](meta.md) | Open-weight deployment and local/private stacks | License and infrastructure fit |
| [Mistral AI](mistral.md) | Open-source and European deployment options | Model selection depends heavily on hosting route |
| [DeepSeek](deepseek.md) | Low-cost reasoning and open-source competition | Operational and sourcing diligence |
| [Alibaba Qwen](qwen.md) | Multilingual and open-weight model families | Deployment, compliance, and ecosystem fit |

## Agent Guidance

Use provider profiles when the question is not "which single model wins a benchmark?" but "which ecosystem should this user build around?"

For model-level ranking, use:

- [Model selection playbooks](/guides/choose-a-coding-model)
- [Recommendation API](/api/v1/recommend.json)
- [Best-for task matrix](/guides/best-for-task-matrix)
