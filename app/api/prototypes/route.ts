import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { createPrototype, CreatePrototypeError } from "@/lib/prototypes/create"
import { deletePrototype, DeletePrototypeError } from "@/lib/prototypes/delete"
import { getOwnerById } from "@/lib/owners/catalog"

const createPrototypeStatus: Record<CreatePrototypeError["code"], number> = {
  DUPLICATE_SLUG: 409,
  INVALID_SEGMENT: 400,
  INVALID_INPUT: 400,
}

const deletePrototypeStatus: Record<DeletePrototypeError["code"], number> = {
  INVALID_KEY: 400,
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
    const input = await request.json()
    const entry = await createPrototype(input)
    const owner = await getOwnerById(entry.ownerId)

    if (!owner) {
      throw new CreatePrototypeError("INVALID_INPUT", "Owner not found")
    }

    revalidatePath(`/${owner.slug}/${entry.slug}`)
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

export async function DELETE(request: Request) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { error: "Only available in development environment" },
      { status: 403 }
    )
  }

  try {
    const input = await request.json()
    const owner = await getOwnerById(input.ownerId)

    if (!owner) {
      return NextResponse.json({ error: "Owner not found" }, { status: 404 })
    }

    await deletePrototype(owner.slug, input.slug)

    revalidatePath(`/${owner.slug}/${input.slug}`)
    revalidatePath("/prototypes")

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    if (error instanceof DeletePrototypeError) {
      return NextResponse.json(
        { error: error.message },
        { status: deletePrototypeStatus[error.code] }
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
