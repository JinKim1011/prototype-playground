export type OwnerEntry = {
  id: string
  title: string
  slug: string
}

export type OwnersFile = {
  owners: OwnerEntry[]
}

export type CreateOwnerInput = {
  title: string
}
