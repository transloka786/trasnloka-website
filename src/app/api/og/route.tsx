import { ImageResponse } from "next/og";
export const runtime = "edge";
export function GET() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        padding: 68,
        background: "#f4ead5",
        color: "#0d0d0d",
        fontFamily: "sans-serif",
        borderBottom: "20px solid #e91e63",
      }}
    >
      <div style={{ fontSize: 37 }}>KritRNA™</div>
      <div style={{ fontSize: 105, letterSpacing: -6 }}>
        Reading through silence.
      </div>
      <div style={{ fontSize: 28 }}>Transloka Bio Pvt. Ltd.</div>
    </div>,
    { width: 1200, height: 630 },
  );
}
