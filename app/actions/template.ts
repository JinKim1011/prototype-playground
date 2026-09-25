"use server"

import { revalidatePath } from "next/cache"
import { createTemplate, CreateTemplateError } from "@/lib/templates/create"

export type CreateTemplateState = {
  status: "idle" | "error" | "success"
  message?: string
}

export async function createTemplateAction(
  _previousState: CreateTemplateState,
  formData: FormData
): Promise<CreateTemplateState> {
  if (process.env.NODE_ENV !== "development") {
    return {
      status: "error",
      message: "Only available in development environment",
    }
  }

  const title = String(formData.get("title") ?? "")
  const description = String(formData.get("description") ?? "")

  if (!title) {
    return {
      status: "error",
      message: "Please enter template title",
    }
  }

  try {
    const entry = await createTemplate({ title, description })

    revalidatePath("/templates")
    revalidatePath(`/templates/${entry.slug}`)

    return {
      status: "success",
      message: `${entry.title} was created successfully`,
    }
  } catch (error) {
    return {
      status: "error",
      message:
        error instanceof CreateTemplateError
          ? error.message
          : "Failed to create template",
    }
  }
}
