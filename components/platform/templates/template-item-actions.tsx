"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/platform/ui/button"
import { PencilSimpleLineIcon, TrashSimpleIcon } from "@phosphor-icons/react"
import { toast } from "@/components/platform/ui/toaster"
import { openInEditor } from "@/lib/dev/open-in-editor"

type TemplateItemActionsProps = {
  slug: string
  title: string
}

export function TemplateItemActions({ slug, title }: TemplateItemActionsProps) {
  const router = useRouter()

  async function handleOpenInEditor(event: React.MouseEvent) {
    event.preventDefault()
    event.stopPropagation()
    await openInEditor(`/templates/${slug}`)
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
    </div>
  )
}
