"use client"

import { ItemGroup } from "@/components/platform/ui/item"
import { PrototypeItem } from "@/components/platform/prototypes/prototype-item"

export type PrototypeListItem = {
  id: string
  owner: string
  slug: string
  title: string
  updatedAt: string
  previewPath?: string
}

type Props = {
  prototypes: PrototypeListItem[]
}

export function PrototypeItemGroup({ prototypes }: Props) {
  return (
    <ItemGroup className="-mx-2 w-[calc(100%+1rem)] py-3">
      {prototypes.map((prototype) => (
        <PrototypeItem key={prototype.id} prototype={prototype} />
      ))}
    </ItemGroup>
  )
}
