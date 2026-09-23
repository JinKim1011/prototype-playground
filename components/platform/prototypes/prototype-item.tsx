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
    <Item size="xs">
      <Link
        href={prototypePath}
        target="_blank"
        className="contents items-center"
      >
        <ItemMedia variant="image" className="h-9 w-16">
          <div className="h-9 w-16 overflow-hidden border-[0.5px] bg-muted">
            <iframe
              src={prototypePath}
              title={`${prototype.title} preview`}
              className="h-90 w-160 origin-top-left scale-[0.1] border-0"
              tabIndex={-1}
              aria-hidden="true"
            />
          </div>
        </ItemMedia>

        <ItemContent>
          <ItemTitle>{prototype.title}</ItemTitle>

          <ItemDescription>
            <span className="group-hover/item:hidden">{prototype.owner}</span>
            <span className="hidden group-hover/item:inline">
              {prototypePath}
            </span>
          </ItemDescription>
        </ItemContent>
      </Link>

      <PrototypeItemActions
        owner={prototype.owner}
        slug={prototype.slug}
        title={prototype.title}
      />
    </Item>
  )
}
