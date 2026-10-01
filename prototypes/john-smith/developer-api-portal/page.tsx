"use client"

import { usePathname } from "next/navigation"
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

export default function DeveloperApiPortalPage() {
  const pathname = usePathname()
  const isPreview = pathname.startsWith("/templates/")

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
                Overview
              </Typography>
              <Typography variant="body" className="text-muted-foreground">
                {data.brand.description}
              </Typography>
            </div>

            <Button
              type="button"
              onClick={() => toast.success("Action started")}
            >
              New item
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Content area</CardTitle>
              <CardDescription>
                Replace this area with a dashboard, table, form, or custom
                prototype screen.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="flex min-h-48 items-center justify-center border border-dashed text-center">
                <Typography
                  variant="body"
                  className="max-w-sm text-muted-foreground"
                >
                  This is the primary content area of the application shell.
                </Typography>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}
