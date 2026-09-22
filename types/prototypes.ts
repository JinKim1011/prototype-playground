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
  slug: string
  title: string
  description: string
  createdAt: string
  updatedAt: string
  templateId?: string | null
}

export type PrototypesFile = {
  entries: PrototypeEntry[]
}
