"use server"

import { revalidatePath } from "next/cache"
import { CreateOwnerInput } from "@/types/owners"
import {
  createOwner,
  CreateOwnerError,
  type CreateOwnerActionResult,
} from "@/lib/owners/create"

export async function createOwnerAction(
  input: CreateOwnerInput
): Promise<CreateOwnerActionResult> {
  try {
    const owner = await createOwner(input)

    revalidatePath("/prototypes")

    return {
      ok: true,
      owner,
    }
  } catch (error) {
    if (error instanceof CreateOwnerError) {
      return {
        ok: false,
        code: error.code,
        message: error.message,
      }
    }

    return {
      ok: false,
      code: "UNKNOWN_ERROR",
      message: "Unable to create owner",
    }
  }
}
