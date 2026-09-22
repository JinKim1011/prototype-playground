import { TemplateItemGroup } from "@/components/platform/templates/template-item-group"
import { getTemplates } from "@/lib/templates/catalog"

export default async function TemplatesPage() {
  const templates = await getTemplates()
  return (
    <TemplateItemGroup
      templates={templates.map((template) => ({
        id: template.id,
        title: template.title,
        slug: template.slug,
        createdAt: template.createdAt,
        updatedAt: template.updatedAt,
        description: template.description,
      }))}
    />
  )
}
