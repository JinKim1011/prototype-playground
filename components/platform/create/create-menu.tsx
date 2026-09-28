import { TemplateEntry } from "@/types/templates"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/platform/ui/popover"
import { Button } from "@/components/platform/ui/button"
import CreateMenuTabs from "@/components/platform/create/create-menu-tabs"
import { CaretDownIcon } from "@phosphor-icons/react/dist/ssr"
import { type OwnerEntry } from "@/types/owners"

type CreateMenuProps = {
  templates: TemplateEntry[]
  owners: OwnerEntry[]
}

export function CreateMenu({ templates, owners }: CreateMenuProps) {
  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button>
            Create
            <CaretDownIcon data-icon="inline-end" className="size-3" />
          </Button>
        }
      />
      <PopoverContent className="w-90" align="end">
        <CreateMenuTabs templates={templates} owners={owners} />
      </PopoverContent>
    </Popover>
  )
}
