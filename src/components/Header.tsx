'use client';

import { useState } from 'react';
import Link from 'next/link';

const navItems = [
  {
    label: 'Learn',
    children: [
      { href: '/guides/getting-started', label: 'Getting Started with AI' },
      { href: '/guides/prompting', label: 'Prompt Engineering' },
      { href: '/glossary', label: 'AI Glossary' },
      { href: '/timeline', label: 'AI Timeline' },
    ],
  },
  {
    label: 'Models',
    href: '/models',
  },
  {
    label: 'Use Cases',
    children: [
      { href: '/use-cases', label: 'All Use Cases' },
      { href: '/use-cases/writing', label: 'AI for Writing' },
      { href: '/use-cases/coding', label: 'AI for Coding' },
      { href: '/use-cases/business', label: 'AI for Business' },
      { href: '/use-cases/images', label: 'AI for Images' },
      { href: '/use-cases/research', label: 'AI for Research' },
      { href: '/use-cases/education', label: 'AI for Education' },
    ],
  },
  {
    label: 'Agents',
    href: '/agents',
  },
  {
    label: 'Tutorials',
    href: '/tutorials',
  },
  {
    label: 'Deep Dives',
    href: '/deep-dives',
  },
  {
    label: 'Blog',
    href: '/blog',
  },
  {
    label: 'Tools',
    children: [
      { href: '/tools/quiz', label: 'Find Your AI Tool' },
      { href: '/tools/prompts', label: 'Prompt Library' },
      { href: '/tools/compare', label: 'AI Tool Comparison' },
    ],
  },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-lg border-b border-card-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg hero-gradient flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <span className="font-bold text-lg">
              AI Future <span className="text-primary">Ready</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button className="px-3 py-2 text-sm font-medium text-muted hover:text-foreground transition-colors rounded-lg hover:bg-surface flex items-center gap-1">
                    {item.label}
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openDropdown === item.label && (
                    <div className="absolute top-full left-0 mt-0.5 w-56 bg-card rounded-xl shadow-lg border border-card-border py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-muted hover:text-foreground hover:bg-surface transition-colors"
                          onClick={() => setOpenDropdown(null)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href!}
                  className="px-3 py-2 text-sm font-medium text-muted hover:text-foreground transition-colors rounded-lg hover:bg-surface"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-surface transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-card-border bg-card">
          <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {navItems.map((item) =>
              item.children ? (
                <div key={item.label}>
                  <p className="px-3 py-2 text-xs font-semibold text-muted uppercase tracking-wider">
                    {item.label}
                  </p>
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-3 py-2 pl-6 text-sm text-muted hover:text-foreground hover:bg-surface rounded-lg transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href!}
                  className="block px-3 py-2 text-sm font-medium text-muted hover:text-foreground hover:bg-surface rounded-lg transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
