export type DEFAULT_TEMPLATE_KEY = "blank"

export type TemplateEntry = {
  key: string
  label: string
  slug: string
  owner: string
  description: string
  createdAt: string
  updatedAt: string
}

export type TemplatesFile = {
  templates: TemplateEntry[]
}
