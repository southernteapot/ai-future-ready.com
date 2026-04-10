'use client';

import { useState, useMemo } from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';
import { Radar, Bar, Scatter } from 'react-chartjs-2';
import { models, benchmarkLabels, providerColors } from '@/data/models';
import type { AIModel } from '@/data/models';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const DEFAULT_SELECTED = ['gpt-5.4', 'claude-opus-4.6', 'gemini-3.1-pro', 'llama-4-maverick'];

function getColor(model: AIModel): string {
  return providerColors[model.provider] || '#6366f1';
}

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function parsePriceToNumber(priceStr: string): number {
  const match = priceStr.match(/\$([\d.]+)/);
  return match ? parseFloat(match[1]) : 0;
}

export default function ModelCharts() {
  const [selected, setSelected] = useState<string[]>(DEFAULT_SELECTED);

  const selectedModels = useMemo(
    () => models.filter((m) => selected.includes(m.id)),
    [selected]
  );

  function toggleModel(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  }

  // -- Radar chart data --
  const radarData = useMemo(
    () => ({
      labels: benchmarkLabels,
      datasets: selectedModels.map((m) => {
        const color = getColor(m);
        return {
          label: m.name,
          data: [
            m.benchmarks.reasoning,
            m.benchmarks.coding,
            m.benchmarks.math,
            m.benchmarks.writing,
            m.benchmarks.multilingual,
            m.benchmarks.speed,
          ],
          backgroundColor: hexToRgba(color, 0.15),
          borderColor: color,
          borderWidth: 2,
          pointBackgroundColor: color,
          pointBorderColor: '#fff',
          pointBorderWidth: 1,
          pointRadius: 4,
          pointHoverRadius: 6,
        };
      }),
    }),
    [selectedModels]
  );

  // -- Bar chart data --
  const barData = useMemo(
    () => ({
      labels: benchmarkLabels,
      datasets: selectedModels.map((m) => {
        const color = getColor(m);
        return {
          label: m.name,
          data: [
            m.benchmarks.reasoning,
            m.benchmarks.coding,
            m.benchmarks.math,
            m.benchmarks.writing,
            m.benchmarks.multilingual,
            m.benchmarks.speed,
          ],
          backgroundColor: hexToRgba(color, 0.75),
          borderColor: color,
          borderWidth: 1,
          borderRadius: 4,
        };
      }),
    }),
    [selectedModels]
  );

  // -- Pricing chart data --
  const pricingData = useMemo(() => {
    const pricedModels = selectedModels.filter(
      (m) => parsePriceToNumber(m.pricing.input) > 0 || parsePriceToNumber(m.pricing.output) > 0
    );
    return {
      labels: pricedModels.map((m) => m.name),
      datasets: [
        {
          label: 'Input ($/1M tokens)',
          data: pricedModels.map((m) => parsePriceToNumber(m.pricing.input)),
          backgroundColor: 'rgba(99, 102, 241, 0.75)',
          borderColor: '#6366f1',
          borderWidth: 1,
          borderRadius: 4,
        },
        {
          label: 'Output ($/1M tokens)',
          data: pricedModels.map((m) => parsePriceToNumber(m.pricing.output)),
          backgroundColor: 'rgba(16, 185, 129, 0.75)',
          borderColor: '#10b981',
          borderWidth: 1,
          borderRadius: 4,
        },
      ],
    };
  }, [selectedModels]);

  // -- Cost-effectiveness scatter data --
  const scatterData = useMemo(() => {
    const pricedModels = selectedModels.filter(
      (m) => parsePriceToNumber(m.pricing.output) > 0
    );
    return {
      datasets: pricedModels.map((m) => {
        const color = getColor(m);
        const avgBenchmark = Math.round(
          (m.benchmarks.reasoning +
            m.benchmarks.coding +
            m.benchmarks.math +
            m.benchmarks.writing +
            m.benchmarks.multilingual) /
            5
        );
        const outputPrice = parsePriceToNumber(m.pricing.output);
        return {
          label: m.name,
          data: [{ x: outputPrice, y: avgBenchmark }],
          backgroundColor: color,
          borderColor: color,
          pointRadius: 8,
          pointHoverRadius: 11,
        };
      }),
    };
  }, [selectedModels]);

  const chartTextColor = 'rgb(100, 116, 139)';

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: { color: chartTextColor, padding: 16, usePointStyle: true, pointStyleWidth: 12 },
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleColor: '#f1f5f9',
        bodyColor: '#cbd5e1',
        borderColor: 'rgba(99, 102, 241, 0.3)',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
      },
    },
    scales: {
      r: {
        beginAtZero: true,
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
          color: chartTextColor,
          backdropColor: 'transparent',
          font: { size: 10 },
        },
        pointLabels: {
          color: chartTextColor,
          font: { size: 12, weight: 600 as const },
        },
        grid: {
          color: 'rgba(148, 163, 184, 0.15)',
        },
        angleLines: {
          color: 'rgba(148, 163, 184, 0.15)',
        },
      },
    },
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: { color: chartTextColor, padding: 16, usePointStyle: true, pointStyleWidth: 12 },
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleColor: '#f1f5f9',
        bodyColor: '#cbd5e1',
        borderColor: 'rgba(99, 102, 241, 0.3)',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
      },
    },
    scales: {
      x: {
        ticks: { color: chartTextColor },
        grid: { color: 'rgba(148, 163, 184, 0.1)' },
      },
      y: {
        beginAtZero: true,
        max: 100,
        ticks: { color: chartTextColor, stepSize: 20 },
        grid: { color: 'rgba(148, 163, 184, 0.1)' },
      },
    },
  };

  const pricingOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: { color: chartTextColor, padding: 16, usePointStyle: true, pointStyleWidth: 12 },
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleColor: '#f1f5f9',
        bodyColor: '#cbd5e1',
        borderColor: 'rgba(99, 102, 241, 0.3)',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        callbacks: {
          label: (ctx: { dataset: { label?: string }; parsed: { y: number | null } }) =>
            `${ctx.dataset.label ?? ''}: $${(ctx.parsed.y ?? 0).toFixed(2)}`,
        },
      },
    },
    scales: {
      x: {
        ticks: { color: chartTextColor },
        grid: { color: 'rgba(148, 163, 184, 0.1)' },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: chartTextColor,
          callback: (value: string | number) => `$${value}`,
        },
        grid: { color: 'rgba(148, 163, 184, 0.1)' },
      },
    },
  };

  const scatterOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: { color: chartTextColor, padding: 16, usePointStyle: true, pointStyleWidth: 12 },
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleColor: '#f1f5f9',
        bodyColor: '#cbd5e1',
        borderColor: 'rgba(99, 102, 241, 0.3)',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        callbacks: {
          label: (ctx: { dataset: { label?: string }; parsed: { x: number | null; y: number | null } }) =>
            `${ctx.dataset.label ?? ''}: $${(ctx.parsed.x ?? 0).toFixed(2)}/1M output, avg score ${ctx.parsed.y ?? 0}`,
        },
      },
    },
    scales: {
      x: {
        title: { display: true, text: 'Output Price ($/1M tokens)', color: chartTextColor },
        ticks: {
          color: chartTextColor,
          callback: (value: string | number) => `$${value}`,
        },
        grid: { color: 'rgba(148, 163, 184, 0.1)' },
      },
      y: {
        title: { display: true, text: 'Avg Benchmark Score', color: chartTextColor },
        min: 60,
        max: 100,
        ticks: { color: chartTextColor, stepSize: 10 },
        grid: { color: 'rgba(148, 163, 184, 0.1)' },
      },
    },
  };

  return (
    <section id="charts" className="scroll-mt-24">
      {/* Model selector */}
      <div className="bg-card rounded-2xl border border-card-border p-6 mb-8 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Select Models to Compare</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {models.map((model) => {
            const isSelected = selected.includes(model.id);
            const color = getColor(model);
            return (
              <button
                key={model.id}
                onClick={() => toggleModel(model.id)}
                className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium border transition-all cursor-pointer"
                style={{
                  borderColor: isSelected ? color : 'var(--color-card-border)',
                  backgroundColor: isSelected ? hexToRgba(color, 0.1) : 'transparent',
                  color: isSelected ? color : 'var(--color-muted)',
                }}
              >
                <span
                  className="w-3 h-3 rounded-full shrink-0 border-2 flex items-center justify-center"
                  style={{ borderColor: color }}
                >
                  {isSelected && (
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                  )}
                </span>
                <span className="truncate">{model.name}</span>
              </button>
            );
          })}
        </div>
        {selected.length === 0 && (
          <p className="mt-4 text-sm text-amber-600 dark:text-amber-400">
            Select at least one model to see comparisons.
          </p>
        )}
      </div>

      {/* Charts grid */}
      {selected.length > 0 && (
        <div className="space-y-8">
          {/* Radar Chart */}
          <div className="bg-card rounded-2xl border border-card-border p-6 shadow-sm">
            <div className="mb-4">
              <h3 className="text-xl font-bold">Capability Radar</h3>
              <p className="text-sm text-muted mt-1">
                Multi-dimensional comparison across 6 key dimensions (0-100 scale)
              </p>
            </div>
            <div className="h-[420px] sm:h-[480px]">
              <Radar data={radarData} options={radarOptions} />
            </div>
          </div>

          {/* Bar Chart */}
          <div className="bg-card rounded-2xl border border-card-border p-6 shadow-sm">
            <div className="mb-4">
              <h3 className="text-xl font-bold">Benchmark Scores</h3>
              <p className="text-sm text-muted mt-1">
                Side-by-side benchmark scores for each capability area
              </p>
            </div>
            <div className="h-[380px] sm:h-[420px]">
              <Bar data={barData} options={barOptions} />
            </div>
          </div>

          {/* Pricing Chart */}
          <div className="bg-card rounded-2xl border border-card-border p-6 shadow-sm">
            <div className="mb-4">
              <h3 className="text-xl font-bold">Pricing Comparison</h3>
              <p className="text-sm text-muted mt-1">
                Input and output pricing per 1M tokens (open-source models with $0 pricing hidden)
              </p>
            </div>
            {pricingData.labels.length > 0 ? (
              <div className="h-[380px] sm:h-[420px]">
                <Bar data={pricingData} options={pricingOptions} />
              </div>
            ) : (
              <div className="py-12 text-center text-muted">
                <p>No priced models selected. Free/open-source models have no API pricing to display.</p>
              </div>
            )}
          </div>

          {/* Cost-Effectiveness Scatter */}
          <div className="bg-card rounded-2xl border border-card-border p-6 shadow-sm">
            <div className="mb-4">
              <h3 className="text-xl font-bold">Cost-Effectiveness</h3>
              <p className="text-sm text-muted mt-1">
                Average benchmark score vs. output pricing — models in the top-left are the best value
              </p>
            </div>
            {scatterData.datasets.length > 0 ? (
              <div className="h-[380px] sm:h-[420px]">
                <Scatter data={scatterData} options={scatterOptions} />
              </div>
            ) : (
              <div className="py-12 text-center text-muted">
                <p>No priced models selected. Select models with API pricing to see the cost-effectiveness chart.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
