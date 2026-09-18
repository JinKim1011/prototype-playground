import type { PrototypeKey } from "@/types/prototypes"
import { access, readFile } from "node:fs/promises"
import path from "node:path"

export async function readPrototypeSource({
  owner,
  slug,
}: PrototypeKey): Promise<string> {
  const filePath = path.join(
    process.cwd(),
    "prototypes",
    owner,
    slug,
    "page.tsx"
  )

  return readFile(filePath, "utf-8")
}

export async function prototypeSourceExists({
  owner,
  slug,
}: PrototypeKey): Promise<boolean> {
  try {
    await access(
      path.join(process.cwd(), "prototypes", owner, slug, "page.tsx")
    )
    return true
  } catch {
    return false
  }
}
