import { CreateOwnerInput, OwnerEntry } from "@/types/owners"
import { assertOwnerName, ownerSlugFromName } from "@/lib/owners/validate"
import {
  OWNER_CATALOG_LOCK,
  addOwner,
  ownerExists,
  removeOwner,
} from "@/lib/owners/catalog"
import { withKeyedLock } from "@/lib/fs/keyed-lock"
import {
  ownerPrototypeDirectory,
  removeOwnerPrototypeDirectory,
  directoryExists,
} from "@/lib/owners/path"
import { mkdir } from "node:fs/promises"

export type OwnerCreationTransaction = {
  owner: OwnerEntry
  commit(): Promise<void>
  rollback(): Promise<void>
}

export class CreateOwnerError extends Error {
  readonly code: "INVALID_INPUT" | "DUPLICATE_OWNER"

  constructor(code: CreateOwnerError["code"], message?: string) {
    super(message ?? code)
    this.name = "CreateOwnerError"
    this.code = code
  }
}

function buildOwner(input: CreateOwnerInput): OwnerEntry {
  let title: string

  try {
    title = assertOwnerName(input.title)
  } catch {
    throw new CreateOwnerError("INVALID_INPUT")
  }

  const slug = ownerSlugFromName(title)

  return {
    id: `owner:${slug}`,
    title,
    slug,
  }
}

function createTransaction(owner: OwnerEntry, existedBefore: boolean) {
  let settled = false

  return {
    owner,
    async commit() {
      await withKeyedLock(OWNER_CATALOG_LOCK, async () => {
        settled = true
      })
    },
    async rollback() {
      await updateOwners(async (data) => {
        if (settled) {
          return {
            data,
            result: undefined,
          }
        }

        if (!existedBefore) {
          await removeOwnerPrototypeDirectory(owner.slug)
        }

        return {
          data: {
            ...data,
            owners: data.owners.filter((entry) => entry.id !== owner.id),
          },
          result: undefined,
        }
      })

      settled = true
    },
  }
}

export async function createOwner(
  input: CreateOwnerInput
): Promise<OwnerCreationTransaction> {
  const owner = buildOwner(input)

  return updateOwners(async (data) => {
    if (data.owners.some((existing) => existing.slug === owner.slug)) {
      throw new CreateOwnerError("DUPLICATE_OWNER")
    }

    const directory = ownerPrototypeDirectory(owner.slug)
    const existedBefore = await directoryExists(directory)

    try {
      await mkdir(directory, { recursive: true })

      return {
        data: {
          ...data,
          owners: [...data.owners, owner],
        },
        result: createTransaction(owner, existedBefore),
      }
    } catch (error) {
      if (!existedBefore) {
        await removeOwnerPrototypeDirectory(owner.slug).catch(
          (cleanupError) => {
            console.error("Failed to clean up owner directory", cleanupError)
          }
        )
      }

      throw error
    }
  })
}
