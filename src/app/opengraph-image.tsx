import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Gabriel Cornide — Frontend Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "#0a0a0a",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        fontFamily: "sans-serif",
        position: "relative",
      }}
    >
      {/* Accent glow */}
      <div
        style={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(249,115,22,0.25) 0%, transparent 60%)",
        }}
      />

      {/* Badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "#1a1a1a",
          border: "1px solid #2a2a2a",
          borderRadius: 999,
          padding: "6px 14px",
          marginBottom: 36,
          width: "fit-content",
          fontSize: 13,
          color: "#666",
          letterSpacing: "0.06em",
        }}
      >
        <div
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "#22c55e",
          }}
        />
        Disponible · Buenos Aires, AR
      </div>

      {/* Name */}
      <div
        style={{
          fontSize: 96,
          fontWeight: 300,
          color: "#ffffff",
          lineHeight: 0.95,
          letterSpacing: "-0.04em",
          marginBottom: 28,
        }}
      >
        Gabriel{" "}
        <span style={{ color: "#666", fontStyle: "italic" }}>Cornide.</span>
      </div>

      {/* Role */}
      <div
        style={{
          fontSize: 22,
          color: "#888",
          marginBottom: 40,
          letterSpacing: "-0.01em",
        }}
      >
        Frontend Semi-Senior · React · Next.js · TypeScript
      </div>

      {/* Stats row */}
      <div style={{ display: "flex", gap: 40 }}>
        {[
          { num: "3+", label: "Años" },
          { num: "4", label: "Empresas" },
          { num: "12", label: "Apps" },
        ].map((s) => (
          <div
            key={s.label}
            style={{ display: "flex", flexDirection: "column", gap: 4 }}
          >
            <div style={{ fontSize: 40, color: "#f97316", fontWeight: 300 }}>
              {s.num}
            </div>
            <div
              style={{
                fontSize: 13,
                color: "#555",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </div>,
    { ...size },
  );
}
