import fs from "node:fs";
import path from "node:path";

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

export function getRegistryItemSource(
  name: string
): RegistryItemSource | undefined {
  const sources = getRegistrySources();
  return sources[name];
}
