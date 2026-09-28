import { access } from "node:fs/promises"
import { prototypePage } from "@/lib/prototypes/path"

export async function prototypeSourceExists(
  ownerSlug: string,
  prototypeSlug: string
): Promise<boolean> {
  try {
    await access(prototypePage(ownerSlug, prototypeSlug))
    return true
  } catch {
    return false
  }
}
