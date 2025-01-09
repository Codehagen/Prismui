/**
 * Build Registry Script
 *
 * This script generates the component registry for the UI library.
 * It handles:
 * - Building the __registry__/index.tsx file with component imports
 * - Processing registry items (UI components, blocks, themes)
 * - Normalizing file paths for registry vs component files
 * - Generating style variations and theme files
 * - Creating JSON manifests for styles and colors
 *
 * The script is used during build time to create the necessary files
 * for the component showcase and documentation.
 *
 * Usage: pnpm build:registry
 */

// @sts-nocheck
import { existsSync, promises as fs } from "fs";
import { tmpdir } from "os";
import path from "path";
import { cwd } from "process";
import template from "lodash.template";
import { rimraf } from "rimraf";
import { Project, ScriptKind, SyntaxKind } from "ts-morph";
import { z } from "zod";

import { registry } from "../../registry/index.js";
import { baseColors } from "../../registry/registry-base-colors.js";
import { colorMapping, colors } from "../../registry/registry-colors.js";
import { styles } from "../../registry/registry-styles.js";
import {
  type RegistryItem,
  registryItemSchema,
  registryItemTypeSchema,
  registrySchema,
} from "../../registry/schema.js";

const REGISTRY_PATH = path.join(process.cwd(), "public/r");
const REGISTRY_SRC_PATH = path.join(process.cwd(), "src/registry");
const COMPONENTS_PATH = path.join(process.cwd(), "src/components");

const REGISTRY_INDEX_WHITELIST: z.infer<typeof registryItemTypeSchema>[] = [
  "registry:ui",
  "registry:lib",
  "registry:hook",
  "registry:theme",
  "registry:block",
];

const project = new Project({
  compilerOptions: {},
});

async function createTempSourceFile(filename: string) {
  const dir = await fs.mkdtemp(path.join(tmpdir(), "shadcn-"));
  return path.join(dir, filename);
}

interface ColorValue {
  scale?: number;
  hex: string;
  rgb: string;
  hsl: string;
  rgbChannel?: string;
  hslChannel?: string;
}

interface ColorData {
  [key: string]: string | ColorValue | ColorValue[];
}

function isComponentPath(path: string) {
  return path.startsWith("components/");
}

function isSectionPath(path: string) {
  return path.startsWith("section/") || path.includes("/section/");
}

// Skip any registry:page type items or items with app paths as they are handled by build-v0
function shouldSkipItem(item: RegistryItem) {
  return (
    item.type === "registry:page" ||
    item.files?.some((file) => {
      const filePath = typeof file === "string" ? file : file.path;
      return (
        (typeof file === "string" ? false : file.type === "registry:page") ||
        filePath.includes("/app/")
      );
    })
  );
}

