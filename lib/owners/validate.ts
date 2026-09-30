const OWNER_NAME = /^[a-zA-Z]+(?:[ -][a-zA-Z]+)*$/

function normalizeOwnerName(name: string) {
  return name.trim().replace(/\s+/g, " ")
}

export function ownerSlugFromName(name: string) {
  return name.toLowerCase().replace(/ /g, "-")
}

export function assertOwnerName(name: string) {
  const normalized = normalizeOwnerName(name)

  if (!normalized || !OWNER_NAME.test(normalized)) {
    throw new Error(
      "Owner name must contain letters separated by spaces or hyphens."
    )
  }

  return normalized
}
