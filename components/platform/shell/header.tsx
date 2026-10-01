import { Typography } from "@/components/platform/ui/typography"
import { CreateMenu } from "@/components/platform/create/create-menu"
import { readTemplateCatalog } from "@/lib/templates/catalog"
import { getOwners } from "@/lib/owners/catalog"
import { ModeToggle } from "@/components/platform/ui/mode-toggle"
import { Separator } from "@/components/platform/ui/separator"
import Link from "next/link"

const linkClasses =
  "border-b border-dotted border-muted-foreground/50 text-foreground"

export async function Header() {
  const catalog = await readTemplateCatalog()
  const owners = await getOwners()
  const templates = catalog.templates

  return (
    <header className="flex pt-20 pb-10">
      <div className="flex flex-1 flex-col gap-2">
        <Typography as="h1" variant="heading">
          Prototype Playground
        </Typography>

        <Typography as="h2" variant="body" className="text-muted-foreground">
          Read{" "}
          <Link
            className={linkClasses}
            href="https://jin-su.kim/posts/prototype-playground"
            target="_blank"
            rel="noreferrer"
          >
            more
          </Link>{" "}
          or view the{" "}
          <Link
            className={linkClasses}
            href="https://github.com/JinKim1011/prototype-playground"
            target="_blank"
            rel="noreferrer"
          >
            source
          </Link>
        </Typography>
      </div>

      <div className="flex h-fit w-fit">
        <ModeToggle />

        <Separator orientation="vertical" className="my-2 mr-4 ml-1.5" />

        <CreateMenu templates={templates} owners={owners} />
      </div>
    </header>
  )
}
