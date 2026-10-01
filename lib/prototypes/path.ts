import path from "node:path"

const prototypesRoot = path.join(process.cwd(), "prototypes")

export function prototypeDirectory(ownerSlug: string, prototypeSlug: string) {
  return path.join(prototypesRoot, ownerSlug, prototypeSlug)
}

export function usePrototypePage(ownerSlug: string, prototypeSlug: string) {
  const directory = prototypeDirectory(ownerSlug, prototypeSlug)

  return path.join(directory, "page.tsx")
}
