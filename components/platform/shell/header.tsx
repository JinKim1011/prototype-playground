import { Typography } from "@/components/platform/ui/typography"
import { Button } from "@/components/platform/ui/button"

export function Header() {
  return (
    <header className="flex items-center justify-between pt-20 pb-8">
      <Typography as="h1" variant="heading-strong">
        Prototype Playground
      </Typography>
      <Button>CREATE</Button>
    </header>
  )
}
