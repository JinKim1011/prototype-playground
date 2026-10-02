import type { ComponentType } from "react"
import type { PrototypeRouteKey } from "@/lib/prototypes/keys"

const RETRY_ATTEMPTS = process.env.NODE_ENV === "development" ? 5 : 1

const RETRY_DELAY_MS = 150

export async function loadPrototypeModuleWithRetry({
  ownerSlug,
  prototypeSlug,
}: PrototypeRouteKey): Promise<ComponentType> {
  let lastError: unknown

  for (let attempt = 0; attempt < RETRY_ATTEMPTS; attempt++) {
    try {
      const prototypeModule = await import(
        `@/prototypes/${ownerSlug}/${prototypeSlug}/page`
      )

      if (!prototypeModule.default) {
        throw new Error(
          `Prototype "${ownerSlug}/${prototypeSlug}" does not export a default component`
        )
      }

      return prototypeModule.default
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
