import { z } from "zod"
import { registryItemSchema } from "@/lib/registry/schema"
import {
  createFileTreeForRegistryItemFiles,
  getRegistryIndex,
  getRegistryItem,
} from "@/lib/registry/registry"
import { highlightCode } from "@/lib/highlight-code"

export type Template = z.infer<typeof registryItemSchema>

export async function getTemplates() {
  const index = await getRegistryIndex()
  return Object.keys(index)
}

export async function getTemplate(name: string) {
  const template = await getRegistryItem(name)

  if (!template) {
    return null
  }

  delete template.meta?.component

  return template
}

export async function getTemplateComponent(name: string) {
  const template = await getRegistryItem(name)

  if (!template) {
    return null
  }

  return template.meta?.component
}

export async function getTemplateForDisplay(name: string) {
  const template = await getTemplate(name)

  if (!template) {
    return null
  }

  return {
    ...template,
    meta: {
      ...template.meta,
      path: template.meta?.path ?? `/registry/${name}`,
      iframeHeight: template.meta?.iframeHeight ?? "850px",
      tree: createFileTreeForRegistryItemFiles(template.files),
      highlightedFiles: await Promise.all(
        template.files.map(async (file) => ({
          ...file,
          highlightedContent: await highlightCode(file.content ?? ""),
        }))
      ),
    },
  }
}
