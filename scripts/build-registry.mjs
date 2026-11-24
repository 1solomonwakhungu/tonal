import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const registryPath = path.join(root, "registry.json");
const outDir = path.join(root, "public", "r");

fs.mkdirSync(outDir, { recursive: true });

const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"));
const overrideUrl = process.env.TONAL_REGISTRY_URL?.replace(/\/+$/, "");

if (
  !overrideUrl &&
  (typeof registry.homepage !== "string" ||
    !registry.homepage.startsWith("https://") ||
    /localhost|127\.0\.0\.1/i.test(registry.homepage))
) {
  throw new Error(
    `registry.json homepage must be a production https:// URL, got: ${registry.homepage}`
  );
}

const prodBaseUrl = registry.homepage.replace(/\/+$/, "");
const baseUrl = overrideUrl || prodBaseUrl;
const itemNames = new Set(registry.items.map((item) => item.name));

if (itemNames.size !== registry.items.length) {
  throw new Error("registry.json contains duplicate item names.");
}

function normalizeRegistryDep(dep, ownerName) {
  if (!overrideUrl && /localhost|127\.0\.0\.1/i.test(dep)) {
    throw new Error(
      `Registry item "${ownerName}" has a localhost dependency: ${dep}`
    );
  }

  if (itemNames.has(dep)) {
    return `${baseUrl}/r/${dep}.json`;
  }

  const prodPrefix = `${prodBaseUrl}/r/`;
  if (dep.startsWith(prodPrefix) && dep.endsWith(".json")) {
    const depName = dep.slice(prodPrefix.length, -".json".length);
    if (!itemNames.has(depName)) {
      throw new Error(
        `Registry item "${ownerName}" references unknown internal dependency: ${dep}`
      );
    }
    return `${baseUrl}/r/${depName}.json`;
  }

  if (dep.startsWith("https://") || (overrideUrl && dep.startsWith("http://"))) {
    return dep;
  }

  throw new Error(
    `Registry item "${ownerName}" has an unresolved registryDependency: ${dep}`
  );
}

const indexItems = [];
const writtenFiles = new Set(["registry.json"]);

for (const item of registry.items) {
  const registryDependencies = (item.registryDependencies ?? []).map((dep) =>
    normalizeRegistryDep(dep, item.name)
  );

  const files = item.files.map((fileDef) => {
    const absPath = path.join(root, fileDef.path);
    if (!fs.existsSync(absPath)) {
      throw new Error(
        `Registry item "${item.name}" references missing file: ${fileDef.path}`
      );
    }
    const content = fs.readFileSync(absPath, "utf8");
    return {
      ...fileDef,
      content,
    };
  });

  const compiled = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    ...item,
    ...(registryDependencies.length > 0 ? { registryDependencies } : {}),
    files,
  };

  const outFile = `${item.name}.json`;
  writtenFiles.add(outFile);

  fs.writeFileSync(
    path.join(outDir, outFile),
    `${JSON.stringify(compiled, null, 2)}\n`
  );

  indexItems.push({
    name: item.name,
    type: item.type,
    title: item.title,
    description: item.description,
    dependencies: item.dependencies ?? [],
    registryDependencies,
  });
}

fs.writeFileSync(
  path.join(outDir, "registry.json"),
  `${JSON.stringify(
    {
      $schema: "https://ui.shadcn.com/schema/registry.json",
      name: registry.name,
      homepage: baseUrl,
      items: indexItems,
    },
    null,
    2
  )}\n`
);

// Clean up any stale compiled JSON files from removed or renamed items.
for (const entry of fs.readdirSync(outDir)) {
  if (entry.endsWith(".json") && !writtenFiles.has(entry)) {
    fs.unlinkSync(path.join(outDir, entry));
  }
}

console.log(
  `Built ${indexItems.length} Tonal registry items into public/r/ (base: ${baseUrl})`
);
