import Link from "next/link";
import { getAllContent } from "@/lib/content";
import AgentLayerDemo from "@/components/AgentLayerDemo";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function HomePage() {
  const models = getAllContent("models");
  const agents = getAllContent("agents");
  const blog = getAllContent("blog");

  const modelCount = models.length;
  const agentCount = agents.length;

  return (
    <div className="space-y-16">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "AI Future Ready",
            url: SITE_URL,
            description:
              "A working demonstration of the agent-ready web. Every page is built for both humans and AI agents — structured, machine-readable, and trustworthy.",
          }),
        }}
      />

      {/* Hero */}
      <section className="space-y-6 pt-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
          The web wasn&rsquo;t built for AI agents.
          <br />
          This site was.
        </h1>
        <p className="text-base text-neutral-400 leading-relaxed max-w-3xl">
          Every website you visit today was designed for one audience: humans
          with browsers. But a growing share of web traffic is now AI agents —
          researching, comparing, recommending, acting on behalf of people.
          Those agents hit the same pages you do, and they get HTML soup.
        </p>
        <p className="text-base text-neutral-400 leading-relaxed max-w-3xl">
          This site is a working proof-of-concept for a different approach.
          Every page is{" "}
          <strong className="text-white">
            structured, machine-readable, and built for two audiences
          </strong>
          . Humans get a clean reading experience. Agents get raw markdown,
          YAML metadata, JSON APIs, and an MCP server — no scraping required.
        </p>
        <p className="text-base text-white leading-relaxed max-w-3xl">
          This is what the agent-ready web looks like. Browse it, query it,
          or point your agent at it.
        </p>
      </section>

      {/* Live Demo */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-white">
          See it, don&rsquo;t just read about it
        </h2>
        <p className="text-sm text-neutral-400 max-w-3xl">
          Every page on this site has multiple representations. Here&rsquo;s
          what a single piece of content looks like from three perspectives:
        </p>
        <AgentLayerDemo />
      </section>

      {/* Agent Infrastructure */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-white">The agent layer</h2>
        <p className="text-sm text-neutral-400 max-w-3xl">
          These aren&rsquo;t hidden features. They&rsquo;re the point. Every
          one of these is live right now.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            {
              href: "/llms.txt",
              label: "llms.txt",
              desc: "Machine-readable index of all content. The front door for agents.",
            },
            {
              href: "/api/v1/index.json",
              label: "/api/v1/",
              desc: `JSON API — ${modelCount} models, ${agentCount} agent platforms, comparisons, pricing, recommendations.`,
            },
            {
              href: "/content/_index.md",
              label: "/content/",
              desc: "Raw markdown with YAML frontmatter. Every page, directly fetchable.",
            },
            {
              href: "/search-index.json",
              label: "search-index.json",
              desc: "Structured search index. Titles, descriptions, tags, providers — ready to query.",
            },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block p-4 border border-neutral-800 rounded-lg hover:border-neutral-600 transition-colors"
            >
              <code className="text-sm text-white">{item.label}</code>
              <p className="text-xs text-neutral-500 mt-1">{item.desc}</p>
            </a>
          ))}
        </div>
      </section>

      {/* What's Inside */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-white">The reference library</h2>
        <p className="text-sm text-neutral-400 max-w-3xl">
          {modelCount} AI models. {agentCount} agent platforms. Benchmarks,
          pricing, comparisons, and analysis — all structured with YAML
          frontmatter and stable identifiers. The content is the proof that
          agent-ready architecture works.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              href: "/models",
              label: "Models",
              desc: `${modelCount} models with benchmarks, pricing, and recommendations`,
            },
            {
              href: "/agents",
              label: "Agents",
              desc: `${agentCount} agent platforms and frameworks compared`,
            },
            {
              href: "/comparisons",
              label: "Comparisons",
              desc: "Head-to-head analysis: Claude vs GPT, open vs proprietary",
            },
            {
              href: "/blog",
              label: "Blog",
              desc: "Opinionated analysis of what's actually happening in AI",
            },
            {
              href: "/glossary",
              label: "Glossary",
              desc: "76 AI terms defined in plain English",
            },
            {
              href: "/timeline",
              label: "Timeline",
              desc: "77 events from 1950 to April 2026",
            },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block p-4 border border-neutral-800 rounded-lg hover:border-neutral-600 transition-colors"
            >
              <span className="text-sm text-white font-semibold">
                {item.label}
              </span>
              <p className="text-xs text-neutral-500 mt-1">{item.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest from the Blog */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-white">Latest analysis</h2>
        <div className="space-y-3">
          {blog
            .sort((a, b) => {
              const da = String(a.meta.date ?? a.meta.last_updated);
              const db = String(b.meta.date ?? b.meta.last_updated);
              return db.localeCompare(da);
            })
            .slice(0, 3)
            .map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block p-4 border border-neutral-800 rounded-lg hover:border-neutral-600 transition-colors"
              >
                <span className="text-sm text-white">
                  {post.meta.title}
                </span>
                <span className="text-xs text-neutral-600 ml-3">
                  {String(post.meta.date ?? post.meta.last_updated)}
                </span>
                <p className="text-xs text-neutral-500 mt-1">
                  {post.meta.description}
                </p>
              </Link>
            ))}
        </div>
      </section>

      {/* Agent-Ready Checklist CTA */}
      <section className="border-t border-neutral-800 pt-12 space-y-6">
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-white">
            Make your site agent-ready
          </h2>
          <p className="text-sm text-neutral-400 max-w-2xl">
            Most websites are invisible to AI agents. Four changes can
            fix that.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 max-w-2xl">
          <Link
            href="/score"
            className="group block p-5 border border-neutral-600 rounded-lg hover:border-neutral-400 transition-colors"
          >
            <span className="text-sm text-white font-bold block group-hover:underline">
              Score your site &rarr;
            </span>
            <p className="text-xs text-neutral-500 mt-1.5">
              Ten questions. Two minutes. Find your maturity level
              and specific gaps.
            </p>
          </Link>
          <Link
            href="/checklist"
            className="group block p-5 border border-neutral-800 rounded-lg hover:border-neutral-600 transition-colors"
          >
            <span className="text-sm text-white font-bold block group-hover:underline">
              Read the checklist &rarr;
            </span>
            <p className="text-xs text-neutral-500 mt-1.5">
              Full spec with criteria, failure modes, and a five-level
              maturity model.
            </p>
          </Link>
        </div>
        <div className="flex gap-3 max-w-2xl">
          <Link
            href="/standard"
            className="block px-4 py-2.5 border border-neutral-800 rounded-lg hover:border-neutral-600 transition-colors flex-1"
          >
            <span className="text-xs text-white font-semibold">
              Technical spec
            </span>
            <span className="text-xs text-neutral-600 ml-2">
              Formats &amp; protocols
            </span>
          </Link>
          <Link
            href="/api/v1/index.json"
            className="block px-4 py-2.5 border border-neutral-800 rounded-lg hover:border-neutral-600 transition-colors flex-1"
          >
            <span className="text-xs text-white font-semibold">
              Browse the API
            </span>
            <span className="text-xs text-neutral-600 ml-2">
              Structured JSON index
            </span>
          </Link>
        </div>
      </section>

      {/* Why Now */}
      <section className="space-y-4 pt-8">
        <h2 className="text-xl font-bold text-white">Why this matters now</h2>
        <div className="text-sm text-neutral-400 space-y-4 max-w-3xl leading-relaxed">
          <p>
            AI agents are already browsing the web on behalf of users —
            comparing products, researching decisions, summarizing options.
            Most websites give them nothing to work with. Agents scrape
            HTML, guess at structure, hallucinate details, and miss context.
          </p>
          <p>
            The fix is not a chatbot widget. The fix is{" "}
            <strong className="text-white">building the site right</strong>.
            Structured metadata. Stable identifiers. Machine-readable
            content alongside human-readable pages. Discovery protocols so
            agents know what&rsquo;s available without crawling everything.
          </p>
          <p>
            This site is one implementation of that idea, applied to the AI
            landscape itself. The pattern generalizes to any domain —
            products, documentation, legal references, knowledge bases,
            company sites.
          </p>
          <p className="text-white">
            The agent-ready web is not a feature. It&rsquo;s the next
            version of the web.
          </p>
        </div>
      </section>
    </div>
  );
}
