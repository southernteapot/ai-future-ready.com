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
