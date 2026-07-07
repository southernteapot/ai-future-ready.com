# Architecture

This file explains the project structure and technical architecture.

## Current Status

Next.js 16 app with file-based Markdown content and generated static machine-readable artifacts.

## Stack

- Framework: Next.js 16.2.2 using the App Router.
- Package manager: npm.
- Build command: `npm run build`.
- Dev command: `npm run dev`.
- Lint command: `npm run lint`.
- Content validation: `npm run validate:content`.
- Smoke tests: `npm run test:smoke`.

## Important Directories

- `content/`: Markdown source of truth with YAML frontmatter.
- `public/content/`: generated raw Markdown copy served publicly.
- `public/api/v1/`: generated public JSON API artifacts.
- `src/app/`: Next.js routes and pages.
- `src/lib/`: content loading, metadata helpers, generated content/change data.
- `scripts/`: content generation, validation, smoke testing, and MCP server.

## Generation Pipeline

- `npm run build` runs `prebuild`, which runs content validation and `scripts/generate-llms-txt.ts`.
- `scripts/generate-llms-txt.ts` generates `llms.txt`, `llms-full.txt`, `search-index.json`, `feed.json`, `feed.xml`, `sitemap.xml`, `robots.txt`, `public/.well-known/ai.json`, `src/lib/content-data.json`, `src/lib/changes-data.json`, and `public/api/v1/*`.
- `scripts/generate-llms-txt.ts` generates `public/api/v1/status.json` and `src/lib/status-data.json` for operational status, freshness, internal-link health, and source metadata coverage.
- `scripts/generate-llms-txt.ts` also generates `src/lib/models-data.json` for runtime model filter, diff, and cost routes, and `src/lib/search-data.json` for the runtime search route.
- API docs and OpenAPI are generated from content/frontmatter shape rather than manually maintained.
- `public/_headers` (Workers static assets format) sets CORS/X-Robots-Tag/Cache-Control for asset-served paths; `next.config.ts` headers() mirrors the same set for worker-rendered responses and `next dev`/`next start`. Keep both in sync.
- `next.config.ts` redirects implement the markdown front door: `.md` suffix aliases and `Accept: text/markdown` negotiation (307 → `/content/...`); `src/lib/api-headers.ts` provides the shared preflight OPTIONS response.

## API Surface

- Discovery: `/.well-known/ai.json`, `/llms.txt`, `/llms-full.txt`, `/openapi.json`.
- API index: `/api/v1/index.json`.
- Versioned OpenAPI: `/api/v1/openapi.json`.
- Status: `/status` and `/api/v1/status.json`.
- Content schema: `/api/v1/schema.json`.
- Ranked search: `/api/v1/search.json?q=cheap+coding+model&type=model&limit=10`.
- Markdown from canonical URLs: `/{page}.md` alias and `Accept: text/markdown` both 307-redirect to the `/content/` path; HTML pages carry `<link rel="alternate" type="text/markdown">`.
- Type indexes: `/api/v1/{type}.json`.
- Per-item JSON: `/api/v1/{type}/{slug}.json`.
- Model filter: `/api/v1/models-filter.json?capability=vision&availability_status=available`.
- Model diff: `/api/v1/diff.json?a=gpt-5.4&b=claude-opus-4.6`.
- Model cost: `/api/v1/cost.json?input_tokens=1000000&output_tokens=1000000` or `POST /api/v1/cost.json`.
- Recommendations: `/api/v1/recommend.json` and `/api/v1/recommend/{task}.json`.
- Pricing snapshots: `/api/v1/pricing-snapshots.json`.
- Model verification: `/api/v1/model-verification.json`.
- Changes endpoint: `/api/v1/changes.json?since=YYYY-MM-DD&type=model`.

- Public deployment: Cloudflare Workers via OpenNext (`wrangler.jsonc`, `open-next.config.ts`). Deployed automatically by desktop timer `cf-autodeploy.timer` (polls GitHub every 5 min; on new commits: pull → build → `wrangler deploy`; log at `~/.local/state/cf-autodeploy.log`). CI workflow `.github/workflows/deploy.yml` exists but is manual-only (no CLOUDFLARE_API_TOKEN secret set).
