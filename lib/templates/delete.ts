import { withKeyedLock } from "../fs/keyed-lock"
import { getTemplateDirectory } from "./path"
import {
  DirectoryRemovalTransaction,
  prepareDirectoryRemoval,
} from "../fs/atomic-remove-directory"
import { getTemplates, removeTemplate, updateTemplateCatalog } from "./catalog"
import { slugify } from "../utils"

export class DeleteTemplateError extends Error {
  readonly code: "NOT_FOUND" | "INVALID_SLUG"

  constructor(code: DeleteTemplateError["code"], message: string) {
    super(message ?? code)
    this.name = "DeleteTemplateError"
    this.code = code
  }
}

export async function deleteTemplate(slug: string): Promise<void> {
  const normalizedSlug = typeof slug === "string" ? slugify(slug) : ""

  if (!normalizedSlug || normalizedSlug !== slug || slug === "blank") {
    throw new DeleteTemplateError(
      "INVALID_SLUG",
      slug === "blank"
        ? "Blank tempalte cannot be deleted"
        : "Invalid template slug"
    )
  }

  await withKeyedLock(getTemplateDirectory(slug), async () => {
    const catalog = await getTemplates()
    const template = catalog.find(
      (currentTemplate) => currentTemplate.slug === slug
    )

    if (!template) {
      throw new DeleteTemplateError("NOT_FOUND", "Template not found")
    }

    let transaction: DirectoryRemovalTransaction | undefined
    let metadataRemoved = false

    try {
      transaction = await prepareDirectoryRemoval(getTemplateDirectory(slug))

      await removeTemplate(slug)
      metadataRemoved = true

      await transaction.commit()
    } catch (error) {
      await transaction?.rollback().catch(() => {})

      if (metadataRemoved) {
        await updateTemplateCatalog((currentCatalog) => ({
          ...currentCatalog,
          templates: [...currentCatalog.templates, template],
        }))
      }
      throw error
    }
  })
}
