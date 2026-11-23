import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const registryPath = path.join(root, "registry.json");
const outDir = path.join(root, "public", "r");

fs.mkdirSync(outDir, { recursive: true });

const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"));
const indexItems = [];

for (const item of registry.items) {
  const files = item.files.map((fileDef) => {
    const absPath = path.join(root, fileDef.path);
    const content = fs.readFileSync(absPath, "utf8");
    return {
      ...fileDef,
      content,
    };
  });

  const compiled = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    ...item,
    files,
  };

  fs.writeFileSync(
    path.join(outDir, `${item.name}.json`),
    JSON.stringify(compiled, null, 2)
  );

  indexItems.push({
    name: item.name,
    type: item.type,
    title: item.title,
    description: item.description,
    dependencies: item.dependencies ?? [],
    registryDependencies: item.registryDependencies ?? [],
  });
}

fs.writeFileSync(
  path.join(outDir, "registry.json"),
  JSON.stringify(
    {
      $schema: "https://ui.shadcn.com/schema/registry.json",
      name: registry.name,
      homepage: registry.homepage,
      items: indexItems,
    },
    null,
    2
  )
);

console.log(`Built ${indexItems.length} Tonal registry items into public/r/`);
