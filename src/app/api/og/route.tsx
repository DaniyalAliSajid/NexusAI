import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get("title") || "NexusAI — Verified AI Directory";
    const tagline =
      searchParams.get("tagline") ||
      "Discover, benchmark, and deploy frontier AI models and autonomous software tools.";
    const badge = searchParams.get("badge") || "VERIFIED DIRECTORY";

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: "#0a0a0b",
            padding: "60px 80px",
            fontFamily: "sans-serif",
            position: "relative",
          }}
        >
          {/* Top Brand & Badge */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "10px",
                  backgroundColor: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "22px",
                  fontWeight: "bold",
                  color: "#0a0a0b",
                }}
              >
                ✦
              </div>
              <span style={{ fontSize: "26px", fontWeight: "bold", color: "#ffffff", letterSpacing: "-0.5px" }}>
                NexusAI
              </span>
            </div>

            <div
              style={{
                backgroundColor: "rgba(99, 102, 241, 0.12)",
                border: "1px solid rgba(99, 102, 241, 0.3)",
                borderRadius: "6px",
                padding: "6px 16px",
                fontSize: "13px",
                color: "#818cf8",
                fontWeight: "600",
                letterSpacing: "0.5px",
              }}
            >
              {badge}
            </div>
          </div>

          {/* Center Main Headline & Tagline */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "980px" }}>
            <h1
              style={{
                fontSize: "52px",
                fontWeight: "700",
                color: "#ffffff",
                lineHeight: "1.15",
                letterSpacing: "-1px",
                margin: 0,
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontSize: "22px",
                color: "#a1a1aa",
                lineHeight: "1.4",
                margin: 0,
              }}
            >
              {tagline}
            </p>
          </div>

          {/* Bottom Telemetry Bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "1px solid #27272a",
              paddingTop: "24px",
            }}
          >
            <div style={{ display: "flex", gap: "24px" }}>
              <span style={{ fontSize: "14px", color: "#71717a", fontFamily: "monospace" }}>
                10,000+ AI TOOLS
              </span>
              <span style={{ fontSize: "14px", color: "#71717a", fontFamily: "monospace" }}>
                100% VERIFIED METRICS
              </span>
              <span style={{ fontSize: "14px", color: "#71717a", fontFamily: "monospace" }}>
                COMMUNITY BENCHMARKS
              </span>
            </div>

            <span style={{ fontSize: "15px", color: "#ffffff", fontWeight: "600" }}>
              nexusai.dev
            </span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    return new Response(`Failed to generate OG image: ${e.message}`, { status: 500 });
  }
}
