---
title: "AI Changelog"
type: changelog
id: "changelog"
description: "Chronological log of AI model releases, price changes, shutdowns, and major events. Designed for AI agents with knowledge cutoffs."
last_updated: "2026-06-10"
---

# AI Changelog

What changed in AI, in reverse chronological order. Designed for agents with knowledge cutoffs.

## June 2026

- **2026-06-09** -- Claude Fable 5 released by Anthropic. First publicly available Mythos-class model, released under Project Glasswing safeguards (high-risk queries fall back to Opus 4.8, <5% of sessions). 80.3% SWE-bench Pro vs 69.2% for Opus 4.8. $10/$50 per 1M tokens, 1M context. Requires 30-day data retention on all traffic. Claude Mythos 5 launched same day for approved Glasswing customers only.
- **2026-06** -- Anthropic confidentially files IPO prospectus with the SEC. Revenue run rate reportedly $47B (up from ~$10B a year prior); latest funding round valued the company at $965B, above OpenAI's $852B.

## May 2026

- **2026-05-28** -- Claude Opus 4.8 released by Anthropic, six weeks after Opus 4.7. 69.2% SWE-bench Pro. Same $5/$25 rate card, 1M context on by default, 128K max output. Introduces user-level effort control (low/high/extra/max) and 3x cheaper Fast Mode ($10/$50). Config-only migration from 4.7.
- **2026-05-05** -- GPT-5.5 Instant rolls out as the new default ChatGPT model, replacing GPT-5.3 Instant. OpenAI reports 52.5% fewer hallucinated claims on high-stakes prompts. Available in the API as chat-latest.

## April 2026 (late)

- **2026-04-23** -- GPT-5.5 released by OpenAI (codename "Spud"). 82.7% Terminal-Bench 2.0, 51.7% FrontierMath Tiers 1-3. $5/$30 per 1M tokens, 1.05M context. GPT-5.5 Pro at $30/$180 follows in the API the next day.
- **2026-04** -- Claude Opus 4.7 released by Anthropic (mid-April). Introduces new tokenizer (~30% more tokens for the same text, effective cost increase up to 35% vs Opus 4.6) and always-on adaptive thinking. Same $5/$25 pricing. Superseded by Opus 4.8 six weeks later.

## April 2026

- **2026-04-10** -- Gemma 4 released by Google. Apache 2.0 license, #3 on Arena AI (1,452 Elo). Four variants from edge (E2B) to workstation (31B). Natively multimodal, 140+ languages.
- **2026-04-08** -- Meta debuts Muse Spark, its first proprietary AI model. Built by Meta Superintelligence Labs under Alexandr Wang. Powers Meta AI across Facebook, Instagram, WhatsApp, Messenger, Ray-Ban glasses. Meta spending $115-135B on AI capex in 2026. Departure from open-source Llama strategy.
- **2026-04-07** -- Anthropic announces Claude Mythos will NOT be publicly released. Available only to ~50 partners under Project Glasswing. Described internally as "by far the most powerful AI model we have ever developed." Codenamed Capybara. Preview pricing $25/$125 per 1M tokens. Has discovered thousands of zero-day vulnerabilities.
- **2026-04-07** -- GLM-5.1 released by Zhipu AI. 744B MoE (40B active), 200K context, MIT license. Reportedly beats Claude Opus 4.6 and GPT-5.4 on SWE-Bench Pro.
- **2026-04-06** -- OpenAI publishes economic policy paper proposing AI as public utility, robot taxes, subsidized four-day workweek, public wealth funds. OpenAI now generating $2B/month revenue, preparing for IPO.
- **2026-04** -- Anthropic revenue run rate hits $30B (up from $9B end of 2025). Closes $30B Series G at $380B valuation. Over 1,000 business customers spending >$1M annually.
- **2026-04** -- MCP (Model Context Protocol) crosses 97M installs. Linux Foundation announces open governance.
- **2026-04** -- Q1 2026 venture funding hits record $267.2B, dominated by OpenAI and Anthropic.
- **2026-04** -- NVIDIA unveils Vera Rubin AI platform for trillion-parameter models.
- **2026-04** -- GPT-5.5 (codename "Spud") completes pretraining. Release expected April-May 2026.

