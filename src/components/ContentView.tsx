import type { ReactNode } from "react";
import path from "path";
import Link from "next/link";
import matter from "gray-matter";
import { renderMarkdown } from "@/lib/markdown";

type Frontmatter = Record<string, unknown>;

/**
 * Resolve a markdown link href relative to the current mdPath.
 * e.g. mdPath="/content/models/_index.md", href="gpt-5.4.md" → "/models/gpt-5.4"
 */
function resolveHref(href: string, mdPath: string): string {
  if (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("#")
  ) {
    return href;
  }

  const match = href.match(/^([^?#]*)([?#].*)?$/);
  const pathname = match?.[1] ?? href;
  const suffix = match?.[2] ?? "";

  if (pathname.startsWith("/") && !pathname.startsWith("/content/")) {
    return `${pathname}${suffix}`;
  }

  const contentPath = mdPath.replace(/^\/content/, "");
  const baseDir = path.posix.dirname(contentPath);
  const resolvedPath = pathname.startsWith("/content/")
    ? pathname.replace(/^\/content/, "")
    : path.posix.normalize(path.posix.join(baseDir, pathname));

  const htmlPath =
    resolvedPath
      .replace(/\/_index\.md$/, "")
      .replace(/\.md$/, "") || "/";

  return `${htmlPath}${suffix}`;
}

function rewriteMarkdownLinks(markdown: string, mdPath: string): string {
  return markdown.replace(
    /\[([^\]]+)\]\(([^)\s]+)(\s+"[^"]*")?\)/g,
    (_match, text: string, href: string, title: string = "") =>
      `[${text}](${resolveHref(href, mdPath)}${title})`
  );
}

function asString(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value : null;
}

function asStringList(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string" && item.trim().length > 0)
    : [];
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function asSourceList(value: unknown): Array<{ title: string; url: string }> {
  return Array.isArray(value)
    ? value
        .map((item) => asRecord(item))
        .filter((item): item is Record<string, unknown> => Boolean(item))
        .map((item) => ({
          title: asString(item.title) ?? asString(item.url) ?? "Source",
          url: asString(item.url) ?? "",
        }))
        .filter((item) => item.url)
    : [];
}

function SummaryStat({
  label,
  value,
}: {
  label: string;
  value: ReactNode;
}) {
  if (!value) return null;
  return (
    <div className="summary-stat">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

function ChipList({
  label,
  items,
}: {
  label: string;
  items: string[];
}) {
  if (items.length === 0) return null;
  return (
    <section className="summary-section">
      <h2>{label}</h2>
      <div className="summary-chips">
        {items.map((item) => (
          <span className="summary-chip" key={item}>
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}

function BenchmarkList({ benchmarks }: { benchmarks: Record<string, unknown> | null }) {
  if (!benchmarks) return null;
  const entries = Object.entries(benchmarks).filter(
    ([, value]) => typeof value === "number"
  ) as Array<[string, number]>;
  if (entries.length === 0) return null;

  return (
    <section className="summary-section summary-benchmarks">
      <h2>Task Scores</h2>
      <dl>
        {entries.map(([label, value]) => (
          <div className="summary-benchmark" key={label}>
            <dt>{label}</dt>
            <dd>
              <span className="summary-bar">
                <span style={{ width: `${Math.max(0, Math.min(value, 100))}%` }} />
              </span>
              <strong>{value}</strong>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function SourceLinks({ sources }: { sources: Array<{ title: string; url: string }> }) {
  if (sources.length === 0) return null;
  return (
    <section className="summary-section">
      <h2>Sources</h2>
      <ul className="summary-links">
        {sources.map((source) => (
          <li key={source.url}>
            <a href={source.url}>{source.title}</a>
          </li>
        ))}
      </ul>
    </section>
  );
}

function ModelSummary({ meta }: { meta: Frontmatter }) {
  const pricing = asRecord(meta.pricing);
  const benchmarks = asRecord(meta.benchmarks);
  const bestFor = asStringList(meta.best_for);
  const modality = asStringList(meta.modality);
  const tags = asStringList(meta.tags);
  const sources = asSourceList(meta.sources);

  return (
    <aside className="human-summary model-summary" aria-label="Model summary">
      <div className="summary-heading">
        <p>Model summary</p>
        <h2>{asString(meta.title)}</h2>
      </div>

      <dl className="summary-grid">
        <SummaryStat label="Provider" value={asString(meta.provider)} />
        <SummaryStat label="Type" value={asString(meta.model_type)} />
        <SummaryStat label="Context" value={asString(meta.context_window)} />
        <SummaryStat label="License" value={asString(meta.license)} />
        <SummaryStat label="Released" value={asString(meta.release_date)} />
        <SummaryStat label="Updated" value={asString(meta.last_updated)} />
        <SummaryStat label="Verified" value={asString(meta.last_verified) ?? "not verified"} />
      </dl>

      {pricing && (
        <section className="summary-section">
          <h2>Pricing</h2>
          <dl className="summary-grid compact">
            <SummaryStat label="Input" value={asString(pricing.input) ?? "n/a"} />
            <SummaryStat label="Output" value={asString(pricing.output) ?? "n/a"} />
            <SummaryStat label="Note" value={asString(pricing.note)} />
          </dl>
        </section>
      )}

      <BenchmarkList benchmarks={benchmarks} />
      <ChipList label="Best For" items={bestFor} />
      <ChipList label="Modalities" items={modality} />
      <ChipList label="Tags" items={tags.slice(0, 8)} />
      <SourceLinks sources={sources} />
    </aside>
  );
}

function ProviderSummary({ meta }: { meta: Frontmatter }) {
  const sources = asSourceList(meta.sources);
  const relatedModels = asStringList(meta.related_models);
  const relatedAgents = asStringList(meta.related_agents);
  const tags = asStringList(meta.tags);

  return (
    <aside className="human-summary provider-summary" aria-label="Provider summary">
      <div className="summary-heading">
        <p>Provider profile</p>
        <h2>{asString(meta.provider) ?? asString(meta.title)}</h2>
      </div>

      <dl className="summary-grid">
        <SummaryStat label="Updated" value={asString(meta.last_updated)} />
        <SummaryStat label="Verified" value={asString(meta.last_verified) ?? "not verified"} />
        <SummaryStat label="Pricing confidence" value={asString(meta.pricing_confidence)} />
        <SummaryStat label="Model confidence" value={asString(meta.model_listing_confidence)} />
        <SummaryStat label="Benchmark confidence" value={asString(meta.benchmark_confidence)} />
      </dl>

      {relatedModels.length > 0 && (
        <section className="summary-section">
          <h2>Related Models</h2>
          <div className="summary-chips">
            {relatedModels.map((slug) => (
              <Link className="summary-chip" href={`/models/${slug}`} key={slug}>
                {slug}
              </Link>
            ))}
          </div>
        </section>
      )}

      {relatedAgents.length > 0 && (
        <section className="summary-section">
          <h2>Related Agents</h2>
          <div className="summary-chips">
            {relatedAgents.map((slug) => (
              <Link className="summary-chip" href={`/agents/${slug}`} key={slug}>
                {slug}
              </Link>
            ))}
          </div>
        </section>
      )}

      <ChipList label="Tags" items={tags.slice(0, 8)} />
      <SourceLinks sources={sources} />
    </aside>
  );
}

function PricingSummary({ meta }: { meta: Frontmatter }) {
  const priceTarget = asRecord(meta.price_target);
  const tags = asStringList(meta.tags);
  const status = asString(meta.status) ?? "published";

  return (
    <aside className="human-summary pricing-summary" aria-label="Pricing summary">
      <div className="summary-heading">
        <p>Commercial access</p>
        <h2>{asString(meta.title)}</h2>
      </div>

      <dl className="summary-grid">
        <SummaryStat label="Status" value={status} />
        <SummaryStat label="Updated" value={asString(meta.last_updated)} />
        <SummaryStat label="Payment" value="not configured" />
        {priceTarget &&
          Object.entries(priceTarget).map(([label, value]) => (
            <SummaryStat key={label} label={label.replace(/_/g, " ")} value={asString(value)} />
          ))}
      </dl>

      <section className="summary-section">
        <h2>Useful Links</h2>
        <ul className="summary-links">
          <li>
            <Link href="/api/v1/samples/pro-data.json">Pro Data sample JSON</Link>
          </li>
          <li>
            <Link href="/api/v1/pricing-snapshots.json">Pricing snapshots JSON</Link>
          </li>
          <li>
            <Link href="/contact">Request checklist</Link>
          </li>
        </ul>
      </section>

      <ChipList label="Tags" items={tags.slice(0, 8)} />
    </aside>
  );
}

function HumanSummary({ meta }: { meta: Frontmatter }) {
  switch (meta.type) {
    case "model":
      return <ModelSummary meta={meta} />;
    case "provider":
      return <ProviderSummary meta={meta} />;
    case "pricing":
      return <PricingSummary meta={meta} />;
    default:
      return null;
  }
}

/**
 * Parse raw markdown text and return React nodes with clickable links.
 * Handles: [text](url), bare https:// URLs
 */
function linkify(raw: string, mdPath: string): ReactNode[] {
  // Match markdown links [text](url) or bare URLs
  const pattern = /(\[([^\]]+)\]\(([^)]+)\))|(https?:\/\/[^\s"'<>)\]]+)/g;
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(raw)) !== null) {
    // Push text before this match
    if (match.index > lastIndex) {
      nodes.push(raw.slice(lastIndex, match.index));
    }

    if (match[1]) {
      // Markdown link: [text](url)
      const fullMatch = match[1];
      const href = match[3];
      const resolved = resolveHref(href, mdPath);
      nodes.push(
        <a key={key++} href={resolved}>
          {fullMatch}
        </a>
      );
    } else if (match[4]) {
      // Bare URL
      const url = match[4];
      nodes.push(
        <a
          key={key++}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {url}
        </a>
      );
    }

    lastIndex = match.index + match[0].length;
  }

  // Push remaining text
  if (lastIndex < raw.length) {
    nodes.push(raw.slice(lastIndex));
  }

  return nodes;
}

export default async function ContentView({
  raw,
  mdPath,
}: {
  raw: string;
  mdPath: string;
}) {
  const { content, data } = matter(raw);
  const renderedHtml = await renderMarkdown(rewriteMarkdownLinks(content, mdPath));

  return (
    <div className="content-view">
      <pre className="raw-markdown" data-view="agent">
        {linkify(raw, mdPath)}
      </pre>
      <HumanSummary meta={data as Frontmatter} />
      <article
        className="human-markdown"
        data-view="human"
        dangerouslySetInnerHTML={{ __html: renderedHtml }}
      />
    </div>
  );
}
