'use client';

import { useState } from 'react';
import Link from 'next/link';
import { models, providerColors } from '@/data/models';
import type { AIModel } from '@/data/models';

interface VramTier {
  label: string;
  vram: number;
  gpus: string;
}

const vramTiers: VramTier[] = [
  { label: '4GB', vram: 4, gpus: 'GTX 1650, etc.' },
  { label: '8GB', vram: 8, gpus: 'RTX 3060, RTX 4060' },
  { label: '12GB', vram: 12, gpus: 'RTX 3060 12GB, RTX 4070' },
  { label: '16GB', vram: 16, gpus: 'RTX 4070 Ti, A4000' },
  { label: '24GB', vram: 24, gpus: 'RTX 3090, RTX 4090' },
  { label: '40GB', vram: 40, gpus: 'A100 40GB' },
  { label: '48GB', vram: 48, gpus: 'RTX 6000, A6000' },
  { label: '80GB', vram: 80, gpus: 'A100 80GB, H100' },
  { label: '160GB+', vram: 160, gpus: 'Multi-GPU / Server' },
];

/**
 * Maps each model id to its minimum VRAM requirement in GB.
 *
 * Rules (based on active parameters):
 *  - <= 3B active:  2GB
 *  - <= 7B active:  4GB
 *  - <= 14B active: 8GB
 *  - <= 24B active: 12GB
 *  - <= 34B active: 16GB
 *  - <= 70B active: 24GB
 *  - <= 120B dense or <= 40B active MoE: 40GB
 *  - 400B+ total:   80GB
 *  - Unknown:        80GB (conservative)
 */
const vramRequirement: Record<string, number> = {
  // Llama 4 Maverick: 400B total (17B active) -> 80GB (400B+ total)
  'llama-4-maverick': 80,
  // Llama 4 Scout: 109B total (17B active MoE) -> 40GB (<=40B active MoE)
  'llama-4-scout': 40,
  // DeepSeek V3.2: 671B total (37B active MoE) -> 80GB (400B+ total)
  'deepseek-v3.2': 80,
  // DeepSeek R1: 671B total (37B active MoE) -> 80GB (400B+ total)
  'deepseek-r1': 80,
  // Mistral 3: 675B total (41B active MoE) -> 80GB (400B+ total)
  'mistral-3': 80,
  // Qwen 3: 1T+ total -> 80GB (400B+ total)
  'qwen-3': 80,
  // Hermes 4 405B: 405B dense -> 80GB (400B+ total)
  'hermes-4-405b': 80,
  // MiniMax M2.7: MoE undisclosed -> 80GB (unknown/conservative)
  'minimax-m2.7': 80,
  // GLM-5: 744B total (40B active MoE) -> 80GB (400B+ total)
  'glm-5': 80,
  // Kimi K2.5: MoE undisclosed -> 80GB (unknown/conservative)
  'kimi-k2.5': 80,
  // Qwen 3.5: 397B total (17B active MoE) -> 40GB (<=40B active MoE)
  'qwen-3.5': 40,
  // GPT-OSS-120B: 120B dense -> 40GB (<=120B dense)
  'gpt-oss-120b': 40,
  // Gemma 3: up to 27B -> 12GB (<=24B -> 12, but 27B is >24B, so <=34B -> 16GB)
  'gemma-3': 16,
  // Gemma 4: 31B dense variant (largest) -> 16GB (<=34B)
  'gemma-4': 16,
  // Command R+: 104B dense -> 40GB (<=120B dense)
  'command-r-plus': 40,
  // Yi-1.5 34B: 34B -> 16GB (<=34B)
  'yi-1.5-34b': 16,
  // Phi-4: 14B -> 8GB (<=14B)
  'phi-4': 8,
  // Falcon 3: up to 10B -> 4GB minimum (<=14B -> 8GB, but 3B variant -> 2GB; use largest: 10B -> 4GB)
  'falcon-3': 4,
  // SmolLM3 3B: 3B -> 2GB (<=3B)
  'smollm3-3b': 2,
  // Cohere Tiny Aya: 3.35B -> 2GB (<=3B... technically 3.35 > 3, so <=7B -> 4GB)
  'cohere-tiny-aya': 4,
  // Mistral Small 3 24B: 24B -> 12GB (<=24B)
  'mistral-small-3': 12,
  // Mistral Small 4: 119B total (6.5B active MoE) -> 4GB (<=7B active)
  'mistral-small-4': 4,
  // Nemotron 3 Super: 120B total (12B active MoE) -> 8GB (<=14B active)
  'nemotron-3-super': 8,
  // Nemotron-Cascade 2: 30B total (3B active MoE) -> 2GB (<=3B active)
  'nemotron-cascade-2': 2,
};

function getMinVram(model: AIModel): number {
  return vramRequirement[model.id] ?? 80; // conservative default
}

function getBenchmarkAverage(model: AIModel): number {
  const b = model.benchmarks;
  return Math.round((b.reasoning + b.coding + b.math + b.writing + b.multilingual + b.speed) / 6);
}

function GpuIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25z" />
    </svg>
  );
}

