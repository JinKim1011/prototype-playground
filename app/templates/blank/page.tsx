"use client"

import { usePathname } from "next/navigation"
import { toast } from "@/components/prototypes/sonner"
import { Button } from "@/components/prototypes/button"
import { Typography } from "@/components/prototypes/typography"
import { openInEditor } from "./lib/openInEditor"
import { WisdomIdiom } from "./components/widtom-idiom"

export default function BlankTemplatePage() {
  const pathname = usePathname()
  const isPreview = pathname.startsWith("/templates/")

  function handleOpenInEditor(event: React.MouseEvent) {
    event.preventDefault()
    event.stopPropagation()

    try {
      if (isPreview) {
        toast.error("This is template preview mode")
        return
      }

      void openInEditor(window.location.pathname)
      toast.success(`Opened Blank in editor`)
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to open editor"
      )
    }
  }

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-3">
      <section className="flex items-center pt-20">
        <div className="flex flex-1 flex-col gap-1">
          <Typography variant="heading-small">New prototype</Typography>
          <Typography variant="body" className="text-muted-foreground">
            This is a blank template.
          </Typography>
        </div>

        <Button onClick={handleOpenInEditor} className="w-fit">
          Open in editor
        </Button>
      </section>

      <WisdomIdiom />
    </main>
  )
}
