import { prototypePage } from "@/lib/prototypes/path"
import { isValidPrototypeKey } from "@/lib/prototypes/validate"
import { NextResponse } from "next/server"
import { execFile } from "node:child_process"
import { promisify } from "node:util"

const execFileAsync = promisify(execFile)

export async function POST(request: Request) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { error: "Not available in production" },
      { status: 403 }
    )
  }

  try {
    const input = (await request.json()) as { pathname: string }

    const segments = input.pathname.split("/").filter(Boolean)

    if (segments[0] === "templates") {
      const slug = segments[1]

      if (segments.length !== 2 || !slug || !isValidateSegment(slug)) {
        return NextResponse.json(
          { error: "Invalid template pathname" },
          { status: 400 }
        )
      }

      await execFileAsync("code", ["--reuse-window", getTemplatePage(slug)])

      return NextResponse.json({ ok: true })
    }

    if (segments.length !== 2) {
      return NextResponse.json(
        { error: "Invalid prototype pathname" },
        { status: 400 }
      )
    }

    const [owner, slug] = segments

    if (!isValidateSegment(owner) || !isValidateSegment(slug)) {
      return NextResponse.json(
        { error: "Invalid prototype pathname" },
        { status: 400 }
      )
    }

    await execFileAsync("code", [
      "--reuse-window",
      prototypePage({ owner, slug }),
    ])

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json(
      { error: "Failed to open editor" },
      { status: 500 }
    )
  }
}
