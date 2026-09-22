import { PrototypeKey } from "@/types/prototypes"
import { withKeyedLock } from "@/lib/fs/keyed-lock"
import {
  addPrototype,
  getAllPrototypes,
  prototypeExists,
  removePrototype,
} from "@/lib/prototypes/catalog"
import { generatePrototypeRegistry } from "./registry"
import { prototypeDirectory } from "./path"
import {
  DirectoryRemovalTransaction,
  prepareDirectoryRemoval,
} from "../fs/atomic-remove-directory"

export class DeletePrototypeError extends Error {
  readonly code: "INVALID_KEY" | "NOT_FOUND"

  constructor(code: DeletePrototypeError["code"], message: string) {
    super(message)
    this.name = "DeletePrototypeError"
    this.code = code
  }
}

export async function deletePrototype({
  owner,
  slug,
}: PrototypeKey): Promise<void> {
  await withKeyedLock("prototype-publication", async () => {
    const exists = await prototypeExists({ owner, slug })

    if (!exists) {
      throw new DeletePrototypeError("NOT_FOUND", "Prototype not found")
    }

    let transaction: DirectoryRemovalTransaction | undefined
    let metadataRemoved = false

    try {
      transaction = await prepareDirectoryRemoval(
        prototypeDirectory({ owner, slug })
      )

      metadataRemoved = await removePrototype({ owner, slug })

      if (!metadataRemoved) {
        throw new Error("Prototype data could not be removed")
      }

      await generatePrototypeRegistry()

      await transaction.commit()
    } catch (error) {
      await transaction?.rollback().catch(() => {})

      if (metadataRemoved) {
        await addPrototype(entry).catch(() => {})
        await generatePrototypeRegistry().catch(() => {})
      }

      throw error
    }
  })
}
