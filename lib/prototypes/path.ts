import { PrototypeKey } from "@/types/prototypes"
import path from "node:path"

const prototypesRoot = path.join(process.cwd(), "prototypes")

export function prototypeDirectory({ owner, slug }: PrototypeKey) {
  return path.join(prototypesRoot, owner, slug)
}

export function prototypePage({ owner, slug }: PrototypeKey) {
  return path.join(prototypeDirectory({ owner, slug }), "page.tsx")
}
