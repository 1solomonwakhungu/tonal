import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const root = process.cwd();
const registryJsonPath = path.join(root, "registry.json");
const compiledDir = path.join(root, "public", "r");
const packageJson = JSON.parse(
  fs.readFileSync(path.join(root, "package.json"), "utf8")
);
const registry = JSON.parse(fs.readFileSync(registryJsonPath, "utf8"));
const baseUrl = registry.homepage.replace(/\/+$/, "");

const VALID_ITEM_TYPES = new Set([
  "registry:style",
  "registry:ui",
  "registry:block",
  "registry:component",
  "registry:lib",
  "registry:hook",
  "registry:page",
  "registry:file",
]);

const BUILTIN_OR_PEER_PACKAGES = new Set(["react", "react-dom"]);

function walkFiles(dir, base = root) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkFiles(abs, base));
    } else if (entry.isFile()) {
      results.push(path.relative(base, abs).split(path.sep).join("/"));
    }
  }
  return results;
}

function extractImports(source) {
  const specs = [];
  const regex =
    /\b(?:import|export)\s+(?:type\s+)?(?:[\s\S]*?\s+from\s+)?["']([^"']+)["']/g;
  let match;
  while ((match = regex.exec(source)) !== null) {
    specs.push(match[1]);
  }
  return specs;
}

function packageNameFromSpecifier(spec) {
  if (spec.startsWith("@")) {
    const [scope, name] = spec.split("/");
    return `${scope}/${name}`;
  }
  return spec.split("/")[0];
}

function resolveDepNameFromUrl(url) {
  const prefix = `${baseUrl}/r/`;
  if (url.startsWith(prefix) && url.endsWith(".json")) {
    return url.slice(prefix.length, -".json".length);
  }
  return null;
}

