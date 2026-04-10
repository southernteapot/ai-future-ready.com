---
title: "AI Model Compatibility Matrix"
type: reference
description: "Which AI models work with which agent frameworks, coding tools, and platforms. Structured for agent consumption."
last_updated: "2026-04-10"
---

# AI Model Compatibility Matrix

Which models work with which tools. Updated April 2026.

## Agent Framework Compatibility

| Framework | OpenAI (GPT) | Anthropic (Claude) | Google (Gemini) | Open Source (Llama, etc.) |
|-----------|:------------:|:------------------:|:---------------:|:-------------------------:|
| LangGraph | Full | Full | Full | Full (via OpenAI-compatible API) |
| CrewAI | Full | Full | Full | Full (via LiteLLM) |
| AutoGen | Full | Full | Full | Full (via OpenAI-compatible API) |
| Mastra | Full | Full | Full | Partial (via OpenAI-compatible API) |
| OpenAI Agents SDK | Full | No | No | Partial (OpenAI-compatible endpoints) |
| Anthropic Agent SDK | No | Full | No | No |
| Google ADK | Partial | Partial | Full | Partial (via Vertex AI Model Garden) |

**Notes:**

- **LangGraph** and **CrewAI** are the most model-agnostic frameworks. They support virtually any model through LangChain's model abstraction or LiteLLM.
- **OpenAI Agents SDK** is locked to the OpenAI API format. Open-source models that expose an OpenAI-compatible API (via vLLM, Ollama, etc.) can work but are not officially supported.
- **Anthropic Agent SDK** only works with Claude models via the Anthropic API. No third-party model support.
- **Google ADK** is optimized for Gemini but supports other models through Vertex AI Model Garden and LiteLLM integration.
- **Mastra** uses a TypeScript-first approach with native support for OpenAI, Anthropic, and Google. Open-source model support depends on the provider exposing a compatible API.

## Coding Tool Model Support

| Tool | Default Model | Other Models Supported |
|------|---------------|----------------------|
| Claude Code | Claude Opus 4.6 | Claude Sonnet 4.6, Claude Haiku 4.5 |
| GitHub Copilot | GPT-5.4 | Claude Sonnet 4.6, Gemini 3.1 Pro, GPT-5.4 Thinking |
| Cursor | Claude Sonnet 4.6 | Claude Opus 4.6, GPT-5.4, GPT-5.4 Thinking, Gemini 3.1 Pro, DeepSeek V3.2, custom models |
| Windsurf | Claude Sonnet 4.6 | Claude Opus 4.6, GPT-5.4, Gemini 3.1 Pro |
| Google Antigravity | Gemini 3.1 Pro | Claude Opus 4.6 |
| Amazon Kiro | Claude Sonnet 4.6 (via Bedrock) | Claude Opus 4.6, Llama 4, Mistral 3 (via Bedrock) |

**Notes:**

- **Cursor** offers the broadest model support among AI IDEs, including the ability to bring your own API key for virtually any model.
- **Claude Code** is Claude-only. You cannot swap in a different provider's model.
- **GitHub Copilot** added multi-model support in late 2025. Claude and Gemini models are available alongside the default GPT.
- **Google Antigravity** ships with both Gemini and Claude built in, but it is free and primarily a Gemini showcase.
- **Amazon Kiro** runs on Bedrock, so model support is limited to what Bedrock offers. All major providers are represented.

## API Provider Compatibility

| Provider | REST API | Python SDK | TypeScript SDK | OpenAI-Compatible API |
|----------|:--------:|:----------:|:--------------:|:---------------------:|
| OpenAI | Yes | Yes | Yes | Yes (is the standard) |
| Anthropic | Yes | Yes | Yes | No (different format) |
| Google | Yes | Yes | Yes | No (different format) |
| xAI | Yes | Yes | Yes | Yes |
| DeepSeek | Yes | Yes | No official | Yes |
| Mistral | Yes | Yes | Yes | Yes |
| Together AI | Yes | Yes | Yes | Yes |
| OpenRouter | Yes | Yes | Yes | Yes |

**Notes:**

- **OpenAI-compatible API** is the de facto standard. Most open-source serving tools (vLLM, Ollama, llama.cpp) expose this format, making it easy to swap models.
- **Anthropic** uses a distinct API format (Messages API). You need the Anthropic SDK or a wrapper like LiteLLM to use Claude in OpenAI-compatible tooling.
- **Google** also uses a distinct format (Gemini API / Vertex AI). Same situation -- use the Google SDK or a compatibility layer.
- **xAI**, **DeepSeek**, **Mistral**, **Together AI**, and **OpenRouter** all support the OpenAI-compatible format, making them drop-in replacements in most tooling.
- **OpenRouter** aggregates 200+ models behind a single OpenAI-compatible endpoint. Useful for testing multiple models without managing separate API keys.

## Hosting Platforms for Open Source Models

| Platform | Llama 4 | DeepSeek V3.2 | Qwen 3.5 | Mistral 3 | Gemma 4 |
|----------|:-------:|:-------------:|:---------:|:---------:|:-------:|
| Ollama | Yes | Yes | Yes | Yes | Yes |
| vLLM | Yes | Yes | Yes | Yes | Yes |
| llama.cpp | Yes | Yes | Yes | Yes | Yes |
| HuggingFace | Yes | Yes | Yes | Yes | Yes |
| Together AI | Yes | Yes | Yes | Yes | Yes |
| Replicate | Yes | Yes | Partial | Yes | Yes |
| NVIDIA NIM | Yes | Yes | Partial | Yes | Yes |

**Notes:**

- **Ollama** is the easiest way to run models locally. One-command install, automatic quantization, and an OpenAI-compatible API. Best for development and testing.
- **vLLM** is the production standard for self-hosted serving. High throughput, PagedAttention, and continuous batching. Use this for production deployments.
- **llama.cpp** remains the best option for running models on consumer hardware (CPU, Apple Silicon, single GPU). Supports GGUF quantization for every model listed.
- **HuggingFace** hosts the original weights for all models. Use the Transformers library or download weights for use with other serving tools.
- **Together AI** offers managed hosting with per-token pricing. No infrastructure to manage. Good middle ground between self-hosting and proprietary APIs.
- **Qwen 3.5** and some Chinese-origin models may have delayed or partial support on Western-focused platforms. Check for the specific variant you need.
