import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AI Deep Dives — Understanding AI Beyond the Surface',
  description:
    'Go deeper into how AI works, its safety implications, privacy concerns, ethical considerations, and the open vs closed source debate.',
  keywords: [
    'how AI works',
    'AI safety',
    'AI ethics',
    'AI privacy',
    'open source AI',
    'transformer architecture',
    'AI explained',
    'AI regulation',
  ],
};

const deepDives = [
  {
    slug: 'how-ai-works',
    title: 'How AI Models Actually Work',
    subtitle: 'For the Curious, Not the Technical',
    icon: '⚙️',
    readTime: '15 min',
    content: `
      <h2>The Big Picture</h2>
      <p>At its core, a modern AI language model is a prediction machine. Given some text, it predicts what text should come next. But this simple idea, scaled up to billions of parameters and trained on vast amounts of text, produces something that feels remarkably intelligent.</p>

      <h2>Neural Networks: The Foundation</h2>
      <p>AI models are built on neural networks — mathematical structures loosely inspired by the brain. A neural network is a series of layers, each containing many "neurons" (really just numbers). Data flows through these layers, getting transformed at each step.</p>
      <p>Each connection between neurons has a "weight" — a number that determines how much influence one neuron has on the next. Training an AI model means adjusting millions or billions of these weights until the model produces useful outputs.</p>

      <h2>The Transformer Architecture</h2>
      <p>The breakthrough behind modern AI was the Transformer, introduced by Google researchers in 2017 in a paper titled "Attention Is All You Need." The key innovation is the <strong>attention mechanism</strong>.</p>
      <p>Attention lets the model look at all parts of the input simultaneously and decide which parts are most relevant to each other. When processing the sentence "The cat sat on the mat because it was tired," attention helps the model understand that "it" refers to "the cat," not "the mat."</p>
      <p>This ability to understand relationships across long stretches of text is what makes modern AI so capable at understanding context and generating coherent responses.</p>

      <h2>Training: How Models Learn</h2>
      <p>Training happens in stages:</p>
      <ol>
        <li><strong>Pre-training</strong> — The model reads enormous amounts of text (books, websites, code, academic papers) and learns to predict the next word. This teaches it language, facts, reasoning patterns, and even some common sense. This stage costs millions of dollars in computing resources.</li>
        <li><strong>Fine-tuning</strong> — The pre-trained model is further trained on carefully curated examples of helpful, honest, and harmless conversations. This teaches it to be a useful assistant rather than just a text predictor.</li>
        <li><strong>RLHF (Reinforcement Learning from Human Feedback)</strong> — Human raters evaluate the model's outputs and rank them by quality. This feedback trains the model to prefer responses humans find helpful and to avoid harmful ones.</li>
      </ol>

      <h2>Tokens: How AI Reads Text</h2>
      <p>AI models don't read individual letters or whole words. They break text into "tokens" — chunks that might be whole words, parts of words, or punctuation marks. The word "unbelievable" might be split into "un", "believ", "able". On average, one token is roughly three-quarters of a word.</p>
      <p>This is why AI pricing is measured in tokens, and why "context window" (how much text the model can process at once) is measured in tokens.</p>

      <h2>Why AI "Hallucinates"</h2>
      <p>Because AI models are fundamentally prediction machines, they sometimes generate text that sounds confident but is factually wrong. The model isn't "lying" — it's producing the most statistically likely continuation of the text, which sometimes doesn't correspond to reality.</p>
      <p>This is especially common with specific facts (dates, statistics, quotes) where the model's training data might be sparse or contradictory. It's why you should always verify important facts from AI outputs.</p>

      <h2>The Scale Factor</h2>
      <p>Modern LLMs have billions of parameters (GPT-4 is estimated at over 1 trillion). As models get larger and train on more data, they develop emergent capabilities — abilities that weren't explicitly programmed but arise from the sheer scale of the system. These include reasoning, coding, translation, and creative writing.</p>
    `,
  },
  {
    slug: 'ai-safety',
    title: 'AI Safety and Ethics',
    subtitle: 'What You Should Know',
    icon: '🛡️',
    readTime: '12 min',
    content: `
      <h2>Why AI Safety Matters</h2>
      <p>As AI systems become more capable, ensuring they behave safely and ethically becomes increasingly important. AI safety isn't just about preventing sci-fi doomsday scenarios — it's about practical, real-world concerns that affect people today.</p>

      <h2>Current Safety Concerns</h2>

      <h3>Bias and Fairness</h3>
      <p>AI models learn from human-generated data, which contains human biases. Models can perpetuate or even amplify biases related to race, gender, age, and other factors. This matters especially when AI is used in hiring, lending, healthcare, and criminal justice.</p>
      <p>AI companies work to reduce bias through diverse training data, evaluation benchmarks, and fine-tuning. But no model is perfectly unbiased, and users should be aware of this limitation.</p>

      <h3>Misinformation</h3>
      <p>AI can generate convincing but false text, images, and videos. This creates risks for:</p>
      <ul>
        <li>Fake news and propaganda</li>
        <li>Academic fraud</li>
        <li>Scams and social engineering</li>
        <li>Deepfakes that damage reputations</li>
      </ul>

      <h3>Job Displacement</h3>
      <p>AI automation is changing the job market. While AI creates new roles and makes existing workers more productive, some tasks and jobs will be significantly affected. The transition requires proactive approaches to education, reskilling, and social safety nets.</p>

      <h2>What AI Companies Are Doing</h2>
      <ul>
        <li><strong>Safety testing</strong> — Extensive red-teaming and evaluation before releasing models</li>
        <li><strong>Constitutional AI</strong> — Anthropic's approach to training AI with explicit behavioral principles</li>
        <li><strong>Content filtering</strong> — Preventing generation of harmful content</li>
        <li><strong>Transparency reports</strong> — Publishing information about model capabilities and limitations</li>
        <li><strong>Responsible disclosure</strong> — Coordinating with governments and researchers on safety findings</li>
      </ul>

      <h2>What You Can Do</h2>
      <ul>
        <li><strong>Verify AI outputs</strong> — Don't trust AI blindly, especially for important decisions</li>
        <li><strong>Understand limitations</strong> — Know what AI can and can't do reliably</li>
        <li><strong>Report issues</strong> — Flag problematic outputs to providers</li>
        <li><strong>Stay informed</strong> — The field moves fast; keep learning about developments</li>
        <li><strong>Advocate for responsible use</strong> — Support policies and practices that prioritize safety</li>
      </ul>
    `,
  },
  {
    slug: 'ai-privacy',
    title: 'AI and Your Privacy',
    subtitle: 'What Happens to Your Data',
    icon: '🔒',
    readTime: '10 min',
    content: `
      <h2>The Privacy Question</h2>
      <p>When you type something into an AI chatbot, where does that data go? Can the AI company read your conversations? Will your data be used to train future models? These are important questions, and the answers vary by provider.</p>

      <h2>How Major Providers Handle Your Data</h2>

      <h3>OpenAI (ChatGPT)</h3>
      <ul>
        <li>Free tier: Conversations may be used for model training (you can opt out in settings)</li>
        <li>ChatGPT Go ($8/mo), Plus ($20/mo), Pro ($200/mo): You can opt out of training data use</li>
        <li>Business ($25/user/mo) and Enterprise: Data is never used for training, with additional security controls</li>
        <li>API: Data is NOT used for training by default</li>
      </ul>

      <h3>Anthropic (Claude)</h3>
      <ul>
        <li>Free, Pro ($20/mo), and Max ($100-200/mo) tiers: Conversations are not used for training by default</li>
        <li>API: Data is never used for training</li>
        <li>Team ($25-150/user/mo) and Enterprise: Enhanced data controls</li>
        <li>Anthropic retains conversations for safety monitoring (with limited access)</li>
      </ul>

      <h3>Google (Gemini)</h3>
      <ul>
        <li>Free tier: Conversations may be reviewed and used for improvement</li>
        <li>Gemini Advanced: Similar to free tier but with more controls</li>
        <li>Google AI Studio / Vertex AI: Enterprise-grade data controls</li>
      </ul>

      <h2>Best Practices for AI Privacy</h2>
      <ul>
        <li><strong>Never share sensitive personal information</strong> — Social security numbers, passwords, medical records, or financial details</li>
        <li><strong>Be cautious with proprietary information</strong> — Trade secrets, internal code, unreleased product details</li>
        <li><strong>Use API access for sensitive work</strong> — APIs generally have better data handling policies than consumer products</li>
        <li><strong>Check the privacy policy</strong> — Read the data handling section before using a new AI tool</li>
        <li><strong>Consider local models</strong> — For maximum privacy, run open-source models on your own hardware</li>
        <li><strong>Use enterprise tiers</strong> — If your organization handles sensitive data, invest in enterprise plans with contractual data protections</li>
      </ul>

      <h2>AI and GDPR / Data Protection Laws</h2>
      <p>AI companies operating in the EU must comply with GDPR, which gives users rights including:</p>
      <ul>
        <li>Right to access your data</li>
        <li>Right to delete your data</li>
        <li>Right to opt out of data processing</li>
        <li>Right to data portability</li>
      </ul>
      <p>Similar laws exist in other regions (CCPA in California, LGPD in Brazil, etc.). Check your local data protection laws for your specific rights.</p>
    `,
  },
  {
    slug: 'open-vs-closed',
    title: 'Open Source vs. Closed Source AI',
    subtitle: 'The Great AI Debate',
    icon: '⚖️',
    readTime: '11 min',
    content: `
      <h2>The Landscape</h2>
      <p>The AI world is split between two approaches: closed-source models (GPT-4, Claude, Gemini) where the code and weights are proprietary, and open-source/open-weight models (Llama, Mistral, DeepSeek) where anyone can download, modify, and deploy the model.</p>

      <h2>Closed-Source AI</h2>
      <p><strong>Examples:</strong> GPT-5.4, Claude Opus 4.6, Gemini 3.1 Pro, Grok 4.1</p>

      <h3>Advantages</h3>
      <ul>
        <li><strong>Higher capability ceiling</strong> — The most capable models are still closed-source</li>
        <li><strong>Ease of use</strong> — Just call an API; no infrastructure to manage</li>
        <li><strong>Safety controls</strong> — Extensive safety testing and guardrails</li>
        <li><strong>Regular updates</strong> — Models improve without you doing anything</li>
        <li><strong>Support and SLAs</strong> — Enterprise support available</li>
      </ul>

      <h3>Disadvantages</h3>
      <ul>
        <li><strong>Vendor lock-in</strong> — Your application depends on a third party</li>
        <li><strong>Privacy concerns</strong> — Data must be sent to external servers</li>
        <li><strong>Cost at scale</strong> — Per-token pricing can be expensive for high-volume use</li>
        <li><strong>Limited customization</strong> — You can't modify the model's architecture</li>
        <li><strong>Censorship/restrictions</strong> — Providers control what the model will and won't do</li>
      </ul>

      <h2>Open-Source AI</h2>
      <p><strong>Examples:</strong> Llama 4, DeepSeek V3.2, Mistral 3 (Apache 2.0), Qwen 3.5, Gemma 4</p>

      <h3>Advantages</h3>
      <ul>
        <li><strong>Full control</strong> — Modify, fine-tune, and deploy however you want</li>
        <li><strong>Privacy</strong> — Run entirely on your own infrastructure</li>
        <li><strong>No per-token costs</strong> — Pay only for compute, not per request</li>
        <li><strong>Transparency</strong> — You can inspect how the model works</li>
        <li><strong>Community innovation</strong> — Thousands of fine-tuned variants for specific tasks</li>
        <li><strong>No vendor lock-in</strong> — Switch models or providers freely</li>
      </ul>

      <h3>Disadvantages</h3>
      <ul>
        <li><strong>Capability gap</strong> — Open models are closing the gap but still trail the best closed models</li>
        <li><strong>Infrastructure burden</strong> — You manage hosting, scaling, and maintenance</li>
        <li><strong>Safety responsibility</strong> — Fewer built-in guardrails; you're responsible for safe deployment</li>
        <li><strong>Technical expertise required</strong> — Setup and optimization require ML knowledge</li>
      </ul>

      <h2>The Gap Is Closing</h2>
      <p>In 2023, open-source models were far behind closed-source ones. By 2026, models like Llama 4, DeepSeek V3.2, Qwen 3, and Mistral 3 have dramatically closed the gap. DeepSeek V3.2 performs on par with GPT-5.1 and Gemini 3 Pro on many benchmarks. Qwen has overtaken Llama as the most-downloaded model family on HuggingFace. For many practical applications, open models are now good enough — or even preferred due to privacy and cost advantages.</p>

      <h2>Which Should You Choose?</h2>
      <ul>
        <li><strong>Just getting started?</strong> — Use closed-source (ChatGPT, Claude) for the easiest experience</li>
        <li><strong>Building an app?</strong> — Start with a closed-source API for speed, consider switching to open-source as you scale</li>
        <li><strong>Privacy-critical?</strong> — Open-source, self-hosted is the way to go</li>
        <li><strong>High-volume, cost-sensitive?</strong> — Open-source can be dramatically cheaper at scale</li>
        <li><strong>Need the absolute best quality?</strong> — Closed-source models still have the edge</li>
      </ul>
    `,
  },
  {
    slug: 'ai-regulation',
    title: 'AI Regulation Overview',
    subtitle: 'The Global Policy Landscape',
    icon: '📜',
    readTime: '10 min',
    content: `
      <h2>Why AI Is Being Regulated</h2>
      <p>As AI becomes more powerful and widespread, governments worldwide are creating frameworks to ensure it's developed and used responsibly. The goals include protecting consumers, preventing discrimination, ensuring transparency, and maintaining competitive markets.</p>

      <h2>Key Regulatory Frameworks</h2>

      <h3>EU AI Act (European Union)</h3>
      <p>The world's first comprehensive AI law, which took effect in August 2024 with phased implementation through 2027. Prohibited AI practices enforcement began February 2, 2025. General-purpose AI (GPAI) rules applied from August 2, 2025. Full enforcement for high-risk AI systems arrives August 2, 2026. Fines can reach up to 35 million euros or 7% of global annual turnover. It classifies AI systems by risk level:</p>
      <ul>
        <li><strong>Unacceptable risk</strong> — Banned (e.g., social scoring, real-time biometric surveillance) — enforcement began Feb 2025</li>
        <li><strong>High risk</strong> — Strict requirements (e.g., AI in hiring, healthcare, law enforcement) — full enforcement Aug 2, 2026</li>
        <li><strong>Limited risk</strong> — Transparency obligations (e.g., chatbots must disclose they're AI)</li>
        <li><strong>Minimal risk</strong> — No restrictions (e.g., AI-powered spam filters)</li>
      </ul>

      <h3>United States</h3>
      <p>The U.S. landscape has shifted significantly. The Biden-era AI Executive Order (October 2023) was revoked by the Trump administration in January 2025. A December 2025 executive order pushed federal preemption of state AI laws. Key developments include:</p>
      <ul>
        <li>TAKE IT DOWN Act (May 2025) — the only federal AI-specific statute, targeting non-consensual intimate imagery</li>
        <li>NIST AI Risk Management Framework</li>
        <li>38 states adopted approximately 100 AI-related measures in 2025</li>
        <li>Colorado AI Act taking effect June 30, 2026</li>
        <li>Sector-specific guidance from agencies (FDA, FTC, SEC)</li>
      </ul>

      <h3>Other Global Efforts</h3>
      <ul>
        <li><strong>UK</strong> — Pro-innovation approach with sector-specific regulation</li>
        <li><strong>China</strong> — Regulations on algorithmic recommendations, deepfakes, and generative AI</li>
        <li><strong>Canada</strong> — Proposed AI and Data Act (AIDA)</li>
        <li><strong>G7 Hiroshima AI Process</strong> — International cooperation on AI governance</li>
      </ul>

      <h2>What This Means for You</h2>
      <p>If you're using AI personally, regulations primarily protect your rights. If you're building with AI commercially, you may need to comply with requirements around transparency, risk assessment, and data handling.</p>

      <p><strong>For a comprehensive guide to AI regulation and compliance, visit our sister site <a href="https://airegready.com">AIRegReady.com</a></strong> — the definitive resource for understanding AI regulatory requirements.</p>
    `,
  },
];