// ----------------------------------------------------------------------------
// Build __registry__/index.tsx.
// ----------------------------------------------------------------------------
async function buildRegistry(registry: RegistryItem[]) {
  // Filter out any items that should be handled by build-v0
  const filteredRegistry = registry.filter((item) => !shouldSkipItem(item));

  let index = `// @ts-nocheck
// This file is autogenerated by scripts/build-registry.ts
// Do not edit this file directly.
import * as React from "react"

export const Index: Record<string, any> = {
`;

  for (const style of styles) {
    index += `  "${style.name}": {`;

    // Build style index.
    for (const item of filteredRegistry) {
      const resolveFiles = item.files?.map((file) => {
        const filePath = typeof file === "string" ? file : file.path;

        if (filePath.startsWith("components/")) {
          return `src/${filePath}`;
        }

        // Handle blocks path
        if (filePath.startsWith("blocks/")) {
          return `src/registry/blocks/${filePath.replace(/^blocks\//, "")}`;
        }

        // Handle section paths - both registry/section and direct section paths
        if (isSectionPath(filePath)) {
          if (filePath.startsWith("registry/")) {
            return `src/${filePath}`;
          }
          return `src/registry/${filePath}`;
        }

        // Handle any remaining registry paths
        if (filePath.startsWith("registry/")) {
          return `src/${filePath}`;
        }

        return `src/registry/${filePath}`;
      });
      if (!resolveFiles) {
        continue;
      }

      const type = item.type.split(":")[1];
      let sourceFilename = "";

      let chunks: any = [];
      if (item.type === "registry:block") {
        const file = resolveFiles[0];
        const filename = path.basename(file);
        const raw = await fs.readFile(path.join(process.cwd(), file), "utf8");
        const tempFile = await createTempSourceFile(filename);
        const sourceFile = project.createSourceFile(tempFile, raw, {
          scriptKind: ScriptKind.TSX,
        });

        // Find all imports.
        const imports = new Map<
          string,
          {
            module: string;
            text: string;
            isDefault?: boolean;
          }
        >();
        sourceFile.getImportDeclarations().forEach((node) => {
          // eslint-disable-next-line
          const module = node.getModuleSpecifier().getLiteralValue();
          node.getNamedImports().forEach((item) => {
            imports.set(item.getText(), {
              module,
              text: node.getText(),
            });
          });

          const defaultImport = node.getDefaultImport();
          if (defaultImport) {
            imports.set(defaultImport.getText(), {
              module,
              text: defaultImport.getText(),
              isDefault: true,
            });
          }
        });

        // Find all opening tags with x-chunk attribute.
        const components = sourceFile
          .getDescendantsOfKind(SyntaxKind.JsxOpeningElement)
          .filter((node) => {
            return node.getAttribute("x-chunk") !== undefined;
          });

        chunks = await Promise.all(
          components.map(async (component, index) => {
            const chunkName = `${item.name}-chunk-${index}`;

            // Get the value of x-chunk attribute.
            const attr = component
              .getAttributeOrThrow("x-chunk")
              .asKindOrThrow(SyntaxKind.JsxAttribute);

            const description = attr
              .getInitializerOrThrow()
              .asKindOrThrow(SyntaxKind.StringLiteral)
              .getLiteralValue();

            // Delete the x-chunk attribute.
            attr.remove();

            // Add a new attribute to the component.
            component.addAttribute({
              name: "x-chunk",
              initializer: `"${chunkName}"`,
            });

            // Get the value of x-chunk-container attribute.
            const containerAttr = component
              .getAttribute("x-chunk-container")
              ?.asKindOrThrow(SyntaxKind.JsxAttribute);

            const containerClassName = containerAttr
              ?.getInitializer()
              ?.asKindOrThrow(SyntaxKind.StringLiteral)
              .getLiteralValue();

            containerAttr?.remove();

            const parentJsxElement = component.getParentIfKindOrThrow(
              SyntaxKind.JsxElement
            );

            // Find all opening tags on component.
            const children = parentJsxElement
              .getDescendantsOfKind(SyntaxKind.JsxOpeningElement)
              .map((node) => {
                return node.getTagNameNode().getText();
              })
              .concat(
                parentJsxElement
                  .getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement)
                  .map((node) => {
                    return node.getTagNameNode().getText();
                  })
              );

            const componentImports = new Map<
              string,
              string | string[] | Set<string>
            >();
            children.forEach((child) => {
              const importLine = imports.get(child);
              if (importLine) {
                const imports = componentImports.get(importLine.module) || [];

                const newImports = importLine.isDefault
                  ? importLine.text
                  : new Set([...imports, child]);

                componentImports.set(
                  importLine.module,
                  importLine?.isDefault ? newImports : Array.from(newImports)
                );
              }
            });

            const componnetImportLines = Array.from(
              componentImports.keys()
            ).map((key) => {
              const values = componentImports.get(key);
              const specifier = Array.isArray(values)
                ? `{${values.join(",")}}`
                : values;

              return `import ${specifier} from "${key}"`;
            });

            const code = `
            'use client'

            ${componnetImportLines.join("\n")}

            export default function Component() {
              return (${parentJsxElement.getText()})
            }`;

            const targetFile = file.replace(item.name, `${chunkName}`);
            const targetFilePath = path.join(
              cwd(),
              `src/registry/${type}/${chunkName}.tsx`
            );

            // Write component file.
            rimraf.sync(targetFilePath);
            await fs.writeFile(targetFilePath, code, "utf8");

            return {
              name: chunkName,
              description,
              component: `React.lazy(() => import("@/src/registry/${type}/${chunkName}")),`,
              file: targetFile,
              container: {
                className: containerClassName,
              },
            };
          })
        );

        // Write the source file for blocks only.
        sourceFilename = `src/registry/${type}/${item.name}.tsx`;

        if (item.files) {
          const files = item.files.map((file) =>
            typeof file === "string"
              ? { type: "registry:page", path: file }
              : file
          );
          if (files?.length) {
            sourceFilename = `src/registry/${files[0].path}`;
          }
        }

        const sourcePath = path.join(process.cwd(), sourceFilename);
        if (!existsSync(sourcePath)) {
          await fs.mkdir(path.dirname(sourcePath), { recursive: true });
        }

        rimraf.sync(sourcePath);
        await fs.writeFile(sourcePath, sourceFile.getText());
      }

      let componentPath = item.files?.[0]
        ? isComponentPath(
            typeof item.files[0] === "string"
              ? item.files[0]
              : item.files[0].path || ""
          )
          ? `@/${
              typeof item.files[0] === "string"
                ? item.files[0]
                : item.files[0].path
            }`
          : `@/src/registry/${(typeof item.files[0] === "string"
              ? item.files[0]
              : item.files[0].path
            ).replace(/^registry\//, "")}`
        : isComponentPath(type)
        ? `@/components/${type}/${item.name}`
        : `@/src/registry/${type}/${item.name}`;

      if (item.files) {
        const files = item.files.map((file) =>
          typeof file === "string"
            ? { type: "registry:page", path: file }
            : file
        );
        if (files?.length) {
          const filePath = files[0].path;
          componentPath = isComponentPath(filePath)
            ? `@/${filePath}`
            : `@/src/registry/${filePath}`;
        }
      }

      index += `
    "${item.name}": {
      name: "${item.name}",
      type: "${item.type}",
      title: ${JSON.stringify(item.title || item.name)},
      description: ${JSON.stringify(item.description || "")},
      registryDependencies: ${JSON.stringify(item.registryDependencies)},
      files: [${resolveFiles.map((file) => `"${file}"`)}],
      component: React.lazy(() => import("${componentPath}")),
      source: "${sourceFilename}",
      category: ${JSON.stringify(item.category || "")},
      subcategory: ${JSON.stringify(item.subcategory || "")},
      meta: ${JSON.stringify(item.meta || {})},
      chunks: [${chunks.map(
        (chunk) => `{
        name: "${chunk.name}",
        description: "${chunk.description ?? "No description"}",
        component: ${chunk.component}
        file: "${chunk.file}",
        container: {
          className: "${chunk.container.className}"
        }
      }`
      )}]
    },`;
    }

    index += `
  },`;
  }

  index += `
}
`;

  // ----------------------------------------------------------------------------
  // Build registry/index.json.
  // ----------------------------------------------------------------------------
  const items = registry
    .filter((item) =>
      ["registry:ui", "registry:block"].includes(item.type as string)
    )
    .map((item) => {
      return {
        ...item,
        files: item.files?.map((_file) => {
          const file =
            typeof _file === "string"
              ? {
                  path: _file,
                  type: item.type,
                  content: item.code || "",
                  target: _file,
                }
              : {
                  ..._file,
                  content: _file.content || item.code || "",
                };

          return file;
        }),
      };
    });
  const registryJson = JSON.stringify(items, null, 2);
  rimraf.sync(path.join(REGISTRY_PATH, "index.json"));
  await fs.writeFile(
    path.join(REGISTRY_PATH, "index.json"),
    registryJson,
    "utf8"
  );

  // Write style index.
  rimraf.sync(path.join(process.cwd(), "__registry__/index.tsx"));
  await fs.writeFile(path.join(process.cwd(), "__registry__/index.tsx"), index);
}

