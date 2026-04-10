import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Use Cases — How AI Can Help You Today",
  description:
    "Explore practical AI use cases for writing, coding, research, business, image generation, education, and more. Find out how artificial intelligence can save you time and boost your productivity.",
  keywords: [
    "AI use cases",
    "how to use AI",
    "AI for writing",
    "AI for coding",
    "AI for business",
    "AI image generation",
    "AI for research",
    "AI for education",
    "practical AI",
    "AI productivity",
  ],
  openGraph: {
    title: "AI Use Cases — How AI Can Help You Today",
    description:
      "Explore practical AI use cases for writing, coding, research, business, image generation, education, and more.",
    url: "https://ai-future-ready.com/use-cases",
  },
};

const categories = [
  {
    slug: "writing",
    title: "Writing & Content",
    description:
      "Draft blog posts, polish copy, brainstorm ideas, and create social media content in a fraction of the time.",
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
          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
        />
      </svg>
    ),
    color: "from-indigo-500 to-purple-500",
  },
  {
    slug: "coding",
    title: "Coding & Development",
    description:
      "Generate code, debug errors, write documentation, and accelerate your entire development workflow.",
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
          d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
        />
      </svg>
    ),
    color: "from-emerald-500 to-teal-500",
  },
  {
    slug: "research",
    title: "Research & Analysis",
    description:
      "Summarize papers, analyze data, review literature, and fact-check findings with AI-powered research tools.",
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
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>
    ),
    color: "from-emerald-500 to-teal-500",
  },
  {
    slug: "business",
    title: "Business & Productivity",
    description:
      "Manage emails, summarize meetings, analyze data, automate customer service, and streamline operations.",
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
          d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
        />
      </svg>
    ),
    color: "from-amber-500 to-orange-500",
  },
  {
    slug: "images",
    title: "Image Generation",
    description:
      "Create stunning visuals, marketing graphics, product mockups, and art with AI image generators.",
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
          d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M2.25 18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V6a2.25 2.25 0 00-2.25-2.25h-15A2.25 2.25 0 002.25 6v12zm9-11.25a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
        />
      </svg>
    ),
    color: "from-pink-500 to-rose-500",
  },
  {
    slug: "education",
    title: "Education & Learning",
    description:
      "Get personalized tutoring, create study materials, learn new languages, and build educational content.",
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
          d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
        />
      </svg>
    ),
    color: "from-violet-500 to-indigo-500",
  },
];

export default function UseCasesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "AI Use Cases — How AI Can Help You Today",
    description:
      "Explore practical AI use cases for writing, coding, research, business, image generation, education, and more.",
    url: "https://ai-future-ready.com/use-cases",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: categories.map((cat, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: cat.title,
        url: `https://ai-future-ready.com/use-cases/${cat.slug}`,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="hero-gradient text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            How AI Can Help You
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            AI is not just for tech companies. From writing emails to generating
            images, there are practical ways to use artificial intelligence in
            your everyday work and life. Explore the categories below to find
            what fits your needs.
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/use-cases/${cat.slug}`}
              className="group bg-card border border-card-border rounded-2xl p-8 card-hover block"
            >
              <div
                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${cat.color} text-white flex items-center justify-center mb-5`}
              >
                {cat.icon}
              </div>
              <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                {cat.title}
              </h2>
              <p className="text-muted leading-relaxed mb-4">
                {cat.description}
              </p>
              <span className="text-primary font-medium text-sm inline-flex items-center gap-1">
                Explore use cases
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-surface py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Not Sure Where to Start?</h2>
          <p className="text-muted text-lg mb-8 max-w-2xl mx-auto">
            If you are new to AI, our getting-started guide walks you through
            the basics. Or jump into our prompt library for ready-to-use
            templates you can try right now.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/guides/getting-started"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary-dark transition-colors"
            >
              Getting Started Guide
            </Link>
            <Link
              href="/tools/prompts"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-card-border text-foreground font-medium hover:bg-surface-dark transition-colors"
            >
              Browse Prompt Library
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
