import { PrototypeKey } from "@/types/prototypes"
import path from "node:path"
import { getOwnerById } from "../owners/catalog"

const prototypesRoot = path.join(process.cwd(), "prototypes")

export async function prototypeDirectory({ ownerId, slug }: PrototypeKey) {
  const owner = await getOwnerById(ownerId)

  if (!owner) {
    throw new Error(`Onwer(${ownerId}) not found.`)
  }

  return path.join(prototypesRoot, owner.slug, slug)
}

export async function prototypePage({ ownerId, slug }: PrototypeKey) {
  const directory = await prototypeDirectory({ ownerId, slug })

  return path.join(directory, "page.tsx")
}
