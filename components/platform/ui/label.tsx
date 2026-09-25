"use client"

import * as React from "react"
import { cn } from "cn"

import { typographyStyles } from "@/components/platform/ui/typography"

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        "flex items-center gap-2 select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        typographyStyles({ variant: "label-small" }),
        className
      )}
      {...props}
    />
  )
}

export { Label }
