import { registryItemSchema } from "@/lib/registry/schema"
import { replacer } from "@/lib/registry/transformers/replacer"
import { promises as fs } from "fs"
import { tmpdir } from "os"
import path from "path"
import { Project, ScriptKind, type SourceFile } from "ts-morph"
import { z } from "zod"

export type Transformer<Output = SourceFile> = (opts: {
  file: z.infer<typeof registryItemSchema>["files"][number]
  sourceFile: SourceFile
}) => Promise<Output>

const project = new Project({
  compilerOptions: {},
})

const transformers = [replacer] satisfies Transformer[]

export async function transform(opts: {
  file: z.infer<typeof registryItemSchema>["files"][number]
}) {
  const tempFile = await createTempSourceFile(opts.file.path)
  const sourceFile = project.createSourceFile(tempFile, opts.file.content, {
    scriptKind: ScriptKind.TSX,
    overwrite: true,
  })

  for (const transformer of transformers) {
    await transformer({ sourceFile, ...opts })
  }

  return {
    ...opts.file,
    content: sourceFile.getFullText(),
  }
}

async function createTempSourceFile(filename: string) {
  const dir = await fs.mkdtemp(path.join(tmpdir(), "v0-registry-"))
  return path.join(dir, filename)
}
