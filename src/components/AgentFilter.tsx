'use client';

import { useState } from 'react';
import {
  agentPlatforms,
  categoryLabels,
  categoryColors,
} from '@/data/agents';
import type { AgentPlatform } from '@/data/agents';

type FilterCategory = 'all' | AgentPlatform['category'];

const filterTabs: { label: string; value: FilterCategory }[] = [
  { label: 'All Platforms', value: 'all' },
  { label: 'Personal Agents', value: 'personal-agent' },
  { label: 'Dev Frameworks', value: 'dev-framework' },
  { label: 'Orchestration', value: 'orchestration' },
  { label: 'Coding Agents', value: 'coding-agent' },
  { label: 'No-Code', value: 'no-code' },
];

function AgentCard({ platform }: { platform: AgentPlatform }) {
  const color = categoryColors[platform.category];

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
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: `${color}15`,
                color,
              }}
            >
              {categoryLabels[platform.category]}
            </span>
          </div>
          <h3 className="text-xl font-bold mt-1">{platform.name}</h3>
        </div>
        {platform.stars && (
          <div className="flex items-center gap-1 text-xs text-muted bg-surface px-2.5 py-1 rounded-full shrink-0">
            <svg
              className="w-3.5 h-3.5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            {platform.stars}
          </div>
        )}
      </div>

      {/* Description */}
      <p className="text-sm text-muted mb-4 leading-relaxed">
        {platform.description}
      </p>

      {/* Quick stats */}
      <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4 text-xs">
        <div>
          <span className="text-muted">License: </span>
          <span className="font-semibold">{platform.license}</span>
        </div>
        <div>
          <span className="text-muted">Pricing: </span>
          <span className="font-semibold">{platform.pricing}</span>
        </div>
        {platform.languages.length > 0 && (
          <div>
            <span className="text-muted">Languages: </span>
            <span className="font-semibold">
              {platform.languages.join(', ')}
            </span>
          </div>
        )}
      </div>

      {/* Key Features */}
      <div className="mb-4">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">
          Key Features
        </h4>
        <ul className="space-y-1">
          {platform.keyFeatures.slice(0, 4).map((feature) => (
            <li
              key={feature}
              className="text-sm text-muted flex items-start gap-2"
            >
              <svg
                className="w-4 h-4 shrink-0 mt-0.5"
                style={{ color }}
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
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {/* Best For */}
      <div className="mb-4 mt-auto">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">
          Best For
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {platform.bestFor.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded-md border border-card-border text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Links */}
      <div className="flex items-center gap-4 mt-auto pt-2">
        <a
          href={platform.website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
          style={{ color }}
        >
          Visit Website
          <svg
            className="w-3.5 h-3.5"
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
        {platform.github && (
          <a
            href={platform.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-foreground transition-colors"
          >
            GitHub
            <svg
              className="w-3.5 h-3.5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
}

export default function AgentFilter() {
  const [filter, setFilter] = useState<FilterCategory>('all');

  const filtered =
    filter === 'all'
      ? agentPlatforms
      : agentPlatforms.filter((p) => p.category === filter);

  return (
    <section>
      {/* Filter tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        {filterTabs.map((tab) => {
          const isActive = filter === tab.value;
          const count =
            tab.value === 'all'
              ? agentPlatforms.length
              : agentPlatforms.filter((p) => p.category === tab.value).length;
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

      {/* Platform cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.map((platform) => (
          <AgentCard key={platform.id} platform={platform} />
        ))}
      </div>
    </section>
  );
}
