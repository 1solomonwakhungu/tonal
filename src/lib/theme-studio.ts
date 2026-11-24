export interface ThemeStudioConfig {
  presetId: string;
  accentLight: string;
  accentLightHover: string;
  accentDark: string;
  accentDarkHover: string;
  surfaceWarmth: "crisp" | "warm" | "cool";
  cardRadius: number;
  mode: "pill" | "commerce";
  theme: "light" | "dark";
}

export interface ThemePreset {
  id: string;
  name: string;
  tagline: string;
  accentLight: string;
  accentLightHover: string;
  accentDark: string;
  accentDarkHover: string;
  surfaceWarmth: "crisp" | "warm" | "cool";
  cardRadius: number;
  mode: "pill" | "commerce";
}

export const THEME_PRESETS: ThemePreset[] = [
  {
    id: "cobalt",
    name: "Tonal Cobalt",
    tagline: "Calm flagship editorial blue & cool workspace steps.",
    accentLight: "#1967d2",
    accentLightHover: "#174ea6",
    accentDark: "#8ab4f8",
    accentDarkHover: "#aecbfa",
    surfaceWarmth: "crisp",
    cardRadius: 24,
    mode: "pill",
  },
  {
    id: "sage",
    name: "Aloe Sage",
    tagline: "Botanical forest green for wellness & hardware storefronts.",
    accentLight: "#137333",
    accentLightHover: "#0d652d",
    accentDark: "#81c995",
    accentDarkHover: "#a8dab5",
    surfaceWarmth: "warm",
    cardRadius: 24,
    mode: "pill",
  },
  {
    id: "terracotta",
    name: "Porcelain Clay",
    tagline: "Warm terracotta accent paired with porcelain bento tiles.",
    accentLight: "#b8432e",
    accentLightHover: "#963322",
    accentDark: "#f28b79",
    accentDarkHover: "#f6aea2",
    surfaceWarmth: "warm",
    cardRadius: 20,
    mode: "commerce",
  },
  {
    id: "indigo",
    name: "Studio Indigo",
    tagline: "Focused AI studio violet-indigo on cool slate surfaces.",
    accentLight: "#4f46e5",
    accentLightHover: "#3730a3",
    accentDark: "#a5b4fc",
    accentDarkHover: "#c7d2fe",
    surfaceWarmth: "cool",
    cardRadius: 24,
    mode: "pill",
  },
  {
    id: "graphite",
    name: "Editorial Graphite",
    tagline: "High-contrast monochrome ink for austere commerce layouts.",
    accentLight: "#202124",
    accentLightHover: "#3c4043",
    accentDark: "#e3e3e3",
    accentDarkHover: "#ffffff",
    surfaceWarmth: "crisp",
    cardRadius: 16,
    mode: "commerce",
  },
];

export const DEFAULT_STUDIO_CONFIG: ThemeStudioConfig = {
  presetId: "cobalt",
  accentLight: "#1967d2",
  accentLightHover: "#174ea6",
  accentDark: "#8ab4f8",
  accentDarkHover: "#aecbfa",
  surfaceWarmth: "crisp",
  cardRadius: 24,
  mode: "pill",
  theme: "light",
};

