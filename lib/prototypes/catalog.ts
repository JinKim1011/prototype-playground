import type { PrototypeEntry, PrototypesFile } from "@/types/prototypes"
import type { PrototypeKey } from "@/types/prototypes"
import { readFile } from "node:fs/promises"
import { writeFileAtomically } from "@/lib/fs/atomic-write"
import path from "node:path"

const prototypesPath = path.join(process.cwd(), "data", "prototypes.json")

async function readPrototypesFile(): Promise<PrototypesFile> {
  const json = await readFile(prototypesPath, "utf-8")
  const data = JSON.parse(json) as PrototypesFile

  return data
}

async function savePrototypesDocument(entries: PrototypeEntry[]) {
  await writeFileAtomically(
    prototypesPath,
    JSON.stringify({ entries }, null, 2)
  )
}

export async function getAllPrototypes(): Promise<PrototypeEntry[]> {
  const data = await readPrototypesFile()

  return data.entries
}

export async function prototypeExists({
  owner,
  slug,
}: PrototypeKey): Promise<boolean> {
  const entries = await getAllPrototypes()
  return entries.some((entry) => entry.owner === owner && entry.slug === slug)
}

export async function addPrototype(entry: PrototypeEntry): Promise<void> {
  await updatePrototypes((metadata) => ({
    ...metadata,
    entries: [...metadata.entries, entry],
  }))
}

export async function removePrototype({
  owner,
  slug,
}: PrototypeKey): Promise<PrototypeEntry> {
  let removedPrototype: PrototypeEntry | undefined

  await updatePrototypes((metadata) => {
    removedPrototype = metadata.entries.find(
      (entry) => entry.owner === owner && entry.slug === slug
    )

    if (!removedPrototype) {
      return metadata
    }

    return {
      ...metadata,
      entries: metadata.entries.filter((prototype) => prototype.slug !== slug),
    }
  })

  if (!removedPrototype) {
    throw new Error("Prototype not found")
  }

  return removedPrototype
}

let prototypesUpdateQueue = Promise.resolve()

export async function updatePrototypes(
  update: (create: PrototypesFile) => PrototypesFile
): Promise<void> {
  const previousUpdate = prototypesUpdateQueue
  let release!: () => void

  prototypesUpdateQueue = new Promise<void>((resolve) => {
    release = resolve
  })

  await previousUpdate

  try {
    const metadata = await readPrototypesFile()
    const updatedMetadata = update(metadata)

    await savePrototypesDocument(updatedMetadata.entries)
  } finally {
    release()
  }
}

export async function addPrototypeIfAvailable(
  entry: PrototypeEntry
): Promise<boolean> {
  let added = false

  await updatePrototypes((metadata) => {
    const exists = metadata.entries.some(
      (currentEntry) =>
        currentEntry.owner === entry.owner && currentEntry.slug === entry.slug
    )

    if (exists) {
      return metadata
    }

    added = true

    return {
      ...metadata,
      entries: [...metadata.entries, entry],
    }
  })
  return added
}
