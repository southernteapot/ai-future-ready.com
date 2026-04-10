'use client';

import { useState } from 'react';
import { models, providerColors } from '@/data/models';

export default function CompareClient() {
  const [selectedIds, setSelectedIds] = useState<string[]>([
    'gpt-5.4',
    'claude-opus-4.6',
    'gemini-3.1-pro',
  ]);

  const toggleModel = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : prev.length < 4 ? [...prev, id] : prev
    );
  };

  const selected = models.filter((m) => selectedIds.includes(m.id));

  return (
    <div>
      {/* Model selector */}
      <div className="mb-10">
        <h2 className="text-lg font-semibold mb-4">
          Select up to 4 models to compare{' '}
          <span className="text-muted font-normal">({selectedIds.length}/4 selected)</span>
        </h2>
        <div className="flex flex-wrap gap-2">
          {models.map((model) => (
            <button
              key={model.id}
              onClick={() => toggleModel(model.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border-2 ${
                selectedIds.includes(model.id)
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-card-border bg-card text-muted hover:border-primary/50'
              } ${
                !selectedIds.includes(model.id) && selectedIds.length >= 4
                  ? 'opacity-40 cursor-not-allowed'
                  : ''
              }`}
              disabled={!selectedIds.includes(model.id) && selectedIds.length >= 4}
            >
              {model.name}
            </button>
          ))}
        </div>
      </div>

      {selected.length === 0 ? (
        <p className="text-center text-muted py-16">Select at least one model to compare.</p>
      ) : (
        <>
          {/* Comparison Table */}
          <div className="overflow-x-auto mb-12">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-4 bg-surface rounded-tl-xl font-semibold text-sm text-muted">
                    Feature
                  </th>
                  {selected.map((model) => (
                    <th
                      key={model.id}
                      className="text-left p-4 bg-surface font-semibold text-sm last:rounded-tr-xl"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: providerColors[model.provider] }}
                        />
                        <span>{model.name}</span>
                      </div>
                      <span className="text-xs text-muted font-normal">{model.provider}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-card-border">
                  <td className="p-4 text-sm font-medium text-muted">Type</td>
                  {selected.map((m) => (
                    <td key={m.id} className="p-4 text-sm">
                      <span
                        className={`px-2 py-1 rounded-md text-xs font-medium ${
                          m.type === 'open-source'
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                        }`}
                      >
                        {m.type === 'open-source' ? 'Open Source' : 'Proprietary'}
                      </span>
                    </td>
                  ))}
                </tr>
                <tr className="border-t border-card-border">
                  <td className="p-4 text-sm font-medium text-muted">Context Window</td>
                  {selected.map((m) => (
                    <td key={m.id} className="p-4 text-sm font-medium">
                      {m.contextWindow}
                    </td>
                  ))}
                </tr>
                <tr className="border-t border-card-border">
                  <td className="p-4 text-sm font-medium text-muted">Input Pricing</td>
                  {selected.map((m) => (
                    <td key={m.id} className="p-4 text-sm">
                      {m.pricing.input}
                    </td>
                  ))}
                </tr>
                <tr className="border-t border-card-border">
                  <td className="p-4 text-sm font-medium text-muted">Output Pricing</td>
                  {selected.map((m) => (
                    <td key={m.id} className="p-4 text-sm">
                      {m.pricing.output}
                    </td>
                  ))}
                </tr>
                <tr className="border-t border-card-border">
                  <td className="p-4 text-sm font-medium text-muted">Parameters</td>
                  {selected.map((m) => (
                    <td key={m.id} className="p-4 text-sm">
                      {m.parameters || 'Undisclosed'}
                    </td>
                  ))}
                </tr>
                <tr className="border-t border-card-border">
                  <td className="p-4 text-sm font-medium text-muted">Release Date</td>
                  {selected.map((m) => (
                    <td key={m.id} className="p-4 text-sm">
                      {m.releaseDate}
                    </td>
                  ))}
                </tr>

                {/* Benchmarks */}
                <tr className="border-t-2 border-primary/20">
                  <td className="p-4 text-sm font-bold text-primary" colSpan={selected.length + 1}>
                    Benchmarks (out of 100)
                  </td>
                </tr>
                {(['reasoning', 'coding', 'math', 'writing', 'multilingual', 'speed'] as const).map(
                  (key) => (
                    <tr key={key} className="border-t border-card-border">
                      <td className="p-4 text-sm font-medium text-muted capitalize">{key}</td>
                      {selected.map((m) => {
                        const value = m.benchmarks[key];
                        const maxVal = Math.max(...selected.map((s) => s.benchmarks[key]));
                        const isMax = value === maxVal && selected.length > 1;
                        return (
                          <td key={m.id} className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="flex-1 h-2 bg-surface rounded-full overflow-hidden">
                                <div
                                  className="h-full rounded-full transition-all duration-500"
                                  style={{
                                    width: `${value}%`,
                                    backgroundColor: providerColors[m.provider],
                                  }}
                                />
                              </div>
                              <span
                                className={`text-sm font-mono ${
                                  isMax ? 'font-bold text-primary' : 'text-muted'
                                }`}
                              >
                                {value}
                              </span>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  )
                )}

                {/* Best For */}
                <tr className="border-t-2 border-primary/20">
                  <td className="p-4 text-sm font-bold text-primary" colSpan={selected.length + 1}>
                    Best For
                  </td>
                </tr>
                <tr className="border-t border-card-border">
                  <td className="p-4 text-sm font-medium text-muted">Use Cases</td>
                  {selected.map((m) => (
                    <td key={m.id} className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {m.bestFor.map((use) => (
                          <span
                            key={use}
                            className="px-2 py-1 bg-surface rounded-md text-xs text-muted"
                          >
                            {use}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Strengths */}
                <tr className="border-t-2 border-primary/20">
                  <td className="p-4 text-sm font-bold text-primary" colSpan={selected.length + 1}>
                    Strengths & Weaknesses
                  </td>
                </tr>
                <tr className="border-t border-card-border">
                  <td className="p-4 text-sm font-medium text-green-600">Strengths</td>
                  {selected.map((m) => (
                    <td key={m.id} className="p-4">
                      <ul className="space-y-1">
                        {m.strengths.map((s) => (
                          <li key={s} className="text-xs text-muted flex items-start gap-1">
                            <span className="text-green-500 mt-0.5">+</span> {s}
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
                <tr className="border-t border-card-border">
                  <td className="p-4 text-sm font-medium text-red-500">Weaknesses</td>
                  {selected.map((m) => (
                    <td key={m.id} className="p-4">
                      <ul className="space-y-1">
                        {m.weaknesses.map((w) => (
                          <li key={w} className="text-xs text-muted flex items-start gap-1">
                            <span className="text-red-400 mt-0.5">-</span> {w}
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
