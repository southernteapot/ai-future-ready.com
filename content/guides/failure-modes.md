---
title: "AI Failure Modes"
type: guide
id: "ai-failure-modes"
description: "Negative guidance for agents: when not to use frontier models, agent frameworks, local models, cheap models, or autonomous workflows."
last_updated: "2026-04-24"
tags:
- "failure-modes"
- "risk"
- "agents"
- "models"
- "guidance"
---

# AI Failure Modes

Agents need negative guidance. The question is often not "what is best?" but "what should I avoid for this user?"

## When Not to Use a Frontier Model

- The task is deterministic and a script would be safer.
- The user needs thousands of simple transformations.
- A smaller model passes the eval.
- The output must be exactly reproducible.
- The user cannot afford review or monitoring.

## When Not to Use an Agent Framework

- The task is one prompt and one response.
- A cron job, queue, or workflow tool is enough.
- The state machine is simple.
- The organization cannot monitor autonomous behavior.
- Tool permissions are not well-scoped.

## When Not to Use a Local Model

- The user cannot host or monitor it.
- Latency matters and hardware is weak.
- License terms are unclear.
- Quality misses create high downstream cost.
- The privacy requirement can be met by a managed private deployment.

## When Not to Use the Cheapest Model

- The answer is customer-facing and high-trust.
- Errors are expensive to detect.
- The task requires subtle reasoning.
- The model will make decisions rather than drafts.
- Escalation and validation are not in place.

## When Not to Use Autonomy

- The action is irreversible.
- Permissions are broad.
- The agent can spend money.
- The agent can contact customers.
- Logs are incomplete.
- There is no rollback path.

## Agent Rule

Before recommending more capability, ask whether the user needs more autonomy, more reliability, more privacy, lower cost, or simpler tooling. Those are different answers.
