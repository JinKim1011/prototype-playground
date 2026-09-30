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
  const ownerId =
    selectedOwner && !isCreateOwnerOption(selectedOwner) ? selectedOwner.id : ""

  const ownerTitle =
    selectedOwner && isCreateOwnerOption(selectedOwner)
      ? selectedOwner.title
      : ""

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
