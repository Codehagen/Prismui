import {
  registryIndexSchema,
  registryItemFileSchema,
  registryItemSchema,
} from "@/lib/registry/schema"
import { transform } from "@/lib/registry/transformers"
import { promises as fs } from "fs"
import path from "path"
import { z } from "zod"

export const REGISTRY_PATH = "app/registry"

export async function getRegistryIndex() {
  const { index } = await import("@/lib/registry/__index__")
  return registryIndexSchema.parse(index)
}

export async function getRegistryItem(name: string) {
  const index = await getRegistryIndex()
  const item = index[name]

  const result = registryItemSchema.safeParse(item)
  if (!result.success) {
    return null
  }

  let files: typeof result.data.files = []
  for (const file of item.files) {
    const content = await getFileContent(file.path)
    const relativePath = path.relative(process.cwd(), file.path)

    const transformed = await transform({
      file: {
        ...file,
        path: relativePath,
        content,
      },
    })

    files.push(transformed)
  }

  const rootInsideApp = files[0].path.includes("/app/page.tsx")

  files = fixFilePaths(files)

  const parsed = registryItemSchema.safeParse({
    ...result.data,
    files,
    meta: {
      ...result.data.meta,
      path: `/registry/${name}${rootInsideApp ? "/app" : ""}`,
    },
  })

  if (!parsed.success) {
    console.error(parsed.error.message)
    return null
  }

  return parsed.data
}

async function getFileContent(filePath: string) {
  const imageExtensions = [
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".svg",
    ".webp",
    ".ico",
  ]
  if (imageExtensions.some((ext) => filePath.toLowerCase().endsWith(ext))) {
    return ""
  }

  let code = await fs.readFile(
    path.join(process.cwd(), REGISTRY_PATH, filePath),
    "utf-8"
  )

  // Fix imports.
  code = fixImport(code)

  return code
}

function getFileTarget(file: z.infer<typeof registryItemFileSchema>) {
  let target = file.target

  if (!target || target === "") {
    const fileName = file.path.split("/").pop()
    if (file.type === "registry:block" || file.type === "registry:component") {
      target = `components/${fileName}`
    }

    if (file.type === "registry:ui") {
      target = `components/ui/${fileName}`
    }

    if (file.type === "registry:hook") {
      target = `hooks/${fileName}`
    }

    if (file.type === "registry:lib") {
      target = `lib/${fileName}`
    }
  }

  return target
}

function fixFilePaths(files: z.infer<typeof registryItemSchema>["files"]) {
  // Resolve all paths relative to the first file's directory.
  const firstFilePath = files[0].path
  const firstFilePathDir = path.dirname(firstFilePath)

  return files.map((file) => {
    return {
      ...file,
      path: path.relative(firstFilePathDir, file.path),
      target: getFileTarget(file),
    }
  })
}

export function fixImport(content: string) {
  const regex = /@\/(.+?)\/((?:.*?\/)?(?:components|ui|hooks|lib))\/([\w-]+)/g

  const replacement = (
    match: string,
    path: string,
    type: string,
    component: string
  ) => {
    if (type.endsWith("components")) {
      return `@/components/${component}`
    } else if (type.endsWith("ui")) {
      return `@/components/ui/${component}`
    } else if (type.endsWith("hooks")) {
      return `@/hooks/${component}`
    } else if (type.endsWith("lib")) {
      return `@/lib/${component}`
    }

    return match
  }

  return content.replace(regex, replacement)
}

export type FileTree = {
  name: string
  path?: string
  children?: FileTree[]
}

export function createFileTreeForRegistryItemFiles(
  files: Array<{ path: string; target?: string }>
) {
  const root: FileTree[] = []

  for (const file of files) {
    const path = file.target ?? file.path
    const parts = path.split("/")
    let currentLevel = root

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i]
      const isFile = i === parts.length - 1
      const existingNode = currentLevel.find((node) => node.name === part)

      if (existingNode) {
        if (isFile) {
          // Update existing file node with full path
          existingNode.path = path
        } else {
          // Move to next level in the tree
          currentLevel = existingNode.children!
        }
      } else {
        const newNode: FileTree = isFile
          ? { name: part, path }
          : { name: part, children: [] }

        currentLevel.push(newNode)

        if (!isFile) {
          currentLevel = newNode.children!
        }
      }
    }
  }

  return root
}
