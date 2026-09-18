import templatesFile from "@/data/templates.json"
import type {
  TemplateKey,
  TemplateEntry,
  TemplatesFile,
} from "@/types/templates"

const catalog = templatesFile as TemplatesFile

export const DEFAULT_TEMPLATE_KEY: TemplateKey = "blank"

export function getTemplates(): TemplateEntry[] {
  return catalog.templates
}
