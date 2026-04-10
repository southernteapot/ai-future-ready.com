import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Prompt Engineering Guide — How to Write Better AI Prompts",
  description:
    "Master prompt engineering from beginner to advanced. Learn zero-shot, few-shot, chain-of-thought, and other techniques to get better results from ChatGPT, Claude, and Gemini.",
  keywords: [
    "prompt engineering",
    "how to write AI prompts",
    "ChatGPT prompts",
    "Claude prompts",
    "prompt techniques",
    "chain of thought prompting",
    "few-shot prompting",
    "AI prompt guide",
    "prompt engineering tutorial",
    "better AI results",
  ],
  openGraph: {
    title: "Prompt Engineering Guide — How to Write Better AI Prompts",
    description:
      "Master prompt engineering from beginner to advanced. Learn proven techniques with real examples to get better results from any AI model.",
    url: "https://ai-future-ready.com/guides/prompting",
    type: "article",
    publishedTime: "2025-01-20T00:00:00.000Z",
    modifiedTime: "2025-06-01T00:00:00.000Z",
    authors: ["AI Future Ready"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prompt Engineering Guide — From Beginner to Advanced",
    description:
      "Learn how to write effective prompts with real examples for ChatGPT, Claude, and Gemini.",
  },
  alternates: {
    canonical: "/guides/prompting",
  },
};

function PromptExample({
  label,
  variant,
  children,
}: {
  label: string;
  variant: "good" | "bad";
  children: React.ReactNode;
}) {
  const borderColor =
    variant === "good" ? "border-success" : "border-danger";
  const bgColor =
    variant === "good" ? "bg-success/5" : "bg-danger/5";
  const labelColor =
    variant === "good" ? "text-success" : "text-danger";
  const icon =
    variant === "good" ? (
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>
    ) : (
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    );

  return (
    <div
      className={`my-4 rounded-xl border-l-4 ${borderColor} ${bgColor} overflow-hidden`}
    >
      <div
        className={`flex items-center gap-2 px-4 py-2 ${labelColor} text-sm font-bold`}
      >
        {icon}
        {label}
      </div>
      <div className="px-4 pb-4">
        <pre className="whitespace-pre-wrap text-sm font-mono leading-relaxed text-muted bg-surface/50 rounded-lg p-4">
          {children}
        </pre>
      </div>
    </div>
  );
}

function TechniqueCard({
  title,
  level,
  children,
}: {
  title: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  children: React.ReactNode;
}) {
  const levelColors = {
    Beginner: "bg-success/10 text-success",
    Intermediate: "bg-accent/10 text-accent-dark",
    Advanced: "bg-primary/10 text-primary",
  };

  return (
    <div className="my-6 rounded-xl border border-card-border bg-card p-6">
      <div className="flex items-center gap-3 mb-3">
        <h3 className="text-lg font-bold">{title}</h3>
        <span
          className={`text-xs font-medium px-2.5 py-1 rounded-full ${levelColors[level]}`}
        >
          {level}
        </span>
      </div>
      <div className="prose prose-sm">{children}</div>
    </div>
  );
}

