"use client"

import { useState } from "react"
import type { OwnerEntry } from "@/types/owners"
import { Combobox } from "@/components/platform/ui/combobox"
import { createOwnerAction } from "@/app/actions/owners"
import {
  type OwnerValue,
  getOwnerItemLabel,
  isCreateOwnerOption,
} from "@/components/platform/create/owner/owner-combobox-utils"
import { OwnerComboboxOptions } from "@/components/platform/create/owner/owner-combobox-options"
import { OwnerComboboxInput } from "@/components/platform/create/owner/owner-combobox-input"
import { toast } from "@/components/platform/ui/toaster"

type CreateOwnerComboboxProps = {
  owners: OwnerEntry[]
  invalid?: boolean
  errorId?: string
}

export function OwnerCombobox({
  owners,
  invalid,
  errorId,
}: CreateOwnerComboboxProps) {
  const [query, setQuery] = useState("")
  const [selectedOwner, setSelectedOwner] = useState<OwnerValue | null>(null)

  const normalizedQuery = query.trim().toLocaleLowerCase()

  const hasIdenticalOwner = owners.some(
    (owner) =>
      owner.title.toLocaleLowerCase() === normalizedQuery ||
      owner.slug.toLocaleLowerCase() === normalizedQuery
  )

  const showCreateOption = normalizedQuery.length > 0 && !hasIdenticalOwner

  const comboboxItems: OwnerValue[] = [
    ...owners,
    ...(showCreateOption
      ? [{ type: "create" as const, title: query.trim() }]
      : []),
  ]

  function handleValueChange(value: OwnerValue | null): void {
    setSelectedOwner(value)
  }

  return (
    <Combobox<OwnerValue>
      items={comboboxItems}
      value={selectedOwner}
      itemToStringLabel={(item) => getOwnerItemLabel(item)}
      onInputValueChange={setQuery}
      onValueChange={handleValueChange}
    >
      <OwnerComboboxInput
        selectedOwner={selectedOwner}
        invalid={invalid}
        errorId={errorId}
      />
      <OwnerComboboxOptions />
    </Combobox>
  )
}
