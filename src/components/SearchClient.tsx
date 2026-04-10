"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";

interface SearchEntry {
  title: string;
  description: string;
  section: string;
  href: string;
  mdPath: string;
  provider?: string;
  tags: string[];
}

export default function SearchClient() {
  const [query, setQuery] = useState("");
  const [entries, setEntries] = useState<SearchEntry[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/search-index.json")
      .then((r) => r.json())
      .then((data: SearchEntry[]) => {
        setEntries(data);
        setLoaded(true);
      });
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return entries.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        e.section.toLowerCase().includes(q) ||
        (e.provider && e.provider.toLowerCase().includes(q)) ||
        e.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [query, entries]);

  // Group results by section
  const grouped = useMemo(() => {
    const map = new Map<string, SearchEntry[]>();
    for (const r of results) {
      const list = map.get(r.section) || [];
      list.push(r);
      map.set(r.section, list);
    }
    return map;
  }, [results]);

  return (
    <div>
      {/* Search input */}
      <div className="relative mb-8">
        <div className="flex items-center gap-3 bg-slate-900 rounded-lg px-4 py-3">
          <span className="text-green-400 font-mono text-sm shrink-0">
            grep -i
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              loaded ? `search ${entries.length} entries...` : "loading index..."
            }
            autoFocus
            className="flex-1 bg-transparent text-slate-200 font-mono text-sm outline-none placeholder:text-slate-600"
          />
          {query && (
            <span className="text-slate-500 font-mono text-xs shrink-0">
              {results.length} match{results.length !== 1 ? "es" : ""}
            </span>
          )}
        </div>
      </div>

      {/* Results */}
      {query.trim() && results.length === 0 && (
        <p className="text-slate-500 font-mono text-sm">No matches.</p>
      )}

      {!query.trim() && loaded && (
        <p className="text-slate-500 font-mono text-sm">
          Type to search across all models, agents, guides, blog posts, and more.
        </p>
      )}

      {Array.from(grouped.entries()).map(([section, items]) => (
        <div key={section} className="mb-6">
          <h2 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
            {section}
          </h2>
          <div className="space-y-1">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block bg-slate-900 rounded px-4 py-3 hover:bg-slate-800 transition-colors group"
              >
                <div className="flex items-baseline gap-3">
                  <span className="text-green-400 font-mono text-sm group-hover:text-green-300">
                    {item.title}
                  </span>
                  {item.provider && (
                    <span className="text-slate-600 font-mono text-xs">
                      {item.provider}
                    </span>
                  )}
                </div>
                <p className="text-slate-500 text-xs mt-1 line-clamp-1">
                  {item.description}
                </p>
                <span className="text-slate-700 font-mono text-xs">
                  {item.mdPath}
                </span>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
