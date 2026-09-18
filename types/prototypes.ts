export type PrototypeKey = {
  owner: string
  slug: string
}

export type CreatePrototypeInput = PrototypeKey & {
  title: string
  description?: string
  fromTemplateKey?: string
}
