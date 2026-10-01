"use client"

import { ItemGroup } from "@/components/platform/ui/item"
import { DesignSystemItem } from "@/components/platform/design-system/design-system-item"
import { DesignSystemLink } from "@/types/design-system"
import { Typography } from "@/components/platform/ui/typography"

type DesignSystemItemGroupProps = {
  links: DesignSystemLink[]
}

export function DesignSystemItemGroup({ links }: DesignSystemItemGroupProps) {
  return (
    <ItemGroup className="-mx-2 w-[calc(100%+1rem)] py-2">
      {links.length === 0 ? (
        <Typography
          variant="label-small"
          className="flex w-full items-center justify-center py-20 text-muted-foreground"
        >
          Click “Edit list” to add a design system link.
        </Typography>
      ) : (
        links.map((link) => <DesignSystemItem key={link.id} link={link} />)
      )}
    </ItemGroup>
  )
}
