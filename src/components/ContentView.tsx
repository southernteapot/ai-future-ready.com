import type { ReactNode } from "react";

/**
 * Resolve a markdown link href relative to the current mdPath.
 * e.g. mdPath="/content/models/_index.md", href="gpt-5.4.md" → "/models/gpt-5.4"
 */
function resolveHref(href: string, mdPath: string): string {
  // Absolute URLs — leave as-is
  if (href.startsWith("http://") || href.startsWith("https://")) return href;
  if (href.startsWith("/")) return href;

  // Strip /content prefix and filename from mdPath to get the base dir
  const dir = mdPath
    .replace(/^\/content/, "")
    .replace(/\/[^/]+$/, "");

  // Resolve the relative .md path and strip .md extension
  const resolved = href
    .replace(/\/_index\.md$/, "")
    .replace(/\.md$/, "");

  return `${dir}/${resolved}`;
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
        <a
          key={key++}
          href={resolved}
          className="text-white underline decoration-neutral-600 underline-offset-2 hover:decoration-white transition-colors"
        >
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
          className="text-white underline decoration-neutral-600 underline-offset-2 hover:decoration-white transition-colors"
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

export default function ContentView({
  raw,
  html,
  mdPath,
}: {
  raw: string;
  html: string;
  mdPath: string;
}) {
  const viewId =
    mdPath.replace(/[^a-z0-9]+/gi, "-").replace(/^-+|-+$/g, "").toLowerCase() ||
    "content";
  const rawId = `${viewId}-source`;
  const renderedId = `${viewId}-rendered`;

  return (
    <div>
      <p className="mb-4 max-w-3xl text-xs leading-relaxed text-neutral-500">
        Canonical pages on AI Future Ready open in source view by design. The
        raw markdown is the primary representation for agents; the rendered tab
        shows the same content as a human reading view.
      </p>

      {/* Toggle bar */}
      <div className="mb-6 flex flex-wrap items-center gap-3 text-sm font-mono">
        <input
          id={rawId}
          type="radio"
          name={viewId}
          defaultChecked
          className="peer/source sr-only"
        />
        <label
          htmlFor={rawId}
          className="cursor-pointer rounded px-3 py-1.5 text-neutral-500 transition-colors peer-checked/source:border peer-checked/source:border-neutral-700 peer-checked/source:bg-neutral-900 peer-checked/source:text-white hover:text-white"
        >
          source (.md)
        </label>

        <input
          id={renderedId}
          type="radio"
          name={viewId}
          className="peer/rendered sr-only"
        />
        <label
          htmlFor={renderedId}
          className="cursor-pointer rounded px-3 py-1.5 text-neutral-500 transition-colors peer-checked/rendered:border peer-checked/rendered:border-neutral-700 peer-checked/rendered:bg-neutral-900 peer-checked/rendered:text-white hover:text-white"
        >
          rendered
        </label>

        <a
          href={mdPath}
          className="ml-auto text-neutral-600 hover:text-white font-mono text-xs transition-colors"
        >
          canonical source file
        </a>
      </div>

      {/* Raw markdown view */}
      <pre className="peer-checked/rendered:hidden whitespace-pre-wrap break-words p-6 text-sm leading-relaxed text-neutral-300 font-mono">
        {linkify(raw, mdPath)}
      </pre>

      {/* Rendered view */}
      <div className="hidden peer-checked/rendered:block">
        <div className="prose max-w-none">
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
    </div>
  );
}
