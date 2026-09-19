import { createTemplate } from "@/lib/templates/create"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const input = await request.json()
    const entry = await createTemplate(input)

    return NextResponse.json(entry, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
