import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";

export default function Home() {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AI Future Ready",
    url: "https://ai-future-ready.com",
    logo: "https://ai-future-ready.com/logo.png",
    description:
      "Your comprehensive guide to artificial intelligence. Compare LLMs, learn prompt engineering, and get AI-ready.",
    sameAs: [],
  };

  const models = [
    {
      provider: "OpenAI",
      name: "GPT-5.4",
      stat: "1M context window",
      color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    },
    {
      provider: "Anthropic",
      name: "Claude Opus 4.6",
      stat: "1M context window",
      color: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
    },
    {
      provider: "Google",
      name: "Gemini 3.1 Pro",
      stat: "1M context window",
      color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    },
    {
      provider: "Meta",
      name: "Llama 4 Maverick",
      stat: "Open source",
      color: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
    },
    {
      provider: "Google",
      name: "Gemma 4",
      stat: "Apache 2.0 / On-device",
      color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    },
  ];

  const features = [
    {
      emoji: "\u{1F50D}",
      title: "Compare AI Models",
      description:
        "Side-by-side breakdowns of GPT-5.4, Claude Opus 4.6, Gemini 3.1 Pro, Gemma 4, Llama 4, and more. Find the right model for your needs.",
      href: "/models",
    },
    {
      emoji: "\u{1F4AC}",
      title: "Learn Prompt Engineering",
      description:
        "Master the art of talking to AI. Techniques, templates, and real examples to get better results.",
      href: "/guides/prompting",
    },
    {
      emoji: "\u{1F680}",
      title: "Explore Use Cases",
      description:
        "Discover how AI is transforming writing, coding, research, business, and creative work right now.",
      href: "/use-cases",
    },
    {
      emoji: "\u{1F4D6}",
      title: "AI Glossary",
      description:
        "Jargon-free definitions for every AI term you'll encounter. From 'tokens' to 'transformers.'",
      href: "/glossary",
    },
    {
      emoji: "\u{1F3AE}",
      title: "Interactive Tools",
      description:
        "Quizzes, prompt builders, and hands-on exercises to test your knowledge and sharpen your skills.",
      href: "/tools/quiz",
    },
    {
      emoji: "\u{1F9E0}",
      title: "Deep Dives",
      description:
        "Detailed explorations of how AI actually works — attention, training, fine-tuning, and beyond.",
      href: "/deep-dives",
    },
  ];

  const useCases = [
    { label: "Writing", emoji: "\u{270D}\u{FE0F}", color: "from-indigo-500 to-purple-500" },
    { label: "Coding", emoji: "\u{1F4BB}", color: "from-emerald-500 to-teal-500" },
    { label: "Research", emoji: "\u{1F50E}", color: "from-emerald-500 to-teal-500" },
    { label: "Business", emoji: "\u{1F4C8}", color: "from-amber-500 to-orange-500" },
    { label: "Images", emoji: "\u{1F3A8}", color: "from-pink-500 to-rose-500" },
    { label: "Education", emoji: "\u{1F393}", color: "from-violet-500 to-indigo-500" },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd),
        }}
      />

      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 hero-gradient opacity-95" />
        {/* Animated background shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute top-1/2 -left-20 h-60 w-60 rounded-full bg-emerald-300/20 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-amber-300/10 blur-3xl" />
          {/* Dot grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-28 sm:py-36 lg:py-44 text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm border border-white/20">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
            </span>
            Your AI journey starts here
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1]">
            Your Complete Guide to the{" "}
            <span className="relative">
              <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300">
                AI-Powered Future
              </span>
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-indigo-100/90 sm:text-xl leading-relaxed">
            Compare the top AI models, master prompt engineering, and discover
            real-world use cases — all in plain English. No PhD required.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/models"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-semibold text-indigo-600 shadow-lg shadow-indigo-900/20 transition hover:bg-indigo-50 hover:shadow-xl hover:shadow-indigo-900/25 hover:-translate-y-0.5"
            >
              Explore AI Models
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
            <Link
              href="/guides/getting-started"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-white/30 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition hover:bg-white/20 hover:border-white/50 hover:-translate-y-0.5"
            >
              Get Started
            </Link>
          </div>

          {/* Stats row */}
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              { value: "33+", label: "AI Models Compared" },
              { value: "50+", label: "In-Depth Guides" },
              { value: "100+", label: "Glossary Terms" },
              { value: "Free", label: "Always & Forever" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-indigo-200/80">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto text-background"
            preserveAspectRatio="none"
          >
            <path
              d="M0 60V20C240 0 480 40 720 30C960 20 1200 0 1440 20V60H0Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </section>

      {/* ===== FEATURE CARDS SECTION ===== */}
      <section className="py-20 sm:py-28 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              What You&apos;ll Find{" "}
              <span className="gradient-text">Here</span>
            </h2>
            <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">
              Everything you need to understand, use, and thrive with artificial
              intelligence — organized and jargon-free.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Link
                key={feature.title}
                href={feature.href}
                className="group relative rounded-2xl bg-card border border-card-border p-8 card-hover"
              >
                {/* Gradient hover glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div className="text-4xl mb-4">{feature.emoji}</div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Learn more
                    <svg
                      className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== AI MODELS PREVIEW ===== */}
      <section className="py-20 sm:py-28 px-6 bg-surface">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Compare the Leading{" "}
              <span className="gradient-text">AI Models</span>
            </h2>
            <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">
              The AI landscape changes fast. We keep track so you don&apos;t
              have to.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {models.map((model) => (
              <div
                key={model.name}
                className="rounded-2xl bg-card border border-card-border p-6 card-hover text-center"
              >
                <div
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${model.color} mb-4`}
                >
                  {model.provider}
                </div>
                <h3 className="text-lg font-bold mb-2">{model.name}</h3>
                <p className="text-sm text-muted">{model.stat}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/models"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-semibold text-white shadow-lg shadow-primary/25 transition hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
            >
              View Full Comparison
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== GETTING STARTED CTA ===== */}
      <section className="py-20 sm:py-28 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              New to AI?{" "}
              <span className="gradient-text">Start Here</span>
            </h2>
            <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">
              Three simple steps to go from curious to confident.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Learn the Basics",
                description:
                  "Understand what AI is, how large language models work, and why it all matters — no technical background needed.",
                href: "/guides/getting-started",
                color: "from-indigo-500 to-violet-500",
              },
              {
                step: "2",
                title: "Try a Tool",
                description:
                  "Take our interactive quiz to discover which AI tools match your needs, then try one out with our guided walkthroughs.",
                href: "/tools/quiz",
                color: "from-emerald-500 to-teal-500",
              },
              {
                step: "3",
                title: "Master Prompting",
                description:
                  "Learn how to write prompts that actually work. Our guide covers techniques used by professionals every day.",
                href: "/guides/prompting",
                color: "from-amber-500 to-orange-500",
              },
            ].map((item) => (
              <Link
                key={item.step}
                href={item.href}
                className="group relative rounded-2xl bg-card border border-card-border p-8 card-hover"
              >
                <div
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${item.color} text-white text-xl font-bold mb-6 shadow-lg`}
                >
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== USE CASES PREVIEW ===== */}
      <section className="py-20 sm:py-28 px-6 bg-surface">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              AI Can Help You{" "}
              <span className="gradient-text">With...</span>
            </h2>
            <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">
              From drafting emails to debugging code — AI has practical
              applications for everyone.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {useCases.map((useCase) => (
              <Link
                key={useCase.label}
                href="/use-cases"
                className="group relative overflow-hidden rounded-2xl bg-card border border-card-border p-6 text-center card-hover"
              >
                {/* Gradient background on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${useCase.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />
                <div className="relative">
                  <div className="text-4xl mb-3">{useCase.emoji}</div>
                  <div className="font-semibold text-sm">
                    {useCase.label}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/use-cases"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-dark transition-colors"
            >
              Explore all use cases
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== NEWSLETTER / CTA SECTION ===== */}
      <section className="py-20 sm:py-28 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-3xl hero-gradient p-10 sm:p-16 text-center">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-emerald-300/15 blur-3xl" />
              <div
                className="absolute inset-0 opacity-[0.05]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, white 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />
            </div>

            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Stay AI Future Ready
              </h2>
              <p className="mt-4 text-lg text-indigo-100/90 max-w-xl mx-auto">
                Get the latest AI model updates, new guides, and practical tips
                delivered to your inbox. No spam, unsubscribe anytime.
              </p>

              <NewsletterForm />

              <p className="mt-4 text-xs text-indigo-200/60">
                Join 5,000+ readers staying ahead of the AI curve.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
