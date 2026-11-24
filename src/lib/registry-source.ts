import fs from "node:fs";
import path from "node:path";
import { codeToHtml } from "shiki";

interface RegistryFileDef {
  path: string;
  type: string;
  target?: string;
}

interface RegistryItemDef {
  name: string;
  type: string;
  title: string;
  description: string;
  dependencies?: string[];
  registryDependencies?: string[];
  files: RegistryFileDef[];
}

interface RegistryManifest {
  name: string;
  homepage?: string;
  items: RegistryItemDef[];
}

export interface RegistryFileSource {
  path: string;
  type: string;
  target?: string;
  content: string;
}

export interface RegistryItemSource {
  name: string;
  type: string;
  title: string;
  description: string;
  dependencies: string[];
  registryDependencies: string[];
  files: RegistryFileSource[];
  code: string;
  highlightedHtml?: string;
}

export type RegistrySourceMap = Record<string, RegistryItemSource>;

function formatCombinedCode(files: RegistryFileSource[]): string {
  if (files.length === 0) return "";
  if (files.length === 1) return files[0].content;

  return files
    .map((file) => {
      const header = file.path.endsWith(".css")
        ? `/* ── ${file.path} ── */`
        : `// ── ${file.path} ──`;
      return `${header}\n${file.content}`;
    })
    .join("\n\n");
}

function detectLanguage(files: RegistryFileSource[]): "css" | "tsx" {
  if (files.length > 0 && files[0].path.endsWith(".css")) {
    return "css";
  }
  return "tsx";
}

export async function highlightCode(
  code: string,
  lang: "css" | "tsx" | "bash" = "tsx"
): Promise<string> {
  return codeToHtml(code, {
    lang,
    theme: "github-dark-default",
  });
}

/**
 * Server-only helper that reads `registry.json` and every item's live source
 * file(s) directly from disk so the showcase Code tabs can never drift out of
 * sync with `registry/tonal/*`.
 */
export function getRegistrySources(): RegistrySourceMap {
  const root = process.cwd();
  const registryPath = path.join(root, "registry.json");
  const raw = fs.readFileSync(registryPath, "utf8");
  const manifest = JSON.parse(raw) as RegistryManifest;

  const sources: RegistrySourceMap = {};

  for (const item of manifest.items) {
    const files: RegistryFileSource[] = item.files.map((fileDef) => {
      const absPath = path.resolve(root, fileDef.path);
      const content = fs.readFileSync(absPath, "utf8").trimEnd();
      return {
        path: fileDef.path,
        type: fileDef.type,
        target: fileDef.target,
        content,
      };
    });

    sources[item.name] = {
      name: item.name,
      type: item.type,
      title: item.title,
      description: item.description,
      dependencies: item.dependencies ?? [],
      registryDependencies: item.registryDependencies ?? [],
      files,
      code: formatCombinedCode(files),
    };
  }

  return sources;
}

export async function getRegistrySourcesWithHighlight(): Promise<RegistrySourceMap> {
  const sources = getRegistrySources();
  const entries = await Promise.all(
    Object.entries(sources).map(async ([name, item]) => {
      const highlightedHtml = await highlightCode(
        item.code,
        detectLanguage(item.files)
      );
      return [name, { ...item, highlightedHtml }] as const;
    })
  );
  return Object.fromEntries(entries);
}

export function getRegistryItemSource(
  name: string
): RegistryItemSource | undefined {
  const sources = getRegistrySources();
  return sources[name];
}

export async function getRegistryItemSourceWithHighlight(
  name: string
): Promise<RegistryItemSource | undefined> {
  const item = getRegistryItemSource(name);
  if (!item) return undefined;
  const highlightedHtml = await highlightCode(
    item.code,
    detectLanguage(item.files)
  );
  return { ...item, highlightedHtml };
}
