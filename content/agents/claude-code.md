---
title: "Claude Code"
type: agent
id: "claude-code"
category: "coding-agent"
category_label: "Coding Agent"
description: "Anthropic's terminal-based coding agent, ranked #1 on SWE-bench with 80.8% resolution rate. Operates with 1M token context window, enabling full-codebase understanding. Included in Claude Pro and Max subscription plans."
last_updated: "2026-04-10"
website: "https://docs.anthropic.com/en/docs/claude-code"
license: "Proprietary"
pricing: "Included in Claude Pro ($20/mo) / Max ($100-200/mo)"
languages:
- "TypeScript"
tags:
- "coding-agent"
- "typescript"
best_for:
- "Software engineering"
- "Complex refactoring"
- "Bug fixing"
- "Terminal-based workflows"
---

# Claude Code

The terminal-native coding agent, and the one to beat on benchmarks -- 80.8% on SWE-bench, the highest of any tool. If you live in the terminal and work on complex codebases, this is the most capable option available.

The 1M token context window means it can hold your entire project in memory. Unlike IDE-based tools like Cursor or GitHub Copilot, Claude Code works directly in your terminal with full git integration -- no editor lock-in. It reads your codebase, makes multi-file edits, runs tests, and commits changes. The trade-off is that there is no GUI, no inline suggestions, no visual diff. It is a power tool, not a friendly assistant.

Included with Claude Pro ($20/mo) and Max ($100-200/mo), so there is no separate subscription. If you are already paying for Claude, you have it. That pricing makes it significantly cheaper than Devin ($500/mo) for individual developers, though Devin offers more autonomy for end-to-end project delivery.

**When to pick something else:** If you want inline autocomplete while typing, use GitHub Copilot or Cursor. If you want autonomous end-to-end project delivery where you hand off a task and come back later, Devin goes further. If you need an agent framework to build your own coding tools, the Anthropic Agent SDK is the building block.
