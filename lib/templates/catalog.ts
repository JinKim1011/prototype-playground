import templatesFile from "@/data/templates.json"
import type {
  TemplateKey,
  TemplateEntry,
  TemplatesFile,
} from "@/types/templates"

export const DEFAULT_TEMPLATE_KEY = "blank"

const templatePath = path.join(process.cwd(), "data", "templates.json")

export async function readTemplateCatalog(): Promise<TemplatesFile> {
  const json = await readFile(templatePath, "utf-8")
  return JSON.parse(json) as TemplatesFile
}

export async function getTemplates(): Promise<TemplateEntry[]> {
  const catalog = await readTemplateCatalog()
  return catalog.templates
}

export function getTemplate(key: TemplateKey): TemplateEntry {
  const template = catalog.templates.find((template) => template.key === key)

  if (!template) {
    throw new Error(`Template not found: ${key}`)
  }

  return template
}
