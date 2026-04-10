'use client';

import { useState, useMemo, useCallback } from 'react';
import type { GlossaryTerm } from '@/data/glossary';

interface GlossaryClientProps {
  terms: GlossaryTerm[];
  categories: readonly string[];
}

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function GlossaryClient({ terms, categories }: GlossaryClientProps) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredTerms = useMemo(() => {
    let result = terms;

    if (activeCategory !== 'All') {
      result = result.filter((t) => t.category === activeCategory);
    }

    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(
        (t) =>
          t.term.toLowerCase().includes(q) ||
          t.definition.toLowerCase().includes(q)
      );
    }

    return result;
  }, [terms, search, activeCategory]);

  const groupedTerms = useMemo(() => {
    const groups: Record<string, GlossaryTerm[]> = {};
    for (const term of filteredTerms) {
      const letter = term.term[0].toUpperCase();
      if (!groups[letter]) {
        groups[letter] = [];
      }
      groups[letter].push(term);
    }
    // Sort terms within each group
    for (const letter of Object.keys(groups)) {
      groups[letter].sort((a, b) => a.term.localeCompare(b.term));
    }
    return groups;
  }, [filteredTerms]);

  const activeLetters = useMemo(() => new Set(Object.keys(groupedTerms)), [groupedTerms]);

  const sortedLetters = useMemo(
    () => alphabet.filter((l) => activeLetters.has(l)),
    [activeLetters]
  );

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []);

  const handleCategoryClick = useCallback((category: string) => {
    setActiveCategory(category);
  }, []);

  const categoryColors: Record<string, string> = {
    'Core Concepts': 'bg-primary/10 text-primary border-primary/20',
    'Model Architecture': 'bg-secondary/10 text-secondary border-secondary/20',
    'Training & Fine-tuning': 'bg-accent/10 text-accent-dark border-accent/20',
    'Prompting & Usage': 'bg-success/10 text-success border-success/20',
    'Types of AI': 'bg-danger/10 text-danger border-danger/20',
  };

  return (
    <div>
      {/* Search Input */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="relative">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search AI terms... (e.g., transformer, hallucination, RAG)"
            value={search}
            onChange={handleSearch}
            className="w-full pl-12 pr-4 py-4 bg-card border border-card-border rounded-xl text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-lg"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors"
              aria-label="Clear search"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        {search && (
          <p className="mt-2 text-sm text-muted text-center">
            {filteredTerms.length} {filteredTerms.length === 1 ? 'term' : 'terms'} found
          </p>
        )}
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        <button
          onClick={() => handleCategoryClick('All')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeCategory === 'All'
              ? 'hero-gradient text-white shadow-md'
              : 'bg-card border border-card-border text-muted hover:text-foreground hover:border-primary/30'
          }`}
        >
          All Terms ({terms.length})
        </button>
        {categories.map((cat) => {
          const count = terms.filter((t) => t.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeCategory === cat
                  ? 'hero-gradient text-white shadow-md'
                  : 'bg-card border border-card-border text-muted hover:text-foreground hover:border-primary/30'
              }`}
            >
              {cat} ({count})
            </button>
          );
        })}
      </div>

      {/* Alphabetical Jump Navigation */}
      <div className="flex flex-wrap justify-center gap-1 mb-10">
        {alphabet.map((letter) => {
          const isActive = activeLetters.has(letter);
          return isActive ? (
            <a
              key={letter}
              href={`#letter-${letter}`}
              className="w-9 h-9 flex items-center justify-center rounded-lg text-sm font-semibold text-primary hover:bg-primary hover:text-white transition-all"
            >
              {letter}
            </a>
          ) : (
            <span
              key={letter}
              className="w-9 h-9 flex items-center justify-center rounded-lg text-sm font-semibold text-muted/30"
            >
              {letter}
            </span>
          );
        })}
      </div>

      {/* Terms grouped alphabetically */}
      {sortedLetters.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-2xl font-semibold text-muted mb-2">No terms found</p>
          <p className="text-muted">
            Try a different search term or clear your filters.
          </p>
        </div>
      ) : (
        <div className="space-y-12">
          {sortedLetters.map((letter) => (
            <section key={letter} id={`letter-${letter}`} className="scroll-mt-24">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-bold gradient-text">{letter}</span>
                <div className="flex-1 h-px bg-card-border" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {groupedTerms[letter].map((item) => (
                  <div
                    key={item.term}
                    className="bg-card border border-card-border rounded-xl p-6 card-hover"
                  >
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <h3 className="text-lg font-bold text-foreground leading-tight">
                        {item.term}
                      </h3>
                    </div>
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium border mb-3 ${
                        categoryColors[item.category] || 'bg-surface text-muted border-card-border'
                      }`}
                    >
                      {item.category}
                    </span>
                    <p className="text-sm text-muted leading-relaxed">{item.definition}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      {/* Back to top */}
      <div className="text-center mt-16">
        <a
          href="#glossary-top"
          className="inline-flex items-center gap-2 px-6 py-3 bg-card border border-card-border rounded-xl text-sm font-medium text-muted hover:text-primary hover:border-primary/30 transition-all"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
          Back to top
        </a>
      </div>
    </div>
  );
}
