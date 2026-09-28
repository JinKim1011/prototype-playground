import path from "node:path"
import { getAllPrototypes } from "@/lib/prototypes/catalog"
import { writeFileAtomically } from "@/lib/fs/atomic-write"
import type { PrototypeEntry } from "@/types/prototypes"
import { getOwners } from "@/lib/owners/catalog"

const registryPath = path.join(process.cwd(), "prototypes", "registry.ts")

let registryGenerationQueue = Promise.resolve()

async function buildContent(prototypes: PrototypeEntry[]) {
  const owners = await getOwners()
  const ownerById = new Map(owners.map((owner) => [owner.id, owner]))

  const resolvedPrototypes = prototypes.map((prototype) => {
    const owner = ownerById.get(prototype.ownerId)

    if (!owner) {
      throw new Error(`Owner(${prototype.ownerId}) not found.`)
    }

    return {
      prototype,
      owner,
    }
  })

  const importLines = resolvedPrototypes
    .map(
      ({ prototype, owner }, index) =>
        `import P${index} from "./${owner.slug}/${prototype.slug}/page";`
    )
    .join("\n")

  const mapLines = resolvedPrototypes
    .map(
      ({ prototype, owner }, index) =>
        `"${owner.slug}:${prototype.slug}": P${index},`
    )
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
    const entries = await getAllPrototypes()

    const content = buildContent(entries)

    return writeFileAtomically(registryPath, content)
  })

  registryGenerationQueue = generation.catch(() => {})

  return generation
}
