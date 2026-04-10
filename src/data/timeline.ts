export interface TimelineEvent {
  year: number;
  month?: number;
  title: string;
  description: string;
  category: 'research' | 'product' | 'milestone' | 'policy';
  significance: 'high' | 'medium';
}

export interface TimelineEra {
  name: string;
  startYear: number;
  endYear: number;
  description: string;
}

export const eras: TimelineEra[] = [
  {
    name: 'The Birth of AI',
    startYear: 1950,
    endYear: 1969,
    description:
      'Visionaries laid the theoretical groundwork and built the first AI programs, fueled by optimism about machine intelligence.',
  },
  {
    name: 'AI Winters & Expert Systems',
    startYear: 1970,
    endYear: 1993,
    description:
      'Funding cuts and unmet expectations led to "AI winters," but expert systems and neural network research kept the field alive.',
  },
  {
    name: 'The AI Renaissance',
    startYear: 1997,
    endYear: 2011,
    description:
      'Increased computing power and data availability produced landmark achievements, from chess to Jeopardy!.',
  },
  {
    name: 'The Deep Learning Revolution',
    startYear: 2012,
    endYear: 2019,
    description:
      'Deep neural networks shattered benchmarks in vision, language, and games, ushering in the modern AI era.',
  },
  {
    name: 'The Generative AI Era',
    startYear: 2020,
    endYear: 2024,
    description:
      'Large language models, image generators, and multimodal AI went mainstream, transforming how billions of people work and create.',
  },
  {
    name: 'The Agentic AI Era',
    startYear: 2025,
    endYear: 2026,
    description:
      'AI models gained autonomous agency, using tools, writing and reviewing code, and completing multi-step workflows. Rapid model releases, consolidation in the AI IDE market, and sweeping regulation defined a new phase of the AI revolution.',
  },
];

