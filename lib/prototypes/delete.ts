import { PrototypeKey } from "@/types/prototypes"
import { withKeyedLock } from "@/lib/fs/keyed-lock"
import { prototypeExists, removePrototype } from "@/lib/prototypes/catalog"
import { generatePrototypeRegistry } from "./registry"
import { rm } from "node:fs/promises"
import { prototypeDirectory } from "./path"

export class DeletePrototypeError extends Error {
  readonly code: "INVALID_KEY" | "NOT_FOUND"

  constructor(code: DeletePrototypeError["code"], message: string) {
    super(message)
    this.name = "DeletePrototypeError"
    this.code = code
  }
}

export async function deletePrototype({
  owner,
  slug,
}: PrototypeKey): Promise<void> {
  await withKeyedLock("prototype-publication", async () => {
    const exists = await prototypeExists({ owner, slug })

    if (!exists) {
      throw new DeletePrototypeError("NOT_FOUND", "Prototype not found")
    }

    await rm(prototypeDirectory({ owner, slug }), {
      recursive: true,
      force: true,
    })

    await removePrototype({ owner, slug })
    await generatePrototypeRegistry()
  })
}
