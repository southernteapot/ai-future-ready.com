import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About AI Future Ready',
  description:
    'AI Future Ready is your comprehensive guide to artificial intelligence. We make AI accessible with plain-English guides, model comparisons, and interactive tools.',
};

export default function AboutPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AI Future Ready',
    url: 'https://ai-future-ready.com',
    description:
      'Your comprehensive guide to artificial intelligence. Compare LLMs, learn prompt engineering, and get AI-ready.',
    sameAs: [],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="hero-gradient text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">About AI Future Ready</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Making AI accessible, understandable, and useful for everyone.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose max-w-none">
          <h2>Our Mission</h2>
          <p>
            AI is transforming how we work, create, and solve problems. But with new models, tools,
            and capabilities launching every week, it can feel overwhelming to keep up — let alone
            figure out where to start.
          </p>
          <p>
            <strong>AI Future Ready</strong> exists to bridge that gap. We break down the complex
            world of artificial intelligence into clear, practical, and actionable guidance that
            anyone can use — whether you&apos;re a complete beginner or a professional looking to
            level up.
          </p>

          <h2>What We Offer</h2>
          <ul>
            <li>
              <strong>Model Comparisons</strong> — Side-by-side analysis of every major AI model,
              with interactive charts and honest assessments of strengths and weaknesses
            </li>
            <li>
              <strong>Plain-English Guides</strong> — From &ldquo;What is AI?&rdquo; to advanced prompt
              engineering, all written in language that makes sense
            </li>
            <li>
              <strong>Use Case Guides</strong> — Practical guides for using AI in writing, coding,
              business, research, education, and more
            </li>
            <li>
              <strong>Interactive Tools</strong> — Quizzes to find your ideal AI tool, a prompt
              library with copy-paste templates, and comparison calculators
            </li>
            <li>
              <strong>Deep Dives</strong> — For the curious: how AI actually works, safety and
              ethics, privacy, and the open vs closed source debate
            </li>
          </ul>

          <h2>Our Approach</h2>
          <p>
            We believe in a few key principles:
          </p>
          <ul>
            <li>
              <strong>Accuracy first</strong> — Every fact, benchmark, and comparison is
              researched and verified. We&apos;d rather say less than say something wrong.
            </li>
            <li>
              <strong>No jargon without explanation</strong> — If we use a technical term, we
              define it. Our glossary has 50+ terms in plain English.
            </li>
            <li>
              <strong>Practical over theoretical</strong> — We focus on what you can actually do
              with AI, not just what&apos;s academically interesting.
            </li>
            <li>
              <strong>Honest and balanced</strong> — We&apos;re not sponsored by any AI company. We
              call out weaknesses alongside strengths.
            </li>
          </ul>

          <h2>Our Family of Sites</h2>
          <p>
            AI Future Ready is part of a family of &ldquo;Ready&rdquo; sites, each focused on
            making a complex topic accessible:
          </p>
          <ul>
            <li>
              <strong>
                <a href="https://airegready.com">AIRegReady.com</a>
              </strong>{' '}
              — Your guide to AI regulation and compliance. Plain-English summaries of the EU AI
              Act, NIST AI RMF, and more.
            </li>
            <li>
              <strong>
                <a href="https://resume-ready.com">Resume-Ready.com</a>
              </strong>{' '}
              — Get your resume ready with expert guidance and tools.
            </li>
          </ul>

          <h2>Stay Connected</h2>
          <p>
            AI moves fast. We update our content regularly to reflect the latest developments. Check
            back often, and explore our guides to get started on your AI journey.
          </p>
        </div>

        {/* CTAs */}
        <div className="mt-12 grid sm:grid-cols-2 gap-4">
          <Link
            href="/guides/getting-started"
            className="bg-card rounded-xl border border-card-border p-6 card-hover group text-center"
          >
            <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
              New to AI?
            </h3>
            <p className="text-sm text-muted">Start with our beginner&apos;s guide</p>
          </Link>
          <Link
            href="/models"
            className="bg-card rounded-xl border border-card-border p-6 card-hover group text-center"
          >
            <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
              Compare Models
            </h3>
            <p className="text-sm text-muted">Find the right AI model for you</p>
          </Link>
        </div>
      </section>
    </>
  );
}
