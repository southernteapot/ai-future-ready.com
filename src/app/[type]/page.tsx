import { getIndex, getContentTypes } from "@/lib/content";
import { renderMarkdown } from "@/lib/markdown";
import { generateJsonLd } from "@/lib/jsonld";
import ContentView from "@/components/ContentView";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Params = { type: string };

export async function generateStaticParams(): Promise<Params[]> {
  return getContentTypes().map((type) => ({ type }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { type } = await params;
  const index = getIndex(type);
  if (!index) return {};
  return {
    title: index.meta.title,
    description: index.meta.description,
  };
}

export default async function TypeIndexPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { type } = await params;
  const index = getIndex(type);
  if (!index) notFound();

  const html = await renderMarkdown(index.content);
  const jsonLd = generateJsonLd(index.meta, `/${type}`);

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <ContentView
        raw={index.raw}
        html={html}
        mdPath={`/content/${type}/_index.md`}
      />
    </>
  );
}
