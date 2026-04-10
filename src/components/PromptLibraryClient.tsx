'use client';

import { useState } from 'react';

interface Prompt {
  title: string;
  category: string;
  description: string;
  prompt: string;
  tips?: string;
}

const prompts: Prompt[] = [
  // Writing
  {
    title: 'Blog Post Writer',
    category: 'Writing',
    description: 'Generate a well-structured blog post on any topic.',
    prompt: `Write a blog post about [TOPIC].

Requirements:
- Target audience: [AUDIENCE]
- Tone: [informative/conversational/professional]
- Length: approximately [WORD COUNT] words
- Include an engaging introduction that hooks the reader
- Use H2 and H3 subheadings to organize the content
- Include practical examples or data points
- End with a clear conclusion and call to action

Focus on providing genuine value rather than being generic. Use specific details and actionable advice.`,
    tips: 'Replace the bracketed placeholders with your specifics. The more context you provide, the better the output.',
  },
  {
    title: 'Email Rewriter',
    category: 'Writing',
    description: 'Rewrite an email to be more clear, professional, or persuasive.',
    prompt: `Rewrite the following email to be [more professional / more concise / more persuasive / friendlier].

Keep the core message the same but improve:
- Clarity and readability
- Professional tone
- Logical flow
- Call to action

Original email:
[PASTE YOUR EMAIL HERE]`,
  },
  {
    title: 'Social Media Content',
    category: 'Writing',
    description: 'Create engaging social media posts from a topic or article.',
    prompt: `Create [NUMBER] social media posts about [TOPIC/ARTICLE] for [PLATFORM: Twitter/LinkedIn/Instagram].

Requirements:
- Match the typical tone and format for [PLATFORM]
- Include relevant hashtags
- Each post should have a different angle or hook
- Include a call to action where appropriate
- Keep within character limits for the platform

Topic/source material:
[YOUR CONTENT HERE]`,
  },
  {
    title: 'Proofreader & Editor',
    category: 'Writing',
    description: 'Get detailed editing feedback on your writing.',
    prompt: `Act as an experienced editor. Review the following text and provide:

1. **Corrected version** — Fix all grammar, spelling, and punctuation errors
2. **Style improvements** — Suggest changes for clarity, conciseness, and flow
3. **Strengths** — What works well in the writing
4. **Areas for improvement** — Specific suggestions with examples

Maintain the author's voice and intent. Don't over-edit.

Text to review:
[PASTE YOUR TEXT HERE]`,
  },
  // Coding
  {
    title: 'Code Reviewer',
    category: 'Coding',
    description: 'Get a thorough code review with actionable feedback.',
    prompt: `Review the following [LANGUAGE] code. Analyze it for:

1. **Bugs and errors** — Identify any bugs, edge cases, or potential runtime errors
2. **Performance** — Note any performance concerns or optimization opportunities
3. **Security** — Flag any security vulnerabilities
4. **Readability** — Suggest improvements to naming, structure, and documentation
5. **Best practices** — Note where the code deviates from [LANGUAGE/FRAMEWORK] best practices

Provide specific, actionable suggestions with corrected code examples where relevant.

\`\`\`[LANGUAGE]
[PASTE YOUR CODE HERE]
\`\`\``,
  },
  {
    title: 'Bug Debugger',
    category: 'Coding',
    description: 'Diagnose and fix bugs in your code.',
    prompt: `I have a bug in my [LANGUAGE] code. Help me diagnose and fix it.

**What should happen:** [EXPECTED BEHAVIOR]
**What actually happens:** [ACTUAL BEHAVIOR]
**Error message (if any):** [ERROR MESSAGE]

Here's the relevant code:

\`\`\`[LANGUAGE]
[PASTE YOUR CODE HERE]
\`\`\`

Please:
1. Explain what's causing the bug
2. Provide the corrected code
3. Explain why the fix works`,
  },
  {
    title: 'Function Generator',
    category: 'Coding',
    description: 'Generate a well-written function from a description.',
    prompt: `Write a [LANGUAGE] function that [DESCRIPTION OF WHAT IT SHOULD DO].

Requirements:
- Input: [DESCRIBE INPUTS]
- Output: [DESCRIBE EXPECTED OUTPUT]
- Handle edge cases: [LIST EDGE CASES]
- Include error handling
- Add clear comments explaining the logic
- Follow [LANGUAGE] best practices and conventions

Also provide 3-4 test cases demonstrating the function works correctly.`,
  },
  // Business
  {
    title: 'Meeting Notes Summarizer',
    category: 'Business',
    description: 'Turn messy meeting notes into organized summaries.',
    prompt: `Summarize the following meeting notes into a clear, organized format:

## Meeting Summary
- **Date:** [auto-detect or use today]
- **Key Decisions:** [bullet list]
- **Action Items:** [who, what, by when]
- **Discussion Highlights:** [brief summary of key topics]
- **Open Questions:** [unresolved items]
- **Next Steps:** [what happens next]

Keep it concise but don't miss important details. Flag any action items that seem urgent.

Meeting notes:
[PASTE NOTES HERE]`,
  },
  {
    title: 'Business Email Drafter',
    category: 'Business',
    description: 'Draft professional business emails for any situation.',
    prompt: `Draft a professional email for the following situation:

**Purpose:** [follow-up / introduction / proposal / request / thank you / complaint]
**Recipient:** [their role/relationship]
**Key points to cover:**
- [Point 1]
- [Point 2]
- [Point 3]
**Tone:** [formal / friendly-professional / urgent / apologetic]
**Desired outcome:** [what you want them to do after reading]

Keep it concise and actionable. End with a clear next step.`,
  },
  {
    title: 'SWOT Analysis',
    category: 'Business',
    description: 'Generate a comprehensive SWOT analysis for any business or project.',
    prompt: `Create a detailed SWOT analysis for [BUSINESS/PROJECT/IDEA].

Context:
- Industry: [INDUSTRY]
- Stage: [startup / growing / established]
- Target market: [TARGET MARKET]
- Key competitors: [COMPETITORS]

For each category, provide 4-6 specific, actionable points (not generic statements):

**Strengths** — Internal advantages
**Weaknesses** — Internal disadvantages
**Opportunities** — External possibilities to leverage
**Threats** — External risks to mitigate

After the SWOT, provide 3 strategic recommendations based on the analysis.`,
  },
  // Research
  {
    title: 'Research Summarizer',
    category: 'Research',
    description: 'Summarize articles, papers, or documents into key takeaways.',
    prompt: `Summarize the following text. Provide:

1. **One-sentence summary** — The core message in a single sentence
2. **Key findings/arguments** — 3-5 bullet points covering the main points
3. **Methodology** (if applicable) — How the research was conducted
4. **Limitations** — What the text doesn't address or gets wrong
5. **Implications** — Why this matters and who should care
6. **Questions raised** — What follow-up questions does this create?

Text to summarize:
[PASTE TEXT HERE]`,
  },
  {
    title: 'Concept Explainer',
    category: 'Research',
    description: 'Get a clear explanation of any complex topic.',
    prompt: `Explain [CONCEPT] as if I'm [AUDIENCE LEVEL: a complete beginner / a college student / a professional in a different field].

Structure your explanation as:
1. **One-sentence definition** — What it is in the simplest terms
2. **Analogy** — Relate it to something familiar
3. **How it works** — The key mechanism or process
4. **Why it matters** — Real-world significance
5. **Common misconceptions** — What people often get wrong
6. **Related concepts** — What to learn about next

Avoid jargon unless you define it. Use concrete examples.`,
  },
  // Education
  {
    title: 'Study Guide Creator',
    category: 'Education',
    description: 'Create a comprehensive study guide for any subject.',
    prompt: `Create a study guide for [SUBJECT/TOPIC] at the [high school / undergraduate / graduate] level.

Include:
1. **Key concepts** — The essential ideas you must understand
2. **Important terms** — Vocabulary with clear definitions
3. **Relationships** — How concepts connect to each other
4. **Common exam questions** — 10 practice questions with answers
5. **Memory aids** — Mnemonics, analogies, or tricks to remember key facts
6. **Study tips** — How to approach studying this topic effectively

Focus on understanding over memorization.`,
  },
  {
    title: 'Socratic Tutor',
    category: 'Education',
    description: 'Learn through guided questioning rather than direct answers.',
    prompt: `You are a Socratic tutor helping me learn [SUBJECT]. Instead of giving me direct answers:

1. Ask me guiding questions to help me discover the answer myself
2. When I'm wrong, ask a question that reveals why my thinking is off
3. When I'm right, ask a deeper follow-up question
4. Build on what I already know
5. Give small hints if I'm truly stuck, but prefer questions over answers
6. Celebrate progress and keep the tone encouraging

Start by asking me what I already know about [TOPIC], then guide me from there.`,
  },
  // Productivity
  {
    title: 'Decision Framework',
    category: 'Productivity',
    description: 'Get help making difficult decisions with a structured framework.',
    prompt: `Help me make a decision about [DECISION].

My options are:
1. [Option A]
2. [Option B]
3. [Option C (if applicable)]

For each option, analyze:
- **Pros** — Benefits and advantages
- **Cons** — Risks and disadvantages
- **Assumptions** — What has to be true for this option to work
- **Reversibility** — How easy is it to change course later?
- **Second-order effects** — What happens after the initial impact?

Then provide:
- A comparison matrix scoring each option on the most important factors
- Your recommended option with reasoning
- What additional information would change the recommendation`,
  },
  {
    title: 'Weekly Planner',
    category: 'Productivity',
    description: 'Organize your tasks into an efficient weekly schedule.',
    prompt: `Help me plan my week. Here are my tasks and commitments:

**Must-do (deadlines/appointments):**
[LIST ITEMS]

**Should-do (important but flexible):**
[LIST ITEMS]

**Would-like-to-do (if time permits):**
[LIST ITEMS]

**Constraints:**
- Working hours: [e.g., 9am-5pm]
- Meetings: [list fixed meetings]
- Energy patterns: [e.g., most focused in morning]

Create a day-by-day schedule that:
- Prioritizes must-do items
- Groups similar tasks together
- Includes breaks and buffer time
- Puts high-focus work during peak energy hours
- Is realistic (don't overload any day)`,
  },
];

