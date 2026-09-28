export type PrototypeKey = {
  ownerId: string
  slug: string
}

export type CreatePrototypeInput = {
  title: string
  ownerId: string
  description?: string
  fromTemplateId?: string
}

export type PrototypeEntry = {
  id: string
  ownerId: string
  templateId: string
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
  ownerId: string
  slug: string
  title: string
  updatedAt: string
}
