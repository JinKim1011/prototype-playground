"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/platform/ui/button"
import { PencilSimpleLineIcon, TrashSimpleIcon } from "@phosphor-icons/react"
import { toast } from "@/components/platform/ui/toaster"
import { openInEditor } from "@/lib/dev/open-in-editor"
import type { PrototypeListItem } from "@/types/prototypes"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/platform/ui/tooltip"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/platform/ui/dialog"

type PrototypeItemActionsProps = {
  prototype: PrototypeListItem
  ownerSlug: string
}

export function PrototypeItemActions({
  prototype,
  ownerSlug,
}: PrototypeItemActionsProps) {
  const router = useRouter()

  async function handleOpenInEditor(event: React.MouseEvent) {
    event.preventDefault()
    event.stopPropagation()

    try {
      await openInEditor(`/${ownerSlug}/${prototype.slug}`)
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to open editor"
      )
    }
  }

  async function handleDelete() {
    const title = prototype.title

    try {
      const response = await fetch("/api/prototypes", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ownerId: prototype.ownerId,
          slug: prototype.slug,
        }),
      })

      if (!response.ok) {
        const result = await response.json().catch(() => null)

        toast.error(result?.error ?? "Failed to delete prototype")
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
              aria-label={`Edit ${prototype.title}`}
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
        <Dialog>
          <TooltipTrigger
            render={
              <DialogTrigger
                render={
                  <Button
                    type="button"
                    size="icon-xs"
                    variant="outline"
                    aria-label={`Delete ${prototype.title}`}
                    className="hover:bg-foreground/10"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <TrashSimpleIcon />
                  </Button>
                }
              />
            }
          />

          <TooltipContent sideOffset={2}>Delete</TooltipContent>

          <DialogContent>
            <DialogTitle>Delete prototype?</DialogTitle>

            <div className="flex justify-end gap-2">
              <DialogClose render={<Button variant="outline">Cancel</Button>} />
              <Button variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </Tooltip>
    </div>
  )
}
