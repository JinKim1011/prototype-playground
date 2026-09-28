import type { ComponentType } from "react"

const RETRY_ATTEMPTS = process.env.NODE_ENV === "development" ? 5 : 1

const RETRY_DELAY_MS = 150

export async function loadPrototypeModuleWithRetry(
  ownerSlug: string,
  prototypeSlug: string
): Promise<ComponentType> {
  let lastError: unknown

  for (let attempt = 0; attempt < RETRY_ATTEMPTS; attempt++) {
    try {
      const module = await import(
        `@/prototypes/${ownerSlug}/${prototypeSlug}/page`
      )

      if (!module.default) {
        throw new Error(
          `Prototype "${ownerSlug}/${prototypeSlug}" does not export a default component`
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