test("registry.json satisfies shadcn registry schema and uses production homepage", () => {
  assert.equal(registry.$schema, "https://ui.shadcn.com/schema/registry.json");
  assert.equal(registry.name, "tonal");
  assert.match(registry.homepage, /^https:\/\//);
  assert.doesNotMatch(registry.homepage, /localhost|127\.0\.0\.1/i);
  assert.ok(Array.isArray(registry.items) && registry.items.length > 0);

  const seenNames = new Set();
  for (const item of registry.items) {
    assert.match(item.name, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.ok(!seenNames.has(item.name), `Duplicate item name: ${item.name}`);
    seenNames.add(item.name);
    assert.ok(
      VALID_ITEM_TYPES.has(item.type),
      `Invalid type "${item.type}" on ${item.name}`
    );
    assert.ok(item.title && item.title.trim().length > 0);
    assert.ok(item.description && item.description.trim().length > 0);
    assert.ok(Array.isArray(item.files) && item.files.length > 0);
  }
});

test("every registry source file exists on disk and every file under registry/ is registered", () => {
  const registeredPaths = new Set();

  for (const item of registry.items) {
    for (const fileDef of item.files) {
      const absPath = path.join(root, fileDef.path);
      assert.ok(
        fs.existsSync(absPath),
        `Missing source file for "${item.name}": ${fileDef.path}`
      );
      const stat = fs.statSync(absPath);
      assert.ok(stat.size > 0, `Empty source file: ${fileDef.path}`);
      registeredPaths.add(fileDef.path);

      assert.ok(
        typeof fileDef.target === "string" && fileDef.target.length > 0,
        `Missing explicit target path on ${item.name} (${fileDef.path})`
      );
      assert.ok(
        !fileDef.target.startsWith("/") && !fileDef.target.includes(".."),
        `Unsafe target path on ${item.name}: ${fileDef.target}`
      );
    }
  }

  const diskFiles = walkFiles(path.join(root, "registry"));
  for (const relPath of diskFiles) {
    assert.ok(
      registeredPaths.has(relPath),
      `Unregistered file found under registry/: ${relPath}`
    );
  }
});

test("compiled public/r/*.json files match registry.json, source files, and contain no localhost URLs", () => {
  const compiledIndexPath = path.join(compiledDir, "registry.json");
  assert.ok(fs.existsSync(compiledIndexPath), "Missing public/r/registry.json");

  const compiledIndexRaw = fs.readFileSync(compiledIndexPath, "utf8");
  assert.doesNotMatch(compiledIndexRaw, /localhost|127\.0\.0\.1/i);

  const compiledIndex = JSON.parse(compiledIndexRaw);
  assert.equal(
    compiledIndex.$schema,
    "https://ui.shadcn.com/schema/registry.json"
  );
  assert.equal(compiledIndex.name, registry.name);
  assert.equal(compiledIndex.homepage, baseUrl);
  assert.equal(compiledIndex.items.length, registry.items.length);

  const expectedJsonFiles = new Set(["registry.json"]);

  for (const item of registry.items) {
    const fileName = `${item.name}.json`;
    expectedJsonFiles.add(fileName);
    const outPath = path.join(compiledDir, fileName);
    assert.ok(fs.existsSync(outPath), `Missing compiled manifest: ${outPath}`);

    const raw = fs.readFileSync(outPath, "utf8");
    assert.doesNotMatch(
      raw,
      /localhost|127\.0\.0\.1/i,
      `Localhost URL leaked into public/r/${fileName}`
    );

    const compiled = JSON.parse(raw);
    assert.equal(
      compiled.$schema,
      "https://ui.shadcn.com/schema/registry-item.json"
    );
    assert.equal(compiled.name, item.name);
    assert.equal(compiled.type, item.type);
    assert.equal(compiled.title, item.title);
    assert.equal(compiled.description, item.description);
    assert.equal(compiled.files.length, item.files.length);

    for (let i = 0; i < item.files.length; i++) {
      const diskContent = fs.readFileSync(
        path.join(root, item.files[i].path),
        "utf8"
      );
      assert.equal(compiled.files[i].path, item.files[i].path);
      assert.equal(compiled.files[i].type, item.files[i].type);
      assert.equal(compiled.files[i].target, item.files[i].target);
      assert.equal(
        compiled.files[i].content,
        diskContent,
        `Compiled content drift detected in public/r/${fileName}`
      );
    }
  }

  for (const entry of fs.readdirSync(compiledDir)) {
    if (entry.endsWith(".json")) {
      assert.ok(
        expectedJsonFiles.has(entry),
        `Stale compiled file found in public/r/: ${entry}`
      );
    }
  }
});

test("registryDependencies use full production URLs, resolve cleanly, and have no cycles", () => {
  const itemsByName = new Map(registry.items.map((item) => [item.name, item]));

  for (const item of registry.items) {
    const deps = item.registryDependencies ?? [];
    for (const dep of deps) {
      assert.match(
        dep,
        /^https:\/\//,
        `registryDependency "${dep}" on "${item.name}" must be a full https:// URL`
      );
      assert.doesNotMatch(dep, /localhost|127\.0\.0\.1/i);
      const internalName = resolveDepNameFromUrl(dep);
      if (internalName !== null) {
        assert.ok(
          itemsByName.has(internalName),
          `"${item.name}" depends on unknown internal item "${internalName}"`
        );
        assert.notEqual(
          internalName,
          item.name,
          `"${item.name}" cannot depend on itself`
        );
      }
    }
  }

  // Detect dependency cycles via DFS
  const visiting = new Set();
  const visited = new Set();
  function dfs(name) {
    if (visiting.has(name)) {
      assert.fail(`Circular registryDependency detected involving "${name}"`);
    }
    if (visited.has(name)) return;
    visiting.add(name);
    const item = itemsByName.get(name);
    for (const dep of item.registryDependencies ?? []) {
      const depName = resolveDepNameFromUrl(dep);
      if (depName && itemsByName.has(depName)) {
        dfs(depName);
      }
    }
    visiting.delete(name);
    visited.add(name);
  }
  for (const name of itemsByName.keys()) {
    dfs(name);
  }
});

test("every TS/TSX import resolves on disk, in package.json, and in simulated consumer target paths", () => {
  const itemsByName = new Map(registry.items.map((item) => [item.name, item]));
  const rootDeps = new Set(Object.keys(packageJson.dependencies ?? {}));

  for (const item of registry.items) {
    const declaredNpmDeps = new Set(item.dependencies ?? []);

    // Collect all target paths installed when a consumer runs `shadcn add` on this item
    const installedTargets = new Set();
    const queue = [item.name];
    const seen = new Set();
    while (queue.length > 0) {
      const curName = queue.shift();
      if (seen.has(curName)) continue;
      seen.add(curName);
      const cur = itemsByName.get(curName);
      if (!cur) continue;
      for (const f of cur.files) {
        installedTargets.add(f.target);
      }
      for (const dep of cur.registryDependencies ?? []) {
        const depName = resolveDepNameFromUrl(dep);
        if (depName) queue.push(depName);
      }
    }

    for (const fileDef of item.files) {
      if (!fileDef.path.endsWith(".ts") && !fileDef.path.endsWith(".tsx")) {
        continue;
      }

      const absPath = path.join(root, fileDef.path);
      const source = fs.readFileSync(absPath, "utf8");
      const imports = extractImports(source);

      for (const spec of imports) {
        if (spec.startsWith(".")) {
          // 1. Must resolve on disk inside registry/
          const baseDir = path.dirname(absPath);
          const candidates = [
            path.resolve(baseDir, `${spec}.tsx`),
            path.resolve(baseDir, `${spec}.ts`),
            path.resolve(baseDir, spec, "index.tsx"),
            path.resolve(baseDir, spec, "index.ts"),
          ];
          assert.ok(
            candidates.some((c) => fs.existsSync(c)),
            `Broken relative import "${spec}" in ${fileDef.path}`
          );

          // 2. Must also resolve inside the simulated consumer target tree
          const targetDir = path.posix.dirname(fileDef.target);
          const targetCandidates = [
            path.posix.normalize(path.posix.join(targetDir, `${spec}.tsx`)),
            path.posix.normalize(path.posix.join(targetDir, `${spec}.ts`)),
          ];
          assert.ok(
            targetCandidates.some((t) => installedTargets.has(t)),
            `Relative import "${spec}" in "${item.name}" (${fileDef.target}) does not resolve to any installed target from its registryDependencies`
          );
        } else if (!spec.startsWith("node:")) {
          const pkg = packageNameFromSpecifier(spec);
          if (BUILTIN_OR_PEER_PACKAGES.has(pkg)) continue;
          assert.ok(
            declaredNpmDeps.has(pkg),
            `Package "${pkg}" imported by ${fileDef.path} is missing from "${item.name}" dependencies`
          );
          assert.ok(
            rootDeps.has(pkg),
            `Package "${pkg}" imported by ${fileDef.path} is missing from root package.json dependencies`
          );
        }
      }
    }
  }
});

test("every registry item is showcased in ShowcaseClient and SEO routes match production origin", () => {
  const showcaseSrc = fs.readFileSync(
    path.join(root, "src/components/showcase-client.tsx"),
    "utf8"
  );
  for (const item of registry.items) {
    assert.ok(
      showcaseSrc.includes(`registryName: "${item.name}"`),
      `Registry item "${item.name}" is not rendered in src/components/showcase-client.tsx`
    );
  }

  for (const seoFile of ["src/app/robots.ts", "src/app/sitemap.ts"]) {
    const content = fs.readFileSync(path.join(root, seoFile), "utf8");
    assert.ok(
      content.includes(baseUrl),
      `${seoFile} does not reference production origin ${baseUrl}`
    );
    assert.doesNotMatch(content, /localhost|127\.0\.0\.1/i);
  }
});
