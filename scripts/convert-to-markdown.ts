/**
 * One-time conversion script: reads existing TypeScript data files
 * and generates properly formatted markdown files with YAML frontmatter.
 *
 * Run with: npx tsx scripts/convert-to-markdown.ts
 */

import fs from 'fs';
import path from 'path';
import TurndownService from 'turndown';
import { models } from '../src/data/models';
import { agentPlatforms, categoryLabels } from '../src/data/agents';
import { glossaryTerms, categories } from '../src/data/glossary';
import { timelineEvents, eras } from '../src/data/timeline';
import { blogPosts } from '../src/data/blog';

const CONTENT_DIR = path.join(process.cwd(), 'content');
const turndown = new TurndownService({ headingStyle: 'atx' });

function ensureDir(dir: string) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeFile(filePath: string, content: string) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`  wrote ${path.relative(process.cwd(), filePath)}`);
}

// Escape YAML strings
function y(s: string): string {
  if (s.includes('"') || s.includes(':') || s.includes('#') || s.includes("'") || s.includes('\n')) {
    return `"${s.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
  }
  return `"${s}"`;
}

function yamlList(items: string[], indent = 0): string {
  const pad = ' '.repeat(indent);
  return items.map(i => `${pad}- ${y(i)}`).join('\n');
}

// ─── MODELS ──────────────────────────────────────────────

function convertModels() {
  console.log('\nConverting models...');

  for (const m of models) {
    const lines: string[] = [
      '---',
      `title: ${y(m.name)}`,
      'type: model',
      `id: ${y(m.id)}`,
      `provider: ${y(m.provider)}`,
      `model_type: ${y(m.type)}`,
      `release_date: ${y(m.releaseDate)}`,
      `description: ${y(m.description)}`,
      `last_updated: "2026-04-10"`,
      `context_window: ${y(m.contextWindow)}`,
      `website: ${y(m.website)}`,
      `license: ${y(m.license)}`,
      `modality:`,
      yamlList(m.modality, 0),
      `tags:`,
      yamlList([m.provider.toLowerCase(), m.type, ...m.modality], 0),
      `pricing:`,
      `  input: ${y(m.pricing.input)}`,
      `  output: ${y(m.pricing.output)}`,
    ];

    if (m.pricing.free) lines.push(`  free: true`);
    if (m.pricing.note) lines.push(`  note: ${y(m.pricing.note)}`);

    lines.push(`benchmarks:`);
    lines.push(`  reasoning: ${m.benchmarks.reasoning}`);
    lines.push(`  coding: ${m.benchmarks.coding}`);
    lines.push(`  math: ${m.benchmarks.math}`);
    lines.push(`  writing: ${m.benchmarks.writing}`);
    lines.push(`  multilingual: ${m.benchmarks.multilingual}`);
    lines.push(`  speed: ${m.benchmarks.speed}`);

    if (m.parameters) lines.push(`parameters: ${y(m.parameters)}`);
    if (m.hardwareRequirements) lines.push(`hardware_requirements: ${y(m.hardwareRequirements)}`);

    lines.push(`best_for:`);
    lines.push(yamlList(m.bestFor, 0));

    lines.push('---');
    lines.push('');
    lines.push(`# ${m.name}`);
    lines.push('');
    lines.push(`> ${m.description}`);
    lines.push('');
    lines.push(`**Provider:** ${m.provider} | **Type:** ${m.type === 'proprietary' ? 'Proprietary' : 'Open Source'} | **Released:** ${m.releaseDate} | **Context:** ${m.contextWindow}`);
    lines.push('');

    // Pricing
    lines.push('## Pricing');
    lines.push('');
    lines.push(`| Input | Output |`);
    lines.push(`|-------|--------|`);
    lines.push(`| ${m.pricing.input} | ${m.pricing.output} |`);
    if (m.pricing.note) lines.push(`\n*${m.pricing.note}*`);
    lines.push('');

    // Benchmarks
    lines.push('## Benchmarks');
    lines.push('');
    lines.push(`| Category | Score |`);
    lines.push(`|----------|-------|`);
    lines.push(`| Reasoning | ${m.benchmarks.reasoning}/100 |`);
    lines.push(`| Coding | ${m.benchmarks.coding}/100 |`);
    lines.push(`| Math | ${m.benchmarks.math}/100 |`);
    lines.push(`| Writing | ${m.benchmarks.writing}/100 |`);
    lines.push(`| Multilingual | ${m.benchmarks.multilingual}/100 |`);
    lines.push(`| Speed | ${m.benchmarks.speed}/100 |`);
    lines.push('');

    // Strengths & Weaknesses
    lines.push('## Strengths');
    lines.push('');
    for (const s of m.strengths) lines.push(`- ${s}`);
    lines.push('');
    lines.push('## Weaknesses');
    lines.push('');
    for (const w of m.weaknesses) lines.push(`- ${w}`);
    lines.push('');

    // Best For
    lines.push('## Best For');
    lines.push('');
    for (const b of m.bestFor) lines.push(`- ${b}`);
    lines.push('');

    // Hardware (open-source)
    if (m.hardwareRequirements) {
      lines.push('## Hardware Requirements');
      lines.push('');
      lines.push(m.hardwareRequirements);
      lines.push('');
    }

    // Parameters
    if (m.parameters) {
      lines.push('## Parameters');
      lines.push('');
      lines.push(m.parameters);
      lines.push('');
    }

    // Links
    lines.push('## Links');
    lines.push('');
    lines.push(`- [Website](${m.website})`);
    lines.push('');

    writeFile(path.join(CONTENT_DIR, 'models', `${m.id}.md`), lines.join('\n'));
  }

  // Models index
  const indexLines: string[] = [
    '---',
    'title: "AI Models"',
    'type: index',
    'description: "Comprehensive comparison of 33+ AI models — proprietary and open source — with benchmarks, pricing, and use-case recommendations."',
    `last_updated: "2026-04-10"`,
    '---',
    '',
    '# AI Models',
    '',
    'Comprehensive comparison of current AI models with benchmarks, pricing, and recommendations.',
    '',
    '## Proprietary Models',
    '',
    '| Model | Provider | Context | Reasoning | Coding | Pricing (input) |',
    '|-------|----------|---------|-----------|--------|-----------------|',
  ];
  for (const m of models.filter(m => m.type === 'proprietary')) {
    indexLines.push(`| [${m.name}](${m.id}.md) | ${m.provider} | ${m.contextWindow} | ${m.benchmarks.reasoning} | ${m.benchmarks.coding} | ${m.pricing.input} |`);
  }
  indexLines.push('');
  indexLines.push('## Open Source Models');
  indexLines.push('');
  indexLines.push('| Model | Provider | Parameters | Context | Reasoning | Coding | License |');
  indexLines.push('|-------|----------|------------|---------|-----------|--------|---------|');
  for (const m of models.filter(m => m.type === 'open-source')) {
    indexLines.push(`| [${m.name}](${m.id}.md) | ${m.provider} | ${m.parameters || 'N/A'} | ${m.contextWindow} | ${m.benchmarks.reasoning} | ${m.benchmarks.coding} | ${m.license} |`);
  }
  indexLines.push('');

  writeFile(path.join(CONTENT_DIR, 'models', '_index.md'), indexLines.join('\n'));
}

