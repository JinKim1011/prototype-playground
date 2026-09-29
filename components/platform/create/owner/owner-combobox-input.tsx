import { OwnerEntry } from "@/types/owners"
import { ComboboxInput } from "@/components/platform/ui/combobox"

type OwnerComboboxInputProps = {
  selectedOwner: OwnerEntry | null
  invalid?: boolean
  errorId?: string
}

export function OwnerComboboxInput({
  selectedOwner,
  invalid,
  errorId,
}: OwnerComboboxInputProps) {
  return (
    <>
      <ComboboxInput
        placeholder="Owner"
        aria-invalid={invalid}
        aria-describedby={invalid ? errorId : undefined}
      />
      <input type="hidden" name="ownerId" value={selectedOwner?.id ?? ""} />
    </>
  )
}
