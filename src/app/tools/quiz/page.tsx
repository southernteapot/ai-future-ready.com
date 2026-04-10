import type { Metadata } from 'next';
import QuizClient from '@/components/QuizClient';

export const metadata: Metadata = {
  title: 'Find Your Perfect AI Tool — Interactive Quiz',
  description:
    'Answer 7 quick questions and we\'ll recommend the best AI tool for your needs. Compare ChatGPT, Claude, Gemini, and more based on your specific use case.',
  keywords: [
    'which AI tool should I use',
    'best AI tool',
    'ChatGPT vs Claude',
    'AI tool recommendation',
    'AI quiz',
  ],
};

export default function QuizPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Find Your Perfect AI Tool',
    description: 'Interactive quiz to find the best AI tool for your needs.',
    url: 'https://ai-future-ready.com/tools/quiz',
    applicationCategory: 'UtilityApplication',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="hero-gradient text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Find Your Perfect AI Tool</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Answer a few quick questions and we&apos;ll recommend the best AI tool for your needs.
          </p>
        </div>
      </section>
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <QuizClient />
      </section>
    </>
  );
}
