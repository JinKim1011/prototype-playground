import { createTemplate, CreateTemplateError } from "@/lib/templates/create"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

const createTemplateStatus: Record<CreateTemplateError["code"], number> = {
  DUPLICATE_SLUG: 409,
  INVALID_INPUT: 400,
}

export async function POST(request: Request) {
  try {
    const input = await request.json()
    const entry = await createTemplate(input)

    revalidatePath("/templates")
    revalidatePath(`/templates/${entry.slug}`)

    return NextResponse.json(entry, { status: 201 })
  } catch (error) {
    if (error instanceof CreateTemplateError) {
      return NextResponse.json(
        { error: error.message },
        { status: createTemplateStatus[error.code] }
      )
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
