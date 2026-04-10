'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { models, providerColors } from '@/data/models';
import type { AIModel } from '@/data/models';

/** Parse 'YYYY-MM' or 'YYYY' into a sortable numeric key (newest first). */
function parseDateKey(date: string): number {
  const parts = date.split('-');
  const year = parseInt(parts[0], 10);
  const month = parts[1] ? parseInt(parts[1], 10) : 0;
  return year * 100 + month;
}

/** Format a release date string for display. */
function formatDate(date: string): string {
  const parts = date.split('-');
  if (parts.length === 1) return parts[0];
  const monthNames = [
    '', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];
  return `${monthNames[parseInt(parts[1], 10)]} ${parts[0]}`;
}

function ModalityIcon({ modality }: { modality: string }) {
  switch (modality) {
    case 'text':
      return (
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
        </svg>
      );
    case 'image':
      return (
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
    case 'video':
      return (
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      );
    case 'audio':
      return (
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      );
    default:
      return null;
  }
}

function avgBenchmark(model: AIModel): number {
  const b = model.benchmarks;
  return Math.round(
    (b.reasoning + b.coding + b.math + b.writing + b.multilingual + b.speed) / 6,
  );
}

function TimelineCard({ model }: { model: AIModel }) {
  const color = providerColors[model.provider] || '#6366f1';
  const avg = avgBenchmark(model);

  return (
    <div className="bg-card rounded-2xl border border-card-border p-4 card-hover shadow-sm w-full">
      {/* Provider + model name */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span
              className="inline-block w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: color }}
            />
            <span className="text-xs font-medium text-muted truncate">{model.provider}</span>
          </div>
          <Link href={`/models/${model.id}`} className="hover:underline">
            <h4 className="text-sm font-bold leading-snug">{model.name}</h4>
          </Link>
        </div>
        <span
          className="text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 whitespace-nowrap"
          style={{
            backgroundColor:
              model.type === 'proprietary'
                ? 'rgba(99, 102, 241, 0.1)'
                : 'rgba(16, 185, 129, 0.1)',
            color: model.type === 'proprietary' ? '#6366f1' : '#10b981',
          }}
        >
          {model.type === 'proprietary' ? 'Proprietary' : 'Open Source'}
        </span>
      </div>

      {/* Avg benchmark bar */}
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[10px] text-muted w-14 shrink-0">Avg Score</span>
        <div className="flex-1 bg-surface rounded-full h-1.5 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${avg}%`, backgroundColor: color }}
          />
        </div>
        <span className="text-[10px] font-semibold w-6 text-right" style={{ color }}>
          {avg}
        </span>
      </div>

      {/* Modality icons */}
      <div className="flex items-center gap-1.5">
        {model.modality.map((m) => (
          <span
            key={m}
            className="inline-flex items-center gap-0.5 text-[10px] px-1.5 py-0.5 rounded-full bg-surface text-muted"
          >
            <ModalityIcon modality={m} />
            {m}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ModelTimeline() {
  const grouped = useMemo(() => {
    // Group models by release date
    const map = new Map<string, AIModel[]>();
    for (const model of models) {
      const key = model.releaseDate;
      const existing = map.get(key);
      if (existing) {
        existing.push(model);
      } else {
        map.set(key, [model]);
      }
    }

    // Sort groups newest-first
    const entries = Array.from(map.entries());
    entries.sort((a, b) => parseDateKey(b[0]) - parseDateKey(a[0]));

    return entries;
  }, []);

  return (
    <div className="relative">
      {grouped.map(([date, dateModels], groupIdx) => (
        <div key={date} className="relative flex gap-4 sm:gap-8">
          {/* Timeline column (line + node) */}
          <div className="flex flex-col items-center shrink-0 w-20 sm:w-28">
            {/* Date label */}
            <span className="text-xs sm:text-sm font-bold text-foreground whitespace-nowrap mb-2">
              {formatDate(date)}
            </span>
            {/* Node circle */}
            <div
              className="w-3.5 h-3.5 rounded-full border-[3px] shrink-0 z-10"
              style={{
                borderColor: 'var(--color-primary)',
                backgroundColor: 'var(--color-card)',
              }}
            />
            {/* Vertical line extending down (skip for last group) */}
            {groupIdx < grouped.length - 1 && (
              <div
                className="flex-1 w-0.5 min-h-4"
                style={{
                  background:
                    'linear-gradient(to bottom, var(--color-primary), var(--color-secondary))',
                }}
              />
            )}
          </div>

          {/* Cards column */}
          <div className="flex-1 pb-8 min-w-0">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
              {dateModels.map((model) => (
                <TimelineCard key={model.id} model={model} />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
