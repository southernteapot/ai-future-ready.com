import modelsData from "@/lib/models-data.json";
import { corsPreflightResponse } from "@/lib/api-headers";

export function OPTIONS() {
  return corsPreflightResponse();
}

type Source = {
  title?: string;
  url?: string;
};

type Pricing = {
  free?: boolean;
  input?: string;
  output?: string;
  note?: string;
  currency?: string;
  input_per_1m?: number;
  output_per_1m?: number;
  cache_read_per_1m?: number;
  cache_write_per_1m?: number;
  cache_write_5m_per_1m?: number;
  cache_write_1h_per_1m?: number;
  batch_input_per_1m?: number;
  batch_output_per_1m?: number;
  long_context_input_per_1m?: number;
  long_context_output_per_1m?: number;
};

type ModelSummary = {
  slug: string;
  id: string;
  title: string;
  provider?: string;
  model_type?: string;
  api_model_id?: string;
  knowledge_cutoff?: string;
  context_window?: string;
  capabilities?: string[];
  availability_status?: string;
  deprecated?: boolean;
  superseded_by?: string;
  variant_of?: string;
  tool_schema_format?: string;
  pricing_confidence?: string;
  model_listing_confidence?: string;
  benchmark_confidence?: string;
  sources?: Source[];
  benchmark_sources?: Source[];
  pricing?: Pricing;
  benchmarks?: Record<string, number>;
  modality?: string[];
  license?: string;
  html_url?: string;
  api_url?: string;
  markdown_url?: string;
};

type ModelsData = {
  generated_at?: string;
  count?: number;
  items: ModelSummary[];
};

type Winner = "a" | "b" | "tie" | null;

const METADATA_FIELDS = [
  "provider",
  "model_type",
  "api_model_id",
  "knowledge_cutoff",
  "availability_status",
  "deprecated",
  "superseded_by",
  "variant_of",
  "tool_schema_format",
  "license",
] as const;

const CONFIDENCE_FIELDS = [
  "pricing_confidence",
  "model_listing_confidence",
  "benchmark_confidence",
] as const;

const PRICING_NUMBER_FIELDS = [
  "input_per_1m",
  "output_per_1m",
  "cache_read_per_1m",
  "cache_write_per_1m",
  "cache_write_5m_per_1m",
  "cache_write_1h_per_1m",
  "batch_input_per_1m",
  "batch_output_per_1m",
  "long_context_input_per_1m",
  "long_context_output_per_1m",
] as const;

const PRICING_TEXT_FIELDS = ["input", "output", "currency", "note", "free"] as const;

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

function modelAliases(model: ModelSummary): string[] {
  return [model.slug, model.id, model.api_model_id, model.title]
    .filter((value): value is string => typeof value === "string" && value.length > 0)
    .map(normalize);
}

function findModel(value: string | null, models: ModelSummary[]): ModelSummary | null {
  if (!value) return null;
  const requested = normalize(value);
  return models.find((model) => modelAliases(model).includes(requested)) ?? null;
}

function compareValue(a: unknown, b: unknown) {
  return {
    a: a ?? null,
    b: b ?? null,
    same: a === b,
  };
}

function numericWinner(a: number | null, b: number | null, higherIsBetter: boolean): Winner {
  if (a === null || b === null) return null;
  if (a === b) return "tie";
  return higherIsBetter ? (a > b ? "a" : "b") : a < b ? "a" : "b";
}

function compareNumber(a: number | null, b: number | null, higherIsBetter: boolean) {
  return {
    a,
    b,
    difference: a !== null && b !== null ? a - b : null,
    winner: numericWinner(a, b, higherIsBetter),
  };
}

function parseUsd(value: string | undefined): number | null {
  if (!value) return null;
  if (/free/i.test(value)) return 0;

  const match = value.match(/\$([0-9]+(?:\.[0-9]+)?)/);
  return match ? Number(match[1]) : null;
}

function priceFor(model: ModelSummary, field: (typeof PRICING_NUMBER_FIELDS)[number]): number | null {
  const pricing = model.pricing;
  if (!pricing) return null;

  const numeric = pricing[field];
  if (typeof numeric === "number" && Number.isFinite(numeric)) return numeric;
  if (pricing.free === true) return 0;
  if (field === "input_per_1m") return parseUsd(pricing.input);
  if (field === "output_per_1m") return parseUsd(pricing.output);
  return null;
}