export const timelineEvents: TimelineEvent[] = [
  // --- The Birth of AI (1950s-1960s) ---
  {
    year: 1950,
    title: 'Turing Test Proposed',
    description:
      'Alan Turing publishes "Computing Machinery and Intelligence," proposing the imitation game as a test for machine intelligence.',
    category: 'research',
    significance: 'high',
  },
  {
    year: 1956,
    month: 8,
    title: 'Dartmouth Conference',
    description:
      'John McCarthy, Marvin Minsky, Nathaniel Rochester, and Claude Shannon organize the Dartmouth workshop, coining the term "artificial intelligence."',
    category: 'milestone',
    significance: 'high',
  },
  {
    year: 1958,
    title: 'Perceptron Invented',
    description:
      'Frank Rosenblatt builds the Mark I Perceptron at Cornell, the first hardware implementation of an artificial neural network.',
    category: 'research',
    significance: 'medium',
  },
  {
    year: 1966,
    title: 'ELIZA Chatbot',
    description:
      'Joseph Weizenbaum at MIT creates ELIZA, an early natural language processing program that simulates a Rogerian psychotherapist.',
    category: 'product',
    significance: 'high',
  },
  {
    year: 1969,
    title: 'Shakey the Robot',
    description:
      'SRI International develops Shakey, the first general-purpose mobile robot able to reason about its own actions.',
    category: 'research',
    significance: 'medium',
  },

  // --- AI Winters & Expert Systems (1970s-1993) ---
  {
    year: 1970,
    title: 'First AI Winter Begins',
    description:
      'The Lighthill Report and DARPA funding cuts trigger the first AI winter, as early systems fail to meet lofty expectations.',
    category: 'milestone',
    significance: 'medium',
  },
  {
    year: 1980,
    title: 'Expert Systems Boom',
    description:
      'Rule-based expert systems like XCON (R1) at DEC demonstrate commercial viability, sparking a new wave of AI investment.',
    category: 'product',
    significance: 'medium',
  },
  {
    year: 1986,
    title: 'Backpropagation Popularized',
    description:
      'Rumelhart, Hinton, and Williams publish their influential paper on backpropagation, enabling practical training of multi-layer neural networks.',
    category: 'research',
    significance: 'high',
  },
  {
    year: 1988,
    title: 'Second AI Winter',
    description:
      'The collapse of the LISP machine market and limitations of expert systems trigger a second wave of reduced AI funding.',
    category: 'milestone',
    significance: 'medium',
  },

  // --- The AI Renaissance (1997-2011) ---
  {
    year: 1997,
    month: 5,
    title: 'Deep Blue Defeats Kasparov',
    description:
      'IBM\'s Deep Blue defeats world chess champion Garry Kasparov in a six-game match, marking a milestone for AI in strategic games.',
    category: 'milestone',
    significance: 'high',
  },
  {
    year: 2002,
    title: 'Roomba Released',
    description:
      'iRobot releases the Roomba, one of the first commercially successful autonomous robots, bringing AI into millions of homes.',
    category: 'product',
    significance: 'medium',
  },
  {
    year: 2006,
    title: 'Geoffrey Hinton Coins "Deep Learning"',
    description:
      'Hinton and collaborators demonstrate that deep belief networks can be efficiently trained layer by layer, reigniting interest in neural networks.',
    category: 'research',
    significance: 'high',
  },
  {
    year: 2011,
    month: 2,
    title: 'IBM Watson Wins Jeopardy!',
    description:
      'IBM Watson defeats Jeopardy! champions Ken Jennings and Brad Rutter, showcasing advances in natural language understanding.',
    category: 'milestone',
    significance: 'high',
  },
  {
    year: 2011,
    month: 10,
    title: 'Siri Launches',
    description:
      'Apple introduces Siri with the iPhone 4S, bringing AI-powered voice assistants to mainstream consumer devices.',
    category: 'product',
    significance: 'medium',
  },

  // --- The Deep Learning Revolution (2012-2019) ---
  {
    year: 2012,
    month: 9,
    title: 'AlexNet Wins ImageNet',
    description:
      'Alex Krizhevsky, Ilya Sutskever, and Geoffrey Hinton\'s deep CNN wins the ImageNet competition by a huge margin, sparking the deep learning revolution.',
    category: 'research',
    significance: 'high',
  },
  {
    year: 2014,
    month: 6,
    title: 'GANs Introduced',
    description:
      'Ian Goodfellow and colleagues introduce Generative Adversarial Networks (GANs), enabling AI to generate realistic images and data.',
    category: 'research',
    significance: 'high',
  },
  {
    year: 2014,
    month: 9,
    title: 'Amazon Alexa Launches',
    description:
      'Amazon launches Alexa and the Echo speaker, accelerating the AI voice assistant market and smart home adoption.',
    category: 'product',
    significance: 'medium',
  },
  {
    year: 2016,
    month: 3,
    title: 'AlphaGo Defeats Lee Sedol',
    description:
      'DeepMind\'s AlphaGo defeats Go world champion Lee Sedol 4-1, a landmark for AI in games once thought beyond machine capability.',
    category: 'milestone',
    significance: 'high',
  },
  {
    year: 2017,
    month: 6,
    title: 'Transformer Architecture Published',
    description:
      'Google researchers publish "Attention Is All You Need," introducing the Transformer architecture that becomes the foundation of modern AI.',
    category: 'research',
    significance: 'high',
  },
  {
    year: 2018,
    month: 6,
    title: 'GPT-1 Released',
    description:
      'OpenAI releases GPT-1, demonstrating that generative pre-training on large text corpora followed by fine-tuning achieves strong NLP results.',
    category: 'research',
    significance: 'medium',
  },
  {
    year: 2018,
    month: 10,
    title: 'BERT Released',
    description:
      'Google releases BERT (Bidirectional Encoder Representations from Transformers), significantly advancing language understanding benchmarks.',
    category: 'research',
    significance: 'high',
  },
  {
    year: 2019,
    month: 2,
    title: 'GPT-2 Released',
    description:
      'OpenAI releases GPT-2, initially withholding the full model due to concerns about misuse, sparking debate about responsible AI release.',
    category: 'product',
    significance: 'medium',
  },

  // --- The Generative AI Era (2020-2024) ---
  {
    year: 2020,
    month: 6,
    title: 'GPT-3 Released',
    description:
      'OpenAI releases GPT-3 with 175 billion parameters, demonstrating remarkable few-shot learning and text generation capabilities.',
    category: 'product',
    significance: 'high',
  },
  {
    year: 2020,
    month: 11,
    title: 'AlphaFold 2 Solves Protein Folding',
    description:
      'DeepMind\'s AlphaFold 2 achieves near-experimental accuracy in protein structure prediction at CASP14, a breakthrough for biology.',
    category: 'milestone',
    significance: 'high',
  },
  {
    year: 2021,
    month: 1,
    title: 'DALL-E Announced',
    description:
      'OpenAI reveals DALL-E, a model that generates images from text descriptions, demonstrating creative multimodal AI capabilities.',
    category: 'product',
    significance: 'high',
  },
  {
    year: 2021,
    month: 6,
    title: 'GitHub Copilot Launched',
    description:
      'GitHub launches Copilot, an AI pair programmer powered by OpenAI Codex, fundamentally changing how developers write code.',
    category: 'product',
    significance: 'high',
  },
  {
    year: 2022,
    month: 4,
    title: 'DALL-E 2 Released',
    description:
      'OpenAI releases DALL-E 2 with dramatically improved image quality, making AI art generation accessible to a wider audience.',
    category: 'product',
    significance: 'medium',
  },
  {
    year: 2022,
    month: 8,
    title: 'Stable Diffusion Released',
    description:
      'Stability AI releases Stable Diffusion as open source, democratizing AI image generation and sparking a creative revolution.',
    category: 'product',
    significance: 'high',
  },
  {
    year: 2022,
    month: 11,
    title: 'ChatGPT Launches',
    description:
      'OpenAI releases ChatGPT, reaching 100 million users in two months and bringing conversational AI into the global mainstream.',
    category: 'product',
    significance: 'high',
  },
  {
    year: 2023,
    month: 2,
    title: 'Bing Chat & Google Bard',
    description:
      'Microsoft integrates ChatGPT into Bing, and Google announces Bard, triggering an AI arms race among tech giants.',
    category: 'product',
    significance: 'medium',
  },
  {
    year: 2023,
    month: 3,
    title: 'GPT-4 Released',
    description:
      'OpenAI releases GPT-4, a multimodal large language model showing significant improvements in reasoning, creativity, and accuracy.',
    category: 'product',
    significance: 'high',
  },
  {
    year: 2023,
    month: 7,
    title: 'Claude 2 & Llama 2 Released',
    description:
      'Anthropic releases Claude 2 with a 100K context window, and Meta open-sources Llama 2, expanding the AI ecosystem.',
    category: 'product',
    significance: 'high',
  },
  {
    year: 2023,
    month: 10,
    title: 'Biden Executive Order on AI',
    description:
      'President Biden signs a sweeping executive order establishing safety standards, privacy protections, and equity guidelines for AI.',
    category: 'policy',
    significance: 'high',
  },
  {
    year: 2023,
    month: 12,
    title: 'Gemini Launched',
    description:
      'Google DeepMind launches Gemini, a natively multimodal model designed to compete at the frontier of AI capabilities.',
    category: 'product',
    significance: 'high',
  },
  {
    year: 2024,
    month: 2,
    title: 'Gemini 1.5 Pro',
    description:
      'Google releases Gemini 1.5 Pro with a 1-million-token context window, pushing the boundaries of long-context understanding.',
    category: 'product',
    significance: 'medium',
  },
  {
    year: 2024,
    month: 3,
    title: 'Claude 3 Family Released',
    description:
      'Anthropic releases the Claude 3 family (Haiku, Sonnet, Opus), with Opus setting new benchmarks across reasoning and analysis tasks.',
    category: 'product',
    significance: 'high',
  },
  {
    year: 2024,
    month: 4,
    title: 'Meta Llama 3 Released',
    description:
      'Meta releases Llama 3 in 8B and 70B sizes, raising the bar for open-source language models.',
    category: 'product',
    significance: 'medium',
  },
  {
    year: 2024,
    month: 5,
    title: 'GPT-4o Released',
    description:
      'OpenAI releases GPT-4o ("omni"), a natively multimodal model processing text, audio, and vision with faster response times.',
    category: 'product',
    significance: 'high',
  },
  {
    year: 2024,
    month: 7,
    title: 'EU AI Act Enters into Force',
    description:
      'The European Union AI Act, the world\'s first comprehensive AI regulation framework, officially enters into force.',
    category: 'policy',
    significance: 'high',
  },
  {
    year: 2024,
    month: 9,
    title: 'OpenAI o1 Released',
    description:
      'OpenAI introduces o1, a model trained with reinforcement learning to perform complex reasoning using chain-of-thought before responding.',
    category: 'product',
    significance: 'high',
  },
  {
    year: 2024,
    month: 12,
    title: 'Sora Video Generation Preview',
    description:
      'OpenAI opens access to Sora, an AI model that generates realistic videos from text prompts, advancing generative media.',
    category: 'product',
    significance: 'medium',
  },
  // --- The Agentic AI Era (2025-2026) ---
  {
    year: 2025,
    month: 1,
    title: 'DeepSeek R1 Released',
    description:
      'Chinese AI lab DeepSeek releases R1, an open-source reasoning model rivaling frontier models at a fraction of the training cost.',
    category: 'product',
    significance: 'high',
  },
  {
    year: 2025,
    month: 2,
    title: 'Claude 3.7 Sonnet Released',
    description:
      'Anthropic releases Claude 3.7 Sonnet, introducing a hybrid reasoning mode that combines standard and extended thinking.',
    category: 'product',
    significance: 'medium',
  },
  {
    year: 2025,
    month: 3,
    title: 'GPT-4.5 Released',
    description:
      'OpenAI releases GPT-4.5, a large model focused on improved creativity, reduced hallucinations, and broader world knowledge.',
    category: 'product',
    significance: 'medium',
  },
  {
    year: 2025,
    month: 3,
    title: 'Gemini 2.5 Pro Released',
    description:
      'Google DeepMind releases Gemini 2.5 Pro, a thinking model with strong reasoning and a 1-million-token context window.',
    category: 'product',
    significance: 'medium',
  },
  {
    year: 2025,
    month: 4,
    title: 'Llama 4 Released',
    description:
      'Meta releases Llama 4 Scout and Maverick, mixture-of-experts models with a 10-million-token context window.',
    category: 'product',
    significance: 'high',
  },
  {
    year: 2025,
    month: 5,
    title: 'Claude Opus 4 & Sonnet 4 Released',
    description:
      'Anthropic releases Claude Opus 4 (classified Level 3 on their safety scale) and Claude Sonnet 4. Opus 4 becomes the most capable Claude model yet.',
    category: 'product',
    significance: 'high',
  },
  {
    year: 2025,
    month: 5,
    title: 'DeepSeek R1-0528 Update',
    description:
      'DeepSeek updates R1 to version R1-0528 with improved reasoning capabilities, while R2 remains delayed.',
    category: 'product',
    significance: 'medium',
  },
  {
    year: 2025,
    month: 7,
    title: 'Grok 4 and Grok 4 Heavy Launch',
    description:
      "xAI launches Grok 4 and Grok 4 Heavy, claiming Grok 4 is 'the most intelligent model in the world.' Includes native tool use and real-time search.",
    category: 'product',
    significance: 'high',
  },
  {
    year: 2025,
    month: 7,
    title: 'Amazon Kiro IDE Preview',
    description:
      'Amazon launches Kiro, a spec-driven AI coding IDE that generates specifications before writing code. Runs on Amazon Bedrock.',
    category: 'product',
    significance: 'medium',
  },
  {
    year: 2025,
    month: 7,
    title: 'Cognition AI Acquires Windsurf',
    description:
      'Cognition AI (makers of Devin) acquires Windsurf AI IDE, consolidating the AI coding tools market.',
    category: 'milestone',
    significance: 'medium',
  },
  {
    year: 2025,
    month: 8,
    title: 'GPT-5 Launches',
    description:
      'OpenAI releases GPT-5, a unified multimodal system with smart routing between standard and thinking modes. Sets new benchmarks: 94.6% on AIME, 74.9% on SWE-bench. 256K token context window.',
    category: 'product',
    significance: 'high',
  },
  {
    year: 2025,
    month: 8,
    title: 'Claude Opus 4.1 Released',
    description:
      'Anthropic releases Opus 4.1 with improved code generation, search reasoning, and instruction adherence.',
    category: 'product',
    significance: 'medium',
  },
  {
    year: 2025,
    month: 8,
    title: 'EU AI Act GPAI Rules Take Effect',
    description:
      'Governance rules and obligations for General-Purpose AI models become applicable under the EU AI Act.',
    category: 'policy',
    significance: 'high',
  },
  {
    year: 2025,
    month: 8,
    title: 'DeepSeek V3.1 Released',
    description:
      'DeepSeek releases V3.1 under MIT License with hybrid thinking/non-thinking modes, surpassing prior models by 40% on SWE-bench.',
    category: 'product',
    significance: 'medium',
  },
  {
    year: 2025,
    month: 9,
    title: 'Claude Sonnet 4.5 Released',
    description:
      'Anthropic releases Claude Sonnet 4.5 achieving 77.2% on SWE-bench Verified.',
    category: 'product',
    significance: 'medium',
  },
  {
    year: 2025,
    month: 9,
    title: 'DeepSeek V3.2 Released',
    description:
      'DeepSeek releases V3.2 with sparse attention mechanism, performing on par with GPT-5.1 and Gemini 3 Pro on benchmarks.',
    category: 'product',
    significance: 'high',
  },
  {
    year: 2025,
    month: 11,
    title: 'Google Gemini 3 Pro & Deep Think Launch',
    description:
      'Google releases Gemini 3 Pro and 3 Deep Think, replacing Gemini 2.5 series. State-of-the-art reasoning with multimodal capabilities.',
    category: 'product',
    significance: 'high',
  },
  {
    year: 2025,
    month: 11,
    title: 'Google Antigravity AI IDE Launches Free',
    description:
      'Google launches Antigravity, a free agent-first AI IDE with built-in Claude Opus 4.6 and Gemini 3.1 Pro.',
    category: 'product',
    significance: 'medium',
  },
  {
    year: 2025,
    month: 11,
    title: 'xAI Grok 4.1 Released',
    description:
      'xAI releases Grok 4.1 with 65% fewer hallucinations (down to 4.22%), available in Thinking and Non-thinking configurations.',
    category: 'product',
    significance: 'medium',
  },
  {
    year: 2025,
    month: 11,
    title: 'Claude Opus 4.5 Released',
    description:
      'Anthropic releases Opus 4.5 with a 67% price cut, making premium intelligence more affordable.',
    category: 'product',
    significance: 'medium',
  },
  {
    year: 2025,
    month: 12,
    title: 'Mistral 3 Model Suite Released',
    description:
      'Mistral releases their new flagship model suite with Apache 2.0 license, adopting MoE architecture. European alternative for enterprise AI.',
    category: 'product',
    significance: 'medium',
  },
  {
    year: 2025,
    month: 12,
    title: 'Gemini 3 Flash Released',
    description:
      'Google releases Gemini 3 Flash, replacing Gemini 2.5 Flash as default model in consumer app and Google Search AI responses.',
    category: 'product',
    significance: 'medium',
  },
  {
    year: 2025,
    month: 12,
    title: 'Trump AI Executive Order',
    description:
      "White House issues executive order 'Ensuring a National Policy Framework for AI', creating an AI Litigation Task Force to challenge state AI laws. Aims to preempt state-by-state regulation.",
    category: 'policy',
    significance: 'high',
  },
  {
    year: 2025,
    month: 12,
    title: 'GPT-5.2 Released',
    description:
      "OpenAI releases GPT-5.2, reportedly hastened by Google's Gemini 3 launch.",
    category: 'product',
    significance: 'medium',
  },
  {
    year: 2026,
    month: 1,
    title: 'Apple Partners with Google Gemini for Siri',
    description:
      'Apple announces plans to use Gemini AI in the next version of Siri, marking a major partnership shift.',
    category: 'milestone',
    significance: 'high',
  },
  {
    year: 2026,
    month: 1,
    title: 'ChatGPT Go Plan Launches Globally',
    description:
      'OpenAI launches the $8/month Go plan worldwide, sitting between Free and Plus tiers.',
    category: 'product',
    significance: 'medium',
  },
  {
    year: 2026,
    month: 1,
    title: 'Multiple State AI Laws Take Effect',
    description:
      'California AI Safety Act, California Transparency in Frontier AI Act, and Texas Responsible AI Governance Act take effect January 1.',
    category: 'policy',
    significance: 'medium',
  },
  {
    year: 2026,
    month: 2,
    title: 'Claude Opus 4.6 Released',
    description:
      'Anthropic releases Claude Opus 4.6 with 1M token context (no surcharge), agent teams, and PowerPoint integration. Scores 80.8% on SWE-bench, leading all models.',
    category: 'product',
    significance: 'high',
  },
  {
    year: 2026,
    month: 2,
    title: 'Claude Sonnet 4.6 Released',
    description:
      'First Sonnet model preferred over previous Opus generation in coding evaluations. 1M token context at $3/$15 per million tokens.',
    category: 'product',
    significance: 'medium',
  },
  {
    year: 2026,
    month: 2,
    title: 'Gemini 3.1 Pro Released',
    description:
      'Google releases Gemini 3.1 Pro with improved reasoning and agentic capabilities.',
    category: 'product',
    significance: 'medium',
  },
  {
    year: 2026,
    month: 2,
    title: 'EU AI Act Prohibited Practices Enforced',
    description:
      'EU begins enforcing prohibited AI practices including social scoring and real-time biometric surveillance. AI literacy obligations also take effect.',
    category: 'policy',
    significance: 'high',
  },
  {
    year: 2026,
    month: 2,
    title: 'Ads Appear in Free ChatGPT',
    description:
      'OpenAI begins showing advertisements to Free and Go tier ChatGPT users in the US.',
    category: 'milestone',
    significance: 'medium',
  },
  {
    year: 2026,
    month: 3,
    title: 'GPT-5.4 Released',
    description:
      'OpenAI releases GPT-5.4, combining frontier reasoning, coding (GPT-5.3-Codex capabilities), and agentic workflows into a single model.',
    category: 'product',
    significance: 'high',
  },
  {
    year: 2026,
    month: 3,
    title: 'OpenAI Shuts Down Sora',
    description:
      'OpenAI discontinues Sora video generation tool on March 25, pivoting resources toward robotics and world simulation. Underwhelming commercial returns and fierce competition cited.',
    category: 'milestone',
    significance: 'high',
  },
  {
    year: 2026,
    month: 3,
    title: 'Claude Code Source Code Leak',
    description:
      "Anthropic accidentally ships 512,000 lines of Claude Code source code via npm packaging error. Second security incident in a week after CMS misconfiguration exposed 'Claude Mythos' model details.",
    category: 'milestone',
    significance: 'high',
  },
  {
    year: 2026,
    month: 3,
    title: 'GitHub Copilot Agentic Code Review Ships',
    description:
      'GitHub launches Agentic Code Review on March 5, expanding Copilot from code completion to autonomous code review.',
    category: 'product',
    significance: 'medium',
  },
];
