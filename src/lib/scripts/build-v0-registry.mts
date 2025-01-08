/**
 * // DO NOT REMOVE - V0 Registry Build Requirements
 *
 * This script builds the v0 registry for template pages. To add a new template:
 *
 * 1. Create a new folder in registry/app with your template name:
 *    registry/app/your-template/
 *    ├── app/
 *    │   ├── page.tsx       (required)
 *    │   ├── layout.tsx     (required)
 *    │   └── globals.css    (optional)
 *    ├── components/        (optional)
 *    ├── lib/              (optional)
 *    └── hooks/            (optional)
 *
 * 2. Required Files:
 *    - app/page.tsx: Must be first in files array
 *    - app/layout.tsx: Must include proper layout setup
 *
 * 3. File Type Rules:
 *    - registry:page: For pages and layouts
 *    - registry:component: For React components
 *    - registry:lib: For utility functions
 *    - registry:hook: For React hooks
 *    - Use registry:page with target for any other file types
 *
 * 4. CSS Variables:
 *    - Add globals.css in app/registry/TEMPLATE_NAME/app/
 *    - Import in layout.tsx
 *    - Add to files array with type: "registry:page", target: "app/globals.css"
 *
 * 5. API Routes:
 *    - Place in registry/TEMPLATE_NAME/app/api/
 *    - Use full path: /registry/TEMPLATE_NAME/api/...
 *
 * Example structure in registry/index.ts:
 * {
 *   name: "example-template",
 *   type: "template",
 *   files: [
 *     {
 *       path: "example-template/app/page.tsx",
 *       type: "registry:page",
 *       target: "app/page.tsx"
 *     },
 *     {
 *       path: "example-template/app/layout.tsx",
 *       type: "registry:page",
 *       target: "app/layout.tsx"
 *     }
 *   ]
 * }
 */

import { promises as fs } from "fs";
import path from "path";
import { type Registry } from "../../registry/schema";
import dedent from "dedent";
import chokidar from "chokidar";

interface RegistryFile {
  path: string;
  type: string;
  target?: string;
}

interface RegistryItem {
  name: string;
  type: string;
  title: string;
  description: string;
  files: RegistryFile[];
}

const V0_REGISTRY_PATH = path.join(process.cwd(), "src/registry/app");
const V0_PUBLIC_PATH = path.join(process.cwd(), "public/r/v0");

// Initialize an empty watcher if in watch mode.
const isWatchMode = process.argv.includes("--watch");
const watcher = chokidar.watch(V0_REGISTRY_PATH, {
  ignored: (path) => path.endsWith("registry-blocks.ts"),
  awaitWriteFinish: {
    stabilityThreshold: 50,
    pollInterval: 50,
  },
  persistent: true,
  ignoreInitial: true,
});

// Add watch handlers
if (isWatchMode) {
  console.log("👀 Watching for V0 template changes...");
  watcher.on("change", buildV0Registry);
  watcher.on("add", buildV0Registry);
} else {
  console.log("🔨 Building V0 registry...");
  await buildV0Registry();
  console.log("✅ Done");
  process.exit(0);
}

// Helper function to recursively get all files
async function getAllFiles(
  dirPath: string,
  arrayOfFiles: string[] = []
): Promise<string[]> {
  const files = await fs.readdir(dirPath);

  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const stat = await fs.stat(fullPath);

    if (stat.isDirectory()) {
      arrayOfFiles = await getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  }

  return arrayOfFiles;
}

// Helper function to ensure directory exists
async function ensureDir(dirPath: string) {
  try {
    await fs.access(dirPath);
  } catch {
    await fs.mkdir(dirPath, { recursive: true });
  }
}

// Helper function to copy file with directory creation
async function copyFile(src: string, dest: string) {
  await ensureDir(path.dirname(dest));
  await fs.copyFile(src, dest);
}

async function buildV0Registry() {
  try {
    // Get all template directories
    const templates = await fs.readdir(V0_REGISTRY_PATH);

    const registryItems: RegistryItem[] = [];

    // Ensure the public directory exists
    await ensureDir(V0_PUBLIC_PATH);

    for (const templateName of templates) {
      const templatePath = path.join(V0_REGISTRY_PATH, templateName);
      const stats = await fs.stat(templatePath);

      if (!stats.isDirectory()) continue;

      const files: RegistryFile[] = [];

      // Add app files
      const appPath = path.join(templatePath, "app");
      const allAppFiles = await getAllFiles(appPath);

      // Convert absolute paths to relative paths and sort
      const relativeAppFiles = allAppFiles.map((file) =>
        path.relative(appPath, file)
      );
      const sortedAppFiles = relativeAppFiles.sort((a, b) => {
        const order = { "page.tsx": 1, "layout.tsx": 2, "globals.css": 3 };
        const aBase = path.basename(a);
        const bBase = path.basename(b);
        return (order[aBase] || 99) - (order[bBase] || 99);
      });

      // Copy files to public directory and add to registry
      for (const file of sortedAppFiles) {
        const sourcePath = path.join(appPath, file);
        const targetPath = path.join(V0_PUBLIC_PATH, templateName, "app", file);
        await copyFile(sourcePath, targetPath);

        files.push({
          path: `${templateName}/app/${file}`,
          type: "registry:page",
          target: `app/${file}`,
        });
      }

      // Add component files if they exist
      const componentsPath = path.join(templatePath, "components");
      try {
        const componentFiles = await getAllFiles(componentsPath);
        for (const file of componentFiles) {
          const relativePath = path.relative(componentsPath, file);
          const targetPath = path.join(
            V0_PUBLIC_PATH,
            templateName,
            "components",
            relativePath
          );
          await copyFile(file, targetPath);

          files.push({
            path: `${templateName}/components/${relativePath}`,
            type: "registry:component",
          });
        }
      } catch (error) {
        // Components directory doesn't exist, skip
      }

      const templateItem: RegistryItem = {
        name: templateName,
        type: "registry:block",
        title: templateName
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" "),
        description: `A template for ${templateName}`,
        files,
      };

      registryItems.push(templateItem);
    }

    // Generate the registry file content
    const registryContent = dedent`
      import { type Registry } from "./schema";

      export const blocks = ${JSON.stringify(
        registryItems,
        null,
        2
      )} satisfies Registry;
    `;

    // Write the registry file
    await fs.writeFile(
      path.join(process.cwd(), "src/registry/registry-blocks.ts"),
      registryContent
    );

    console.log(`📝 Generated registry with ${registryItems.length} templates`);
  } catch (error) {
    console.error("Error building V0 registry:", error);
  }
}
