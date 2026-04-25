import { ImageResponse } from "next/og";

export const alt = "s4tvara";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(180deg, #09090b 0%, #18181b 100%)",
          color: "#f4f4f5",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            fontSize: 120,
            fontWeight: 700,
            letterSpacing: "0.04em",
          }}
        >
          s4tvara
        </div>
        <div
          style={{
            marginTop: 32,
            fontSize: 24,
            color: "#a1a1aa",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
          }}
        >
          Essays &amp; recommendations
        </div>
      </div>
    ),
    { ...size }
  );
}
