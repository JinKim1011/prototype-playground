export type DEFAULT_TEMPLATE_KEY = "blank"

export type TemplateEntry = CreateTemplateInput & {
  key: string
  slug: string
  owner: string
  createdAt: string
  updatedAt: string
}

export type TemplatesFile = {
  templates: TemplateEntry[]
}

export type CreateTemplateInput = {
  title: string
  description: string
}
