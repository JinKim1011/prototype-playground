import Link from "next/link"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/platform/ui/item"
import { PrototypeItemActions } from "@/components/platform/prototypes/prototype-item-actions"
import type { PrototypeListItem } from "@/components/platform/prototypes/prototype-item-group"

type Props = {
  prototype: PrototypeListItem
}

export function PrototypeItem({ prototype }: Props) {
  const prototypePath = `/${prototype.owner}/${prototype.slug}`

  return (
    <Item size="xs">
      <Link
        href={prototypePath}
        target="_blank"
        className="contents items-center"
      >
        <ItemMedia variant="image">
          <div className="size-16 overflow-hidden rounded border bg-muted">
            <iframe
              src={prototypePath}
              title={`${prototype.title} preview`}
              className="h-80 w-160 origin-top-left scale-[0.1] border-0"
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