function CompatibleModelCard({ model }: { model: AIModel }) {
  const color = providerColors[model.provider] || '#6366f1';
  const avg = getBenchmarkAverage(model);
  const minVram = getMinVram(model);

  return (
    <div className="bg-card rounded-2xl border border-card-border p-5 card-hover shadow-sm flex flex-col gap-3">
      {/* Header row */}
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span
              className="inline-block w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: color }}
            />
            <span className="text-xs font-medium text-muted truncate">{model.provider}</span>
          </div>
          <Link href={`/models/${model.id}`} className="hover:underline">
            <h3 className="text-lg font-bold leading-tight">{model.name}</h3>
          </Link>
        </div>
        <span
          className="text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ml-2"
          style={{
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            color: '#10b981',
          }}
        >
          Open Source
        </span>
      </div>

      {/* Stats row */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
        {model.parameters && (
          <div>
            <span className="text-muted">Params: </span>
            <span className="font-semibold">{model.parameters}</span>
          </div>
        )}
        <div>
          <span className="text-muted">Min VRAM: </span>
          <span className="font-semibold">{minVram}GB</span>
        </div>
        <div>
          <span className="text-muted">Avg Score: </span>
          <span className="font-semibold" style={{ color }}>{avg}</span>
        </div>
      </div>

      {/* Benchmark mini-bars */}
      <div className="grid grid-cols-3 gap-x-3 gap-y-1">
        {(
          [
            ['Reason', model.benchmarks.reasoning],
            ['Code', model.benchmarks.coding],
            ['Math', model.benchmarks.math],
            ['Write', model.benchmarks.writing],
            ['Multi', model.benchmarks.multilingual],
            ['Speed', model.benchmarks.speed],
          ] as [string, number][]
        ).map(([label, value]) => (
          <div key={label} className="flex items-center gap-1.5">
            <span className="text-[10px] text-muted w-9 shrink-0">{label}</span>
            <div className="flex-1 bg-surface rounded-full h-1.5 overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: `${value}%`, backgroundColor: color }}
              />
            </div>
            <span className="text-[10px] font-semibold w-5 text-right" style={{ color }}>
              {value}
            </span>
          </div>
        ))}
      </div>

      {/* Hardware requirement string */}
      {model.hardwareRequirements && (
        <p className="text-xs text-muted leading-relaxed bg-surface rounded-xl px-3 py-2">
          <span className="font-semibold text-foreground">HW: </span>
          {model.hardwareRequirements}
        </p>
      )}

      {/* Link */}
      <div className="mt-auto pt-1">
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
      </div>
    </div>
  );
}

export default function HardwareFilter() {
  const [selectedVram, setSelectedVram] = useState<number | null>(null);

  const openSourceModels = models.filter((m) => m.type === 'open-source');

  const compatibleModels = selectedVram !== null
    ? openSourceModels
        .filter((m) => getMinVram(m) <= selectedVram)
        .sort((a, b) => getBenchmarkAverage(b) - getBenchmarkAverage(a))
    : [];

  return (
    <section>
      {/* VRAM selector */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <span className="flex items-center gap-2 text-sm font-medium text-muted mr-1">
          <GpuIcon />
          Your VRAM:
        </span>
        {vramTiers.map((tier) => {
          const isActive = selectedVram === tier.vram;
          return (
            <button
              key={tier.vram}
              onClick={() => setSelectedVram(isActive ? null : tier.vram)}
              className={`group relative px-3 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                isActive
                  ? 'bg-primary text-white shadow-md shadow-primary/25'
                  : 'bg-surface text-muted hover:text-foreground hover:bg-surface-dark'
              }`}
              title={tier.gpus}
            >
              {tier.label}
              {/* Tooltip with GPU examples */}
              <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded-lg bg-card border border-card-border text-xs text-muted whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-10">
                {tier.gpus}
              </span>
            </button>
          );
        })}
      </div>

      {/* Results */}
      {selectedVram === null ? (
        <div className="bg-surface rounded-2xl border border-card-border p-8 text-center">
          <div className="flex justify-center mb-3 text-muted">
            <GpuIcon />
          </div>
          <p className="text-muted text-sm">
            Select your GPU&apos;s VRAM above to see which open-source models you can run locally.
          </p>
        </div>
      ) : compatibleModels.length === 0 ? (
        <div className="bg-surface rounded-2xl border border-card-border p-8 text-center">
          <p className="text-muted text-sm">
            No open-source models in our database fit within {selectedVram}GB of VRAM.
            Consider cloud hosting or a multi-GPU setup.
          </p>
        </div>
      ) : (
        <>
          <p className="text-sm text-muted mb-4">
            <span className="font-semibold text-foreground">{compatibleModels.length}</span>{' '}
            open-source model{compatibleModels.length !== 1 ? 's' : ''} can run on a{' '}
            <span className="font-semibold text-foreground">{selectedVram}GB</span> GPU
            {selectedVram <= 24 ? ' (with quantization)' : ''}, sorted by benchmark average.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {compatibleModels.map((model) => (
              <CompatibleModelCard key={model.id} model={model} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
