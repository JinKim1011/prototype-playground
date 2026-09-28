import { readFile } from "node:fs/promises"
import { OwnerEntry, OwnersFile } from "@/types/owners"
import path from "node:path"

const ownersPath = path.join(process.cwd(), "data", "owners.json")

export async function getOwners(): Promise<OwnerEntry[]> {
  const json = await readFile(ownersPath, "utf-8")
  const data = JSON.parse(json) as OwnersFile

  return data.owners
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
