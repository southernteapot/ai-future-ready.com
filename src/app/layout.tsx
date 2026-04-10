import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ai-future-ready.com"),
  title: {
    default: "AI Future Ready — Your Complete Guide to Artificial Intelligence",
    template: "%s | AI Future Ready",
  },
  description:
    "Your comprehensive guide to AI. Compare LLMs, learn prompt engineering, explore use cases, and get future-ready with plain-English guides to artificial intelligence.",
  keywords: [
    "artificial intelligence",
    "AI guide",
    "LLM comparison",
    "ChatGPT",
    "Claude",
    "Gemini",
    "prompt engineering",
    "AI for beginners",
    "AI tools",
    "machine learning",
    "generative AI",
    "AI models",
    "open source AI",
  ],
  authors: [{ name: "AI Future Ready" }],
  creator: "AI Future Ready",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ai-future-ready.com",
    siteName: "AI Future Ready",
    title: "AI Future Ready — Your Complete Guide to Artificial Intelligence",
    description:
      "Compare AI models, learn prompt engineering, explore use cases, and master AI with plain-English guides.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Future Ready — Your Complete Guide to AI",
    description:
      "Compare AI models, learn prompt engineering, explore use cases, and master AI with plain-English guides.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "AI Future Ready",
    url: "https://ai-future-ready.com",
    description:
      "Your comprehensive guide to artificial intelligence. Compare LLMs, learn prompt engineering, and get AI-ready.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://ai-future-ready.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
