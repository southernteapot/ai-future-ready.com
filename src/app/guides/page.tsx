import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Guides — Learn Artificial Intelligence from Scratch",
  description:
    "Free, beginner-friendly guides to artificial intelligence. Learn what AI is, master prompt engineering, and discover how to use AI tools effectively.",
  openGraph: {
    title: "AI Guides — Learn Artificial Intelligence from Scratch",
    description:
      "Free, beginner-friendly guides to artificial intelligence. Learn what AI is, master prompt engineering, and discover how to use AI tools effectively.",
    url: "https://ai-future-ready.com/guides",
  },
  alternates: {
    canonical: "/guides",
  },
};

const guides = [
  {
    href: "/guides/getting-started",
    title: "What Is AI, Actually?",
    subtitle: "A Complete Beginner's Guide",
    description:
      "Everything you need to know about artificial intelligence, explained in plain English. Learn what AI is, how it works, the difference between AI and machine learning, and how to start using AI tools today.",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
        />
      </svg>
    ),
    tags: ["Beginner", "Fundamentals", "10 min read"],
    color: "from-primary to-secondary",
  },
  {
    href: "/guides/prompting",
    title: "Prompt Engineering Guide",
    subtitle: "From Beginner to Advanced",
    description:
      "Master the art and science of writing effective AI prompts. Covers zero-shot, few-shot, chain-of-thought, and advanced techniques with real examples and templates you can use right away.",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
        />
      </svg>
    ),
    tags: ["Beginner to Advanced", "Practical", "15 min read"],
    color: "from-secondary to-accent",
  },
];

const upcomingGuides = [
  {
    title: "AI for Your Career",
    description:
      "How to leverage AI to boost your productivity, upskill, and stay competitive in an AI-driven job market.",
    tags: ["Coming Soon"],
  },
  {
    title: "AI Ethics and Safety",
    description:
      "Understand bias, hallucinations, privacy concerns, and how to use AI responsibly.",
    tags: ["Coming Soon"],
  },
  {
    title: "Building with AI APIs",
    description:
      "A developer's introduction to integrating AI models into your own applications.",
    tags: ["Coming Soon"],
  },
];

export default function GuidesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "AI Guides",
    description:
      "Free, beginner-friendly guides to artificial intelligence. Learn what AI is, master prompt engineering, and discover how to use AI tools effectively.",
    url: "https://ai-future-ready.com/guides",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: guides.map((guide, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://ai-future-ready.com${guide.href}`,
        name: guide.title,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="hero-gradient text-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-indigo-100 font-medium mb-3">Learn AI</p>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              AI Guides for Everyone
            </h1>
            <p className="text-xl text-indigo-100 leading-relaxed">
              No jargon, no hype -- just clear, practical guides that help you
              understand and use artificial intelligence. Whether you are
              completely new to AI or looking to level up your skills, start
              here.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Guides */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold mb-2">Featured Guides</h2>
        <p className="text-muted mb-10">
          Start with these foundational guides to build your AI knowledge from
          the ground up.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {guides.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="group block bg-card rounded-2xl border border-card-border overflow-hidden card-hover"
            >
              <div className={`bg-gradient-to-r ${guide.color} p-6`}>
                <div className="text-white/90">{guide.icon}</div>
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {guide.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                  {guide.title}
                </h3>
                <p className="text-sm font-medium text-primary mb-3">
                  {guide.subtitle}
                </p>
                <p className="text-muted leading-relaxed">
                  {guide.description}
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-primary">
                  Read guide
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Upcoming Guides */}
      <section className="bg-surface py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-2">More Guides on the Way</h2>
          <p className="text-muted mb-10">
            We are always writing new guides. Here is what is coming next.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingGuides.map((guide) => (
              <div
                key={guide.title}
                className="bg-card rounded-xl border border-card-border p-6 opacity-75"
              >
                <div className="flex flex-wrap gap-2 mb-3">
                  {guide.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium px-2.5 py-1 rounded-full bg-accent/10 text-accent-dark"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-lg font-bold mb-2">{guide.title}</h3>
                <p className="text-muted text-sm leading-relaxed">
                  {guide.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold mb-8 text-center">
          Other Ways to Learn
        </h2>
        <div className="grid sm:grid-cols-3 gap-6">
          <Link
            href="/models"
            className="group text-center p-6 rounded-xl bg-card border border-card-border card-hover"
          >
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5"
                />
              </svg>
            </div>
            <h3 className="font-bold mb-1 group-hover:text-primary transition-colors">
              Compare AI Models
            </h3>
            <p className="text-sm text-muted">
              Side-by-side comparison of ChatGPT, Claude, Gemini, and more.
            </p>
          </Link>

          <Link
            href="/glossary"
            className="group text-center p-6 rounded-xl bg-card border border-card-border card-hover"
          >
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-secondary/10 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-secondary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                />
              </svg>
            </div>
            <h3 className="font-bold mb-1 group-hover:text-primary transition-colors">
              AI Glossary
            </h3>
            <p className="text-sm text-muted">
              Plain-English definitions of every AI term you will encounter.
            </p>
          </Link>

          <Link
            href="/tools/prompts"
            className="group text-center p-6 rounded-xl bg-card border border-card-border card-hover"
          >
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-accent/10 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-accent"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z"
                />
              </svg>
            </div>
            <h3 className="font-bold mb-1 group-hover:text-primary transition-colors">
              Prompt Library
            </h3>
            <p className="text-sm text-muted">
              Ready-to-use prompt templates for writing, coding, and more.
            </p>
          </Link>
        </div>
      </section>
    </>
  );
}
