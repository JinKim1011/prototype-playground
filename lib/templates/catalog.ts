import path from "node:path"
import { readFile } from "node:fs/promises"
import type { TemplateEntry, TemplatesFile } from "@/types/templates"
import { writeFileAtomically } from "@/lib/fs/atomic-write"

export const DEFAULT_TEMPLATE_ID = "template:blank" // application policy not a type definition

const templatePath = path.join(process.cwd(), "data", "templates.json") // keep the JSON catalog as the single source

export async function readTemplateCatalog(): Promise<TemplatesFile> {
  const json = await readFile(templatePath, "utf-8")
  return JSON.parse(json) as TemplatesFile
}

export async function writeTemplateCatalog(
  catalog: TemplatesFile
): Promise<void> {
  await writeFileAtomically(templatePath, JSON.stringify(catalog, null, 2))
}

export async function getTemplates(): Promise<TemplateEntry[]> {
  const catalog = await readTemplateCatalog()
  return catalog.templates
}

export async function getTemplate(id: string): Promise<TemplateEntry> {
  const catalog = await readTemplateCatalog()

  const template = catalog.templates.find((template) => template.id === id)

  if (!template) {
    throw new Error(`Template not found: ${id}`)
  }

  return template
}

let catalogUpdateQueue = Promise.resolve()

export async function updateTemplateCatalog(
  update: (create: TemplatesFile) => TemplatesFile
): Promise<void> {
  const previousUpdate = catalogUpdateQueue
  let release!: () => void

  catalogUpdateQueue = new Promise<void>((resolve) => {
    release = resolve
  })

  await previousUpdate

  try {
    const catalog = await readTemplateCatalog()
    const updatedCatalog = update(catalog)

    await writeTemplateCatalog(updatedCatalog)
  } finally {
    release()
  }
}

export async function removeTemplate(slug: string): Promise<TemplateEntry> {
  let removedTemplate: TemplateEntry | undefined

  await updateTemplateCatalog((catalog) => {
    removedTemplate = catalog.templates.find(
      (template) => template.slug === slug
    )

    if (!removedTemplate) {
      return catalog
    }

    return {
      ...catalog,
      templates: catalog.templates.filter((template) => template.slug !== slug),
    }
  })

  if (!removedTemplate) {
    throw new Error("Template not found")
  }

  return removedTemplate
}
