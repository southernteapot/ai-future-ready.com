import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContentView from "@/components/ContentView";
import { getStandaloneContent } from "@/lib/content";
import { generateJsonLd } from "@/lib/jsonld";
import { renderMarkdown } from "@/lib/markdown";

export const dynamic = "force-static";

const SLUG = "compatibility";

export async function generateMetadata(): Promise<Metadata> {
  const item = getStandaloneContent(SLUG);
  if (!item) return {};

  return {
    title: item.meta.title,
    description: item.meta.description,
  };
}

export default async function CompatibilityPage() {
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
      <ContentView raw={item.raw} html={html} mdPath="/content/compatibility.md" />
    </>
  );
}
