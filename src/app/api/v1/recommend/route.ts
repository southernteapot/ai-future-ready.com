import { NextResponse } from "next/server";

/**
 * GET /api/v1/recommend?task=coding&budget=cheap&type=open-source
 *
 * Reads from pre-built recommend.json and filters/sorts.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const task = searchParams.get("task") || "coding";
  const budget = searchParams.get("budget");
  const modelType = searchParams.get("type");
  const limit = Math.min(parseInt(searchParams.get("limit") || "5", 10), 20);

  const base = origin || "https://aifutureready.com";
  const res = await fetch(`${base}/api/v1/recommend.json`);
  if (!res.ok) {
    return NextResponse.json({ error: "Recommendation data not available" }, { status: 500 });
  }

  const allData = await res.json() as Record<string, Array<Record<string, unknown>>>;
  let results = allData[task] || allData["coding"] || [];

  // Filter by budget
  if (budget === "free") {
    results = results.filter((m) => m.free === true);
  } else if (budget === "cheap") {
    results = results.filter((m) => {
      if (m.free) return true;
      const priceMatch = String((m.pricing as Record<string, string>)?.input || "").match(/\$([\d.]+)/);
      return priceMatch && parseFloat(priceMatch[1]) <= 3;
    });
  }

  // Filter by model type
  if (modelType && modelType !== "any") {
    results = results.filter((m) => m.model_type === modelType);
  }

  return NextResponse.json({
    query: { task, budget, type: modelType, limit },
    count: Math.min(results.length, limit),
    recommendations: results.slice(0, limit),
  });
}
