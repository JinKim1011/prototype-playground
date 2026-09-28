import { access } from "node:fs/promises"
import { prototypePage } from "@/lib/prototypes/path"
import type { PrototypeRouteKey } from "@/lib/prototypes/keys"

export async function prototypeSourceExists({
  ownerSlug,
  prototypeSlug,
}: PrototypeRouteKey): Promise<boolean> {
  try {
    await access(prototypePage(ownerSlug, prototypeSlug))
    return true
  } catch {
    return false
  }
}
