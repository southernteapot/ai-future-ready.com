import type { Metadata } from "next";
import SelfAudit from "@/components/SelfAudit";
import { buildPageMetadata } from "@/lib/metadata";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export const metadata: Metadata = buildPageMetadata({
  title: "Score Your Site — Agent-Ready Self-Audit",
  description:
    "Evaluate your website's agent-readiness in two minutes. Ten criteria, a maturity level, prioritized fixes, and a clear next step.",
  path: "/score",
});

export default function ScorePage() {
  return (
    <div className="space-y-8 max-w-2xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Agent-Ready Self-Audit",
            description:
              "Evaluate your website's agent-readiness across 10 criteria.",
            url: `${SITE_URL}/score`,
          }),
        }}
      />

      <section className="space-y-3 pt-4">
        <h1 className="text-2xl font-bold text-white">
          Agent-readiness self-audit
        </h1>
        <p className="text-sm text-neutral-400 leading-relaxed">
          Ten questions. Two minutes. For each criterion, choose
          <strong className="text-white"> yes</strong>,
          <strong className="text-white"> partial</strong>, or
          <strong className="text-white"> no</strong> based on your
          site&rsquo;s current state. Be honest — partial credit counts.
        </p>
        <p className="text-sm text-neutral-400 leading-relaxed">
          Your results: an overall score, your maturity level, what
          you&rsquo;re doing well, your top prioritized fixes, and
          what to do next.
        </p>
      </section>

      <SelfAudit />
    </div>
  );
}
