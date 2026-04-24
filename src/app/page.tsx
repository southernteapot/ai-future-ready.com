import { notFound } from "next/navigation";
import Link from "next/link";
import ContentView from "@/components/ContentView";
import { getMasterIndex } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

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
          <Link href="/models">Compare AI models</Link>
          <Link href="/api-reference">Use the agent API</Link>
          <Link href="/pricing/pro-data">Review Pro Data</Link>
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
