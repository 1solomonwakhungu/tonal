import http from "node:http";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync, spawn } from "node:child_process";

const ROOT = process.cwd();
const PUBLIC_R = path.join(ROOT, "public", "r");

function runAsync(cmd, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: "inherit", ...options });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${cmd} ${args.join(" ")} exited with code ${code}`));
    });
  });
}

async function main() {
  const server = http.createServer((req, res) => {
    const clean = path.basename((req.url || "").split("?")[0]);
    const filePath = path.resolve(PUBLIC_R, clean);
    if (
      !filePath.startsWith(PUBLIC_R + path.sep) ||
      !fs.existsSync(filePath) ||
      fs.statSync(filePath).isDirectory()
    ) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    fs.createReadStream(filePath).pipe(res);
  });

  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address();
  const baseUrl = `http://127.0.0.1:${port}`;
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "tonal-shadcn-check-"));

  try {
    // Rebuild manifests pointing at local server for the smoke test
    execFileSync("node", ["scripts/build-registry.mjs"], {
      cwd: ROOT,
      env: { ...process.env, TONAL_REGISTRY_URL: baseUrl },
      stdio: "inherit",
    });

    // Minimal shadcn consumer project
    fs.writeFileSync(
      path.join(tmpDir, "package.json"),
      JSON.stringify(
        {
          name: "tonal-consumer-smoke",
          private: true,
          dependencies: {
            react: "^19.0.0",
            "react-dom": "^19.0.0",
            clsx: "^2.1.1",
            "tailwind-merge": "^2.6.0",
            "lucide-react": "^0.468.0",
          },
        },
        null,
        2
      )
    );

    fs.mkdirSync(path.join(tmpDir, "src", "app"), { recursive: true });
    fs.writeFileSync(
      path.join(tmpDir, "src", "app", "globals.css"),
      '@import "tailwindcss";\n'
    );
    fs.writeFileSync(
      path.join(tmpDir, "tsconfig.json"),
      JSON.stringify(
        {
          compilerOptions: {
            jsx: "preserve",
            paths: { "@/*": ["./src/*"] },
          },
        },
        null,
        2
      )
    );
    fs.writeFileSync(
      path.join(tmpDir, "components.json"),
      JSON.stringify(
        {
          $schema: "https://ui.shadcn.com/schema/components.json",
          style: "new-york",
          rsc: true,
          tsx: true,
          tailwind: {
            config: "",
            css: "src/app/globals.css",
            baseColor: "neutral",
            cssVariables: true,
          },
          aliases: {
            components: "@/components",
            utils: "@/lib/utils",
            ui: "@/components/ui",
            lib: "@/lib",
            hooks: "@/hooks",
          },
        },
        null,
        2
      )
    );

    console.log(
      `Testing real shadcn CLI install from ${baseUrl}/r/editorial-hero.json ...`
    );
    await runAsync(
      "npx",
      [
        "--yes",
        "shadcn@latest",
        "add",
        `${baseUrl}/r/editorial-hero.json`,
        "--yes",
        "--overwrite",
      ],
      { cwd: tmpDir }
    );

    const expectedFiles = [
      "src/styles/tonal-tokens.css",
      "src/components/tonal/button.tsx",
      "src/components/tonal/chevron-link.tsx",
      "src/components/tonal/blocks/editorial-hero.tsx",
    ];

    for (const rel of expectedFiles) {
      const full = path.join(tmpDir, rel);
      const alt = path.join(tmpDir, rel.replace(/^src\//, ""));
      if (!fs.existsSync(full) && !fs.existsSync(alt)) {
        throw new Error(`Expected installed file not found: ${rel}`);
      }
    }

    console.log(
      "SUCCESS: shadcn CLI resolved cross-item dependencies and installed all files into components/tonal/ cleanly!"
    );
  } finally {
    server.close();
    fs.rmSync(tmpDir, { recursive: true, force: true });
    // Restore production manifests in public/r/
    execFileSync("node", ["scripts/build-registry.mjs"], {
      cwd: ROOT,
      stdio: "inherit",
    });
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
