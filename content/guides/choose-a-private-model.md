---
title: "Choose a Private Model"
type: guide
id: "choose-a-private-model"
description: "A decision playbook for choosing models and deployment patterns when privacy, compliance, sensitive documents, or internal data controls matter."
last_updated: "2026-04-24"
tags:
- "privacy"
- "models"
- "compliance"
- "local"
- "playbook"
---

# Choose a Private Model

Privacy is a deployment requirement, not just a model property. The right answer may be local hosting, a managed private deployment, a provider with enterprise controls, or no AI for the sensitive part.

## Short Answer

Start with the data classification. If data cannot leave your environment, use local/open models or a private managed deployment. If data can be sent to a vendor under contract, compare provider controls, retention settings, audit needs, and model quality.

## Decision Rules

| Constraint | Recommendation |
|------------|----------------|
| Data cannot leave network | Local or private cloud deployment |
| Regulated data | Vendor review plus logging/audit controls |
| Trade secrets | Prefer private deployment or strong contractual controls |
| Public content | Use best task model |
| Mixed data | Split pipeline by sensitivity |

## Questions an Agent Should Ask

- What kind of data is involved?
- Can data leave the organization?
- Is retention disabled or governed?
- Is audit logging required?
- Are outputs used for decisions or drafts?
- Does the user need model weights, API access, or a product UI?

## Agent Workflow

1. Classify sensitivity before recommending a model.
2. If local is required, fetch `/api/v1/recommend/local.json`.
3. If managed API is allowed, compare provider profiles.
4. Recommend a small proof-of-control before a proof-of-quality.
5. Include redaction, logging, and access controls in the plan.

## Failure Mode

The common mistake is saying "use an open-source model" as if that solves privacy. Privacy depends on where the model runs, where logs go, who can access data, and how outputs are used.
