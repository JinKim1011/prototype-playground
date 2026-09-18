import { PrototypeKey } from "@/types/prototypes"

const SEGMENT = /^[a-zA-Z0-9][a-zA-Z0-9._-]{0,127}$/

export function isValidateSegment(value: string): boolean {
  return SEGMENT.test(value) && !value.includes("..")
}

export function isValidPrototypeKey({ owner, slug }: PrototypeKey): boolean {
  return isValidateSegment(owner) && isValidateSegment(slug)
}

export function assertSegment(value: string, label: "owner" | "slug"): string {
  const normalizedVlaue = value.trim()

  if (!isValidateSegment(normalizedVlaue)) {
    throw new Error(`${label} is invalid`)
  }

  return normalizedVlaue
}
