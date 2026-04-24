import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const NEXT_BIN = path.join(ROOT, "node_modules", ".bin", "next");
const BUILD_ID = path.join(ROOT, ".next", "BUILD_ID");
const PORT = 4317;
const BASE_URL = `http://127.0.0.1:${PORT}`;

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

async function waitForServer(timeoutMs: number) {
  const started = Date.now();

  while (Date.now() - started < timeoutMs) {
    try {
      const response = await fetch(`${BASE_URL}/`, { redirect: "manual" });
      if (response.ok) return;
    } catch {}

    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  throw new Error("Timed out waiting for Next.js server to start");
}

async function main() {
  assert(fs.existsSync(BUILD_ID), 'Build artifacts not found. Run "npm run build" before smoke tests.');

  const server = spawn(NEXT_BIN, ["start", "--port", String(PORT)], {
    cwd: ROOT,
    env: { ...process.env, PORT: String(PORT) },
    stdio: ["ignore", "pipe", "pipe"],
  });

  let stderr = "";
  server.stderr.on("data", (chunk) => {
    stderr += chunk.toString();
  });

  try {
    await waitForServer(15000);

    const page = await fetch(`${BASE_URL}/models/claude-opus-4.6`);
    const pageHtml = await page.text();
    assert(page.ok, "Model page did not return 200");
    assert(
      pageHtml.includes('rel="canonical" href="https://ai-future-ready.com/models/claude-opus-4.6"'),
      "Model page is missing canonical metadata"
    );
    assert(
      pageHtml.includes('property="og:title" content="Claude Opus 4.6"'),
      "Model page is missing page-level Open Graph metadata"
    );
    assert(
      pageHtml.includes('type="application/rss+xml" href="https://ai-future-ready.com/feed.xml"'),
      "Page is missing feed discovery metadata"
    );
    assert(
      pageHtml.includes('property="og:image"') || pageHtml.includes('name="twitter:image"'),
      "Page is missing social preview image metadata"
    );

    const rawContent = await fetch(`${BASE_URL}/content/models/claude-opus-4.6.md`);
    assert(rawContent.ok, "Raw markdown endpoint did not return 200");
    assert(
      rawContent.headers.get("x-robots-tag")?.includes("noindex"),
      "Raw markdown endpoint is missing noindex header"
    );

    const feedJson = await fetch(`${BASE_URL}/feed.json`);
    const feedJsonBody = (await feedJson.json()) as { items?: unknown[] };
    assert(feedJson.ok, "feed.json did not return 200");
    assert(Array.isArray(feedJsonBody.items) && feedJsonBody.items.length > 0, "feed.json has no items");
    assert(
      feedJson.headers.get("x-robots-tag")?.includes("noindex"),
      "feed.json is missing noindex header"
    );

    const feedXml = await fetch(`${BASE_URL}/feed.xml`);
    const feedXmlText = await feedXml.text();
    assert(feedXml.ok, "feed.xml did not return 200");
    assert(feedXmlText.includes("<rss"), "feed.xml is not valid RSS output");

    const aiManifest = await fetch(`${BASE_URL}/.well-known/ai.json`);
    const aiManifestBody = (await aiManifest.json()) as {
      content_schema?: string;
      changes?: string;
    };
    assert(aiManifest.ok, ".well-known/ai.json did not return 200");
    assert(
      aiManifestBody.content_schema === "/api/v1/schema.json",
      ".well-known/ai.json is missing schema discovery"
    );
    assert(
      aiManifestBody.changes === "/api/v1/changes.json",
      ".well-known/ai.json is missing changes discovery"
    );

    const schema = await fetch(`${BASE_URL}/api/v1/schema.json`);
    const schemaBody = (await schema.json()) as {
      content_types?: Record<string, unknown>;
    };
    assert(schema.ok, "schema endpoint did not return 200");
    assert(
      Boolean(schemaBody.content_types?.models),
      "schema endpoint is missing model schema"
    );

    const itemJson = await fetch(`${BASE_URL}/api/v1/models/claude-opus-4.6.json`);
    const itemJsonBody = (await itemJson.json()) as {
      sha256?: string;
      relationships?: unknown;
      content_text?: string;
    };
    assert(itemJson.ok, "Per-item model JSON did not return 200");
    assert(
      typeof itemJsonBody.sha256 === "string" && itemJsonBody.sha256.length === 64,
      "Per-item model JSON is missing sha256"
    );
    assert(Boolean(itemJsonBody.relationships), "Per-item model JSON is missing relationships");
    assert(
      itemJsonBody.content_text?.includes("# Claude Opus 4.6"),
      "Per-item model JSON is missing markdown body text"
    );

    const recommendCoding = await fetch(`${BASE_URL}/api/v1/recommend/coding.json`);
    const recommendCodingBody = (await recommendCoding.json()) as { items?: unknown[] };
    assert(recommendCoding.ok, "Task recommendation endpoint did not return 200");
    assert(
      Array.isArray(recommendCodingBody.items) && recommendCodingBody.items.length > 0,
      "Task recommendation endpoint has no items"
    );

    const pricingSnapshots = await fetch(`${BASE_URL}/api/v1/pricing-snapshots.json`);
    const pricingSnapshotsBody = (await pricingSnapshots.json()) as { items?: unknown[] };
    assert(pricingSnapshots.ok, "Pricing snapshots endpoint did not return 200");
    assert(
      Array.isArray(pricingSnapshotsBody.items) && pricingSnapshotsBody.items.length > 0,
      "Pricing snapshots endpoint has no items"
    );

    const modelVerification = await fetch(`${BASE_URL}/api/v1/model-verification.json`);
    const modelVerificationBody = (await modelVerification.json()) as {
      items?: unknown[];
      needs_model_verification?: number;
    };
    assert(modelVerification.ok, "Model verification endpoint did not return 200");
    assert(
      Array.isArray(modelVerificationBody.items) && modelVerificationBody.items.length > 0,
      "Model verification endpoint has no items"
    );
    assert(
      typeof modelVerificationBody.needs_model_verification === "number",
      "Model verification endpoint is missing verification counts"
    );

    const proDataSample = await fetch(`${BASE_URL}/api/v1/samples/pro-data.json`);
    const proDataSampleBody = (await proDataSample.json()) as {
      model?: unknown;
      pricing_snapshot?: unknown;
      checkout_configured?: boolean;
    };
    assert(proDataSample.ok, "Pro Data sample endpoint did not return 200");
    assert(Boolean(proDataSampleBody.model), "Pro Data sample is missing a model record");
    assert(
      Boolean(proDataSampleBody.pricing_snapshot),
      "Pro Data sample is missing a pricing snapshot"
    );
    assert(
      proDataSampleBody.checkout_configured === false,
      "Pro Data sample should not configure checkout"
    );

    const changes = await fetch(`${BASE_URL}/api/v1/changes.json?since=2026-04-01&type=model`);
    const changesBody = (await changes.json()) as {
      query?: { since?: string; type?: string };
      items?: Array<{ type?: string; changed_at?: string }>;
    };
    assert(changes.ok, "Changes endpoint did not return 200");
    assert(changesBody.query?.since === "2026-04-01", "Changes endpoint ignored since query");
    assert(changesBody.query?.type === "model", "Changes endpoint ignored type query");
    assert(
      Array.isArray(changesBody.items) &&
        changesBody.items.every(
          (item) => item.type === "model" && String(item.changed_at).slice(0, 10) >= "2026-04-01"
        ),
      "Changes endpoint returned items outside the requested filters"
    );

    const contentRedirect = await fetch(`${BASE_URL}/content`, { redirect: "manual" });
    assert(
      contentRedirect.status >= 300 && contentRedirect.status < 400,
      "/content did not redirect"
    );
    assert(
      contentRedirect.headers.get("location") === "/content/_index.md",
      '/content redirect does not point to "/content/_index.md"'
    );

    const promptsRedirect = await fetch(`${BASE_URL}/tools/prompts`, {
      redirect: "manual",
    });
    assert(
      promptsRedirect.status >= 300 && promptsRedirect.status < 400,
      "/tools/prompts did not redirect"
    );
    assert(
      promptsRedirect.headers.get("location") === "/prompt-patterns",
      '/tools/prompts redirect does not point to "/prompt-patterns"'
    );

    const mcpPage = await fetch(`${BASE_URL}/mcp`);
    const mcpHtml = await mcpPage.text();
    assert(mcpPage.ok, "MCP page did not return 200");
    assert(
      mcpHtml.includes("Model Context Protocol"),
      "MCP page content is missing"
    );

    const ogImage = await fetch(`${BASE_URL}/opengraph-image`);
    assert(ogImage.ok, "Open Graph image route did not return 200");
    assert(
      ogImage.headers.get("content-type")?.includes("image/png"),
      "Open Graph image route did not return a PNG"
    );

    console.log("Smoke tests passed.");
  } finally {
    server.kill("SIGTERM");
    if (stderr.trim()) {
      process.stderr.write(stderr);
    }
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
