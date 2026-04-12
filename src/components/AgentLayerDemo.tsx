"use client";

import { useState } from "react";

type View = "human" | "source" | "api";

const EXAMPLE_RENDERED = `<h3>Claude Opus 4.6</h3>
<p>The best coding model available. At 80.8% SWE-bench and a 97/100 coding score, Opus 4.6 leads every other model on real-world software engineering benchmarks.</p>
<p>The 1M context window with no surcharge is a genuine differentiator — Opus can hold an entire mid-size codebase in one pass.</p>
<p><strong>Provider:</strong> Anthropic &middot; <strong>Pricing:</strong> $5 / $25 per 1M tokens &middot; <strong>Context:</strong> 1M tokens</p>`;

const EXAMPLE_SOURCE = `---
title: "Claude Opus 4.6"
type: model
id: "claude-opus-4.6"
provider: "Anthropic"
release_date: "2026-02"
context_window: "1M tokens"
last_updated: "2026-04-10"
pricing:
  input: "$5.00 / 1M tokens"
  output: "$25.00 / 1M tokens"
benchmarks:
  reasoning: 96
  coding: 97
  math: 93
  writing: 95
  speed: 62
best_for:
  - "Complex coding projects"
  - "Agentic workflows"
---

# Claude Opus 4.6

The best coding model available. At 80.8%
SWE-bench and a 97/100 coding score...`;

const EXAMPLE_API = `GET /api/v1/models.json → [
  {
    "slug": "claude-opus-4.6",
    "title": "Claude Opus 4.6",
    "provider": "Anthropic",
    "description": "Anthropic's most capable model...",
    "last_updated": "2026-04-10",
    "pricing": {
      "input": "$5.00 / 1M tokens",
      "output": "$25.00 / 1M tokens"
    },
    "benchmarks": {
      "reasoning": 96,
      "coding": 97,
      "math": 93
    },
    "markdown_url": "/content/models/claude-opus-4.6.md",
    "html_url": "/models/claude-opus-4.6"
  }
]`;

const TABS: { key: View; label: string; sublabel: string }[] = [
  { key: "human", label: "Human view", sublabel: "rendered page" },
  { key: "source", label: "Source", sublabel: "markdown + YAML" },
  { key: "api", label: "Agent view", sublabel: "JSON API" },
];

export default function AgentLayerDemo() {
  const [view, setView] = useState<View>("human");

  return (
    <div className="border border-neutral-800 rounded-lg overflow-hidden">
      {/* Tab bar */}
      <div className="flex border-b border-neutral-800 text-xs font-mono">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setView(tab.key)}
            className={`flex-1 px-4 py-3 text-center transition-colors ${
              view === tab.key
                ? "bg-neutral-900 text-white border-b-2 border-white"
                : "text-neutral-500 hover:text-white hover:bg-neutral-900/50"
            }`}
          >
            <span className="block font-semibold">{tab.label}</span>
            <span className="block text-neutral-600 mt-0.5">
              {tab.sublabel}
            </span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-6 min-h-[320px]">
        {view === "human" && (
          <div>
            <div className="text-xs text-neutral-600 mb-4 font-mono">
              GET /models/claude-opus-4.6 → rendered HTML
            </div>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: EXAMPLE_RENDERED }}
            />
          </div>
        )}

        {view === "source" && (
          <div>
            <div className="text-xs text-neutral-600 mb-4 font-mono">
              GET /content/models/claude-opus-4.6.md → raw markdown + YAML
              frontmatter
            </div>
            <pre className="text-sm text-neutral-300 whitespace-pre-wrap leading-relaxed">
              {EXAMPLE_SOURCE}
            </pre>
          </div>
        )}

        {view === "api" && (
          <div>
            <div className="text-xs text-neutral-600 mb-4 font-mono">
              GET /api/v1/models.json → structured JSON
            </div>
            <pre className="text-sm text-neutral-300 whitespace-pre-wrap leading-relaxed">
              {EXAMPLE_API}
            </pre>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-neutral-800 px-6 py-3 text-xs text-neutral-600 font-mono">
        Same content. Three representations. All live →{" "}
        <a
          href="/models/claude-opus-4.6"
          className="text-white hover:underline"
        >
          view this page
        </a>
      </div>
    </div>
  );
}