## March 2026

- **2026-03** -- GPT-5.4 released by OpenAI. Unifies reasoning, coding, and agentic capabilities. 94.6% AIME, 74.9% SWE-bench. $5/$15 per 1M tokens.
- **2026-03** -- GPT-5.4 Thinking released by OpenAI. Extended reasoning mode, 98/100 reasoning, 97/100 math. $10/$40 per 1M tokens.
- **2026-03** -- Grok 4.20 released by xAI. Lowest hallucination rate (78% Omniscience), #1 instruction following (83% IFBench). 2M token context, 248 tok/sec.
- **2026-03-25** -- OpenAI shuts down Sora video generation. Pivoting to robotics. Underwhelming commercial returns and fierce competition cited.
- **2026-03** -- Claude Code source code accidentally leaked via npm packaging error. 512,000 lines exposed. Second security incident in a week after CMS misconfiguration exposed "Claude Mythos" model details.
- **2026-03** -- Nemotron 3 Super and Nemotron-Cascade 2 released by NVIDIA. Cascade 2 achieves gold-medal performance on IMO, IOI, and ICPC with only 3B active parameters. Runs on a single RTX 4090.
- **2026-03** -- Mistral Small 4 released. 119B total, 6.5B active MoE. Apache 2.0.
- **2026-03** -- MiniMax M2.7 released. Near-frontier intelligence (95/100 coding) at $0.53/M tokens. Open weights.
- **2026-03-05** -- GitHub Copilot Agentic Code Review ships. Expands Copilot from code completion to autonomous code review.

## February 2026

- **2026-02** -- Claude Opus 4.6 released by Anthropic. 1M context (no surcharge), 80.8% SWE-bench, 97/100 coding. $5/$25 per 1M tokens. Agent teams feature. Internal codename "Fennec."
- **2026-02** -- Claude Sonnet 4.6 released by Anthropic. First Sonnet preferred over previous Opus in coding evals. $3/$15 per 1M tokens. 1M context.
- **2026-02** -- Gemini 3.1 Pro released by Google. Improved reasoning and agentic capabilities. $2/$12 per 1M tokens with free tier via Google AI Studio.
- **2026-02** -- GLM-5 released by Zhipu AI. 77.8% SWE-bench (top open model for coding). 50.4% on Humanity's Last Exam. MIT license.
- **2026-02** -- Qwen 3.5 released by Alibaba. 397B-A17B MoE, 256K context, 201 languages, 94/100 math. Apache 2.0.
- **2026-02** -- Cohere Tiny Aya 3.35B released. 70+ languages at 3.35B parameters. CC-BY-NC 4.0.
- **2026-02** -- EU AI Act prohibited practices enforcement begins. Social scoring and real-time biometric surveillance banned. AI literacy obligations take effect.
- **2026-02** -- Ads appear in free ChatGPT for US users. Free and Go tier users now see advertisements.

## January 2026

- **2026-01** -- Apple announces partnership with Google to use Gemini AI in the next version of Siri. Major partnership shift away from OpenAI.
- **2026-01** -- ChatGPT Go plan launches globally. $8/month tier between Free and Plus.
- **2026-01-01** -- Multiple state AI laws take effect: California AI Safety Act, California Transparency in Frontier AI Act, Texas Responsible AI Governance Act.

## December 2025

