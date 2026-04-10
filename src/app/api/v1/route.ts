import { NextResponse } from "next/server";
import { getContentTypes, getAllContent, getIndex } from "@/lib/content";

/**
 * GET /api/v1
 *
 * Returns a JSON index of all content. This is the foundation for a
 * future paid API tier — free = raw markdown, paid = structured JSON + MCP.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  // If ?type= is specified, return that content type's items
  if (type) {
    const index = getIndex(type);
    const items = getAllContent(type);
    return NextResponse.json({
      type,
      title: index?.meta.title ?? type,
      description: index?.meta.description ?? "",
      count: items.length,
      items: items.map((item) => ({
        slug: item.slug,
        title: item.meta.title,
        description: item.meta.description,
        last_updated: item.meta.last_updated,
        markdown_url: `/content/${type}/${item.slug}.md`,
        html_url: `/${type}/${item.slug}`,
      })),
    });
  }

  // Otherwise return the full index
  const types = getContentTypes();
  return NextResponse.json({
    name: "AI Future Ready API",
    version: "v1",
    description:
      "Structured JSON API for AI reference data. Raw markdown is freely available at /content/. This API provides structured access.",
    endpoints: {
      index: "/api/v1",
      by_type: "/api/v1?type={type}",
    },
    content_types: types.map((t) => {
      const index = getIndex(t);
      return {
        type: t,
        title: index?.meta.title ?? t,
        description: index?.meta.description ?? "",
        url: `/api/v1?type=${t}`,
      };
    }),
  });
}
