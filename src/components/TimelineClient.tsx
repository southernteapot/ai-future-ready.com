'use client';

import { useState } from 'react';
import type { TimelineEvent, TimelineEra } from '@/data/timeline';

const categoryConfig: Record<
  TimelineEvent['category'],
  { label: string; color: string; bg: string; dot: string; border: string }
> = {
  research: {
    label: 'Research',
    color: 'text-indigo-600 dark:text-indigo-400',
    bg: 'bg-indigo-50 dark:bg-indigo-950/40',
    dot: 'bg-indigo-500',
    border: 'border-indigo-200 dark:border-indigo-800',
  },
  product: {
    label: 'Product',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    dot: 'bg-emerald-500',
    border: 'border-emerald-200',
  },
  milestone: {
    label: 'Milestone',
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-950/40',
    dot: 'bg-amber-500',
    border: 'border-amber-200 dark:border-amber-800',
  },
  policy: {
    label: 'Policy',
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    dot: 'bg-emerald-500',
    border: 'border-emerald-200 dark:border-emerald-800',
  },
};

const monthNames = [
  '',
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

type CategoryFilter = TimelineEvent['category'] | 'all';

export default function TimelineClient({
  events,
  eras,
}: {
  events: TimelineEvent[];
  eras: TimelineEra[];
}) {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('all');

  const filteredEvents =
    activeFilter === 'all'
      ? events
      : events.filter((e) => e.category === activeFilter);

  const filters: { key: CategoryFilter; label: string }[] = [
    { key: 'all', label: 'All Events' },
    { key: 'research', label: 'Research' },
    { key: 'product', label: 'Products' },
    { key: 'milestone', label: 'Milestones' },
    { key: 'policy', label: 'Policy' },
  ];

  function getEraForYear(year: number): TimelineEra | undefined {
    return eras.find((era) => year >= era.startYear && year <= era.endYear);
  }

  // Track which eras have already been rendered so we show each header once
  const renderedEras = new Set<string>();

  return (
    <div>
      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setActiveFilter(f.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeFilter === f.key
                ? 'hero-gradient text-white shadow-md shadow-primary/25'
                : 'bg-card border border-card-border text-muted hover:text-foreground hover:border-primary/40'
            }`}
          >
            {f.label}
            <span className="ml-1.5 text-xs opacity-75">
              {f.key === 'all'
                ? events.length
                : events.filter((e) => e.category === f.key).length}
            </span>
          </button>
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 mb-12 text-sm">
        {Object.entries(categoryConfig).map(([key, cfg]) => (
          <div key={key} className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${cfg.dot}`} />
            <span className="text-muted">{cfg.label}</span>
          </div>
        ))}
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-full border-2 border-primary bg-primary/20 flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          </span>
          <span className="text-muted">High Significance</span>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Central vertical line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent md:-translate-x-px" />

        <div className="space-y-0">
          {filteredEvents.map((event, index) => {
            const cfg = categoryConfig[event.category];
            const isLeft = index % 2 === 0;
            const era = getEraForYear(event.year);
            let showEraHeader = false;

            if (era && !renderedEras.has(era.name)) {
              renderedEras.add(era.name);
              showEraHeader = true;
            }

            return (
              <div key={`${event.year}-${event.title}`}>
                {/* Era Header */}
                {showEraHeader && era && (
                  <div className="relative flex items-center justify-center py-8">
                    <div className="absolute left-4 md:left-1/2 w-0.5 h-full bg-gradient-to-b from-primary via-secondary to-accent md:-translate-x-px" />
                    <div className="relative z-10 bg-card border-2 border-primary/30 rounded-2xl px-6 py-4 text-center max-w-md shadow-lg shadow-primary/5">
                      <h3 className="text-lg font-bold gradient-text">
                        {era.name}
                      </h3>
                      <p className="text-xs text-muted mt-1">
                        {era.startYear}&ndash;{era.endYear}
                      </p>
                      <p className="text-sm text-muted mt-2">
                        {era.description}
                      </p>
                    </div>
                  </div>
                )}

                {/* Event */}
                <div className="relative flex items-start py-4 group">
                  {/* Center dot (desktop) */}
                  <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 -translate-x-1/2 top-6 z-10">
                    {event.significance === 'high' ? (
                      <div className="w-5 h-5 rounded-full border-2 border-primary bg-card flex items-center justify-center shadow-md shadow-primary/20 group-hover:scale-125 transition-transform">
                        <div className={`w-2.5 h-2.5 rounded-full ${cfg.dot}`} />
                      </div>
                    ) : (
                      <div
                        className={`w-3.5 h-3.5 rounded-full ${cfg.dot} border-2 border-card shadow-sm group-hover:scale-125 transition-transform`}
                      />
                    )}
                  </div>

                  {/* Content card */}
                  <div
                    className={`ml-10 md:ml-0 md:w-[calc(50%-2rem)] ${
                      isLeft
                        ? 'md:mr-auto md:pr-4 md:text-right'
                        : 'md:ml-auto md:pl-4 md:text-left'
                    }`}
                  >
                    <div
                      className={`bg-card border ${cfg.border} rounded-xl p-4 card-hover shadow-sm hover:shadow-md transition-shadow`}
                    >
                      {/* Year badge & category pill */}
                      <div
                        className={`flex items-center gap-2 mb-2 flex-wrap ${
                          isLeft ? 'md:justify-end' : 'md:justify-start'
                        }`}
                      >
                        <span className="text-sm font-bold text-foreground tabular-nums">
                          {event.month
                            ? `${monthNames[event.month]} ${event.year}`
                            : event.year}
                        </span>
                        <span
                          className={`text-xs font-medium px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.color}`}
                        >
                          {cfg.label}
                        </span>
                        {event.significance === 'high' && (
                          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary dark:bg-primary/20">
                            Key Event
                          </span>
                        )}
                      </div>

                      <h4 className="font-semibold text-foreground mb-1 text-base">
                        {event.title}
                      </h4>
                      <p className="text-sm text-muted leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* End cap */}
        <div className="relative flex justify-center pt-4 pb-8">
          <div className="absolute left-4 md:left-1/2 w-0.5 h-8 bg-gradient-to-b from-accent to-transparent md:-translate-x-px" />
          <div className="relative z-10 mt-8 bg-card border border-card-border rounded-full px-5 py-2 text-sm text-muted">
            {filteredEvents.length} events shown
          </div>
        </div>
      </div>
    </div>
  );
}
