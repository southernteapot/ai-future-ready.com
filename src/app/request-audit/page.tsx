import type { Metadata } from "next";
import Link from "next/link";
import AuditIntake from "@/components/AuditIntake";
import { buildPageMetadata } from "@/lib/metadata";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export const metadata: Metadata = buildPageMetadata({
  title: "Request an Agent Readiness Audit",
  description:
    "Request a fixed-scope Agent Readiness Audit. A short self-assessment and intake form that sends your details straight to the audit team — no account or checkout required.",
  path: "/request-audit",
});

export default function RequestAuditPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Request an Agent Readiness Audit",
            description:
              "Self-assessment and intake form to request an Agent Readiness Audit.",
            url: `${SITE_URL}/request-audit`,
          }),
        }}
      />

      <h1>
        <span className="agent-marker"># </span>Request an audit
      </h1>
      <p>
        Tell us about your site and what you want agents to be able to do. The
        form fills in a structured request and opens your email client addressed
        to the audit team — there is no account, login, or checkout.
      </p>
      <p>
        New here? Review the{" "}
        <Link href="/pricing/agent-readiness-audit">audit offer and pricing</Link>{" "}
        and the{" "}
        <Link href="/pricing/sample-audit-report">sample report</Link> first, so
        you know exactly what you get.
      </p>

      <AuditIntake />
    </div>
  );
}
