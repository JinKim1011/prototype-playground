import type { PrototypeKey } from "@/types/prototypes"
import type { ComponentType } from "react"

const RETRY_ATTEMPTS = process.env.NODE_ENV === "development" ? 5 : 1

const RETRY_DELAY_MS = 150

export async function loadPrototypeModuleWithRetry({
  owner,
  slug,
}: PrototypeKey): Promise<ComponentType> {
  let lastError: unknown

  for (let attempt = 0; attempt < RETRY_ATTEMPTS; attempt++) {
    try {
      const module = await import(`@/prototypes/${owner}/${slug}/page`)

      if (!module.default) {
        throw new Error(
          `Prototype "${owner}/${slug}" does not export a default component`
        )
      }

      return module.default
    } catch (error) {
      lastError = error

      const hasAttemptsRemaining = attempt < RETRY_ATTEMPTS - 1

      if (hasAttemptsRemaining) {
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS))
      }
    }
  }

  throw lastError
}
