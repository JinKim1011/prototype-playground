export class CreateOwnerError extends Error {
  readonly code: "INVALID_INPUT" | "DUPLICATE_OWNER"

  constructor(code: CreateOwnerError["code"], message?: string) {
    super(message ?? code)
    this.name = "CreateOwnerError"
    this.code = code
  }
}
