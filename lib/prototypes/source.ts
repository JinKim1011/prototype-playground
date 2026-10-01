import { access } from "node:fs/promises"
import { getPrototypePage } from "@/lib/prototypes/path"
import type { PrototypeRouteKey } from "@/lib/prototypes/keys"

export async function prototypeSourceExists({
  ownerSlug,
  prototypeSlug,
}: PrototypeRouteKey): Promise<boolean> {
  try {
    await access(getPrototypePage(ownerSlug, prototypeSlug))
    return true
  } catch {
    return false
  }
}
