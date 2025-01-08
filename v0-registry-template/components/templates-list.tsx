import { Template } from '@/components/template'
import { getTemplates } from '@/lib/templates'

export async function TemplatesList() {
  const templates = await getTemplates()

  if (!templates.length) {
    return (
      <div className="text-muted-foreground py-8 text-center text-xs">
        No templates found
      </div>
    )
  }

  return (
    <div className="grid items-start gap-24">
      {templates.map(name => (
        <Template key={name} name={name} />
      ))}
    </div>
  )
}
