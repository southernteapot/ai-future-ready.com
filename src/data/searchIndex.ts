import { models } from './models';
import { glossaryTerms } from './glossary';

export interface SearchItem {
  title: string;
  description: string;
  href: string;
  category: 'Models' | 'Glossary' | 'Pages';
}

const pageEntries: SearchItem[] = [
  {
    title: 'Home',
    description:
      'Your complete guide to the AI-powered future. Compare models, learn prompt engineering, and get AI-ready.',
    href: '/',
    category: 'Pages',
  },
  {
    title: 'Compare AI Models',
    description:
      'Side-by-side comparison of GPT-5.4, Claude Opus 4.6, Gemini 3.1 Pro, Llama 4, DeepSeek, and more.',
    href: '/models',
    category: 'Pages',
  },
  {
    title: 'AI Glossary',
    description:
      'Jargon-free definitions for every AI term you will encounter, from tokens to transformers.',
    href: '/glossary',
    category: 'Pages',
  },
  {
    title: 'Getting Started with AI',
    description:
      'A beginner-friendly guide to understanding artificial intelligence and how to start using it.',
    href: '/guides/getting-started',
    category: 'Pages',
  },
  {
    title: 'Prompt Engineering Guide',
    description:
      'Master the art of talking to AI. Techniques, templates, and real examples to get better results.',
    href: '/guides/prompting',
    category: 'Pages',
  },
  {
    title: 'AI Use Cases',
    description:
      'Discover how AI is transforming writing, coding, research, business, images, and education.',
    href: '/use-cases',
    category: 'Pages',
  },
  {
    title: 'AI for Writing',
    description:
      'How to use AI for drafting, editing, and improving your writing across any format.',
    href: '/use-cases/writing',
    category: 'Pages',
  },
  {
    title: 'AI for Coding',
    description:
      'Use AI to write, debug, and review code. Tools, workflows, and best practices for developers.',
    href: '/use-cases/coding',
    category: 'Pages',
  },
  {
    title: 'AI for Business',
    description:
      'Practical AI applications for business operations, strategy, marketing, and productivity.',
    href: '/use-cases/business',
    category: 'Pages',
  },
  {
    title: 'AI for Images',
    description:
      'Generate, edit, and enhance images with AI. Tools and techniques for visual content creation.',
    href: '/use-cases/images',
    category: 'Pages',
  },
  {
    title: 'AI for Research',
    description:
      'Accelerate research with AI-powered literature review, data analysis, and synthesis.',
    href: '/use-cases/research',
    category: 'Pages',
  },
  {
    title: 'AI for Education',
    description:
      'AI tools and strategies for students, teachers, and lifelong learners.',
    href: '/use-cases/education',
    category: 'Pages',
  },
  {
    title: 'AI Timeline',
    description:
      'A visual history of artificial intelligence from the 1950s to today.',
    href: '/timeline',
    category: 'Pages',
  },
  {
    title: 'Tutorials',
    description:
      'Step-by-step tutorials for using AI tools and building AI-powered projects.',
    href: '/tutorials',
    category: 'Pages',
  },
  {
    title: 'Deep Dives',
    description:
      'Detailed explorations of how AI actually works — attention, training, fine-tuning, and beyond.',
    href: '/deep-dives',
    category: 'Pages',
  },
  {
    title: 'Find Your AI Tool (Quiz)',
    description:
      'Take our interactive quiz to discover which AI tools match your needs.',
    href: '/tools/quiz',
    category: 'Pages',
  },
  {
    title: 'Prompt Library',
    description:
      'Ready-to-use prompt templates for common tasks across writing, coding, analysis, and more.',
    href: '/tools/prompts',
    category: 'Pages',
  },
  {
    title: 'AI Tool Comparison',
    description:
      'Compare AI tools side by side to find the best fit for your use case and budget.',
    href: '/tools/compare',
    category: 'Pages',
  },
  {
    title: 'Blog',
    description:
      'The latest AI news, analysis, and comparisons from AI Future Ready.',
    href: '/blog',
    category: 'Pages',
  },
  {
    title: 'About',
    description:
      'Learn about AI Future Ready and our mission to make AI accessible to everyone.',
    href: '/about',
    category: 'Pages',
  },
];

const modelEntries: SearchItem[] = models.map((model) => ({
  title: `${model.name} (${model.provider})`,
  description: model.description,
  href: '/models',
  category: 'Models',
}));

const glossaryEntries: SearchItem[] = glossaryTerms.map((term) => ({
  title: term.term,
  description: term.definition,
  href: '/glossary',
  category: 'Glossary',
}));

export const searchIndex: SearchItem[] = [
  ...modelEntries,
  ...glossaryEntries,
  ...pageEntries,
];
