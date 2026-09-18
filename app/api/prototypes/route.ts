import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { createPrototype, CreatePrototypeError } from "@/lib/prototypes/create"

const createPrototypeStatus: Record<CreatePrototypeError["code"], number> = {
  DUPLICATE_SLUG: 409,
  INVALID_SEGMENT: 400,
  INVALID_INPUT: 400,
}

export async function POST(request: Request) {
  try {
    const input = await request.json()
    const entry = await createPrototype(input)

    revalidatePath(`/${entry.owner}/${entry.slug}`)
    revalidatePath("/prototypes")

    return NextResponse.json(entry, { status: 201 })
  } catch (error) {
    if (error instanceof CreatePrototypeError) {
      return NextResponse.json(
        { error: error.message },
        { status: createPrototypeStatus[error.code] }
      )
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