// ─── AGENTS ──────────────────────────────────────────────

function convertAgents() {
  console.log('\nConverting agents...');

  for (const a of agentPlatforms) {
    const lines: string[] = [
      '---',
      `title: ${y(a.name)}`,
      'type: agent',
      `id: ${y(a.id)}`,
      `category: ${y(a.category)}`,
      `category_label: ${y(categoryLabels[a.category])}`,
      `description: ${y(a.description)}`,
      `last_updated: "2026-04-10"`,
      `website: ${y(a.website)}`,
    ];
    if (a.github) lines.push(`github: ${y(a.github)}`);
    if (a.stars) lines.push(`stars: ${y(a.stars)}`);
    lines.push(`license: ${y(a.license)}`);
    lines.push(`pricing: ${y(a.pricing)}`);
    lines.push('languages:');
    lines.push(yamlList(a.languages, 0));
    lines.push('tags:');
    lines.push(yamlList([a.category, ...a.languages.map(l => l.toLowerCase())], 0));
    lines.push('best_for:');
    lines.push(yamlList(a.bestFor, 0));
    lines.push('---');
    lines.push('');
    lines.push(`# ${a.name}`);
    lines.push('');
    lines.push(`> ${a.description}`);
    lines.push('');
    lines.push(`**Category:** ${categoryLabels[a.category]} | **License:** ${a.license} | **Pricing:** ${a.pricing}`);
    lines.push('');

    lines.push('## Key Features');
    lines.push('');
    for (const f of a.keyFeatures) lines.push(`- ${f}`);
    lines.push('');

    lines.push('## Best For');
    lines.push('');
    for (const b of a.bestFor) lines.push(`- ${b}`);
    lines.push('');

    lines.push('## Languages');
    lines.push('');
    for (const l of a.languages) lines.push(`- ${l}`);
    lines.push('');

    lines.push('## Links');
    lines.push('');
    lines.push(`- [Website](${a.website})`);
    if (a.github) lines.push(`- [GitHub](${a.github})${a.stars ? ` (${a.stars} stars)` : ''}`);
    lines.push('');

    writeFile(path.join(CONTENT_DIR, 'agents', `${a.id}.md`), lines.join('\n'));
  }

  // Agents index
  const indexLines: string[] = [
    '---',
    'title: "AI Agent Platforms"',
    'type: index',
    'description: "Directory of AI agent platforms — personal agents, developer frameworks, orchestration tools, coding agents, and no-code builders."',
    `last_updated: "2026-04-10"`,
    '---',
    '',
    '# AI Agent Platforms',
    '',
    'Directory of AI agent platforms and frameworks for building autonomous AI systems.',
    '',
  ];

  const cats = ['personal-agent', 'dev-framework', 'orchestration', 'coding-agent', 'no-code'] as const;
  for (const cat of cats) {
    const agents = agentPlatforms.filter(a => a.category === cat);
    if (agents.length === 0) continue;
    indexLines.push(`## ${categoryLabels[cat]}`);
    indexLines.push('');
    indexLines.push('| Platform | License | Pricing | Languages |');
    indexLines.push('|----------|---------|---------|-----------|');
    for (const a of agents) {
      indexLines.push(`| [${a.name}](${a.id}.md) | ${a.license} | ${a.pricing} | ${a.languages.join(', ') || 'N/A'} |`);
    }
    indexLines.push('');
  }

  writeFile(path.join(CONTENT_DIR, 'agents', '_index.md'), indexLines.join('\n'));
}

