import { PrototypeKey } from "@/types/prototypes"
import path from "node:path"
import { getOwnerById } from "../owners/catalog"

const prototypesRoot = path.join(process.cwd(), "prototypes")

export function prototypeDirectory(ownerSlug: string, prototypeSlug: string) {
  return path.join(prototypesRoot, ownerSlug, prototypeSlug)
}

export async function prototypePage({ ownerId, slug }: PrototypeKey) {
  const directory = await prototypeDirectory({ ownerId, slug })

  return path.join(directory, "page.tsx")
}
