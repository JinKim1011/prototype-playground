import { readFile, writeFile } from "node:fs/promises"
import { OwnerEntry, OwnersFile } from "@/types/owners"
import path from "node:path"
import { writeFileAtomically } from "@/lib/fs/atomic-write"
import { withKeyedLock } from "@/lib/fs/keyed-lock"

const ownersPath = path.join(process.cwd(), "data", "owners.json")
const OWNER_CATALOG_LOCK = "owner-catalog"

async function readOwnersFile(): Promise<OwnersFile> {
  const json = await readFile(ownersPath, "utf-8")

  return JSON.parse(json) as OwnersFile
}

async function updateOwners(
  update: (data: OwnersFile) => OwnersFile
): Promise<void> {
  await withKeyedLock(OWNER_CATALOG_LOCK, async () => {
    const data = await readOwnersFile()
    const nextData = update(data)

    if (nextData === data) {
      return
    }

    await writeFileAtomically(ownersPath, JSON.stringify(nextData, null, 2))
  })
}

async function writeOwnersFile(data: OwnersFile): Promise<void> {
  await writeFile(ownersPath, JSON.stringify(data, null, 2), "utf-8")
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
    ...data,
    owners: [...data.owners, owner],
  }))
}

export async function removeOwner(id: string): Promise<void> {
  const data = await readOwnersFile()
  const nextOwners = data.owners.filter((owner) => owner.id != id)

  if (nextOwners.length === data.owners.length) {
    return
  }

  await writeOwnersFile({
    ...data,
    owners: nextOwners,
  })
}
