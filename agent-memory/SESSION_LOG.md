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
