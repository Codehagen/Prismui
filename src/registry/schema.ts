import { z } from "zod";

export const registryItemTypeSchema = z.enum([
  "registry:ui",
  "registry:block",
  "registry:component",
  "registry:example",
  "registry:lib",
  "registry:hook",
  "registry:theme",
  "registry:page",
  "registry:style",
]);

export type RegistryItemType = z.infer<typeof registryItemTypeSchema>;

export const registryEntrySchema = z.object({
  name: z.string(),
  type: registryItemTypeSchema,
  category: z.string().optional(),
  subcategory: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
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
  cli: z
    .object({
      npm: z.string(),
      pnpm: z.string(),
      yarn: z.string(),
      bun: z.string(),
    })
    .optional(),
  dependencies: z.array(z.string()).optional(),
  registryDependencies: z.array(z.string()).optional(),
  meta: z
    .object({
      path: z.string().optional(),
      images: z
        .array(
          z.object({ url: z.string(), name: z.string(), size: z.number() })
        )
        .optional(),
      author: z
        .string()
        .min(2, "Author is required and must be at least 2 characters long")
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
});

export type RegistryItem = z.infer<typeof registryEntrySchema>;

export const registrySchema = z.array(registryEntrySchema);

export const templateSchema = registryEntrySchema.extend({
  meta: z.object({
    path: z.string().optional(),
    images: z
      .array(z.object({ url: z.string(), name: z.string(), size: z.number() }))
      .optional(),
    author: z
      .string()
      .min(2, "Author is required and must be at least 2 characters long"),
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
