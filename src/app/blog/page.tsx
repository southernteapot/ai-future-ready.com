import type { Metadata } from 'next';
import Link from 'next/link';
import { blogPosts } from '@/data/blog';

export const metadata: Metadata = {
  title: 'Blog — AI News, Analysis, and Comparisons',
  description:
    'The latest AI news, in-depth model comparisons, and industry analysis. Stay informed about GPT, Claude, Gemini, open-source AI, and more.',
  keywords: [
    'AI blog',
    'AI news',
    'LLM comparison',
    'AI analysis',
    'GPT-5',
    'Claude Opus',
    'open source AI',
    'AI industry news',
  ],
  openGraph: {
    title: 'Blog — AI News, Analysis, and Comparisons',
    description:
      'The latest AI news, in-depth model comparisons, and industry analysis from AI Future Ready.',
    url: 'https://ai-future-ready.com/blog',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog — AI News, Analysis, and Comparisons',
    description:
      'The latest AI news, in-depth model comparisons, and industry analysis from AI Future Ready.',
  },
};

function formatDate(dateStr: string): string {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

const categoryColors: Record<string, string> = {
  Comparison: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  News: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
  Analysis: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
};

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 hero-gradient opacity-95" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 h-60 w-60 rounded-full bg-emerald-300/15 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />
        </div>
        <div className="relative mx-auto max-w-4xl px-6 py-20 sm:py-28 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            AI Future Ready Blog
          </h1>
          <p className="mt-4 text-lg text-indigo-100/90 max-w-2xl mx-auto">
            In-depth comparisons, breaking news, and thoughtful analysis about
            the rapidly evolving world of AI.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto text-background"
            preserveAspectRatio="none"
          >
            <path
              d="M0 60V20C240 0 480 40 720 30C960 20 1200 0 1440 20V60H0Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 sm:py-24 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-2xl bg-card border border-card-border p-6 card-hover flex flex-col"
              >
                {/* Category & Read Time */}
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      categoryColors[post.category] ??
                      'bg-gray-500/10 text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    {post.category}
                  </span>
                  <span className="text-xs text-muted">{post.readTime}</span>
                </div>

                {/* Title */}
                <h2 className="text-lg font-semibold leading-snug group-hover:text-primary transition-colors mb-3">
                  {post.title}
                </h2>

                {/* Description */}
                <p className="text-sm text-muted leading-relaxed line-clamp-3 flex-1">
                  {post.description}
                </p>

                {/* Date & Read Link */}
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-xs text-muted">
                    {formatDate(post.date)}
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Read
                    <svg
                      className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
