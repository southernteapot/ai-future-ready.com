import type { MetadataRoute } from 'next';
import { models } from '@/data/models';
import { blogPosts } from '@/data/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ai-future-ready.com';

  const staticPages = [
    '',
    '/models',
    '/agents',
    '/glossary',
    '/timeline',
    '/guides',
    '/guides/getting-started',
    '/guides/prompting',
    '/use-cases',
    '/use-cases/writing',
    '/use-cases/coding',
    '/use-cases/business',
    '/use-cases/images',
    '/use-cases/research',
    '/use-cases/education',
    '/tutorials',
    '/deep-dives',
    '/tools/quiz',
    '/tools/prompts',
    '/tools/compare',
    '/about',
    '/blog',
    '/search',
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : path.split('/').length <= 2 ? 0.8 : 0.6,
  }));

  const modelEntries: MetadataRoute.Sitemap = models.map((model) => ({
    url: `${baseUrl}/models/${model.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...modelEntries, ...blogEntries];
}
