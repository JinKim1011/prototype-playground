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
  templateId?: string | null
}

export type MetadataFile = {
  entries: MetadataEntry[]
}
