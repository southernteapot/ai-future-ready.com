import type { Metadata } from "next";
import SelfAudit from "@/components/SelfAudit";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Score Your Site — Agent-Ready Self-Audit",
  description:
    "Ten questions, two minutes. Find out where your website stands on the agent-readiness maturity model — from scrape-only to agent-native.",
};

export default function ScorePage() {
  return (
    <div className="space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Agent-Ready Self-Audit",
            description:
              "Score your website's agent-readiness across 10 criteria.",
            url: "https://aifutureready.com/score",
          }),
        }}
      />

      <section className="space-y-3 pt-4">
        <h1 className="text-2xl font-bold text-white">
          Score your site
        </h1>
        <p className="text-sm text-neutral-400 max-w-2xl leading-relaxed">
          Ten questions about your website&rsquo;s agent-readiness. Answer
          honestly — partial credit counts. Takes two minutes. Your results
          include your maturity level, specific gaps, and what to do next.
        </p>
      </section>

      <SelfAudit />
    </div>
  );
}
