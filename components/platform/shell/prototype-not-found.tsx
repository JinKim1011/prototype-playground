import type { PrototypeKey } from "@/types/prototypes"
import { buttonVariants } from "@/components/platform/ui/button"
import { Typography } from "@/components/platform/ui/typography"
import Link from "next/link"

type PrototypeNotFoundReason = "missing-entry" | "missing-files"

type PrototypeNotFoundProps = PrototypeKey & {
  reason: PrototypeNotFoundReason
}

const messages: Record<PrototypeNotFoundReason, string> = {
  "missing-entry": "No prototype exists at:",
  "missing-files":
    "This prototype is listed in metadata, but its page file is missing. Remove the metadata entry or recreate the prototype.",
}

export function PrototypeNotFound({
  owner,
  slug,
  reason,
}: PrototypeNotFoundProps) {
  const message = messages[reason]

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-8 text-center">
      <Typography as="h1" variant="heading">
        Prototype not found
      </Typography>
      <Typography as="h2" variant="body" className="max-w-md">
        {message} {owner}/{slug}
      </Typography>

      <Link href="/prototypes" className={buttonVariants()}>
        Back to prototypes
      </Link>
    </div>
  )
}