const categories = ['All', ...Array.from(new Set(prompts.map((p) => p.category)))];

export default function PromptLibraryClient() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const filtered = prompts.filter((p) => {
    const matchCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchSearch =
      search === '' ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.prompt.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  const copyPrompt = async (prompt: string, index: number) => {
    await navigator.clipboard.writeText(prompt);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div>
      {/* Search and filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search prompts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-card border border-card-border rounded-xl text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
          />
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeCategory === cat
                ? 'bg-primary text-white'
                : 'bg-surface text-muted hover:text-foreground hover:bg-surface-dark'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-sm text-muted mb-6">{filtered.length} prompts found</p>

      {/* Prompt cards */}
      <div className="grid gap-6">
        {filtered.map((prompt, index) => (
          <div
            key={prompt.title}
            className="bg-card rounded-2xl border border-card-border p-6 sm:p-8"
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-md">
                  {prompt.category}
                </span>
                <h3 className="text-xl font-bold mt-2">{prompt.title}</h3>
                <p className="text-sm text-muted mt-1">{prompt.description}</p>
              </div>
              <button
                onClick={() => copyPrompt(prompt.prompt, index)}
                className={`shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  copiedIndex === index
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                    : 'bg-primary text-white hover:bg-primary-dark'
                }`}
              >
                {copiedIndex === index ? 'Copied!' : 'Copy'}
              </button>
            </div>

            <div className="bg-surface rounded-xl p-4 overflow-x-auto">
              <pre className="text-sm text-foreground whitespace-pre-wrap font-mono leading-relaxed">
                {prompt.prompt}
              </pre>
            </div>

            {prompt.tips && (
              <p className="mt-3 text-sm text-muted">
                <strong className="text-foreground">Tip:</strong> {prompt.tips}
              </p>
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-xl text-muted">No prompts match your search.</p>
          <button
            onClick={() => {
              setSearch('');
              setActiveCategory('All');
            }}
            className="mt-4 text-primary hover:text-primary-dark transition-colors"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
