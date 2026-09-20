import { MetadataEntry } from "@/types/metadata"
import { CreatePrototypeInput } from "@/types/prototypes"
import { addEntry, entryExists, removeEntry } from "@/lib/metadata/store"
import { getTemplateDirectory } from "@/lib/templates/path"
import { DEFAULT_TEMPLATE_KEY, getTemplate } from "@/lib/templates/catalog"
import { prototypeDirectory } from "@/lib/prototypes/path"
import { rm } from "node:fs/promises"
import { generatePrototypeRegistry } from "@/lib/prototypes/registry"
import { slugify } from "@/lib/utils"
import { copyDirectoryAtomically } from "@/lib/fs/atomic-copy-directory"

export class CreatePrototypeError extends Error {
  readonly code: "DUPLICATE_SLUG" | "INVALID_SEGMENT" | "INVALID_INPUT"

  constructor(code: CreatePrototypeError["code"], message?: string) {
    super(message ?? code)
    this.name = "CreatePrototypeError"
    this.code = code
  }
}

export async function createPrototype(
  input: CreatePrototypeInput
): Promise<MetadataEntry> {
  const title = input.title.trim()
  if (!title) {
    throw new CreatePrototypeError("INVALID_INPUT", "Title is required")
  }

  const owner = slugify(input.owner)
  if (!owner) {
    throw new CreatePrototypeError(
      "INVALID_INPUT",
      "Owner must contain at least one letter or number"
    )
  }

  const slug = slugify(title)
  if (!slug) {
    throw new CreatePrototypeError(
      "INVALID_INPUT",
      "Title must contain at least one letter or number"
    )
  }

  const templateKey = input.fromTemplateKey ?? DEFAULT_TEMPLATE_KEY

  const template = await getTemplate(templateKey)
  const templateDirectory = getTemplateDirectory(template.slug)
  const destinationDirectory = prototypeDirectory({ owner, slug })

  const now = new Date().toISOString()

  const entry: MetadataEntry = {
    kind: "prototype",
    id: `${owner}:${slug}`,
    owner,
    slug,
    title,
    description: input.description?.trim() ?? "",
    createdAt: now,
    updatedAt: now,
    templateKey,
  }

  let destinationOwned = false

  try {
    await copyDirectoryAtomically(templateDirectory, destinationDirectory)
    destinationOwned = true

    await generatePrototypeRegistry()
  } catch (error) {
    await removeEntry({ owner, slug }).catch(() => {})

    await generatePrototypeRegistry().catch(() => {})

    if (destinationOwned) {
      await rm(destinationDirectory, { recursive: true, force: true }).catch(
        () => {}
      )
    }

    throw error
  }

  return entry
}
