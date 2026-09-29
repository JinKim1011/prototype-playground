import {
  isCreateOwnerOption,
  type OwnerValue,
} from "@/components/platform/create/owner/owner-combobox-utils"
import { ComboboxItem } from "@/components/platform/ui/combobox"
import { typographyStyles } from "@/components/platform/ui/typography"

type OwnerComboboxItemProps = {
  item: OwnerValue
}

export function OwnerComboboxItem({ item }: OwnerComboboxItemProps) {
  const createOption = isCreateOwnerOption(item)

  return (
    <ComboboxItem value={item}>
      {createOption ? (
        <>
          Create
          <span
            className={typographyStyles({
              variant: "label-small",
              className: "text-blue-500!",
            })}
          >
            {item.title}
          </span>
        </>
      ) : (
        item.title
      )}
    </ComboboxItem>
  )
}
