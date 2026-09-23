"use client"

import { ItemGroup } from "@/components/platform/ui/item"
import { PrototypeItem } from "@/components/platform/prototypes/prototype-item"
import { PrototypeToggleGroup } from "@/components/platform/prototypes/prototype-toggle-group"
import { useState } from "react"
import type { PrototypeListItem } from "@/types/prototypes"
import { Typography } from "../ui/typography"

type Props = {
  prototypes: PrototypeListItem[]
}

export function PrototypeItemGroup({ prototypes }: Props) {
  const [selectedOwner, setSelectedOwner] = useState("all")

  const owners = Array.from(
    new Set(prototypes.map((prototype) => prototype.owner))
  ).sort()

  const effectiveSelectedOwner =
    selectedOwner === "all" || owners.includes(selectedOwner)
      ? selectedOwner
      : "all"

  const visiblePrototypes =
    effectiveSelectedOwner === "all"
      ? prototypes
      : prototypes.filter(
          (prototype) => prototype.owner === effectiveSelectedOwner
        )

  return (
    <>
      <PrototypeToggleGroup
        owners={owners}
        value={effectiveSelectedOwner}
        onValueChange={setSelectedOwner}
        className="mt-4"
      />
      <ItemGroup className="-mx-2 w-[calc(100%+1rem)] py-2">
        {visiblePrototypes.length === 0 ? (
          <Typography
            variant="label-small"
            className="flex h-13.5 w-full items-center justify-center text-muted-foreground"
          >
            Created prototypes will appear here.
          </Typography>
        ) : (
          visiblePrototypes.map((prototype) => (
            <PrototypeItem key={prototype.id} prototype={prototype} />
          ))
        )}
      </ItemGroup>
    </>
  )
}
