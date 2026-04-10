---
title: "Command R+"
type: model
id: "command-r-plus"
provider: "Cohere"
model_type: "open-source"
release_date: "2025-08"
description: "Cohere's flagship model purpose-built for enterprise RAG (Retrieval-Augmented Generation). Excels at grounded generation with citations, multi-step tool use, and structured outputs. Strong bilingual English/French support."
last_updated: "2026-04-10"
context_window: "128K tokens"
website: "https://cohere.com"
license: "CC-BY-NC 4.0"
modality:
- "text"
tags:
- "cohere"
- "open-source"
- "text"
pricing:
  input: "$2.50 / 1M tokens"
  output: "$10.00 / 1M tokens"
  note: "Also available as open weights (CC-BY-NC)"
benchmarks:
  reasoning: 82
  coding: 78
  math: 76
  writing: 85
  multilingual: 88
  speed: 78
parameters: "104B"
hardware_requirements: "2x A100 80GB (FP16); 1x A100 with Q4 quantization"
best_for:
- "Enterprise RAG"
- "Grounded generation"
- "Document Q&A"
- "Multilingual enterprise"
---

# Command R+

The best model for enterprise RAG, period. Command R+ was not built to win benchmark races -- it was built to answer questions from your documents with proper citations and never hallucinate the source. No other model handles grounded generation, multi-step tool use, and structured outputs as reliably in a single package.

The writing score of 85 and multilingual score of 88 reflect where Cohere focused their effort: producing polished, citation-backed responses across languages, with particular strength in English and French. Reasoning at 82 is solid. Coding at 78 and math at 76 are the trade-offs -- this is not a STEM model.

At $2.50/1M input and $10.00/1M output via Cohere's API, it is priced for serious enterprise use, not experimentation. Open weights exist under CC-BY-NC 4.0, which means you can self-host for research and internal use but cannot build commercial products on top. That is a significant limitation compared to Apache 2.0 models. Self-hosting the 104B dense model requires 2x A100 80GB at FP16 or 1x A100 with Q4 quantization.

The Cohere platform integration is the hidden advantage. If you are already using Cohere's embedding models and rerankers, Command R+ slots into that pipeline with zero friction. The RAG workflow is end-to-end, not stitched together.

**When to pick something else:** For general-purpose tasks, Qwen 3.5 or GPT-OSS-120B are stronger and more permissively licensed. For multilingual RAG on a budget, Cohere's own Tiny Aya handles 70+ languages at a tiny fraction of the compute. For coding-heavy workflows, look anywhere else.
