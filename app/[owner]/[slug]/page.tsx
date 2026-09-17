import type { PrototypeKey } from "@/types/prototypes"
import { loadPrototypeModuleWithRetry } from "@/lib/prototypes/loader"
import { PrototypeNotFound } from "@/components/platform/shell/prototype-not-found"

type PrototypePageProps = {
  params: Promise<PrototypeKey>
}

export default async function PrototypePage({ params }: PrototypePageProps) {
  const { owner, slug } = await params

  const Component = await loadPrototypeModuleWithRetry({ owner, slug })

  if (!Component) {
    return (
      <PrototypeNotFound owner={owner} slug={slug} reason="missing-files" />
    )
  }

  return <Component />
}
