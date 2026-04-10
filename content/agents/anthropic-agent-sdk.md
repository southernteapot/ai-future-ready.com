---
title: "Anthropic Agent SDK"
type: agent
id: "anthropic-agent-sdk"
category: "dev-framework"
category_label: "Dev Framework"
description: "Tool-use-first approach to building agents with Claude. Features extended thinking for complex reasoning, computer use capabilities, and the Model Context Protocol (MCP) for standardized tool discovery and integration."
last_updated: "2026-04-10"
website: "https://docs.anthropic.com/en/docs/agents"
github: "https://github.com/anthropics/anthropic-sdk-python"
stars: "8K+"
license: "MIT"
pricing: "Free SDK (Anthropic API costs apply)"
languages:
- "Python"
- "TypeScript"
tags:
- "dev-framework"
- "python"
- "typescript"
best_for:
- "Claude ecosystem users"
- "Tool-heavy agent workflows"
- "Computer use automation"
- "MCP-based integrations"
---

# Anthropic Agent SDK

The tool-use-first agent framework, and the only SDK with native computer use -- meaning your agent can literally operate a desktop, click buttons, fill forms, and navigate software like a human. If your agent workflow involves interacting with UIs that do not have APIs, this is the only serious option.

MCP (Model Context Protocol) is the other differentiator. Instead of hardcoding tool integrations, MCP provides a standardized way for agents to discover and connect to tools dynamically. It is gaining traction across the industry, and Anthropic's SDK has the deepest native support. Extended thinking lets Claude reason through complex multi-step problems before acting, which produces noticeably better results on tasks that require planning.

Available in both Python and TypeScript, which gives it a real edge over the Python-only OpenAI Agents SDK. The 8K stars are modest compared to OpenAI's 18K, but the SDK is newer and the developer experience is clean -- less abstraction, more direct control. You pay for Claude API usage, and the costs are competitive with OpenAI for most workloads.

The obvious limitation is model lock-in to Claude. If you want to swap between GPT, Gemini, and Claude freely, a model-agnostic framework like LangGraph or CrewAI is more appropriate. But if you have chosen Claude as your model, there is no better way to build agents around it.

**When to pick something else:** If you need model flexibility across providers, use LangGraph or CrewAI. If you are on the OpenAI API, their Agents SDK is the equivalent. If you want a full coding agent rather than a framework, Claude Code is the ready-made product. If you need no-code, Lindy does not require a developer at all.
