import { randomUUID } from "node:crypto"
import { cp, rename, rm } from "node:fs/promises"
import path from "node:path"

type DirectoryTransaction = {
  commit(): Promise<void>
}

export async function copyDirectoryAtomically(
  sourceDirectory: string,
  destinationDirectory: string
): Promise<DirectoryTransaction> {
  const parentDirectory = path.dirname(destinationDirectory)
  const name = path.basename(destinationDirectory)
  const stagingDirectory = path.join(
    parentDirectory,
    `.${name}.${randomUUID()}.tmp`
  )
  const backupDirectory = path.join(
    parentDirectory,
    `.${name}.${randomUUID}.backup`
  )

  let destinationBackedUp = false

  try {
    await cp(sourceDirectory, stagingDirectory, {
      recursive: true,
      force: false,
      errorOnExist: true,
    })

    try {
      await rename(destinationDirectory, backupDirectory)
      destinationBackedUp = true
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
        throw error
      }
    }

    await rename(stagingDirectory, destinationDirectory)

    return {
      async commit() {
        if (destinationBackedUp) {
          await rm(backupDirectory, { recursive: true, force: true })
        }
      },
    }
  } catch (error) {
    await rm(stagingDirectory, {
      recursive: true,
      force: true,
    }).catch(() => {})

    if (destinationBackedUp) {
      await rename(backupDirectory, destinationDirectory).catch(() => {})
    }

    throw error
  }
}
