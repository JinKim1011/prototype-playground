import { writeFile } from "node:fs/promises"
import path from "node:path"
import { getAllEntries } from "./metadata-store"

const registryPath = path.join(process.cwd(), "prototypes/registry.ts")

export async function generatePrototypeRegistry(): Promise<void> {
  const entries = await getAllEntries()
  const prototypes = entries.filter((entry) => entry.kind === "prototype")

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

  return await writeFile(registryPath, content, "utf-8")
}
