import { readFile } from "node:fs/promises"
import { OwnerEntry, OwnersFile } from "@/types/owners"
import path from "node:path"
import { writeFileAtomically } from "@/lib/fs/atomic-write"
import { withKeyedLock } from "@/lib/fs/keyed-lock"

const ownersPath = path.join(process.cwd(), "data", "owners.json")

async function readOwnersFile(): Promise<OwnersFile> {
  const json = await readFile(ownersPath, "utf-8")

  return JSON.parse(json) as OwnersFile
}

export const OWNER_CATALOG_LOCK = "owner-catalog"

export async function updateOwners<T>(
  update: (data: OwnersFile) =>
    | Promise<{ data: OwnersFile; result: T }>
    | {
        data: OwnersFile
        result: T
      }
): Promise<T> {
  return withKeyedLock(OWNER_CATALOG_LOCK, async () => {
    const data = await readOwnersFile()
    const { data: nextData, result } = await update(data)

    if (nextData !== data) {
      await writeFileAtomically(ownersPath, JSON.stringify(nextData, null, 2))
    }

    return result
  })
}

export async function getOwners(): Promise<OwnerEntry[]> {
  const data = await readOwnersFile()

  return data.owners
}

export async function ownerExists(slug: string): Promise<boolean> {
  const owners = await getOwners()

  return owners.some((owner) => owner.slug === slug)
}

export async function getOwnerById(
  id: string
): Promise<OwnerEntry | undefined> {
  const owners = await getOwners()

  return owners.find((owner) => owner.id === id)
}

export async function getOwnerBySlug(
  slug: string
): Promise<OwnerEntry | undefined> {
  const owners = await getOwners()

  return owners.find((owner) => owner.slug === slug)
}

export async function addOwner(owner: OwnerEntry): Promise<void> {
  await updateOwners((data) => ({
    data: {
      ...data,
      owners: [...data.owners, owner],
    },
    result: undefined,
  }))
}
