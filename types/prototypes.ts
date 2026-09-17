export type RegistryKind = "prototype" | "template"

export type MetadataEntry = {
  kind: RegistryKind
  id: string
  owner: string
  slug: string
  title: string
  description: string
  createdAt: string
  updatedAt: string
  templateKey?: string | null
}

export type MetadataFile = {
  entries: MetadataEntry[]
}

export type CreatePrototypeInput = {
  owner: string
  slug: string
  title: string
  description?: string
  fromTemplateKey?: string
}
