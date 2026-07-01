<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Architecture: Agent-First Markdown Site

## Content
- All content lives in `content/` as pure markdown with YAML frontmatter
- `content/_index.md` is the master index
- Each content type has a `_index.md` and individual `.md` files
- Content types: models, agents, glossary, timeline, guides, use-cases, blog, pricing, api-reference, prompt-patterns

## Rendering
- `src/lib/content.ts` reads markdown from `content/`
- `src/lib/markdown.ts` renders markdown to HTML via remark
- `src/app/[type]/page.tsx` renders category indexes
- `src/app/[type]/[slug]/page.tsx` renders individual content
- Content pages should avoid client-side JavaScript. Interactive utilities (search, self-audit, homepage demos, mobile nav) may use client components. No React components are embedded in content.

## Agent Access
- Raw `.md` files served from `/content/` (via `public/content/`)
- `llms.txt` at `/llms.txt` provides machine-readable index
- JSON API at `/api/v1` returns structured content data
- Sitemap includes both HTML and raw markdown URLs

## Adding Content
To add new content, create a `.md` file in the appropriate `content/` subdirectory with YAML frontmatter, then copy it to `public/content/` and update `public/llms.txt`.

## Closeout / Update Protocol

When Brian says "update", "close out", or asks whether everything was captured — and after any meaningful project change — do a short closeout pass before the final response:

1. Verify the changed artifact with the repo's real check command when one exists. If no canonical check exists, run a focused ad-hoc verification and label it as ad-hoc.
2. Update local project memory when present: `agent-memory/TODO.md` for current/remaining tasks, `agent-memory/MEMORY.md` for durable project facts, `agent-memory/DECISIONS.md` for choices, `agent-memory/ARCHITECTURE.md` for structural changes, and `agent-memory/SESSION_LOG.md` only for brief session summaries.
3. Update relevant Vault notes only when the work changes durable project status, decisions, source material, or future operating context. Do not scan or reorganize the whole Vault unless Brian explicitly asks.
4. If Vault notes changed, refresh QMD when practical and verify retrieval for the changed material.
5. Commit coherent local changes after verification when the repo uses git. Do not push to a remote unless Brian explicitly asks.
6. Final response should be concise: what changed, what passed, commit IDs if any, and any blockers or intentionally untouched dirty files.
