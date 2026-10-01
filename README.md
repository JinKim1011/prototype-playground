# Prototype Playground

A shared Next.js playground for creating, browsing, previewing, and sharing UI prototypes.

Each prototype is stored as source code under `prototypes/` and is available at a stable URL based on `/{owner}/{slug}`. Templates can be previewed before being copied into a new prototype. This is a clean rebuild based on the default shadcn/ui component model. The repository is designed so teams can replace the generated components and semantic tokens with their own design system.

- Next.js
- TypeScript
- Tailwind
- shadcn/ui

## Features

- Browse prototypes and templates from a shared playground.
- Open prototypes at `/{owner}/{slug}`.
- Create prototypes from templates, using an existing owner or creating a new owner.
- Create and preview templates at `/templates/{slug}`.
- Copy complete template directories into standalone prototype folders.
- Link to public design-system documentation.
- Keep repository-wide and local agent context next to the project and prototype code.

Creation and deletion flows are intended for local development. They keep filesystem directories, JSON catalogs, and the generated prototype registry synchronized, and roll back partial changes when an operation fails.

## Getting Started

Install dependencies:

`pnpm install`

Start the development server:

`pnpm dev`

Open `http://localhost:3000` in your browser.

## Local Agent Setup

The local owner file is optional application context for agents working on prototypes. Create it once for your workspace:

`cp .cursor/rules/owner.local.mdc.template .cursor/rules/owner.local.mdc`

Set your display name, owner ID, owner slug, and prototype directory in the copied file. The local file is gitignored and is not required to run the application.

## Architecture

A prototype consists of:

- An owner entry in `data/owners.json`.
- A prototype entry in `data/prototypes.json`.
- A page at `prototypes/{owner}/{slug}/page.tsx`.
- A generated entry in `prototypes/registry.ts`.

The composite `{owner}:{slug}` identifier connects the metadata entry, URL, and directory on disk.

Templates live under `app/templates/{slug}/page.tsx`. The same source is used for template previews and copied into new prototypes.

Templates and design-system links are cataloged in `data/templates.json` and `data/design-system.json`. The generated registry is never edited manually.

### Creation Flow

Use the playground controls to create owners, prototypes, and templates. Do not manually update a catalog, create an owner directory, or edit the generated registry as part of normal creation.

When creating a prototype, the playground:

1. Resolves an existing owner or creates a new one.
2. Copies the selected template directory into `prototypes/{owner}/{slug}/`.
3. Updates `data/prototypes.json`.
4. Regenerates `prototypes/registry.ts`.

When creating a template, it copies the blank template into `app/templates/{slug}/` and updates `data/templates.json`. Failed operations roll back partial files and catalog changes.

After creation, edit prototype and template source directly. Catalog and registry updates should go through the playground flow.

## Project Structure

- `app/` — routes and layouts.
- `components/platform/` — components used to build the playground itself.
- `components/platform/shell/` — playground shell and platform-level layout components.
- `components/platform/ui/` — shadcn components used by the playground.
- `components/prototypes/` — shadcn components supplied to prototype authors and consumers.
- `data/` — owner, prototype, template, and design-system catalogs.
- `types/` — TypeScript types for catalog entries and design-system links.
- `lib/` — shared utilities and playground logic.
- `prototypes/` — standalone prototype source files and the generated registry.
- `.cursor/rules/` - shared agent instructions.

## Customizing the Design System

The repository has two component layers:

- `components/platform/` contains the components used to build the playground application.
- `components/prototypes/` contains the components available to prototype authors and consumers.

Playground components use the default `components/platform/ui` destination:

```bash
pnpm dlx shadcn@latest add button
```

Add prototype components explicitly to `components/prototypes`:

```bash
pnpm dlx shadcn@latest add button \
  --path components/prototypes
```

Prototype code should import from `components/prototypes`. Playground code
should import from `components/platform/ui`.

### Installing a Namespaced Registry

Install your team's registry components into components/prototypes:

```bash
pnpm dlx shadcn@latest registry add \
  @team=https://registry.example.com/r/{name}.json

pnpm dlx shadcn@latest add @team/design-system \
  --path components/prototypes
```

Inspect registry items with:

```bash
pnpm dlx shadcn@latest view @team/design-system
```

If required, configure the registry in `components.json` under `registries`.
Keep shared design tokens in `app/globals.css`.

## Background

Prototype Playground began as an internal tool for a design and product team. This repository is a separate public rebuild on top of default shadcn/ui, intended to be adapted to other teams and design systems. [Read more](https://jin-su.kim/posts/prototype-playground "jin-su.kim/posts/prototype-playground")