export function normalizeHex(hex: string, fallback = "#1967d2"): string {
  const cleaned = hex.trim().replace(/^#/, "");
  if (/^[0-9a-fA-F]{6}$/.test(cleaned)) return `#${cleaned.toLowerCase()}`;
  if (/^[0-9a-fA-F]{3}$/.test(cleaned)) {
    const [r, g, b] = cleaned.split("");
    return `#${r}${r}${g}${g}${b}${b}`.toLowerCase();
  }
  return fallback;
}

export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const norm = normalizeHex(hex);
  const num = parseInt(norm.slice(1), 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

export function mixHex(hexA: string, hexB: string, weightA: number): string {
  const a = hexToRgb(hexA);
  const b = hexToRgb(hexB);
  const w = Math.max(0, Math.min(1, weightA));
  const r = Math.round(a.r * w + b.r * (1 - w));
  const g = Math.round(a.g * w + b.g * (1 - w));
  const bl = Math.round(a.b * w + b.b * (1 - w));
  return `#${[r, g, bl].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}

export function relativeLuminance(hex: string): number {
  const { r, g, b } = hexToRgb(hex);
  const channel = (v: number) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

export function getContrastRatio(hexA: string, hexB: string): number {
  const l1 = relativeLuminance(hexA);
  const l2 = relativeLuminance(hexB);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return Number(((lighter + 0.05) / (darker + 0.05)).toFixed(2));
}

export function getWcagGrade(ratio: number): "AAA" | "AA" | "AA Large" | "Fail" {
  if (ratio >= 7) return "AAA";
  if (ratio >= 4.5) return "AA";
  if (ratio >= 3) return "AA Large";
  return "Fail";
}

export function pickReadableForeground(bgHex: string): string {
  const whiteRatio = getContrastRatio("#ffffff", bgHex);
  const darkRatio = getContrastRatio("#131314", bgHex);
  return whiteRatio >= darkRatio ? "#ffffff" : "#131314";
}

export function buildStudioTokens(
  config: ThemeStudioConfig
): Record<string, string> {
  const isDark = config.theme === "dark";
  const accent = normalizeHex(isDark ? config.accentDark : config.accentLight);
  const accentHover = normalizeHex(
    isDark ? config.accentDarkHover : config.accentLightHover
  );

  const warmthMap = {
    crisp: {
      light: { bg: "#ffffff", surface: "#f8f9fa", cool: "#f0f4f9", warm: "#f4f2ee" },
      dark: { bg: "#131314", surface: "#1e1f20", cool: "#1b2230", warm: "#252422" },
    },
    warm: {
      light: { bg: "#fffdf9", surface: "#f7f5f0", cool: "#f1f0ec", warm: "#efeae1" },
      dark: { bg: "#151412", surface: "#211f1c", cool: "#242220", warm: "#2b2722" },
    },
    cool: {
      light: { bg: "#fcfdff", surface: "#f4f7fb", cool: "#eaf1fa", warm: "#f2f3f6" },
      dark: { bg: "#111419", surface: "#1a2029", cool: "#1b2536", warm: "#20242c" },
    },
  };

  const palette = warmthMap[config.surfaceWarmth][isDark ? "dark" : "light"];
  const tint = isDark ? mixHex(accent, palette.bg, 0.22) : mixHex(accent, "#ffffff", 0.12);
  const tintHover = isDark
    ? mixHex(accent, palette.bg, 0.32)
    : mixHex(accent, "#ffffff", 0.2);

  const ctaBg =
    config.mode === "commerce"
      ? isDark
        ? "#e3e3e3"
        : "#202124"
      : accent;
  const ctaFg = pickReadableForeground(ctaBg);
  const ctaHover =
    config.mode === "commerce"
      ? isDark
        ? "#ffffff"
        : "#3c4043"
      : accentHover;

  return {
    "--t-bg": palette.bg,
    "--t-surface": palette.surface,
    "--t-surface-cool": palette.cool,
    "--t-surface-warm": palette.warm,
    "--t-elevated": isDark ? palette.surface : "#ffffff",
    "--t-blue": accent,
    "--t-blue-hover": accentHover,
    "--t-blue-tint": tint,
    "--t-blue-tint-hover": tintHover,
    "--t-ring": accent,
    "--t-cta-bg": ctaBg,
    "--t-cta-fg": ctaFg,
    "--t-cta-hover": ctaHover,
    "--t-radius-card": `${config.cardRadius}px`,
    "--t-radius-hero": `${Math.min(36, config.cardRadius + 4)}px`,
    "--t-radius-btn": config.mode === "commerce" ? "6px" : "9999px",
  };
}

export function generateTokensCss(config: ThemeStudioConfig): string {
  const light = buildStudioTokens({ ...config, theme: "light" });
  const dark = buildStudioTokens({ ...config, theme: "dark" });

  return `/* Generated with Tonal Theme Studio (https://tonal.harlo.dev/studio) */
:root {
  --t-bg: ${light["--t-bg"]};
  --t-surface: ${light["--t-surface"]};
  --t-surface-warm: ${light["--t-surface-warm"]};
  --t-surface-cool: ${light["--t-surface-cool"]};
  --t-elevated: ${light["--t-elevated"]};
  --t-blue: ${light["--t-blue"]};
  --t-blue-hover: ${light["--t-blue-hover"]};
  --t-blue-tint: ${light["--t-blue-tint"]};
  --t-blue-tint-hover: ${light["--t-blue-tint-hover"]};
  --t-ring: ${light["--t-ring"]};
  --t-cta-bg: ${light["--t-cta-bg"]};
  --t-cta-fg: ${light["--t-cta-fg"]};
  --t-cta-hover: ${light["--t-cta-hover"]};
  --t-radius-card: ${light["--t-radius-card"]};
  --t-radius-hero: ${light["--t-radius-hero"]};
  --t-radius-btn: ${light["--t-radius-btn"]};
}

[data-tonal-theme="dark"] {
  --t-bg: ${dark["--t-bg"]};
  --t-surface: ${dark["--t-surface"]};
  --t-surface-warm: ${dark["--t-surface-warm"]};
  --t-surface-cool: ${dark["--t-surface-cool"]};
  --t-elevated: ${dark["--t-elevated"]};
  --t-blue: ${dark["--t-blue"]};
  --t-blue-hover: ${dark["--t-blue-hover"]};
  --t-blue-tint: ${dark["--t-blue-tint"]};
  --t-blue-tint-hover: ${dark["--t-blue-tint-hover"]};
  --t-ring: ${dark["--t-ring"]};
  --t-cta-bg: ${dark["--t-cta-bg"]};
  --t-cta-fg: ${dark["--t-cta-fg"]};
  --t-cta-hover: ${dark["--t-cta-hover"]};
}
`;
}

export function serializeStudioConfig(config: ThemeStudioConfig): string {
  const params = new URLSearchParams();
  params.set("preset", config.presetId);
  params.set("accent", config.accentLight.replace(/^#/, ""));
  params.set("warmth", config.surfaceWarmth);
  params.set("radius", String(config.cardRadius));
  params.set("mode", config.mode);
  params.set("theme", config.theme);
  return params.toString();
}

export function parseStudioConfig(
  params: URLSearchParams
): ThemeStudioConfig {
  const presetId = params.get("preset") ?? DEFAULT_STUDIO_CONFIG.presetId;
  const preset =
    THEME_PRESETS.find((p) => p.id === presetId) ?? THEME_PRESETS[0];

  const accentParam = params.get("accent");
  const accentLight = accentParam
    ? normalizeHex(accentParam, preset.accentLight)
    : preset.accentLight;
  const accentLightHover = accentParam
    ? mixHex(accentLight, "#000000", 0.8)
    : preset.accentLightHover;
  const accentDark = accentParam
    ? mixHex(accentLight, "#ffffff", 0.45)
    : preset.accentDark;
  const accentDarkHover = accentParam
    ? mixHex(accentLight, "#ffffff", 0.3)
    : preset.accentDarkHover;

  const warmthParam = params.get("warmth");
  const surfaceWarmth =
    warmthParam === "crisp" || warmthParam === "warm" || warmthParam === "cool"
      ? warmthParam
      : preset.surfaceWarmth;

  const radiusNum = Number(params.get("radius"));
  const cardRadius =
    Number.isFinite(radiusNum) && radiusNum >= 8 && radiusNum <= 36
      ? Math.round(radiusNum)
      : preset.cardRadius;

  const modeParam = params.get("mode");
  const mode =
    modeParam === "pill" || modeParam === "commerce" ? modeParam : preset.mode;

  const themeParam = params.get("theme");
  const theme = themeParam === "dark" ? "dark" : "light";

  return {
    presetId: preset.id,
    accentLight,
    accentLightHover,
    accentDark,
    accentDarkHover,
    surfaceWarmth,
    cardRadius,
    mode,
    theme,
  };
}
