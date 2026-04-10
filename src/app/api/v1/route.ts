import { NextResponse } from "next/server";

/**
 * GET /api/v1
 * GET /api/v1?type=models
 *
 * Reads from pre-built static JSON files in public/api/v1/.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const type = searchParams.get("type");

  const base = origin || "https://aifutureready.com";
  const file = type ? `${base}/api/v1/${type}.json` : `${base}/api/v1/index.json`;

  const res = await fetch(file);
  if (!res.ok) {
    return NextResponse.json({ error: `Content type "${type}" not found` }, { status: 404 });
  }

  const data = await res.json();
  return NextResponse.json(data);
}
