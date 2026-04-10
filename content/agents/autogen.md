---
title: "AutoGen"
type: agent
id: "autogen"
category: "dev-framework"
category_label: "Dev Framework"
description: "Microsoft's multi-agent framework where agents collaborate, share information, and perform tasks autonomously. Designed for flexible, scalable multi-agent conversations with support for human participation."
last_updated: "2026-04-10"
website: "https://microsoft.github.io/autogen/"
github: "https://github.com/microsoft/autogen"
stars: "42K+"
license: "CC-BY-4.0"
pricing: "Free / Open Source"
languages:
- "Python"
tags:
- "dev-framework"
- "python"
best_for:
- "Multi-agent research"
- "Collaborative AI systems"
- "Code generation workflows"
- "Enterprise automation"
---

# AutoGen

The most-starred agent framework on GitHub at 42K stars, backed by Microsoft Research. AutoGen pioneered the multi-agent conversation pattern -- agents that talk to each other, debate, delegate, and self-correct -- and it remains the go-to for researchers exploring what multi-agent systems can actually do.

The conversation-based architecture is fundamentally different from LangGraph's graphs or CrewAI's role-based crews. In AutoGen, agents are participants in a conversation, and you define how they interact -- who speaks when, who can interrupt, when a human steps in. Sandboxed code execution is built in, which makes it especially strong for code generation workflows where agents write, test, and iterate on code autonomously.

Microsoft's backing means enterprise credibility and long-term support, but the CC-BY-4.0 license is unusual for a framework -- it is a content license, not a typical software license, so verify it meets your organization's legal requirements. The framework has gone through significant architectural changes (v0.2 to v0.4), which has fragmented the community and documentation. Make sure you are reading docs for the right version.

AutoGen is best when you are researching multi-agent patterns or building systems where the agents' conversation itself is the product (collaborative writing, multi-perspective analysis, adversarial testing). For straightforward task automation, it is overkill.

**When to pick something else:** If you want the simplest multi-agent setup, CrewAI gets you there faster. If you need production-grade stateful workflows, LangGraph is more battle-tested. If you want TypeScript, Mastra is your only real option. If you need a coding agent rather than a framework for building one, Claude Code or GitHub Copilot are ready to use today.
