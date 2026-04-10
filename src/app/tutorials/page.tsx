import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AI Tutorials — Step-by-Step Guides to Building with AI',
  description:
    'Hands-on tutorials for building with AI. Learn to create custom GPTs, use AI APIs, set up local models, build automation workflows, and develop AI agents.',
  keywords: [
    'AI tutorials',
    'build with AI',
    'custom GPT',
    'AI API tutorial',
    'local AI models',
    'AI automation',
    'AI agents',
    'no-code AI',
  ],
};

const tutorials = [
  {
    slug: 'custom-gpts',
    title: 'Building Custom GPTs and AI Assistants',
    description:
      'Learn how to create specialized AI assistants tailored to your needs using ChatGPT\'s Custom GPTs, Claude Projects, and Gemini Gems.',
    difficulty: 'Beginner',
    timeToRead: '12 min',
    icon: '🤖',
    topics: ['Custom GPTs', 'Claude Projects', 'Gemini Gems', 'System prompts'],
    content: `
      <h2>What Are Custom GPTs?</h2>
      <p>Custom GPTs are specialized AI assistants that you configure with specific instructions, knowledge, and capabilities. Instead of starting every conversation from scratch, you create a persistent assistant that already understands your context and preferences.</p>
      <p>All major AI providers now offer this capability: OpenAI calls them Custom GPTs, Anthropic offers Claude Projects, and Google has Gemini Gems.</p>

      <h2>Why Build a Custom Assistant?</h2>
      <ul>
        <li><strong>Consistency</strong> — Your assistant follows the same rules every time</li>
        <li><strong>Efficiency</strong> — No need to repeat context or instructions</li>
        <li><strong>Specialization</strong> — Tailored to your specific domain or workflow</li>
        <li><strong>Knowledge</strong> — Upload documents for the assistant to reference</li>
      </ul>

      <h2>Building a Custom GPT (OpenAI)</h2>
      <h3>Step 1: Access the GPT Builder</h3>
      <p>In ChatGPT, click your name in the sidebar, then "My GPTs" and "Create a GPT." You'll see a split screen with a builder on the left and a preview on the right.</p>

      <h3>Step 2: Define Your GPT's Purpose</h3>
      <p>Write clear instructions about what your GPT does. Be specific about its role, tone, and behavior. For example:</p>
      <blockquote>"You are a technical writing assistant. You help users write clear, concise documentation. You use active voice, avoid jargon unless necessary, and always suggest improvements for clarity."</blockquote>

      <h3>Step 3: Add Knowledge</h3>
      <p>Upload files that your GPT can reference — style guides, product documentation, examples of good writing, or any domain-specific information.</p>

      <h3>Step 4: Configure Capabilities</h3>
      <p>Choose whether your GPT can browse the web, generate images with DALL-E, or run code. Only enable what's needed for your use case.</p>

      <h3>Step 5: Test and Iterate</h3>
      <p>Use the preview pane to test your GPT. Try different prompts, look for gaps, and refine the instructions until it behaves as expected.</p>

      <h2>Building a Claude Project (Anthropic)</h2>
      <p>Claude's Projects feature lets you create a persistent workspace with custom instructions and uploaded knowledge:</p>
      <ol>
        <li>Go to claude.ai and click "Projects" in the sidebar</li>
        <li>Click "Create Project" and give it a name and description</li>
        <li>Add custom instructions that Claude will follow in every conversation within the project</li>
        <li>Upload reference documents (up to 200K tokens of context)</li>
        <li>Start conversations within the project — Claude will have your instructions and documents as context</li>
      </ol>

      <h2>Best Practices for Custom Assistants</h2>
      <ul>
        <li><strong>Be specific in your instructions</strong> — "Write in a friendly tone" is vague; "Write like you're explaining to a smart colleague over coffee" is better</li>
        <li><strong>Include examples</strong> — Show what good output looks like</li>
        <li><strong>Define boundaries</strong> — Tell it what NOT to do as well as what to do</li>
        <li><strong>Test edge cases</strong> — Try unusual inputs to see how it responds</li>
        <li><strong>Iterate regularly</strong> — Update instructions as you learn what works</li>
      </ul>
    `,
  },
  {
    slug: 'ai-apis',
    title: 'Using AI APIs: From No-Code to Code',
    description:
      'A practical guide to integrating AI into your applications. Covers no-code platforms, REST APIs, and official SDKs from OpenAI, Anthropic, and Google.',
    difficulty: 'Intermediate',
    timeToRead: '15 min',
    icon: '⚡',
    topics: ['REST APIs', 'Python SDK', 'JavaScript SDK', 'No-code tools', 'API keys'],
    content: `
      <h2>What Are AI APIs?</h2>
      <p>AI APIs let you integrate AI capabilities directly into your own applications, websites, and workflows. Instead of using ChatGPT or Claude through their web interfaces, you send requests programmatically and get responses back.</p>

      <h2>No-Code Approaches</h2>
      <p>You don't need to write code to use AI APIs. Several platforms make it easy:</p>
      <ul>
        <li><strong>Zapier</strong> — Connect AI to 6,000+ apps with if-then automations</li>
        <li><strong>Make (Integromat)</strong> — Visual workflow builder with AI modules</li>
        <li><strong>n8n</strong> — Open-source automation with AI nodes</li>
        <li><strong>Bubble</strong> — Build web apps with AI via plugins</li>
      </ul>

      <h2>Getting Started with the OpenAI API</h2>
      <h3>Step 1: Get Your API Key</h3>
      <p>Sign up at platform.openai.com, go to API Keys, and create a new key. Store it securely — never commit it to version control or expose it in client-side code.</p>

      <h3>Step 2: Make Your First Request (Python)</h3>
      <pre><code>from openai import OpenAI

client = OpenAI()  # Uses OPENAI_API_KEY env variable

response = client.chat.completions.create(
    model="gpt-5.4",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Explain quantum computing in simple terms."}
    ]
)

print(response.choices[0].message.content)</code></pre>

      <h2>Using the Anthropic API</h2>
      <pre><code>import anthropic

client = anthropic.Anthropic()  # Uses ANTHROPIC_API_KEY env variable

message = client.messages.create(
    model="claude-sonnet-4-6-latest",
    max_tokens=1024,
    messages=[
        {"role": "user", "content": "Explain quantum computing in simple terms."}
    ]
)

print(message.content[0].text)</code></pre>

      <h2>Using the Google Gemini API</h2>
      <pre><code>import google.generativeai as genai

genai.configure()  # Uses GOOGLE_API_KEY env variable
model = genai.GenerativeModel("gemini-3.1-pro")

response = model.generate_content("Explain quantum computing in simple terms.")
print(response.text)</code></pre>

      <h2>Key Concepts</h2>
      <ul>
        <li><strong>Tokens</strong> — AI models process text in chunks called tokens. Roughly 1 token = 0.75 words. You're billed per token.</li>
        <li><strong>Temperature</strong> — Controls randomness. 0 = deterministic, 1 = creative. Use 0-0.3 for factual tasks, 0.7-1.0 for creative tasks.</li>
        <li><strong>Max Tokens</strong> — Limits the response length. Set this to control costs and response size.</li>
        <li><strong>System Prompts</strong> — Instructions that set the AI's behavior. The foundation of custom behavior.</li>
        <li><strong>Streaming</strong> — Get responses token-by-token instead of waiting for the full response. Better UX for users.</li>
      </ul>

      <h2>Cost Management Tips</h2>
      <ul>
        <li>Use the smallest model that meets your quality needs</li>
        <li>Set max_tokens to limit response length</li>
        <li>Cache frequent responses when possible</li>
        <li>Monitor usage with the provider's dashboard</li>
        <li>Set spending limits to avoid surprises</li>
      </ul>
    `,
  },
  {
    slug: 'local-models',
    title: 'Running AI Models Locally',
    description:
      'Set up and run open-source AI models on your own hardware. Covers Ollama, llama.cpp, and HuggingFace for private, offline AI.',
    difficulty: 'Intermediate',
    timeToRead: '14 min',
    icon: '💻',
    topics: ['Ollama', 'llama.cpp', 'HuggingFace', 'Quantization', 'Hardware requirements'],
    content: `
      <h2>Why Run AI Locally?</h2>
      <ul>
        <li><strong>Privacy</strong> — Your data never leaves your machine</li>
        <li><strong>No costs</strong> — No per-token API fees after initial setup</li>
        <li><strong>Offline access</strong> — Works without internet</li>
        <li><strong>Customization</strong> — Full control over the model and its behavior</li>
        <li><strong>Learning</strong> — Understand how AI models actually work</li>
      </ul>

      <h2>Hardware Requirements</h2>
      <p>The hardware you need depends on the model size:</p>
      <ul>
        <li><strong>7B parameter models</strong> — 8GB RAM, any modern CPU (or 6GB VRAM GPU)</li>
        <li><strong>13B parameter models</strong> — 16GB RAM (or 10GB VRAM GPU)</li>
        <li><strong>34B parameter models</strong> — 32GB RAM (or 24GB VRAM GPU)</li>
        <li><strong>70B+ parameter models</strong> — 64GB+ RAM (or multiple GPUs)</li>
      </ul>
      <p>GPU acceleration (NVIDIA CUDA or Apple Metal) dramatically improves speed but isn't required.</p>

      <h2>Method 1: Ollama (Easiest)</h2>
      <p>Ollama is the simplest way to run LLMs locally. It handles downloading, configuring, and running models in one tool.</p>
      <h3>Installation</h3>
      <pre><code># macOS or Linux
curl -fsSL https://ollama.com/install.sh | sh

# Or download from ollama.com for Windows/macOS</code></pre>

      <h3>Running Your First Model</h3>
      <pre><code># Download and run Llama 3.1 8B
ollama run llama3.1

# Try other models
ollama run mistral
ollama run gemma2
ollama run phi3</code></pre>

      <h3>Using Ollama as an API</h3>
      <p>Ollama runs a local API server compatible with the OpenAI API format:</p>
      <pre><code>curl http://localhost:11434/api/chat -d '{
  "model": "llama3.1",
  "messages": [{"role": "user", "content": "Hello!"}]
}'</code></pre>

      <h2>Method 2: HuggingFace Transformers</h2>
      <p>For more control, use HuggingFace's transformers library directly:</p>
      <pre><code>from transformers import pipeline

generator = pipeline("text-generation", model="meta-llama/Llama-3.1-8B-Instruct")
response = generator("Explain photosynthesis:", max_length=200)
print(response[0]["generated_text"])</code></pre>

      <h2>Quantization: Running Bigger Models</h2>
      <p>Quantization reduces model precision (e.g., from 16-bit to 4-bit), dramatically reducing memory requirements with minimal quality loss. A 70B model that normally needs 140GB of memory can run in ~40GB with 4-bit quantization.</p>
      <p>Ollama handles quantization automatically. For manual control, look into GGUF format models on HuggingFace.</p>

      <h2>Recommended Models for Local Use</h2>
      <ul>
        <li><strong>Gemma 4 E4B</strong> — Google's latest open model, runs on phones, Apache 2.0</li>
        <li><strong>Nemotron-Cascade 2</strong> — NVIDIA's 30B MoE (3B active), gold-medal math/coding, fits on RTX 4090</li>
        <li><strong>Mistral Small 4</strong> — 119B MoE with only 6.5B active, multimodal, Apache 2.0</li>
        <li><strong>Phi-4 14B</strong> — Microsoft's small-but-capable model, MIT license</li>
        <li><strong>Qwen 3.5</strong> — 201 languages, most-downloaded family on HuggingFace, Apache 2.0</li>
      </ul>
    `,
  },
  {
    slug: 'automation',
    title: 'AI Automation Workflows',
    description:
      'Build powerful automations that combine AI with your existing tools. Learn to automate email, content, data processing, and more.',
    difficulty: 'Intermediate',
    timeToRead: '13 min',
    icon: '🔄',
    topics: ['Zapier', 'Make', 'n8n', 'Workflow design', 'Email automation'],
    content: `
      <h2>What Is AI Automation?</h2>
      <p>AI automation connects AI models to your existing tools and workflows, handling repetitive tasks automatically. Instead of manually copying text into ChatGPT, processing the output, and pasting it somewhere else, you set up a workflow that does this automatically.</p>

      <h2>Popular Automation Platforms</h2>
      <h3>Zapier</h3>
      <p>The most popular no-code automation platform. Create "Zaps" that trigger actions across 6,000+ apps. Built-in AI features include:</p>
      <ul>
        <li>Direct ChatGPT and Claude integrations</li>
        <li>AI-powered text formatting and extraction</li>
        <li>Natural language workflow creation</li>
      </ul>

      <h3>Make (formerly Integromat)</h3>
      <p>A visual workflow builder with more complex logic capabilities than Zapier. Better for multi-step workflows with branching and error handling.</p>

      <h3>n8n</h3>
      <p>An open-source alternative you can self-host. Great for developers who want full control and don't want per-execution pricing.</p>

      <h2>Example Workflows</h2>

      <h3>1. Automated Email Summarizer</h3>
      <ol>
        <li><strong>Trigger:</strong> New email arrives in Gmail</li>
        <li><strong>AI Step:</strong> Send email content to Claude with prompt: "Summarize this email in 2-3 bullet points. Flag if any action is required."</li>
        <li><strong>Action:</strong> Send summary to Slack channel or create a task in Todoist</li>
      </ol>

      <h3>2. Content Repurposer</h3>
      <ol>
        <li><strong>Trigger:</strong> New blog post published (RSS feed or CMS webhook)</li>
        <li><strong>AI Step 1:</strong> Generate 5 social media posts from the article</li>
        <li><strong>AI Step 2:</strong> Create an email newsletter summary</li>
        <li><strong>Action:</strong> Schedule social posts via Buffer, draft email in Mailchimp</li>
      </ol>

      <h3>3. Customer Support Triage</h3>
      <ol>
        <li><strong>Trigger:</strong> New support ticket submitted</li>
        <li><strong>AI Step:</strong> Classify the ticket (bug, feature request, question, billing) and assess urgency</li>
        <li><strong>Action:</strong> Route to the appropriate team, add priority label</li>
      </ol>

      <h2>Best Practices</h2>
      <ul>
        <li><strong>Start small</strong> — Automate one simple task before building complex workflows</li>
        <li><strong>Include error handling</strong> — AI can fail or produce unexpected output; plan for that</li>
        <li><strong>Set up monitoring</strong> — Log outputs to catch quality issues early</li>
        <li><strong>Human-in-the-loop</strong> — For important outputs, add an approval step before the final action</li>
        <li><strong>Test with real data</strong> — Edge cases in production data will surprise you</li>
      </ul>
    `,
  },
  {
    slug: 'ai-agents',
    title: 'Building AI Agents',
    description:
      'Learn what AI agents are and how to build them using modern frameworks like OpenClaw, LangGraph, CrewAI, Paperclip, and Mastra.',
    difficulty: 'Advanced',
    timeToRead: '16 min',
    icon: '🧠',
    topics: ['AI agents', 'Tool use', 'Function calling', 'Multi-agent orchestration', 'Agent frameworks', 'OpenClaw', 'LangGraph', 'CrewAI', 'Paperclip', 'Mastra'],
    content: `
      <h2>What Are AI Agents?</h2>
      <p>AI agents are systems where an LLM operates with some degree of autonomy, making decisions about what steps to take to accomplish a goal. Unlike a simple chatbot that responds to one message at a time, an agent can plan a sequence of actions, use tools, observe results, and adjust its approach. In 2025-2026, agents went from experimental demos to production software used by millions — see our <a href="/agents">AI Agent Platforms</a> page for a full comparison.</p>

      <h2>How Agents Work</h2>
      <p>The basic agent loop is:</p>
      <ol>
        <li><strong>Observe</strong> — Receive the task and any current context</li>
        <li><strong>Think</strong> — Decide what to do next</li>
        <li><strong>Act</strong> — Execute an action (call a tool, write code, search the web)</li>
        <li><strong>Observe</strong> — See the result of the action</li>
        <li><strong>Repeat</strong> — Continue until the task is complete</li>
      </ol>

      <h2>Tool Use / Function Calling</h2>
      <p>The foundation of agents is tool use. All major AI providers support function calling, where you define tools the model can invoke:</p>
      <pre><code># OpenAI function calling example
tools = [
    {
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "Get current weather for a location",
            "parameters": {
                "type": "object",
                "properties": {
                    "location": {"type": "string", "description": "City name"}
                },
                "required": ["location"]
            }
        }
    }
]

response = client.chat.completions.create(
    model="gpt-5.4",
    messages=[{"role": "user", "content": "What's the weather in Paris?"}],
    tools=tools
)</code></pre>

      <h2>Agent Frameworks (2026 Landscape)</h2>
      <p>The agent framework ecosystem has matured rapidly. Here are the leading platforms by category:</p>

      <h3>Personal Agents</h3>
      <ul>
        <li><strong>OpenClaw</strong> — The fastest-growing OSS project ever (250K+ stars). A personal AI agent that works across WhatsApp, Telegram, Slack, Discord, and more. Features a skills marketplace with 4,000+ community skills, local-first privacy, and multi-agent routing. Built in TypeScript.</li>
        <li><strong>Hermes Agent</strong> — Nous Research's autonomous agent with persistent multi-level memory and auto-skill generation. Supports 5 execution backends (Local, Docker, SSH, Singularity, Modal).</li>
      </ul>

      <h3>Developer Frameworks</h3>
      <ul>
        <li><strong>LangGraph</strong> — The most searched agent framework (27,100/mo). Graph-based multi-agent orchestration with stateful workflows, cycles, persistence, and human-in-the-loop. By the LangChain team. Python and JavaScript.</li>
        <li><strong>CrewAI</strong> — Multi-agent collaboration where you define agent roles, connect tools, and monitor performance. Visual and API-driven. Great for team-based agent workflows.</li>
        <li><strong>Mastra</strong> — TypeScript-first agent framework by the Gatsby team. Built-in model routing, RAG pipelines, memory management, and MCP integration. The go-to choice for JS/TS developers.</li>
        <li><strong>OpenAI Agents SDK</strong> — Production-grade toolkit replacing Swarm. Core abstraction: handoffs between agents with conversation context. Includes guardrails and tracing.</li>
        <li><strong>Anthropic Agent SDK</strong> — Tool-use-first approach with Claude. Extended thinking, computer use, MCP protocol for standardized tool discovery.</li>
        <li><strong>Google ADK</strong> — Google's Agent Development Kit. Integrates with Gemini models and Google Cloud services.</li>
        <li><strong>AutoGen</strong> — Microsoft's framework for multi-agent conversational systems. Agents collaborate, share info, and perform tasks autonomously.</li>
      </ul>

      <h3>Orchestration</h3>
      <ul>
        <li><strong>Paperclip</strong> — Orchestration for "zero-human companies." Agents organized as a company hierarchy (CEO, Engineers, QA) with budget enforcement, governance with rollback, and full audit trails. 30K stars in 3 weeks.</li>
        <li><strong>n8n</strong> — Open-source workflow automation (170K+ stars) with AI agent capabilities via LangChain integration. Self-hosted or cloud.</li>
      </ul>

      <h2>Real-World Agent Applications</h2>
      <ul>
        <li><strong>Personal AI agents</strong> — OpenClaw and Hermes Agent manage your messages, tasks, and information across every platform, with local-first privacy</li>
        <li><strong>Coding agents</strong> — Claude Code (#1 SWE-bench, 80.8%), GitHub Copilot Agent Mode, Devin, Cursor, Windsurf, Google Antigravity, OpenAI Codex, Amazon Kiro — agents that read codebases, write code, run tests, and fix bugs</li>
        <li><strong>Autonomous organizations</strong> — Paperclip enables agent teams organized as companies, with budgets, governance, and audit trails</li>
        <li><strong>Research agents</strong> — Systems that search the web, read papers, synthesize findings, and produce reports</li>
        <li><strong>Data analysis agents</strong> — Upload a dataset, the agent writes code to analyze it, creates visualizations, and interprets results</li>
        <li><strong>Business automation</strong> — Lindy and n8n enable non-technical users to build and deploy agent workflows for customer service, email triage, content generation, and more</li>
      </ul>

      <h2>Safety Considerations</h2>
      <ul>
        <li><strong>Limit tool access</strong> — Only give agents the tools they need</li>
        <li><strong>Add guardrails</strong> — Set boundaries on what actions are allowed (OpenAI Agents SDK and Anthropic Agent SDK both include built-in guardrails)</li>
        <li><strong>Human oversight</strong> — Require approval for high-impact actions (LangGraph's human-in-the-loop is the gold standard here)</li>
        <li><strong>Logging and audit trails</strong> — Record all agent actions for debugging and auditing (Paperclip's full audit trail is a good model)</li>
        <li><strong>Sandboxing</strong> — Run agent code in isolated environments</li>
        <li><strong>Prompt injection defense</strong> — Be aware that agents processing untrusted input are vulnerable to manipulation; validate and sanitize inputs</li>
      </ul>

      <p><em>For a complete comparison of all agent platforms, visit our <a href="/agents">AI Agent Platforms</a> page.</em></p>
    `,
  },
];

