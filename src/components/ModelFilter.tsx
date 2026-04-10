'use client';

import { useState } from 'react';
import Link from 'next/link';
import { models, providerColors } from '@/data/models';
import type { AIModel } from '@/data/models';

type FilterType = 'all' | 'proprietary' | 'open-source';

const filterTabs: { label: string; value: FilterType }[] = [
  { label: 'All Models', value: 'all' },
  { label: 'Proprietary', value: 'proprietary' },
  { label: 'Open Source', value: 'open-source' },
];

function BenchmarkBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted w-20 shrink-0">{label}</span>
      <div className="flex-1 bg-surface rounded-full h-2 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500 bg-primary"
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="text-xs font-semibold w-8 text-right text-primary">{value}</span>
    </div>
  );
}

function ModelCard({ model }: { model: AIModel }) {
  const color = providerColors[model.provider] || '#6366f1';

  return (
    <div className="bg-card rounded-2xl border border-card-border p-6 card-hover shadow-sm flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span
              className="inline-block w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: color }}
            />
            <span className="text-xs font-medium text-muted">{model.provider}</span>
          </div>
          <Link href={`/models/${model.id}`} className="hover:underline">
            <h3 className="text-xl font-bold">{model.name}</h3>
          </Link>
        </div>
        <span
          className="text-xs font-semibold px-2.5 py-1 rounded-full"
          style={{
            backgroundColor: model.type === 'proprietary'
              ? 'rgba(99, 102, 241, 0.1)'
              : 'rgba(16, 185, 129, 0.1)',
            color: model.type === 'proprietary' ? '#6366f1' : '#10b981',
          }}
        >
          {model.type === 'proprietary' ? 'Proprietary' : 'Open Source'}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-muted mb-4 leading-relaxed">{model.description}</p>

      {/* Quick stats row */}
      <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4 text-xs">
        <div>
          <span className="text-muted">Context: </span>
          <span className="font-semibold">{model.contextWindow}</span>
        </div>
        {model.parameters && (
          <div>
            <span className="text-muted">Params: </span>
            <span className="font-semibold">{model.parameters}</span>
          </div>
        )}
        <div>
          <span className="text-muted">Released: </span>
          <span className="font-semibold">{model.releaseDate}</span>
        </div>
      </div>

      {/* Modality & License row */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {model.modality.map((m) => (
          <span
            key={m}
            className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-surface text-muted"
          >
            {m === 'text' && (
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" /></svg>
            )}
            {m === 'image' && (
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            )}
            {m === 'video' && (
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
            )}
            {m === 'audio' && (
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
            )}
            {m}
          </span>
        ))}
        <span className="text-xs px-2 py-0.5 rounded-full border border-card-border text-muted">
          {model.license}
        </span>
      </div>

      {/* Benchmarks */}
      <div className="space-y-1.5 mb-4">
        <BenchmarkBar label="Reasoning" value={model.benchmarks.reasoning} />
        <BenchmarkBar label="Coding" value={model.benchmarks.coding} />
        <BenchmarkBar label="Math" value={model.benchmarks.math} />
        <BenchmarkBar label="Writing" value={model.benchmarks.writing} />
        <BenchmarkBar label="Multilingual" value={model.benchmarks.multilingual} />
        <BenchmarkBar label="Speed" value={model.benchmarks.speed} />
      </div>

      {/* Strengths */}
      <div className="mb-4">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">Strengths</h4>
        <div className="flex flex-wrap gap-1.5">
          {model.strengths.slice(0, 3).map((s) => (
            <span
              key={s}
              className="text-xs px-2 py-1 rounded-md bg-surface"
              style={{ color }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Pricing */}
      <div className="mb-4 mt-auto">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">Pricing</h4>
        <div className="bg-surface rounded-xl p-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted">Input:</span>
            <span className="font-semibold">{model.pricing.input}</span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span className="text-muted">Output:</span>
            <span className="font-semibold">{model.pricing.output}</span>
          </div>
          {model.pricing.note && (
            <p className="text-xs text-muted mt-2 italic">{model.pricing.note}</p>
          )}
        </div>
      </div>

      {/* Best for */}
      <div className="mb-4">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">Best For</h4>
        <div className="flex flex-wrap gap-1.5">
          {model.bestFor.map((b) => (
            <span
              key={b}
              className="text-xs px-2 py-1 rounded-md border border-card-border text-muted"
            >
              {b}
            </span>
          ))}
        </div>
      </div>

      {/* Links */}
      <div className="flex items-center gap-4 mt-auto">
        <Link
          href={`/models/${model.id}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
          style={{ color }}
        >
          View Details
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
        <Link
          href={model.website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-foreground transition-colors"
        >
          Visit {model.provider}
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default function ModelFilter() {
  const [filter, setFilter] = useState<FilterType>('all');
  const [search, setSearch] = useState('');

  const filtered = models.filter((m) => {
    if (filter !== 'all' && m.type !== filter) return false;
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      m.name.toLowerCase().includes(q) ||
      m.provider.toLowerCase().includes(q) ||
      m.description.toLowerCase().includes(q) ||
      m.bestFor.some((b) => b.toLowerCase().includes(q)) ||
      m.license.toLowerCase().includes(q) ||
      m.modality.some((mod) => mod.toLowerCase().includes(q))
    );
  });

  const proprietaryCount = models.filter((m) => m.type === 'proprietary').length;
  const openSourceCount = models.filter((m) => m.type === 'open-source').length;

  return (
    <section>
      {/* Search + Filter row */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search models, providers, use cases..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl text-sm bg-surface border border-card-border text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {filterTabs.map((tab) => {
            const isActive = filter === tab.value;
            const count =
              tab.value === 'all'
                ? models.length
                : tab.value === 'proprietary'
                  ? proprietaryCount
                  : openSourceCount;
            return (
              <button
                key={tab.value}
                onClick={() => setFilter(tab.value)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-primary text-white shadow-md shadow-primary/25'
                    : 'bg-surface text-muted hover:text-foreground hover:bg-surface-dark'
                }`}
              >
                {tab.label}
                <span
                  className={`ml-1.5 text-xs ${
                    isActive ? 'text-white/80' : 'text-muted'
                  }`}
                >
                  ({count})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results count */}
      {search && (
        <p className="text-sm text-muted mb-4">
          {filtered.length} {filtered.length === 1 ? 'model' : 'models'} found
          {search && <> for &ldquo;{search}&rdquo;</>}
        </p>
      )}

      {/* Model cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.map((model) => (
          <ModelCard key={model.id} model={model} />
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-lg font-semibold mb-2">No models found</p>
          <p className="text-sm text-muted">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </section>
  );
}
