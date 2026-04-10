---
title: "n8n"
type: agent
id: "n8n"
category: "orchestration"
category_label: "Orchestration"
description: "Open-source workflow automation platform with AI agent capabilities. Features LangChain integration, vector database support, and a visual workflow builder. Available as self-hosted or cloud deployment."
last_updated: "2026-04-10"
website: "https://n8n.io"
github: "https://github.com/n8n-io/n8n"
stars: "170K+"
license: "Sustainable Use License"
pricing: "Free self-hosted / Cloud from $24/mo"
languages:
- "TypeScript"
tags:
- "orchestration"
- "typescript"
best_for:
- "Workflow automation"
- "AI-powered integrations"
- "Self-hosted solutions"
- "Business process automation"
---

# n8n

The workflow automation platform that quietly became an AI agent powerhouse. With 170K GitHub stars -- more than any other tool on this list -- n8n has the largest community, the most integrations (400+), and years of production battle-testing that newer agent platforms cannot match.

n8n is not an agent framework in the traditional sense. It is a visual workflow builder that bolted on LangChain integration, vector database support, and AI agent nodes. This means you get AI capabilities wrapped in a mature automation platform with real connectors to CRMs, databases, APIs, email, and everything else your business actually runs on. For teams that need agents to interact with existing business tools, this is the fastest path from idea to production.

Self-hosting is free and straightforward, which makes n8n the default choice for organizations with data residency requirements. The cloud option starts at $24/mo for teams that do not want to manage infrastructure. The Sustainable Use License is not truly open-source -- you cannot offer n8n as a hosted service -- but for internal use and self-hosting, there are no restrictions.

The limitation is that n8n's AI capabilities are additive, not foundational. You are building workflows that happen to include AI agents, not building agent-first systems. For complex multi-agent orchestration with dynamic routing and state management, a purpose-built framework like LangGraph or Paperclip gives you more control.

**When to pick something else:** If you need multi-agent orchestration with corporate governance, Paperclip is more specialized. If you want a pure agent framework for developers, LangGraph or CrewAI are better fits. If you want no-code agent building without the workflow automation baggage, Lindy is simpler. If you need a coding agent, look at Claude Code or GitHub Copilot.
