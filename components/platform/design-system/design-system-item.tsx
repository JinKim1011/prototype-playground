"use client"

import { useState } from "react"
import Link from "next/link"
import { GlobeIcon } from "@phosphor-icons/react"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/platform/ui/item"
import type { DesignSystemLink } from "@/types/design-system"

type DesignSystemItemProps = {
  link: DesignSystemLink
}

export function DesignSystemItem({ link }: DesignSystemItemProps) {
  const [faviconFailed, setFaviconFailed] = useState(false)

  return (
    <Item size="xs" className="relative">
      <Link
        href={link.url}
        target="_blank"
        className="absolute inset-0 z-0"
        aria-label={`Open ${link.title}`}
      />
      <div className="pointer-events-none flex min-w-0 flex-1 items-center gap-3">
        <ItemMedia
          variant={faviconFailed ? "icon" : "image"}
          className="h-6 w-6 shrink-0 rounded-sm border-[0.5px] bg-muted"
        >
          {faviconFailed ? (
            <GlobeIcon aria-hidden="true" />
          ) : (
            <img
              src={`https://www.google.com/s2/favicons?domain_url=${encodeURIComponent(link.url)}&sz=64`}
              alt=""
              onError={() => setFaviconFailed(true)}
            />
          )}
        </ItemMedia>

        <ItemContent className="flex min-w-0 items-center gap-2">
          <ItemTitle>{link.title}</ItemTitle>
        </ItemContent>
      </div>
      <ItemDescription>
        <span className="hidden group-hover/item:inline">{link.url}</span>
      </ItemDescription>
    </Item>
  )
}
