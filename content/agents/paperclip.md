---
title: "Paperclip"
type: agent
id: "paperclip"
category: "orchestration"
category_label: "Orchestration"
description: "Open-source orchestration platform for \"zero-human companies.\" Agents are organized as a company hierarchy (CEO, Engineers, QA) with budget enforcement, persistent state, governance with rollback, multi-company isolation, and a full audit trail. Gained 30K stars in just 3 weeks."
last_updated: "2026-04-10"
website: "https://paperclip.dev"
github: "https://github.com/paperclip-ai/paperclip"
stars: "30K+"
license: "MIT"
pricing: "Free / Open Source"
languages:
- "TypeScript"
- "Node.js"
tags:
- "orchestration"
- "typescript"
- "node.js"
best_for:
- "Autonomous organizations"
- "Complex orchestration"
- "Budget-controlled agent systems"
- "Enterprise governance"
---

# Paperclip

The most audacious agent project right now. Paperclip organizes AI agents as a corporate hierarchy -- CEO agent delegates to engineering agents, QA agents review their work, budget constraints prevent runaway spending -- and it gained 30K GitHub stars in three weeks. The "zero-human company" pitch is provocative, but the underlying orchestration primitives are genuinely useful.

Budget enforcement is the feature that matters most. Every other orchestration platform lets agents spend tokens with no guardrails. Paperclip tracks costs per agent, enforces spending limits, and provides a full audit trail of every action taken. If you are running multi-agent workflows in production and your CFO wants to know why the API bill tripled, Paperclip gives you answers. Governance with rollback means you can undo agent actions when things go wrong, and multi-company isolation lets you run separate agent organizations without cross-contamination.

The corporate hierarchy metaphor (CEO, Engineers, QA) is either brilliant or gimmicky depending on your use case. For complex orchestration where you genuinely need delegation chains, approval workflows, and quality checks, it maps well. For simple agent pipelines, the abstraction adds unnecessary ceremony compared to n8n or even a basic LangGraph setup.

At three weeks old with 30K stars, this is peak hype-cycle. The TypeScript/Node.js codebase is MIT-licensed and moving fast, but expect breaking changes and incomplete documentation. This is a bet on the future, not a safe production choice today.

**When to pick something else:** If you need battle-tested workflow automation today, n8n has 170K stars and years of production use. If you want a framework to build agents rather than orchestrate them, LangGraph or CrewAI are more appropriate. If budget control is your only concern, you can implement spending limits in any framework without adopting the full corporate hierarchy model.
