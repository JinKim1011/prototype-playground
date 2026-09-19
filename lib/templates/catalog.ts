import path from "node:path"
import { readFile } from "node:fs/promises"
import type { TemplateEntry, TemplatesFile } from "@/types/templates"

export const DEFAULT_TEMPLATE_KEY = "blank" // application policy not a type definition

const templatePath = path.join(process.cwd(), "data", "templates.json") // keep the JSON catalog as the single source

export async function readTemplateCatalog(): Promise<TemplatesFile> {
  const json = await readFile(templatePath, "utf-8")
  return JSON.parse(json) as TemplatesFile
}

export async function getTemplates(): Promise<TemplateEntry[]> {
  const catalog = await readTemplateCatalog()
  return catalog.templates
}

export async function getTemplate(key: string): Promise<TemplateEntry> {
  const catalog = await readTemplateCatalog()

  const template = catalog.templates.find((template) => template.key === key)

  if (!template) {
    throw new Error(`Template not found: ${key}`)
  }

  return template
}
