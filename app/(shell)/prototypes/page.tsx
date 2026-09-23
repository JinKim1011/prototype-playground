import { getAllPrototypes } from "@/lib/prototypes/catalog"
import { PrototypeItemGroup } from "@/components/platform/prototypes/prototype-item-group"

export default async function PrototypesPage() {
  const prototypes = await getAllPrototypes()

  return (
    <PrototypeItemGroup
      prototypes={prototypes.map((prototype) => ({
        id: prototype.id,
        owner: prototype.owner,
        slug: prototype.slug,
        title: prototype.title,
        updatedAt: prototype.updatedAt,
      }))}
    />
  )
}
