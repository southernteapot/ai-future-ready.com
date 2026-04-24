import { getIndex, getContentTypes } from "@/lib/content";
import { buildContentMetadata } from "@/lib/metadata";
import { generateJsonLd } from "@/lib/jsonld";
import ContentView from "@/components/ContentView";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const dynamic = "force-static";

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
  return buildContentMetadata(index.meta, `/${type}`);
}

export default async function TypeIndexPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { type } = await params;
  const index = getIndex(type);
  if (!index) notFound();

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
        mdPath={`/content/${type}/_index.md`}
      />
    </>
  );
}
