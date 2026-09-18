import type { PrototypeKey } from "@/types/prototypes"
import { loadPrototypeModuleWithRetry } from "@/lib/prototypes/loader"
import { PrototypeNotFound } from "@/components/platform/shell/prototype-not-found"
import { entryExists } from "@/lib/metadata/store"
import { prototypeSourceExists } from "@/lib/prototypes/source"

type PrototypePageProps = {
  params: Promise<PrototypeKey>
}

const SEGMENT = /^[a-zA-Z0-9][a-zA-Z0-9._-]{0,127}$/

function isValidSegment(value: string): boolean {
  return SEGMENT.test(value) && !value.includes("..")
}

export default async function PrototypePage({ params }: PrototypePageProps) {
  const { owner, slug } = await params

  if (!isValidSegment(owner) || !isValidSegment(slug)) {
    return (
      <PrototypeNotFound owner={owner} slug={slug} reason="missing-entry" />
    )
  }

  const hasEntry = await entryExists({ owner, slug })
  if (!hasEntry) {
    return (
      <PrototypeNotFound owner={owner} slug={slug} reason="missing-entry" />
    )
  }

  if (!(await prototypeSourceExists({ owner, slug }))) {
    return (
      <PrototypeNotFound owner={owner} slug={slug} reason="missing-files" />
    )
  }

  const Component = await loadPrototypeModuleWithRetry({ owner, slug })

  return <Component />
}
