---
title: "Mastra"
type: agent
id: "mastra"
category: "dev-framework"
category_label: "Dev Framework"
description: "TypeScript-first agent framework built by the team behind Gatsby. Features built-in model routing, RAG pipelines, memory management, and MCP integration, designed for developers who prefer the TypeScript ecosystem."
last_updated: "2026-04-10"
website: "https://mastra.ai"
github: "https://github.com/mastra-ai/mastra"
stars: "10K+"
license: "Elastic License 2.0"
pricing: "Free / Open Source"
languages:
- "TypeScript"
tags:
- "dev-framework"
- "typescript"
best_for:
- "TypeScript developers"
- "RAG applications"
- "Full-stack JS/TS projects"
- "MCP tool integrations"
---

# Mastra

The agent framework for TypeScript developers who are tired of being an afterthought. While LangGraph, CrewAI, AutoGen, OpenAI Agents SDK, and Google ADK are all Python-first (or Python-only), Mastra is built from the ground up for the TypeScript ecosystem, by the team that built Gatsby.

Built-in RAG pipelines, memory management, and model routing mean you are not cobbling together five different libraries to build a capable agent. MCP integration is native, so your agents can discover and connect to tools using the same protocol Anthropic is pushing across the industry. The workflow orchestration engine handles the multi-step coordination that would otherwise require LangGraph-level complexity.

At 10K stars, the community is growing fast. The Elastic License 2.0 is worth noting -- it is not MIT or Apache, meaning there are restrictions on offering Mastra as a managed service. For most developers building their own applications, this is irrelevant. For companies planning to host it as a product, read the license carefully.

The main gap is ecosystem maturity. Python frameworks have years of tutorials, Stack Overflow answers, and battle-tested patterns. Mastra is newer, so you will encounter more rough edges and fewer examples. But if your team lives in TypeScript and you refuse to maintain a Python microservice just for your agent layer, Mastra is the only serious option.

**When to pick something else:** If you are a Python shop, CrewAI or LangGraph are more mature. If you want a vendor-backed SDK, the Anthropic Agent SDK supports TypeScript too. If you need no-code, Lindy or n8n skip the framework entirely.
