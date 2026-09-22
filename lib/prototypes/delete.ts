import { PrototypeKey } from "@/types/prototypes"
import { withKeyedLock } from "@/lib/fs/keyed-lock"
import { removePrototype } from "@/lib/prototypes/catalog"
import { generatePrototypeRegistry } from "./registry"
import { rm } from "node:fs/promises"
import { prototypeDirectory } from "./path"

export async function deletePrototype({
  owner,
  slug,
}: PrototypeKey): Promise<void> {
  await withKeyedLock("prototype-publication", async () => {
    await rm(prototypeDirectory({ owner, slug }), {
      recursive: true,
      force: true,
    })

    await removePrototype({ owner, slug })
    await generatePrototypeRegistry()
  })
}
