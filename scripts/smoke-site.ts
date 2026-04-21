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
