# Decisions

Record durable decisions that should affect future work.

## Decision Log

## 2026-05-01 - Structured model metadata is part of the public content contract

Project/system: AI Future Ready content schema and generated API.
Decision: Model records should expose structured fields for numeric pricing, capabilities, knowledge cutoff, availability/deprecation, tool schema format, confidence, and sources.
Reason: Agents need queryable routing data instead of prose-only metadata.
Consequences: `scripts/validate-content.ts` validates these optional model fields, and `scripts/generate-llms-txt.ts` surfaces them in generated JSON, pricing snapshots, schema output, and `llms-full.txt`.

## 2026-05-01 - OpenAPI is generated with the rest of the public API artifacts

Project/system: Public JSON API discovery.
Decision: Emit OpenAPI 3.1 at `/openapi.json` and `/api/v1/openapi.json` from `scripts/generate-llms-txt.ts`.
Reason: The API shape is generated from content artifacts, so a manually maintained OpenAPI file would drift.
Consequences: `/.well-known/ai.json`, `/api/v1/index.json`, API reference docs, sitemap, and smoke tests now include OpenAPI discovery.

## 2026-05-01 - Model filtering is a dynamic API route backed by generated data

Project/system: Public model selection API.
Decision: Implement model filtering at `/api/v1/models-filter.json` as a Next.js route handler that imports generated `src/lib/models-data.json`.
Reason: Agents need queryable model routing without downloading and filtering the full model index, while keeping route runtime compatible with generated build artifacts.
Consequences: The generator must keep `src/lib/models-data.json`, OpenAPI, discovery manifests, and docs in sync with the model summary shape.

## 2026-05-01 - Model diffing is a dynamic API route backed by generated data

Project/system: Public model comparison API.
Decision: Implement model-to-model diffing at `/api/v1/diff.json` as a Next.js route handler that imports generated `src/lib/models-data.json`.
Reason: Agents frequently answer "X vs Y" questions and should not have to reimplement comparison logic for pricing, benchmarks, capabilities, provenance, and routing metadata.
Consequences: The generated OpenAPI, discovery manifests, sitemap, API docs, and smoke tests include the diff endpoint; future model-summary field changes should consider whether the diff response should expose them.

## 2026-05-01 - Model cost calculation is a dynamic API route backed by generated data

Project/system: Public model planning API.
Decision: Implement token-cost estimation at `/api/v1/cost.json` as a Next.js route handler that imports generated `src/lib/models-data.json` and supports both GET query parameters and POST JSON bodies.
Reason: Agents need ranked budget estimates for concrete token workloads without reimplementing per-1M pricing math client-side.
Consequences: The generated OpenAPI, discovery manifests, sitemap, API docs, and smoke tests include the cost endpoint; pricing fields should remain numeric where possible so cost estimates do not rely on string parsing.
