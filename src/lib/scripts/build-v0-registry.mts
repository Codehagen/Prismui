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
import dedent from "dedent";
import chokidar from "chokidar";

const V0_REGISTRY_PATH = path.join(process.cwd(), "src/registry/app");
const R_REGISTRY_PATH = path.join(process.cwd(), "public/r");

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

async function getFileContent(filePath: string): Promise<string> {
  const imageExtensions = [
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".svg",
    ".webp",
    ".ico",
  ];
  if (imageExtensions.some((ext) => filePath.toLowerCase().endsWith(ext))) {
    return "";
  }

  try {
    return await fs.readFile(filePath, "utf-8");
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return "";
  }
}

async function buildV0Registry() {
  try {
    // Get all template directories
    const templates = await fs.readdir(V0_REGISTRY_PATH);
    const registryItems = [];

    for (const templateName of templates) {
      const templatePath = path.join(V0_REGISTRY_PATH, templateName);
      const stats = await fs.stat(templatePath);

      if (!stats.isDirectory()) continue;

      // Process all files in the template
      const allFiles = await getAllFiles(templatePath);
      const files = await Promise.all(
        allFiles.map(async (filePath) => {
          const relativePath = path.relative(templatePath, filePath);
          const content = await getFileContent(filePath);
          const fileType = getFileType(relativePath);

          return {
            path: `${templateName}/${relativePath}`,
            content,
            type: fileType,
            target: getTargetPath(relativePath, fileType),
          };
        })
      );

      const templateItem = {
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

    // Ensure /r directory exists
    await fs.mkdir(R_REGISTRY_PATH, { recursive: true });

    // Write the registry JSON file
    const registryJson = JSON.stringify(registryItems, null, 2);
    await fs.writeFile(
      path.join(R_REGISTRY_PATH, "registry.json"),
      registryJson,
      "utf8"
    );

    // Generate the registry-blocks.ts file
    const registryBlocksContent = dedent`
      import { type Registry } from "./schema";

      export const blocks = ${JSON.stringify(
        registryItems,
        null,
        2
      )} satisfies Registry;
    `;

    await fs.writeFile(
      path.join(process.cwd(), "src/registry/registry-blocks.ts"),
      registryBlocksContent
    );

    console.log(`📝 Generated registry with ${registryItems.length} templates`);
  } catch (error) {
    console.error("Error building V0 registry:", error);
  }
}

function getFileType(filePath: string): string {
  if (filePath.includes("/app/")) {
    return "registry:page";
  }
  if (filePath.includes("/components/")) {
    return "registry:component";
  }
  if (filePath.includes("/lib/")) {
    return "registry:lib";
  }
  if (filePath.includes("/hooks/")) {
    return "registry:hook";
  }
  return "registry:component";
}

function getTargetPath(relativePath: string, fileType: string): string {
  if (fileType === "registry:page") {
    return `app/${relativePath}`;
  }
  if (fileType === "registry:component") {
    return `components/${path.basename(relativePath)}`;
  }
  if (fileType === "registry:lib") {
    return `lib/${path.basename(relativePath)}`;
  }
  if (fileType === "registry:hook") {
    return `hooks/${path.basename(relativePath)}`;
  }
  return relativePath;
}
