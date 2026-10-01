import { DesignSystemLink, DesignSystemLinksFile } from "@/types/design-system"
import { readFile } from "node:fs/promises"
import path from "node:path"

const linkPath = path.join(process.cwd(), "data", "design-system.json")

async function readDesignSystemLinksFile(): Promise<DesignSystemLinksFile> {
  const json = await readFile(linkPath, "utf-8")

  return JSON.parse(json) as DesignSystemLinksFile
}

async function getDesignSystemLinks(): Promise<DesignSystemLink[]> {
  const data = await readDesignSystemLinksFile()

  return data.links
}
