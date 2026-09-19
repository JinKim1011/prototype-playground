import type { MetadataEntry, MetadataFile } from "@/types/metadata"
import type { PrototypeKey } from "@/types/prototypes"
import { readFile } from "node:fs/promises"
import { writeFileAtomically } from "@/lib/fs/atomic-write"
import path from "node:path"

const metadataPath = path.join(process.cwd(), "data/metadata.json")

async function readMetadataFile(): Promise<MetadataFile> {
  const json = await readFile(metadataPath, "utf-8")
  const data = JSON.parse(json) as MetadataFile

  return data
}

async function saveMetadataDocument(entries: MetadataEntry[]) {
  await writeFileAtomically(metadataPath, JSON.stringify({ entries }, null, 2))
}

export async function getAllEntries(): Promise<MetadataEntry[]> {
  const data = await readMetadataFile()

  return data.entries
}

export async function entryExists({
  owner,
  slug,
}: PrototypeKey): Promise<boolean> {
  const entries = await getAllEntries()
  return entries.some(
    (entry) =>
      entry.kind === "prototype" && entry.owner === owner && entry.slug === slug
  )
}

export async function addEntry(entry: MetadataEntry) {
  const entries = await getAllEntries()
  entries.push(entry)
  await saveMetadataDocument(entries)
}

export async function removeEntry({
  owner,
  slug,
}: PrototypeKey): Promise<boolean> {
  const entries = await getAllEntries()
  const next = entries.filter(
    (entry) =>
      !(
        entry.kind === "prototype" &&
        entry.owner === owner &&
        entry.slug === slug
      )
  )

  if (entries.length === next.length) return false

  await saveMetadataDocument(next)

  return true
}
