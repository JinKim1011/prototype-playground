"use client"

import data from "./data/data.json"
import { usePathname } from "next/navigation"
import { toast } from "@/components/prototypes/sonner"
import { Button } from "@/components/prototypes/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/prototypes/card"
import { Input } from "@/components/prototypes/input"
import { Label } from "@/components/prototypes/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/prototypes/select"
import { Textarea } from "@/components/prototypes/textarea"
import { Typography } from "@/components/prototypes/typography"
import { openInEditor } from "./lib/openInEditor"

export default function FormTemplatePage() {
  const pathname = usePathname()
  const isPreview = pathname.startsWith("/templates/")

  async function handleOpenInEditor(event: React.MouseEvent) {
    event.preventDefault()
    event.stopPropagation()

    try {
      if (isPreview) {
        toast.error("This is template preview mode")
        return
      }

      await openInEditor(window.location.pathname)
      toast.success("Opened Form in editor")
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to open editor"
      )
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    toast.success("Changes saved")
  }

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-10">
      <header className="flex items-start justify-between gap-6">
        <div className="flex flex-col gap-1">
          <Typography as="h1" variant="heading">
            {data.content.title}
          </Typography>

          <Typography variant="body" className="text-muted-foreground">
            {data.content.description}
          </Typography>
        </div>
      </header>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>General information</CardTitle>
            <CardDescription>
              Add or update the details associated with this profile.
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-5">
            <div className="grid gap-2">
              <Label htmlFor="full-name">Full name</Label>
              <Input
                id="full-name"
                name="fullName"
                defaultValue={data.profile.fullName}
                placeholder="Enter a name"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                defaultValue={data.profile.email}
                placeholder="name@example.com"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select name="category" defaultValue={data.profile.category}>
                <SelectTrigger id="category" className="w-full">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  {data.categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="notes">Additional notes</Label>
              <Textarea
                id="notes"
                name="notes"
                defaultValue={data.profile.notes}
                placeholder="Add supporting information"
              />
            </div>

            <label className="flex items-start gap-3 border-t pt-4">
              <input
                type="checkbox"
                name="notifications"
                defaultChecked={data.profile.notifications}
                className="mt-0.5 size-4 accent-primary"
              />
              <span className="grid gap-1">
                <span className="text-xs font-medium">
                  Enable notifications
                </span>
                <span className="text-xs text-muted-foreground">
                  Receive updates about changes and activity.
                </span>
              </span>
            </label>
          </CardContent>

          <CardFooter className="justify-end gap-2">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit">Save changes</Button>
          </CardFooter>
        </Card>
      </form>
    </main>
  )
}
