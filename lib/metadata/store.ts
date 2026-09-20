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

export async function addEntry(entry: MetadataEntry): Promise<void> {
  await updateMetadata((metadata) => ({
    ...metadata,
    entries: [...metadata.entries, entry],
  }))
}

export async function removeEntry({
  owner,
  slug,
}: PrototypeKey): Promise<boolean> {
  let removed = false

  await updateMetadata((metadata) => {
    const entries = metadata.entries.filter(
      (entry) =>
        !(
          entry.kind === "prototype" &&
          entry.owner === owner &&
          entry.slug === slug
        )
    )

    removed = entries.length !== metadata.entries.length

    return {
      ...metadata,
      entries,
    }
  })

  return removed
}

let metadataUpdateQueue = Promise.resolve()

export async function updateMetadata(
  update: (create: MetadataFile) => MetadataFile
): Promise<void> {
  const previousUpdate = metadataUpdateQueue
  let release!: () => void

  metadataUpdateQueue = new Promise<void>((resolve) => {
    release = resolve
  })

  await previousUpdate

  try {
    const metadata = await readMetadataFile()
    const updatedMetadata = update(metadata)

    await saveMetadataDocument(updatedMetadata.entries)
  } finally {
    release()
  }
}
