import { ImageResponse } from "next/og";
import { getAllContent } from "./content";
import { SITE_DOMAIN, SITE_NAME, SITE_TAGLINE } from "./site";

const modelCount = getAllContent("models").length;
const agentCount = getAllContent("agents").length;

export function renderSocialImage(width: number, height: number) {
  const accent = "#8dfc9b";
  const subtle = "#8f8f8f";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          position: "relative",
          width: "100%",
          height: "100%",
          background: "#060606",
          color: "#ffffff",
          fontFamily: "Menlo, Monaco, monospace",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            opacity: 0.28,
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -120,
            top: -140,
            width: 420,
            height: 420,
            borderRadius: 9999,
            background: "rgba(141, 252, 155, 0.18)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 56,
            right: 56,
            top: 48,
            bottom: 48,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            border: "1px solid rgba(255,255,255,0.15)",
            background: "rgba(0,0,0,0.58)",
            padding: "38px 42px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 24,
              color: subtle,
            }}
          >
            <div style={{ display: "flex", color: accent }}>{">"} source-first web</div>
            <div style={{ display: "flex" }}>{SITE_DOMAIN}</div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 18,
              maxWidth: "82%",
            }}
          >
            <div style={{ display: "flex", fontSize: 28, color: accent }}>
              {SITE_TAGLINE}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 74,
                lineHeight: 1.03,
                fontWeight: 700,
                letterSpacing: -2,
              }}
            >
              {SITE_NAME}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 26,
                lineHeight: 1.4,
                color: "#d4d4d4",
              }}
            >
              Raw markdown, JSON APIs, change feeds, and MCP access for AI
              agents. Rendered views for humans from the same source.
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: 18,
              flexWrap: "wrap",
            }}
          >
            {[
              `${modelCount} models`,
              `${agentCount} agents`,
              "feed.json",
              "llms.txt",
              "MCP",
            ].map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  border: "1px solid rgba(255,255,255,0.16)",
                  padding: "10px 16px",
                  fontSize: 22,
                  color: "#ededed",
                  background: "rgba(255,255,255,0.03)",
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { width, height }
  );
}
