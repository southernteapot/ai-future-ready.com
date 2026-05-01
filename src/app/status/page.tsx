import type { Metadata } from "next";
import Link from "next/link";
import statusData from "@/lib/status-data.json";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Operational Status",
  description:
    "Build freshness, content freshness, internal-link health, and source metadata coverage for AI Future Ready.",
};

type ContentFreshness = {
  type: string;
  count: number;
  latest_last_updated: string | null;
  oldest_last_updated: string | null;
  stale_after_days: number;
  stale_count: number;
  verified_count: number;
  verification_coverage: number;
};

type StatusData = {
  type: string;
  status: string;
  generated_at: string;
  build_timestamp: string;
  content: {
    total_entries: number;
    public_items: number;
    content_types: ContentFreshness[];
  };
  links: {
    internal: {
      checked: number;
      broken_count: number;
    };
    sources: {
      external_http_checked: boolean;
      external_http_check_note: string;
      source_url_count: number;
      invalid_source_url_count: number;
      model_count: number;
      models_with_model_sources: number;
      models_with_last_verified: number;
      models_missing_sources_count: number;
      models_missing_last_verified_count: number;
    };
  };
};

function Percent({ value }: { value: number }) {
  return <>{Math.round(value * 100)}%</>;
}

function StatusStat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="summary-stat">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

export default function StatusPage() {
  const status = statusData as StatusData;
  const staleTotal = status.content.content_types.reduce(
    (sum, item) => sum + item.stale_count,
    0
  );

  return (
    <>
      <pre className="raw-markdown agent-only">
        {JSON.stringify(status, null, 2)}
      </pre>

      <section className="human-only" aria-labelledby="status-title">
        <p className="home-kicker">Operational status</p>
        <h1 id="status-title">Build freshness and data health</h1>
        <p>
          This page is generated from the content inventory. Agents can fetch the
          same data directly at <Link href="/api/v1/status.json">/api/v1/status.json</Link>.
        </p>

        <section className="human-summary" aria-label="Status summary">
          <div className="summary-heading">
            <p>Current state</p>
            <h2>{status.status}</h2>
          </div>
          <dl className="summary-grid">
            <StatusStat label="Generated" value={status.generated_at} />
            <StatusStat label="Build timestamp" value={status.build_timestamp} />
            <StatusStat label="Content entries" value={status.content.total_entries} />
            <StatusStat label="Public items" value={status.content.public_items} />
            <StatusStat label="Broken internal links" value={status.links.internal.broken_count} />
            <StatusStat label="Stale items" value={staleTotal} />
          </dl>
        </section>

        <h2>Content Freshness</h2>
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Count</th>
              <th>Latest</th>
              <th>Oldest</th>
              <th>Stale</th>
              <th>Verified</th>
            </tr>
          </thead>
          <tbody>
            {status.content.content_types.map((item) => (
              <tr key={item.type}>
                <td>{item.type}</td>
                <td>{item.count}</td>
                <td>{item.latest_last_updated ?? "n/a"}</td>
                <td>{item.oldest_last_updated ?? "n/a"}</td>
                <td>{item.stale_count}</td>
                <td>
                  {item.verified_count} <span aria-hidden="true">/</span> {item.count} (
                  <Percent value={item.verification_coverage} />)
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <section className="human-summary" aria-label="Link and source health">
          <div className="summary-heading">
            <p>Health checks</p>
            <h2>Links and sources</h2>
          </div>
          <dl className="summary-grid compact">
            <StatusStat label="Internal links checked" value={status.links.internal.checked} />
            <StatusStat label="Broken internal links" value={status.links.internal.broken_count} />
            <StatusStat label="Source URLs" value={status.links.sources.source_url_count} />
            <StatusStat
              label="Invalid source URLs"
              value={status.links.sources.invalid_source_url_count}
            />
            <StatusStat
              label="Models with sources"
              value={`${status.links.sources.models_with_model_sources}/${status.links.sources.model_count}`}
            />
            <StatusStat
              label="Models verified"
              value={`${status.links.sources.models_with_last_verified}/${status.links.sources.model_count}`}
            />
          </dl>
          <p>{status.links.sources.external_http_check_note}</p>
        </section>
      </section>
    </>
  );
}
