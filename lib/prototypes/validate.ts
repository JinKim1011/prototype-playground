const SEGMENT = /^[a-zA-Z0-9][a-zA-Z0-9._-]{0,127}$/

export function isValidateSegment(value: string): boolean {
  return SEGMENT.test(value) && !value.includes("..")
}
