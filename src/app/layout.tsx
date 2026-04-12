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
      "AI Future Ready — The Agent-Ready Web",
    template: "%s | AI Future Ready",
  },
  description:
    "A working demonstration of the agent-ready web. Structured AI reference built for both humans and AI agents — raw markdown, YAML metadata, JSON APIs, and machine-readable discovery.",
  authors: [{ name: "AI Future Ready" }],
  creator: "AI Future Ready",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aifutureready.com",
    siteName: "AI Future Ready",
    title: "AI Future Ready — The Agent-Ready Web",
    description:
      "The web wasn't built for AI agents. This site was. Structured content, machine-readable metadata, and dual-audience design.",
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
  { href: "/agents", label: "Agents" },
  { href: "/comparisons", label: "Comparisons" },
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
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 text-sm text-neutral-500 font-mono space-y-2">
            <p>
              Agent access:{" "}
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
              </Link>{" "}
              &middot;{" "}
              <a
                href="/api/v1/index.json"
                className="text-white hover:text-neutral-400 hover:underline"
              >
                api
              </a>
            </p>
            <p>
              <Link
                href="/standard"
                className="text-neutral-500 hover:text-white hover:underline"
              >
                standard
              </Link>{" "}
              &middot;{" "}
              <Link
                href="/checklist"
                className="text-neutral-500 hover:text-white hover:underline"
              >
                checklist
              </Link>{" "}
              &middot;{" "}
              <a
                href="mailto:brian@aifutureready.com"
                className="text-neutral-500 hover:text-white hover:underline"
              >
                contact
              </a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
