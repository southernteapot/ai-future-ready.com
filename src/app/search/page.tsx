import type { Metadata } from "next";
import SearchClient from "@/components/SearchClient";

export const metadata: Metadata = {
  title: "Search",
  description: "Search across all AI models, agents, guides, and content.",
};

export default function SearchPage() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-2">Search</h1>
      <SearchClient />
    </div>
  );
}
