import { randomUUID } from "node:crypto"
import { cp, rename, rm } from "node:fs/promises"
import path from "node:path"

export async function copyDirectoryAtomically(
  sourceDirectory: string,
  destinationDirectory: string
): Promise<void> {
  const parentDirectory = path.dirname(destinationDirectory)
  const name = path.basename(destinationDirectory)
  const stagingDirectory = path.join(
    parentDirectory,
    `.${name}.${randomUUID()}.tmp`
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
