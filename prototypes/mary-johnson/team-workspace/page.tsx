"use client"

import data from "./data/data.json"
import { toast } from "@/components/prototypes/sonner"
import { Avatar, AvatarFallback } from "@/components/prototypes/avatar"
import { Button } from "@/components/prototypes/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/prototypes/card"
import { Separator } from "@/components/prototypes/separator"
import { Typography } from "@/components/prototypes/typography"

export default function TeamWorkspacePage() {
  function handleNavigation(label: string) {
    toast.success(`Selected ${label}`)
  }

  return (
    <main className="flex min-h-svh bg-background">
      <aside className="hidden w-60 shrink-0 flex-col border-r md:flex">
        <div className="flex h-14 items-center px-5">
          <Typography variant="body-strong">{data.brand.name}</Typography>
        </div>

        <Separator />

        <nav className="flex flex-1 flex-col gap-1 p-3" aria-label="Main">
          {data.navigation.map((item) => (
            <Button
              key={item.label}
              type="button"
              variant={item.active ? "secondary" : "ghost"}
              className="justify-start"
              onClick={() => handleNavigation(item.label)}
            >
              {item.label}
            </Button>
          ))}
        </nav>

        <div className="border-t p-3">
          <div className="flex items-center gap-3 px-2 py-2">
            <Avatar size="sm">
              <AvatarFallback>{data.user.initials}</AvatarFallback>
            </Avatar>

            <div className="min-w-0">
              <Typography variant="label" className="truncate">
                {data.user.name}
              </Typography>
              <Typography
                variant="caption"
                className="truncate text-muted-foreground"
              >
                {data.user.email}
              </Typography>
            </div>
          </div>
        </div>
      </aside>

      <section className="flex min-w-0 flex-1 flex-col">
        <header className="flex min-h-14 items-center justify-between border-b px-4 md:px-6">
          <div className="md:hidden">
            <Typography variant="body-strong">{data.brand.name}</Typography>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Avatar size="sm">
              <AvatarFallback>{data.user.initials}</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-8 p-4 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div className="grid gap-1">
              <Typography as="h1" variant="heading">
                {data.content.title}
              </Typography>

              <Typography variant="body" className="text-muted-foreground">
                {data.content.description}
              </Typography>
            </div>

            <Button
              type="button"
              onClick={() => toast.success("New project flow started")}
            >
              {data.content.actionLabel}
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{data.content.cardTitle}</CardTitle>
              <CardDescription>{data.content.cardDescription}</CardDescription>
            </CardHeader>

            <CardContent className="grid gap-3">
              {data.projects.map((project) => (
                <div
                  key={project.name}
                  className="flex items-center justify-between border p-3"
                >
                  <div className="grid gap-1">
                    <Typography variant="body-strong">
                      {project.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      className="text-muted-foreground"
                    >
                      {project.type}
                    </Typography>
                  </div>

                  <Typography variant="caption">{project.status}</Typography>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}
