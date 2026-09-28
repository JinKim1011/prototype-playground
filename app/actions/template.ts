"use server"

import { revalidatePath } from "next/cache"
import { createTemplate, CreateTemplateError } from "@/lib/templates/create"

type CreateTemplateErrors = {
  title?: string
}

export type CreateTemplateState = {
  status: "idle" | "error" | "success"
  message?: string
  errors?: CreateTemplateErrors
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

  const title = String(formData.get("title") ?? "").trim()
  const description = String(formData.get("description") ?? "")

  if (!title) {
    return {
      status: "error",
      errors: {
        title: "Please enter a template title",
      },
    }
  }

  if (!/^[A-Za-z0-9 ]+$/.test(title)) {
    return {
      status: "error",
      errors: {
        title: "Please only enter letters and numbers, no special characters",
      },
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
