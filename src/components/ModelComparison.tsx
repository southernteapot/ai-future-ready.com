'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { models, providerColors, benchmarkLabels } from '@/data/models';
import type { AIModel } from '@/data/models';

const MIN_MODELS = 2;
const MAX_MODELS = 3;

const benchmarkKeys = ['reasoning', 'coding', 'math', 'writing', 'multilingual', 'speed'] as const;

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function getColor(model: AIModel): string {
  return providerColors[model.provider] || '#6366f1';
}

/* ---- Modality icon helper ---- */
function ModalityIcon({ modality }: { modality: string }) {
  const iconClass = 'w-4 h-4';
  switch (modality) {
    case 'text':
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
        </svg>
      );
    case 'image':
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
    case 'video':
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      );
    case 'audio':
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      );
    default:
      return null;
  }
}

/* ---- Searchable model picker dropdown ---- */
function ModelPicker({
  index,
  selectedId,
  disabledIds,
  onSelect,
  onRemove,
}: {
  index: number;
  selectedId: string | null;
  disabledIds: string[];
  onSelect: (id: string) => void;
  onRemove: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const filtered = useMemo(
    () =>
      models.filter(
        (m) =>
          !disabledIds.includes(m.id) &&
          (m.name.toLowerCase().includes(search.toLowerCase()) ||
            m.provider.toLowerCase().includes(search.toLowerCase()))
      ),
    [search, disabledIds]
  );

  const selectedModel = selectedId ? models.find((m) => m.id === selectedId) : null;

  return (
    <div ref={ref} className="relative">
      {selectedModel ? (
        <div
          className="flex items-center gap-3 bg-card rounded-xl border-2 px-4 py-3 transition-all"
          style={{ borderColor: getColor(selectedModel) }}
        >
          <span
            className="w-3 h-3 rounded-full shrink-0"
            style={{ backgroundColor: getColor(selectedModel) }}
          />
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-sm truncate">{selectedModel.name}</div>
            <div className="text-xs text-muted">{selectedModel.provider}</div>
          </div>
          <button
            onClick={() => {
              onRemove();
              setSearch('');
            }}
            className="text-muted hover:text-danger transition-colors shrink-0 cursor-pointer"
            aria-label="Remove model"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ) : (
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center gap-3 bg-card rounded-xl border-2 border-dashed border-card-border hover:border-primary/50 px-4 py-3 transition-all cursor-pointer"
        >
          <span className="w-3 h-3 rounded-full shrink-0 border-2 border-muted" />
          <span className="text-sm text-muted">Select model {index + 1}...</span>
          <svg className="w-4 h-4 text-muted ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      )}

      {open && !selectedModel && (
        <div className="absolute z-50 top-full mt-1 left-0 right-0 bg-card rounded-xl border border-card-border shadow-lg max-h-72 overflow-hidden flex flex-col">
          <div className="p-2 border-b border-card-border">
            <input
              type="text"
              placeholder="Search models or providers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg bg-surface border-none outline-none placeholder:text-muted"
              autoFocus
            />
          </div>
          <div className="overflow-y-auto flex-1">
            {filtered.length === 0 ? (
              <div className="p-4 text-center text-sm text-muted">No models found.</div>
            ) : (
              filtered.map((m) => {
                const color = getColor(m);
                return (
                  <button
                    key={m.id}
                    onClick={() => {
                      onSelect(m.id);
                      setOpen(false);
                      setSearch('');
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-surface transition-colors text-left cursor-pointer"
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: color }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{m.name}</div>
                      <div className="text-xs text-muted">{m.provider}</div>
                    </div>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full shrink-0"
                      style={{
                        backgroundColor:
                          m.type === 'proprietary'
                            ? 'rgba(99, 102, 241, 0.1)'
                            : 'rgba(16, 185, 129, 0.1)',
                        color: m.type === 'proprietary' ? '#6366f1' : '#10b981',
                      }}
                    >
                      {m.type === 'proprietary' ? 'Proprietary' : 'Open Source'}
                    </span>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ---- Section divider row ---- */
function SectionHeader({ label }: { label: string }) {
  return (
    <div className="col-span-full pt-6 pb-2 border-b-2 border-primary/20">
      <h3 className="text-sm font-bold text-primary uppercase tracking-wider">{label}</h3>
    </div>
  );
}

/* ---- Spec row ---- */
function SpecRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="py-3 pr-4 text-sm font-medium text-muted border-b border-card-border">{label}</div>
      {children}
    </>
  );
}

/* ---- Benchmark bar with winner highlighting ---- */
function ComparisonBenchmarkBar({
  value,
  color,
  isWinner,
}: {
  value: number;
  color: string;
  isWinner: boolean;
}) {
  return (
    <div className="py-3 border-b border-card-border">
      <div className="flex items-center gap-3">
        <div className="flex-1 h-2.5 bg-surface rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${value}%`, backgroundColor: color }}
          />
        </div>
        <span
          className={`text-sm font-mono min-w-[2rem] text-right ${
            isWinner ? 'font-bold' : 'text-muted'
          }`}
          style={isWinner ? { color } : undefined}
        >
          {value}
        </span>
        {isWinner && (
          <svg
            className="w-4 h-4 shrink-0"
            style={{ color }}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
    </div>
  );
}

/* ---- Main component ---- */
export default function ModelComparison() {
  const [selectedIds, setSelectedIds] = useState<(string | null)[]>([
    'gpt-5.4',
    'claude-opus-4.6',
    null,
  ]);

  const selectedModels = useMemo(
    () =>
      selectedIds
        .filter((id): id is string => id !== null)
        .map((id) => models.find((m) => m.id === id))
        .filter((m): m is AIModel => m !== undefined),
    [selectedIds]
  );

  const usedIds = selectedIds.filter((id): id is string => id !== null);

  function handleSelect(index: number, id: string) {
    setSelectedIds((prev) => {
      const next = [...prev];
      next[index] = id;
      return next;
    });
  }

  function handleRemove(index: number) {
    setSelectedIds((prev) => {
      const next = [...prev];
      next[index] = null;
      return next;
    });
  }

  function addSlot() {
    if (selectedIds.length < MAX_MODELS) {
      setSelectedIds((prev) => [...prev, null]);
    }
  }

  function removeSlot(index: number) {
    if (selectedIds.length > MIN_MODELS) {
      setSelectedIds((prev) => prev.filter((_, i) => i !== index));
    }
  }

  const colCount = selectedIds.length;
  const gridCols =
    colCount === 2
      ? 'grid-cols-[180px_1fr_1fr]'
      : 'grid-cols-[180px_1fr_1fr_1fr]';

  function getWinner(key: typeof benchmarkKeys[number]): number {
    if (selectedModels.length < 2) return -1;
    let maxVal = -1;
    let maxIdx = -1;
    selectedModels.forEach((m, i) => {
      if (m.benchmarks[key] > maxVal) {
        maxVal = m.benchmarks[key];
        maxIdx = i;
      }
    });
    // Only highlight if the winner is unique
    const count = selectedModels.filter((m) => m.benchmarks[key] === maxVal).length;
    return count === 1 ? maxIdx : -1;
  }

  return (
    <section>
      {/* Model pickers */}
      <div className="bg-card rounded-2xl border border-card-border p-6 mb-8 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">Pick Models to Compare</h3>
            <p className="text-sm text-muted mt-1">
              Select {MIN_MODELS}-{MAX_MODELS} models for a detailed side-by-side breakdown.
            </p>
          </div>
          {selectedIds.length < MAX_MODELS && (
            <button
              onClick={addSlot}
              className="flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-dark transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Add model
            </button>
          )}
        </div>
        <div className={`grid gap-4 ${colCount === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-3'}`}>
          {selectedIds.map((id, i) => (
            <div key={i} className="relative">
              <ModelPicker
                index={i}
                selectedId={id}
                disabledIds={usedIds}
                onSelect={(newId) => handleSelect(i, newId)}
                onRemove={() => handleRemove(i)}
              />
              {selectedIds.length > MIN_MODELS && (
                <button
                  onClick={() => removeSlot(i)}
                  className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-danger text-white flex items-center justify-center text-xs hover:bg-red-600 transition-colors shadow cursor-pointer"
                  aria-label="Remove slot"
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Comparison grid */}
      {selectedModels.length >= MIN_MODELS ? (
        <div className="bg-card rounded-2xl border border-card-border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <div className={`grid ${gridCols} min-w-[600px] px-6`}>
              {/* Column headers */}
              <div className="py-4 pr-4 border-b border-card-border" />
              {selectedIds.map((id, i) => {
                const m = id ? models.find((x) => x.id === id) : null;
                if (!m) return <div key={i} className="py-4 border-b border-card-border" />;
                const color = getColor(m);
                return (
                  <div
                    key={m.id}
                    className="py-4 border-b border-card-border"
                    style={{ borderBottomColor: color, borderBottomWidth: 3 }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ backgroundColor: color }}
                      />
                      <span className="font-bold text-base">{m.name}</span>
                    </div>
                    <span className="text-xs text-muted">{m.provider}</span>
                  </div>
                );
              })}

              {/* ---- General specs ---- */}
              <SectionHeader label="General" />

              <SpecRow label="Provider">
                {selectedIds.map((id, i) => {
                  const m = id ? models.find((x) => x.id === id) : null;
                  return (
                    <div key={i} className="py-3 text-sm font-medium border-b border-card-border">
                      {m ? m.provider : '-'}
                    </div>
                  );
                })}
              </SpecRow>

              <SpecRow label="Type">
                {selectedIds.map((id, i) => {
                  const m = id ? models.find((x) => x.id === id) : null;
                  return (
                    <div key={i} className="py-3 border-b border-card-border">
                      {m ? (
                        <span
                          className="text-xs font-semibold px-2.5 py-1 rounded-full"
                          style={{
                            backgroundColor:
                              m.type === 'proprietary'
                                ? 'rgba(99, 102, 241, 0.1)'
                                : 'rgba(16, 185, 129, 0.1)',
                            color: m.type === 'proprietary' ? '#6366f1' : '#10b981',
                          }}
                        >
                          {m.type === 'proprietary' ? 'Proprietary' : 'Open Source'}
                        </span>
                      ) : (
                        '-'
                      )}
                    </div>
                  );
                })}
              </SpecRow>

              <SpecRow label="License">
                {selectedIds.map((id, i) => {
                  const m = id ? models.find((x) => x.id === id) : null;
                  return (
                    <div key={i} className="py-3 text-sm border-b border-card-border">
                      {m ? (
                        <span className="text-xs px-2 py-0.5 rounded-full border border-card-border text-muted">
                          {m.license}
                        </span>
                      ) : (
                        '-'
                      )}
                    </div>
                  );
                })}
              </SpecRow>

              <SpecRow label="Context Window">
                {selectedIds.map((id, i) => {
                  const m = id ? models.find((x) => x.id === id) : null;
                  return (
                    <div key={i} className="py-3 text-sm font-semibold border-b border-card-border">
                      {m?.contextWindow ?? '-'}
                    </div>
                  );
                })}
              </SpecRow>

              <SpecRow label="Parameters">
                {selectedIds.map((id, i) => {
                  const m = id ? models.find((x) => x.id === id) : null;
                  return (
                    <div key={i} className="py-3 text-sm border-b border-card-border">
                      {m?.parameters ?? 'Undisclosed'}
                    </div>
                  );
                })}
              </SpecRow>

              <SpecRow label="Modality">
                {selectedIds.map((id, i) => {
                  const m = id ? models.find((x) => x.id === id) : null;
                  return (
                    <div key={i} className="py-3 border-b border-card-border">
                      {m ? (
                        <div className="flex flex-wrap gap-1.5">
                          {m.modality.map((mod) => (
                            <span
                              key={mod}
                              className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-surface text-muted"
                            >
                              <ModalityIcon modality={mod} />
                              {mod}
                            </span>
                          ))}
                        </div>
                      ) : (
                        '-'
                      )}
                    </div>
                  );
                })}
              </SpecRow>

              {/* ---- Benchmarks ---- */}
              <SectionHeader label="Benchmarks (0-100)" />

              {benchmarkKeys.map((key, bIdx) => {
                const winnerIdx = getWinner(key);
                return (
                  <SpecRow key={key} label={benchmarkLabels[bIdx]}>
                    {selectedIds.map((id, i) => {
                      const m = id ? models.find((x) => x.id === id) : null;
                      if (!m) {
                        return <div key={i} className="py-3 border-b border-card-border text-sm text-muted">-</div>;
                      }
                      const mIdx = selectedModels.indexOf(m);
                      const color = getColor(m);
                      return (
                        <ComparisonBenchmarkBar
                          key={m.id}
                          value={m.benchmarks[key]}
                          color={color}
                          isWinner={mIdx === winnerIdx}
                        />
                      );
                    })}
                  </SpecRow>
                );
              })}

              {/* ---- Pricing ---- */}
              <SectionHeader label="Pricing" />

              <SpecRow label="Input">
                {selectedIds.map((id, i) => {
                  const m = id ? models.find((x) => x.id === id) : null;
                  return (
                    <div key={i} className="py-3 text-sm font-medium border-b border-card-border">
                      {m?.pricing.input ?? '-'}
                    </div>
                  );
                })}
              </SpecRow>

              <SpecRow label="Output">
                {selectedIds.map((id, i) => {
                  const m = id ? models.find((x) => x.id === id) : null;
                  return (
                    <div key={i} className="py-3 text-sm font-medium border-b border-card-border">
                      {m?.pricing.output ?? '-'}
                    </div>
                  );
                })}
              </SpecRow>

              {/* ---- Hardware Requirements ---- */}
              {selectedModels.some((m) => m.hardwareRequirements) && (
                <>
                  <SectionHeader label="Hardware Requirements" />
                  <SpecRow label="Hardware">
                    {selectedIds.map((id, i) => {
                      const m = id ? models.find((x) => x.id === id) : null;
                      return (
                        <div key={i} className="py-3 text-xs leading-relaxed border-b border-card-border">
                          {m?.hardwareRequirements ? (
                            <span className="text-muted">{m.hardwareRequirements}</span>
                          ) : (
                            <span className="text-muted italic">N/A (cloud API)</span>
                          )}
                        </div>
                      );
                    })}
                  </SpecRow>
                </>
              )}

              {/* ---- Strengths & Weaknesses ---- */}
              <SectionHeader label="Strengths & Weaknesses" />

              <SpecRow label="Strengths">
                {selectedIds.map((id, i) => {
                  const m = id ? models.find((x) => x.id === id) : null;
                  return (
                    <div key={i} className="py-3 border-b border-card-border">
                      {m ? (
                        <ul className="space-y-1">
                          {m.strengths.map((s) => (
                            <li key={s} className="text-xs text-muted flex items-start gap-1.5">
                              <span className="text-success mt-0.5 shrink-0">+</span>
                              <span>{s}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        '-'
                      )}
                    </div>
                  );
                })}
              </SpecRow>

              <SpecRow label="Weaknesses">
                {selectedIds.map((id, i) => {
                  const m = id ? models.find((x) => x.id === id) : null;
                  return (
                    <div key={i} className="py-3 border-b border-card-border">
                      {m ? (
                        <ul className="space-y-1">
                          {m.weaknesses.map((w) => (
                            <li key={w} className="text-xs text-muted flex items-start gap-1.5">
                              <span className="text-danger mt-0.5 shrink-0">-</span>
                              <span>{w}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        '-'
                      )}
                    </div>
                  );
                })}
              </SpecRow>

              {/* ---- Best For ---- */}
              <SectionHeader label="Best For" />

              <SpecRow label="Use Cases">
                {selectedIds.map((id, i) => {
                  const m = id ? models.find((x) => x.id === id) : null;
                  return (
                    <div key={i} className="py-3 border-b border-card-border">
                      {m ? (
                        <div className="flex flex-wrap gap-1.5">
                          {m.bestFor.map((b) => (
                            <span
                              key={b}
                              className="text-xs px-2 py-1 rounded-md border border-card-border text-muted"
                            >
                              {b}
                            </span>
                          ))}
                        </div>
                      ) : (
                        '-'
                      )}
                    </div>
                  );
                })}
              </SpecRow>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-card rounded-2xl border border-card-border p-12 text-center shadow-sm">
          <p className="text-muted">
            Select at least {MIN_MODELS} models above to see the side-by-side comparison.
          </p>
        </div>
      )}
    </section>
  );
}
