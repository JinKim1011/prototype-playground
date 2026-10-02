"use client"

import { ItemGroup } from "@/components/platform/ui/item"
import { PrototypeItem } from "@/components/platform/prototypes/prototype-item"
import { PrototypeToggleGroup } from "@/components/platform/prototypes/prototype-toggle-group"
import { useState } from "react"
import type { PrototypeListItem } from "@/types/prototypes"
import { Typography } from "@/components/platform/ui/typography"
import { OwnerEntry } from "@/types/owners"

type PrototypeItemGroupProps = {
  prototypes: PrototypeListItem[]
  owners: OwnerEntry[]
}

export function PrototypeItemGroup({
  prototypes,
  owners,
}: PrototypeItemGroupProps) {
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

  const visiblePrototypes = prototypes
    .filter(
      (prototype) =>
        effectiveSelectedOwnerId === "all" ||
        prototype.ownerId === effectiveSelectedOwnerId
    )
    .toSorted((first, second) =>
      first.updatedAt.localeCompare(second.updatedAt)
    )

  return (
    <>
      <PrototypeToggleGroup
        owners={availableOwners}
        value={effectiveSelectedOwnerId}
        onValueChange={setSelectedOwnerId}
        className="mt-4"
      />
      <ItemGroup className="-mx-2 w-[calc(100%+1rem)] py-2">
        {visiblePrototypes.length === 0 ? (
          <Typography
            variant="label-small"
            className="flex w-full items-center justify-center py-20 text-muted-foreground"
          >
            Created prototypes will appear here.
          </Typography>
        ) : (
          visiblePrototypes.map((prototype) => {
            const owner = ownersById.get(prototype.ownerId)

            if (!owner) {
              return null
            }

            return (
              <PrototypeItem
                key={prototype.id}
                prototype={prototype}
                owner={owner}
              />
            )
          })
        )}
      </ItemGroup>
    </>
  )
}
