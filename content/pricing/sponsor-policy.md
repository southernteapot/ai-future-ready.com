---
title: "Sponsor Policy"
type: pricing
id: "sponsor-policy"
description: "Disclosure and ranking rules for sponsorships, paid placements, affiliate links, referral links, and commercial relationships on AI Future Ready."
last_updated: "2026-04-24"
status: "draft"
tags:
- "sponsorship"
- "disclosure"
- "pricing"
- "trust"
- "commercial"
---

# Sponsor Policy

Sponsorship is allowed only if it is obvious to humans and visible to agents.

## Core Rule

Paid relationships must be disclosed in markdown and JSON. Paid relationships must not silently affect recommendation scores.

## Allowed

- clearly labeled page sponsorship
- clearly labeled newsletter sponsorship
- clearly labeled API sponsorship metadata
- clearly labeled referral or affiliate links
- clearly labeled "sponsored by" text

## Not Allowed

- unlabeled paid placement
- hidden ranking influence
- sponsored content presented as independent scoring
- affiliate links without disclosure
- provider-written claims without source labeling

## Required Metadata

```yaml
sponsored: true
sponsor: "Example Company"
ranking_influence: false
disclosure: "Paid sponsorship. Ranking score was not changed by sponsorship."
```

## Recommendation Scores

Recommendation scores should be based on task fit, pricing, deployment fit, and source-backed metadata. Sponsorship can pay for placement or visibility only when labeled; it cannot silently change score formulas.

## Agent Rule

Agents should ignore sponsorship as a quality signal. If sponsorship is present, mention it when summarizing why a page or recommendation appeared.

