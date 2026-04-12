import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import Link from "next/link";
import MobileNav from "@/components/MobileNav";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aifutureready.com"),
  title: {
    default:
      "AI Future Ready — Comprehensive AI Reference for Humans and Agents",
    template: "%s | AI Future Ready",
  },
  description:
    "Comprehensive AI reference — models, agents, glossary, timeline, guides, and more. Pure markdown, structured data, designed for AI agents and humans alike.",
  authors: [{ name: "AI Future Ready" }],
  creator: "AI Future Ready",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aifutureready.com",
    siteName: "AI Future Ready",
    title: "AI Future Ready — Comprehensive AI Reference",
    description:
      "Compare AI models, explore agent platforms, learn prompt engineering. Pure markdown, structured for humans and agents.",
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
  { href: "/models", label: "Models" },
  { href: "/agents", label: "Agents" },
  { href: "/guides", label: "Guides" },
  { href: "/use-cases", label: "Use Cases" },
  { href: "/glossary", label: "Glossary" },
  { href: "/timeline", label: "Timeline" },
  { href: "/blog", label: "Blog" },
  { href: "/search", label: "Search" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {/* Header */}
        <header className="border-b border-neutral-800">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
            <Link href="/" className="font-bold text-sm text-white font-mono">
              ~/ai-future-ready
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm font-mono">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  {item.label.toLowerCase()}
                </Link>
              ))}
            </nav>
            <MobileNav />
          </div>
        </header>

        {/* Main */}
        <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-8 w-full">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-neutral-800 mt-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 text-sm text-neutral-500 font-mono">
            <p>
              Designed for AI agents. Raw markdown at{" "}
              <Link
                href="/content/"
                className="text-white hover:text-neutral-400 hover:underline"
              >
                /content/
              </Link>{" "}
              &middot;{" "}
              <Link
                href="/llms.txt"
                className="text-white hover:text-neutral-400 hover:underline"
              >
                llms.txt
              </Link>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
