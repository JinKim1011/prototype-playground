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
} from "@/lib/fs/atomic-remove-directory"
import { getOwnerBySlug } from "../owners/catalog"

export class DeletePrototypeError extends Error {
  readonly code: "INVALID_KEY" | "NOT_FOUND"

  constructor(code: DeletePrototypeError["code"], message: string) {
    super(message ?? code)
    this.name = "DeletePrototypeError"
    this.code = code
  }
}

export async function deletePrototype(
  ownerSlug: string,
  prototypeSlug: string
): Promise<void> {
  if (typeof ownerSlug !== "string" || typeof prototypeSlug !== "string") {
    throw new DeletePrototypeError("INVALID_KEY", "Invalid prototype key")
  }

  const owner = await getOwnerBySlug(ownerSlug)

  if (!owner) {
    throw new DeletePrototypeError("NOT_FOUND", "Owner not found")
  }

  await withKeyedLock("prototype-publication", async () => {
    const entries = await getAllPrototypes()
    const entry = entries.find(
      (currentPrototype) =>
        currentPrototype.ownerId === owner.id &&
        currentPrototype.slug === prototypeSlug
    )

    if (!entry) {
      throw new DeletePrototypeError("NOT_FOUND", "Prototype not found")
    }

    let transaction: DirectoryRemovalTransaction | undefined
    let metadataRemoved = false

    try {
      transaction = await prepareDirectoryRemoval(
        prototypeDirectory(ownerSlug, prototypeSlug)
      )

      await removePrototype(ownerSlug, prototypeSlug)
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
