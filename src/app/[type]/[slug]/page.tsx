import { getContent, getContentTypes, getSlugs } from "@/lib/content";
import { buildContentMetadata } from "@/lib/metadata";
import { renderMarkdown } from "@/lib/markdown";
import { generateJsonLd } from "@/lib/jsonld";
import ContentView from "@/components/ContentView";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const dynamic = "force-static";

type Params = { type: string; slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const types = getContentTypes();
  const allParams: Params[] = [];
  for (const type of types) {
    for (const slug of getSlugs(type)) {
      allParams.push({ type, slug });
    }
  }
  return allParams;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { type, slug } = await params;
  const item = getContent(type, slug);
  if (!item) return {};
  return buildContentMetadata(item.meta, `/${type}/${slug}`);
}

export default async function ContentPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { type, slug } = await params;
  const item = getContent(type, slug);
  if (!item) notFound();

  const html = await renderMarkdown(item.content);
  const jsonLd = generateJsonLd(item.meta, `/${type}/${slug}`);

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <ContentView
        raw={item.raw}
        html={html}
        mdPath={`/content/${type}/${slug}.md`}
      />
    </>
  );
}
