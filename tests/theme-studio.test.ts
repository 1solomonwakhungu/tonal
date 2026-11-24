import { describe, expect, it } from "vitest";
import {
  buildStudioTokens,
  DEFAULT_STUDIO_CONFIG,
  generateTokensCss,
  getContrastRatio,
  getWcagGrade,
  parseStudioConfig,
  pickReadableForeground,
  serializeStudioConfig,
  THEME_PRESETS,
} from "@/lib/theme-studio";

describe("Theme Studio token engine & WCAG contrast utilities", () => {
  it("computes accurate WCAG contrast ratios and grades", () => {
    expect(getContrastRatio("#000000", "#ffffff")).toBe(21);
    expect(getWcagGrade(21)).toBe("AAA");
    expect(getWcagGrade(5.2)).toBe("AA");
    expect(getWcagGrade(3.4)).toBe("AA Large");
    expect(getWcagGrade(2.1)).toBe("Fail");
  });

  it("picks readable foreground colors for light and dark backgrounds", () => {
    expect(pickReadableForeground("#1967d2")).toBe("#ffffff");
    expect(pickReadableForeground("#8ab4f8")).toBe("#131314");
  });

  it("ensures every curated preset achieves WCAG AA CTA contrast in light and dark modes", () => {
    for (const preset of THEME_PRESETS) {
      for (const theme of ["light", "dark"] as const) {
        const tokens = buildStudioTokens({
          ...preset,
          presetId: preset.id,
          theme,
        });
        const ratio = getContrastRatio(
          tokens["--t-cta-fg"],
          tokens["--t-cta-bg"]
        );
        expect(
          ratio,
          `${preset.id} (${theme}) CTA contrast`
        ).toBeGreaterThanOrEqual(4.5);
      }
    }
  });

  it("serializes and parses studio config via URLSearchParams cleanly", () => {
    const custom = {
      ...DEFAULT_STUDIO_CONFIG,
      presetId: "sage",
      accentLight: "#137333",
      surfaceWarmth: "warm" as const,
      cardRadius: 28,
      mode: "commerce" as const,
      theme: "dark" as const,
    };

    const qs = serializeStudioConfig(custom);
    const parsed = parseStudioConfig(new URLSearchParams(qs));

    expect(parsed.presetId).toBe("sage");
    expect(parsed.accentLight).toBe("#137333");
    expect(parsed.surfaceWarmth).toBe("warm");
    expect(parsed.cardRadius).toBe(28);
    expect(parsed.mode).toBe("commerce");
    expect(parsed.theme).toBe("dark");
  });

  it("generates complete CSS with both :root and dark theme blocks", () => {
    const css = generateTokensCss(DEFAULT_STUDIO_CONFIG);
    expect(css).toContain(":root {");
    expect(css).toContain('[data-tonal-theme="dark"] {');
    expect(css).toContain("--t-radius-card: 24px;");
    expect(css).toContain("--t-radius-btn: 9999px;");
  });
});
