"use client";

import Link from "next/link";
import { useState } from "react";

interface Criterion {
  id: number;
  name: string;
  question: string;
  yes: string;
  partial: string;
  no: string;
  fix: string;
  priority: number; // lower = higher priority to fix
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
    fix: "Create an llms.txt file at your site root listing content sections and URLs. Takes under an hour. This is the single highest-leverage change.",
    priority: 1,
    checklistAnchor: "1-discovery",
  },
  {
    id: 2,
    name: "Raw Content Access",
    question: "Can an agent get your content as raw text or structured data — not just HTML?",
    yes: "Source content (markdown, JSON, etc.) is available at predictable URLs alongside rendered pages.",
    partial: "Some content is available as JSON via an API, but not all pages have a raw equivalent.",
    no: "The only way to get content is to parse rendered HTML.",
    fix: "Serve your source content (markdown or JSON) at predictable URLs alongside HTML pages. If the page is /products/x, the raw content should be at /content/products/x.md.",
    priority: 2,
    checklistAnchor: "2-raw-content-access",
  },
  {
    id: 3,
    name: "Structured Metadata",
    question: "Does every content item have consistent, typed metadata?",
    yes: "Every item has title, type, description, and last_updated in a machine-readable format. Same-type items have the same fields.",
    partial: "Some pages have metadata, but the schema is inconsistent across content types.",
    no: "No structured metadata beyond basic HTML meta tags.",
    fix: "Add four fields to every content item: title, type, description, last_updated. Use YAML frontmatter, JSON-LD, or equivalent. Consistency matters more than format.",
    priority: 3,
    checklistAnchor: "3-structured-metadata",
  },
  {
    id: 4,
    name: "Canonical IDs",
    question: "Does every content item have a stable ID that survives URL changes?",
    yes: "Every item has a permanent, unique ID in its metadata — distinct from the URL.",
    partial: "Items are identified by URL slugs, which are stable but not formalized as canonical IDs.",
    no: "No identifiers beyond URLs.",
    fix: "Add an id field to every content item's metadata. Use human-readable slugs, not UUIDs. Make them permanent — they should never change even if the URL does.",
    priority: 5,
    checklistAnchor: "4-canonical-identifiers",
  },
  {
    id: 5,
    name: "Provenance & Timestamps",
    question: "Can an agent tell when content was last updated and by whom?",
    yes: "All content has accurate last_updated dates, creation dates, and authorship.",
    partial: "Some dates exist, but they may be deploy dates or inconsistent across content types.",
    no: "No timestamps or authorship metadata.",
    fix: "Add last_updated (ISO 8601) to every content item. Make sure it reflects actual content changes, not deploy dates. Add author if applicable.",
    priority: 6,
    checklistAnchor: "5-provenance--timestamps",
  },
  {
    id: 6,
    name: "Trust & Verification",
    question: "Can an agent verify whether its cached copy of your content is current?",
    yes: "Content includes integrity hashes and confidence signals on volatile data.",
    partial: "Accurate timestamps let agents assess freshness, but no hashes or confidence markers.",
    no: "No mechanism for agents to check content freshness.",
    fix: "Start by ensuring accurate last_updated timestamps. Then add content hashes (SHA-256 of the body) and confidence markers on volatile fields like pricing.",
    priority: 9,
    checklistAnchor: "6-trust--verification",
  },
  {
    id: 7,
    name: "Relationships & Context",
    question: "Can an agent traverse relationships between content programmatically?",
    yes: "Metadata includes typed relationships, consistent tags, and a structured search index.",
    partial: "Tags and categories exist, but relationships are only in inline links, not metadata.",
    no: "No structured relationships — just hyperlinks in body text.",
    fix: "Add consistent tags to all content. Build a search index (JSON) with titles, types, and tags. Later: add typed related fields in metadata.",
    priority: 7,
    checklistAnchor: "7-relationships--context",
  },
  {
    id: 8,
    name: "Change Visibility",
    question: "Can an agent find out what changed without re-crawling everything?",
    yes: "A JSON/RSS feed provides timestamped updates for all content types.",
    partial: "A changelog or blog feed exists, but doesn't cover all content changes.",
    no: "Agents must re-crawl to detect changes.",
    fix: "Add a JSON or RSS feed that covers all content changes (not just blog posts). Include title, date, type, and URL in each entry.",
    priority: 8,
    checklistAnchor: "8-change-visibility",
  },
  {
    id: 9,
    name: "Structured APIs",
    question: "Can an agent query your content with filters — not just fetch individual pages?",
    yes: "A JSON API returns typed fields, supports listing by type, and enables filtering.",
    partial: "An API exists but returns HTML fragments, requires auth, or is undocumented.",
    no: "No API — the only data access is through rendered pages.",
    fix: "Build a JSON API that lists content by type with typed fields. Start simple: one endpoint per content type returning title, id, description, and key metadata.",
    priority: 4,
    checklistAnchor: "9-structured-apis",
  },
  {
    id: 10,
    name: "Graceful Degradation",
    question: "Does your site work for both humans and agents from the same content source?",
    yes: "Same source content serves both audiences through different access paths. No JS required.",
    partial: "Separate API content exists but may drift from the website. Or JS is required for some pages.",
    no: "Single-page app, JS-only rendering, or no agent access path at all.",
    fix: "Serve both audiences from the same content source. If your site requires JavaScript to render, add server-side rendering or pre-render content to static files.",
    priority: 10,
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

function getLevel(score: number): {
  level: number;
  name: string;
  color: string;
  border: string;
} {
  if (score >= 17)
    return { level: 4, name: "Agent-Native", color: "text-green-400", border: "border-green-800" };
  if (score >= 13)
    return { level: 3, name: "Agent-Ready", color: "text-green-400", border: "border-green-900" };
  if (score >= 9)
    return { level: 2, name: "Structured", color: "text-yellow-400", border: "border-yellow-900" };
  if (score >= 5)
    return { level: 1, name: "Readable", color: "text-orange-400", border: "border-orange-900" };
  return { level: 0, name: "Scrape-Only", color: "text-red-400", border: "border-red-900" };
}

function getTopFixes(answers: Answer[]): Criterion[] {
  return CRITERIA.filter((_, i) => answers[i] !== "yes")
    .sort((a, b) => a.priority - b.priority)
    .slice(0, 3);
}

function getLevelGuidance(level: number): {
  summary: string;
  nextTarget: string;
  focus: string;
} {
  switch (level) {
    case 0:
      return {
        summary:
          "Agents visiting your site are scraping HTML and guessing at structure. Your content is effectively invisible to AI-mediated discovery.",
        nextTarget: "Level 2 (Structured)",
        focus:
          "Skip Level 1 — the jump to Level 2 delivers most of the value. Focus on the four basics: llms.txt, raw content, metadata, and robots.txt.",
      };
    case 1:
      return {
        summary:
          "Your site is parseable — agents can read it by scraping HTML. But they can't get structured data, and discovery is limited to your sitemap.",
        nextTarget: "Level 2 (Structured)",
        focus:
          "The gap between Level 1 and Level 2 is where agents go from guessing to understanding. Add raw content access and llms.txt to cross that line.",
      };
    case 2:
      return {
        summary:
          "Agents can get your content in a useful format without scraping. You're ahead of most of the web. The basics are solid.",
        nextTarget: "Level 3 (Agent-Ready)",
        focus:
          "Add a JSON API, canonical IDs, and provenance metadata. These turn your site from a document store into a queryable, trustworthy knowledge base.",
      };
    case 3:
      return {
        summary:
          "Agents can efficiently find, query, and verify your content. You're in the top tier of agent-ready sites.",
        nextTarget: "Level 4 (Agent-Native)",
        focus:
          "The frontier: content integrity hashes, confidence signals on volatile data, typed relationships, and change feeds. These are the trust and interconnection layer.",
      };
    case 4:
      return {
        summary:
          "Your site is built for agents as a first-class audience. You're at the frontier of the agent-ready web.",
        nextTarget: "You're there",
        focus:
          "Maintain what you've built. Share what you've learned. The spec is evolving — your implementation experience matters.",
      };
    default:
      return { summary: "", nextTarget: "", focus: "" };
  }
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
  const answeredCount = answers.filter((a) => a !== null).length;
  const score = getScore(answers);
  const { level, name } = getLevel(score);
  const strengths = CRITERIA.filter((_, i) => answers[i] === "yes");
  const partials = CRITERIA.filter((_, i) => answers[i] === "partial");
  const missing = CRITERIA.filter((_, i) => answers[i] === "no");
  const gaps = [...missing, ...partials].sort((a, b) => a.priority - b.priority);
  const topFixes = getTopFixes(answers);
  const guidance = getLevelGuidance(level);

  const reset = () => {
    setAnswers(new Array(CRITERIA.length).fill(null));
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="self-audit">
        <p>## Result</p>
        <p>score: {score} / 20</p>
        <p>
          level: {level} - {name}
        </p>
        <p>{guidance.summary}</p>

        <p>## Scorecard</p>
        <ol>
          {CRITERIA.map((criterion, index) => {
            const answer = answers[index];
            const points =
              answer === "yes" ? 2 : answer === "partial" ? 1 : 0;
            return (
              <li key={criterion.id}>
                {criterion.name}: {answer} ({points} / 2)
              </li>
            );
          })}
        </ol>

        {strengths.length > 0 && (
          <>
            <p>## Strengths</p>
            <ul>
              {strengths.map((criterion) => (
                <li key={criterion.id}>
                  {criterion.name}: {criterion.yes}
                </li>
              ))}
            </ul>
          </>
        )}

        {topFixes.length > 0 && (
          <>
            <p>## Top fixes</p>
            <ol>
              {topFixes.map((criterion) => (
                <li key={criterion.id}>
                  <Link href={`/checklist#${criterion.checklistAnchor}`}>
                    {criterion.name}
                  </Link>
                  : {criterion.fix}
                </li>
              ))}
            </ol>
          </>
        )}

        {gaps.length > 0 && (
          <>
            <p>## All gaps</p>
            <ul>
              {gaps.map((criterion) => {
                const answer = answers[CRITERIA.indexOf(criterion)];
                return (
                  <li key={criterion.id}>
                    <Link href={`/checklist#${criterion.checklistAnchor}`}>
                      {criterion.name}
                    </Link>
                    : {answer}
                  </li>
                );
              })}
            </ul>
          </>
        )}

        <p>## Next</p>
        {level < 4 && (
          <p>
            target: {guidance.nextTarget}. {guidance.focus}
          </p>
        )}
        {level >= 4 && <p>{guidance.focus}</p>}

        <p className="audit-actions">
          <button
            type="button"
            onClick={reset}
          >
            [start over]
          </button>{" "}
          <Link href="/checklist">[full checklist]</Link>{" "}
          <Link href="/standard">[read the standard]</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="self-audit">
      <p>## Questions</p>
      <ol>
        {CRITERIA.map((criterion, index) => {
          const selected = answers[index];
          return (
            <li key={criterion.id}>
              <p>{criterion.question}</p>
              <p>criterion: {criterion.name}</p>
              <p>
                {(["yes", "partial", "no"] as const).map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setAnswer(index, value)}
                    aria-pressed={selected === value}
                    className="answer-button"
                  >
                    {selected === value ? `[x] ${value}` : `[ ] ${value}`}
                  </button>
                ))}
              </p>
              {selected && (
                <p>
                  answer:{" "}
                  {selected === "yes"
                    ? criterion.yes
                    : selected === "partial"
                    ? criterion.partial
                    : criterion.no}
                </p>
              )}
            </li>
          );
        })}
      </ol>

      <p className="audit-progress">
        {answeredCount} / {CRITERIA.length} answered{" "}
        <button
          type="button"
          onClick={() => setSubmitted(true)}
          disabled={!allAnswered}
        >
          [see your results]
        </button>
      </p>
    </div>
  );
}
