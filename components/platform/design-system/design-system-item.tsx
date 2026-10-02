"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
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

function faviconUrl(url: string) {
  try {
    const parsedUrl = new URL(url)
    return `https://www.google.com/s2/favicons?domain_url=${encodeURIComponent(
      parsedUrl.origin
    )}&sz=64`
  } catch {
    return null
  }
}

export function DesignSystemItem({ link }: DesignSystemItemProps) {
  const [faviconFailed, setFaviconFailed] = useState(false)
  const faviconSrc = faviconUrl(link.url)

  return (
    <Item size="xs" className="relative" role="listitem">
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
          {faviconFailed || !faviconSrc ? (
            <GlobeIcon aria-hidden="true" className="text-muted-foreground" />
          ) : (
            <Image
              src={faviconSrc}
              alt={`${link.title} favicon`}
              width={24}
              height={24}
              unoptimized
              onError={() => setFaviconFailed(true)}
            />
          )}
        </ItemMedia>

        <ItemContent className="flex min-w-0 items-center gap-2">
          <ItemTitle>{link.title}</ItemTitle>
        </ItemContent>
      </div>
      <ItemDescription>
        <span className="hidden group-focus-within/item:inline group-hover/item:inline">
          {link.url}
        </span>
      </ItemDescription>
    </Item>
  )
}
