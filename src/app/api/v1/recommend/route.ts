import { NextResponse } from "next/server";
import { getAllContent } from "@/lib/content";

/**
 * GET /api/v1/recommend?task=coding&budget=cheap&type=open-source&context=large
 *
 * Returns ranked model recommendations based on query parameters.
 * Parameters (all optional):
 *   task     - coding | writing | math | reasoning | multilingual | speed
 *   budget   - free | cheap | moderate | any
 *   type     - open-source | proprietary | any
 *   context  - small | medium | large  (context window needs)
 *   limit    - number of results (default 5)
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const task = searchParams.get("task");
  const budget = searchParams.get("budget");
  const modelType = searchParams.get("type");
  const context = searchParams.get("context");
  const limit = Math.min(parseInt(searchParams.get("limit") || "5", 10), 20);

  const models = getAllContent("models");

  // Score each model
  const scored = models.map((item) => {
    const meta = item.meta;
    const benchmarks = (meta.benchmarks || {}) as Record<string, number>;
    const pricing = (meta.pricing || {}) as Record<string, string>;
    const isFree = (pricing.free as unknown) === true;

    let score = 0;

    // Task scoring — boost the relevant benchmark
    if (task && benchmarks[task]) {
      score += benchmarks[task] * 2;
    } else {
      // No task specified — use average of all benchmarks
      const vals = Object.values(benchmarks).filter(
        (v) => typeof v === "number"
      );
      if (vals.length > 0) {
        score += vals.reduce((a, b) => a + b, 0) / vals.length;
      }
    }

    // Budget filtering
    if (budget === "free" && !isFree) {
      score -= 500;
    } else if (budget === "cheap") {
      if (isFree) {
        score += 30;
      } else {
        // Parse input price
        const priceMatch = pricing.input?.match(/\$([\d.]+)/);
        if (priceMatch) {
          const price = parseFloat(priceMatch[1]);
          if (price <= 1) score += 25;
          else if (price <= 3) score += 15;
          else if (price <= 5) score += 5;
          else score -= 10;
        }
      }
    }

    // Model type filtering
    if (modelType === "open-source" && meta.model_type !== "open-source") {
      score -= 500;
    } else if (modelType === "proprietary" && meta.model_type !== "proprietary") {
      score -= 500;
    }

    // Context window scoring
    if (context) {
      const ctxStr = String(meta.context_window || "");
      const ctxTokens = parseContextTokens(ctxStr);

      if (context === "large" && ctxTokens >= 500000) {
        score += 20;
      } else if (context === "large" && ctxTokens < 128000) {
        score -= 20;
      } else if (context === "small") {
        // Smaller context is fine, no penalty
      }
    }

    return {
      slug: item.slug,
      title: meta.title,
      description: meta.description,
      provider: meta.provider,
      model_type: meta.model_type,
      context_window: meta.context_window,
      pricing: { input: pricing.input, output: pricing.output },
      task_score: task ? benchmarks[task] || null : null,
      score: Math.round(score),
      html_url: `/models/${item.slug}`,
      markdown_url: `/content/models/${item.slug}.md`,
    };
  });

  // Filter out heavily penalized models and sort by score
  const results = scored
    .filter((m) => m.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return NextResponse.json({
    query: { task, budget, type: modelType, context, limit },
    count: results.length,
    recommendations: results,
  });
}

function parseContextTokens(s: string): number {
  const m = s.match(/([\d.]+)\s*(M|K)/i);
  if (!m) return 0;
  const num = parseFloat(m[1]);
  const unit = m[2].toUpperCase();
  return unit === "M" ? num * 1_000_000 : num * 1_000;
}
