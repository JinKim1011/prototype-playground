export type TemplateEntry = {
  id: string
  title: string
  description: string
  slug: string
  createdAt: string
  updatedAt: string
}

export type TemplatesFile = {
  templates: TemplateEntry[]
}

export type CreateTemplateInput = {
  title: string
  description?: string
}
