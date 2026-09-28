"use client"

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/platform/ui/toggle-group"
import { OwnerEntry } from "@/types/owners"

type PrototypeToggleGroupProps = {
  owners: OwnerEntry[]
  value: string
  onValueChange: (owner: string) => void
  className?: string
}

export function PrototypeToggleGroup({
  owners,
  value,
  onValueChange,
  className,
}: PrototypeToggleGroupProps) {
  if (owners.length <= 1) {
    return null
  }

  return (
    <ToggleGroup
      variant="default"
      size="sm"
      aria-label="Filter prototypes by owner"
      value={[value]}
      onValueChange={(nextValues) => {
        const nextValue = nextValues[0]

        if (nextValue) {
          onValueChange(nextValue)
        }
      }}
      className={className}
    >
      <ToggleGroupItem value="all">All</ToggleGroupItem>
      {owners.map((owner) => (
        <ToggleGroupItem key={owner.id} value={owner.id}>
          {owner.title}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}
