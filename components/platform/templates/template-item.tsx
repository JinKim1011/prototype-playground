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
import type { TemplateListItem } from "@/types/templates"
import { TemplateItemActions } from "@/components/platform/templates/template-item-actions"
import { ImageIcon } from "@phosphor-icons/react"

type TemplateItemProps = {
  template: TemplateListItem
}

export function TemplateItem({ template }: TemplateItemProps) {
  const [previewFailed, setPreviewFailed] = useState(false)
  const templatePath = `/templates/${template.slug}`

  return (
    <Item size="xs" className="relative" role="listitem">
      <Link
        href={templatePath}
        target="_blank"
        aria-label={`Open ${template.title}`}
        className="absolute inset-0 z-0"
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
              src={`/previews/templates/${template.slug}.png`}
              alt={`${template.title} preview`}
              width={320}
              height={180}
              className="h-9 w-16 object-cover"
              sizes="64px"
              onError={() => setPreviewFailed(true)}
            />
          )}
        </ItemMedia>

        <ItemContent className="flex min-w-0 items-center gap-2">
          <ItemTitle>{template.title}</ItemTitle>
          <ItemDescription>
            <span className="invisible opacity-0 transition-[opacity,visibility] duration-100 ease-out group-hover/item:visible group-hover/item:opacity-100">
              {templatePath}
            </span>
          </ItemDescription>
        </ItemContent>
      </div>

      <div className="relative z-10">
        <TemplateItemActions slug={template.slug} title={template.title} />
      </div>
    </Item>
  )
}
