---
title: "Choose a Model for Customer Support"
type: guide
id: "choose-model-for-customer-support"
description: "A practical recipe for choosing models and guardrails for customer support automation, routing, drafting, retrieval, and escalation."
last_updated: "2026-04-24"
tags:
- "recipe"
- "customer-support"
- "models"
- "retrieval"
- "risk"
---

# Choose a Model for Customer Support

Customer support is not just a chat model. It is retrieval, policy, escalation, logging, and user trust.

## Recommended Pattern

Use retrieval plus a mid-to-strong model for answers. Use cheaper models for classification, routing, tagging, and summarization.

## Model Selection

| Support task | Model type |
|--------------|------------|
| Ticket routing | Cheap fast model |
| Drafting replies | Mid-tier strong writing model |
| Complex account issue | Strong reasoning model plus human review |
| Policy questions | Retrieval-grounded model |
| Summarizing threads | Cheap or mid-tier summarization model |
| Customer-facing final answer | Stronger model with guardrails |

## Required Guardrails

- Retrieval from approved docs
- No unsupported policy claims
- Escalation path
- Conversation logging
- Human review for refunds, legal, safety, or account closure
- Redaction for sensitive data

## Agent Workflow

1. Classify support risk.
2. Pick cheapest acceptable model for low-risk internal steps.
3. Use stronger model for customer-facing final text.
4. Require retrieval citations or policy references.
5. Escalate uncertain cases.

## Failure Mode

The common mistake is letting the model answer from memory. Support agents should answer from the company's current docs, policies, and account context.
