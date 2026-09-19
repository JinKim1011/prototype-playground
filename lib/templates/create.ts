import { CreateTemplateInput, TemplateEntry } from "@/types/templates"
import { slugify } from "../utils"
import { readTemplateCatalog, writeTemplateCatalog } from "./catalog"
import { getTemplateDirectory } from "./path"
import { cp } from "node:fs/promises"

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
  const title = input.title.trim()
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
  const catalog = await readTemplateCatalog()

  const alreadyExist = catalog.templates.some(
    (template) => template.slug === slug
  )
  if (alreadyExist) {
    throw new CreateTemplateError(
      "DUPLICATE_SLUG",
      "A template with this title already exists"
    )
  }

  const sourceDirectory = getTemplateDirectory("blank")
  const destinationDirectory = getTemplateDirectory(slug)

  await cp(sourceDirectory, destinationDirectory, {
    recursive: true,
    force: false,
    errorOnExist: true,
  })

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

  catalog.templates.push(entry)
  await writeTemplateCatalog(catalog)

  return entry
}
