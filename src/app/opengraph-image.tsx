import { ImageResponse } from "next/og";

export const alt = "Tonal — Editorial Tonal UI Registry";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FFFFFF",
          padding: "56px 64px",
          fontFamily: "sans-serif",
          color: "#202124",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 9999,
                  background: "#202124",
                }}
              />
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 9999,
                  background: "#1967D2",
                  opacity: 0.85,
                  marginLeft: -12,
                }}
              />
            </div>
            <span
              style={{
                fontSize: 30,
                fontWeight: 600,
                letterSpacing: "-0.02em",
              }}
            >
              Tonal
            </span>
          </div>
          <div
            style={{
              background: "#E8F0FE",
              color: "#174EA6",
              fontSize: 20,
              fontWeight: 600,
              padding: "10px 22px",
              borderRadius: 9999,
            }}
          >
            shadcn-compatible registry
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div
            style={{
              fontSize: 66,
              fontWeight: 600,
              lineHeight: 1.06,
              letterSpacing: "-0.035em",
              maxWidth: 960,
            }}
          >
            Editorial tonal UI, minus the bloat.
          </div>
          <div
            style={{
              fontSize: 26,
              color: "#5F6368",
              lineHeight: 1.45,
              maxWidth: 860,
            }}
          >
            13 installable primitives, blocks, and design tokens built on flat
            tonal surfaces, Google Sans, and Tailwind CSS v4.
          </div>
        </div>

        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          {[
            { label: "Porcelain", bg: "#F4F2EE" },
            { label: "Workspace", bg: "#F0F4F9" },
            { label: "Sky", bg: "#E8F0FE" },
            { label: "Mint", bg: "#E6F4EA" },
          ].map((tile) => (
            <div
              key={tile.label}
              style={{
                display: "flex",
                flex: 1,
                background: tile.bg,
                borderRadius: 20,
                padding: "18px 22px",
                fontSize: 19,
                fontWeight: 600,
                color: "#3C4043",
              }}
            >
              {tile.label}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
