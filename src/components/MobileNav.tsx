"use client";

import { useState } from "react";
import Link from "next/link";

const NAV_ITEMS = [
  { href: "/models", label: "Models" },
  { href: "/agents", label: "Agents" },
  { href: "/guides", label: "Guides" },
  { href: "/use-cases", label: "Use Cases" },
  { href: "/glossary", label: "Glossary" },
  { href: "/timeline", label: "Timeline" },
  { href: "/blog", label: "Blog" },
  { href: "/search", label: "Search" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="p-1.5 text-slate-500 hover:text-slate-800 transition-colors"
        aria-label="Toggle menu"
      >
        {open ? (
          // X icon
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          // Hamburger icon
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {open && (
        <nav className="absolute left-0 right-0 top-full bg-white border-b border-slate-200 shadow-sm z-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex flex-col gap-2">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-1.5 text-sm text-slate-600 hover:text-indigo-600 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </div>
  );
}
