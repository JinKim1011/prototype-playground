"use client"

import { ItemGroup } from "@/components/platform/ui/item"
import { PrototypeItem } from "@/components/platform/prototypes/prototype-item"
import { PrototypeToggleGroup } from "@/components/platform/prototypes/prototype-toggle-group"
import { useState } from "react"
import type { PrototypeListItem } from "@/types/prototypes"
import { Typography } from "../ui/typography"
import { OwnerEntry } from "@/types/owners"

type Props = {
  prototypes: PrototypeListItem[]
  owners: OwnerEntry[]
}

export function PrototypeItemGroup({ prototypes, owners }: Props) {
  const [selectedOwnerId, setSelectedOwnerId] = useState("all")

  const ownersById = new Map(owners.map((owner) => [owner.id, owner]))

  const availableOwners = Array.from(
    new Set(prototypes.map((prototype) => prototype.ownerId))
  )
    .map((ownerId) => ownersById.get(ownerId))
    .filter((owner): owner is OwnerEntry => owner !== undefined)
    .sort((first, second) => first.title.localeCompare(second.title))

  const effectiveSelectedOwnerId =
    selectedOwnerId === "all" ||
    availableOwners.some((owner) => owner.id === selectedOwnerId)
      ? selectedOwnerId
      : "all"

  const visiblePrototypes =
    effectiveSelectedOwnerId === "all"
      ? prototypes
      : prototypes.filter(
          (prototype) => prototype.ownerId === effectiveSelectedOwnerId
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
