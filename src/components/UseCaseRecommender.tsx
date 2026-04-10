'use client';

import { useState } from 'react';
import Link from 'next/link';
import { models, providerColors } from '@/data/models';
import type { AIModel } from '@/data/models';

/* ------------------------------------------------------------------ */
/*  Use-case definitions                                               */
/* ------------------------------------------------------------------ */

type BenchmarkKey = keyof AIModel['benchmarks'];

interface UseCase {
  id: string;
  label: string;
  icon: React.ReactNode;
  weights?: Partial<Record<BenchmarkKey, number>>;
  /** Custom scoring / filtering function (overrides weights) */
  custom?: (allModels: AIModel[]) => ScoredModel[];
}

interface ScoredModel {
  model: AIModel;
  score: number;
  reason: string;
}

/* ---------- helpers ---------- */

function avgBenchmark(m: AIModel): number {
  const b = m.benchmarks;
  return (b.reasoning + b.coding + b.math + b.writing + b.multilingual + b.speed) / 6;
}

function bestBenchmarkLabel(m: AIModel): { label: string; value: number } {
  const entries: { label: string; value: number }[] = [
    { label: 'Reasoning', value: m.benchmarks.reasoning },
    { label: 'Coding', value: m.benchmarks.coding },
    { label: 'Math', value: m.benchmarks.math },
    { label: 'Writing', value: m.benchmarks.writing },
    { label: 'Multilingual', value: m.benchmarks.multilingual },
    { label: 'Speed', value: m.benchmarks.speed },
  ];
  return entries.reduce((best, cur) => (cur.value > best.value ? cur : best), entries[0]);
}

function weightedScore(m: AIModel, weights: Partial<Record<BenchmarkKey, number>>): number {
  let total = 0;
  let wSum = 0;
  for (const [key, w] of Object.entries(weights) as [BenchmarkKey, number][]) {
    total += m.benchmarks[key] * w;
    wSum += w;
  }
  return wSum > 0 ? total / wSum : 0;
}

function autoReason(m: AIModel, _useCaseLabel: string): string {
  const best = bestBenchmarkLabel(m);
  return `Top ${best.label.toLowerCase()} score of ${best.value}/100 among recommended models.`;
}

function scoreWithWeights(weights: Partial<Record<BenchmarkKey, number>>): (allModels: AIModel[]) => ScoredModel[] {
  return (allModels) => {
    const scored = allModels.map((model) => ({
      model,
      score: weightedScore(model, weights),
      reason: '',
    }));
    scored.sort((a, b) => b.score - a.score);
    const top = scored.slice(0, 3);
    return top.map((s) => ({ ...s, reason: autoReason(s.model, '') }));
  };
}

/** Parse a price string like "$5.00 / 1M tokens" or "Free (self-hosted)" to a number ($/1M tokens). Returns Infinity for unparseable. */
function parsePrice(priceStr: string): number {
  if (/free/i.test(priceStr)) return 0;
  const match = priceStr.match(/\$([\d.]+)/);
  return match ? parseFloat(match[1]) : Infinity;
}

/* ---------- use case list ---------- */

const useCases: UseCase[] = [
  {
    id: 'coding',
    label: 'Coding Assistant',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
    custom: scoreWithWeights({ coding: 3, reasoning: 2, speed: 1.5 }),
  },
  {
    id: 'writing',
    label: 'Creative Writing',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
      </svg>
    ),
    custom: scoreWithWeights({ writing: 3, multilingual: 1.5, reasoning: 1 }),
  },
  {
    id: 'research',
    label: 'Research & Analysis',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803a7.5 7.5 0 0010.607 0z" />
      </svg>
    ),
    custom: scoreWithWeights({ reasoning: 3, math: 2, multilingual: 1.5 }),
  },
  {
    id: 'math',
    label: 'Math & Science',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.91 59.91 0 0112 3.493 59.91 59.91 0 0123.399 9.334a50.6 50.6 0 00-2.658.813m-15.482 0A50.697 50.697 0 0112 13.489a50.697 50.697 0 017.74-3.342" />
      </svg>
    ),
    custom: scoreWithWeights({ math: 3, reasoning: 2, coding: 1 }),
  },
  {
    id: 'multilingual',
    label: 'Multilingual Tasks',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A9 9 0 013 12c0-1.56.398-3.03 1.098-4.312" />
      </svg>
    ),
    custom: scoreWithWeights({ multilingual: 3, writing: 1.5, reasoning: 1 }),
  },
  {
    id: 'cost',
    label: 'Cost-Effective Production',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    custom: (allModels) => {
      // Weight speed 2x, then sort by cheapest, with quality floor of avg benchmark >= 75
      const qualifying = allModels.filter((m) => avgBenchmark(m) >= 75);
      const scored = qualifying.map((m) => {
        const speedScore = m.benchmarks.speed * 2;
        const inputPrice = parsePrice(m.pricing.input);
        const outputPrice = parsePrice(m.pricing.output);
        const avgPrice = (inputPrice + outputPrice) / 2;
        // Lower price is better -- invert price into a 0-100ish bonus
        const costBonus = avgPrice === 0 ? 100 : Math.max(0, 100 - avgPrice * 5);
        return {
          model: m,
          score: speedScore + costBonus,
          reason: '',
        };
      });
      scored.sort((a, b) => b.score - a.score);
      const top = scored.slice(0, 3);
      return top.map((s) => {
        const price = s.model.pricing.free
          ? 'Free / open-source'
          : s.model.pricing.input;
        return {
          ...s,
          reason: `Speed ${s.model.benchmarks.speed}/100 with ${price} input pricing -- great value.`,
        };
      });
    },
  },
  {
    id: 'edge',
    label: 'On-Device / Edge',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
    ),
    custom: (allModels) => {
      const edgeKeywords = /phone|laptop|4GB|2GB|8GB|Raspberry/i;
      const edgeModels = allModels.filter(
        (m) => m.hardwareRequirements && edgeKeywords.test(m.hardwareRequirements),
      );
      const scored = edgeModels.map((m) => ({
        model: m,
        score: m.benchmarks.speed,
        reason: `Runs on edge hardware (${m.hardwareRequirements}) with speed score ${m.benchmarks.speed}/100.`,
      }));
      scored.sort((a, b) => b.score - a.score);
      return scored.slice(0, 3);
    },
  },
  {
    id: 'rag',
    label: 'Enterprise RAG',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
      </svg>
    ),
    custom: (allModels) => {
      const ragKeywords = /RAG|retrieval|document/i;
      const scored = allModels.map((m) => {
        const base = weightedScore(m, { writing: 2, reasoning: 2, multilingual: 1.5 });
        const textToSearch = [
          ...m.bestFor,
          m.description,
        ].join(' ');
        const ragBonus = ragKeywords.test(textToSearch) ? 10 : 0;
        return {
          model: m,
          score: base + ragBonus,
          reason: '',
        };
      });
      scored.sort((a, b) => b.score - a.score);
      const top = scored.slice(0, 3);
      return top.map((s) => {
        const best = bestBenchmarkLabel(s.model);
        const hasRAG = ragKeywords.test([...s.model.bestFor, s.model.description].join(' '));
        const ragNote = hasRAG ? ' Built for retrieval-augmented generation.' : '';
        return {
          ...s,
          reason: `Strong ${best.label.toLowerCase()} (${best.value}/100) with balanced writing and reasoning.${ragNote}`,
        };
      });
    },
  },
];

