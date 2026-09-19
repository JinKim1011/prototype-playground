import { randomUUID } from "node:crypto"
import { cp, rename, rm } from "node:fs/promises"
import path from "node:path"

export async function copyDirectoryAtomically(
  sourceDirectory: string,
  destinationDirectory: string
): Promise<void> {
  const stagingDirectory = path.join(
    path.dirname(destinationDirectory),
    `.${path.basename(destinationDirectory)}.${randomUUID()}.tmp`
  )

  try {
    await cp(sourceDirectory, stagingDirectory, {
      recursive: true,
      force: false,
      errorOnExist: true,
    })

    await rename(stagingDirectory, destinationDirectory)
  } catch (error) {
    await rm(stagingDirectory, {
      recursive: true,
      force: true,
    }).catch(() => {})

    throw error
  }
}
