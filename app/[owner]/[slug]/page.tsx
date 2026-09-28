import type { PrototypeKey } from "@/types/prototypes"
import { loadPrototypeModuleWithRetry } from "@/lib/prototypes/loader"
import { PrototypeNotFound } from "@/components/platform/shell/prototype-not-found"
import { prototypeExists } from "@/lib/prototypes/catalog"
import { prototypeSourceExists } from "@/lib/prototypes/source"
import { isValidateSegment } from "@/lib/prototypes/validate"
import { getOwnerBySlug } from "@/lib/owners/catalog"

type PrototypeRouteParams = {
  owner: string
  slug: string
}

type PrototypePageProps = {
  params: Promise<PrototypeRouteParams>
}

export default async function PrototypePage({ params }: PrototypePageProps) {
  const { owner, slug } = await params

  if (!isValidPrototypeKey({ owner, slug })) {
    return (
      <PrototypeNotFound owner={owner} slug={slug} reason="missing-entry" />
    )
  }

  const hasEntry = await prototypeExists({ owner, slug })
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
