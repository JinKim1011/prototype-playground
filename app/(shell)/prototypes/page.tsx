import { getAllPrototypes } from "@/lib/prototypes/catalog"
import { PrototypeItemGroup } from "@/components/platform/prototypes/prototype-item-group"
import { getOwners } from "@/lib/owners/catalog"

export default async function PrototypesPage() {
  const [prototypes, owners] = await Promise.all([
    getAllPrototypes(),
    getOwners(),
  ])

  return (
    <PrototypeItemGroup
      prototypes={prototypes.map((prototype) => ({
        id: prototype.id,
        ownerId: prototype.ownerId,
        slug: prototype.slug,
        title: prototype.title,
        updatedAt: prototype.updatedAt,
      }))}
      owners={owners}
    />
  )
}
