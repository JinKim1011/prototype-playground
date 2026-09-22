"use client"

import { ItemGroup } from "@/components/platform/ui/item"
import { PrototypeItem } from "@/components/platform/prototypes/prototype-item"
import { PrototypeToggleGroup } from "./prototype-toggle-group"
import { useState } from "react"
import type { PrototypeListItem } from "@/types/prototypes"

type Props = {
  prototypes: PrototypeListItem[]
}

export function PrototypeItemGroup({ prototypes }: Props) {
  const [selectedOwner, setSelectedOwner] = useState("all")

  const owners = Array.from(
    new Set(prototypes.map((prototype) => prototype.owner))
  ).sort()

  const visiblePrototypes =
    selectedOwner === "all"
      ? prototypes
      : prototypes.filter((prototype) => prototype.owner === selectedOwner)

  return (
    <>
      <PrototypeToggleGroup
        owners={owners}
        value={selectedOwner}
        onValueChange={setSelectedOwner}
        className="mt-3"
      />
      <ItemGroup className="-mx-2 w-[calc(100%+1rem)] py-3">
        {visiblePrototypes.map((prototype) => (
          <PrototypeItem key={prototype.id} prototype={prototype} />
        ))}
      </ItemGroup>
    </>
  )
}
