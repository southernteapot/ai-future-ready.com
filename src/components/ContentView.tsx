"use client";

import { useState, type ReactNode } from "react";

/**
 * Resolve a markdown link href relative to the current mdPath.
 * e.g. mdPath="/content/models/_index.md", href="gpt-5.4.md" → "/models/gpt-5.4"
 */
function resolveHref(href: string, mdPath: string): string {
  // Absolute URLs — leave as-is
  if (href.startsWith("http://") || href.startsWith("https://")) return href;

  // Strip /content prefix and filename from mdPath to get the base dir
  const dir = mdPath
    .replace(/^\/content/, "")
    .replace(/\/[^/]+$/, "");

  // Resolve the relative .md path and strip .md extension
  const resolved = href
    .replace(/\/_index\.md$/, "")
    .replace(/\.md$/, "");

  if (resolved.startsWith("/")) return resolved;
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
      const linkText = match[2];
      const href = match[3];
      const resolved = resolveHref(href, mdPath);
      nodes.push(
        <a
          key={key++}
          href={resolved}
          className="text-green-400 hover:text-green-300 underline decoration-green-700 underline-offset-2 hover:decoration-green-400 transition-colors"
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
          className="text-blue-400 hover:text-blue-300 underline decoration-blue-700 underline-offset-2 hover:decoration-blue-400 transition-colors"
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
  const [view, setView] = useState<"raw" | "rendered">("raw");

  return (
    <div>
      {/* Toggle bar */}
      <div className="flex items-center gap-3 mb-6 text-sm">
        <button
          onClick={() => setView("raw")}
          className={`px-3 py-1.5 rounded font-mono transition-colors ${
            view === "raw"
              ? "bg-slate-800 text-green-400"
              : "bg-slate-100 text-slate-500 hover:bg-slate-200"
          }`}
        >
          .md
        </button>
        <button
          onClick={() => setView("rendered")}
          className={`px-3 py-1.5 rounded transition-colors ${
            view === "rendered"
              ? "bg-indigo-600 text-white"
              : "bg-slate-100 text-slate-500 hover:bg-slate-200"
          }`}
        >
          Rendered
        </button>
        <a
          href={mdPath}
          className="ml-auto text-slate-400 hover:text-indigo-600 font-mono text-xs transition-colors"
        >
          {mdPath}
        </a>
      </div>

      {/* Raw markdown view */}
      {view === "raw" && (
        <div className="bg-slate-900 rounded-lg overflow-auto">
          <pre className="p-6 text-sm leading-relaxed font-mono text-slate-300 whitespace-pre-wrap break-words">
            {linkify(raw, mdPath)}
          </pre>
        </div>
      )}

      {/* Rendered view */}
      {view === "rendered" && (
        <div className="prose max-w-none">
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      )}
    </div>
  );
}