// ─── GLOSSARY ────────────────────────────────────────────

function convertGlossary() {
  console.log('\nConverting glossary...');

  const lines: string[] = [
    '---',
    'title: "AI Glossary"',
    'type: glossary',
    'description: "Plain-English definitions of 80+ AI and machine learning terms. From AGI to Zero-Shot Learning."',
    `last_updated: "2026-04-10"`,
    '---',
    '',
    '# AI Glossary',
    '',
    'Plain-English definitions of key AI and machine learning terms.',
    '',
  ];

  for (const cat of categories) {
    const terms = glossaryTerms.filter(t => t.category === cat);
    if (terms.length === 0) continue;
    lines.push(`## ${cat}`);
    lines.push('');
    for (const t of terms) {
      lines.push(`### ${t.term}`);
      lines.push('');
      lines.push(t.definition);
      lines.push('');
    }
  }

  writeFile(path.join(CONTENT_DIR, 'glossary', '_index.md'), lines.join('\n'));
}

// ─── TIMELINE ────────────────────────────────────────────

function convertTimeline() {
  console.log('\nConverting timeline...');

  const lines: string[] = [
    '---',
    'title: "AI Timeline"',
    'type: timeline',
    'description: "Chronological history of artificial intelligence from 1950 to 2026 — key research breakthroughs, product launches, milestones, and policy events."',
    `last_updated: "2026-04-10"`,
    '---',
    '',
    '# AI Timeline',
    '',
    'A chronological history of artificial intelligence from 1950 to 2026.',
    '',
  ];

  for (const era of eras) {
    lines.push(`## ${era.name} (${era.startYear}–${era.endYear})`);
    lines.push('');
    lines.push(`*${era.description}*`);
    lines.push('');

    const events = timelineEvents.filter(
      e => e.year >= era.startYear && e.year <= era.endYear
    );

    for (const e of events) {
      const date = e.month
        ? `${e.year}-${String(e.month).padStart(2, '0')}`
        : `${e.year}`;
      const badge = e.category.charAt(0).toUpperCase() + e.category.slice(1);
      lines.push(`### ${date} — ${e.title}`);
      lines.push('');
      lines.push(`*${badge}${e.significance === 'high' ? ' (Major)' : ''}*`);
      lines.push('');
      lines.push(e.description);
      lines.push('');
    }
  }

  writeFile(path.join(CONTENT_DIR, 'timeline', '_index.md'), lines.join('\n'));
}

