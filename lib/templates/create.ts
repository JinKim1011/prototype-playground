import { CreateTemplateInput, TemplateEntry } from "@/types/templates"
import { slugify } from "../utils"
import { readTemplateCatalog, writeTemplateCatalog } from "./catalog"
import { getTemplateDirectory } from "./path"
import { cp } from "node:fs/promises"

export async function createTemplate(
  input: CreateTemplateInput
): Promise<TemplateEntry> {
  const title = input.title.trim()
  const slug = slugify(title)
  const key = slug
  const catalog = await readTemplateCatalog()

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
