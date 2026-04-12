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
    { label: 'home', href: '/' },
    { label: 'models', href: '/models' },
    { label: 'guides', href: '/guides' },
    { label: 'search', href: '/search' },
  ];

  return (
    <section className="py-24 sm:py-36 px-6">
      <div className="mx-auto max-w-2xl font-mono">
        <pre className="text-white text-sm mb-8">
{`$ curl -s https://aifutureready.com/...
HTTP/1.1 404 Not Found`}
        </pre>

        <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
          404
        </h1>

        <p className="mt-4 text-neutral-500">
          Page not found. It may have been moved or doesn&apos;t exist.
        </p>

        {/* Search */}
        <form
          onSubmit={handleSearch}
          className="mt-8 flex items-center gap-3 border-b border-neutral-800 px-1 py-3"
        >
          <span className="text-white text-sm shrink-0">
            grep -i
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="search..."
            className="flex-1 bg-transparent text-neutral-300 text-sm outline-none placeholder:text-neutral-700"
            aria-label="Search"
          />
          <button
            type="submit"
            className="text-neutral-500 hover:text-white text-sm transition-colors"
          >
            [enter]
          </button>
        </form>

        {/* Quick Links */}
        <div className="mt-8 flex flex-wrap gap-3">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-neutral-500 hover:text-white transition-colors"
            >
              ~/{link.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
