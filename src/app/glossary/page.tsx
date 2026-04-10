import type { Metadata } from 'next';
import { glossaryTerms, categories } from '@/data/glossary';
import GlossaryClient from '@/components/GlossaryClient';

export const metadata: Metadata = {
  title: 'AI Glossary — 50+ AI Terms Explained in Plain English',
  description:
    'A comprehensive glossary of AI terms explained in plain English. Learn what LLMs, transformers, RAG, fine-tuning, hallucinations, and 50+ other AI concepts actually mean.',
  keywords: [
    'AI glossary',
    'AI terms',
    'AI definitions',
    'artificial intelligence glossary',
    'LLM glossary',
    'machine learning terms',
    'what is a transformer',
    'what is RAG',
    'what is fine-tuning',
    'AI vocabulary',
    'AI for beginners',
    'generative AI terms',
  ],
  openGraph: {
    title: 'AI Glossary — 50+ AI Terms Explained in Plain English',
    description:
      'A comprehensive glossary of AI terms explained in plain English. Learn what LLMs, transformers, RAG, fine-tuning, hallucinations, and more actually mean.',
    url: 'https://ai-future-ready.com/glossary',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Glossary — 50+ AI Terms Explained in Plain English',
    description:
      'Demystify AI jargon. 50+ terms explained clearly for beginners and intermediate learners.',
  },
  alternates: {
    canonical: 'https://ai-future-ready.com/glossary',
  },
};

// Select top terms for the FAQ schema
const faqTerms = glossaryTerms.filter((t) =>
  [
    'Large Language Model (LLM)',
    'Hallucination',
    'Prompt Engineering',
    'RAG (Retrieval-Augmented Generation)',
    'Transformer',
    'Fine-Tuning',
    'Token',
    'Context Window',
    'AGI',
    'Reinforcement Learning from Human Feedback (RLHF)',
  ].includes(t.term)
);

export default function GlossaryPage() {
  const definedTermSetJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: 'AI Glossary',
    description:
      'A comprehensive glossary of artificial intelligence terms explained in plain English.',
    url: 'https://ai-future-ready.com/glossary',
    hasDefinedTerm: glossaryTerms.map((term) => ({
      '@type': 'DefinedTerm',
      name: term.term,
      description: term.definition,
      inDefinedTermSet: 'https://ai-future-ready.com/glossary',
    })),
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqTerms.map((term) => ({
      '@type': 'Question',
      name: `What is ${term.term}?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: term.definition,
      },
    })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://ai-future-ready.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'AI Glossary',
        item: 'https://ai-future-ready.com/glossary',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(definedTermSetJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />

      {/* Hero Section */}
      <section className="hero-gradient text-white" id="glossary-top">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-white/70 mb-3">
              Learn the Language of AI
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
              AI Glossary
            </h1>
            <p className="text-lg sm:text-xl text-white/90 leading-relaxed">
              {glossaryTerms.length}+ AI terms explained in plain English. Whether you are
              just getting started with AI or brushing up on the latest concepts, this
              glossary has you covered.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <GlossaryClient terms={glossaryTerms} categories={categories} />
        </div>
      </section>

      {/* FAQ Section (visible content for SEO) */}
      <section className="bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">
            Frequently Asked <span className="gradient-text">AI Questions</span>
          </h2>
          <div className="space-y-4">
            {faqTerms.map((term) => (
              <details
                key={term.term}
                className="faq-item bg-card border border-card-border rounded-xl group"
              >
                <summary className="flex items-center justify-between p-5 font-semibold text-foreground cursor-pointer">
                  <span>What is {term.term}?</span>
                  <svg
                    className="w-5 h-5 text-muted transition-transform group-open:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <div className="px-5 pb-5">
                  <p className="text-muted leading-relaxed">{term.definition}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