export default function DeepDivesPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'AI Deep Dives',
    description:
      'In-depth explorations of how AI works, safety, ethics, privacy, and the open vs closed source debate.',
    url: 'https://ai-future-ready.com/deep-dives',
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
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Deep Dives</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Go beyond the surface. Understand how AI really works, what the risks are, and where
            the technology is headed.
          </p>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {deepDives.map((dive) => (
            <a
              key={dive.slug}
              href={`#${dive.slug}`}
              className="bg-card rounded-xl border border-card-border p-5 card-hover flex items-start gap-3"
            >
              <span className="text-2xl">{dive.icon}</span>
              <div>
                <h3 className="font-semibold text-foreground">{dive.title}</h3>
                <p className="text-sm text-muted">{dive.readTime} read</p>
              </div>
            </a>
          ))}
        </div>

        {/* Articles */}
        <div className="space-y-12">
          {deepDives.map((dive) => (
            <article
              key={dive.slug}
              id={dive.slug}
              className="bg-card rounded-2xl border border-card-border overflow-hidden"
            >
              <div className="p-8 sm:p-10">
                <div className="flex items-start gap-4 mb-6">
                  <span className="text-4xl">{dive.icon}</span>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">{dive.title}</h2>
                    <p className="text-muted mt-1">{dive.subtitle}</p>
                    <p className="text-sm text-muted mt-1">{dive.readTime} read</p>
                  </div>
                </div>
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: dive.content }}
                />
              </div>
            </article>
          ))}
        </div>

        {/* Cross-links */}
        <div className="mt-16 grid sm:grid-cols-2 gap-6">
          <Link
            href="/glossary"
            className="bg-card rounded-xl border border-card-border p-6 card-hover group"
          >
            <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
              AI Glossary
            </h3>
            <p className="text-sm text-muted">
              Look up any AI term in our comprehensive, plain-English glossary.
            </p>
          </Link>
          <Link
            href="/guides/getting-started"
            className="bg-card rounded-xl border border-card-border p-6 card-hover group"
          >
            <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
              Getting Started Guide
            </h3>
            <p className="text-sm text-muted">
              New to AI? Start with our beginner-friendly introduction.
            </p>
          </Link>
        </div>
      </section>
    </>
  );
}