/* ------------------------------------------------------------------ */
/*  Result card                                                        */
/* ------------------------------------------------------------------ */

function RecommendationCard({ item, rank }: { item: ScoredModel; rank: number }) {
  const { model, reason } = item;
  const color = providerColors[model.provider] || '#6366f1';
  const best = bestBenchmarkLabel(model);

  return (
    <div className="bg-card rounded-2xl border border-card-border p-5 card-hover shadow-sm flex flex-col relative overflow-hidden">
      {/* Rank badge */}
      <span
        className="absolute top-0 right-0 text-xs font-bold px-3 py-1 rounded-bl-xl text-white"
        style={{ backgroundColor: color }}
      >
        #{rank}
      </span>

      {/* Provider + Name */}
      <div className="flex items-center gap-2 mb-1">
        <span className="inline-block w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
        <span className="text-xs font-medium text-muted">{model.provider}</span>
      </div>
      <Link href={`/models/${model.id}`} className="hover:underline">
        <h4 className="text-lg font-bold mb-2">{model.name}</h4>
      </Link>

      {/* Reason */}
      <p className="text-sm text-muted mb-4 leading-relaxed">{reason}</p>

      {/* Key stats */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-surface rounded-xl p-2.5 text-center">
          <p className="text-xs text-muted mb-0.5">Best Score</p>
          <p className="text-sm font-bold" style={{ color }}>{best.label} {best.value}</p>
        </div>
        <div className="bg-surface rounded-xl p-2.5 text-center">
          <p className="text-xs text-muted mb-0.5">Price (In)</p>
          <p className="text-sm font-bold">{model.pricing.free ? 'Free' : model.pricing.input.replace(' / 1M tokens', '')}</p>
        </div>
        <div className="bg-surface rounded-xl p-2.5 text-center">
          <p className="text-xs text-muted mb-0.5">Context</p>
          <p className="text-sm font-bold">{model.contextWindow.replace(' tokens', '')}</p>
        </div>
      </div>

      {/* View link */}
      <Link
        href={`/models/${model.id}`}
        className="inline-flex items-center gap-1.5 text-sm font-medium mt-auto transition-colors"
        style={{ color }}
      >
        View Details
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </Link>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function UseCaseRecommender() {
  const [selected, setSelected] = useState<string | null>(null);

  const activeCase = useCases.find((uc) => uc.id === selected);
  const recommendations: ScoredModel[] = activeCase?.custom
    ? activeCase.custom(models)
    : [];

  return (
    <section>
      {/* Use case grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {useCases.map((uc) => {
          const isActive = selected === uc.id;
          return (
            <button
              key={uc.id}
              onClick={() => setSelected(isActive ? null : uc.id)}
              className={`flex flex-col items-center gap-2 p-4 rounded-2xl border text-sm font-medium transition-all cursor-pointer ${
                isActive
                  ? 'bg-primary text-white border-primary shadow-md shadow-primary/25'
                  : 'bg-card border-card-border text-muted hover:text-foreground hover:border-primary/40 hover:shadow-sm'
              }`}
            >
              <span className={isActive ? 'text-white' : 'text-primary'}>{uc.icon}</span>
              {uc.label}
            </button>
          );
        })}
      </div>

      {/* Recommendations */}
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          recommendations.length > 0
            ? 'max-h-[800px] opacity-100 mt-8'
            : 'max-h-0 opacity-0 mt-0'
        }`}
      >
        {recommendations.length > 0 && (
          <>
            <h3 className="text-lg font-bold mb-4">
              Top Picks for{' '}
              <span className="gradient-text">{activeCase?.label}</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {recommendations.map((item, i) => (
                <RecommendationCard key={item.model.id} item={item} rank={i + 1} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
