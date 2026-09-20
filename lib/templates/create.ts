import { CreateTemplateInput, TemplateEntry } from "@/types/templates"
import { slugify } from "../utils"
import { updateTemplateCatalog } from "@/lib/templates/catalog"
import { getTemplateDirectory } from "./path"
import { rm } from "node:fs/promises"
import { copyDirectoryAtomically } from "@/lib/fs/atomic-copy-directory"

export class CreateTemplateError extends Error {
  readonly code: "INVALID_INPUT" | "DUPLICATE_SLUG"

  constructor(code: CreateTemplateError["code"], message?: string) {
    super(message ?? code)
    this.name = "CreateTemplateError"
    this.code = code
  }
}

export async function createTemplate(
  input: CreateTemplateInput
): Promise<TemplateEntry> {
  const title = typeof input?.title === "string" ? input.title.trim() : ""

  if (!title) {
    throw new CreateTemplateError("INVALID_INPUT", "Title is required")
  }

  const slug = slugify(title)
  if (!slug) {
    throw new CreateTemplateError(
      "INVALID_INPUT",
      "Title must contain at least one letter or number"
    )
  }

  const key = slug

  const sourceDirectory = getTemplateDirectory("blank")
  const destinationDirectory = getTemplateDirectory(slug)

  const now = new Date().toISOString()

  const entry: TemplateEntry = {
    title,
    slug,
    key,
    owner: "system",
    createdAt: now,
    updatedAt: now,
    description: input.description?.trim() ?? "",
  }

  let destinationOwned = false

  try {
    await copyDirectoryAtomically(sourceDirectory, destinationDirectory)
    destinationOwned = true

    await updateTemplateCatalog((catalog) => {
      const alreadyExists = catalog.templates.some(
        (template) => template.slug === slug
      )

      if (alreadyExists) {
        throw new CreateTemplateError(
          "DUPLICATE_SLUG",
          "A template with this title already exists"
        )
      }

      return {
        ...catalog,
        templates: [...catalog.templates, entry],
      }
    })
  } catch (error) {
    if (destinationOwned) {
      await rm(destinationDirectory, {
        recursive: true,
        force: true,
      })
    }

    throw error
  }

  return entry
}
