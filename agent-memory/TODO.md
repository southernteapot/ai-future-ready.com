# TODO

Track current project tasks here. This is a practical Kanban board for moving AI Future Ready toward a paid audit offer, not a giant wishlist.

## Goals

### Goal 1 — Turn the site into a paid audit funnel
- Outcome: a visitor understands the "agent-ready website" problem, sees the checklist, and can request a manual audit.
- Success signal: at least 1 serious audit inquiry or warm intro request.

### Goal 2 — Make the audit offer concrete
- Outcome: a clearly scoped audit product with deliverables, price range, turnaround, and boundaries.
- Success signal: Brian can send one link to someone and say, "This is what I offer."

### Goal 3 — Keep the site credible as proof-of-concept
- Outcome: machine-readable endpoints, content freshness, OpenAPI, feeds, and status reporting stay correct.
- Success signal: `npm run verify` passes and `/status` shows no embarrassing drift.

### Goal 4 — Avoid content swamp
- Outcome: add only content that supports the audit funnel, agent-readiness standard, or technical proof.
- Success signal: no generic AI news/blog treadmill.

## Kanban

### Now

- [ ] Pick one real warm target and fill in name, URL, and specific reason in `marketing/first-audit-outreach-2026-06-22.md`.
- [ ] Send or tailor the short direct outreach note from `marketing/first-audit-outreach-2026-06-22.md`.
- [ ] If momentum is good, fill the remaining target slots in the worksheet.

### Next

- [ ] Scorecard API: automate the deterministic checklist checks as GET /api/v1/score?url=... (SSRF guards, rate limiting, cache). Converts the checklist into an agent tool and an audit lead magnet.
- [ ] Hosted remote MCP server (Streamable HTTP on Cloudflare, tools mirroring the API: search, get, filter, diff, cost, changes, recommend). Promoted from Later — it is the flagship agent-native proof and now unblocked by the query layer.
- [ ] Agent-completable audit intake: POST /api/v1/audit-request that emails support@ via Cloudflare (mailto form stays as human path).
- [ ] Review/adjust the introductory audit pricing set on 2026-06-10 ($750 site / $2,500 docs / implementation from $2,000).

### Later

- [ ] Turn repeated manual audit findings into a productized self-serve assessment.
- [ ] Build a public gallery of agent-ready examples and teardown notes.
- [ ] Consider a small paid implementation package after at least one manual audit validates demand.
- [ ] Consider a formal content license choice (e.g. CC-style vs custom) — usage_policy in ai.json currently describes practice without naming a license.

### Done / parked

- [x] 2026-07-03: Pushed (1a11a7a) and verified all agent-access behaviors on production: _headers (ACAO/X-Robots-Tag/Cache-Control on static assets), .md alias + Accept negotiation redirects, browser Accept unaffected, search endpoint ranking, preflight, 304 revalidation, alternate links, llms.txt notes, ai.json usage_policy.
- [x] 2026-07-03: Agent-access hardening — markdown reachable from canonical URLs (.md suffix + Accept: text/markdown negotiation + rel=alternate links), CORS + cache headers + X-Robots-Tag actually applied to static assets via public/_headers (next.config headers never reached them in prod), /api/v1/search.json ranked search, usage_policy + markdown_access in ai.json, token_estimate on all items, llms.txt access notes, standard/checklist bumped to v0.2. verify green; behaviors confirmed through wrangler dev.
- [x] 2026-07-03 (was: Consider explicit cache headers / ETag documentation): explicit Cache-Control everywhere, 304 revalidation verified, If-None-Match documented in agent-usage guide.
- [x] 2026-06-21: Provisioned and externally verified Cloudflare Email Routing for `ai-future-ready.com`; route `support@ai-future-ready.com` forwards to verified destination `bdclark1@gmail.com`; catch-all remains disabled/drop. Wrangler reports routing enabled/status ready. A self-test from Brian's Gmail was deduplicated by Gmail, but an external test from Samantha's email landed successfully.
- [x] 2026-06-19: Made the audit requestable end-to-end — added /request-audit self-assessment + intake form (mailto to support@ai-future-ready.com with copy fallback), replaced "coming soon" on /contact, pointed homepage + standard + pricing CTAs at the audit offer. verify green, /status no drift.
- [x] 2026-06-10: Defined the first paid audit offer (packages, prices, turnaround, boundaries on /pricing/agent-readiness-audit).
- [x] 2026-06-10: Created sample audit report at /pricing/sample-audit-report.
- [x] 2026-06-10: Freshness sweep — added Fable 5, Opus 4.8, Opus 4.7, GPT-5.5; fixed dangling superseded_by refs and wrong GPT-5.4 price; validator now rejects unknown superseded_by/variant_of ids.
- [x] Repositioned project from AI reference wiki to agent-ready web standard + proof-of-concept.
- [x] Added structured model metadata, OpenAPI discovery, filtering, diffing, costing, and status reporting.

- [ ] Make the data generator deterministic (stop stamping generated_at/age_days into ~130 committed JSON files) so builds don't dirty the tree and risk blocking cf-autodeploy pulls (flagged 2026-07-07 fleet audit).
