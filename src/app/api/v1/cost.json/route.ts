import modelsData from "@/lib/models-data.json";

type Pricing = {
  free?: boolean;
  input?: string;
  output?: string;
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
  availability_status?: string;
  deprecated?: boolean;
  pricing_confidence?: string;
  pricing?: Pricing;
  html_url?: string;
  api_url?: string;
  markdown_url?: string;
};

type ModelsData = {
  generated_at?: string;
  count?: number;
  items: ModelSummary[];
};

type TokenField =
  | "input_tokens"
  | "output_tokens"
  | "cache_read_tokens"
  | "cache_write_tokens"
  | "cache_write_5m_tokens"
  | "cache_write_1h_tokens"
  | "batch_input_tokens"
  | "batch_output_tokens"
  | "long_context_input_tokens"
  | "long_context_output_tokens";

type CostQuery = Record<TokenField, number> & {
  include_unpriced: boolean;
  limit: number | null;
};

type PriceField = keyof Pick<
  Pricing,
  | "input_per_1m"
  | "output_per_1m"
  | "cache_read_per_1m"
  | "cache_write_per_1m"
  | "cache_write_5m_per_1m"
  | "cache_write_1h_per_1m"
  | "batch_input_per_1m"
  | "batch_output_per_1m"
  | "long_context_input_per_1m"
  | "long_context_output_per_1m"
>;

type TokenComponent = {
  key: string;
  tokenField: TokenField;
  priceFields: readonly PriceField[];
  textFallback?: "input" | "output";
};

type ParsedRequest =
  | { ok: true; query: CostQuery }
  | { ok: false; error: string; message: string; fields?: Record<string, string> };

const TOKEN_COMPONENTS: readonly TokenComponent[] = [
  {
    key: "input",
    tokenField: "input_tokens",
    priceFields: ["input_per_1m"],
    textFallback: "input",
  },
  {
    key: "output",
    tokenField: "output_tokens",
    priceFields: ["output_per_1m"],
    textFallback: "output",
  },
  {
    key: "cache_read",
    tokenField: "cache_read_tokens",
    priceFields: ["cache_read_per_1m"],
  },
  {
    key: "cache_write",
    tokenField: "cache_write_tokens",
    priceFields: ["cache_write_per_1m", "cache_write_5m_per_1m"],
  },
  {
    key: "cache_write_5m",
    tokenField: "cache_write_5m_tokens",
    priceFields: ["cache_write_5m_per_1m"],
  },
  {
    key: "cache_write_1h",
    tokenField: "cache_write_1h_tokens",
    priceFields: ["cache_write_1h_per_1m"],
  },
  {
    key: "batch_input",
    tokenField: "batch_input_tokens",
    priceFields: ["batch_input_per_1m"],
  },
  {
    key: "batch_output",
    tokenField: "batch_output_tokens",
    priceFields: ["batch_output_per_1m"],
  },
  {
    key: "long_context_input",
    tokenField: "long_context_input_tokens",
    priceFields: ["long_context_input_per_1m"],
  },
  {
    key: "long_context_output",
    tokenField: "long_context_output_tokens",
    priceFields: ["long_context_output_per_1m"],
  },
];

const TOKEN_FIELDS = TOKEN_COMPONENTS.map((component) => component.tokenField);
const DEFAULT_LIMIT = 100;
const MAX_LIMIT = 500;

function parseUsd(value: string | undefined): number | null {
  if (!value) return null;
  if (/free/i.test(value)) return 0;

  const match = value.match(/\$([0-9]+(?:\.[0-9]+)?)/);
  return match ? Number(match[1]) : null;
}

function roundUsd(value: number): number {
  return Number(value.toFixed(8));
}

function numberValue(value: unknown): number | null {
  if (value === undefined || value === null || value === "") return 0;
  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
}

function integerValue(value: unknown): number | null {
  if (value === undefined || value === null || value === "") return DEFAULT_LIMIT;
  const parsed = typeof value === "number" ? value : Number(value);
  if (!Number.isInteger(parsed) || parsed < 1) return null;
  return Math.min(parsed, MAX_LIMIT);
}

function booleanValue(value: unknown): boolean | null {
  if (value === undefined || value === null || value === "") return false;
  if (typeof value === "boolean") return value;
  if (/^(true|1|yes)$/i.test(String(value))) return true;
  if (/^(false|0|no)$/i.test(String(value))) return false;
  return null;
}

function sourceFromSearchParams(searchParams: URLSearchParams): Record<string, unknown> {
  return Object.fromEntries(
    [...TOKEN_FIELDS, "include_unpriced", "limit"].map((field) => [
      field,
      searchParams.get(field),
    ])
  );
}

function parseCostRequest(source: Record<string, unknown>): ParsedRequest {
  const fields: Record<string, string> = {};
  const tokens = Object.fromEntries(
    TOKEN_FIELDS.map((field) => {
      const parsed = numberValue(source[field]);
      if (parsed === null) {
        fields[field] = "Must be a non-negative number.";
        return [field, 0];
      }
      return [field, parsed];
    })
  ) as Record<TokenField, number>;

  const includeUnpriced = booleanValue(source.include_unpriced);
  if (includeUnpriced === null) {
    fields.include_unpriced = "Must be true or false.";
  }

  const limit = integerValue(source.limit);
  if (limit === null) {
    fields.limit = `Must be an integer from 1 to ${MAX_LIMIT}.`;
  }

  if (Object.keys(fields).length > 0) {
    return {
      ok: false,
      error: "invalid_request",
      message: "Cost requests require non-negative token counts and valid options.",
      fields,
    };
  }

  const hasTokens = Object.values(tokens).some((value) => value > 0);
  if (!hasTokens) {
    return {
      ok: false,
      error: "missing_tokens",
      message: "Provide at least one token count, such as input_tokens or output_tokens.",
    };
  }

  return {
    ok: true,
    query: {
      ...tokens,
      include_unpriced: includeUnpriced ?? false,
      limit: limit === DEFAULT_LIMIT ? null : limit,
    },
  };
}

