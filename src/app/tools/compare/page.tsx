import type { Metadata } from 'next';
import CompareClient from '@/components/CompareClient';
import ModelComparison from '@/components/ModelComparison';

export const metadata: Metadata = {
  title: 'AI Tool Comparison Calculator — Compare Features & Pricing',
  description:
    'Side-by-side comparison of AI tools and models. Compare features, pricing, context windows, and capabilities to find the best fit for your needs.',
  keywords: [
    'AI comparison',
    'LLM comparison',
    'ChatGPT vs Claude',
    'AI pricing comparison',
    'AI model features',
  ],
};

export default function ComparePage() {
  return (
    <>
      <section className="hero-gradient text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">AI Tool Comparison</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Select AI models to compare them side-by-side on features, pricing, and capabilities.
          </p>
        </div>
      </section>

      {/* Detailed side-by-side comparison */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <ModelComparison />
      </section>

      {/* Quick-select comparison table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold mb-6">Quick Comparison Table</h2>
        <CompareClient />
      </section>
    </>
  );
}
