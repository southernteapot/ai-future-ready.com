import type { Metadata } from 'next';
import { timelineEvents, eras } from '@/data/timeline';
import TimelineClient from '@/components/TimelineClient';

export const metadata: Metadata = {
  title: 'AI Timeline — Key Milestones in Artificial Intelligence History',
  description:
    'Explore the complete history of artificial intelligence from the 1950 Turing Test to GPT-4, Claude, and beyond. 30+ key milestones in AI research, products, and policy.',
  keywords: [
    'AI timeline',
    'artificial intelligence history',
    'AI milestones',
    'history of AI',
    'AI breakthroughs',
    'deep learning history',
    'generative AI timeline',
    'ChatGPT history',
    'machine learning timeline',
  ],
  openGraph: {
    title: 'AI Timeline — Key Milestones in Artificial Intelligence History',
    description:
      'Explore the complete history of AI from the 1950 Turing Test to modern generative models. 30+ key milestones, color-coded by category.',
    url: 'https://ai-future-ready.com/timeline',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Timeline — Key Milestones in AI History',
    description:
      'From the Turing Test (1950) to GPT-4 and Claude (2025). Explore 30+ pivotal moments in AI history.',
  },
  alternates: {
    canonical: 'https://ai-future-ready.com/timeline',
  },
};

export default function TimelinePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'AI Timeline — Key Milestones in Artificial Intelligence History',
    description:
      'A comprehensive, interactive timeline of the most important events in artificial intelligence history, from the 1950 Turing Test to modern generative AI.',
    url: 'https://ai-future-ready.com/timeline',
    publisher: {
      '@type': 'Organization',
      name: 'AI Future Ready',
      url: 'https://ai-future-ready.com',
    },
    mainEntity: {
      '@type': 'ItemList',
      name: 'Key AI Milestones',
      numberOfItems: timelineEvents.length,
      itemListElement: timelineEvents.map((event, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: event.title,
        description: event.description,
      })),
    },
  };

  const highSignificanceCount = timelineEvents.filter(
    (e) => e.significance === 'high'
  ).length;
  const startYear = timelineEvents[0].year;
  const endYear = timelineEvents[timelineEvents.length - 1].year;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 hero-gradient opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

        {/* Decorative dots */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-16 left-[10%] w-2 h-2 rounded-full bg-primary/20" />
          <div className="absolute top-32 left-[25%] w-1.5 h-1.5 rounded-full bg-secondary/20" />
          <div className="absolute top-20 right-[15%] w-2.5 h-2.5 rounded-full bg-accent/20" />
          <div className="absolute top-40 right-[30%] w-1.5 h-1.5 rounded-full bg-primary/15" />
          <div className="absolute top-28 left-[50%] w-2 h-2 rounded-full bg-secondary/15" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {startYear}&ndash;{endYear}
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            <span className="gradient-text">AI Timeline</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted max-w-2xl mx-auto mb-8 leading-relaxed">
            From Alan Turing&apos;s thought experiment to models that write code,
            generate art, and reason about the world &mdash; explore{' '}
            <strong className="text-foreground">{timelineEvents.length}+ pivotal moments</strong>{' '}
            that shaped artificial intelligence.
          </p>

          {/* Quick stats */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-muted">
              <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </span>
              <span>
                <strong className="text-foreground">{highSignificanceCount}</strong> key
                breakthroughs
              </span>
            </div>
            <div className="flex items-center gap-2 text-muted">
              <span className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-secondary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </span>
              <span>
                <strong className="text-foreground">{eras.length}</strong> distinct eras
              </span>
            </div>
            <div className="flex items-center gap-2 text-muted">
              <span className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </span>
              <span>
                <strong className="text-foreground">{endYear - startYear}+</strong> years of
                progress
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <TimelineClient events={timelineEvents} eras={eras} />
      </section>
    </>
  );
}
