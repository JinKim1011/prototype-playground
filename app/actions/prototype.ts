"use server"

import { revalidatePath } from "next/cache"
import { createPrototype, CreatePrototypeError } from "@/lib/prototypes/create"
import {
  createOwner,
  CreateOwnerError,
  type OwnerCreationTransaction,
} from "@/lib/owners/create"
import { getOwnerById } from "@/lib/owners/catalog"
import type { OwnerEntry } from "@/types/owners"
import type { PrototypeEntry } from "@/types/prototypes"

type ResolvedOwner = {
  owner: OwnerEntry
  transaction?: OwnerCreationTransaction
}

async function resolveOwner(
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

type CreatePrototypeErrors = {
  title?: string
  ownerId?: string
  fromTemplateId?: string
}

export type CreatePrototypeState = {
  status: "idle" | "error" | "success"
  message?: string
  errors?: CreatePrototypeErrors
}

export async function createPrototypeAction(
  _previousState: CreatePrototypeState,
  formData: FormData
): Promise<CreatePrototypeState> {
  if (process.env.NODE_ENV !== "development") {
    return {
      status: "error",
      message: "Only available in development environment",
    }
  }

  const title = String(formData.get("title") ?? "").trim()
  const ownerId = String(formData.get("ownerId") ?? "").trim()
  const ownerTitle = String(formData.get("ownerTitle") ?? "").trim()
  const description = String(formData.get("description") ?? "").trim()
  const fromTemplateId = String(formData.get("fromTemplateId") ?? "").trim()

  const hasOwner = Boolean(ownerId || ownerTitle)

  if (!title || !hasOwner || !fromTemplateId) {
    return {
      status: "error",
      errors: {
        title: !title ? "Please enter a prototype title" : undefined,
        ownerId: !hasOwner ? "Please select or create an owner" : undefined,
        fromTemplateId: !fromTemplateId
          ? "Please select a template"
          : undefined,
      },
    }
  }

  let ownerTransaction: OwnerCreationTransaction | undefined
  let entry: PrototypeEntry
  let owner: OwnerEntry

  try {
    let resolvedOwner = await resolveOwner(ownerId, ownerTitle)

    owner = resolvedOwner.owner
    ownerTransaction = resolvedOwner.transaction

    entry = await createPrototype({
      title,
      ownerId: owner.id,
      description,
      fromTemplateId,
    })

    await ownerTransaction?.commit()
  } catch (error) {
    await ownerTransaction?.rollback().catch(() => {})

    return {
      status: "error",
      message:
        error instanceof CreatePrototypeError ||
        error instanceof CreateOwnerError
          ? error.message
          : "Failed to create prototype",
    }
  }

  try {
    revalidatePath("/prototypes")
    revalidatePath(`/${owner.slug}/${entry.slug}`)
  } catch (error) {
    console.error("Failed to revalidate prototype paths", error)
  }

  return {
    status: "success",
    message: `${entry.title} was created successfully`,
  }
}
