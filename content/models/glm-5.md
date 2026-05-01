---
title: "GLM-5"
type: model
id: "glm-5"
provider: "Zhipu AI"
model_type: "open-source"
api_model_id: "zai-org/GLM-5"
release_date: "2026-02"
description: "Large MoE model with strongest coding benchmark among open models (77.8% SWE-bench). 50.4% on Humanity's Last Exam. MIT license with no usage restrictions."
last_updated: "2026-04-30"
last_verified: "2026-04-30"
availability_status: "available"
deprecated: false
tool_schema_format: "openai-compatible"
pricing_confidence: "high"
model_listing_confidence: "high"
benchmark_confidence: "high"
context_window: "202K tokens"
website: "https://www.zhipuai.cn"
license: "MIT"
modality:
- "text"
tags:
- "zhipu ai"
- "open-source"
- "text"
pricing:
  input: "Free (self-hosted)"
  output: "Free (self-hosted)"
  free: true
  note: "Also via Zhipu API"
benchmarks:
  reasoning: 90
  coding: 93
  math: 88
  writing: 82
  multilingual: 83
  speed: 70
capabilities:
- "function_calling"
- "structured_output"
- "streaming"
- "tool_search"
- "long_context"
- "reasoning"
sources:
- title: "GLM-5 model card"
  url: "https://huggingface.co/zai-org/GLM-5"
- title: "GLM-5 NVIDIA NIM model card"
  url: "https://build.nvidia.com/z-ai/glm5/modelcard"
benchmark_sources:
- title: "GLM-5 benchmark table"
  url: "https://huggingface.co/zai-org/GLM-5"
parameters: "744B total (40B active)"
hardware_requirements: "8x A100 80GB (FP16); 2x A100 with Q4 quantization"
best_for:
- "Code generation"
- "Complex reasoning"
- "Enterprise deployment"
- "Research"
---

# GLM-5

The best open-source coding model, full stop. GLM-5's 77.8% on SWE-bench beats every other open-weight model and most proprietary ones, while its 50.4% on Humanity's Last Exam puts it in rare company for general reasoning. Zhipu AI came out of nowhere for Western audiences, but these numbers speak for themselves.

The coding benchmark score of 93/100 is not a fluke -- it translates directly to real-world code generation tasks. Reasoning (90) and math (88) are similarly strong. The weak spot is speed at 70/100, which is the tax you pay for a 744B MoE architecture even with only 40B parameters active per token. Writing at 82 is competent but not the reason you pick this model.

Self-hosting under MIT with zero usage restrictions is the dream license for enterprise. The hardware cost is real though: 8x A100 80GB for FP16, or 2x A100 if you quantize to Q4. That puts it firmly in "serious infrastructure" territory, not hobbyist-friendly. The Zhipu API exists if you want to skip the hardware bill.

The main gap is ecosystem. Western tooling integration is still thin compared to Llama or Qwen, and community fine-tunes are sparse. If you need a coding powerhouse and can handle the infrastructure, nothing open-source touches it.

**When to pick something else:** For a more balanced open model with better multilingual support and a larger community, Qwen 3.5 is the safer choice. For coding on consumer hardware, Nemotron-Cascade 2 delivers remarkable results at a fraction of the compute.
