import type { NextConfig } from "next";

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "connect-src 'self'",
  "font-src 'self'",
  "frame-ancestors 'none'",
  "img-src 'self' data: https:",
  "object-src 'none'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
].join("; ");

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
    ];
  },
  async headers() {
    return [
      {
        source: "/content/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }],
      },
      {
        source: "/api/v1/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }],
      },
      {
        source: "/llms.txt",
        headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }],
      },
      {
        source: "/llms-full.txt",
        headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }],
      },
      {
        source: "/search-index.json",
        headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }],
      },
      {
        source: "/feed.json",
        headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }],
      },
      {
        source: "/feed.xml",
        headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }],
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
