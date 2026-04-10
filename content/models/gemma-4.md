---
title: "Gemma 4"
type: model
id: "gemma-4"
provider: "Google"
model_type: "open-source"
release_date: "2026-04"
description: "Google's most capable open model, built from the same research as Gemini 3. The 31B dense variant ranks #3 on Arena AI (1,452 Elo). First Gemma release under Apache 2.0. Four variants from edge (E2B) to workstation (31B). Natively multimodal with 140+ language support."
last_updated: "2026-04-10"
context_window: "256K tokens"
website: "https://ai.google.dev/gemma"
license: "Apache 2.0"
modality:
- "text"
- "image"
- "video"
- "audio"
tags:
- "google"
- "open-source"
- "text"
- "image"
- "video"
- "audio"
pricing:
  input: "Free (Apache 2.0)"
  output: "Free (Apache 2.0)"
  free: true
benchmarks:
  reasoning: 84
  coding: 83
  math: 89
  writing: 83
  multilingual: 90
  speed: 85
parameters: "E2B, E4B, 26B MoE (3.8B active), 31B Dense"
hardware_requirements: "31B: 24GB VRAM (RTX 4090); 26B MoE: 8GB; E4B/E2B: runs on phones"
best_for:
- "On-device AI"
- "Agentic workflows"
- "Multimodal tasks"
- "Code generation"
- "Edge deployment"
---

# Gemma 4

Google's most important open-source release yet. Gemma 4's 31B dense variant ranks #3 on Arena AI with 1,452 Elo, making it the highest-ranked open model that fits on a single RTX 4090. The shift to Apache 2.0 licensing removes the last commercial friction that held Gemma 3 back.

The four-variant lineup is the real story. E2B and E4B run on phones. The 26B MoE (3.8B active) needs just 8GB of VRAM. The 31B dense tops out at 24GB. This lets you deploy the same model family from edge to workstation with consistent behavior. Native multimodal support across text, image, video, and audio in 140+ languages makes it the most versatile small-to-mid model available.

Math at 89/100 is the standout benchmark -- 89.2% on AIME 2026 is extraordinary for a model this size. Reasoning (84), coding (83), and writing (83) are all strong and remarkably even. Speed at 85 reflects the efficient architecture, especially the MoE variant which is blazing fast for its capability level.

Built from the same research pipeline as Gemini 3, Gemma 4 benefits from Google's scale without requiring Google's infrastructure. The 256K context window is double what Gemma 3 offered.

**When to pick something else:** For raw coding or reasoning benchmarks, the larger MoE models (Qwen 3.5, GLM-5) still win decisively. For maximum math performance, Kimi K2.5 or Nemotron-Cascade 2 are in a different league. But if you need one model family that scales from phone to workstation under Apache 2.0, Gemma 4 has no real competitor.
