export type PrototypeKey = {
  owner: string
  slug: string
}

export type CreatePrototypeInput = Pick<PrototypeKey, "owner"> & {
  title: string
  description?: string
  fromTemplateId?: string
}

export type PrototypeEntry = PrototypeListItem & {
  description: string
  createdAt: string
  templateId?: string | null
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
