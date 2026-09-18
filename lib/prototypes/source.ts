import type { PrototypeKey } from "@/types/prototypes"
import { access, readFile } from "node:fs/promises"
import { prototypePage } from "./path"

export async function readPrototypeSource({
  owner,
  slug,
}: PrototypeKey): Promise<string> {
  return readFile(prototypePage({ owner, slug }), "utf-8")
}

export async function prototypeSourceExists({
  owner,
  slug,
}: PrototypeKey): Promise<boolean> {
  try {
    await access(prototypePage({ owner, slug }))
    return true
  } catch {
    return false
  }
}
