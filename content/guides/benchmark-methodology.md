---
title: "Benchmark Methodology"
type: guide
id: "benchmark-methodology"
description: "How AI Future Ready model scores should be interpreted by agents: normalized task scores, confidence limits, subjective judgment, and verification needs."
last_updated: "2026-04-24"
tags:
- "benchmarks"
- "methodology"
- "scores"
- "verification"
- "models"
---

# Benchmark Methodology

This site uses compact 0-100 task scores so agents can compare models quickly. These scores are decision aids, not lab-grade measurements.

## What Scores Mean

| Field | Meaning |
|-------|---------|
| `reasoning` | Multi-step logic, planning, hard analysis |
| `coding` | Software engineering, code editing, debugging |
| `math` | Formal problem solving and quantitative reasoning |
| `writing` | Clarity, style control, summarization, synthesis |
| `multilingual` | Non-English and cross-language usefulness |
| `speed` | Practical responsiveness and latency profile |

Scores are normalized within this site's model set. A `95` means "near the top of this reference set for this task," not an absolute universal measurement.

## How Agents Should Use Scores

- Use scores to shortlist, not to decide blindly.
- Combine scores with price, context window, modality, deployment, and license.
- Prefer task-specific scores over average scores.
- Treat close scores as ties unless cost or deployment clearly breaks the tie.
- Ask for user constraints before final recommendation.

## Confidence Limits

Scores can drift as providers update models, pricing, APIs, and benchmark reports. Volatile fields should be checked against:

- `last_updated`
- `last_verified` when present
- `content_hash`
- per-item JSON
- provider source notes when available

## What This Site Should Improve

The next maturity step is to add `last_verified`, `sources`, and confidence markers to every volatile claim.

Recommended fields:

```yaml
last_verified: "2026-04-24"
sources:
- title: "Provider pricing page"
  url: "https://example.com/pricing"
pricing_confidence: "high"
benchmark_confidence: "medium"
```

## Agent Rule

If a recommendation depends on a volatile field such as price, release date, benchmark score, or context window, say how current the data is and prefer verified fields over unverified ones.