// ─── BLOG ────────────────────────────────────────────────

function convertBlog() {
  console.log('\nConverting blog posts...');

  for (const post of blogPosts) {
    const markdown = turndown.turndown(post.content.trim());

    const lines: string[] = [
      '---',
      `title: ${y(post.title)}`,
      'type: blog',
      `slug: ${y(post.slug)}`,
      `description: ${y(post.description)}`,
      `date: ${y(post.date)}`,
      `category: ${y(post.category)}`,
      `read_time: ${y(post.readTime)}`,
      `last_updated: ${y(post.date)}`,
      'tags:',
      yamlList(['analysis', 'ai-models', 'agents'], 0),
      '---',
      '',
      `# ${post.title}`,
      '',
      `*${post.date} · ${post.readTime} · ${post.category}*`,
      '',
      markdown,
      '',
    ];

    writeFile(path.join(CONTENT_DIR, 'blog', `${post.slug}.md`), lines.join('\n'));
  }

  // Blog index
  const indexLines: string[] = [
    '---',
    'title: "Blog"',
    'type: index',
    'description: "Analysis, comparisons, and news about AI models, agents, and the evolving AI landscape."',
    `last_updated: "2026-04-10"`,
    '---',
    '',
    '# Blog',
    '',
    '| Date | Title | Category | Read Time |',
    '|------|-------|----------|-----------|',
  ];
  for (const post of blogPosts) {
    indexLines.push(`| ${post.date} | [${post.title}](${post.slug}.md) | ${post.category} | ${post.readTime} |`);
  }
  indexLines.push('');

  writeFile(path.join(CONTENT_DIR, 'blog', '_index.md'), indexLines.join('\n'));
}

// ─── STUB INDEXES ────────────────────────────────────────