export default function TutorialsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'AI Tutorials',
    description: 'Hands-on tutorials for building with AI.',
    url: 'https://ai-future-ready.com/tutorials',
    mainEntity: tutorials.map((t) => ({
      '@type': 'Article',
      name: t.title,
      description: t.description,
    })),
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
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">AI Tutorials</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Hands-on, step-by-step guides to building with AI. From no-code automations to
            advanced agent development.
          </p>
        </div>
      </section>

      {/* Tutorial Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-8">
          {tutorials.map((tutorial) => (
            <article
              key={tutorial.slug}
              id={tutorial.slug}
              className="bg-card rounded-2xl border border-card-border overflow-hidden card-hover"
            >
              <div className="p-8 sm:p-10">
                {/* Header */}
                <div className="flex flex-wrap items-start gap-4 mb-6">
                  <span className="text-4xl">{tutorial.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h2 className="text-2xl font-bold text-foreground">{tutorial.title}</h2>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          tutorial.difficulty === 'Beginner'
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                            : tutorial.difficulty === 'Intermediate'
                            ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                            : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                        }`}
                      >
                        {tutorial.difficulty}
                      </span>
                      <span className="text-sm text-muted">{tutorial.timeToRead} read</span>
                    </div>
                    <p className="text-muted">{tutorial.description}</p>
                  </div>
                </div>

                {/* Topics */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {tutorial.topics.map((topic) => (
                    <span
                      key={topic}
                      className="px-3 py-1 bg-surface rounded-lg text-xs font-medium text-muted"
                    >
                      {topic}
                    </span>
                  ))}
                </div>

                {/* Content */}
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: tutorial.content }}
                />
              </div>
            </article>
          ))}
        </div>

        {/* Cross-links */}
        <div className="mt-16 bg-surface rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Apply What You&apos;ve Learned?</h2>
          <p className="text-muted mb-6 max-w-xl mx-auto">
            Check out our interactive tools and prompt library to put these skills into practice.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/tools/prompts"
              className="px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors"
            >
              Browse Prompt Library
            </Link>
            <Link
              href="/models"
              className="px-6 py-3 bg-card border border-card-border text-foreground rounded-xl font-medium hover:bg-surface transition-colors"
            >
              Compare AI Models
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
