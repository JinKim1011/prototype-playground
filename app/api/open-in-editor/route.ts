import { getPrototypePage } from "@/lib/prototypes/path"
import { getTemplatePage } from "@/lib/templates/path"
import { NextResponse } from "next/server"
import { execFile } from "node:child_process"
import { promisify } from "node:util"
import { isValidateSegment } from "@/lib/prototypes/validate"
import { getOwnerBySlug } from "@/lib/owners/catalog"

const execFileAsync = promisify(execFile)

export async function POST(request: Request) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { error: "Only available in development environment" },
      { status: 403 }
    )
  }

  try {
    const input = (await request.json()) as { pathname: string }

    if (typeof input?.pathname !== "string") {
      return NextResponse.json(
        { error: "Invalid prototype pathname" },
        { status: 400 }
      )
    }

    const pathname = input.pathname.trim()
    const segments = input.pathname.split("/").filter(Boolean)

    if (pathname === "/data/design-system.json") {
      await execFileAsync("code", ["--reuse-window", "data/design-system.json"])
      return NextResponse.json({ ok: true })
    }

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

    const [ownerSlug, slug] = segments

    if (!isValidateSegment(ownerSlug) || !isValidateSegment(slug)) {
      return NextResponse.json(
        { error: "Invalid prototype pathname" },
        { status: 400 }
      )
    }

    const owner = await getOwnerBySlug(ownerSlug)

    if (!owner) {
      return NextResponse.json({ error: "Owner not found" }, { status: 404 })
    }

    await execFileAsync("code", [
      "--reuse-window",
      getPrototypePage(owner.slug, slug),
    ])

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json(
      { error: "Failed to open editor" },
      { status: 500 }
    )
  }
}
