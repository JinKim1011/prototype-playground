import Link from "next/link"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/platform/ui/item"
import type { TemplateListItem } from "@/types/templates"
import { TemplateItemActions } from "@/components/platform/templates/template-item-actions"

type TemplateItemProps = {
  template: TemplateListItem
}

export function TemplateItem({ template }: TemplateItemProps) {
  const templatePath = `/templates/${template.slug}`

  return (
    <Item size="xs" className="relative">
      <Link
        href={templatePath}
        target="_blank"
        aria-label={`Open ${template.title}`}
        className="absolute inset-0 z-0"
      />
      <div className="pointer-events-none flex min-w-0 flex-1 items-center gap-3">
        <ItemMedia variant="image" className="h-9 w-16 shrink-0">
          <div className="h-9 w-16 overflow-hidden border-[0.5px] border-muted bg-muted">
            <iframe
              src={templatePath}
              title={`${template.title} preview`}
              className="pointer-events-none h-180 w-7xl origin-top-left scale-[0.05] border-0"
              tabIndex={-1}
              aria-hidden="true"
            />
          </div>
        </ItemMedia>

        <ItemContent className="min-w-0">
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
