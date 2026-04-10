'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  }

  const quickLinks = [
    { label: 'Home', href: '/', icon: '&#x1F3E0;' },
    { label: 'Models', href: '/models', icon: '&#x1F916;' },
    { label: 'Guides', href: '/guides/getting-started', icon: '&#x1F4D6;' },
    { label: 'Tools', href: '/tools/quiz', icon: '&#x1F527;' },
  ];

  return (
    <section className="py-24 sm:py-36 px-6">
      <div className="mx-auto max-w-2xl text-center">
        {/* Large 404 */}
        <h1 className="text-8xl sm:text-9xl font-extrabold gradient-text tracking-tight">
          404
        </h1>

        <h2 className="mt-6 text-2xl sm:text-3xl font-bold tracking-tight">
          This page got lost in the AI-verse
        </h2>
        <p className="mt-4 text-lg text-muted">
          The page you&apos;re looking for doesn&apos;t exist, may have been
          moved, or is still being trained on. Let&apos;s get you back on track.
        </p>

        {/* Search */}
        <form
          onSubmit={handleSearch}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
        >
          <div className="relative w-full sm:flex-1">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted"
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search the site..."
              className="w-full rounded-xl border border-card-border bg-card pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
              aria-label="Search"
            />
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition hover:bg-primary-dark hover:shadow-xl hover:-translate-y-0.5"
          >
            Search
          </button>
        </form>

        {/* Quick Links */}
        <div className="mt-12">
          <p className="text-sm font-medium text-muted mb-4">
            Or jump to a popular section:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex items-center gap-2 rounded-xl bg-card border border-card-border px-5 py-3 text-sm font-medium card-hover"
              >
                <span dangerouslySetInnerHTML={{ __html: link.icon }} />
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
