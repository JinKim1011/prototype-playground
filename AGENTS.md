<!-- BEGIN:nextjs-agent-rules -->

# Next.js Compatibility

This project uses a modified Next.js setup. Before changing Next.js behavior, read the relevant guide in `node_modules/next/dist/docs/`.

<!-- END:nextjs-agent-rules -->

# Prototype Playground

A Next.js playground for creating, browsing, previewing, and sharing UI prototypes.

## Scope

This file defines repository-wide conventions for all tools and agents.

Prototype-specific guidance lives in:

- `.cursor/rules/prototyping.mdc`
- `.cursor/rules/owner.local.mdc`
- `app/templates/{slug}/`
- `prototypes/{owner}/{slug}/`

## Stack

- Next.js 16 with the App Router
- React Server Components
- TypeScript with strict mode
- Tailwind CSS v4
- Base UI
- shadcn/ui
- pnpm

## Project Model

### Routes

| Purpose           | Route               |
| ----------------- | ------------------- |
| Prototype         | `/{owner}/{slug}`   |
| Template preview  | `/templates/{slug}` |
| Prototype catalog | `/prototypes`       |
| Template catalog  | `/templates`        |

### Prototype Source

```text
prototypes/{owner}/{slug}/page.tsx
```

Prototypes are served through `app/[owner]/[slug]/page.tsx`.

### Template Source

```text
app/templates/{slug}/page.tsx
```

Templates are previewable and are copied into a new prototype when selected.

### Catalogs

| Data                | Source                    |
| ------------------- | ------------------------- |
| Prototypes          | `data/prototypes.json`    |
| Owners              | `data/owners.json`        |
| Templates           | `data/templates.json`     |
| Design-system links | `data/design-system.json` |

### Generated Files

```text
prototypes/registry.ts
```

This file is generated from the prototype catalog.

## Component Boundaries

### Playground Components

```text
components/platform/
```

Use this directory for the playground application, including the shell, navigation, create flows, catalog views, and platform UI.

### Prototype Components

```text
components/prototypes/
```

Use this directory for components available to prototype authors. Prototype pages must not import platform components.

### Prototype-Local Components

Prototype-specific components should stay inside:

```text
prototypes/{owner}/{slug}/
```

Extract them only when they are specific to that prototype.

## Import Conventions

Use the `@/` alias for repository imports:

```tsx
import { Button } from "@/components/prototypes/button"
import { cn } from "@/lib/utils"
```

Use prototype components when working on a prototype. Use platform components only when working on the playground application.

## Invariants

- Prototype URLs use the format `/{owner}/{slug}`.
- Prototype source files live under `prototypes/{owner}/{slug}/`.
- Template source files live under `app/templates/{slug}/`.
- Prototype metadata is stored in `data/prototypes.json`.
- Owner metadata is stored in `data/owners.json`.
- Generated files must not be edited manually.
- Prototype code must not depend on platform components.
- Do not modify generated or infrastructure files unless the task requires it.

## Generated Files

Never manually edit:

```text
prototypes/registry.ts
```

Use the existing prototype creation flow so metadata, source files, and the registry remain synchronized.