function priceFor(model: ModelSummary, component: TokenComponent) {
  const pricing = model.pricing;
  if (!pricing) return null;

  if (pricing.free === true) {
    return { usd_per_1m: 0, source: "pricing.free" };
  }

  for (const field of component.priceFields) {
    const value = pricing[field];
    if (typeof value === "number" && Number.isFinite(value)) {
      return { usd_per_1m: value, source: `pricing.${field}` };
    }
  }

  if (component.textFallback) {
    const parsed = parseUsd(pricing[component.textFallback]);
    if (parsed !== null) {
      return { usd_per_1m: parsed, source: `pricing.${component.textFallback}` };
    }
  }

  return null;
}

function costForModel(model: ModelSummary, query: CostQuery) {
  let total = 0;
  const missing_price_components: string[] = [];
  const components = Object.fromEntries(
    TOKEN_COMPONENTS.map((component) => {
      const tokens = query[component.tokenField];

      if (tokens === 0) {
        return [
          component.key,
          {
            tokens,
            usd_per_1m: null,
            estimated_cost_usd: 0,
            price_source: null,
          },
        ];
      }

      const price = priceFor(model, component);
      if (!price) {
        missing_price_components.push(component.key);
        return [
          component.key,
          {
            tokens,
            usd_per_1m: null,
            estimated_cost_usd: null,
            price_source: null,
          },
        ];
      }

      const estimatedCost = roundUsd((tokens / 1_000_000) * price.usd_per_1m);
      total += estimatedCost;

      return [
        component.key,
        {
          tokens,
          usd_per_1m: price.usd_per_1m,
          estimated_cost_usd: estimatedCost,
          price_source: price.source,
        },
      ];
    })
  );

  const hasCompletePricing = missing_price_components.length === 0;

  return {
    rank: null as number | null,
    slug: model.slug,
    id: model.id,
    title: model.title,
    provider: model.provider ?? null,
    model_type: model.model_type ?? null,
    api_model_id: model.api_model_id ?? null,
    availability_status: model.availability_status ?? null,
    deprecated: model.deprecated === true,
    pricing_confidence: model.pricing_confidence ?? null,
    currency: model.pricing?.currency ?? "USD",
    estimated_cost_usd: hasCompletePricing ? roundUsd(total) : null,
    missing_price_components,
    components,
    html_url: model.html_url ?? null,
    api_url: model.api_url ?? null,
    markdown_url: model.markdown_url ?? null,
  };
}

function rankedCosts(query: CostQuery) {
  const data = modelsData as ModelsData;
  const calculated = data.items.map((model) => costForModel(model, query));
  const priced = calculated.filter((item) => item.estimated_cost_usd !== null);
  const unpriced = calculated.filter((item) => item.estimated_cost_usd === null);
  const items = (query.include_unpriced ? [...priced, ...unpriced] : priced)
    .sort((a, b) => {
      if (a.estimated_cost_usd === null && b.estimated_cost_usd === null) {
        return a.title.localeCompare(b.title);
      }
      if (a.estimated_cost_usd === null) return 1;
      if (b.estimated_cost_usd === null) return -1;
      return a.estimated_cost_usd - b.estimated_cost_usd || a.title.localeCompare(b.title);
    })
    .slice(0, query.limit ?? DEFAULT_LIMIT)
    .map((item, index) => ({ ...item, rank: index + 1 }));

  return {
    type: "model-cost",
    generated_at: data.generated_at ?? null,
    source: "/api/v1/models.json",
    total_models: data.count ?? data.items.length,
    priced_models: priced.length,
    excluded_unpriced_models: query.include_unpriced ? 0 : unpriced.length,
    count: items.length,
    ranked_by: "estimated_cost_usd_ascending",
    note:
      "Uses public per-1M token pricing from model records. Verify official provider pricing before purchase or production routing decisions.",
    query,
    items,
  };
}

function errorResponse(parsed: Extract<ParsedRequest, { ok: false }>) {
  return Response.json(
    {
      error: parsed.error,
      message: parsed.message,
      ...(parsed.fields && { fields: parsed.fields }),
      example: {
        input_tokens: 1_000_000,
        output_tokens: 1_000_000,
      },
    },
    { status: 400 }
  );
}

export async function GET(request: Request) {
  const parsed = parseCostRequest(sourceFromSearchParams(new URL(request.url).searchParams));
  if (!parsed.ok) return errorResponse(parsed);

  return Response.json(rankedCosts(parsed.query));
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json(
      {
        error: "invalid_json",
        message: "POST /api/v1/cost.json requires a JSON request body.",
        example: {
          input_tokens: 1_000_000,
          output_tokens: 1_000_000,
        },
      },
      { status: 400 }
    );
  }

  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return Response.json(
      {
        error: "invalid_request",
        message: "POST /api/v1/cost.json requires a JSON object.",
      },
      { status: 400 }
    );
  }

  const parsed = parseCostRequest(body as Record<string, unknown>);
  if (!parsed.ok) return errorResponse(parsed);

  return Response.json(rankedCosts(parsed.query));
}
