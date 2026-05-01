import fs from "fs";
import path from "path";
import matter from "gray-matter";

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, "content");
const PUBLIC_DIR = path.join(ROOT, "public");
const SRC_DIR = path.join(ROOT, "src");
const STATIC_ROUTES = [
  "/",
  "/search",
  "/score",
  "/mcp",
  "/content/_index.md",
  "/.well-known/ai.json",
  "/llms.txt",
  "/llms-full.txt",
  "/openapi.json",
  "/search-index.json",
  "/api/v1/index.json",
  "/api/v1/openapi.json",
  "/api/v1/schema.json",
  "/api/v1/models-filter.json",
  "/api/v1/diff.json",
  "/api/v1/changes.json",
  "/api/v1/model-verification.json",
  "/api/v1/pricing-snapshots.json",
  "/api/v1/recommend.json",
  "/api/v1/samples/pro-data.json",
  "/feed.json",
  "/feed.xml",
  "/robots.txt",
  "/sitemap.xml",
];
const RECOMMENDATION_TASKS = [
  "coding",
  "writing",
  "math",
  "reasoning",
  "multilingual",
  "speed",
  "research",
  "cheap",
  "local",
  "agentic",
  "images",
  "education",
];
const REQUIRED_FIELDS = ["title", "type", "id", "description", "last_updated"];
const DATE_PATTERN = /^\d{4}(?:-\d{2}(?:-\d{2})?)?$/;

const TYPE_RULES: Record<
  string,
  {
    string?: string[];
    array?: string[];
    object?: string[];
  }
> = {
  model: {
    string: ["provider", "model_type", "context_window", "website", "license"],
    array: ["best_for", "tags"],
    object: ["pricing", "benchmarks"],
  },
  agent: {
    string: ["category", "website", "license", "pricing"],
    array: ["languages", "best_for", "tags"],
  },
  blog: {
    string: ["date"],
    array: ["tags"],
  },
  guide: {
    array: ["tags"],
  },
  comparison: {
    array: ["tags"],
  },
  "prompt-pattern": {
    array: ["tags"],
  },
  "use-case": {
    array: ["tags"],
  },
};

const MODEL_CAPABILITIES = new Set([
  "function_calling",
  "vision",
  "audio_input",
  "audio_output",
  "video",
  "web_search",
  "file_search",
  "code_execution",
  "computer_use",
  "structured_output",
  "streaming",
  "json_mode",
  "prompt_caching",
  "tool_search",
  "mcp",
  "long_context",
  "reasoning",
  "extended_thinking",
  "adaptive_thinking",
]);
const MODEL_AVAILABILITY_STATUSES = new Set([
  "available",
  "preview",
  "legacy",
  "deprecated",
  "retired",
  "unavailable",
  "unverified",
]);
const MODEL_TOOL_SCHEMA_FORMATS = new Set([
  "openai",
  "anthropic",
  "gemini",
  "mistral",
  "cohere",
  "hermes",
  "openai-compatible",
  "none",
]);
const CONFIDENCE_VALUES = new Set([
  "high",
  "medium",
  "low",
  "unverified",
  "not_applicable",
]);

interface ValidationIssue {
  file: string;
  message: string;
}

function addIssue(issues: ValidationIssue[], file: string, message: string) {
  issues.push({ file, message });
}

function validateOptionalEnum(
  issues: ValidationIssue[],
  file: string,
  data: Record<string, unknown>,
  field: string,
  allowed: Set<string>
) {
  const value = data[field];
  if (value === undefined) return;
  if (typeof value !== "string" || !allowed.has(value)) {
    addIssue(
      issues,
      file,
      `"${field}" must be one of: ${Array.from(allowed).sort().join(", ")}`
    );
  }
}

function validateOptionalNumber(
  issues: ValidationIssue[],
  file: string,
  data: Record<string, unknown>,
  field: string
) {
  const value = data[field];
  if (value !== undefined && typeof value !== "number") {
    addIssue(issues, file, `"${field}" must be a number when present`);
  }
}

function validateOptionalString(
  issues: ValidationIssue[],
  file: string,
  data: Record<string, unknown>,
  field: string
) {
  const value = data[field];
  if (value !== undefined && (typeof value !== "string" || value.trim().length === 0)) {
    addIssue(issues, file, `"${field}" must be a non-empty string when present`);
  }
}

