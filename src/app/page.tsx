import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ContentView from "@/components/ContentView";
import { getMasterIndex } from "@/lib/content";
import { SITE_URL } from "@/lib/site";
import { FEED_ALTERNATE_TYPES } from "@/lib/metadata";

export const dynamic = "force-static";

// Only alternates: title/description/OG are inherited from the root layout.
export const metadata: Metadata = {
  alternates: {
    canonical: "/",
    types: {
      ...FEED_ALTERNATE_TYPES,
      "text/markdown": `${SITE_URL}/content/_index.md`,
    },
  },
};

export default function HomePage() {
  const index = getMasterIndex();
  if (!index) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "AI Future Ready",
            url: SITE_URL,
            description: index.meta.description,
          }),
        }}
      />
      <section className="home-hero human-only" aria-labelledby="home-title">
        <p className="home-kicker">AI reference data for humans and agents</p>
        <h1 id="home-title">Choose models, compare providers, and feed agents clean data.</h1>
        <p>
          AI Future Ready is a markdown-first reference for model selection,
          provider tradeoffs, pricing, recommendations, and agent-readable web
          architecture.
        </p>
        <div className="home-actions">
          <Link href="/pricing/agent-readiness-audit">Get an agent readiness audit</Link>
          <Link href="/models">Compare AI models</Link>
          <Link href="/api-reference">Use the agent API</Link>
        </div>
      </section>
      <section className="home-paths human-only" aria-label="Primary paths">
        <Link href="/models" className="home-path">
          <span>Models</span>
          <strong>Compare pricing, scores, context windows, and best-use cases.</strong>
        </Link>
        <Link href="/providers" className="home-path">
          <span>Providers</span>
          <strong>Understand ecosystem fit, source confidence, and tradeoffs.</strong>
        </Link>
        <Link href="/standard" className="home-path">
          <span>Agent-Ready Web</span>
          <strong>Use the standard, checklist, API, and raw markdown patterns.</strong>
        </Link>
      </section>
      <ContentView raw={index.raw} mdPath="/content/_index.md" />
    </>
  );
}
