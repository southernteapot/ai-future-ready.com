import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContentView from "@/components/ContentView";
import { getStandaloneContent } from "@/lib/content";
import { buildContentMetadata } from "@/lib/metadata";
import { generateJsonLd } from "@/lib/jsonld";
import { renderMarkdown } from "@/lib/markdown";

export const dynamic = "force-static";

const SLUG = "mcp";

export async function generateMetadata(): Promise<Metadata> {
  const item = getStandaloneContent(SLUG);
  if (!item) return {};
  return buildContentMetadata(item.meta, `/${SLUG}`);
}

export default async function McpPage() {
  const item = getStandaloneContent(SLUG);
  if (!item) notFound();

  const html = await renderMarkdown(item.content);
  const jsonLd = generateJsonLd(item.meta, `/${SLUG}`);

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <ContentView raw={item.raw} html={html} mdPath="/content/mcp.md" />
    </>
  );
}
