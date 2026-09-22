"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/platform/ui/button"
import { PencilSimpleLineIcon, TrashSimpleIcon } from "@phosphor-icons/react"

type TemplateItemActionsProps = {
  slug: string
  title: string
}

export function TemplateItemActions({ slug, title }: TemplateItemActionsProps) {
  const router = useRouter()

  async function handleDelete() {
    const response = await fetch("/api/templates", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
    })

    if (response.ok) {
      router.refresh()
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
        onClick={() => {
          // Open editor flow
        }}
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
