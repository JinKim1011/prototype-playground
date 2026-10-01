"use client"

import { CircleHalfIcon } from "@phosphor-icons/react"
import { useTheme } from "next-themes"

import { Button } from "@/components/platform/ui/button"

export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      <CircleHalfIcon weight="bold" className="h-[1.2rem] w-[1.2rem]" />
    </Button>
  )
}
