import { PrototypeKey } from "@/types/prototypes"
import { readFile } from "node:fs/promises"
import path from "node:path"

export async function readPrototypeSource({
  owner,
  slug,
}: PrototypeKey): Promise<string> {
  const filePath = path.join(
    process.cwd(),
    "src",
    "prototypes",
    owner,
    slug,
    "page.tsx"
  )

  return readFile(filePath, "utf-8")
}
