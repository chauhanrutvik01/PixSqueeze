import { ImageResponse } from "next/og";

export const socialImageSize = { width: 1200, height: 630 };

export function createSocialImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#fbfaf5",
          color: "#17231d",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          padding: "64px",
          width: "100%",
        }}
      >
        <div
          style={{
            alignItems: "center",
            background: "white",
            border: "2px solid #dce5df",
            borderRadius: "48px",
            boxShadow: "0 22px 65px rgba(23, 35, 29, 0.12)",
            display: "flex",
            height: "100%",
            justifyContent: "space-between",
            padding: "70px",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", maxWidth: "760px" }}>
            <div style={{ color: "#25634f", display: "flex", fontSize: 30, fontWeight: 800, letterSpacing: 1 }}>
              PIXSQUEEZE
            </div>
            <div style={{ display: "flex", fontSize: 72, fontWeight: 800, lineHeight: 1.05, marginTop: 28 }}>
              Compress images to the exact size you need.
            </div>
            <div style={{ color: "#607069", display: "flex", fontSize: 30, marginTop: 30 }}>
              Free · private · no uploads · JPG, PNG, WebP & HEIC
            </div>
          </div>
          <div
            style={{
              alignItems: "center",
              background: "#dff2e9",
              borderRadius: "60px",
              display: "flex",
              flexDirection: "column",
              height: "300px",
              justifyContent: "center",
              transform: "rotate(4deg)",
              width: "250px",
            }}
          >
            <div style={{ color: "#25634f", display: "flex", fontSize: 86, fontWeight: 900 }}>↓</div>
            <div style={{ color: "#17231d", display: "flex", fontSize: 34, fontWeight: 800, marginTop: 12 }}>Smaller</div>
            <div style={{ color: "#df6c52", display: "flex", fontSize: 26, fontWeight: 800, marginTop: 6 }}>in seconds</div>
          </div>
        </div>
      </div>
    ),
    socialImageSize,
  );
}
