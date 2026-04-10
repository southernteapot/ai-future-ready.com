import Link from 'next/link';

const footerSections = [
  {
    title: 'Learn',
    links: [
      { href: '/guides/getting-started', label: 'Getting Started' },
      { href: '/guides/prompting', label: 'Prompt Engineering' },
      { href: '/glossary', label: 'AI Glossary' },
      { href: '/timeline', label: 'AI Timeline' },
    ],
  },
  {
    title: 'Explore',
    links: [
      { href: '/models', label: 'Compare AI Models' },
      { href: '/agents', label: 'AI Agents' },
      { href: '/use-cases', label: 'Use Cases' },
      { href: '/tutorials', label: 'Tutorials' },
      { href: '/deep-dives', label: 'Deep Dives' },
      { href: '/blog', label: 'Blog' },
    ],
  },
  {
    title: 'Tools',
    links: [
      { href: '/tools/quiz', label: 'Find Your AI Tool' },
      { href: '/tools/prompts', label: 'Prompt Library' },
      { href: '/tools/compare', label: 'Compare Tools' },
    ],
  },
  {
    title: 'More',
    links: [
      { href: '/about', label: 'About' },
      { href: 'https://airegready.com', label: 'AI Regulation Guide' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-card-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-sm text-foreground mb-3">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted hover:text-primary transition-colors"
                      {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-card-border flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md hero-gradient flex items-center justify-center">
              <span className="text-white font-bold text-xs">AI</span>
            </div>
            <span className="font-semibold text-sm">AI Future Ready</span>
          </div>
          <p className="text-sm text-muted">
            &copy; {new Date().getFullYear()} AI Future Ready. Your guide to the AI-powered future.
          </p>
        </div>
      </div>
    </footer>
  );
}
