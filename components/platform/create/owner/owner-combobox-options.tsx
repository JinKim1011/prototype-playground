import {
  ComboboxCollection,
  ComboboxContent,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxList,
} from "@/components/platform/ui/combobox"
import { OwnerComboboxItem } from "@/components/platform/create/owner/owner-combobox-item"
import { type OwnerValue } from "@/components/platform/create/owner/owner-combobox-utils"

type OwnerComboboxOptionsProps = {
  creating: boolean
}

export function OwnerComboboxOptions({ creating }: OwnerComboboxOptionsProps) {
  return (
    <ComboboxContent>
      <ComboboxList>
        <ComboboxGroup>
          <ComboboxLabel>Select an owner or create one</ComboboxLabel>

          <ComboboxCollection>
            {(item: OwnerValue) => (
              <OwnerComboboxItem item={item} creating={creating} />
            )}
          </ComboboxCollection>
        </ComboboxGroup>
      </ComboboxList>
    </ComboboxContent>
  )
}