function TableOfContents() {
  const sections = [
    { id: "what-is-prompt-engineering", label: "What Is Prompt Engineering?" },
    { id: "basic-principles", label: "Basic Prompting Principles" },
    { id: "anatomy-of-a-prompt", label: "The Anatomy of a Good Prompt" },
    { id: "core-techniques", label: "Core Techniques" },
    { id: "system-prompts", label: "System Prompts and Instructions" },
    { id: "advanced-techniques", label: "Advanced Techniques" },
    { id: "common-mistakes", label: "Common Mistakes and How to Fix Them" },
    { id: "tips-by-model", label: "Prompting Tips by Model" },
    { id: "prompt-templates", label: "Prompt Templates for Common Tasks" },
  ];

  return (
    <nav
      aria-label="Table of Contents"
      className="bg-card rounded-xl border border-card-border p-6 mb-10"
    >
      <h2 className="text-sm font-bold uppercase tracking-wider text-muted mb-4">
        In this guide
      </h2>
      <ol className="space-y-2">
        {sections.map((section, i) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className="text-sm text-muted hover:text-primary transition-colors flex items-start gap-2"
            >
              <span className="text-primary font-mono text-xs mt-0.5">
                {String(i + 1).padStart(2, "0")}
              </span>
              {section.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default function PromptingGuidePage() {
  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Write Better AI Prompts",
    description:
      "Learn prompt engineering techniques from beginner to advanced to get better results from AI models like ChatGPT, Claude, and Gemini.",
    step: [
      {
        "@type": "HowToStep",
        name: "Be specific and clear",
        text: "Replace vague requests with detailed instructions. Include context about the audience, format, tone, and purpose of the output you want.",
      },
      {
        "@type": "HowToStep",
        name: "Assign a role",
        text: "Tell the AI to act as a specific expert (e.g., 'You are an experienced copy editor'). This primes the model to generate domain-appropriate responses.",
      },
      {
        "@type": "HowToStep",
        name: "Provide examples (few-shot prompting)",
        text: "Show the AI 2-3 examples of the input-output pattern you want. This is one of the most effective ways to guide AI behavior.",
      },
      {
        "@type": "HowToStep",
        name: "Break down complex tasks",
        text: "Use chain-of-thought prompting by asking the AI to think step by step. This improves accuracy on reasoning, math, and logic problems.",
      },
      {
        "@type": "HowToStep",
        name: "Iterate and refine",
        text: "Treat your first prompt as a draft. Review the output, identify what is missing or wrong, and refine your prompt accordingly.",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />

      {/* Hero */}
      <section className="hero-gradient text-white py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-sm text-indigo-100 mb-4">
              <Link
                href="/guides"
                className="hover:text-white transition-colors"
              >
                Guides
              </Link>
              <span>/</span>
              <span>Prompt Engineering</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold mb-4 leading-tight">
              Prompt Engineering Guide
            </h1>
            <p className="text-lg sm:text-xl text-indigo-100 leading-relaxed">
              How to write prompts that get you exactly what you need from AI.
              From basic principles to advanced techniques, with real examples
              you can copy and adapt.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-indigo-200">
              <span className="flex items-center gap-1.5">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                15 min read
              </span>
              <span className="flex items-center gap-1.5">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
                Beginner to Advanced
              </span>
              <span>Last updated: June 2025</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-[1fr_300px] gap-12">
          {/* Main Article */}
          <article className="prose max-w-none">
            <TableOfContents />

            {/* Section 1 */}
            <section id="what-is-prompt-engineering">
              <h2>What Is Prompt Engineering?</h2>
              <p>
                A &quot;prompt&quot; is the text you type into an AI tool like
                ChatGPT, Claude, or Gemini.{" "}
                <strong>Prompt engineering</strong> is the skill of writing
                prompts that consistently produce useful, accurate, and relevant
                results.
              </p>
              <p>
                Think of it this way: an AI model is like an incredibly
                knowledgeable colleague who is eager to help but takes
                instructions very literally. The more precisely you communicate
                what you want, the better the result you get back.
              </p>
              <p>
                Prompt engineering is not about memorizing magic phrases. It is
                about understanding how AI models interpret your instructions
                and developing a repeatable approach to communicating
                effectively with them. Whether you are writing a quick email or
                building a complex AI workflow, these principles apply.
              </p>
              <p>
                If you are new to AI entirely, read our{" "}
                <Link href="/guides/getting-started">
                  What Is AI? beginner guide
                </Link>{" "}
                first, then come back here.
              </p>
            </section>

            {/* Section 2 */}
            <section id="basic-principles">
              <h2>Basic Prompting Principles</h2>
              <p>
                Before diving into specific techniques, here are the
                fundamental principles that apply to every prompt you will ever
                write:
              </p>

              <h3>1. Be Specific, Not Vague</h3>
              <p>
                The single biggest improvement you can make is being more
                specific. Vague prompts produce generic output. Specific prompts
                produce useful output.
              </p>

              <PromptExample label="Vague prompt" variant="bad">
                Write about dogs.
              </PromptExample>

              <PromptExample label="Specific prompt" variant="good">
                {`Write a 300-word blog post about the top 3 benefits of adopting a senior dog from a shelter. Target audience: families with young children. Tone: warm and encouraging.`}
              </PromptExample>

              <h3>2. Provide Context</h3>
              <p>
                AI does not know your situation unless you tell it. Include
                relevant background information to help the model give you a
                tailored response.
              </p>

              <PromptExample label="No context" variant="bad">
                How should I invest my money?
              </PromptExample>

              <PromptExample label="With context" variant="good">
                {`I'm 30 years old, have $10,000 in savings, no debt, and a stable job earning $75,000/year. I want to start investing for retirement. I have a moderate risk tolerance and prefer a hands-off approach. What investment strategy would you recommend for someone in my situation?`}
              </PromptExample>

              <h3>3. Specify the Format</h3>
              <p>
                Tell the AI exactly how you want the output structured. Do you
                want bullet points? A table? A numbered list? An email? A code
                block? Say so explicitly.
              </p>

              <PromptExample label="Format-aware prompt" variant="good">
                {`Compare the pros and cons of React vs Vue.js for a small team building a dashboard app. Format your response as a markdown table with columns: Feature, React, Vue.js.`}
              </PromptExample>

              <h3>4. Set the Tone and Audience</h3>
              <p>
                The same information can be presented in wildly different ways
                depending on who it is for. Always specify:
              </p>
              <ul>
                <li>
                  <strong>Who is the audience?</strong> (executives, children,
                  developers, customers)
                </li>
                <li>
                  <strong>What tone?</strong> (professional, casual, humorous,
                  academic)
                </li>
                <li>
                  <strong>What level of detail?</strong> (overview, in-depth,
                  executive summary)
                </li>
              </ul>

              <h3>5. Iterate and Refine</h3>
              <p>
                Your first prompt is a starting point, not a final draft. The
                best results come from a conversation:
              </p>
              <ol>
                <li>Write your initial prompt</li>
                <li>Review the output</li>
                <li>
                  Identify what is missing, wrong, or not quite right
                </li>
                <li>Follow up with refinements: &quot;Make it shorter,&quot; &quot;Add more examples,&quot; &quot;Focus more on the cost savings angle&quot;</li>
              </ol>
            </section>

            {/* Section 3 */}
            <section id="anatomy-of-a-prompt">
              <h2>The Anatomy of a Good Prompt</h2>
              <p>
                A well-crafted prompt typically has some or all of these
                components:
              </p>

              <div className="my-8 rounded-xl border border-card-border bg-card overflow-hidden">
                <div className="bg-surface px-6 py-4">
                  <p className="font-bold text-sm">
                    Prompt Structure Template
                  </p>
                </div>
                <div className="p-6 space-y-4 text-sm font-mono">
                  <div>
                    <span className="text-primary font-bold">[Role]</span>{" "}
                    <span className="text-muted">
                      You are an experienced marketing copywriter who specializes
                      in B2B SaaS companies.
                    </span>
                  </div>
                  <div>
                    <span className="text-secondary font-bold">[Task]</span>{" "}
                    <span className="text-muted">
                      Write 3 subject line options for a cold outreach email.
                    </span>
                  </div>
                  <div>
                    <span className="text-accent-dark font-bold">
                      [Context]
                    </span>{" "}
                    <span className="text-muted">
                      The target audience is CTOs at mid-size companies
                      (100-500 employees). We sell a developer productivity
                      platform.
                    </span>
                  </div>
                  <div>
                    <span className="text-success font-bold">[Format]</span>{" "}
                    <span className="text-muted">
                      Format each option as: Subject line | Why it works (1
                      sentence explanation).
                    </span>
                  </div>
                  <div>
                    <span className="text-danger font-bold">
                      [Constraints]
                    </span>{" "}
                    <span className="text-muted">
                      Keep each subject line under 50 characters. No clickbait
                      or spam-sounding language.
                    </span>
                  </div>
                </div>
              </div>

              <p>
                Not every prompt needs all five components. A quick question
                might just need the task. But for any important output, the more
                of these components you include, the better your results will
                be.
              </p>
            </section>

            {/* Section 4 */}
            <section id="core-techniques">
              <h2>Core Prompting Techniques</h2>
              <p>
                These are the essential techniques every prompt engineer should
                know. They are listed roughly in order of complexity.
              </p>

              <TechniqueCard title="Zero-Shot Prompting" level="Beginner">
                <p>
                  This is the simplest approach: you give the AI a task with
                  no examples. You are relying entirely on the model&apos;s
                  training to understand what you want.
                </p>
              </TechniqueCard>

              <PromptExample label="Zero-shot example" variant="good">
                {`Classify the sentiment of this customer review as Positive, Negative, or Neutral:

"The product arrived on time but the packaging was damaged. The item itself works fine though."

Sentiment:`}
              </PromptExample>

              <p>
                Zero-shot works well for straightforward tasks where the AI has
                strong training data. It is less reliable for unusual or
                ambiguous tasks.
              </p>

              <TechniqueCard title="Few-Shot Prompting" level="Beginner">
                <p>
                  You provide 2-3 examples of the input-output pattern you want
                  before giving the AI the actual task. This is one of the{" "}
                  <strong>most powerful and universally useful</strong>{" "}
                  techniques.
                </p>
              </TechniqueCard>

              <PromptExample label="Few-shot example" variant="good">
                {`Classify the sentiment of customer reviews.

Review: "Absolutely love this product! Best purchase I've made all year."
Sentiment: Positive

Review: "Terrible quality. Broke after two days of use."
Sentiment: Negative

Review: "The product arrived on time but the packaging was damaged. The item itself works fine though."
Sentiment:`}
              </PromptExample>

              <p>
                By showing the model examples, you are teaching it exactly what
                format, style, and logic you expect. This dramatically improves
                consistency and accuracy, especially for classification,
                extraction, and formatting tasks.
              </p>

              <TechniqueCard
                title="Chain-of-Thought (CoT) Prompting"
                level="Intermediate"
              >
                <p>
                  Ask the AI to &quot;think step by step&quot; before giving its
                  final answer. This significantly improves accuracy on
                  reasoning, math, and logic problems by forcing the model to
                  show its work.
                </p>
              </TechniqueCard>

              <PromptExample label="Without chain-of-thought" variant="bad">
                {`A store sells apples for $2 each. If I buy 3 apples and pay with a $20 bill, and there's an 8% sales tax, how much change do I get?`}
              </PromptExample>

              <PromptExample label="With chain-of-thought" variant="good">
                {`A store sells apples for $2 each. If I buy 3 apples and pay with a $20 bill, and there's an 8% sales tax, how much change do I get?

Think through this step by step, showing your calculations at each stage before giving the final answer.`}
              </PromptExample>

              <p>
                Chain-of-thought prompting is especially effective for:
              </p>
              <ul>
                <li>Math and arithmetic problems</li>
                <li>Logic puzzles</li>
                <li>Multi-step reasoning tasks</li>
                <li>Debugging code</li>
                <li>Analyzing complex scenarios with multiple variables</li>
              </ul>

              <TechniqueCard title="Role Prompting" level="Beginner">
                <p>
                  Assign the AI a specific role or persona. This primes the
                  model to draw on patterns associated with that expertise,
                  producing more domain-appropriate responses.
                </p>
              </TechniqueCard>

              <PromptExample label="Role prompting example" variant="good">
                {`You are a senior software engineer with 15 years of experience in Python and distributed systems. You value clean, readable code and always consider edge cases.

Review this function and suggest improvements:

def process_data(items):
    result = []
    for i in items:
        if i > 0:
            result.append(i * 2)
    return result`}
              </PromptExample>

              <p>
                Effective roles to try: teacher, editor, critic, consultant,
                interviewer, translator, coach, devil&apos;s advocate. The more
                specific you make the role, the more targeted the output.
              </p>
            </section>

            {/* Section 5 */}
            <section id="system-prompts">
              <h2>System Prompts and Instructions</h2>
              <p>
                Many AI platforms (including the APIs for ChatGPT and Claude)
                support <strong>system prompts</strong> -- special instructions
                set at the beginning of a conversation that guide the AI&apos;s
                behavior throughout the entire interaction.
              </p>
              <p>
                Even in consumer chatbots, you can achieve a similar effect by
                putting your instructions at the start of the conversation:
              </p>

              <PromptExample label="System-style instructions" variant="good">
                {`Instructions for this conversation:
- You are a friendly, patient tutor helping me learn Spanish.
- Always respond with both the Spanish phrase and the English translation.
- Correct my mistakes gently and explain why.
- Use simple vocabulary appropriate for a beginner (A1-A2 level).
- At the end of each response, give me a short practice exercise.

Let's start. How do I say "Where is the nearest restaurant?" in Spanish?`}
              </PromptExample>

              <p>
                System-style instructions are especially useful when you want
                consistent behavior across a long conversation. Some tips:
              </p>
              <ul>
                <li>
                  Put instructions at the <strong>very beginning</strong> of the
                  conversation for maximum effect
                </li>
                <li>
                  Use clear, direct language (do/do not rather than
                  should/could)
                </li>
                <li>
                  Be explicit about what you want <em>and</em> what you do not
                  want
                </li>
                <li>
                  You can restate key instructions mid-conversation if the AI
                  starts drifting
                </li>
              </ul>
            </section>

            {/* Section 6 */}
            <section id="advanced-techniques">
              <h2>Advanced Techniques</h2>
              <p>
                These techniques build on the fundamentals and are useful for
                getting the best results on complex or high-stakes tasks.
              </p>

              <TechniqueCard
                title="Self-Consistency"
                level="Advanced"
              >
                <p>
                  Ask the AI to generate multiple independent answers to the
                  same question, then pick the most common answer or ask it to
                  synthesize the best response. This reduces the chance of
                  getting a random incorrect output.
                </p>
              </TechniqueCard>

              <PromptExample label="Self-consistency example" variant="good">
                {`I need to decide whether to lease or buy a car. Here are my details:
- Annual mileage: ~12,000 miles
- Budget: $500/month max
- I keep cars for 5-7 years
- Good credit score (740)

Generate 3 independent analyses of whether I should lease or buy, considering different angles (financial, practical, long-term value). Then synthesize these into a final recommendation with your confidence level.`}
              </PromptExample>

              <TechniqueCard
                title="Tree-of-Thought (ToT)"
                level="Advanced"
              >
                <p>
                  An extension of chain-of-thought where the AI explores
                  multiple reasoning paths, evaluates each one, and selects the
                  most promising approach. Useful for complex problems with
                  multiple possible solution paths.
                </p>
              </TechniqueCard>

              <PromptExample label="Tree-of-thought example" variant="good">
                {`I want to increase our SaaS product's free-to-paid conversion rate (currently 2.1%).

Explore 3 different strategic approaches to solve this problem. For each approach:
1. Describe the strategy
2. List specific tactics
3. Assess likely impact (high/medium/low)
4. Identify risks or downsides

After exploring all 3, recommend which approach (or combination) you'd prioritize and explain why.`}
              </PromptExample>

              <TechniqueCard
                title="ReAct (Reasoning + Acting)"
                level="Advanced"
              >
                <p>
                  A prompting pattern where you ask the AI to alternate between
                  thinking (reasoning about what to do) and acting (taking a
                  step). This is the pattern behind AI agents and tool-using
                  systems.
                </p>
              </TechniqueCard>

              <PromptExample label="ReAct-style example" variant="good">
                {`Help me debug why our website's contact form isn't sending emails. Work through this methodically.

For each step:
- THOUGHT: What could be causing this issue? What should I check next?
- ACTION: What specific thing should I do or check?
- OBSERVATION: [I'll tell you what I find]

Then repeat until we've identified and fixed the issue. Start with your first thought.`}
              </PromptExample>

              <TechniqueCard
                title="Constraint-Based Prompting"
                level="Intermediate"
              >
                <p>
                  Explicitly list what the AI should and should not do. This is
                  especially useful for avoiding common failure modes like
                  verbosity, off-topic tangents, or hallucinated information.
                </p>
              </TechniqueCard>

              <PromptExample label="Constraint-based example" variant="good">
                {`Explain how HTTPS encryption works.

Constraints:
- Use a metaphor that a 12-year-old could understand
- Keep it under 150 words
- Do NOT mention specific algorithms or cipher suites
- Do NOT use the words "key exchange" or "handshake"
- End with a one-sentence summary`}
              </PromptExample>
            </section>

            {/* Section 7 */}
            <section id="common-mistakes">
              <h2>Common Mistakes and How to Fix Them</h2>

              <div className="my-8 space-y-6">
                <div className="rounded-xl border border-card-border bg-card p-6">
                  <h3 className="font-bold mb-2">
                    Mistake: Being too vague
                  </h3>
                  <p className="text-muted text-sm mb-3">
                    &quot;Write me a marketing email&quot; gives the AI almost
                    nothing to work with.
                  </p>
                  <p className="text-sm">
                    <strong className="text-success">Fix:</strong> Include the
                    product, audience, goal, tone, length, and call-to-action.
                    The more detail, the better.
                  </p>
                </div>

                <div className="rounded-xl border border-card-border bg-card p-6">
                  <h3 className="font-bold mb-2">
                    Mistake: Asking multiple unrelated things at once
                  </h3>
                  <p className="text-muted text-sm mb-3">
                    &quot;Write a blog post, also create a social media calendar
                    for next month, and analyze our competitor&apos;s
                    pricing&quot; -- this overwhelms the model.
                  </p>
                  <p className="text-sm">
                    <strong className="text-success">Fix:</strong> Break complex
                    requests into separate prompts. One task per prompt
                    generally produces better results.
                  </p>
                </div>

                <div className="rounded-xl border border-card-border bg-card p-6">
                  <h3 className="font-bold mb-2">
                    Mistake: Not specifying the output format
                  </h3>
                  <p className="text-muted text-sm mb-3">
                    Without format instructions, the AI guesses what you want
                    and often produces long, essay-style responses when you
                    wanted bullet points.
                  </p>
                  <p className="text-sm">
                    <strong className="text-success">Fix:</strong> Always state
                    the desired format: &quot;Respond with a bulleted list,&quot;
                    &quot;Format as a table,&quot; &quot;Give me a one-paragraph
                    summary.&quot;
                  </p>
                </div>

                <div className="rounded-xl border border-card-border bg-card p-6">
                  <h3 className="font-bold mb-2">
                    Mistake: Accepting the first output
                  </h3>
                  <p className="text-muted text-sm mb-3">
                    The first response is almost never perfect. Treating it as
                    final means you are leaving quality on the table.
                  </p>
                  <p className="text-sm">
                    <strong className="text-success">Fix:</strong> Always do at
                    least one round of refinement. Ask the AI to improve weak
                    areas, add missing details, or try a different angle.
                  </p>
                </div>

                <div className="rounded-xl border border-card-border bg-card p-6">
                  <h3 className="font-bold mb-2">
                    Mistake: Trusting AI output without verification
                  </h3>
                  <p className="text-muted text-sm mb-3">
                    AI can confidently state incorrect facts, invent fake
                    sources, and produce plausible-sounding nonsense.
                  </p>
                  <p className="text-sm">
                    <strong className="text-success">Fix:</strong> Always
                    fact-check specific claims, statistics, quotes, and
                    citations. Use AI output as a starting draft, not a final
                    source of truth. Check our{" "}
                    <Link href="/glossary" className="text-primary underline">
                      glossary entry on hallucinations
                    </Link>{" "}
                    for more on this.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 8 */}
            <section id="tips-by-model">
              <h2>Prompting Tips by Model</h2>
              <p>
                While the core principles work across all models, each AI has
                slight differences in how it responds. Here are some
                model-specific tips:
              </p>

              <h3>OpenAI GPT-5.4 / ChatGPT</h3>
              <ul>
                <li>
                  GPT-5.4 responds well to{" "}
                  <strong>detailed system prompts</strong> and follows
                  formatting instructions closely
                </li>
                <li>
                  Tends to be verbose by default -- explicitly ask for concise
                  responses if you want them
                </li>
                <li>
                  Excellent with <strong>structured output</strong> (JSON,
                  tables, code blocks) when you specify the format
                </li>
                <li>
                  The &quot;Custom Instructions&quot; feature in ChatGPT lets
                  you set persistent preferences that apply to all
                  conversations
                </li>
                <li>
                  For complex reasoning, use <strong>GPT-5.4 Thinking</strong>{" "}
                  mode which has built-in chain-of-thought reasoning for math,
                  science, and hard problems
                </li>
                <li>
                  With a 1M token context window, you can now feed entire
                  codebases or long documents in a single prompt
                </li>
              </ul>

              <h3>Anthropic Claude (Opus 4.6 / Sonnet 4.6)</h3>
              <ul>
                <li>
                  Claude excels at{" "}
                  <strong>long, nuanced instructions</strong> -- it handles
                  complex multi-part prompts very well
                </li>
                <li>
                  Particularly strong at following{" "}
                  <strong>constraint-based prompts</strong> (&quot;do this but
                  not that&quot;)
                </li>
                <li>
                  Has a massive 1M token context window across all tiers, so
                  you can paste entire documents and codebases
                </li>
                <li>
                  Claude tends to be more measured and less likely to
                  confidently state incorrect information
                </li>
                <li>
                  Works well with <strong>XML-style tags</strong> in prompts
                  (e.g., <code>&lt;instructions&gt;</code>,{" "}
                  <code>&lt;context&gt;</code>) for clearly separating
                  different parts of your prompt
                </li>
                <li>
                  Opus 4.6 leads on coding benchmarks (80.8% SWE-bench) --
                  ideal for complex coding and agentic tasks
                </li>
              </ul>

              <h3>Google Gemini 3.1 Pro</h3>
              <ul>
                <li>
                  Gemini has <strong>built-in web access</strong>, making it
                  excellent for research and current events
                </li>
                <li>
                  Strong <strong>multimodal capabilities</strong> -- natively
                  processes text, images, video, and audio in a single prompt
                </li>
                <li>
                  Integrates deeply with Google Workspace (Docs, Sheets,
                  Gmail), so prompts can reference your existing documents
                </li>
                <li>
                  For factual queries, it often provides source links (since it
                  can search the web), which makes verification easier
                </li>
                <li>
                  May default to shorter responses; ask for detailed or
                  comprehensive output explicitly
                </li>
              </ul>

              <h3>Open-Source Models (Llama 4, Gemma 4, DeepSeek, Qwen)</h3>
              <ul>
                <li>
                  Open-source models now rival proprietary ones on many tasks --
                  <strong>Llama 4 Maverick</strong> scored #2 on LMArena
                </li>
                <li>
                  <strong>Gemma 4</strong> from Google runs on phones to
                  workstations and is excellent for local/private use
                </li>
                <li>
                  <strong>DeepSeek R1</strong> is great for math and reasoning
                  but less polished on creative writing -- be explicit about
                  the style you want
                </li>
                <li>
                  <strong>Qwen 3.5</strong> supports 201 languages and excels
                  at multilingual tasks -- specify the output language clearly
                </li>
                <li>
                  When self-hosting, quantized models (Q4/Q5) are slightly less
                  capable -- use more explicit prompts and verify outputs for
                  critical tasks
                </li>
              </ul>

              <h3>xAI Grok 4.20</h3>
              <ul>
                <li>
                  Grok has the <strong>lowest hallucination rate</strong> of any
                  model -- ideal for factual, accuracy-critical tasks
                </li>
                <li>
                  Has real-time access to X/Twitter data, making it strong for
                  current events and social media analysis
                </li>
                <li>
                  The multi-agent mode can tackle complex research tasks by
                  coordinating parallel workflows
                </li>
                <li>
                  #1 on instruction following (IFBench) -- it sticks closely to
                  what you ask for
                </li>
              </ul>

              <p>
                For a detailed comparison of all 33+ models&apos; capabilities,
                pricing, and hardware requirements, see our{" "}
                <Link href="/models">AI Model Comparison</Link> page.
              </p>
            </section>

            {/* Section 9 */}
            <section id="prompt-templates">
              <h2>Prompt Templates for Common Tasks</h2>
              <p>
                Here are ready-to-use templates you can adapt for your own
                needs. Copy them, fill in the bracketed sections, and you are
                good to go.
              </p>

              <h3>Email Writing</h3>
              <PromptExample label="Template" variant="good">
                {`Write a [type: professional/casual/formal] email to [recipient].

Purpose: [what you want to achieve]
Key points to cover:
- [point 1]
- [point 2]
- [point 3]

Tone: [friendly/direct/persuasive/apologetic]
Length: [short (2-3 sentences) / medium (1 paragraph) / detailed]
Call to action: [what you want the recipient to do next]`}
              </PromptExample>

              <h3>Content Summarization</h3>
              <PromptExample label="Template" variant="good">
                {`Summarize the following [document/article/report] in [number] bullet points.

Focus on: [key themes or questions you care about]
Audience: [who will read the summary]
Include: [any specific details you need, e.g., statistics, action items, deadlines]
Exclude: [anything you want left out]

[Paste the content here]`}
              </PromptExample>

              <h3>Code Review</h3>
              <PromptExample label="Template" variant="good">
                {`Review this [language] code for:
1. Bugs or logical errors
2. Performance issues
3. Security vulnerabilities
4. Readability improvements
5. Best practice violations

For each issue found, explain:
- What the problem is
- Why it matters
- How to fix it (with corrected code)

[Paste your code here]`}
              </PromptExample>

              <h3>Learning / Explaining Concepts</h3>
              <PromptExample label="Template" variant="good">
                {`Explain [concept] to me as if I'm [level: a complete beginner / an intermediate learner / a professional in a related field].

Use:
- A real-world analogy
- One concrete example
- No jargon (or define any technical terms you use)

Then give me 3 follow-up questions I should explore to deepen my understanding.`}
              </PromptExample>

              <h3>Decision Making</h3>
              <PromptExample label="Template" variant="good">
                {`Help me decide between [Option A] and [Option B].

Context: [your situation, constraints, and goals]

For each option, analyze:
1. Pros (at least 3)
2. Cons (at least 3)
3. Best-case scenario
4. Worst-case scenario
5. Who this option is best suited for

Then give me your recommendation with a confidence level (high/medium/low) and explain your reasoning.`}
              </PromptExample>

              <p>
                For many more templates organized by category, visit our{" "}
                <Link href="/tools/prompts">Prompt Library</Link>.
              </p>
            </section>

            {/* Next Steps */}
            <section className="mt-12 pt-8 border-t border-card-border">
              <h2>What to Read Next</h2>
              <p>
                You now have a solid foundation in prompt engineering. Here are
                some next steps:
              </p>
              <div className="not-prose grid sm:grid-cols-2 gap-4 mt-6">
                <Link
                  href="/tools/prompts"
                  className="group block p-5 rounded-xl border border-card-border bg-card card-hover"
                >
                  <p className="text-sm font-medium text-primary mb-1">
                    Practice
                  </p>
                  <p className="font-bold group-hover:text-primary transition-colors">
                    Prompt Library
                  </p>
                  <p className="text-sm text-muted mt-1">
                    Browse and copy ready-made prompts for writing, coding,
                    analysis, and more.
                  </p>
                </Link>
                <Link
                  href="/models"
                  className="group block p-5 rounded-xl border border-card-border bg-card card-hover"
                >
                  <p className="text-sm font-medium text-secondary mb-1">
                    Explore
                  </p>
                  <p className="font-bold group-hover:text-primary transition-colors">
                    Compare AI Models
                  </p>
                  <p className="text-sm text-muted mt-1">
                    Find the right model for your tasks with our detailed
                    comparison.
                  </p>
                </Link>
                <Link
                  href="/guides/getting-started"
                  className="group block p-5 rounded-xl border border-card-border bg-card card-hover"
                >
                  <p className="text-sm font-medium text-accent-dark mb-1">
                    Foundations
                  </p>
                  <p className="font-bold group-hover:text-primary transition-colors">
                    What Is AI?
                  </p>
                  <p className="text-sm text-muted mt-1">
                    Go back to basics with our complete beginner&apos;s guide.
                  </p>
                </Link>
                <Link
                  href="/glossary"
                  className="group block p-5 rounded-xl border border-card-border bg-card card-hover"
                >
                  <p className="text-sm font-medium text-success mb-1">
                    Reference
                  </p>
                  <p className="font-bold group-hover:text-primary transition-colors">
                    AI Glossary
                  </p>
                  <p className="text-sm text-muted mt-1">
                    Look up any AI term you encounter in plain English.
                  </p>
                </Link>
              </div>
            </section>
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              {/* Quick Reference Card */}
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
                <h3 className="font-bold text-sm mb-3 text-primary">
                  Quick Reference
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-semibold mb-1">The 5 Prompt Components</p>
                    <ol className="space-y-1 text-muted">
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-mono shrink-0">1.</span>
                        Role -- Who should the AI be?
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-mono shrink-0">2.</span>
                        Task -- What should it do?
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-mono shrink-0">3.</span>
                        Context -- What background info?
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-mono shrink-0">4.</span>
                        Format -- How should it look?
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-mono shrink-0">5.</span>
                        Constraints -- What limits apply?
                      </li>
                    </ol>
                  </div>
                </div>
              </div>

              {/* Technique Cheat Sheet */}
              <div className="rounded-xl border border-card-border bg-card p-5">
                <h3 className="font-bold text-sm mb-4">Technique Cheat Sheet</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-semibold text-primary">Zero-shot</p>
                    <p className="text-muted">
                      Just ask. No examples needed.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-primary">Few-shot</p>
                    <p className="text-muted">
                      Show 2-3 examples first.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-primary">Chain-of-thought</p>
                    <p className="text-muted">
                      &quot;Think step by step.&quot;
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-primary">Role prompting</p>
                    <p className="text-muted">
                      &quot;You are a [expert]...&quot;
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-primary">Self-consistency</p>
                    <p className="text-muted">
                      Generate multiple answers, pick best.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-primary">Tree-of-thought</p>
                    <p className="text-muted">
                      Explore multiple reasoning paths.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-primary">ReAct</p>
                    <p className="text-muted">
                      Think, act, observe, repeat.
                    </p>
                  </div>
                </div>
              </div>

              {/* Related Links */}
              <div className="rounded-xl border border-card-border bg-card p-5">
                <h3 className="font-bold text-sm mb-4">Related Resources</h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/tools/prompts"
                      className="text-sm text-muted hover:text-primary transition-colors flex items-center gap-2"
                    >
                      <svg
                        className="w-4 h-4 shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                      Prompt Library
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/models"
                      className="text-sm text-muted hover:text-primary transition-colors flex items-center gap-2"
                    >
                      <svg
                        className="w-4 h-4 shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                      Compare AI Models
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/glossary"
                      className="text-sm text-muted hover:text-primary transition-colors flex items-center gap-2"
                    >
                      <svg
                        className="w-4 h-4 shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                      AI Glossary
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/guides/getting-started"
                      className="text-sm text-muted hover:text-primary transition-colors flex items-center gap-2"
                    >
                      <svg
                        className="w-4 h-4 shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                      What Is AI? Guide
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
