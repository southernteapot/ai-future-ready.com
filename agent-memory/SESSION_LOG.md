# Session Log

Use this file for short session summaries only.

Do not paste raw terminal logs here.

## Sessions

## 2026-05-01 - Agent-readiness audit implementation

- Reviewed Claude Code's audit and prioritized high-impact structured-data gaps.
- Added validated model metadata fields for numeric pricing, capabilities, knowledge cutoffs, availability/deprecation, tool schema formats, confidence, and sources.
- Backfilled all 33 model records with capabilities and source metadata; corrected several stale pricing/status/license/context facts while keeping weaker claims marked low-confidence or unverified.
- Updated generated API outputs, pricing snapshots, schema output, `llms-full.txt`, discovery artifacts, and smoke tests.
- Added generated OpenAPI 3.1 at `/openapi.json` and `/api/v1/openapi.json`.
- Created commits:
  - `7ea930e Add structured model metadata`
  - `38f1abf Add OpenAPI spec for public API`
- Validation passed: `npm run build`, `npm run lint`, `npm run test:smoke`.

## 2026-05-01 - Model filter endpoint

- Added `/api/v1/models-filter.json` for queryable model filtering by capability, provider, availability status, deprecated flag, model type, tool schema format, context minimum, input/output price ceiling, and free/open-weight status.
- Added generated `src/lib/models-data.json` so the dynamic route can use the generated model summaries without reading from `public/` at runtime.
- Updated OpenAPI, `/.well-known/ai.json`, `/api/v1/index.json`, API reference docs, sitemap, and smoke tests for the filter endpoint.
- Validation passed: `npm run build`, `npm run lint`, `npm run test:smoke`.

## 2026-05-01 - Model diff endpoint

- Added `/api/v1/diff.json?a=...&b=...` for structured model-to-model comparison by metadata, context window, numeric pricing, benchmarks, capabilities, modality, confidence, and sources.
- Updated OpenAPI, `/.well-known/ai.json`, `/api/v1/index.json`, sitemap, API reference docs, agent usage docs, and smoke tests for the diff endpoint.
- Validation passed: `npm run validate:content`, `npm run build`, `npm run lint`, `npm run test:smoke`.

## 2026-05-01 - Model cost endpoint

- Added `/api/v1/cost.json` for ranked token-cost estimates across model records, with both GET query parameters and POST JSON bodies.
- Cost responses include per-component token counts, USD-per-1M price sources, estimated cost, missing price components, pricing confidence, and availability metadata.
- Updated OpenAPI, `/.well-known/ai.json`, `/api/v1/index.json`, sitemap, API reference docs, agent usage docs, and smoke tests for the cost endpoint.
- Validation passed: `npm run validate:content`, `npm run build`, `npm run lint`, `npm run test:smoke`.

## 2026-05-01 - Status reporting

- Added generated `/api/v1/status.json` and `src/lib/status-data.json` with build timestamp, content freshness by type, internal-link health, and source metadata coverage.
- Added `/status` as a static page that shows raw JSON in agent mode and a human-readable status view in human mode.
- Updated OpenAPI, `/.well-known/ai.json`, `/api/v1/index.json`, API reference docs, agent usage docs, sitemap, navigation, and smoke tests for status reporting.
- Validation passed: `npm run validate:content`, `npm run build`, `npm run lint`, `npm run test:smoke`.
