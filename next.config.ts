import type { NextConfig } from "next";

const isDevelopment = process.env.NODE_ENV !== "production";

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  isDevelopment
    ? "connect-src 'self' ws: http://localhost:* http://127.0.0.1:*"
    : "connect-src 'self'",
  "font-src 'self'",
  "frame-ancestors 'none'",
  "img-src 'self' data: https:",
  "object-src 'none'",
  isDevelopment
    ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
    : "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
].join("; ");

// Content types with pages at /[type] and /[type]/[slug].
// Keep in sync with the directories under content/ (validate-content checks types).
const CONTENT_TYPES =
  "models|agents|providers|comparisons|guides|use-cases|prompt-patterns|blog|glossary|timeline|pricing|api-reference|standard|checklist";

// Standalone content pages served at /[page] with markdown at /content/[page].md.
const ROOT_CONTENT_PAGES = "about|changelog|compatibility|contact|mcp";

// Matches requests that explicitly ask for markdown (agents), never browsers.
const ACCEPTS_MARKDOWN = {
  type: "header" as const,
  key: "accept",
  value: ".*text/markdown.*",
};

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/content",
        destination: "/content/_index.md",
        permanent: false,
      },
      {
        source: "/tools/prompts",
        destination: "/prompt-patterns",
        permanent: true,
      },
      // ── Markdown front door ─────────────────────────────────────
      // 1) `.md` suffix aliases: /models/foo.md → /content/models/foo.md
      //    The Location header teaches agents the canonical /content/ mapping.
      {
        source: "/index.md",
        destination: "/content/_index.md",
        permanent: false,
      },
      {
        source: `/:page(${ROOT_CONTENT_PAGES}).md`,
        destination: "/content/:page.md",
        permanent: false,
      },
      {
        source: `/:type(${CONTENT_TYPES}).md`,
        destination: "/content/:type/_index.md",
        permanent: false,
      },
      {
        source: `/:type(${CONTENT_TYPES})/:slug.md`,
        destination: "/content/:type/:slug.md",
        permanent: false,
      },
      // 2) Content negotiation: Accept: text/markdown on a canonical HTML URL
      //    redirects to the raw markdown for that page.
      {
        source: "/",
        has: [ACCEPTS_MARKDOWN],
        destination: "/content/_index.md",
        permanent: false,
      },
      {
        source: `/:page(${ROOT_CONTENT_PAGES})`,
        has: [ACCEPTS_MARKDOWN],
        destination: "/content/:page.md",
        permanent: false,
      },
      {
        source: `/:type(${CONTENT_TYPES})`,
        has: [ACCEPTS_MARKDOWN],
        destination: "/content/:type/_index.md",
        permanent: false,
      },
      {
        source: `/:type(${CONTENT_TYPES})/:slug`,
        has: [ACCEPTS_MARKDOWN],
        destination: "/content/:type/:slug.md",
        permanent: false,
      },
    ];
  },
  async headers() {
    // NOTE: on Cloudflare Workers these only reach worker-rendered responses
    // (HTML pages, dynamic API routes). Static assets (public/) are served
    // before the worker runs and get their headers from public/_headers —
    // keep the two in sync. These entries still matter for `next dev`/`next start`.
    const machineHeaders = [
      { key: "X-Robots-Tag", value: "noindex, follow" },
      { key: "Access-Control-Allow-Origin", value: "*" },
      {
        key: "Cache-Control",
        value: "public, max-age=3600, stale-while-revalidate=86400",
      },
    ];
    return [
      {
        source: "/content/:path*",
        headers: machineHeaders,
      },
      {
        source: "/api/v1/:path*",
        headers: machineHeaders,
      },
      {
        source: "/llms.txt",
        headers: machineHeaders,
      },
      {
        source: "/llms-full.txt",
        headers: machineHeaders,
      },
      {
        source: "/search-index.json",
        headers: machineHeaders,
      },
      {
        source: "/openapi.json",
        headers: machineHeaders,
      },
      {
        source: "/.well-known/:path*",
        headers: machineHeaders,
      },
      {
        source: "/feed.json",
        headers: machineHeaders,
      },
      {
        source: "/feed.xml",
        headers: machineHeaders,
      },
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: contentSecurityPolicy },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
        ],
      },
    ];
  },
};

export default nextConfig;
