import path from "node:path"

const templateDirectory = path.join(process.cwd(), "app", "templates")

export function getTemplateDirectory(slug: string): string {
  return path.join(templateDirectory, slug)
}
