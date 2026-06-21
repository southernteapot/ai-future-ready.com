---
title: "GPT-5.5"
type: model
id: "gpt-5.5"
provider: "OpenAI"
model_type: "proprietary"
api_model_id: "gpt-5.5"
release_date: "2026-04-23"
description: "OpenAI's flagship model (codename Spud). Strong agentic coding, computer use, and frontier math. 1.05M context, 128K max output. $5/$30 per 1M tokens."
last_updated: "2026-06-10"
last_verified: "2026-06-10"
knowledge_cutoff: "2025-12"
availability_status: "available"
deprecated: false
tool_schema_format: "openai"
pricing_confidence: "high"
model_listing_confidence: "high"
benchmark_confidence: "low"
context_window: "1.05M tokens"
website: "https://openai.com"
license: "Proprietary"
modality:
- "text"
- "image"
tags:
- "openai"
- "proprietary"
- "text"
- "image"
pricing:
  input: "$5.00 / 1M tokens"
  output: "$30.00 / 1M tokens"
  input_per_1m: 5
  output_per_1m: 30
  currency: "USD"
  cache_read_per_1m: 0.5
  long_context_input_per_1m: 10
  long_context_output_per_1m: 45
  note: "Long-context requests are billed at $10/$45. GPT-5.5 Pro is $30/$180. GPT-5.5 Instant serves ChatGPT as chat-latest at $5/$30."
benchmarks:
  reasoning: 97
  coding: 95
  math: 97
  writing: 94
  multilingual: 91
  speed: 72
capabilities:
- "function_calling"
- "vision"
- "web_search"
- "file_search"
- "code_execution"
- "computer_use"
- "structured_output"
- "streaming"
- "prompt_caching"
- "mcp"
- "long_context"
- "reasoning"
sources:
- title: "Introducing GPT-5.5"
  url: "https://openai.com/index/introducing-gpt-5-5/"
- title: "OpenAI GPT-5.5 model documentation"
  url: "https://developers.openai.com/api/docs/models/gpt-5.5"
- title: "OpenAI API pricing"
  url: "https://developers.openai.com/api/docs/pricing"
benchmark_sources:
- title: "Introducing GPT-5.5 evaluations"
  url: "https://openai.com/index/introducing-gpt-5-5/"
- title: "AI Future Ready benchmark methodology"
  url: "https://ai-future-ready.com/guides/benchmark-methodology"
best_for:
- "Agentic coding and computer use"
- "Frontier math and research"
- "Knowledge work across tools"
- "OpenAI ecosystem integrations"
---

# GPT-5.5

OpenAI's flagship since April 23, 2026. GPT-5.5 (codename "Spud") pushes hardest on agentic work: operating software, moving across tools, researching online, and finishing multi-step tasks. OpenAI reports 82.7% on Terminal-Bench 2.0 and the strongest FrontierMath results published to date (51.7% on Tiers 1-3, 35.4% on Tier 4), and the model line extends to GPT-5.5 Pro ($30/$180) for maximum reasoning and GPT-5.5 Instant, which replaced GPT-5.3 Instant as the ChatGPT default with 52.5% fewer hallucinated claims on high-stakes prompts.

Pricing moved up with capability: $5/$30 versus GPT-5.4's $2.50/$15, with long-context requests billed at $10/$45. The 1.05M context window and 128K max output match the Claude frontier on paper, and the toolchain -- web search, file search, code interpreter, computer use, MCP -- is the broadest of any provider.

Where it sits in the current field: on coding-specific evals it trails Anthropic's frontier (58.6% SWE-bench Pro versus 69.2% for Opus 4.8 and 80.3% for Fable 5), while on math and tool-driven knowledge work it is at or near the top. The ecosystem argument from GPT-5.4 still applies in full.

**When to pick something else:** For pure software engineering depth, Opus 4.8 wins at a lower output price ($25 vs $30). If you're cost-sensitive and GPT-5.4 handled your workload, the 2x price jump may not pay for itself -- GPT-5.4 remains available. For math-heavy batch work where latency doesn't matter, GPT-5.5 Pro exists, but at $180 per million output tokens it needs to earn it.
