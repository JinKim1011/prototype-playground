import type { PrototypeKey } from "@/types/prototypes"
import { loadPrototypeModuleWithRetry } from "@/lib/prototypes/loader"
import { PrototypeNotFound } from "@/components/platform/shell/prototype-not-found"
import { entryExists } from "@/lib/prototypes/metadata-store"

type PrototypePageProps = {
  params: Promise<PrototypeKey>
}

export default async function PrototypePage({ params }: PrototypePageProps) {
  const { owner, slug } = await params

  const hasEntry = await entryExists({ owner, slug })
  if (!hasEntry) {
    return (
      <PrototypeNotFound owner={owner} slug={slug} reason="missing-entry" />
    )
  }

  const Component = await loadPrototypeModuleWithRetry({ owner, slug })
  if (!Component) {
    return (
      <PrototypeNotFound owner={owner} slug={slug} reason="missing-files" />
    )
  }

  return <Component />
}
