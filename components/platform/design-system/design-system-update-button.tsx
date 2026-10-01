"use client"

import { openInEditor } from "@/lib/dev/open-in-editor"
import { Button } from "@/components/platform/ui/button"
import { toast } from "@/components/platform/ui/toaster"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/platform/ui/tooltip"

export function DesignSystemUpdateButton() {
  async function handleOpenInEditor(event: React.MouseEvent) {
    event.preventDefault()
    event.stopPropagation()

    try {
      await openInEditor("/data/design-system.json")
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to open editor"
      )
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            type="button"
            size="sm"
            variant="outline"
            aria-label="open-design-system-link-json"
            onClick={handleOpenInEditor}
            className="mt-4"
          >
            Edit list
          </Button>
        }
      />
      <TooltipContent sideOffset={2}>
        Open file : design-system.json
      </TooltipContent>
    </Tooltip>
  )
}
