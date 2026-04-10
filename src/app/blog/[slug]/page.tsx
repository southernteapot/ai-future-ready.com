import type { Metadata } from 'next';
import Link from 'next/link';
import { blogPosts } from '@/data/blog';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://ai-future-ready.com/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  };
}

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

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: 'AI Future Ready',
      url: 'https://ai-future-ready.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'AI Future Ready',
      url: 'https://ai-future-ready.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://ai-future-ready.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://ai-future-ready.com/blog/${post.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <article className="py-16 sm:py-24 px-6">
        <div className="mx-auto max-w-3xl">
          {/* Back Link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-primary transition-colors mb-8"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            Back to Blog
          </Link>

          {/* Header */}
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                  categoryColors[post.category] ??
                  'bg-gray-500/10 text-gray-600 dark:text-gray-400'
                }`}
              >
                {post.category}
              </span>
              <span className="text-sm text-muted">{post.readTime}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              {post.title}
            </h1>
            <p className="mt-4 text-lg text-muted">{post.description}</p>
            <div className="mt-6 flex items-center gap-4 text-sm text-muted">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span className="w-1 h-1 rounded-full bg-muted" />
              <span>AI Future Ready</span>
            </div>
          </header>

          {/* Divider */}
          <hr className="border-card-border mb-10" />

          {/* Content */}
          <div
            className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-p:text-muted prose-p:leading-relaxed prose-strong:text-foreground prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Divider */}
          <hr className="border-card-border mt-12 mb-10" />

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-6">More from the Blog</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    className="group rounded-2xl bg-card border border-card-border p-5 card-hover"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${
                          categoryColors[related.category] ??
                          'bg-gray-500/10 text-gray-600 dark:text-gray-400'
                        }`}
                      >
                        {related.category}
                      </span>
                      <span className="text-xs text-muted">
                        {related.readTime}
                      </span>
                    </div>
                    <h3 className="font-semibold leading-snug group-hover:text-primary transition-colors">
                      {related.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted line-clamp-2">
                      {related.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </>
  );
}
