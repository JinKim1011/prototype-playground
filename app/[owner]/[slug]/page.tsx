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

  if (!isValidateSegment(owner) || !isValidateSegment(slug)) {
    return (
      <PrototypeNotFound
        ownerSlug={owner}
        prototypeSlug={slug}
        reason="missing-entry"
      />
    )
  }

  const ownerEntry = await getOwnerBySlug(owner)

  if (!ownerEntry) {
    return (
      <PrototypeNotFound
        ownerSlug={owner}
        prototypeSlug={slug}
        reason="missing-entry"
      />
    )
  }

  if (!(await prototypeExists(ownerEntry.id, slug))) {
    return (
      <PrototypeNotFound
        ownerSlug={owner}
        prototypeSlug={slug}
        reason="missing-entry"
      />
    )
  }

  if (!(await prototypeSourceExists(owner, slug))) {
    return (
      <PrototypeNotFound
        ownerSlug={owner}
        prototypeSlug={slug}
        reason="missing-files"
      />
    )
  }

  const Component = await loadPrototypeModuleWithRetry(owner, slug)

  return <Component />
}
