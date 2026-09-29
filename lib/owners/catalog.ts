import { readFile, writeFile } from "node:fs/promises"
import { OwnerEntry, OwnersFile } from "@/types/owners"
import path from "node:path"

const ownersPath = path.join(process.cwd(), "data", "owners.json")

async function readOwnersFile(): Promise<OwnersFile> {
  const json = await readFile(ownersPath, "utf-8")

  return JSON.parse(json) as OwnersFile
}

async function writeOwnersFile(data: OwnersFile): Promise<void> {
  await writeFile(ownersPath, JSON.stringify(data, null, 2), "utf-8")
}

export async function getOwners(): Promise<OwnerEntry[]> {
  const data = await readOwnersFile()

  return data.owners
}

async function ownerExists(slug: string): Promise<boolean> {
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
