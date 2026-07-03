import searchData from "@/lib/search-data.json";
import { corsPreflightResponse } from "@/lib/api-headers";

type SearchEntry = {
  title: string;
  description?: string;
  section?: string;
  id?: string;
  type?: string;
  href?: string;
  mdPath?: string;
  apiPath?: string;
  provider?: string;
  tags?: string[];
  last_updated?: string;
  last_verified?: string;
  verification_status?: string;
  content_hash?: string;
};

const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 50;

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

function scoreEntry(entry: SearchEntry, terms: string[]): number {
  const title = normalize(entry.title ?? "");
  const description = normalize(entry.description ?? "");
  const id = normalize(entry.id ?? "");
  const provider = normalize(entry.provider ?? "");
  const section = normalize(entry.section ?? "");
  const tags = (entry.tags ?? []).map(normalize);

  let score = 0;
  for (const term of terms) {
    let termScore = 0;
    if (title === term) termScore += 15;
    else if (title.includes(term)) termScore += 10;
    if (id === term) termScore += 8;
    else if (id.includes(term)) termScore += 4;
    if (tags.includes(term)) termScore += 6;
    else if (tags.some((tag) => tag.includes(term))) termScore += 3;
    if (provider.includes(term)) termScore += 4;
    if (description.includes(term)) termScore += 2;
    if (section.includes(term)) termScore += 1;

    // Every term must match somewhere, otherwise the entry is out.
    if (termScore === 0) return 0;
    score += termScore;
  }
  return score;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q")?.trim() ?? "";
  const type = url.searchParams.get("type")?.trim() ?? "";
  const rawLimit = Number(url.searchParams.get("limit"));
  const limit = Number.isFinite(rawLimit) && rawLimit > 0
    ? Math.min(Math.floor(rawLimit), MAX_LIMIT)
    : DEFAULT_LIMIT;

  const entries = searchData as SearchEntry[];

  if (!q) {
    return Response.json(
      {
        type: "search",
        error: "Missing required query parameter: q",
        usage: "/api/v1/search.json?q=cheap+coding+model&type=model&limit=10",
        available_params: ["q", "type", "limit"],
        available_types: [...new Set(entries.map((e) => e.type).filter(Boolean))],
        index_size: entries.length,
        static_index: "/search-index.json",
      },
      { status: 400 }
    );
  }

  const terms = normalize(q).split(/\s+/).filter(Boolean);

  const results = entries
    .filter((entry) => !type || entry.type === type)
    .map((entry) => ({ entry, score: scoreEntry(entry, terms) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title))
    .slice(0, limit)
    .map(({ entry, score }) => ({ score, ...entry }));

  return Response.json({
    type: "search",
    query: { q, type: type || null, limit },
    index_size: entries.length,
    count: results.length,
    results,
    static_index: "/search-index.json",
  });
}

export function OPTIONS() {
  return corsPreflightResponse();
}
