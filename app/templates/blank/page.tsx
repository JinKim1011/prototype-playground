"use client"

import { usePathname } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/prototypes/button"
import { Typography } from "@/components/prototypes/typography"
import { openInEditor } from "./lib/openInEditor"
import { FortuneCookie } from "./components/fortune-cookie"

export default function BlankTemplatePage() {
  const pathname = usePathname()
  const isPreview = pathname.startsWith("/templates/")

  function handleOpenInEditor() {
    if (isPreview) {
      toast.error("This is template preview mode")
      return
    }

    void openInEditor(window.location.pathname)
  }

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-12 px-3">
      <section className="flex flex-col gap-4 pt-20">
        <Typography variant="heading">New prototype</Typography>

        <Typography variant="body">This is a blank template.</Typography>

        <Button onClick={handleOpenInEditor}>Open in editor</Button>
      </section>

      <FortuneCookie />
    </main>
  )
}
