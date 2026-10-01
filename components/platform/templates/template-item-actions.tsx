"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/platform/ui/button"
import { PencilSimpleLineIcon, TrashSimpleIcon } from "@phosphor-icons/react"
import { toast } from "@/components/platform/ui/toaster"
import { openInEditor } from "@/lib/dev/open-in-editor"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/platform/ui/tooltip"

type TemplateItemActionsProps = {
  slug: string
  title: string
}

export function TemplateItemActions({ slug, title }: TemplateItemActionsProps) {
  const router = useRouter()

  async function handleOpenInEditor(event: React.MouseEvent) {
    event.preventDefault()
    event.stopPropagation()

    try {
      await openInEditor(`/templates/${slug}`)
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to open editor"
      )
    }
  }

  async function handleDelete(event: React.MouseEvent) {
    event.preventDefault()
    event.stopPropagation()

    try {
      const response = await fetch("/api/templates", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      })

      if (!response.ok) {
        const result = await response.json().catch(() => null)

        toast.error(result?.error ?? "Failed to delete template")
        return
      }

      toast.success(`Deleted "${title}"`)
      router.refresh()
    } catch {
      toast.error("Unable to connect to the server")
    }
  }

  return (
    <div className="pointer-events-none flex w-fit gap-0.5 opacity-0 transition-opacity group-focus-within/item:pointer-events-auto group-focus-within/item:opacity-100 group-hover/item:pointer-events-auto group-hover/item:opacity-100">
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              type="button"
              size="icon-xs"
              variant="outline"
              aria-label={`Edit ${title}`}
              className="hover:bg-foreground/10"
              onClick={handleOpenInEditor}
            >
              <PencilSimpleLineIcon />
            </Button>
          }
        />
        <TooltipContent sideOffset={2}>Edit in editor</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              type="button"
              size="icon-xs"
              variant="outline"
              className="hover:bg-foreground/10"
              aria-label={`Delete ${title}`}
              onClick={handleDelete}
            >
              <TrashSimpleIcon />
            </Button>
          }
        />
        <TooltipContent sideOffset={2}>Delete</TooltipContent>
      </Tooltip>
    </div>
  )
}
