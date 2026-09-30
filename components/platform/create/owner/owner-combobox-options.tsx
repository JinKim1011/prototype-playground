import {
  ComboboxCollection,
  ComboboxContent,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxList,
} from "@/components/platform/ui/combobox"
import { OwnerComboboxItem } from "@/components/platform/create/owner/owner-combobox-item"
import {
  type OwnerValue,
  isCreateOwnerOption,
} from "@/components/platform/create/owner/owner-combobox-utils"

export function OwnerComboboxOptions() {
  return (
    <ComboboxContent>
      <ComboboxList>
        <ComboboxGroup>
          <ComboboxLabel>Select an owner or create one</ComboboxLabel>

          <ComboboxCollection>
            {(item: OwnerValue) => (
              <OwnerComboboxItem
                key={
                  isCreateOwnerOption(item) ? `create:${item.title}` : item.id
                }
                item={item}
              />
            )}
          </ComboboxCollection>
        </ComboboxGroup>
      </ComboboxList>
    </ComboboxContent>
  )
}
