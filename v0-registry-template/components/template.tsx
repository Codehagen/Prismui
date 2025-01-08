import * as React from "react"
import { cache } from "react"

import { getTemplateForDisplay } from "@/lib/templates"
import { TemplateViewer } from "@/components/template-viewer"

const getCachedTemplate = cache(getTemplateForDisplay)

export async function Template({ name }: { name: string }) {
  const template = await getCachedTemplate(name)

  if (!template) {
    return null
  }

  return <TemplateViewer template={template} />
}
