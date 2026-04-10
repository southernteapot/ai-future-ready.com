'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { searchIndex, type SearchItem } from '@/data/searchIndex';

interface SearchClientProps {
  initialQuery?: string;
}

export default function SearchClient({ initialQuery = '' }: SearchClientProps) {
  const [query, setQuery] = useState(initialQuery);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;

    const terms = q.split(/\s+/);

    const scored = searchIndex
      .map((item) => {
        const title = item.title.toLowerCase();
        const description = item.description.toLowerCase();
        let score = 0;

        for (const term of terms) {
          if (title.includes(term)) score += 3;
          if (description.includes(term)) score += 1;
        }

        return { item, score };
      })
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score);

    const grouped: Record<SearchItem['category'], SearchItem[]> = {
      Models: [],
      Glossary: [],
      Pages: [],
    };

    for (const { item } of scored) {
      grouped[item.category].push(item);
    }

    return grouped;
  }, [query]);

  const hasResults =
    results &&
    (results.Models.length > 0 ||
      results.Glossary.length > 0 ||
      results.Pages.length > 0);

  return (
    <div>
      {/* Search Input */}
      <div className="relative max-w-2xl mx-auto">
        <svg
          className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search models, glossary terms, guides..."
          className="w-full rounded-2xl border border-card-border bg-card pl-14 pr-5 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
          autoFocus
        />
      </div>

      {/* Results */}
      <div className="mt-10 max-w-2xl mx-auto">
        {query.trim() && !hasResults && (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">&#x1F50D;</div>
            <h2 className="text-xl font-semibold mb-2">No results found</h2>
            <p className="text-muted mb-6">
              We couldn&apos;t find anything matching &ldquo;{query}&rdquo;. Try
              a different search term.
            </p>
            <div className="text-sm text-muted">
              <p className="font-medium mb-2">Popular searches:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {['GPT', 'Claude', 'prompt engineering', 'RAG', 'fine-tuning'].map(
                  (suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setQuery(suggestion)}
                      className="rounded-lg bg-surface px-3 py-1.5 text-sm hover:bg-primary/10 hover:text-primary transition-colors"
                    >
                      {suggestion}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        )}

        {!query.trim() && (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">&#x2728;</div>
            <p className="text-muted">
              Start typing to search across all site content.
            </p>
          </div>
        )}

        {hasResults &&
          (['Models', 'Pages', 'Glossary'] as const).map((category) => {
            const items = results[category];
            if (items.length === 0) return null;

            return (
              <div key={category} className="mb-10">
                <h2 className="text-sm font-semibold text-muted uppercase tracking-wider mb-4">
                  {category}{' '}
                  <span className="text-xs font-normal">
                    ({items.length})
                  </span>
                </h2>
                <div className="space-y-3">
                  {items.map((item, i) => (
                    <Link
                      key={`${category}-${i}`}
                      href={item.href}
                      className="block rounded-xl bg-card border border-card-border p-5 card-hover"
                    >
                      <h3 className="font-semibold text-primary">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted line-clamp-2">
                        {item.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
