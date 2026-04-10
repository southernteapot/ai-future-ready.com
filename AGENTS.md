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
- No client-side JavaScript. No React components embedded in content.

## Agent Access
- Raw `.md` files served from `/content/` (via `public/content/`)
- `llms.txt` at `/llms.txt` provides machine-readable index
- JSON API at `/api/v1` returns structured content data
- Sitemap includes both HTML and raw markdown URLs

## Adding Content
To add new content, create a `.md` file in the appropriate `content/` subdirectory with YAML frontmatter, then copy it to `public/content/` and update `public/llms.txt`.