function validateOptionalSourceList(
  issues: ValidationIssue[],
  file: string,
  data: Record<string, unknown>,
  field: string
) {
  const value = data[field];
  if (value === undefined) return;
  if (!Array.isArray(value) || value.length === 0) {
    addIssue(issues, file, `"${field}" must be a non-empty list when present`);
    return;
  }

  for (const item of value) {
    if (
      typeof item !== "object" ||
      item === null ||
      Array.isArray(item) ||
      typeof (item as Record<string, unknown>).title !== "string" ||
      typeof (item as Record<string, unknown>).url !== "string"
    ) {
      addIssue(issues, file, `"${field}" entries must include string title and url`);
      return;
    }
  }
}

function validateModelFields(
  issues: ValidationIssue[],
  file: string,
  data: Record<string, unknown>
) {
  validateOptionalString(issues, file, data, "api_model_id");
  validateOptionalString(issues, file, data, "knowledge_cutoff");
  validateOptionalString(issues, file, data, "superseded_by");
  validateOptionalString(issues, file, data, "variant_of");
  validateOptionalEnum(issues, file, data, "availability_status", MODEL_AVAILABILITY_STATUSES);
  validateOptionalEnum(issues, file, data, "tool_schema_format", MODEL_TOOL_SCHEMA_FORMATS);

  for (const field of [
    "pricing_confidence",
    "model_listing_confidence",
    "benchmark_confidence",
  ]) {
    validateOptionalEnum(issues, file, data, field, CONFIDENCE_VALUES);
  }

  const deprecated = data.deprecated;
  if (deprecated !== undefined && typeof deprecated !== "boolean") {
    addIssue(issues, file, `"deprecated" must be a boolean when present`);
  }

  if (data.capabilities !== undefined) {
    if (
      !Array.isArray(data.capabilities) ||
      data.capabilities.length === 0 ||
      data.capabilities.some(
        (item: unknown) => typeof item !== "string" || !MODEL_CAPABILITIES.has(item)
      )
    ) {
      addIssue(
        issues,
        file,
        `"capabilities" must be a non-empty list of supported capability enum values`
      );
    }
  }

  validateOptionalSourceList(issues, file, data, "sources");
  validateOptionalSourceList(issues, file, data, "benchmark_sources");

  const pricing = data.pricing;
  if (pricing && typeof pricing === "object" && !Array.isArray(pricing)) {
    const pricingData = pricing as Record<string, unknown>;
    validateOptionalEnum(issues, file, pricingData, "currency", new Set(["USD"]));
    for (const field of [
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
    ]) {
      validateOptionalNumber(issues, file, pricingData, field);
    }
  }
}

