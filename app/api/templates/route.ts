import { createTemplate, CreateTemplateError } from "@/lib/templates/create"
import { deleteTemplate, DeleteTemplateError } from "@/lib/templates/delete"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

const createTemplateStatus: Record<CreateTemplateError["code"], number> = {
  DUPLICATE_SLUG: 409,
  INVALID_INPUT: 400,
}

const deleteTemplateStatus: Record<DeleteTemplateError["code"], number> = {
  INVALID_SLUG: 400,
  NOT_FOUND: 404,
}

export async function POST(request: Request) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { error: "Only available in development environment" },
      { status: 403 }
    )
  }

  try {
    let input

    try {
      input = await request.json()
    } catch {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
    }

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

export async function DELETE(request: Request) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { error: "Only available in development environment" },
      { status: 403 }
    )
  }

  try {
    const input = await request.json()

    await deleteTemplate(input.slug)

    revalidatePath("/templates")
    revalidatePath(`/templates/${input.slug}`)

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    if (error instanceof DeleteTemplateError) {
      return NextResponse.json(
        { error: error.message },
        { status: deleteTemplateStatus[error.code] }
      )
    }

    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
