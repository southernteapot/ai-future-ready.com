import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import {
  FEED_ALTERNATE_TYPES,
  OPEN_GRAPH_IMAGE,
  TWITTER_IMAGE,
} from "@/lib/metadata";
import ModeToggle from "@/components/ModeToggle";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "AI Future Ready — The Agent-Ready Web",
    template: "%s | AI Future Ready",
  },
  description:
    "A working demonstration of the agent-ready web. Structured AI reference built for both humans and AI agents — raw markdown, YAML metadata, JSON APIs, and machine-readable discovery.",
  authors: [{ name: "AI Future Ready" }],
  creator: "AI Future Ready",
  alternates: {
    types: FEED_ALTERNATE_TYPES,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "AI Future Ready",
    title: "AI Future Ready — The Agent-Ready Web",
    description:
      "The web wasn't built for AI agents. This site was. Structured content, machine-readable metadata, and dual-audience design.",
    images: [OPEN_GRAPH_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Future Ready — The Agent-Ready Web",
    description:
      "The web wasn't built for AI agents. This site was. Structured content, machine-readable metadata, and dual-audience design.",
    images: [TWITTER_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const NAV_ITEMS = [
  { href: "/standard", label: "Standard" },
  { href: "/checklist", label: "Checklist" },
  { href: "/models", label: "Models" },
  { href: "/providers", label: "Providers" },
  { href: "/agents", label: "Agents" },
  { href: "/guides", label: "Guides" },
  { href: "/comparisons", label: "Comparisons" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/search", label: "Search" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const VIEW_MODE_INIT_SCRIPT = `(() => {
  try {
    const params = new URLSearchParams(window.location.search);
    const queryMode = params.get("mode");
    const storedMode = window.localStorage.getItem("ai-future-ready:view-mode");
    const mode = queryMode === "human" || queryMode === "agent" ? queryMode : storedMode === "human" ? "human" : "agent";
    document.documentElement.dataset.viewMode = mode;
  } catch {
    document.documentElement.dataset.viewMode = "agent";
  }
})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-view-mode="agent" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: VIEW_MODE_INIT_SCRIPT }} />
        <div className="site-shell">
          <header className="site-header">
            <p className="site-brand">
              <span className="agent-marker"># </span>
              <Link href="/">AI Future Ready</Link>
              <span className="human-brand-note">Agent-readable AI reference</span>
            </p>
            <div className="site-controls">
              <ModeToggle />
              <nav className="site-nav" aria-label="Main navigation">
                {NAV_ITEMS.map((item) => (
                  <span key={item.href}>
                    [<Link href={item.href}>{item.label.toLowerCase()}</Link>]
                  </span>
                ))}
              </nav>
            </div>
          </header>

          <main className="markdown-page">{children}</main>

          <footer className="site-footer">
            <p>---</p>
            <p>
              agent access: <Link href="/content/_index.md">/content/_index.md</Link>{" "}
              <Link href="/llms.txt">llms.txt</Link>{" "}
              <Link href="/api/v1/index.json">api</Link>{" "}
              <Link href="/feed.json">feed</Link>{" "}
              <Link href="/mcp">mcp</Link>
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
