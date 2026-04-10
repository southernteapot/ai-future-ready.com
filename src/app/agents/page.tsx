import type { Metadata } from 'next';
import Link from 'next/link';
import AgentFilter from '@/components/AgentFilter';
import { agentPlatforms } from '@/data/agents';

export const metadata: Metadata = {
  title: 'AI Agent Platforms — Compare the Best AI Agent Frameworks in 2026',
  description:
    'Compare the best AI agent platforms and frameworks. From personal agents like OpenClaw to dev frameworks like LangGraph and coding agents like Claude Code.',
  keywords: [
    'AI agents',
    'AI agent platforms',
    'AI agent frameworks',
    'OpenClaw',
    'LangGraph',
    'CrewAI',
    'Paperclip',
    'Claude Code',
    'Devin',
    'AI orchestration',
    'multi-agent systems',
    'coding agents',
    'autonomous AI',
  ],
  openGraph: {
    title: 'AI Agent Platforms — Compare the Best AI Agent Frameworks in 2026',
    description:
      'Compare the best AI agent platforms and frameworks for 2026, from personal agents to enterprise orchestration.',
    url: 'https://ai-future-ready.com/agents',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Agent Platforms — Compare the Best AI Agent Frameworks in 2026',
    description:
      'Compare the best AI agent platforms and frameworks for 2026.',
  },
};

export default function AgentsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'AI Agent Platforms',
    description:
      'A comprehensive comparison of the leading AI agent platforms, frameworks, and tools in 2026.',
    url: 'https://ai-future-ready.com/agents',
    numberOfItems: agentPlatforms.length,
    mainEntity: agentPlatforms.map((platform) => ({
      '@type': 'SoftwareApplication',
      name: platform.name,
      description: platform.description,
      url: platform.website,
      applicationCategory: 'AI Agent Platform',
      license: platform.license,
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
            AI Agent Platforms
          </h1>
          <p className="max-w-3xl mx-auto text-lg sm:text-xl text-white/85 leading-relaxed">
            2026 is the year AI agents went mainstream. From personal assistants
            that manage your messages across every platform to autonomous coding
            agents that resolve real GitHub issues, the agent ecosystem has
            exploded. Explore the platforms shaping this revolution.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <a
              href="#platforms"
              className="inline-flex items-center gap-2 bg-white text-primary font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              Browse Platforms
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </a>
            <Link
              href="/blog/ai-agent-revolution-2026"
              className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white font-semibold px-6 py-3 rounded-xl border border-white/25 hover:bg-white/25 transition-colors"
            >
              Read Our Analysis
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick stats bar */}
      <section className="bg-surface border-b border-card-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            <div>
              <p className="text-3xl font-extrabold text-primary">
                {agentPlatforms.length}
              </p>
              <p className="text-sm text-muted mt-1">Platforms</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold" style={{ color: '#8b5cf6' }}>
                {agentPlatforms.filter((p) => p.category === 'personal-agent').length}
              </p>
              <p className="text-sm text-muted mt-1">Personal Agents</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold" style={{ color: '#3b82f6' }}>
                {agentPlatforms.filter((p) => p.category === 'dev-framework').length}
              </p>
              <p className="text-sm text-muted mt-1">Dev Frameworks</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold" style={{ color: '#ef4444' }}>
                {agentPlatforms.filter((p) => p.category === 'coding-agent').length}
              </p>
              <p className="text-sm text-muted mt-1">Coding Agents</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold" style={{ color: '#f59e0b' }}>
                {agentPlatforms.filter((p) => p.category === 'orchestration').length}
              </p>
              <p className="text-sm text-muted mt-1">Orchestration</p>
            </div>
          </div>
        </div>
      </section>

      {/* What are AI Agents */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card rounded-2xl border border-card-border p-8 sm:p-10 shadow-sm">
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-6">
              What Are <span className="gradient-text">AI Agents</span>?
            </h2>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                AI agents are systems where a large language model operates with
                autonomy, making decisions about what steps to take to accomplish
                a goal. Unlike a chatbot that responds to one message at a time,
                an agent can plan a sequence of actions, use tools, observe
                results, and adjust its approach — all without human
                intervention at every step.
              </p>
              <p>
                In 2025-2026, agents evolved from experimental demos to
                production-ready platforms. Personal agents like{' '}
                <strong>OpenClaw</strong> now manage your messages across
                WhatsApp, Slack, and Discord. Coding agents like{' '}
                <strong>Claude Code</strong> resolve real software engineering
                issues with 80%+ accuracy. Orchestration platforms like{' '}
                <strong>Paperclip</strong> are exploring fully autonomous company
                structures where agents fill every role from CEO to QA.
              </p>
              <p>
                The categories below reflect where the ecosystem has settled:
                personal agents for daily life, developer frameworks for
                building custom agents, orchestration platforms for coordinating
                multiple agents, coding agents for software engineering, and
                no-code tools for business users.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Platform cards section */}
      <section id="platforms" className="scroll-mt-20 py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
              All <span className="gradient-text">Agent Platforms</span>
            </h2>
            <p className="max-w-2xl mx-auto text-muted text-lg">
              Filter by category and explore detailed information about each
              platform, including features, pricing, and ideal use cases.
            </p>
          </div>
          <AgentFilter />
        </div>
      </section>

      {/* Cross-links */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card rounded-2xl border border-card-border p-8 text-center shadow-sm">
            <h2 className="text-2xl font-bold mb-4">
              Want to Build Your Own Agent?
            </h2>
            <p className="text-muted mb-6 max-w-xl mx-auto">
              Check out our hands-on tutorial on building AI agents, or read our
              in-depth analysis of the agent revolution.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/tutorials#ai-agents"
                className="px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors"
              >
                Agent Tutorial
              </Link>
              <Link
                href="/blog/ai-agent-revolution-2026"
                className="px-6 py-3 bg-card border border-card-border text-foreground rounded-xl font-medium hover:bg-surface transition-colors"
              >
                Read the Analysis
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
