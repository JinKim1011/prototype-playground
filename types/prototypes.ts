export type PrototypeKey = {
  owner: string
  slug: string
}

export type CreatePrototypeInput = Pick<PrototypeKey, "owner"> & {
  title: string
  description?: string
  fromTemplateKey?: string
}
