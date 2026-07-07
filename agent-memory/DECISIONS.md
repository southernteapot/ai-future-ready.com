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

## 2026-05-01 - Status reporting is generated from the content inventory

Project/system: Public operational status and trust reporting.
Decision: Generate `/api/v1/status.json` and `src/lib/status-data.json` from `scripts/generate-llms-txt.ts`, then render `/status` from the generated data.
Reason: Freshness, broken internal links, and source metadata coverage should come from the same content graph as the public API instead of a manually maintained status page.
Consequences: Status reports build timestamp, content freshness by type, internal-link health, and source URL structural validity. It intentionally does not perform external HTTP health checks during build.

## 2026-07-03 - Markdown must be reachable from canonical URLs

Project/system: Agent access layer and the Agent-Ready Web Standard.
Decision: Serve raw markdown from every canonical page URL via `.md` suffix aliases and `Accept: text/markdown` content negotiation, implemented as 307 redirects in `next.config.ts` (path patterns + `has` header matching), plus `<link rel="alternate" type="text/markdown">` on every content page. The redirect (rather than serving bytes directly) deliberately teaches agents the canonical `/content/` mapping via the Location header and avoids content-negotiation cache ambiguity.
Reason: Agents arrive at canonical URLs from search results and citations; the parallel `/content/` tree was undiscoverable from there. Raw markdown is ~10x cheaper in tokens than the HTML page.
Consequences: Content-type and root-page allowlists live in `next.config.ts` and must be extended when a new content type or standalone page is added; smoke tests cover aliases, negotiation, and the browser-Accept non-redirect case; the standard and checklist were bumped to v0.2 with these as criteria.

## 2026-07-03 - Static-asset headers come from public/_headers, not next.config

Project/system: Cloudflare Workers deployment.
Decision: Set CORS (`Access-Control-Allow-Origin: *`), `X-Robots-Tag: noindex, follow`, and `Cache-Control: public, max-age=3600, stale-while-revalidate=86400` for `/content/`, `/api/`, llms files, feeds, search index, OpenAPI, and `/.well-known/` via a `public/_headers` file (Workers static assets format). Keep the same header set in `next.config.ts` headers() for worker-rendered responses and dev parity.
Reason: Discovered in production that next.config headers() never reach static assets on Cloudflare — assets are served before the worker runs. The intended noindex protection was silently absent, and CORS could not be fixed at the Next layer alone.
Consequences: The two header sources must be kept in sync manually; `_headers` ships into `.open-next/assets/` at build; wrangler dev is the authoritative local check for asset-layer behavior. Dynamic API routes additionally export OPTIONS (shared helper in `src/lib/api-headers.ts`) for browser preflight.

## 2026-07-03 - Search is a dynamic route over generator-emitted data

Project/system: Public query API.
Decision: Implement `/api/v1/search.json` (params `q`, `type`, `limit`) as a Next route handler importing `src/lib/search-data.json`, which the generator writes from the exact same array as `public/search-index.json`. All-terms-must-match scoring over title/id/tags/provider/description/section.
Reason: Agents should get one-call ranked answers instead of downloading the 240KB static index and implementing matching; emitting the same array twice guarantees shape parity between static and dynamic search.
Consequences: OpenAPI, ai.json, index.json, agent-usage guide, api-reference, and smoke tests include search; the static index remains for offline/local-matching use cases; search results carry token_estimate so agents can budget follow-up fetches.
- 2026-07-06: Deploy to Cloudflare Workers with desktop-driven auto-deploy (not GitHub Actions) so trip-time merges go live without CI secrets; desktop is always-on.

## 2026-07-07 - Generated timestamps derive from content dates, not the wall clock

Project/system: Data generator (`scripts/generate-llms-txt.ts`) and cf-autodeploy pipeline.
Decision: `GENERATED_DATE` is the latest declared frontmatter date across all content (`last_updated`, `last_verified`, `date`, `release_date`); `BUILD_TIMESTAMP` defaults to `${GENERATED_DATE}T00:00:00.000Z` (BUILD_TIMESTAMP env override retained). `age_days` and stale counts therefore measure staleness relative to the freshest content edit rather than build time.
Reason: Wall-clock stamps regenerated ~130 tracked JSON files on every build, dirtying the tree and eventually blocking cf-autodeploy's fast-forward `git pull` (this broke claimreadytx and resume-ready). Content-declared dates were chosen over `git log -1` of the content dir because committing regenerated output moves the commit date and would re-dirty the tree on the next timer build. Render-time freshness was rejected: `age_days` is not displayed to visitors and `/api/v1/status.json` is a static artifact, so it would have forced static endpoints to become dynamic routes.
Consequences: Rebuilding unchanged inputs is byte-identical (verified). `generated_at` now reads as a "data as of" date; if all content goes untouched, items never cross the stale threshold on their own. Any future generator output must avoid `new Date()`/`Date.now()` in committed artifacts.
