# Prototype Playground

A shared Next.js playground for creating, browsing, previewing, and sharing UI prototypes.

Each prototype is stored as source code under `src/prototypes/` and receives a permanent URL at `/{owner}/{slug}`. Templates can be previewed before being copied into a new prototype. This is a clean reubild based on the default shadcn/ui component model. The repository is designed so teams can replace the generated components and semantic tokens with their own design system.

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

- A metadata entry in `src/data/metadata.json`.
- A page at `src/prototypes/{owner}/{slug}/page.tsx`.
- A generated entry in `src/prototypes/registry.ts`.

The composite `{owner}:{slug}` identifier connects the metadata entry, URL, and directory on disk.

Templates live under `src/app/templates/{slug}/page.tsx`. The same source is used for template previews and copied into new prototypes.

The generated registry is never edited manually.

## Project Structure

- `src/app/` — routes, layouts, and API handlers.
- `src/components/ui/` — default shadcn components.
- `src/data/` — metadata and public configuration.
- `src/lib/playground/` — metadata, templates, and file operations.
- `src/prototypes/` — standalone prototype source files.
- `.cursor/rules/` — shared agent instructions.

## Customizing the Design System

The playground uses standard shadcn components installed into the repository. To adapt it to your team:

1. Replace or extend components under `src/components/ui/`.

2. Update semantic CSS variables in `src/app/globals.css`.

3. Update the agent rules so agents know which components and tokens to use.

4. Keep prototype pages independent from product-specific shared state.

No private registry, access token, or internal design-system package is required.

## Background

Prototype Playground began as an internal tool for a design and product team. This repository is a separate public rebuild on top of default shadcn/ui, intended to be adapted to other teams and design systems. [Read more](https://jin-su.kim/posts/prototype-playground "jin-su.kim/posts/prototype-playground")
