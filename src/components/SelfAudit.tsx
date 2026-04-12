"use client";

import { useState } from "react";

interface Criterion {
  id: number;
  name: string;
  question: string;
  yes: string;
  partial: string;
  no: string;
  checklistAnchor: string;
}

const CRITERIA: Criterion[] = [
  {
    id: 1,
    name: "Discovery",
    question: "Can an agent find an index of your content without crawling every page?",
    yes: "You have llms.txt, a sitemap with machine-readable URLs, and robots.txt that allows agent access.",
    partial: "You have a sitemap and robots.txt, but no llms.txt or agent-specific discovery.",
    no: "Agents must crawl your site to discover content.",
    checklistAnchor: "1-discovery",
  },
  {
    id: 2,
    name: "Raw Content",
    question: "Can an agent get your content as raw text or structured data — not just HTML?",
    yes: "Source content (markdown, JSON, etc.) is available at predictable URLs alongside rendered pages.",
    partial: "Some content is available as JSON via an API, but not all pages have a raw equivalent.",
    no: "The only way to get content is to parse rendered HTML.",
    checklistAnchor: "2-raw-content-access",
  },
  {
    id: 3,
    name: "Metadata",
    question: "Does every content item have consistent, typed metadata?",
    yes: "Every item has title, type, description, and last_updated in a machine-readable format. Same-type items have the same fields.",
    partial: "Some pages have metadata, but the schema is inconsistent across content types.",
    no: "No structured metadata beyond basic HTML meta tags.",
    checklistAnchor: "3-structured-metadata",
  },
  {
    id: 4,
    name: "Canonical IDs",
    question: "Does every content item have a stable ID that survives URL changes?",
    yes: "Every item has a permanent, unique ID in its metadata — distinct from the URL.",
    partial: "Items are identified by URL slugs, which are stable but not formalized as canonical IDs.",
    no: "No identifiers beyond URLs.",
    checklistAnchor: "4-canonical-identifiers",
  },
  {
    id: 5,
    name: "Provenance",
    question: "Can an agent tell when content was last updated and by whom?",
    yes: "All content has accurate last_updated dates, creation dates, and authorship.",
    partial: "Some dates exist, but they may be deploy dates or inconsistent across content types.",
    no: "No timestamps or authorship metadata.",
    checklistAnchor: "5-provenance--timestamps",
  },
  {
    id: 6,
    name: "Trust",
    question: "Can an agent verify whether its cached copy of your content is current?",
    yes: "Content includes integrity hashes and confidence signals on volatile data.",
    partial: "Accurate timestamps let agents assess freshness, but no hashes or confidence markers.",
    no: "No mechanism for agents to check content freshness.",
    checklistAnchor: "6-trust--verification",
  },
  {
    id: 7,
    name: "Relationships",
    question: "Can an agent traverse relationships between content programmatically?",
    yes: "Metadata includes typed relationships, consistent tags, and a structured search index.",
    partial: "Tags and categories exist, but relationships are only in inline links, not metadata.",
    no: "No structured relationships — just hyperlinks in body text.",
    checklistAnchor: "7-relationships--context",
  },
  {
    id: 8,
    name: "Changes",
    question: "Can an agent find out what changed without re-crawling everything?",
    yes: "A JSON/RSS feed provides timestamped updates for all content types.",
    partial: "A changelog or blog feed exists, but doesn't cover all content changes.",
    no: "Agents must re-crawl to detect changes.",
    checklistAnchor: "8-change-visibility",
  },
  {
    id: 9,
    name: "APIs",
    question: "Can an agent query your content with filters — not just fetch individual pages?",
    yes: "A JSON API returns typed fields, supports listing by type, and enables filtering.",
    partial: "An API exists but returns HTML fragments, requires auth, or is undocumented.",
    no: "No API — the only data access is through rendered pages.",
    checklistAnchor: "9-structured-apis",
  },
  {
    id: 10,
    name: "Degradation",
    question: "Does your site work for both humans and agents from the same content source?",
    yes: "Same source content serves both audiences through different access paths. No JS required.",
    partial: "Separate API content exists but may drift from the website. Or JS is required for some pages.",
    no: "Single-page app, JS-only rendering, or no agent access path at all.",
    checklistAnchor: "10-graceful-degradation",
  },
];

type Answer = "yes" | "partial" | "no" | null;

function getScore(answers: Answer[]): number {
  return answers.reduce((sum, a) => {
    if (a === "yes") return sum + 2;
    if (a === "partial") return sum + 1;
    return sum;
  }, 0);
}

function getLevel(score: number): { level: number; name: string; color: string } {
  if (score >= 17) return { level: 4, name: "Agent-Native", color: "text-green-400" };
  if (score >= 13) return { level: 3, name: "Agent-Ready", color: "text-green-400" };
  if (score >= 9) return { level: 2, name: "Structured", color: "text-yellow-400" };
  if (score >= 5) return { level: 1, name: "Readable", color: "text-orange-400" };
  return { level: 0, name: "Scrape-Only", color: "text-red-400" };
}

