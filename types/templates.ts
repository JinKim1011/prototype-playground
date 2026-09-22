export type TemplateEntry = TemplateListItem & {
  updatedAt: string
  description: string
}

export type TemplatesFile = {
  templates: TemplateEntry[]
}

export type CreateTemplateInput = {
  title: string
  description?: string
}

export type TemplateListItem = {
  id: string
  title: string
  slug: string
  createdAt: string
}
