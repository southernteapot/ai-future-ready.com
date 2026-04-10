import type { Metadata } from 'next';
import PromptLibraryClient from '@/components/PromptLibraryClient';

export const metadata: Metadata = {
  title: 'AI Prompt Library — Copy-Paste Prompts for Every Use Case',
  description:
    'A curated library of effective AI prompts organized by category. Copy and customize prompts for writing, coding, business, research, education, and more.',
  keywords: [
    'AI prompts',
    'ChatGPT prompts',
    'Claude prompts',
    'prompt templates',
    'AI prompt library',
    'best AI prompts',
    'prompt engineering examples',
  ],
};

export default function PromptLibraryPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'AI Prompt Library',
    description: 'Curated collection of effective AI prompts for every use case.',
    url: 'https://ai-future-ready.com/tools/prompts',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="hero-gradient text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Prompt Library</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Copy-paste prompts that actually work. Organized by category, ready to customize.
          </p>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <PromptLibraryClient />
      </section>
    </>
  );
}
