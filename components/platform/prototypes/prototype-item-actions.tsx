"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/platform/ui/button"
import { PencilSimpleLineIcon, TrashSimpleIcon } from "@phosphor-icons/react"
import { toast } from "@/components/platform/ui/toaster"
import { openInEditor } from "@/lib/dev/open-in-editor"

type Props = {
  owner: string
  slug: string
  title: string
}

export function PrototypeItemActions({ owner, slug, title }: Props) {
  const router = useRouter()

  async function handleOpenInEditor(event: React.MouseEvent) {
    event.preventDefault()
    event.stopPropagation()
    await openInEditor(`/${owner}/${slug}`)
  }

  async function handleDelete() {
    try {
      const response = await fetch("/api/prototypes", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ owner, slug }),
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
      <Button
        type="button"
        size="icon-sm"
        variant="outline"
        aria-label={`Edit ${title}`}
        className="hover:bg-foreground/10"
        onClick={handleOpenInEditor}
      >
        <PencilSimpleLineIcon />
      </Button>

      <Button
        type="button"
        size="icon-sm"
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
