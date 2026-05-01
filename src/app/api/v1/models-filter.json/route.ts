import modelsData from "@/lib/models-data.json";

type Pricing = {
  free?: boolean;
  input?: string;
  output?: string;
  input_per_1m?: number;
  output_per_1m?: number;
};

type ModelSummary = {
  slug: string;
  provider?: string;
  model_type?: string;
  capabilities?: string[];
  availability_status?: string;
  deprecated?: boolean;
  tool_schema_format?: string;
  context_window?: string;
  pricing?: Pricing;
};

type ModelsData = {
  generated_at?: string;
  count?: number;
  items: ModelSummary[];
};

const AVAILABLE_FILTERS = [
  "capability",
  "provider",
  "availability_status",
  "deprecated",
  "model_type",
  "tool_schema_format",
  "context_min",
  "max_input_price",
  "max_output_price",
  "free",
];

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

function stringValues(searchParams: URLSearchParams, name: string): string[] {
  return searchParams
    .getAll(name)
    .flatMap((value) => value.split(","))
    .map((value) => value.trim())
    .filter(Boolean);
}

function booleanValue(searchParams: URLSearchParams, name: string): boolean | null {
  const value = searchParams.get(name);
  if (value === null) return null;

  if (/^(true|1|yes)$/i.test(value)) return true;
  if (/^(false|0|no)$/i.test(value)) return false;
  return null;
}

function numberValue(searchParams: URLSearchParams, name: string): number | null {
  const value = searchParams.get(name);
  if (value === null || value.trim() === "") return null;

  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
}

function matchesAny(value: string | undefined, requested: string[]): boolean {
  if (requested.length === 0) return true;
  if (!value) return false;

  const normalizedValue = normalize(value);
  return requested.some((item) => normalize(item) === normalizedValue);
}

function hasAllCapabilities(model: ModelSummary, requested: string[]): boolean {
  if (requested.length === 0) return true;
  const capabilities = new Set((model.capabilities ?? []).map(normalize));
  return requested.every((capability) => capabilities.has(normalize(capability)));
}

function parseUsd(value: string | undefined): number | null {
  if (!value) return null;
  if (/free/i.test(value)) return 0;

  const match = value.match(/\$([0-9]+(?:\.[0-9]+)?)/);
  return match ? Number(match[1]) : null;
}

function priceFor(model: ModelSummary, field: "input_per_1m" | "output_per_1m"): number | null {
  const pricing = model.pricing;
  if (!pricing) return null;

  const numeric = pricing[field];
  if (typeof numeric === "number" && Number.isFinite(numeric)) return numeric;
  if (pricing.free === true) return 0;

  return field === "input_per_1m" ? parseUsd(pricing.input) : parseUsd(pricing.output);
}

function parseContextTokens(value: string | undefined): number | null {
  if (!value) return null;

  const matches = value.matchAll(/([0-9]+(?:\.[0-9]+)?)\s*([kmb])?/gi);
  let max: number | null = null;

  for (const match of matches) {
    const amount = Number(match[1]);
    const unit = match[2]?.toLowerCase();
    const multiplier = unit === "b" ? 1_000_000_000 : unit === "m" ? 1_000_000 : unit === "k" ? 1_000 : 1;
    const tokens = amount * multiplier;
    max = max === null ? tokens : Math.max(max, tokens);
  }

  return max;
}

function isFree(model: ModelSummary): boolean {
  if (model.pricing?.free === true) return true;
  const input = priceFor(model, "input_per_1m");
  const output = priceFor(model, "output_per_1m");
  return input === 0 && output === 0;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const data = modelsData as ModelsData;
  const capability = stringValues(searchParams, "capability");
  const provider = stringValues(searchParams, "provider");
  const availabilityStatus = stringValues(searchParams, "availability_status");
  const deprecated = booleanValue(searchParams, "deprecated");
  const modelType = stringValues(searchParams, "model_type");
  const toolSchemaFormat = stringValues(searchParams, "tool_schema_format");
  const contextMin = numberValue(searchParams, "context_min");
  const maxInputPrice = numberValue(searchParams, "max_input_price");
  const maxOutputPrice = numberValue(searchParams, "max_output_price");
  const free = booleanValue(searchParams, "free");

  const items = data.items.filter((model) => {
    if (!hasAllCapabilities(model, capability)) return false;
    if (!matchesAny(model.provider, provider)) return false;
    if (!matchesAny(model.availability_status, availabilityStatus)) return false;
    if (deprecated !== null && (model.deprecated === true) !== deprecated) return false;
    if (!matchesAny(model.model_type, modelType)) return false;
    if (!matchesAny(model.tool_schema_format, toolSchemaFormat)) return false;

    if (contextMin !== null) {
      const contextTokens = parseContextTokens(model.context_window);
      if (contextTokens === null || contextTokens < contextMin) return false;
    }

    if (maxInputPrice !== null) {
      const inputPrice = priceFor(model, "input_per_1m");
      if (inputPrice === null || inputPrice > maxInputPrice) return false;
    }

    if (maxOutputPrice !== null) {
      const outputPrice = priceFor(model, "output_per_1m");
      if (outputPrice === null || outputPrice > maxOutputPrice) return false;
    }

    if (free !== null && isFree(model) !== free) return false;

    return true;
  });

  return Response.json({
    type: "models-filter",
    generated_at: data.generated_at ?? null,
    source: "/api/v1/models.json",
    total: data.count ?? data.items.length,
    count: items.length,
    query: {
      capability,
      provider,
      availability_status: availabilityStatus,
      deprecated,
      model_type: modelType,
      tool_schema_format: toolSchemaFormat,
      context_min: contextMin,
      max_input_price: maxInputPrice,
      max_output_price: maxOutputPrice,
      free,
    },
    available_filters: AVAILABLE_FILTERS,
    items,
  });
}
