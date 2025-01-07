import { type ReactNode } from "react";
import { z } from "zod";

export interface CliCommands {
  npm: string;
  pnpm: string;
  yarn: string;
  bun: string;
}

export const registryItemTypeSchema = z.enum([
  "registry:ui",
  "registry:lib",
  "registry:hook",
  "registry:theme",
  "registry:block",
  "registry:page",
  "registry:style",
  "components",
  "examples",
  "hooks",
  "utils",
  "blocks",
  "themes",
  "sections",
]);

export type RegistryItemType = z.infer<typeof registryItemTypeSchema>;

export interface RegistryFile {
  path: string;
  type: string;
  content?: string;
  target?: string;
}

export interface RegistryItem {
  name: string;
  type: RegistryItemType;
  component?: React.ComponentType;
  code?: string;
  cli?: string | CliCommands;
  files?: Array<string | RegistryFile>;
  dependencies?: string[];
  registryDependencies?: string[];
  category?: string;
  subcategory?: string;
  cssVars?: {
    light: Record<string, string>;
    dark: Record<string, string>;
  };
  meta?: {
    path?: string;
    images?: Array<{ url: string; name: string; size: number }>;
    author?: string;
    env?: Array<{ name: string; url?: string }>;
    component?: React.ComponentType;
  };
  title?: string;
  description?: string;
}

export interface RegistryEntry extends Omit<RegistryItem, "files"> {
  files?: RegistryFile[];
  tailwind?: {
    config: {
      plugins: string[];
    };
  };
}

export const registryEntrySchema = z.object({
  name: z.string(),
  type: registryItemTypeSchema,
  component: z.any().optional(),
  code: z.string().optional(),
  files: z
    .array(
      z.object({
        path: z.string(),
        type: z.string(),
        content: z.string().optional(),
        target: z.string().optional(),
      })
    )
    .optional(),
  registryDependencies: z.array(z.string()).optional(),
  dependencies: z.array(z.string()).optional(),
  category: z.string().optional(),
  subcategory: z.string().optional(),
  cssVars: z
    .object({
      light: z.record(z.string()),
      dark: z.record(z.string()),
    })
    .optional(),
  tailwind: z
    .object({
      config: z.object({
        plugins: z.array(z.string()),
      }),
    })
    .optional(),
  meta: z
    .object({
      path: z.string().optional(),
      images: z
        .array(
          z.object({
            url: z.string(),
            name: z.string(),
            size: z.number(),
          })
        )
        .optional(),
      author: z
        .string()
        .min(2, "Author is required and must be at least 2 characters long.")
        .optional(),
      env: z
        .array(
          z.object({
            name: z.string(),
            url: z.string().optional(),
          })
        )
        .optional(),
      component: z.any().optional(),
    })
    .optional(),
  title: z.string().optional(),
  description: z.string().optional(),
});

export type Registry = RegistryItem[];

export const registrySchema = z.array(registryEntrySchema);

// V0 Template Schema
export const templateSchema = registryEntrySchema.extend({
  meta: z.object({
    path: z.string().optional(),
    images: z
      .array(z.object({ url: z.string(), name: z.string(), size: z.number() }))
      .optional(),
    author: z
      .string()
      .min(2, "Author is required and must be at least 2 characters long."),
    env: z
      .array(
        z.object({
          name: z.string(),
          url: z.string().optional(),
        })
      )
      .optional(),
  }),
});

export const templateAssetSchema = z.object({
  file: z
    .instanceof(ArrayBuffer)
    .refine((buffer) => buffer.byteLength > 0)
    .refine((buffer) => buffer.byteLength / (1024 * 1024) <= 5),
});
