export type PrototypeKey = {
  owner: string
  slug: string
}

export type CreatePrototypeInput = Pick<PrototypeKey, "owner"> & {
  title: string
  description?: string
  fromTemplateId?: string
}

export type PrototypeEntry = {
  id: string
  owner: string
  templateId?: string | null
  slug: string
  title: string
  description: string
  updatedAt: string
  createdAt: string
}

export type PrototypesFile = {
  entries: PrototypeEntry[]
}

export type PrototypeListItem = {
  id: string
  owner: string
  slug: string
  title: string
  updatedAt: string
}
