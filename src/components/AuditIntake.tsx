"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const AUDIT_INBOX = "support@ai-future-ready.com";

type YesNoUnsure = "yes" | "no" | "unsure" | "";

interface IntakeState {
  siteUrl: string;
  pageCount: string;
  contentType: string;
  rawContent: YesNoUnsure;
  publicApi: YesNoUnsure;
  aiCrawling: YesNoUnsure;
  useCase: string;
  deliverable: string;
  packageInterest: string;
  name: string;
  organization: string;
  email: string;
}

const EMPTY: IntakeState = {
  siteUrl: "",
  pageCount: "",
  contentType: "",
  rawContent: "",
  publicApi: "",
  aiCrawling: "",
  useCase: "",
  deliverable: "",
  packageInterest: "",
  name: "",
  organization: "",
  email: "",
};

const YES_NO_UNSURE: { value: YesNoUnsure; label: string }[] = [
  { value: "yes", label: "yes" },
  { value: "no", label: "no" },
  { value: "unsure", label: "unsure" },
];

function buildMessage(s: IntakeState): string {
  const line = (label: string, value: string) =>
    `${label}: ${value.trim() ? value.trim() : "(not provided)"}`;
  return [
    "Agent Readiness Audit request",
    "",
    "# Self-assessment",
    line("Site URL", s.siteUrl),
    line("Approximate page count", s.pageCount),
    line("Content type", s.contentType),
    line("Raw markdown/text available", s.rawContent),
    line("Public JSON API", s.publicApi),
    line("AI crawling allowed (robots.txt)", s.aiCrawling),
    "",
    "# Scope",
    line("Main agent use case", s.useCase),
    line("Desired deliverable", s.deliverable),
    line("Package of interest", s.packageInterest),
    "",
    "# Contact",
    line("Name", s.name),
    line("Organization", s.organization),
    line("Reply email", s.email),
  ].join("\n");
}

