import { TemplateKey } from "@/types/templates"
import path from "node:path"

const templateDirectory = path.join(process.cwd(), "app", "templates")

const templateDirectories: Record<TemplateKey, string> = {
  // when new template added, add directory path

  blank: path.join(templateDirectory, "blank"),
}

export function getTemplateDirectory(key: TemplateKey): string {
  return templateDirectories[key]
}
