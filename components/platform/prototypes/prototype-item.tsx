import Link from "next/link"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/platform/ui/item"
import { PrototypeItemActions } from "@/components/platform/prototypes/prototype-item-actions"
import type { PrototypeListItem } from "@/types/prototypes"
import { OwnerEntry } from "@/types/owners"

type PrototypeItemProps = {
  prototype: PrototypeListItem
  owner: OwnerEntry
}

export function PrototypeItem({ prototype, owner }: PrototypeItemProps) {
  const prototypePath = `${owner.slug}/${prototype.slug}`

  return (
    <Item size="xs" className="relative">
      <Link
        href={prototypePath}
        target="_blank"
        className="absolute inset-0 z-0"
        aria-label={`Open ${prototype.title}`}
      />
      <div className="pointer-events-none flex min-w-0 flex-1 items-center gap-3">
        <ItemMedia variant="image" className="h-9 w-16 shrink-0">
          <div className="h-9 w-16 overflow-hidden border-[0.5px] bg-muted">
            <iframe
              src={prototypePath}
              title={`${prototype.title} preview`}
              className="pointer-events-none h-180 w-7xl origin-top-left scale-[0.05] border-0"
              tabIndex={-1}
              aria-hidden="true"
            />
          </div>
        </ItemMedia>

        <ItemContent className="flex min-w-0 items-center gap-2">
          <ItemTitle>{prototype.title}</ItemTitle>
          <ItemDescription>
            <span className="group-hover/item:hidden">{owner.title}</span>

            <span className="hidden group-hover/item:inline">
              {prototypePath}
            </span>
          </ItemDescription>
        </ItemContent>
      </div>

      <div className="relative z-10">
        <PrototypeItemActions
          ownerId={owner.id}
          ownerSlug={owner.slug}
          slug={prototype.slug}
          title={prototype.title}
        />
      </div>
    </Item>
  )
}
