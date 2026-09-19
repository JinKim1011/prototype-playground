import { randomUUID } from "node:crypto"
import { rename, rm, writeFile } from "node:fs/promises"
import path from "node:path"

export async function writeFileAtomically(
  filePath: string,
  content: string
): Promise<void> {
  const temporaryPath = path.join(
    path.dirname(filePath),
    `.${path.basename(filePath)}.${randomUUID()}.tmp`
  )

  try {
    await writeFile(temporaryPath, content, "utf-8")
    await rename(temporaryPath, filePath)
  } catch (error) {
    await rm(temporaryPath, { force: true }).catch(() => {})
    throw error
  }
}
