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
- `scripts/generate-llms-txt.ts` also generates `src/lib/models-data.json` for the runtime model filter route.
- API docs and OpenAPI are generated from content/frontmatter shape rather than manually maintained.

## API Surface

- Discovery: `/.well-known/ai.json`, `/llms.txt`, `/llms-full.txt`, `/openapi.json`.
- API index: `/api/v1/index.json`.
- Versioned OpenAPI: `/api/v1/openapi.json`.
- Content schema: `/api/v1/schema.json`.
- Type indexes: `/api/v1/{type}.json`.
- Per-item JSON: `/api/v1/{type}/{slug}.json`.
- Model filter: `/api/v1/models-filter.json?capability=vision&availability_status=available`.
- Recommendations: `/api/v1/recommend.json` and `/api/v1/recommend/{task}.json`.
- Pricing snapshots: `/api/v1/pricing-snapshots.json`.
- Model verification: `/api/v1/model-verification.json`.
- Changes endpoint: `/api/v1/changes.json?since=YYYY-MM-DD&type=model`.
