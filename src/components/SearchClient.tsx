"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

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
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q")?.trim() ?? "";
  const [query, setQuery] = useState(searchQuery);
  const [entries, setEntries] = useState<SearchEntry[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setQuery(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    fetch("/search-index.json")
      .then((r) => {
        if (!r.ok) {
          throw new Error(`Failed to load search index: ${r.status}`);
        }
        return r.json();
      })
      .then((data: SearchEntry[]) => {
        setEntries(data);
        setLoaded(true);
        setError(false);
      })
      .catch(() => {
        setLoaded(true);
        setError(true);
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
      <form
        className="search-form"
        role="search"
        onSubmit={(event) => event.preventDefault()}
      >
        <label htmlFor="site-search" className="visually-hidden">
          Search all content
        </label>
        <span className="agent-label">grep -i</span>
        <span className="human-label">Search</span>
        <input
          id="site-search"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={
            loaded ? `search ${entries.length} entries...` : "loading index..."
          }
          autoFocus
          className="search-input"
        />
        {query && (
          <span role="status" aria-live="polite">
            {results.length} match{results.length !== 1 ? "es" : ""}
          </span>
        )}
      </form>

      {error && <p>search index unavailable.</p>}

      {query.trim() && results.length === 0 && <p>no matches.</p>}

      {!query.trim() && loaded && (
        <p>
          type to search across all models, agents, guides, blog posts, and
          more.
        </p>
      )}

      {Array.from(grouped.entries()).map(([section, items]) => (
        <section key={section}>
          <p className="search-section-heading">
            <span className="agent-marker">## </span>
            {section}
          </p>
          {items.map((item) => (
            <Link key={item.href} href={item.href} className="search-result">
              <span className="search-result-title">
                <span className="agent-marker">- </span>
                {item.title}
                {item.provider ? ` (${item.provider})` : ""}
              </span>
              <br className="agent-only" />
              <span className="agent-only">{"  "}</span>
              <span className="search-result-description">
                {item.description}
              </span>
              <br className="agent-only" />
              <span className="agent-only">{"  "}</span>
              <span className="search-result-path">{item.mdPath}</span>
            </Link>
          ))}
        </section>
      ))}
    </div>
  );
}
