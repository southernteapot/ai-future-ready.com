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
      <h1>
        <span className="agent-marker"># </span>Search
      </h1>
      <Suspense fallback={<p>loading search...</p>}>
        <SearchClient />
      </Suspense>
    </div>
  );
}
