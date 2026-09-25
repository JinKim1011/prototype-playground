"use server"

import { revalidatePath } from "next/cache"
import { createPrototype, CreatePrototypeError } from "@/lib/prototypes/create"

export type CreatePrototypeState = {
  status: "idle" | "error" | "success"
  message?: string
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

  if (!title) {
    return {
      status: "error",
      message: "Please enter prototype title",
    }
  }

  if (!owner) {
    return {
      status: "error",
      message: "Please select or create owner",
    }
  }

  if (!fromTemplateId) {
    return {
      status: "error",
      message: "Please select template",
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
