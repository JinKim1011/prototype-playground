"use client"

import { ItemGroup } from "@/components/platform/ui/item"
import { DesignSystemItem } from "@/components/platform/design-system/design-system-item"
import { DesignSystemLink } from "@/types/design-system"

type DesignSystemItemGroupProps = {
  links: DesignSystemLink[]
}

export function DesignSystemItemGroup({ links }: DesignSystemItemGroupProps) {
  return (
    <ItemGroup className="-mx-2 w-[calc(100%+1rem)] py-2">
      {links.map((link) => (
        <DesignSystemItem key={link.id} link={link} />
      ))}
    </ItemGroup>
  )
}
