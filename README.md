# Prototype Playground

A shared Next.js playground for creating, browsing, previewing, and sharing UI prototypes.

Each prototype is stored as source code under `prototypes/` and receives a permanent URL at `/{owner}/{slug}`. Templates can be previewed before being copied into a new prototype. This is a clean rebuild based on the default shadcn/ui component model. The repository is designed so teams can replace the generated components and semantic tokens with their own design system.

- Next.js
- TypeScript
- Tailwind
- shadcn/ui

## Features

- Browse prototypes from a shared playground. (TBD)
- Open prototypes at `/{owner}/{slug}`. (TBD)
- Create prototypes from templates. (TBD)
- Preview templates at `/templates/{slug}`. (TBD)
- Copy template source into standalone prototype folders. (TBD)
- Link to public design-system documentation. (TBD)
- Keep agent context next to the project and prototype code. (TBD)

## Getting Started

Install dependencies:

`pnpm install`

Start the development server:

`pnpm dev`

Open `http://localhost:3000` in your browser.

## Local Agent Setup

Create the local owner configuration when prototype support is enabled:

`cp .cursor/rules/owner.local.mdc.template .cursor/rules/owner.local.mdc`

Set your display name, owner slug, and prototype directory in the copied file. The local file is gitignored.

## Architecture

A prototype consists of:

- A metadata entry in `data/metadata.json`.
- A page at `prototypes/{owner}/{slug}/page.tsx`.
- A generated entry in `prototypes/registry.ts`.

The composite `{owner}:{slug}` identifier connects the metadata entry, URL, and directory on disk.

Templates live under `app/templates/{slug}/page.tsx`. The same source is used for template previews and copied into new prototypes.

The generated registry is never edited manually.

## Project Structure

- `app/` — routes and layouts.
- `components/platform/` — components used to build the playground itself.
- `components/platform/shell/` — playground shell and platform-level layout components.
- `components/platform/ui/` — shadcn components used by the playground.
- `components/prototypes/` — shadcn components supplied to prototype authors and consumers.
- `data/` — metadata and public configuration.
- `lib/` — shared utilities and playground logic.
- `prototypes/` — standalone prototype source files and the generated registry.
- `.cursor/rules/` = shared agent instructions.

## Customizing the Design System

The repository has two component layers:

- `components/platform/` contains the components used to build the playground application.
- `components/prototypes/` contains the components available to prototype authors and consumers.

The default shadcn destination is `components/platform/ui`, configured by the
`ui` alias in `components.json`:

```json
"ui": "@/components/platform/ui"
```

To add a standard shadcn component for the playground, run:

```bash
pnpm dlx shadcn@latest add button
```

Prototype UI components use a separate destination. Add them explicitly with
the CLI `--path` option:

```bash
pnpm dlx shadcn@latest add button \
	--path components/prototypes
```

Consumers can customize or remove files in `components/prototypes` without
changing the playground shell or its platform components. Prototype code should
import from this layer, while the playground itself should import from
`components/platform/ui`.

### Installing a Namespaced Registry

To use your team's customized shadcn components for prototypes:

1. Configure the team's registry if it is not already available through the shadcn registry index:

```bash
pnpm dlx shadcn@latest registry add \
	@team=https://registry.example.com/r/{name}.json
```

2. Inspect the registry item before installing it:

```bash
pnpm dlx shadcn@latest view @team/design-system
```

3. Install it into the prototype component directory:

```bash
pnpm dlx shadcn@latest add @team/design-system \
	--path components/prototypes
```

The registry item is copied into the repository as local source code. Consumers
can now customize or remove the installed files in `components/prototypes`.
Prototype code should import from that directory, while playground code should
continue using `components/platform/ui`.

If the team registry requires project configuration instead of the `registry
add` command, add its URL template under `registries` in `components.json`:

```json
"registries": {
	"@team": "https://registry.example.com/r/{name}.json"
}
```

Replace the example URL with the team's actual registry URL. Review the output
of `view` before installation because a registry item can include dependencies,
CSS variables, and files beyond the component itself.

See the official shadcn documentation for [namespaced registries](https://ui.shadcn.com/docs/registry/namespace),
[registry setup](https://ui.shadcn.com/docs/registry/getting-started), and the
[CLI](https://ui.shadcn.com/docs/cli).

Update semantic CSS variables in `app/globals.css` when changing the shared
visual language. Keep prototype pages independent from product-specific shared
state.

## Background

Prototype Playground began as an internal tool for a design and product team. This repository is a separate public rebuild on top of default shadcn/ui, intended to be adapted to other teams and design systems. [Read more](https://jin-su.kim/posts/prototype-playground "jin-su.kim/posts/prototype-playground")
