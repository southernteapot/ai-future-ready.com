# AI Future Ready

AI Future Ready is Brian's agent-ready web standard and proof-of-concept site. It explains how websites can be structured so AI agents can read, navigate, cite, and act on them reliably.

## Current direction

The site is a public standard + manual audit funnel:

- `/checklist` — agent-ready website checklist and maturity model
- `/standard` — technical companion standard
- `/request-audit` — audit intake path
- `/pricing/agent-readiness-audit` — scoped audit offer and introductory pricing
- `/llms.txt`, `/llms-full.txt`, `/openapi.json`, `/api/v1/*`, raw `/content/*.md`, feeds, and `/status` — machine-readable proof-of-concept layer

Cloudflare Email Routing is configured so `support@ai-future-ready.com` forwards to Brian's Gmail. The next business move is outreach: identify likely first audit targets or send one warm audit note.

## Development

```bash
npm install
npm run dev
```

Useful checks:

```bash
npm run validate:content
npm run lint
npm run build
npm run test:smoke
npm run verify
```

## Architecture notes

- Next.js 16, React 19, Tailwind v4, Cloudflare/OpenNext.
- Content lives in `content/` as Markdown with YAML frontmatter.
- Public machine-readable content is generated/copied into `public/content/` plus `public/llms.txt`.
- Do not hand-edit generated artifacts unless deliberately patching before generator support.
- Before writing Next.js code, read the relevant docs in `node_modules/next/dist/docs/`; this project is on a newer Next.js than most training data.

See `AGENTS.md` and `agent-memory/` for project-specific agent guidance.
