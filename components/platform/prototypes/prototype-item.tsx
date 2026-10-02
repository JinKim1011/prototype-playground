"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
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
import { ImageIcon } from "@phosphor-icons/react"

type PrototypeItemProps = {
  prototype: PrototypeListItem
  owner: OwnerEntry
}

export function PrototypeItem({ prototype, owner }: PrototypeItemProps) {
  const [previewFailed, setPreviewFailed] = useState(false)
  const prototypePath = `${owner.slug}/${prototype.slug}`

  return (
    <Item size="xs" className="relative" role="listitem">
      <Link
        href={prototypePath}
        target="_blank"
        className="absolute inset-0 z-0"
        aria-label={`Open ${prototype.title}`}
      />
      <div className="pointer-events-none flex min-w-0 flex-1 items-center gap-3">
        <ItemMedia
          variant={previewFailed ? "icon" : "image"}
          className="h-9 w-16 shrink-0 rounded-sm border-[0.5px] bg-muted"
        >
          {previewFailed ? (
            <ImageIcon aria-hidden="true" className="text-muted-foreground" />
          ) : (
            <Image
              src={`/previews/prototypes/${owner.slug}/${prototype.slug}.png`}
              alt={`${prototype.title} preview`}
              width={320}
              height={180}
              className="h-9 w-16 object-cover"
              sizes="64px"
            />
          )}
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
        <PrototypeItemActions prototype={prototype} ownerSlug={owner.slug} />
      </div>
    </Item>
  )
}