// ----------------------------------------------------------------------------
// Build registry/styles/[style]/[name].json.
// ----------------------------------------------------------------------------
async function buildStyles(registry: RegistryItem[]) {
  // Filter out any items that should be handled by build-v0
  const filteredRegistry = registry.filter((item) => !shouldSkipItem(item));

  for (const style of styles) {
    const targetPath = path.join(REGISTRY_PATH, "styles", style.name);

    // Create directory if it doesn't exist.
    if (!existsSync(targetPath)) {
      await fs.mkdir(targetPath, { recursive: true });
    }

    for (const item of filteredRegistry) {
      if (!REGISTRY_INDEX_WHITELIST.includes(item.type)) {
        continue;
      }

      let files;
      if (item.files) {
        files = await Promise.all(
          item.files.map(async (_file) => {
            const file =
              typeof _file === "string"
                ? {
                    path: _file,
                    type: item.type,
                    content: "",
                    target: "",
                  }
                : _file;

            const content = await fs.readFile(
              isComponentPath(file.path)
                ? path.join(process.cwd(), "src", file.path)
                : path.join(
                    process.cwd(),
                    "src/registry",
                    file.path.replace(/^registry\//, "")
                  ),
              "utf8"
            );

            const tempFile = await createTempSourceFile(file.path);
            const sourceFile = project.createSourceFile(tempFile, content, {
              scriptKind: ScriptKind.TSX,
            });

            sourceFile.getVariableDeclaration("iframeHeight")?.remove();
            sourceFile.getVariableDeclaration("containerClassName")?.remove();
            sourceFile.getVariableDeclaration("description")?.remove();

            return {
              path: file.path,
              type: file.type,
              content: sourceFile.getText(),
              target: file.target,
            };
          })
        );
      }

      const payload = registryItemSchema
        .omit({
          source: true,
          category: true,
          subcategory: true,
          chunks: true,
        } as const)
        .safeParse({
          ...item,
          files,
        });

      if (payload.success) {
        await fs.writeFile(
          path.join(targetPath, `${item.name}.json`),
          JSON.stringify(payload.data, null, 2),
          "utf8"
        );
      }
    }
  }

  // ----------------------------------------------------------------------------
  // Build registry/styles/index.json.
  // ----------------------------------------------------------------------------
  const stylesJson = JSON.stringify(styles, null, 2);
  await fs.writeFile(
    path.join(REGISTRY_PATH, "styles/index.json"),
    stylesJson,
    "utf8"
  );
}

// ----------------------------------------------------------------------------
// Build registry/styles/[name]/index.json.
// ----------------------------------------------------------------------------
async function buildStylesIndex() {
  for (const style of styles) {
    const targetPath = path.join(REGISTRY_PATH, "styles", style.name);

    const dependencies = [
      "tailwindcss-animate",
      "class-variance-authority",
      "lucide-react",
    ];

    const payload: RegistryItem = {
      name: style.name,
      type: "registry:style",
      dependencies,
      registryDependencies: ["utils"],
      tailwind: {
        config: {
          plugins: [`require("tailwindcss-animate")`],
        },
      },
      cssVars: {
        light: {},
        dark: {},
      },
      files: [],
    };

    await fs.writeFile(
      path.join(targetPath, "index.json"),
      JSON.stringify(payload, null, 2),
      "utf8"
    );
  }
}

// ----------------------------------------------------------------------------
// Build registry/colors/index.json.
// ----------------------------------------------------------------------------
async function buildThemes() {
  const colorsTargetPath = path.join(REGISTRY_PATH, "colors");
  rimraf.sync(colorsTargetPath);
  if (!existsSync(colorsTargetPath)) {
    await fs.mkdir(colorsTargetPath, { recursive: true });
  }

  const colorsData: ColorData = {};
  for (const [color, value] of Object.entries(colors)) {
    if (typeof value === "string") {
      colorsData[color] = value;
      continue;
    }

    if (Array.isArray(value)) {
      colorsData[color] = value.map((item: ColorValue) => ({
        ...item,
        rgbChannel: item.rgb.replace(/^rgb\((\d+),(\d+),(\d+)\)$/, "$1 $2 $3"),
        hslChannel: item.hsl.replace(
          /^hsl\(([\d.]+),([\d.]+%),([\d.]+%)\)$/,
          "$1 $2 $3"
        ),
      }));
      continue;
    }

    if (typeof value === "object" && value !== null) {
      const colorValue = value as ColorValue;
      if ("rgb" in colorValue && "hsl" in colorValue) {
        colorsData[color] = {
          ...colorValue,
          rgbChannel: colorValue.rgb.replace(
            /^rgb\((\d+),(\d+),(\d+)\)$/,
            "$1 $2 $3"
          ),
          hslChannel: colorValue.hsl.replace(
            /^hsl\(([\d.]+),([\d.]+%),([\d.]+%)\)$/,
            "$1 $2 $3"
          ),
        };
      }
      continue;
    }
  }

  await fs.writeFile(
    path.join(colorsTargetPath, "index.json"),
    JSON.stringify(colorsData, null, 2),
    "utf8"
  );

  // ----------------------------------------------------------------------------
  // Build registry/colors/[base].json.
  // ----------------------------------------------------------------------------
  const BASE_STYLES = `@tailwind base;
@tailwind components;
@tailwind utilities;
  `;

  const BASE_STYLES_WITH_VARIABLES = `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: <%- colors.light["background"] %>;
    --foreground: <%- colors.light["foreground"] %>;
    --card: <%- colors.light["card"] %>;
    --card-foreground: <%- colors.light["card-foreground"] %>;
    --popover: <%- colors.light["popover"] %>;
    --popover-foreground: <%- colors.light["popover-foreground"] %>;
    --primary: <%- colors.light["primary"] %>;
    --primary-foreground: <%- colors.light["primary-foreground"] %>;
    --secondary: <%- colors.light["secondary"] %>;
    --secondary-foreground: <%- colors.light["secondary-foreground"] %>;
    --muted: <%- colors.light["muted"] %>;
    --muted-foreground: <%- colors.light["muted-foreground"] %>;
    --accent: <%- colors.light["accent"] %>;
    --accent-foreground: <%- colors.light["accent-foreground"] %>;
    --destructive: <%- colors.light["destructive"] %>;
    --destructive-foreground: <%- colors.light["destructive-foreground"] %>;
    --border: <%- colors.light["border"] %>;
    --input: <%- colors.light["input"] %>;
    --ring: <%- colors.light["ring"] %>;
    --radius: 0.5rem;
    --chart-1: <%- colors.light["chart-1"] %>;
    --chart-2: <%- colors.light["chart-2"] %>;
    --chart-3: <%- colors.light["chart-3"] %>;
    --chart-4: <%- colors.light["chart-4"] %>;
    --chart-5: <%- colors.light["chart-5"] %>;
  }

  .dark {
    --background: <%- colors.dark["background"] %>;
    --foreground: <%- colors.dark["foreground"] %>;
    --card: <%- colors.dark["card"] %>;
    --card-foreground: <%- colors.dark["card-foreground"] %>;
    --popover: <%- colors.dark["popover"] %>;
    --popover-foreground: <%- colors.dark["popover-foreground"] %>;
    --primary: <%- colors.dark["primary"] %>;
    --primary-foreground: <%- colors.dark["primary-foreground"] %>;
    --secondary: <%- colors.dark["secondary"] %>;
    --secondary-foreground: <%- colors.dark["secondary-foreground"] %>;
    --muted: <%- colors.dark["muted"] %>;
    --muted-foreground: <%- colors.dark["muted-foreground"] %>;
    --accent: <%- colors.dark["accent"] %>;
    --accent-foreground: <%- colors.dark["accent-foreground"] %>;
    --destructive: <%- colors.dark["destructive"] %>;
    --destructive-foreground: <%- colors.dark["destructive-foreground"] %>;
    --border: <%- colors.dark["border"] %>;
    --input: <%- colors.dark["input"] %>;
    --ring: <%- colors.dark["ring"] %>;
    --chart-1: <%- colors.dark["chart-1"] %>;
    --chart-2: <%- colors.dark["chart-2"] %>;
    --chart-3: <%- colors.dark["chart-3"] %>;
    --chart-4: <%- colors.dark["chart-4"] %>;
    --chart-5: <%- colors.dark["chart-5"] %>;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}`;

  for (const baseColor of ["slate", "gray", "zinc", "neutral", "stone"]) {
    const base: Record<string, any> = {
      inlineColors: {},
      cssVars: {},
    };
    for (const [mode, values] of Object.entries(colorMapping)) {
      base["inlineColors"][mode] = {};
      base["cssVars"][mode] = {};
      for (const [key, value] of Object.entries(values)) {
        if (typeof value === "string") {
          // Chart colors do not have a 1-to-1 mapping with tailwind colors.
          if (key.startsWith("chart-")) {
            base["cssVars"][mode][key] = value;
            continue;
          }

          const resolvedColor = value.replace(/{{base}}-/g, `${baseColor}-`);
          base["inlineColors"][mode][key] = resolvedColor;

          const [resolvedBase, scale] = resolvedColor.split("-");
          const color =
            scale && Array.isArray(colorsData[resolvedBase])
              ? (colorsData[resolvedBase] as ColorValue[]).find(
                  (item: ColorValue) => item.scale === parseInt(scale)
                )
              : colorsData[resolvedBase];
          if (color && typeof color !== "string" && "hslChannel" in color) {
            base["cssVars"][mode][key] = color.hslChannel;
          }
        }
      }
    }

    // Build css vars.
    base["inlineColorsTemplate"] = template(BASE_STYLES, undefined, {})({});
    base["cssVarsTemplate"] = template(
      BASE_STYLES_WITH_VARIABLES,
      undefined,
      {}
    )({
      colors: base["cssVars"],
    });

    await fs.writeFile(
      path.join(REGISTRY_PATH, `colors/${baseColor}.json`),
      JSON.stringify(base, null, 2),
      "utf8"
    );

    // ----------------------------------------------------------------------------
    // Build registry/themes.css
    // ----------------------------------------------------------------------------
    const THEME_STYLES_WITH_VARIABLES = `
.theme-<%- theme %> {
  --background: <%- colors.light["background"] %>;
  --foreground: <%- colors.light["foreground"] %>;

  --muted: <%- colors.light["muted"] %>;
  --muted-foreground: <%- colors.light["muted-foreground"] %>;

  --popover: <%- colors.light["popover"] %>;
  --popover-foreground: <%- colors.light["popover-foreground"] %>;

  --card: <%- colors.light["card"] %>;
  --card-foreground: <%- colors.light["card-foreground"] %>;

  --border: <%- colors.light["border"] %>;
  --input: <%- colors.light["input"] %>;

  --primary: <%- colors.light["primary"] %>;
  --primary-foreground: <%- colors.light["primary-foreground"] %>;

  --secondary: <%- colors.light["secondary"] %>;
  --secondary-foreground: <%- colors.light["secondary-foreground"] %>;

  --accent: <%- colors.light["accent"] %>;
  --accent-foreground: <%- colors.light["accent-foreground"] %>;

  --destructive: <%- colors.light["destructive"] %>;
  --destructive-foreground: <%- colors.light["destructive-foreground"] %>;

  --ring: <%- colors.light["ring"] %>;

  --radius: <%- colors.light["radius"] %>;
}

.dark .theme-<%- theme %> {
  --background: <%- colors.dark["background"] %>;
  --foreground: <%- colors.dark["foreground"] %>;

  --muted: <%- colors.dark["muted"] %>;
  --muted-foreground: <%- colors.dark["muted-foreground"] %>;

  --popover: <%- colors.dark["popover"] %>;
  --popover-foreground: <%- colors.dark["popover-foreground"] %>;

  --card: <%- colors.dark["card"] %>;
  --card-foreground: <%- colors.dark["card-foreground"] %>;

  --border: <%- colors.dark["border"] %>;
  --input: <%- colors.dark["input"] %>;

  --primary: <%- colors.dark["primary"] %>;
  --primary-foreground: <%- colors.dark["primary-foreground"] %>;

  --secondary: <%- colors.dark["secondary"] %>;
  --secondary-foreground: <%- colors.dark["secondary-foreground"] %>;

  --accent: <%- colors.dark["accent"] %>;
  --accent-foreground: <%- colors.dark["accent-foreground"] %>;

  --destructive: <%- colors.dark["destructive"] %>;
  --destructive-foreground: <%- colors.dark["destructive-foreground"] %>;

  --ring: <%- colors.dark["ring"] %>;
}`;

    const themeCSS = [];
    for (const theme of baseColors) {
      themeCSS.push(
        // @ts-ignore
        template(THEME_STYLES_WITH_VARIABLES)({
          colors: theme.cssVars,
          theme: theme.name,
        })
      );
    }

    await fs.writeFile(
      path.join(REGISTRY_PATH, `themes.css`),
      themeCSS.join("\n"),
      "utf8"
    );

    // ----------------------------------------------------------------------------
    // Build registry/themes/[theme].json
    // ----------------------------------------------------------------------------
    rimraf.sync(path.join(REGISTRY_PATH, "themes"));
    for (const baseColor of ["slate", "gray", "zinc", "neutral", "stone"]) {
      const payload: Record<string, any> = {
        name: baseColor,
        label: baseColor.charAt(0).toUpperCase() + baseColor.slice(1),
        cssVars: {},
      };
      for (const [mode, values] of Object.entries(colorMapping)) {
        payload.cssVars[mode] = {};
        for (const [key, value] of Object.entries(values)) {
          if (typeof value === "string") {
            const resolvedColor = value.replace(/{{base}}-/g, `${baseColor}-`);
            payload.cssVars[mode][key] = resolvedColor;

            const [resolvedBase, scale] = resolvedColor.split("-");
            const colorData = colorsData[resolvedBase];
            const color =
              scale && Array.isArray(colorData)
                ? (colorData as ColorValue[]).find(
                    (item: ColorValue) => item.scale === parseInt(scale)
                  )
                : colorData;
            if (color && typeof color !== "string" && "hslChannel" in color) {
              payload["cssVars"][mode][key] = color.hslChannel;
            }
          }
        }
      }

      const targetPath = path.join(REGISTRY_PATH, "themes");

      // Create directory if it doesn't exist.
      if (!existsSync(targetPath)) {
        await fs.mkdir(targetPath, { recursive: true });
      }

      await fs.writeFile(
        path.join(targetPath, `${payload.name}.json`),
        JSON.stringify(payload, null, 2),
        "utf8"
      );
    }
  }
}

try {
  const result = registrySchema.safeParse(registry);

  if (!result.success) {
    console.error(result.error);
    process.exit(1);
  }

  await buildRegistry(result.data);
  await buildStyles(result.data);
  await buildStylesIndex();
  await buildThemes();

  console.log("✅ All components built!");
} catch (error) {
  console.error(error);
  process.exit(1);
}
