import type { OwnerEntry } from "@/types/owners"
import { type OwnerCreationTransaction, createOwner } from "@/lib/owners/create"
import { CreatePrototypeError } from "@/lib/prototypes/create"
import { getOwnerById } from "@/lib/owners/catalog"

type ResolvedOwner = {
  owner: OwnerEntry
  transaction?: OwnerCreationTransaction
}

export async function resolveOwner(
  ownerId: string,
  ownerTitle: string
): Promise<ResolvedOwner> {
  if (ownerId) {
    const owner = await getOwnerById(ownerId)

    if (!owner) {
      throw new CreatePrototypeError("INVALID_INPUT", "Owner not found")
    }

    return { owner }
  }

  const transaction = await createOwner({ title: ownerTitle })

  return {
    owner: transaction.owner,
    transaction,
  }
}
