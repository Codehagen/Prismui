// TODO (shadcn): Pull this from the shadcn package.
import { z } from 'zod'

export const registryItemTypeSchema = z.enum([
  'registry:lib',
  'registry:block',
  'registry:component',
  'registry:ui',
  'registry:hook',
  'registry:theme',
  'registry:page',
])

export const registryItemFileSchema = z.object({
  path: z.string(),
  content: z.string().optional(),
  type: registryItemTypeSchema,
  target: z.string().optional(),
})

export const registryItemTailwindSchema = z.object({
  config: z.object({
    content: z.array(z.string()).optional(),
    theme: z.record(z.string(), z.any()).optional(),
    plugins: z.array(z.string()).optional(),
  }),
})

export const registryItemCssVarsSchema = z.object({
  light: z.record(z.string(), z.string()).optional(),
  dark: z.record(z.string(), z.string()).optional(),
})

export const registryItemSchema = z.object({
  name: z.string(),
  type: registryItemTypeSchema,
  title: z.string().optional(),
  description: z.string().optional(),
  dependencies: z.array(z.string()).optional(),
  devDependencies: z.array(z.string()).optional(),
  registryDependencies: z.array(z.string()).optional(),
  files: z.array(registryItemFileSchema),
  tailwind: registryItemTailwindSchema.optional(),
  cssVars: registryItemCssVarsSchema.optional(),
  meta: z.record(z.string(), z.any()).optional(),
  docs: z.string().optional(),
  categories: z.array(z.string()).optional(),
})

export const registrySchema = z.array(registryItemSchema)

export const registryIndexSchema = z.record(z.string(), registryItemSchema)

export type Registry = z.infer<typeof registrySchema>

export type RegistryIndex = z.infer<typeof registryIndexSchema>

// v0 extends the shadcn registry schema.
export const templateSchema = registryItemSchema.extend({
  meta: z.object({
    path: z.string().optional(),
    images: z
      .array(z.object({ url: z.string(), name: z.string(), size: z.number() }))
      .optional(),
    author: z
      .string()
      .min(2, 'Author is required and must be at least 2 characters long.'),
    env: z
      .array(
        z.object({
          name: z.string(),
          url: z.string().optional(),
        })
      )
      .optional(),
  }),
})

export const templateAssetSchema = z.object({
  file: z
    .instanceof(ArrayBuffer)
    .refine(buffer => buffer.byteLength > 0)
    .refine(buffer => buffer.byteLength / (1024 * 1024) <= 5),
})
