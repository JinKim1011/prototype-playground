import { prototypePage } from "@/lib/prototypes/path"
import { isValidPrototypeKey } from "@/lib/prototypes/validate"
import { NextResponse } from "next/server"
import { execFile } from "node:child_process"
import { promisify } from "node:util"

const execFileAsync = promisify(execFile)

export async function POST(request: Request) {
  try {
    const input = (await request.json()) as { pathname: string }

    const segments = input.pathname.split("/").filter(Boolean).filter(Boolean)

    const [owner, slug] = segments
    if (!isValidPrototypeKey({ owner, slug })) {
      return NextResponse.json({ error: "Invalid pathname" }, { status: 400 })
    }

    await execFileAsync("code", [prototypePage({ owner, slug })])

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json(
      { error: "Failed to open editor" },
      { status: 500 }
    )
  }
}
