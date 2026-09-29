const OWNER_NAME = /^[a-zA-Z]+(?:[ -][a-zA-Z]+)*$/

function normalizeOwnerName(name: string) {
  return name.trim().replace(/\s+/g, " ")
}

function ownerSlugFromName(name: string) {
  return name.toLowerCase().replace(/ /g, "-")
}

function assertOwnerName(name: string) {
  const nomalized = normalizeOwnerName(name)

  if (!nomalized || !OWNER_NAME.test(name)) {
    throw new Error(
      "Owner name must contain letters separated by spaces or hyphens."
    )
  }

  return nomalized
}
