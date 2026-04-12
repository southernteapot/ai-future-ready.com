---
title: "Prompt Patterns by Model"
type: index
id: "prompt-patterns"
description: "Model-specific prompting patterns and techniques. What works best with each AI model family — structured for agents that generate prompts."
last_updated: "2026-04-10"
---

# Prompt Patterns by Model

Every AI model has quirks. A prompt that produces great results with Claude might fall flat with GPT, and a technique that shines on Grok might be unnecessary for Gemini. These guides document what actually works with each model family -- the patterns, formatting tricks, and techniques that get the best output from each one.

These are not generic prompting tips. For universal prompting fundamentals, read our [Prompt Engineering Guide](/guides/prompting). The pages below are about what is *different* for each model.

---

## Pattern Files

### [OpenAI GPT-5.4](openai.md)
Prompting patterns for GPT-5.4 and ChatGPT. Covers system prompt behavior, structured output, verbosity control, Thinking mode for hard reasoning, and Custom Instructions for persistent preferences.

### [Anthropic Claude](anthropic.md)
Prompting patterns for Claude Opus 4.6, Sonnet 4.6, and Haiku 4.5. Covers XML tag structuring, long-context strategies, constraint following, extended thinking, tiered instructions, and artifact generation.

### [Google Gemini](google.md)
Prompting patterns for Gemini 3.1 Pro and Gemini 3 Flash. Covers multimodal prompting, web grounding, Google Workspace integration, multilingual output, and code execution.

### [xAI Grok](xai.md)
Prompting patterns for Grok 4.1 and Grok 4.20. Covers factual accuracy prompting, complex instruction following, real-time X/Twitter data access, and multi-agent mode.

### [Open Source Models](open-source.md)
Prompting patterns for Llama 4, DeepSeek R1, Qwen 3/3.5, Hermes 4, and other self-hosted models. Covers system prompt formats, quantization-aware prompting, reasoning toggles, and temperature tuning.

---

## How to Use These Patterns

**If you are prompting manually:** Read the guide for your model, then adapt the example prompts to your task.

**If you are building an AI agent:** Use these patterns to generate model-appropriate prompts programmatically. The patterns are structured so you can map them to template variables.

**If you are switching models:** Compare two model pages side-by-side to understand what you need to change in your prompts when migrating.
