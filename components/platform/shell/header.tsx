import { Typography } from "@/components/platform/ui/typography"
import { CreateMenu } from "@/components/platform/create/create-menu"
import { readTemplateCatalog } from "@/lib/templates/catalog"

export async function Header() {
  const catalog = await readTemplateCatalog()
  const templates = catalog.templates

  return (
    <header className="flex items-center justify-between pt-20 pb-8">
      <Typography as="h1" variant="heading">
        Prototype Playground
      </Typography>
      <CreateMenu templates={templates} />
    </header>
  )
}
