import { MetadataEntry, MetadataFile } from "@/types/meatadata"
import { PrototypeKey } from "@/types/prototypes"
import { readFile, writeFile } from "node:fs/promises"
import path from "node:path"

const metadataPath = path.join(process.cwd(), "data/metadata.json")

async function readMetadataFile(): Promise<MetadataFile> {
  const json = await readFile(metadataPath, "utf-8")
  const data = JSON.parse(json) as MetadataFile

  return data
}

async function writeMetadataFile(entries: MetadataEntry[]) {
  await writeFile(metadataPath, JSON.stringify({ entries }, null, 2), "utf-8")
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
