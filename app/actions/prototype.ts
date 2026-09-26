"use server"

import { revalidatePath } from "next/cache"
import { createPrototype, CreatePrototypeError } from "@/lib/prototypes/create"

type CreatePrototypeErrors = {
  title?: string
  owner?: string
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

  const title = String(formData.get("title") ?? "")
  const owner = String(formData.get("owner") ?? "")
  const description = String(formData.get("description") ?? "")
  const fromTemplateId = String(formData.get("fromTemplateId") ?? "")

  if (!title || !owner || !fromTemplateId) {
    return {
      status: "error",
      errors: {
        title: !title ? "Please enter a prototype title" : undefined,
        owner: !owner ? "Please select or create an owner" : undefined,
        fromTemplateId: !fromTemplateId
          ? "Please select a template"
          : undefined,
      },
    }
  }

  try {
    const entry = await createPrototype({
      title,
      owner,
      description,
      fromTemplateId,
    })

    revalidatePath("/prototypes")
    revalidatePath(`/${entry.owner}/${entry.slug}`)

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
