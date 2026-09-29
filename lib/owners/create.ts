import { CreateOwnerInput, OwnerEntry } from "@/types/owners"
import { assertOwnerName, ownerSlugFromName } from "@/lib/owners/validate"
import { addOwner, ownerExists } from "@/lib/owners/catalog"

export class CreateOwnerError extends Error {
  readonly code: "INVALID_INPUT" | "DUPLICATE_OWNER"

  constructor(code: CreateOwnerError["code"], message?: string) {
    super(message ?? code)
    this.name = "CreateOwnerError"
    this.code = code
  }
}

export async function createOwner(
  input: CreateOwnerInput
): Promise<OwnerEntry> {
  let title: string

  try {
    title = assertOwnerName(input.title)
  } catch (error) {
    throw new CreateOwnerError("INVALID_INPUT")
  }

  const slug = ownerSlugFromName(title)
  const id = `owner:${slug}`

  if (await ownerExists(slug)) {
    throw new CreateOwnerError("DUPLICATE_OWNER")
  }

  const owner: OwnerEntry = {
    id,
    title,
    slug,
  }

  await addOwner(owner)

  return owner
}
