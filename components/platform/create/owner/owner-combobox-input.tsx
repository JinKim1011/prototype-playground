import { ComboboxInput } from "@/components/platform/ui/combobox"
import {
  type OwnerValue,
  isCreateOwnerOption,
} from "@/components/platform/create/owner/owner-combobox-utils"

type OwnerComboboxInputProps = {
  selectedOwner: OwnerValue | null
  invalid?: boolean
  errorId?: string
}

export function OwnerComboboxInput({
  selectedOwner,
  invalid,
  errorId,
}: OwnerComboboxInputProps) {
  const isNewOwner = selectedOwner && !isCreateOwnerOption(selectedOwner)

  const ownerId = isNewOwner ? selectedOwner.id : ""

  const ownerTitle = isNewOwner ? selectedOwner.title : ""

  return (
    <>
      <ComboboxInput
        placeholder="Owner"
        aria-invalid={invalid}
        aria-describedby={invalid ? errorId : undefined}
      />
      <input type="hidden" name="ownerId" value={ownerId} />
      <input type="hidden" name="ownerTitle" value={ownerTitle} />
    </>
  )
}
