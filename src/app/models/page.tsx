import type { Metadata } from 'next';
import ModelFilter from '@/components/ModelFilter';
import HardwareFilter from '@/components/HardwareFilter';
import ModelCharts from '@/components/ModelCharts';
import ModelTimeline from '@/components/ModelTimeline';
import UseCaseRecommender from '@/components/UseCaseRecommender';
import { models } from '@/data/models';

export const metadata: Metadata = {
  title: 'Compare AI Models — LLM Comparison Guide 2026',
  description:
    'Compare 33+ AI models side-by-side. Benchmark scores, pricing, hardware requirements, and capabilities for GPT-5.4, Claude Opus 4.6, Gemini 3.1 Pro, Llama 4, Gemma 4, DeepSeek, and more.',
  keywords: [
    'AI model comparison',
    'LLM comparison',
    'GPT-5.4 vs Claude',
    'best AI model 2026',
    'AI benchmarks',
    'LLM benchmarks',
    'GPT-5.4',
    'Claude Opus 4.6',
    'Claude Sonnet 4.6',
    'Gemini 3.1 Pro',
    'Gemma 4',
    'Llama 4',
    'DeepSeek R1',
    'Grok 4.20',
    'Qwen 3.5',
    'Nemotron-Cascade 2',
    'open source LLM',
    'AI pricing comparison',
    'run LLM locally',
    'VRAM requirements',
  ],
  openGraph: {
    title: 'Compare AI Models — LLM Comparison Guide 2026',
    description:
      'Interactive comparison of 33+ AI models with benchmarks, pricing, hardware requirements, and capability radar charts.',
    url: 'https://ai-future-ready.com/models',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compare AI Models — LLM Comparison Guide 2026',
    description:
      'Interactive comparison of 33+ AI models with benchmarks, pricing, hardware requirements, and capability radar charts.',
  },
};

export default function ModelsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'AI Model Comparison',
    description:
      'A comprehensive comparison of the leading AI language models, including proprietary and open-source options.',
    numberOfItems: models.length,
    itemListElement: models.map((model, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: model.name,
      description: model.description,
      url: model.website,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />

      {/* Hero section */}
      <section className="hero-gradient text-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-white/70 mb-4">
            Updated April 2026
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            Compare AI Models
          </h1>
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-white/85 leading-relaxed">
            Explore the top large language models side-by-side. See benchmark scores, pricing, strengths,
            and weaknesses to find the right model for your needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <a
              href="#models"
              className="inline-flex items-center gap-2 bg-white text-primary font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              Browse Models
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </a>
            <a
              href="#charts"
              className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white font-semibold px-6 py-3 rounded-xl border border-white/25 hover:bg-white/25 transition-colors"
            >
              Interactive Charts
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Quick stats bar */}
      <section className="bg-surface border-b border-card-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-3xl font-extrabold text-primary">{models.length}</p>
              <p className="text-sm text-muted mt-1">Models Compared</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-secondary">{models.filter((m) => m.type === 'proprietary').length}</p>
              <p className="text-sm text-muted mt-1">Proprietary</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-success">{models.filter((m) => m.type === 'open-source').length}</p>
              <p className="text-sm text-muted mt-1">Open Source</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-accent">6</p>
              <p className="text-sm text-muted mt-1">Benchmark Dimensions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Use case recommender */}
      <section id="recommender" className="scroll-mt-20 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
              Find the Right <span className="gradient-text">Model</span>
            </h2>
            <p className="max-w-2xl mx-auto text-muted text-lg">
              Select your use case and we&apos;ll recommend the best models for the job.
            </p>
          </div>
          <UseCaseRecommender />
        </div>
      </section>

      {/* Model cards section */}
      <section id="models" className="scroll-mt-20 py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
              All <span className="gradient-text">AI Models</span>
            </h2>
            <p className="max-w-2xl mx-auto text-muted text-lg">
              Filter by type and explore detailed information about each model, including benchmarks,
              pricing, and ideal use cases.
            </p>
          </div>
          <ModelFilter />
        </div>
      </section>

      {/* Hardware filter section */}
      <section id="hardware" className="scroll-mt-20 py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
              What Can I <span className="gradient-text">Run?</span>
            </h2>
            <p className="max-w-2xl mx-auto text-muted text-lg">
              Select your GPU to see which open-source models you can run locally.
            </p>
          </div>
          <HardwareFilter />
        </div>
      </section>

      {/* Charts section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
              Interactive <span className="gradient-text">Comparison Charts</span>
            </h2>
            <p className="max-w-2xl mx-auto text-muted text-lg">
              Select the models you want to compare and explore radar charts, benchmark bar charts,
              and pricing visualizations.
            </p>
          </div>
          <ModelCharts />
        </div>
      </section>

      {/* Model Release Timeline */}
      <section id="timeline" className="scroll-mt-20 py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
              Model Release <span className="gradient-text">Timeline</span>
            </h2>
            <p className="max-w-2xl mx-auto text-muted text-lg">
              See when each model was released and how the landscape has evolved.
            </p>
          </div>
          <ModelTimeline />
        </div>
      </section>

      {/* Methodology note */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card rounded-2xl border border-card-border p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-4">About These Benchmarks</h2>
            <div className="space-y-3 text-sm text-muted leading-relaxed">
              <p>
                The benchmark scores shown are normalized to a 0-100 scale based on aggregated performance
                across multiple public evaluations, including MMLU, HumanEval, MATH, GSM8K, HellaSwag,
                MT-Bench, and others. They are meant to give a relative comparison rather than absolute measurements.
              </p>
              <p>
                <strong className="text-foreground">Reasoning</strong> reflects performance on complex
                multi-step logic tasks. <strong className="text-foreground">Coding</strong> covers code
                generation, debugging, and understanding. <strong className="text-foreground">Math</strong>
                captures mathematical problem-solving ability. <strong className="text-foreground">Writing</strong>
                evaluates creative and professional writing quality. <strong className="text-foreground">Multilingual</strong>
                measures capability across non-English languages. <strong className="text-foreground">Speed</strong>
                represents relative inference speed (tokens per second in typical use).
              </p>
              <p>
                Pricing reflects published API rates as of April 2026 and may change. Open-source models
                can be self-hosted at infrastructure cost only, or accessed through third-party API providers
                at varying rates.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
