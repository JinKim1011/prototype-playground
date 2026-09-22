import { Typography } from "@/components/platform/ui/typography"
import { Button } from "@/components/platform/ui/button"
import { CaretDownIcon } from "@phosphor-icons/react/dist/ssr"

export function Header() {
  return (
    <header className="flex items-center justify-between pt-20 pb-8">
      <Typography as="h1" variant="heading-strong">
        Prototype Playground
      </Typography>
      <Button>
        CREATE
        <CaretDownIcon data-icon="inline-end" className="size-3" />
      </Button>
    </header>
  )
}