function createStubIndexes() {
  console.log('\nCreating stub indexes...');

  writeFile(path.join(CONTENT_DIR, 'api-reference', '_index.md'), [
    '---',
    'title: "API Reference"',
    'type: index',
    'description: "API documentation for major AI model providers — OpenAI, Anthropic, Google, and more."',
    'last_updated: "2026-04-10"',
    '---',
    '',
    '# API Reference',
    '',
    'API documentation and quick-start guides for major AI model providers.',
    '',
    '*Coming soon — structured API reference for OpenAI, Anthropic, Google, and open-source model APIs.*',
    '',
  ].join('\n'));

  writeFile(path.join(CONTENT_DIR, 'pricing', '_index.md'), [
    '---',
    'title: "AI Model Pricing"',
    'type: index',
    'description: "Up-to-date pricing comparison for AI model APIs — input/output token costs, free tiers, and subscription plans."',
    'last_updated: "2026-04-10"',
    '---',
    '',
    '# AI Model Pricing',
    '',
    'Up-to-date pricing comparison for AI model APIs.',
    '',
    '## Proprietary Models',
    '',
    '| Model | Provider | Input | Output | Free Tier | Notes |',
    '|-------|----------|-------|--------|-----------|-------|',
    ...models.filter(m => m.type === 'proprietary').map(m =>
      `| ${m.name} | ${m.provider} | ${m.pricing.input} | ${m.pricing.output} | ${m.pricing.free ? 'Yes' : 'No'} | ${m.pricing.note || ''} |`
    ),
    '',
    '## Open Source Models',
    '',
    '| Model | Provider | Self-Hosted | API Pricing | License |',
    '|-------|----------|-------------|-------------|---------|',
    ...models.filter(m => m.type === 'open-source').map(m =>
      `| ${m.name} | ${m.provider} | Free | ${m.pricing.free ? 'Free / ' : ''}${m.pricing.input} | ${m.license} |`
    ),
    '',
    '*Prices as of April 2026. Check provider websites for current rates.*',
    '',
  ].join('\n'));

  writeFile(path.join(CONTENT_DIR, 'prompt-patterns', '_index.md'), [
    '---',
    'title: "Prompt Patterns"',
    'type: index',
    'description: "Reusable prompt patterns and templates for common AI tasks — writing, coding, analysis, research, and more."',
    'last_updated: "2026-04-10"',
    '---',
    '',
    '# Prompt Patterns',
    '',
    'Reusable prompt patterns and templates for common AI tasks.',
    '',
    '*Coming soon — a structured library of prompt patterns organized by task type.*',
    '',
  ].join('\n'));
}

// ─── MASTER INDEX ────────────────────────────────────────

function createMasterIndex() {
  console.log('\nCreating master index...');

  writeFile(path.join(CONTENT_DIR, '_index.md'), [
    '---',
    'title: "AI Future Ready"',
    'type: index',
    'description: "Comprehensive AI reference — models, agents, glossary, timeline, guides, use cases, and more. Designed for AI agents and humans alike."',
    'last_updated: "2026-04-10"',
    '---',
    '',
    '# AI Future Ready',
    '',
    'Comprehensive, structured reference for the AI landscape. Every page is pure markdown with YAML frontmatter.',
    '',
    '## Content',
    '',
    `- [Models](models/_index.md) — ${models.length} AI models with benchmarks, pricing, strengths, and recommendations`,
    `- [Agents](agents/_index.md) — ${agentPlatforms.length} agent platforms and frameworks`,
    `- [Glossary](glossary/_index.md) — ${glossaryTerms.length} AI terms defined in plain English`,
    `- [Timeline](timeline/_index.md) — ${timelineEvents.length} events from 1950 to 2026`,
    '- [Guides](guides/_index.md) — Getting started with AI and prompt engineering',
    '- [Use Cases](use-cases/_index.md) — AI for writing, coding, business, education, research, and images',
    `- [Blog](blog/_index.md) — ${blogPosts.length} articles on AI trends and analysis`,
    '- [Pricing](pricing/_index.md) — Up-to-date model pricing comparison',
    '- [API Reference](api-reference/_index.md) — API docs for major providers',
    '- [Prompt Patterns](prompt-patterns/_index.md) — Reusable prompt templates',
    '',
    '## Access',
    '',
    '- **Humans:** Visit [ai-future-ready.com](https://ai-future-ready.com) for styled pages',
    '- **Agents:** Fetch raw markdown at `/content/[path].md`',
    '- **Discovery:** See [llms.txt](/llms.txt) for a machine-readable index',
    '',
    '## About',
    '',
    'AI Future Ready is a reference site designed for both humans and AI agents.',
    'All content is pure markdown with structured YAML frontmatter.',
    'No JavaScript required to access the information.',
    '',
    `Last updated: 2026-04-10`,
    '',
  ].join('\n'));
}

// ─── RUN ─────────────────────────────────────────────────

console.log('Converting TypeScript data to markdown...\n');

convertModels();
convertAgents();
convertGlossary();
convertTimeline();
convertBlog();
createStubIndexes();
createMasterIndex();

console.log('\nDone! Generated markdown files in content/');
