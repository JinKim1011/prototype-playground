import { PrototypeKey } from "@/types/prototypes"
import { withKeyedLock } from "@/lib/fs/keyed-lock"
import {
  addPrototype,
  getAllPrototypes,
  removePrototype,
} from "@/lib/prototypes/catalog"
import { generatePrototypeRegistry } from "./registry"
import { prototypeDirectory } from "./path"
import {
  DirectoryRemovalTransaction,
  prepareDirectoryRemoval,
} from "../fs/atomic-remove-directory"
import { isValidPrototypeKey } from "./validate"

export class DeletePrototypeError extends Error {
  readonly code: "INVALID_KEY" | "NOT_FOUND"

  constructor(code: DeletePrototypeError["code"], message: string) {
    super(message ?? code)
    this.name = "DeletePrototypeError"
    this.code = code
  }
}

export async function deletePrototype({
  owner,
  slug,
}: PrototypeKey): Promise<void> {
  if (
    typeof owner !== "string" ||
    typeof slug !== "string" ||
    !isValidPrototypeKey({ owner, slug })
  ) {
    throw new DeletePrototypeError("INVALID_KEY", "Invalid prototype key")
  }

  await withKeyedLock("prototype-publication", async () => {
    const entries = await getAllPrototypes()
    const entry = entries.find(
      (currentPrototype) =>
        currentPrototype.owner === owner && currentPrototype.slug === slug
    )

    if (!entry) {
      throw new DeletePrototypeError("NOT_FOUND", "Prototype not found")
    }

    let transaction: DirectoryRemovalTransaction | undefined
    let metadataRemoved = false

    try {
      transaction = await prepareDirectoryRemoval(
        prototypeDirectory({ owner, slug })
      )

      await removePrototype({ owner, slug })
      metadataRemoved = true

      if (!metadataRemoved) {
        throw new Error("Prototype data could not be removed")
      }

      await generatePrototypeRegistry()

      await transaction.commit()
    } catch (error) {
      const rollbackErrors: unknown[] = []

      try {
        await transaction?.rollback()
      } catch (rollbackError) {
        rollbackErrors.push(rollbackError)
      }

      if (metadataRemoved) {
        try {
          await addPrototype(entry)
        } catch (metadataError) {
          rollbackErrors.push(metadataError)
        }
        try {
          await generatePrototypeRegistry()
        } catch (registryError) {
          rollbackErrors.push(registryError)
        }
      }

      if (rollbackErrors.length > 0) {
        throw new AggregateError(
          [error, ...rollbackErrors],
          "Prototype deletion failed and rollback was incomplete"
        )
      }

      throw error
    }
  })
}
