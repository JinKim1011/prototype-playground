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
    <Item size="xs">
      <Link
        href={templatePath}
        target="_blank"
        className="contents items-center"
      >
        <ItemMedia variant="image">
          <div className="size-16 overflow-hidden rounded border bg-muted">
            <iframe
              src={templatePath}
              title={`${template.title} preview`}
              className="h-80 w-160 origin-top-left scale-[0.1] border-0"
              tabIndex={-1}
              aria-hidden="true"
            />
          </div>
        </ItemMedia>

        <ItemContent>
          <ItemTitle>{template.title}</ItemTitle>

          <ItemDescription>
            <span className="hidden group-hover/item:inline">
              {templatePath}
            </span>
          </ItemDescription>
        </ItemContent>
      </Link>

      <TemplateItemActions slug={template.slug} title={template.title} />
    </Item>
  )
}
