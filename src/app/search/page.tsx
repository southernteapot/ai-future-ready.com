import type { Metadata } from 'next';
import SearchClient from '@/components/SearchClient';

export const metadata: Metadata = {
  title: 'Search',
  description:
    'Search across all AI Future Ready content including models, glossary terms, guides, and tools.',
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  return (
    <section className="py-16 sm:py-24 px-6">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Search <span className="gradient-text">Everything</span>
          </h1>
          <p className="mt-3 text-lg text-muted">
            Find models, glossary terms, guides, and more.
          </p>
        </div>
        <SearchClient initialQuery={q ?? ''} />
      </div>
    </section>
  );
}
