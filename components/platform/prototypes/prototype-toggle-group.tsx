"use client"

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/platform/ui/toggle-group"

type PrototypeToggleGroupProps = {
  owners: string[]
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
        <ToggleGroupItem key={owner} value={owner}>
          {owner}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}
