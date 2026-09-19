import type { PrototypeKey } from "@/types/prototypes"
import { loadPrototypeModuleWithRetry } from "@/lib/prototypes/loader"
import { PrototypeNotFound } from "@/components/platform/shell/prototype-not-found"
import { entryExists } from "@/lib/metadata/store"
import { prototypeSourceExists } from "@/lib/prototypes/source"
import { isValidPrototypeKey } from "@/lib/prototypes/validate"

type PrototypePageProps = {
  params: Promise<PrototypeKey>
}

export default async function PrototypePage({ params }: PrototypePageProps) {
  const { owner, slug } = await params

  if (!isValidPrototypeKey({ owner, slug })) {
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
