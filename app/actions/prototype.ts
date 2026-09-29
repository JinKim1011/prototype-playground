"use server"

import { revalidatePath } from "next/cache"
import { createPrototype, CreatePrototypeError } from "@/lib/prototypes/create"
import { getOwnerById } from "@/lib/owners/catalog"

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

  try {
    const entry = await createPrototype({
      title,
      ownerId,
      description,
      fromTemplateId,
    })

    const owner = await getOwnerById(entry.ownerId)

    if (!owner) {
      throw new CreatePrototypeError("INVALID_INPUT", "Owner not found")
    }

    revalidatePath("/prototypes")
    revalidatePath(`/${owner.slug}/${entry.slug}`)

    return {
      status: "success",
      message: `${entry.title} was created successfully`,
    }
  } catch (error) {
    return {
      status: "error",
      message:
        error instanceof CreatePrototypeError
          ? error.message
          : "Failed to create prototype",
    }
  }
}
