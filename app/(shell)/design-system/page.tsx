import { DesignSystemItemGroup } from "@/components/platform/design-system/design-system-item-group"
import { getDesignSystemLinks } from "@/lib/design-system/catalog"
import { DesignSystemUpdateButton } from "@/components/platform/design-system/design-system-update-button"

export default async function DesignSystemPage() {
  const links = await getDesignSystemLinks()
  return (
    <>
      <div className="mt-4">
        <DesignSystemUpdateButton />
      </div>
      <DesignSystemItemGroup
        links={links.map((link) => ({
          id: link.id,
          title: link.title,
          url: link.url,
        }))}
      />
    </>
  )
}
