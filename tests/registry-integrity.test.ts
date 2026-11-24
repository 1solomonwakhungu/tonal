import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { REGISTRY_CATALOG } from "@/lib/registry-catalog";
import { getContrastRatio } from "@/lib/theme-studio";

const ROOT = process.cwd();

interface CompiledRegistryItem {
  name: string;
  type: string;
  title: string;
  description: string;
  dependencies?: string[];
  registryDependencies?: string[];
  files: Array<{ path: string; type: string; target?: string; content: string }>;
}

describe("Tonal registry integrity & tokens contract", () => {
  const registryJson = JSON.parse(
    fs.readFileSync(path.join(ROOT, "registry.json"), "utf8")
  ) as { homepage: string; items: Array<{ name: string; files: Array<{ path: string; target: string }> }> };

  const publicRegistry = JSON.parse(
    fs.readFileSync(path.join(ROOT, "public/r/registry.json"), "utf8")
  ) as { homepage: string; items: Array<{ name: string; registryDependencies: string[] }> };

  it("uses production homepage URL (never localhost)", () => {
    expect(registryJson.homepage).toBe("https://tonal.harlo.dev");
    expect(publicRegistry.homepage).toBe("https://tonal.harlo.dev");
  });

  it("keeps registry.json, public/r/registry.json, and REGISTRY_CATALOG in 1:1 sync", () => {
    const manifestNames = registryJson.items.map((i) => i.name).sort();
    const publicNames = publicRegistry.items.map((i) => i.name).sort();
    const catalogNames = REGISTRY_CATALOG.map((i) => i.slug).sort();

    expect(manifestNames.length).toBeGreaterThanOrEqual(19);
    expect(publicNames).toEqual(manifestNames);
    expect(catalogNames).toEqual(manifestNames);
  });

  it("compiles every item with resolvable URL registryDependencies and explicit consumer target paths", () => {
    for (const item of registryJson.items) {
      const compiledPath = path.join(ROOT, "public/r", `${item.name}.json`);
      expect(fs.existsSync(compiledPath), `Missing ${compiledPath}`).toBe(true);

      const compiled = JSON.parse(
        fs.readFileSync(compiledPath, "utf8")
      ) as CompiledRegistryItem;

      expect(compiled.name).toBe(item.name);
      expect(compiled.files.length).toBeGreaterThan(0);

      for (const dep of compiled.registryDependencies ?? []) {
        expect(dep).toMatch(/^https:\/\/tonal\.harlo\.dev\/r\/[a-z0-9-]+\.json$/);
        const depName = dep.replace(/^https:\/\/tonal\.harlo\.dev\/r\//, "").replace(/\.json$/, "");
        expect(
          fs.existsSync(path.join(ROOT, "public/r", `${depName}.json`)),
          `Dependency ${dep} missing compiled manifest`
        ).toBe(true);
      }

      for (const file of compiled.files) {
        expect(file.content.length).toBeGreaterThan(20);
        expect(file.target).toBeTruthy();
      }
    }
  });

  it("tokens.css provides semantic status tokens, Tailwind v4 @theme inline, dark parity, and reduced motion", () => {
    const css = fs.readFileSync(
      path.join(ROOT, "registry/tonal/tokens.css"),
      "utf8"
    );

    expect(css).toContain("@theme inline");
    expect(css).toContain("--t-success:");
    expect(css).toContain("--t-warning:");
    expect(css).toContain("--t-danger:");
    expect(css).toContain("--t-ring:");
    expect(css).toContain("prefers-reduced-motion: reduce");

    const requiredDarkTokens = [
      "--t-bg",
      "--t-surface",
      "--t-ink",
      "--t-blue",
      "--t-success",
      "--t-warning",
      "--t-danger",
      "--t-cta-bg",
      "--t-cta-fg",
    ];
    const darkBlock = css.split('[data-tonal-theme="dark"]')[1] ?? "";
    for (const token of requiredDarkTokens) {
      expect(darkBlock, `Dark theme missing ${token}`).toContain(`${token}:`);
    }
  });

  it("core light & dark palette pairs meet WCAG AA contrast (>= 4.5:1)", () => {
    const pairs: Array<[string, string, string]> = [
      ["Light ink on bg", "#202124", "#ffffff"],
      ["Light muted ink on bg", "#5f6368", "#ffffff"],
      ["Light blue on bg", "#1967d2", "#ffffff"],
      ["Light success on mint", "#137333", "#e6f4ea"],
      ["Light danger on danger-surface", "#c5221f", "#fce8e6"],
      ["Dark ink on bg", "#e3e3e3", "#131314"],
      ["Dark blue on bg", "#8ab4f8", "#131314"],
      ["Dark CTA fg on CTA bg", "#062e6f", "#8ab4f8"],
      ["Dark danger on danger-surface", "#f28b82", "#3c1e1e"],
    ];

    for (const [label, fg, bg] of pairs) {
      expect(getContrastRatio(fg, bg), `${label} contrast`).toBeGreaterThanOrEqual(4.5);
    }
  });
});
