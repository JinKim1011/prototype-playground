export type TemplateKey = "blank" // When new template added, update the union

export type TemplateEntry = {
  key: string
  label: string
  slug: string
  owner: string
  description: string
  createdAt: string
  updatedAt: string
}
