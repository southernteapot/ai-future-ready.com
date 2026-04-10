---
title: "Claude Opus 4.6"
type: model
id: "claude-opus-4.6"
provider: "Anthropic"
model_type: "proprietary"
release_date: "2026-02"
description: "Anthropic's most capable model and the first Opus-class model with a 1M token context window. Leads on coding benchmarks with 80.8% SWE-bench. Internal codename \"Fennec.\""
last_updated: "2026-04-10"
context_window: "1M tokens"
website: "https://anthropic.com"
license: "Proprietary"
modality:
- "text"
- "image"
tags:
- "anthropic"
- "proprietary"
- "text"
- "image"
pricing:
  input: "$5.00 / 1M tokens"
  output: "$25.00 / 1M tokens"
  note: "Significantly cheaper than Opus 4.5"
benchmarks:
  reasoning: 96
  coding: 97
  math: 93
  writing: 95
  multilingual: 88
  speed: 62
best_for:
- "Complex coding projects"
- "Long-form analysis"
- "Agentic workflows"
- "Tasks requiring accuracy"
---

# Claude Opus 4.6

The best coding model available. At 80.8% SWE-bench and a 97/100 coding score, Opus 4.6 leads every other model on the benchmarks that matter most for real-world software engineering. If you're choosing between this and GPT-5.4, the decision comes down to whether you value SWE-bench leadership (Opus) or broader ecosystem integrations (GPT).

The 1M context window with no surcharge is a genuine differentiator -- Opus can hold an entire mid-size codebase in one pass. The agent teams feature is unique to Claude and worth exploring if you're building multi-step workflows. Writing quality at 95/100 is also best-in-class among frontier models, making this the rare model that excels at both code and prose.

At $5/$25 per million tokens, the output pricing is higher than GPT-5.4's $15, but significantly cheaper than the previous Opus 4.5. The speed score of 62/100 means Opus is not the model for rapid-fire chat -- it thinks carefully, and you feel it. For complex tasks that's a feature, not a bug.

**When to pick something else:** If you mostly need quick answers and speed matters, Sonnet 4.6 is 80% of the quality at nearly half the output cost. For math-heavy work, GPT-5.4 Thinking edges ahead with a 97/100 math score vs. Opus's 93. And if you're locked into the OpenAI ecosystem with existing tooling, the switching cost may not be worth it.
