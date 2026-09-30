import path from "node:path"
import { rm } from "node:fs/promises"
import { access } from "node:fs/promises"

const prototypesRoot = path.join(process.cwd(), "prototypes")

export function ownerPrototypeDirectory(ownerSlug: string) {
  return path.join(prototypesRoot, ownerSlug)
}

export async function removeOwnerPrototypeDirectory(
  ownerSlug: string
): Promise<void> {
  await rm(ownerPrototypeDirectory(ownerSlug), {
    recursive: true,
    force: true,
  })
}

export async function directoryExists(directory: string): Promise<boolean> {
  try {
    await access(directory)
    return true
  } catch {
    return false
  }
}
