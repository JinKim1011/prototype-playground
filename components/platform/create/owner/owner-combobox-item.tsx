import {
  isCreateOwnerOption,
  type OwnerValue,
} from "@/components/platform/create/owner/owner-combobox-utils"
import { ComboboxItem } from "@/components/platform/ui/combobox"

type OwnerComboboxItemProps = {
  item: OwnerValue
  creating: boolean
}

export function OwnerComboboxItem({ item, creating }: OwnerComboboxItemProps) {
  const createOption = isCreateOwnerOption(item)
  const optionTitle = createOption ? `Create ${item.title}` : item.title

  return (
    <ComboboxItem value={item} disabled={createOption && creating}>
      {optionTitle}
    </ComboboxItem>
  )
}
