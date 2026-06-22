import { ImageResponse } from "next/og";

export const alt = "Rhesa Tsaqif | Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-50%",
            right: "-20%",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-30%",
            left: "-10%",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100px",
              height: "100px",
              borderRadius: "24px",
              background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
              fontSize: "48px",
              fontWeight: 700,
              color: "white",
              marginBottom: "24px",
            }}
          >
            RT
          </div>
          <h1
            style={{
              fontSize: "64px",
              fontWeight: 700,
              color: "#f8fafc",
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            Rhesa Tsaqif
          </h1>
          <p
            style={{
              fontSize: "28px",
              color: "#94a3b8",
              margin: "8px 0 0",
            }}
          >
            Full-Stack & Mobile Developer
          </p>
          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "24px",
              fontSize: "18px",
              color: "#64748b",
            }}
          >
            <span>Next.js</span>
            <span>React</span>
            <span>Kotlin</span>
            <span>Jetpack Compose</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