function walk(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

function normalizeRoute(route: string): string {
  if (!route || route === "/") return "/";
  const clean = route.replace(/\/+$/, "");
  return clean || "/";
}

function stripMarkdownCode(text: string): string {
  return text
    .replace(/```[\s\S]*?```/g, "")
    .replace(/~~~[\s\S]*?~~~/g, "")
    .replace(/`[^`\n]+`/g, "");
}

function buildValidRoutes(): Set<string> {
  const routes = new Set<string>(STATIC_ROUTES);
  const contentEntries = fs.readdirSync(CONTENT_DIR, { withFileTypes: true });

  routes.add("/content/_index.md");

  for (const entry of contentEntries) {
    if (entry.isDirectory()) {
      const type = entry.name;
      routes.add(`/${type}`);
      routes.add(`/content/${type}/_index.md`);
      routes.add(`/api/v1/${type}.json`);

      const files = fs
        .readdirSync(path.join(CONTENT_DIR, type))
        .filter((file) => file.endsWith(".md"));

      for (const file of files) {
        routes.add(`/content/${type}/${file}`);
        if (file !== "_index.md") {
          const slug = file.replace(/\.md$/, "");
          routes.add(`/${type}/${slug}`);
          routes.add(`/api/v1/${type}/${slug}.json`);
        }
      }
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      routes.add(`/content/${entry.name}`);
      routes.add(`/${entry.name.replace(/\.md$/, "")}`);
    }
  }

  routes.add("/api/v1/index.json");
  routes.add("/api/v1/openapi.json");
  routes.add("/api/v1/schema.json");
  routes.add("/api/v1/models-filter.json");
  routes.add("/api/v1/diff.json");
  routes.add("/api/v1/changes.json");
  routes.add("/api/v1/recommend.json");
  for (const task of RECOMMENDATION_TASKS) {
    routes.add(`/api/v1/recommend/${task}.json`);
  }

  for (const file of walk(PUBLIC_DIR)) {
    routes.add(
      normalizeRoute(
        "/" + path.relative(PUBLIC_DIR, file).replace(/\\/g, "/")
      )
    );
  }

  return routes;
}

function resolveMarkdownHref(href: string, mdPath: string): string | null {
  if (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("#")
  ) {
    return null;
  }

  const [pathname] = href.split(/[?#]/, 1);
  if (!pathname) return null;

  if (pathname.startsWith("/")) {
    return normalizeRoute(pathname);
  }

  const contentPath = mdPath.replace(/^\/content/, "");
  const baseDir = path.posix.dirname(contentPath);
  const resolved = path.posix.normalize(path.posix.join(baseDir, pathname));

  return normalizeRoute(
    resolved.replace(/\/_index\.md$/, "").replace(/\.md$/, "")
  );
}

function validateContentFiles(validRoutes: Set<string>): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const files = walk(CONTENT_DIR).filter((file) => file.endsWith(".md"));
  const seenIds = new Map<string, string>();

  for (const file of files) {
    const raw = fs.readFileSync(file, "utf8");
    const { data } = matter(raw);
    const relativeFile = path.relative(ROOT, file);

    for (const field of REQUIRED_FIELDS) {
      if (
        typeof data[field] !== "string" ||
        String(data[field]).trim().length === 0
      ) {
        issues.push({
          file: relativeFile,
          message: `missing required frontmatter field "${field}"`,
        });
      }
    }

    for (const field of ["last_updated", "date", "release_date"]) {
      const value = data[field];
      if (value !== undefined && (typeof value !== "string" || !DATE_PATTERN.test(value))) {
        issues.push({
          file: relativeFile,
          message: `invalid date field "${field}" (${String(value)})`,
        });
      }
    }

    if (typeof data.id === "string") {
      const existing = seenIds.get(data.id);
      if (existing) {
        issues.push({
          file: relativeFile,
          message: `duplicate id "${data.id}" also used in ${existing}`,
        });
      } else {
        seenIds.set(data.id, relativeFile);
      }
    }

    const typeRules = TYPE_RULES[String(data.type)] ?? {};

    for (const field of typeRules.string ?? []) {
      if (typeof data[field] !== "string" || data[field].trim().length === 0) {
        issues.push({
          file: relativeFile,
          message: `missing required string field "${field}" for type "${String(data.type)}"`,
        });
      }
    }

    for (const field of typeRules.array ?? []) {
      if (
        !Array.isArray(data[field]) ||
        data[field].length === 0 ||
        data[field].some(
          (item: unknown) => typeof item !== "string" || item.trim().length === 0
        )
      ) {
        issues.push({
          file: relativeFile,
          message: `missing required array field "${field}" for type "${String(data.type)}"`,
        });
      }
    }

    for (const field of typeRules.object ?? []) {
      if (
        typeof data[field] !== "object" ||
        data[field] === null ||
        Object.keys(data[field] as Record<string, unknown>).length === 0
      ) {
        issues.push({
          file: relativeFile,
          message: `missing required object field "${field}" for type "${String(data.type)}"`,
        });
      }
    }

    if (data.type === "model") {
      validateModelFields(issues, relativeFile, data);
    }

    const mdPath = `/${relativeFile.replace(/^content\//, "content/")}`;
    const text = stripMarkdownCode(raw);
    const linkPattern = /\[[^\]]+\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
    let match: RegExpExecArray | null;

    while ((match = linkPattern.exec(text)) !== null) {
      const resolved = resolveMarkdownHref(match[1], mdPath);
      if (!resolved || validRoutes.has(resolved)) continue;

      issues.push({
        file: relativeFile,
        message: `broken internal link "${match[1]}"`,
      });
    }
  }

  return issues;
}

function validateSourceLinks(validRoutes: Set<string>): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const files = walk(SRC_DIR).filter((file) => /\.(ts|tsx)$/.test(file));
  const patterns = [
    /href="\s*(\/[^"#?]+)"/g,
    /href=\{"(\/[^"#?]+)"\}/g,
    /href:\s*"(\/[^"#?]+)"/g,
  ];

  for (const file of files) {
    const text = fs.readFileSync(file, "utf8");
    const relativeFile = path.relative(ROOT, file);

    for (const pattern of patterns) {
      let match: RegExpExecArray | null;
      while ((match = pattern.exec(text)) !== null) {
        const route = normalizeRoute(match[1]);
        if (validRoutes.has(route)) continue;

        issues.push({
          file: relativeFile,
          message: `broken app link "${match[1]}"`,
        });
      }
    }
  }

  return issues;
}

const validRoutes = buildValidRoutes();
const issues = [
  ...validateContentFiles(validRoutes),
  ...validateSourceLinks(validRoutes),
];

if (issues.length > 0) {
  console.error("Content validation failed:");
  for (const issue of issues) {
    console.error(`- ${issue.file}: ${issue.message}`);
  }
  process.exit(1);
}

console.log("Content validation passed.");
