import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContentView from "@/components/ContentView";
import { getStandaloneContent } from "@/lib/content";
import { buildContentMetadata } from "@/lib/metadata";
import { generateJsonLd } from "@/lib/jsonld";

export const dynamic = "force-static";

const SLUG = "about";

export async function generateMetadata(): Promise<Metadata> {
  const item = getStandaloneContent(SLUG);
  if (!item) return {};
  return buildContentMetadata(item.meta, `/${SLUG}`);
}

export default async function AboutPage() {
  const item = getStandaloneContent(SLUG);
  if (!item) notFound();

  const jsonLd = generateJsonLd(item.meta, `/${SLUG}`);

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <ContentView raw={item.raw} mdPath="/content/about.md" />
    </>
  );
}
