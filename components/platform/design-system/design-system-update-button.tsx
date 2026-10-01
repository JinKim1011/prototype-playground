"use client"

import { openInEditor } from "@/lib/dev/open-in-editor"
import { Button } from "@/components/platform/ui/button"
import { toast } from "@/components/platform/ui/toaster"

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
    <Button
      type="button"
      size="sm"
      variant="secondary"
      aria-label="open-design-system-link-json"
      onClick={handleOpenInEditor}
    >
      Edit list
    </Button>
  )
}
