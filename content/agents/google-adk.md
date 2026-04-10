---
title: "Google ADK"
type: agent
id: "google-adk"
category: "dev-framework"
category_label: "Dev Framework"
description: "Google's Agent Development Kit for building AI agents. Integrates tightly with Gemini models and Google Cloud services, offering a streamlined path from prototype to production within the Google ecosystem."
last_updated: "2026-04-10"
website: "https://google.github.io/adk-docs/"
github: "https://github.com/google/adk-python"
stars: "10K+"
license: "Apache 2.0"
pricing: "Free SDK (Google AI API costs apply)"
languages:
- "Python"
tags:
- "dev-framework"
- "python"
best_for:
- "Google ecosystem users"
- "Gemini-powered agents"
- "Cloud-native deployments"
- "Multi-modal applications"
---

# Google ADK

Google's bet on the agent framework race, and the natural choice if your stack already lives on Google Cloud. The ADK integrates directly with Gemini models and Vertex AI, so you get a seamless path from local prototype to cloud-deployed production agent without stitching together third-party tools.

The multi-modal capabilities are where Gemini's strengths shine through. Building agents that process images, video, audio, and text in a single workflow is first-class here, whereas other frameworks treat multi-modality as an afterthought. The built-in evaluation tools are also a quiet strength -- you can benchmark your agent's performance systematically, which most frameworks leave as an exercise for the developer.

At 10K stars, the ADK has solid adoption for its age, and the Apache 2.0 license is genuinely permissive. But this is a Google-ecosystem play through and through. Python-only, Gemini-optimized, and best deployed on Vertex AI. If you are not on Google Cloud, the integration advantages evaporate and you are left with a framework that is less mature than LangGraph or CrewAI.

**When to pick something else:** If you want model-agnostic flexibility, LangGraph or CrewAI support any provider. If you are building with OpenAI or Claude, their respective SDKs are better integrated. If you need TypeScript, Mastra is your framework. If you want the most community resources and tutorials, CrewAI's 28K stars mean more answers on Stack Overflow.
