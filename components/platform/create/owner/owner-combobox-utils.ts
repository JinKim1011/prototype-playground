import type { OwnerEntry } from "@/types/owners"

export type CreateOwnerOption = {
  type: "create"
  title: string
}

export type OwnerValue = OwnerEntry | CreateOwnerOption

export function isCreateOwnerOption(
  value: OwnerValue
): value is CreateOwnerOption {
  return "type" in value && value.type === "create"
}

export function getOwnerItemLabel(item: OwnerValue) {
  return isCreateOwnerOption(item) ? item.title : `${item.title} ${item.slug}`
}