- **2025-12** -- Mistral 3 released by Mistral AI. Flagship MoE model suite (675B total, 41B active), Apache 2.0. European alternative for enterprise AI. $2/$6 per 1M tokens.
- **2025-12** -- Gemini 3 Flash released by Google. Replaces Gemini 2.5 Flash as default model in consumer app and Google Search AI responses. $0.15/$0.60 per 1M tokens.
- **2025-12** -- GPT-5.2 released by OpenAI. Reportedly hastened by Google's Gemini 3 launch.
- **2025-12** -- Trump White House issues executive order "Ensuring a National Policy Framework for AI." Creates AI Litigation Task Force to challenge state AI laws. Aims to preempt state-by-state regulation.

## November 2025

- **2025-11** -- Google Gemini 3 Pro and 3 Deep Think launch. State-of-the-art reasoning with multimodal capabilities. Replaces Gemini 2.5 series.
- **2025-11** -- Google Antigravity AI IDE launches free. Agent-first IDE with built-in Claude Opus 4.6 and Gemini 3.1 Pro.
- **2025-11** -- xAI Grok 4.1 released. 65% fewer hallucinations (down to 4.22%), Thinking and Non-thinking configurations.
- **2025-11** -- Claude Opus 4.5 released by Anthropic. 67% price cut, making premium intelligence more affordable.
- **2025-11** -- Claude Haiku 4.5 released by Anthropic. Matches Claude Sonnet 4 on coding and agent tasks at $1/$5 per 1M tokens.

## September 2025

- **2025-09** -- DeepSeek V3.2 released. Sparse attention mechanism, on par with GPT-5.1 and Gemini 3 Pro on benchmarks. MIT license. $0.27/$1.10 per 1M tokens.
- **2025-09** -- Claude Sonnet 4.5 released by Anthropic. 77.2% SWE-bench Verified.

## August 2025

- **2025-08** -- GPT-5 launches by OpenAI. Unified multimodal system with smart routing. 94.6% AIME, 74.9% SWE-bench. 256K context.
- **2025-08** -- Claude Opus 4.1 released by Anthropic. Improved code generation, search reasoning, and instruction adherence.
- **2025-08** -- EU AI Act GPAI rules take effect. Governance and obligations for General-Purpose AI models become applicable.
- **2025-08** -- DeepSeek V3.1 released under MIT License. Hybrid thinking/non-thinking modes, surpasses prior models by 40% on SWE-bench.

## July 2025

- **2025-07** -- Grok 4 and Grok 4 Heavy launched by xAI. xAI claims Grok 4 is "the most intelligent model in the world." Native tool use and real-time search.
- **2025-07** -- Amazon Kiro IDE preview. Spec-driven AI coding IDE on Amazon Bedrock.
- **2025-07** -- Cognition AI acquires Windsurf AI IDE. Consolidation in the AI coding tools market.
- **2025-07** -- EU AI Act enters into force (full regulation framework).

## June 2025

- **2025-06** -- Qwen 3 released by Alibaba. Overtakes Llama as most-downloaded model family on HuggingFace. Hybrid reasoning, 119 languages, Apache 2.0.

## May 2025

- **2025-05** -- Claude Opus 4 and Claude Sonnet 4 released by Anthropic. Opus 4 classified Level 3 on Anthropic's safety scale. Most capable Claude model at time of release.
- **2025-05** -- DeepSeek R1-0528 update. Improved reasoning capabilities.

## April 2025

- **2025-04** -- Llama 4 released by Meta. Scout (109B, 10M context) and Maverick (400B, 1M context) variants. MoE architecture with 17B active parameters.

## March 2025

- **2025-03** -- GPT-4.5 released by OpenAI. Improved creativity, reduced hallucinations, broader world knowledge.
- **2025-03** -- Gemini 2.5 Pro released by Google DeepMind. Thinking model with strong reasoning and 1M context.

## February 2025

- **2025-02** -- Claude 3.7 Sonnet released by Anthropic. Hybrid reasoning mode combining standard and extended thinking.

## January 2025

- **2025-01** -- DeepSeek R1 released. Open-source reasoning model rivaling frontier models at a fraction of training cost. MIT license. Beat OpenAI o1 on AIME and MATH. $0.55/$2.19 per 1M tokens.
