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
    <div>
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

      <h1>
        <span className="agent-marker"># </span>Agent-readiness self-audit
      </h1>
      <p>
        Ten questions. For each criterion, choose yes, partial, or no based on
        your site&apos;s current state. Partial credit counts.
      </p>

      <SelfAudit />
    </div>
  );
}