function parseContextTokens(value: string | undefined): number | null {
  if (!value) return null;

  const matches = value.matchAll(/([0-9]+(?:\.[0-9]+)?)\s*([kmb])?/gi);
  let max: number | null = null;

  for (const match of matches) {
    const amount = Number(match[1]);
    const unit = match[2]?.toLowerCase();
    const multiplier =
      unit === "b" ? 1_000_000_000 : unit === "m" ? 1_000_000 : unit === "k" ? 1_000 : 1;
    const tokens = amount * multiplier;
    max = max === null ? tokens : Math.max(max, tokens);
  }

  return max;
}

function compareObjectFields<T extends readonly string[]>(
  fields: T,
  a: Record<string, unknown>,
  b: Record<string, unknown>
) {
  return Object.fromEntries(fields.map((field) => [field, compareValue(a[field], b[field])]));
}

function capabilityDiff(a: ModelSummary, b: ModelSummary) {
  const aCapabilities = new Set((a.capabilities ?? []).map(normalize));
  const bCapabilities = new Set((b.capabilities ?? []).map(normalize));
  const canonical = new Map<string, string>();

  for (const capability of [...(a.capabilities ?? []), ...(b.capabilities ?? [])]) {
    canonical.set(normalize(capability), capability);
  }

  const shared = [...aCapabilities]
    .filter((capability) => bCapabilities.has(capability))
    .map((capability) => canonical.get(capability) ?? capability)
    .sort();
  const onlyA = [...aCapabilities]
    .filter((capability) => !bCapabilities.has(capability))
    .map((capability) => canonical.get(capability) ?? capability)
    .sort();
  const onlyB = [...bCapabilities]
    .filter((capability) => !aCapabilities.has(capability))
    .map((capability) => canonical.get(capability) ?? capability)
    .sort();

  return {
    shared,
    only_a: onlyA,
    only_b: onlyB,
  };
}

function pricingDiff(a: ModelSummary, b: ModelSummary) {
  return {
    numeric_usd_per_1m: Object.fromEntries(
      PRICING_NUMBER_FIELDS.map((field) => [
        field,
        compareNumber(priceFor(a, field), priceFor(b, field), false),
      ])
    ),
    labels: compareObjectFields(PRICING_TEXT_FIELDS, a.pricing ?? {}, b.pricing ?? {}),
  };
}

function benchmarkDiff(a: ModelSummary, b: ModelSummary) {
  const fields = new Set([...Object.keys(a.benchmarks ?? {}), ...Object.keys(b.benchmarks ?? {})]);
  return Object.fromEntries(
    [...fields].sort().map((field) => [
      field,
      compareNumber(a.benchmarks?.[field] ?? null, b.benchmarks?.[field] ?? null, true),
    ])
  );
}

function sourceSummary(model: ModelSummary) {
  return {
    sources: model.sources ?? [],
    benchmark_sources: model.benchmark_sources ?? [],
    source_count: (model.sources ?? []).length,
    benchmark_source_count: (model.benchmark_sources ?? []).length,
  };
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const data = modelsData as ModelsData;
  const aParam = url.searchParams.get("a");
  const bParam = url.searchParams.get("b");

  if (!aParam || !bParam) {
    return Response.json(
      {
        error: "missing_models",
        message: "Provide both query parameters: a and b.",
        example: "/api/v1/diff.json?a=gpt-5.4&b=claude-opus-4.6",
      },
      { status: 400 }
    );
  }

  const a = findModel(aParam, data.items);
  const b = findModel(bParam, data.items);

  if (!a || !b) {
    return Response.json(
      {
        error: "model_not_found",
        query: { a: aParam, b: bParam },
        found: { a: Boolean(a), b: Boolean(b) },
        available_models: data.items.map((model) => model.slug).sort(),
      },
      { status: 404 }
    );
  }

  const aContextTokens = parseContextTokens(a.context_window);
  const bContextTokens = parseContextTokens(b.context_window);

  return Response.json({
    type: "model-diff",
    generated_at: data.generated_at ?? null,
    source: "/api/v1/models.json",
    query: { a: aParam, b: bParam },
    models: {
      a,
      b,
    },
    metadata: compareObjectFields(METADATA_FIELDS, a, b),
    context_window: {
      label: compareValue(a.context_window, b.context_window),
      tokens: compareNumber(aContextTokens, bContextTokens, true),
    },
    pricing: pricingDiff(a, b),
    benchmarks: benchmarkDiff(a, b),
    capabilities: capabilityDiff(a, b),
    modality: {
      a: a.modality ?? [],
      b: b.modality ?? [],
      same: JSON.stringify(a.modality ?? []) === JSON.stringify(b.modality ?? []),
    },
    confidence: compareObjectFields(CONFIDENCE_FIELDS, a, b),
    sources: {
      a: sourceSummary(a),
      b: sourceSummary(b),
    },
  });
}
