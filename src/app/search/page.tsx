import type { Metadata } from "next";
import { Suspense } from "react";
import SearchClient from "@/components/SearchClient";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Search",
  description: "Search across all AI models, agents, guides, and content.",
  path: "/search",
});

export default function SearchPage() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-2">Search</h1>
      <Suspense
        fallback={
          <p className="text-neutral-500 font-mono text-sm">
            Loading search...
          </p>
        }
      >
        <SearchClient />
      </Suspense>
    </div>
  );
}
