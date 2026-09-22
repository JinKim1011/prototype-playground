"use client"

import { ItemGroup } from "@/components/platform/ui/item"
import { TemplateItem } from "@/components/platform/templates/template-item"
import type { TemplateListItem } from "@/types/templates"

type TemplateItemGroupProps = {
  templates: TemplateListItem[]
}

export function TemplateItemGroup({ templates }: TemplateItemGroupProps) {
  return (
    <ItemGroup className="-mx-2 w-[calc(100%+1rem)] py-3">
      {templates.map((template) => (
        <TemplateItem key={template.id} template={template} />
      ))}
    </ItemGroup>
  )
}
