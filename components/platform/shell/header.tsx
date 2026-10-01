import { Typography } from "@/components/platform/ui/typography"
import { CreateMenu } from "@/components/platform/create/create-menu"
import { readTemplateCatalog } from "@/lib/templates/catalog"
import { getOwners } from "@/lib/owners/catalog"
import { ModeToggle } from "@/components/platform/ui/mode-toggle"
import { Separator } from "@/components/platform/ui/separator"
import Link from "next/link"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/platform/ui/tooltip"

const linkClasses =
  "border-b border-dotted border-muted-foreground/50 text-muted-foreground hover:text-foreground hover:border-muted-foreground"

export async function Header() {
  const catalog = await readTemplateCatalog()
  const owners = await getOwners()
  const templates = catalog.templates

  return (
    <header className="flex pt-20 pb-12">
      <div className="flex flex-1 flex-col gap-3">
        <Typography as="h1" variant="heading">
          Prototype Playground
        </Typography>

        <Typography as="h2" variant="body" className="text-muted-foreground">
          Read{" "}
          <Tooltip>
            <TooltipTrigger
              render={
                <Link
                  className={linkClasses}
                  href="https://jin-su.kim/posts/prototype-playground"
                  target="_blank"
                  rel="noreferrer"
                >
                  more
                </Link>
              }
            />
            <TooltipContent>Link to blog post</TooltipContent>
          </Tooltip>{" "}
          or view the{" "}
          <Tooltip>
            <TooltipTrigger
              render={
                <Link
                  className={linkClasses}
                  href="https://github.com/JinKim1011/prototype-playground"
                  target="_blank"
                  rel="noreferrer"
                >
                  source
                </Link>
              }
            />
            <TooltipContent>Link to GitHub</TooltipContent>
          </Tooltip>
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
