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

type Props = {
  prototype: PrototypeListItem
}

export function PrototypeItem({ prototype }: Props) {
  const prototypePath = `/${prototype.owner.toLowerCase()}/${prototype.slug}`

  return (
    <Item size="xs" className="relative">
      <Link
        href={prototypePath}
        target="_blank"
        className="absolute inset-0 z-0"
      />
      <div className="pointer-events-none flex min-w-0 flex-1 items-center gap-3">
        <ItemMedia variant="image" className="h-9 w-16 shrink-0">
          <div className="h-9 w-16 overflow-hidden border-[0.5px] border-muted bg-muted">
            <iframe
              src={prototypePath}
              title={`${prototype.title} preview`}
              className="pointer-events-none h-180 w-7xl origin-top-left scale-[0.05] border-0"
              tabIndex={-1}
              aria-hidden="true"
            />
          </div>
        </ItemMedia>

        <ItemContent className="min-w-0">
          <ItemTitle>{prototype.title}</ItemTitle>
          <ItemDescription>
            <span className="col-start-1 row-start-1 opacity-100 transition-opacity duration-100 ease-out group-hover/item:opacity-0">
              {prototype.owner}
            </span>

            <span className="col-start-1 row-start-1 opacity-0 transition-opacity duration-100 ease-out group-hover/item:opacity-100">
              {prototypePath}
            </span>
          </ItemDescription>
        </ItemContent>
      </div>

      <div className="relative z-10">
        <PrototypeItemActions
          owner={prototype.owner}
          slug={prototype.slug}
          title={prototype.title}
        />
      </div>
    </Item>
  )
}
