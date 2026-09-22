import path from "node:path"
import { getAllEntries } from "@/lib/metadata/store"
import { writeFileAtomically } from "@/lib/fs/atomic-write"
import type { MetadataEntry } from "@/types/metadata"

const registryPath = path.join(process.cwd(), "prototypes", "registry.ts")

let registryGenerationQueue = Promise.resolve()

function buildContent(prototypes: MetadataEntry[]) {
  const importLines = prototypes
    .map(
      (entry, index) =>
        `import P${index} from "./${entry.owner}/${entry.slug}/page";`
    )
    .join("\n")

  const mapLines = prototypes
    .map((entry, index) => `"${entry.owner}:${entry.slug}": P${index},`)
    .join("\n")

  const content =
    prototypes.length === 0
      ? [
          "// AUTO-GENERATED — do not edit manually",
          'import type { ComponentType } from "react";',
          "",
          "export const registry: Record<string, ComponentType> = {};",
          "",
        ].join("\n")
      : [
          "// AUTO-GENERATED — do not edit manually",
          'import type { ComponentType } from "react";',
          importLines,
          "",
          "export const registry: Record<string, ComponentType> = {",
          mapLines,
          "};",
        ].join("\n")

  return content
}

export async function generatePrototypeRegistry(): Promise<void> {
  const generation = registryGenerationQueue.then(async () => {
    const entries = await getAllEntries()

    const content = buildContent(entries)

    return writeFileAtomically(registryPath, content)
  })

  registryGenerationQueue = generation.catch(() => {})

  return generation
}