export default function SelfAudit() {
  const [answers, setAnswers] = useState<Answer[]>(
    new Array(CRITERIA.length).fill(null)
  );
  const [submitted, setSubmitted] = useState(false);

  const setAnswer = (index: number, value: Answer) => {
    const next = [...answers];
    next[index] = value;
    setAnswers(next);
  };

  const allAnswered = answers.every((a) => a !== null);
  const score = getScore(answers);
  const { level, name, color } = getLevel(score);
  const gaps = CRITERIA.filter((_, i) => answers[i] !== "yes");

  const reset = () => {
    setAnswers(new Array(CRITERIA.length).fill(null));
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="space-y-8">
        {/* Score */}
        <div className="border border-neutral-700 rounded-lg p-6 space-y-4">
          <div className="flex items-baseline gap-3">
            <span className={`text-4xl font-bold ${color}`}>{score}</span>
            <span className="text-neutral-500 text-sm">/ 20</span>
          </div>
          <div>
            <span className={`text-lg font-bold ${color}`}>
              Level {level}: {name}
            </span>
          </div>
          <p className="text-sm text-neutral-400">
            {level === 0 &&
              "Agents visiting your site are scraping HTML and guessing. Start with the four changes below."}
            {level === 1 &&
              "Your site is parseable but not optimized for agents. The jump to Level 2 is the highest-leverage move you can make."}
            {level === 2 &&
              "Agents can get your content in a useful format. You're ahead of most of the web. Focus on APIs, IDs, and provenance to reach Level 3."}
            {level === 3 &&
              "Agents can efficiently find, query, and verify your content. You're in the top tier. Trust infrastructure and relationships are the frontier."}
            {level === 4 &&
              "Your site is built for agents as a first-class audience. You're at the frontier of the agent-ready web."}
          </p>
        </div>

        {/* Gaps */}
        {gaps.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white">
              {gaps.length === 10
                ? "Where to start"
                : `${gaps.length} gap${gaps.length === 1 ? "" : "s"} to close`}
            </h3>
            <div className="space-y-2">
              {gaps.map((criterion, i) => {
                const answerIndex = CRITERIA.indexOf(criterion);
                const answer = answers[answerIndex];
                return (
                  <a
                    key={criterion.id}
                    href={`/checklist#${criterion.checklistAnchor}`}
                    className="flex items-center gap-3 p-3 border border-neutral-800 rounded-lg hover:border-neutral-600 transition-colors"
                  >
                    <span
                      className={`text-xs font-mono w-16 shrink-0 ${
                        answer === "partial"
                          ? "text-yellow-400"
                          : "text-red-400"
                      }`}
                    >
                      {answer === "partial" ? "partial" : "missing"}
                    </span>
                    <span className="text-sm text-white">
                      {criterion.name}
                    </span>
                    <span className="text-xs text-neutral-500 hidden sm:inline">
                      &rarr; see checklist
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        )}

        {/* Next steps */}
        {level < 2 && (
          <div className="border border-neutral-800 rounded-lg p-5 space-y-3">
            <h3 className="text-sm font-bold text-white">
              Fastest path to Level 2
            </h3>
            <ol className="text-sm text-neutral-400 space-y-2 list-decimal list-inside">
              <li>
                Add <code className="text-white">llms.txt</code> — takes an
                hour, gives agents a front door
              </li>
              <li>
                Serve raw content at predictable URLs alongside your HTML
              </li>
              <li>
                Add consistent metadata: title, type, description,
                last_updated
              </li>
              <li>
                Make sure <code className="text-white">robots.txt</code>{" "}
                allows agent access
              </li>
            </ol>
            <p className="text-xs text-neutral-500">
              Four changes. Most of the agent-readiness benefit comes from
              reaching Level 2.
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={reset}
            className="px-4 py-2 text-sm border border-neutral-700 rounded-lg hover:border-neutral-500 transition-colors text-neutral-400 hover:text-white"
          >
            Start over
          </button>
          <a
            href="/checklist"
            className="px-4 py-2 text-sm border border-neutral-600 rounded-lg hover:border-neutral-400 transition-colors text-white"
          >
            Full checklist &rarr;
          </a>
          <a
            href="mailto:brian@aifutureready.com?subject=Agent-Ready%20Audit"
            className="px-4 py-2 text-sm border border-neutral-700 rounded-lg hover:border-neutral-500 transition-colors text-neutral-400 hover:text-white"
          >
            Get a professional audit
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        {CRITERIA.map((criterion, index) => (
          <div
            key={criterion.id}
            className="border border-neutral-800 rounded-lg p-4 space-y-3"
          >
            <div className="flex items-start gap-3">
              <span className="text-xs text-neutral-600 font-mono mt-0.5 w-4 shrink-0">
                {criterion.id}
              </span>
              <div className="space-y-3 flex-1">
                <p className="text-sm text-white leading-relaxed">
                  {criterion.question}
                </p>
                <div className="flex gap-2">
                  {(["yes", "partial", "no"] as const).map((value) => (
                    <button
                      key={value}
                      onClick={() => setAnswer(index, value)}
                      className={`px-3 py-1.5 text-xs rounded border transition-colors ${
                        answers[index] === value
                          ? value === "yes"
                            ? "border-green-600 text-green-400 bg-green-950/30"
                            : value === "partial"
                            ? "border-yellow-600 text-yellow-400 bg-yellow-950/30"
                            : "border-red-600 text-red-400 bg-red-950/30"
                          : "border-neutral-700 text-neutral-500 hover:border-neutral-500 hover:text-neutral-300"
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
                {answers[index] && (
                  <p className="text-xs text-neutral-500 leading-relaxed">
                    {answers[index] === "yes"
                      ? criterion.yes
                      : answers[index] === "partial"
                      ? criterion.partial
                      : criterion.no}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Progress + Submit */}
      <div className="flex items-center gap-4">
        <span className="text-xs text-neutral-500">
          {answers.filter((a) => a !== null).length} / {CRITERIA.length}{" "}
          answered
        </span>
        <button
          onClick={() => setSubmitted(true)}
          disabled={!allAnswered}
          className={`px-4 py-2 text-sm rounded-lg border transition-colors ${
            allAnswered
              ? "border-neutral-500 text-white hover:border-neutral-300"
              : "border-neutral-800 text-neutral-600 cursor-not-allowed"
          }`}
        >
          See your score
        </button>
      </div>
    </div>
  );
}
