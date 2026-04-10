export interface AgentPlatform {
  id: string;
  name: string;
  category:
    | 'personal-agent'
    | 'dev-framework'
    | 'orchestration'
    | 'no-code'
    | 'coding-agent';
  description: string;
  website: string;
  github?: string;
  stars?: string;
  license: string;
  pricing: string;
  keyFeatures: string[];
  bestFor: string[];
  languages: string[];
}

export const categoryLabels: Record<AgentPlatform['category'], string> = {
  'personal-agent': 'Personal Agent',
  'dev-framework': 'Dev Framework',
  orchestration: 'Orchestration',
  'no-code': 'No-Code',
  'coding-agent': 'Coding Agent',
};

export const categoryColors: Record<AgentPlatform['category'], string> = {
  'personal-agent': '#8b5cf6',
  'dev-framework': '#3b82f6',
  orchestration: '#f59e0b',
  'no-code': '#10b981',
  'coding-agent': '#ef4444',
};

export const agentPlatforms: AgentPlatform[] = [
  // --- Personal AI Agents ---
  {
    id: 'openclaw',
    name: 'OpenClaw',
    category: 'personal-agent',
    description:
      'Free, open-source personal AI agent and the fastest-growing OSS project in history. Multi-channel messaging across WhatsApp, Telegram, Slack, Discord, and more. Features a skills marketplace with 4,000+ community skills, local-first privacy, voice support, and multi-agent routing.',
    website: 'https://openclaw.ai',
    github: 'https://github.com/openclaw/openclaw',
    stars: '250K+',
    license: 'MIT',
    pricing: 'Free / Open Source',
    keyFeatures: [
      'Multi-channel messaging (WhatsApp, Telegram, Slack, Discord)',
      'Skills marketplace with 4,000+ skills',
      'Local-first privacy architecture',
      'Voice support and multi-agent routing',
      'Plugin system for extensibility',
      'Self-hosted or cloud deployment',
    ],
    bestFor: [
      'Personal productivity',
      'Multi-platform messaging',
      'Privacy-conscious users',
      'Skill customization',
    ],
    languages: ['TypeScript'],
  },
  {
    id: 'hermes-agent',
    name: 'Hermes Agent',
    category: 'personal-agent',
    description:
      "Nous Research's open-source autonomous agent with persistent multi-level memory and auto-skill generation. Supports 5 execution backends (Local, Docker, SSH, Singularity, Modal) and multi-channel communication across Telegram, Discord, Slack, WhatsApp, and Signal.",
    website: 'https://nousresearch.com',
    github: 'https://github.com/NousResearch/hermes-agent',
    stars: '2,200+',
    license: 'MIT',
    pricing: 'Free / Open Source',
    keyFeatures: [
      'Persistent multi-level memory system',
      'Auto-skill generation',
      '5 execution backends (Local, Docker, SSH, Singularity, Modal)',
      'Multi-channel (Telegram, Discord, Slack, WhatsApp, Signal)',
      'Autonomous task planning',
      'Compatible with multiple LLM backends',
    ],
    bestFor: [
      'Autonomous task execution',
      'Multi-backend deployment',
      'Research and experimentation',
      'Self-hosted agents',
    ],
    languages: ['Python'],
  },

  // --- Developer Frameworks ---
  {
    id: 'langgraph',
    name: 'LangGraph',
    category: 'dev-framework',
    description:
      'Graph-based multi-agent orchestration framework by the LangChain team. Enables stateful workflows with cycles, persistence, and human-in-the-loop patterns. The most searched agent framework with 27,100 monthly searches.',
    website: 'https://langchain-ai.github.io/langgraph/',
    github: 'https://github.com/langchain-ai/langgraph',
    stars: '8,200+',
    license: 'Apache 2.0',
    pricing: 'Free / Open Source (LangSmith cloud plans available)',
    keyFeatures: [
      'Graph-based workflow orchestration',
      'Stateful agents with persistence',
      'Human-in-the-loop support',
      'Cyclical graph execution',
      'Built-in checkpointing and replay',
      'LangSmith integration for observability',
    ],
    bestFor: [
      'Complex multi-step workflows',
      'Multi-agent systems',
      'Stateful agent applications',
      'Production agent pipelines',
    ],
    languages: ['Python', 'JavaScript'],
  },
  {
    id: 'crewai',
    name: 'CrewAI',
    category: 'dev-framework',
    description:
      'Multi-agent collaboration framework where you define agent roles, connect tools, and monitor performance. Offers both visual and API-driven interfaces with built-in orchestration, observability, and scaling capabilities.',
    website: 'https://crewai.com',
    github: 'https://github.com/crewAIInc/crewAI',
    stars: '28K+',
    license: 'MIT',
    pricing: 'Free / Open Source (Enterprise plans available)',
    keyFeatures: [
      'Role-based agent definition',
      'Multi-agent collaboration and delegation',
      'Visual and API-driven interfaces',
      'Built-in observability and monitoring',
      'Tool integration ecosystem',
      'Scalable orchestration',
    ],
    bestFor: [
      'Team-based agent workflows',
      'Business process automation',
      'Multi-agent collaboration',
      'Rapid prototyping',
    ],
    languages: ['Python'],
  },
  {
    id: 'openai-agents-sdk',
    name: 'OpenAI Agents SDK',
    category: 'dev-framework',
    description:
      'Production-grade agent toolkit from OpenAI, replacing the earlier Swarm project. Core abstractions include handoffs between agents with full conversation context, built-in guardrails, and tracing for debugging and monitoring.',
    website: 'https://platform.openai.com/docs/agents',
    github: 'https://github.com/openai/openai-agents-python',
    stars: '18K+',
    license: 'MIT',
    pricing: 'Free SDK (OpenAI API costs apply)',
    keyFeatures: [
      'Agent handoffs with conversation context',
      'Built-in guardrails and safety controls',
      'Tracing and debugging tools',
      'Tool integration framework',
      'Streaming support',
      'Production-ready patterns',
    ],
    bestFor: [
      'OpenAI ecosystem users',
      'Production agent systems',
      'Multi-agent handoffs',
      'Enterprise applications',
    ],
    languages: ['Python'],
  },
  {
    id: 'anthropic-agent-sdk',
    name: 'Anthropic Agent SDK',
    category: 'dev-framework',
    description:
      'Tool-use-first approach to building agents with Claude. Features extended thinking for complex reasoning, computer use capabilities, and the Model Context Protocol (MCP) for standardized tool discovery and integration.',
    website: 'https://docs.anthropic.com/en/docs/agents',
    github: 'https://github.com/anthropics/anthropic-sdk-python',
    stars: '8K+',
    license: 'MIT',
    pricing: 'Free SDK (Anthropic API costs apply)',
    keyFeatures: [
      'Tool-use-first agent architecture',
      'Extended thinking for complex reasoning',
      'Computer use capabilities',
      'MCP for standardized tool discovery',
      'Streaming and real-time responses',
      'Built-in safety and alignment',
    ],
    bestFor: [
      'Claude ecosystem users',
      'Tool-heavy agent workflows',
      'Computer use automation',
      'MCP-based integrations',
    ],
    languages: ['Python', 'TypeScript'],
  },
  {
    id: 'google-adk',
    name: 'Google ADK',
    category: 'dev-framework',
    description:
      "Google's Agent Development Kit for building AI agents. Integrates tightly with Gemini models and Google Cloud services, offering a streamlined path from prototype to production within the Google ecosystem.",
    website: 'https://google.github.io/adk-docs/',
    github: 'https://github.com/google/adk-python',
    stars: '10K+',
    license: 'Apache 2.0',
    pricing: 'Free SDK (Google AI API costs apply)',
    keyFeatures: [
      'Native Gemini model integration',
      'Google Cloud services integration',
      'Agent orchestration primitives',
      'Built-in evaluation tools',
      'Vertex AI deployment support',
      'Multi-modal agent capabilities',
    ],
    bestFor: [
      'Google ecosystem users',
      'Gemini-powered agents',
      'Cloud-native deployments',
      'Multi-modal applications',
    ],
    languages: ['Python'],
  },
  {
    id: 'mastra',
    name: 'Mastra',
    category: 'dev-framework',
    description:
      'TypeScript-first agent framework built by the team behind Gatsby. Features built-in model routing, RAG pipelines, memory management, and MCP integration, designed for developers who prefer the TypeScript ecosystem.',
    website: 'https://mastra.ai',
    github: 'https://github.com/mastra-ai/mastra',
    stars: '10K+',
    license: 'Elastic License 2.0',
    pricing: 'Free / Open Source',
    keyFeatures: [
      'TypeScript-first design',
      'Built-in model routing',
      'RAG pipeline support',
      'Memory management system',
      'MCP protocol integration',
      'Workflow orchestration engine',
    ],
    bestFor: [
      'TypeScript developers',
      'RAG applications',
      'Full-stack JS/TS projects',
      'MCP tool integrations',
    ],
    languages: ['TypeScript'],
  },
  {
    id: 'autogen',
    name: 'AutoGen',
    category: 'dev-framework',
    description:
      "Microsoft's multi-agent framework where agents collaborate, share information, and perform tasks autonomously. Designed for flexible, scalable multi-agent conversations with support for human participation.",
    website: 'https://microsoft.github.io/autogen/',
    github: 'https://github.com/microsoft/autogen',
    stars: '42K+',
    license: 'CC-BY-4.0',
    pricing: 'Free / Open Source',
    keyFeatures: [
      'Multi-agent conversation framework',
      'Flexible agent collaboration patterns',
      'Human-in-the-loop participation',
      'Code execution in sandboxed environments',
      'Customizable agent behaviors',
      'Scalable architecture',
    ],
    bestFor: [
      'Multi-agent research',
      'Collaborative AI systems',
      'Code generation workflows',
      'Enterprise automation',
    ],
    languages: ['Python'],
  },

  // --- Orchestration ---
  {
    id: 'paperclip',
    name: 'Paperclip',
    category: 'orchestration',
    description:
      'Open-source orchestration platform for "zero-human companies." Agents are organized as a company hierarchy (CEO, Engineers, QA) with budget enforcement, persistent state, governance with rollback, multi-company isolation, and a full audit trail. Gained 30K stars in just 3 weeks.',
    website: 'https://paperclip.dev',
    github: 'https://github.com/paperclip-ai/paperclip',
    stars: '30K+',
    license: 'MIT',
    pricing: 'Free / Open Source',
    keyFeatures: [
      'Company-style agent hierarchy (CEO, Engineers, QA)',
      'Budget enforcement and cost controls',
      'Persistent state management',
      'Governance with rollback capabilities',
      'Multi-company isolation',
      'Full audit trail for all agent actions',
    ],
    bestFor: [
      'Autonomous organizations',
      'Complex orchestration',
      'Budget-controlled agent systems',
      'Enterprise governance',
    ],
    languages: ['TypeScript', 'Node.js'],
  },
  {
    id: 'n8n',
    name: 'n8n',
    category: 'orchestration',
    description:
      'Open-source workflow automation platform with AI agent capabilities. Features LangChain integration, vector database support, and a visual workflow builder. Available as self-hosted or cloud deployment.',
    website: 'https://n8n.io',
    github: 'https://github.com/n8n-io/n8n',
    stars: '170K+',
    license: 'Sustainable Use License',
    pricing: 'Free self-hosted / Cloud from $24/mo',
    keyFeatures: [
      'Visual workflow builder',
      'LangChain integration for AI agents',
      'Vector database support',
      '400+ integrations',
      'Self-hosted or cloud deployment',
      'Custom code nodes (JavaScript/Python)',
    ],
    bestFor: [
      'Workflow automation',
      'AI-powered integrations',
      'Self-hosted solutions',
      'Business process automation',
    ],
    languages: ['TypeScript'],
  },

  // --- Coding Agents ---
  {
    id: 'claude-code',
    name: 'Claude Code',
    category: 'coding-agent',
    description:
      "Anthropic's terminal-based coding agent, ranked #1 on SWE-bench with 80.8% resolution rate. Operates with 1M token context window, enabling full-codebase understanding. Included in Claude Pro and Max subscription plans.",
    website: 'https://docs.anthropic.com/en/docs/claude-code',
    license: 'Proprietary',
    pricing: 'Included in Claude Pro ($20/mo) / Max ($100-200/mo)',
    keyFeatures: [
      '#1 on SWE-bench (80.8%)',
      '1M token context window',
      'Terminal-native interface',
      'Full codebase understanding',
      'Multi-file editing and refactoring',
      'Git integration and test execution',
    ],
    bestFor: [
      'Software engineering',
      'Complex refactoring',
      'Bug fixing',
      'Terminal-based workflows',
    ],
    languages: ['TypeScript'],
  },
  {
    id: 'devin',
    name: 'Devin',
    category: 'coding-agent',
    description:
      "Cognition AI's autonomous software engineer that can plan projects end-to-end, write code, debug issues, and deploy applications. Operates in its own development environment with browser, terminal, and editor access.",
    website: 'https://devin.ai',
    license: 'Proprietary',
    pricing: 'From $500/mo (Team plans available)',
    keyFeatures: [
      'End-to-end project planning and execution',
      'Autonomous code writing and debugging',
      'Built-in browser, terminal, and editor',
      'Deployment automation',
      'Slack and GitHub integration',
      'Session replay and audit logs',
    ],
    bestFor: [
      'Autonomous development',
      'End-to-end project delivery',
      'Prototyping',
      'Repetitive engineering tasks',
    ],
    languages: ['Multiple'],
  },
  {
    id: 'github-copilot-agent',
    name: 'GitHub Copilot Agent Mode',
    category: 'coding-agent',
    description:
      'Autonomous multi-step coding mode within VS Code and JetBrains IDEs. Plans and executes complex coding tasks including multi-file edits, terminal commands, and iterative debugging within your existing development environment.',
    website: 'https://github.com/features/copilot',
    license: 'Proprietary',
    pricing: '$10-39/mo (Individual to Enterprise)',
    keyFeatures: [
      'Multi-step task planning and execution',
      'VS Code and JetBrains integration',
      'Multi-file editing',
      'Terminal command execution',
      'Iterative debugging',
      'Context-aware code generation',
    ],
    bestFor: [
      'IDE-integrated development',
      'Multi-file refactoring',
      'Assisted debugging',
      'Daily coding workflows',
    ],
    languages: ['Multiple'],
  },

  // --- No-Code ---
  {
    id: 'lindy',
    name: 'Lindy',
    category: 'no-code',
    description:
      'Build, deploy, and manage AI agents without writing code. Designed for business task automation with a visual interface for creating agent workflows that integrate with popular business tools.',
    website: 'https://lindy.ai',
    license: 'Proprietary',
    pricing: 'Free tier / Pro from $49/mo',
    keyFeatures: [
      'No-code agent builder',
      'Visual workflow designer',
      'Business tool integrations',
      'Pre-built agent templates',
      'Multi-step automation',
      'Team collaboration features',
    ],
    bestFor: [
      'Non-technical users',
      'Business automation',
      'Quick agent prototyping',
      'Team productivity',
    ],
    languages: [],
  },
];
