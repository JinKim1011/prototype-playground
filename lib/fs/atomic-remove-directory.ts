import { randomUUID } from "node:crypto"
import { rename, rm } from "node:fs/promises"
import path from "node:path"

export type DirectoryRemovalTransaction = {
  commit(): Promise<void>
  rollback(): Promise<void>
}

export async function prepareDirectoryRemoval(
  directory: string
): Promise<DirectoryRemovalTransaction> {
  const backupDirectory = path.join(
    path.dirname(directory),
    `.${path.basename(directory)}.${randomUUID()}.backup`
  )

  let directoryBackedUp = false

  try {
    await rename(directory, backupDirectory)
    directoryBackedUp = true

    return {
      async commit() {
        await rm(backupDirectory, {
          recursive: true,
          force: true,
        })
      },

      async rollback() {
        if (!directoryBackedUp) {
          return
        }
        await rename(backupDirectory, directory)
      },
    }
  } catch (error) {
    if (directoryBackedUp) {
      await rename(backupDirectory, directory).catch(() => {})
    }

    throw error
  }
}
