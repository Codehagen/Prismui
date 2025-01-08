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

const V0_REGISTRY_PATH = path.join(process.cwd(), "src/registry/app");
const REGISTRY_OUTPUT_PATH = path.join(process.cwd(), "public/r");

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

// Helper function to read file content
async function getFileContent(filePath: string): Promise<string> {
  try {
    return await fs.readFile(filePath, "utf-8");
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return "";
  }
}

// Helper function to determine file type
function getFileType(filePath: string): string {
  if (filePath.includes("/components/")) {
    return "registry:component";
  } else if (filePath.includes("/lib/")) {
    return "registry:lib";
  } else if (filePath.includes("/hooks/")) {
    return "registry:hook";
  } else {
    return "registry:page";
  }
}

// Helper function to get target path
function getTargetPath(
  filePath: string,
  templateName: string
): string | undefined {
  if (filePath.includes("/app/")) {
    return filePath.split(`${templateName}/`)[1];
  }
  return undefined;
}

// Helper function to detect dependencies from file content
async function detectDependencies(files: any[]): Promise<string[]> {
  const dependencies = new Set<string>();

  for (const file of files) {
    if (!file.content) continue;

    // Check for UI component imports
    const uiMatches = file.content.match(/@\/components\/ui\/([a-z-]+)/g);
    if (uiMatches) {
      uiMatches.forEach((match: string) => {
        dependencies.add(match.split("/").pop()!);
      });
    }

    // Check for explicit registry dependencies in MDX
    const mdxMatches = file.content.match(/registryDependencies:\s*\[(.*?)\]/s);
    if (mdxMatches && mdxMatches[1]) {
      mdxMatches[1]
        .split(",")
        .map((dep) => dep.trim().replace(/['"]/g, ""))
        .filter(Boolean)
        .forEach((dep) => dependencies.add(dep));
    }
  }

  return Array.from(dependencies);
}

// Helper function to detect categories from MDX and file structure
async function detectCategories(
  templateName: string,
  files: any[]
): Promise<string[]> {
  const categories = new Set<string>(["templates"]);

  for (const file of files) {
    if (!file.content) continue;

    // Check for categories in MDX frontmatter
    const categoryMatch = file.content.match(/category:\s*['"]([^'"]+)['"]/);
    if (categoryMatch) {
      categories.add(categoryMatch[1]);
    }

    // Check for subcategories in MDX frontmatter
    const subcategoryMatch = file.content.match(
      /subcategory:\s*['"]([^'"]+)['"]/
    );
    if (subcategoryMatch) {
      categories.add(subcategoryMatch[1]);
    }
  }

  // Add categories based on template name
  if (templateName.includes("card")) categories.add("cards");
  if (templateName.includes("form")) categories.add("forms");
  if (templateName.includes("layout")) categories.add("layouts");

  return Array.from(categories);
}

// Helper function to get description from MDX if available
async function getDescription(
  templateName: string,
  files: any[]
): Promise<string> {
  for (const file of files) {
    if (!file.content) continue;

    // Check for summary in MDX frontmatter
    const summaryMatch = file.content.match(/summary:\s*['"]([^'"]+)['"]/);
    if (summaryMatch) {
      return summaryMatch[1];
    }
  }

  return `A template for ${templateName}`;
}

async function buildV0Registry() {
  try {
    // Get all template directories
    const templates = await fs.readdir(V0_REGISTRY_PATH);
    const registryItems: any[] = [];

    for (const templateName of templates) {
      const templatePath = path.join(V0_REGISTRY_PATH, templateName);
      const stats = await fs.stat(templatePath);

      if (!stats.isDirectory()) continue;

      const files: any[] = [];
      const allFiles = await getAllFiles(templatePath);

      // Process each file
      for (const filePath of allFiles) {
        const relativePath = path.relative(V0_REGISTRY_PATH, filePath);
        const fileContent = await getFileContent(filePath);
        const fileType = getFileType(filePath);
        const targetPath = getTargetPath(relativePath, templateName);

        const fileEntry: any = {
          path: relativePath,
          type: fileType,
          content: fileContent,
        };

        if (targetPath) {
          fileEntry.target = targetPath;
        }

        files.push(fileEntry);
      }

      // Sort files to ensure page.tsx comes first
      files.sort((a, b) => {
        if (a.path.endsWith("/page.tsx")) return -1;
        if (b.path.endsWith("/page.tsx")) return 1;
        if (a.path.endsWith("/layout.tsx")) return -1;
        if (b.path.endsWith("/layout.tsx")) return 1;
        return 0;
      });

      // Create template item with enhanced metadata
      const dependencies = await detectDependencies(files);
      const categories = await detectCategories(templateName, files);
      const description = await getDescription(templateName, files);

      const templateItem = {
        name: templateName,
        type: "registry:block",
        title: templateName
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" "),
        description,
        files,
        registryDependencies: dependencies,
        categories,
      };

      registryItems.push(templateItem);
    }

    // Ensure output directory exists
    await fs.mkdir(REGISTRY_OUTPUT_PATH, { recursive: true });

    // Write the registry file
    const registryContent = JSON.stringify(registryItems, null, 2);
    await fs.writeFile(
      path.join(REGISTRY_OUTPUT_PATH, "index.json"),
      registryContent
    );

    // Generate the registry blocks file
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

    // Generate the __index__.tsx file
    const indexContent = dedent`
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-nocheck
      // This file is autogenerated by ./scripts/build-v0-registry.ts
      // Do not edit this file directly.
      import * as React from "react"
      import { type RegistryIndex } from "../registry/schema"

      export const index: RegistryIndex = {
        ${registryItems
          .map(
            (item) => `"${item.name}": {
          name: "${item.name}",
          title: "${item.title}",
          description: "${item.description}",
          type: "${item.type}",
          registryDependencies: ${JSON.stringify(item.registryDependencies)},
          files: ${JSON.stringify(item.files)},
          meta: {
            component: React.lazy(() => import("${path.join(
              "@/registry/app",
              item.name,
              "app/page.tsx"
            )}")),
          },
        }`
          )
          .join(",\n")}
      }
    `;

    await fs.writeFile(
      path.join(process.cwd(), "src/registry/__index__.tsx"),
      indexContent
    );

    console.log(`📝 Generated registry with ${registryItems.length} templates`);
  } catch (error) {
    console.error("Error building V0 registry:", error);
  }
}
