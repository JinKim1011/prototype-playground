"use server"

import { revalidatePath } from "next/cache"
import { CreateOwnerInput } from "@/types/owners"
import { createOwner, CreateOwnerError } from "@/lib/owners/create"

export async function createOwnerAction(input: CreateOwnerInput) {
  try {
    const owner = await createOwner(input)

    revalidatePath("/prototypes")

    return {
      ok: true as const,
      owner,
    }
  } catch (error) {
    if (error instanceof CreateOwnerError) {
      return {
        status: "error",
        message:
          error instanceof CreateOwnerError
            ? error.message
            : "Failed to create template",
      }
    }

    return {
      ok: false as const,
      code: "UNKNOWN_ERROR" as const,
      error: "Unable to create owner",
    }
  }
}
