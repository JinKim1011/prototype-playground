import { DesignSystemLink, DesignSystemLinksFile } from "@/types/design-system"
import { readFile } from "node:fs/promises"
import path from "node:path"

const linkPath = path.join(process.cwd(), "data", "design-system.json")

async function readDesignSystemLinksFile(): Promise<DesignSystemLinksFile> {
  const json = await readFile(linkPath, "utf-8")

  return JSON.parse(json) as DesignSystemLinksFile
}

export async function getDesignSystemLinks(): Promise<DesignSystemLink[]> {
  const data: unknown = await readDesignSystemLinksFile()
  const links = Array.isArray((data as { links?: unknown })?.links)
    ? (data as { links: unknown[] }).links
    : []

  return links
    .map(parseDesignSystemLink)
    .filter((link): link is DesignSystemLink => link !== null)
}

function parseDesignSystemLink(value: unknown): DesignSystemLink | null {
  if (!value || typeof value !== "object") return null

  const entry = value as Record<string, unknown>

  if (
    typeof entry.id !== "string" ||
    typeof entry.title !== "string" ||
    typeof entry.url !== "string"
  ) {
    return null
  }

  try {
    const parsedUrl = new URL(entry.url)

    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      return null
    }

    return {
      id: entry.id.trim(),
      title: entry.title.trim(),
      url: parsedUrl.toString(),
    }
  } catch {
    return null
  }
}
