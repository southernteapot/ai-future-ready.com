import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { models, providerColors } from '@/data/models';

/* ------------------------------------------------------------------ */
/*  Static generation                                                 */
/* ------------------------------------------------------------------ */

export function generateStaticParams() {
  return models.map((model) => ({ id: model.id }));
}

export const dynamicParams = false;

/* ------------------------------------------------------------------ */
/*  Dynamic SEO metadata                                              */
/* ------------------------------------------------------------------ */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const model = models.find((m) => m.id === id);
  if (!model) return {};

  const title = `${model.name} by ${model.provider} — AI Model Overview`;
  const description = model.description;

  return {
    title,
    description,
    keywords: [
      model.name,
      model.provider,
      'AI model',
      'LLM',
      ...model.bestFor,
    ],
    openGraph: {
      title,
      description,
      url: `https://ai-future-ready.com/models/${model.id}`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

/* ------------------------------------------------------------------ */
/*  Helper: benchmark bar (server component)                          */
/* ------------------------------------------------------------------ */

function BenchmarkBar({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-muted w-24 shrink-0">{label}</span>
      <div className="flex-1 bg-surface rounded-full h-3 overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{ width: `${value}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-sm font-bold w-10 text-right" style={{ color }}>
        {value}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page component                                                    */
/* ------------------------------------------------------------------ */

export default async function ModelDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const model = models.find((m) => m.id === id);
  if (!model) notFound();

  const color = providerColors[model.provider] || '#6366f1';

  // Related models: same provider or same type (excluding current)
  const related = models
    .filter(
      (m) =>
        m.id !== model.id &&
        (m.provider === model.provider || m.type === model.type)
    )
    .slice(0, 4);

  /* JSON-LD Product schema */
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: model.name,
    description: model.description,
    brand: {
      '@type': 'Organization',
      name: model.provider,
      url: model.website,
    },
    category: 'AI Language Model',
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Context Window',
        value: model.contextWindow,
      },
      ...(model.parameters
        ? [
            {
              '@type': 'PropertyValue',
              name: 'Parameters',
              value: model.parameters,
            },
          ]
        : []),
      {
        '@type': 'PropertyValue',
        name: 'Release Date',
        value: model.releaseDate,
      },
      {
        '@type': 'PropertyValue',
        name: 'Type',
        value: model.type === 'proprietary' ? 'Proprietary' : 'Open Source',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />

      {/* ---- Hero ---- */}
      <section className="hero-gradient text-white py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-8">
            <Link href="/" className="hover:text-white/90 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/models"
              className="hover:text-white/90 transition-colors"
            >
              Models
            </Link>
            <span>/</span>
            <span className="text-white/90">{model.name}</span>
          </nav>

          <div className="flex flex-wrap items-start gap-3 mb-4">
            <span
              className="inline-block w-3 h-3 rounded-full mt-2"
              style={{ backgroundColor: color }}
            />
            <div>
              <p className="text-sm font-semibold text-white/70">
                {model.provider}
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
                {model.name}
              </h1>
            </div>
            <span
              className="text-xs font-semibold px-3 py-1 rounded-full ml-auto mt-2"
              style={{
                backgroundColor:
                  model.type === 'proprietary'
                    ? 'rgba(255,255,255,0.15)'
                    : 'rgba(16,185,129,0.25)',
                color:
                  model.type === 'proprietary' ? '#e0e7ff' : '#6ee7b7',
              }}
            >
              {model.type === 'proprietary' ? 'Proprietary' : 'Open Source'}
            </span>
          </div>

          <p className="max-w-3xl text-lg sm:text-xl text-white/85 leading-relaxed mt-4">
            {model.description}
          </p>

          {/* Quick facts */}
          <div className="flex flex-wrap gap-6 mt-8 text-sm text-white/75">
            <div>
              <span className="block text-xs uppercase tracking-wider text-white/50 mb-1">
                Context
              </span>
              <span className="font-semibold text-white">
                {model.contextWindow}
              </span>
            </div>
            {model.parameters && (
              <div>
                <span className="block text-xs uppercase tracking-wider text-white/50 mb-1">
                  Parameters
                </span>
                <span className="font-semibold text-white">
                  {model.parameters}
                </span>
              </div>
            )}
            <div>
              <span className="block text-xs uppercase tracking-wider text-white/50 mb-1">
                Released
              </span>
              <span className="font-semibold text-white">
                {model.releaseDate}
              </span>
            </div>
            <div>
              <span className="block text-xs uppercase tracking-wider text-white/50 mb-1">
                License
              </span>
              <span className="font-semibold text-white">
                {model.license}
              </span>
            </div>
            <div>
              <span className="block text-xs uppercase tracking-wider text-white/50 mb-1">
                Modality
              </span>
              <span className="font-semibold text-white">
                {model.modality.map((m) => m.charAt(0).toUpperCase() + m.slice(1)).join(', ')}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Main content ---- */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column (2/3) */}
            <div className="lg:col-span-2 space-y-10">
              {/* Benchmarks */}
              <div className="bg-card rounded-2xl border border-card-border p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-6">Benchmark Scores</h2>
                <div className="space-y-3">
                  <BenchmarkBar
                    label="Reasoning"
                    value={model.benchmarks.reasoning}
                    color={color}
                  />
                  <BenchmarkBar
                    label="Coding"
                    value={model.benchmarks.coding}
                    color={color}
                  />
                  <BenchmarkBar
                    label="Math"
                    value={model.benchmarks.math}
                    color={color}
                  />
                  <BenchmarkBar
                    label="Writing"
                    value={model.benchmarks.writing}
                    color={color}
                  />
                  <BenchmarkBar
                    label="Multilingual"
                    value={model.benchmarks.multilingual}
                    color={color}
                  />
                  <BenchmarkBar
                    label="Speed"
                    value={model.benchmarks.speed}
                    color={color}
                  />
                </div>
              </div>

              {/* Strengths & Weaknesses */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Strengths */}
                <div className="bg-card rounded-2xl border border-card-border p-6 shadow-sm">
                  <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-500/10">
                      <svg
                        className="w-4 h-4 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                    Strengths
                  </h2>
                  <ul className="space-y-2">
                    {model.strengths.map((s) => (
                      <li
                        key={s}
                        className="flex items-start gap-2 text-sm leading-relaxed"
                      >
                        <span className="text-green-500 mt-0.5 shrink-0">
                          +
                        </span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Weaknesses */}
                <div className="bg-card rounded-2xl border border-card-border p-6 shadow-sm">
                  <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-500/10">
                      <svg
                        className="w-4 h-4 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </span>
                    Weaknesses
                  </h2>
                  <ul className="space-y-2">
                    {model.weaknesses.map((w) => (
                      <li
                        key={w}
                        className="flex items-start gap-2 text-sm leading-relaxed"
                      >
                        <span className="text-red-500 mt-0.5 shrink-0">
                          -
                        </span>
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Best For */}
              <div className="bg-card rounded-2xl border border-card-border p-6 shadow-sm">
                <h2 className="text-lg font-bold mb-4">Best For</h2>
                <div className="flex flex-wrap gap-2">
                  {model.bestFor.map((b) => (
                    <span
                      key={b}
                      className="text-sm px-3 py-1.5 rounded-lg border border-card-border bg-surface font-medium"
                      style={{ color }}
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right column (1/3) sidebar */}
            <div className="space-y-6">
              {/* Pricing card */}
              <div className="bg-card rounded-2xl border border-card-border p-6 shadow-sm">
                <h2 className="text-lg font-bold mb-4">Pricing</h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted">Input</span>
                    <span className="font-semibold text-sm">
                      {model.pricing.input}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted">Output</span>
                    <span className="font-semibold text-sm">
                      {model.pricing.output}
                    </span>
                  </div>
                  {model.pricing.free && (
                    <div className="mt-2">
                      <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-green-500/10 text-green-500">
                        Free / Open Source
                      </span>
                    </div>
                  )}
                  {model.pricing.note && (
                    <p className="text-xs text-muted italic mt-2 border-t border-card-border pt-3">
                      {model.pricing.note}
                    </p>
                  )}
                </div>
              </div>

              {/* Specs card */}
              <div className="bg-card rounded-2xl border border-card-border p-6 shadow-sm">
                <h2 className="text-lg font-bold mb-4">Specifications</h2>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted">Provider</dt>
                    <dd className="font-semibold">{model.provider}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted">Type</dt>
                    <dd className="font-semibold">
                      {model.type === 'proprietary'
                        ? 'Proprietary'
                        : 'Open Source'}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted">License</dt>
                    <dd className="font-semibold">{model.license}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted">Context Window</dt>
                    <dd className="font-semibold">{model.contextWindow}</dd>
                  </div>
                  {model.parameters && (
                    <div className="flex justify-between">
                      <dt className="text-muted">Parameters</dt>
                      <dd className="font-semibold">{model.parameters}</dd>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <dt className="text-muted">Modality</dt>
                    <dd className="font-semibold">
                      {model.modality.map((m) => m.charAt(0).toUpperCase() + m.slice(1)).join(', ')}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted">Released</dt>
                    <dd className="font-semibold">{model.releaseDate}</dd>
                  </div>
                </dl>
              </div>

              {/* Hardware requirements card (open-source only) */}
              {model.hardwareRequirements && (
                <div className="bg-card rounded-2xl border border-card-border p-6 shadow-sm">
                  <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                    Hardware Requirements
                  </h2>
                  <p className="text-sm text-muted leading-relaxed">
                    {model.hardwareRequirements}
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="space-y-3">
                <a
                  href={model.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: color }}
                >
                  Visit {model.provider}
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
                <Link
                  href="/tools/compare"
                  className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl text-sm font-semibold bg-surface text-foreground border border-card-border hover:bg-surface-dark transition-colors"
                >
                  Compare Models
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </Link>
                <Link
                  href="/models"
                  className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl text-sm font-semibold text-muted hover:text-foreground transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  Back to All Models
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Related models ---- */}
      {related.length > 0 && (
        <section className="py-16 bg-surface">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8">Related Models</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {related.map((r) => {
                const rColor = providerColors[r.provider] || '#6366f1';
                return (
                  <Link
                    key={r.id}
                    href={`/models/${r.id}`}
                    className="bg-card rounded-xl border border-card-border p-5 card-hover shadow-sm block"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="inline-block w-2 h-2 rounded-full"
                        style={{ backgroundColor: rColor }}
                      />
                      <span className="text-xs text-muted">{r.provider}</span>
                    </div>
                    <h3 className="font-bold mb-1">{r.name}</h3>
                    <p className="text-xs text-muted line-clamp-2">
                      {r.description}
                    </p>
                    <span
                      className="inline-block text-xs font-semibold mt-3"
                      style={{ color: rColor }}
                    >
                      View details &rarr;
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