export default function AuditIntake() {
  const [s, setS] = useState<IntakeState>(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const message = useMemo(() => buildMessage(s), [s]);

  const set = <K extends keyof IntakeState>(key: K, value: IntakeState[K]) => {
    setS((prev) => ({ ...prev, [key]: value }));
    setCopied(false);
  };

  const subject = s.siteUrl.trim()
    ? `Agent Readiness Audit request — ${s.siteUrl.trim()}`
    : "Agent Readiness Audit request";

  const mailtoHref = `mailto:${AUDIT_INBOX}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(message)}`;

  const submit = () => {
    if (!s.siteUrl.trim()) {
      setError("Add your site URL so we know what to audit.");
      return;
    }
    if (!s.email.trim()) {
      setError("Add a reply email so we can get back to you.");
      return;
    }
    setError(null);
    setSubmitted(true);
    // Open the visitor's email client with the request pre-filled.
    window.location.href = mailtoHref;
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(
        `To: ${AUDIT_INBOX}\nSubject: ${subject}\n\n${message}`
      );
      setCopied(true);
    } catch {
      setCopied(false);
      setError("Copy failed — select the text below and copy it manually.");
    }
  };

  return (
    <div className="self-audit audit-intake">
      <p>## Self-assessment</p>

      <p>
        <label htmlFor="ai-site-url">site URL (required)</label>
        <br />
        <input
          id="ai-site-url"
          type="url"
          inputMode="url"
          placeholder="https://example.com"
          value={s.siteUrl}
          onChange={(e) => set("siteUrl", e.target.value)}
        />
      </p>

      <p>
        <label htmlFor="ai-page-count">approximate page count</label>
        <br />
        <select
          id="ai-page-count"
          value={s.pageCount}
          onChange={(e) => set("pageCount", e.target.value)}
        >
          <option value="">choose one</option>
          <option value="under 50 pages">under 50 pages</option>
          <option value="50–500 pages">50–500 pages</option>
          <option value="over 500 pages">over 500 pages</option>
        </select>
      </p>

      <p>
        <label htmlFor="ai-content-type">content type</label>
        <br />
        <input
          id="ai-content-type"
          type="text"
          placeholder="marketing site, product docs, knowledge base, blog…"
          value={s.contentType}
          onChange={(e) => set("contentType", e.target.value)}
        />
      </p>

      {(
        [
          ["rawContent", "raw markdown or text available alongside HTML?"],
          ["publicApi", "public JSON API for your content?"],
          ["aiCrawling", "AI crawling allowed in robots.txt?"],
        ] as const
      ).map(([key, question]) => (
        <p key={key}>
          <span>{question}</span>
          <br />
          {YES_NO_UNSURE.map((opt) => (
            <button
              key={opt.value}
              type="button"
              className="answer-button"
              aria-pressed={s[key] === opt.value}
              onClick={() => set(key, opt.value)}
            >
              {s[key] === opt.value ? `[x] ${opt.label}` : `[ ] ${opt.label}`}
            </button>
          ))}
        </p>
      ))}

      <p>
        Not sure on these? Run the{" "}
        <Link href="/score">two-minute self-audit</Link> first — it scores all
        ten criteria and shows your maturity level.
      </p>

      <p>## Scope</p>

      <p>
        <label htmlFor="ai-use-case">main agent use case</label>
        <br />
        <textarea
          id="ai-use-case"
          rows={3}
          placeholder="What do you want agents to be able to do with your content?"
          value={s.useCase}
          onChange={(e) => set("useCase", e.target.value)}
        />
      </p>

      <p>
        <span>desired deliverable</span>
        <br />
        {[
          "audit only",
          "audit + implementation help",
          "not sure yet",
        ].map((value) => (
          <button
            key={value}
            type="button"
            className="answer-button"
            aria-pressed={s.deliverable === value}
            onClick={() => set("deliverable", value)}
          >
            {s.deliverable === value ? `[x] ${value}` : `[ ] ${value}`}
          </button>
        ))}
      </p>

      <p>
        <label htmlFor="ai-package">package of interest</label>
        <br />
        <select
          id="ai-package"
          value={s.packageInterest}
          onChange={(e) => set("packageInterest", e.target.value)}
        >
          <option value="">choose one</option>
          <option value="Agent-Ready Site Audit ($750)">
            Agent-Ready Site Audit ($750)
          </option>
          <option value="Documentation Audit ($2,500)">
            Documentation Audit ($2,500)
          </option>
          <option value="Implementation Package (from $2,000)">
            Implementation Package (from $2,000)
          </option>
          <option value="not sure yet">not sure yet</option>
        </select>
      </p>

      <p>## Contact</p>

      <p>
        <label htmlFor="ai-name">your name</label>
        <br />
        <input
          id="ai-name"
          type="text"
          value={s.name}
          onChange={(e) => set("name", e.target.value)}
        />
      </p>

      <p>
        <label htmlFor="ai-org">organization</label>
        <br />
        <input
          id="ai-org"
          type="text"
          value={s.organization}
          onChange={(e) => set("organization", e.target.value)}
        />
      </p>

      <p>
        <label htmlFor="ai-email">reply email (required)</label>
        <br />
        <input
          id="ai-email"
          type="email"
          inputMode="email"
          placeholder="you@example.com"
          value={s.email}
          onChange={(e) => set("email", e.target.value)}
        />
      </p>

      {error && (
        <p role="alert" className="audit-intake-error">
          {error}
        </p>
      )}

      <p className="audit-progress">
        <button type="button" onClick={submit}>
          [send audit request]
        </button>
      </p>

      {submitted && (
        <div className="audit-intake-sent">
          <p>## Almost done</p>
          <p>
            Your email client should have opened with this request to{" "}
            <a href={`mailto:${AUDIT_INBOX}`}>{AUDIT_INBOX}</a>. If it
            didn&apos;t, copy the message below and email it to us directly. You
            will get a yes/no on fit within 2 business days.
          </p>
          <p className="audit-actions">
            <a href={mailtoHref}>[reopen email]</a>{" "}
            <button type="button" onClick={copy}>
              {copied ? "[copied]" : "[copy request]"}
            </button>
          </p>
          <textarea
            className="audit-intake-message"
            readOnly
            rows={18}
            value={`To: ${AUDIT_INBOX}\nSubject: ${subject}\n\n${message}`}
          />
        </div>
      )}
    </div>
  );
}
