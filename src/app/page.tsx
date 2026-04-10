import { getMasterIndex } from "@/lib/content";
import { renderMarkdown } from "@/lib/markdown";
import { generateJsonLd } from "@/lib/jsonld";
import ContentView from "@/components/ContentView";

export default async function HomePage() {
  const index = getMasterIndex();
  if (!index) return <p>No content found.</p>;

  const html = await renderMarkdown(index.content);
  const jsonLd = generateJsonLd(index.meta, "/");

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <ContentView raw={index.raw} html={html} mdPath="/content/_index.md" />
    </>
  );
}
