"use client"

import type { FormEvent, MouseEvent } from "react"
import { usePathname } from "next/navigation"
import data from "./data/data.json"
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
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/components/prototypes/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/prototypes/select"
import { Typography } from "@/components/prototypes/typography"
import { openInEditor } from "./lib/openInEditor"

export default function OnboardingTemplatePage() {
  const pathname = usePathname()
  const isPreview = pathname.startsWith("/templates/")

  async function handleOpenInEditor(event: MouseEvent) {
    event.preventDefault()
    event.stopPropagation()

    try {
      if (isPreview) {
        toast.error("This is template preview mode")
        return
      }

      await openInEditor(window.location.pathname)
      toast.success("Opened Onboarding in editor")
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to open editor"
      )
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    toast.success("Workspace details saved")
  }

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col gap-8 px-4 py-10">
      <header className="flex items-start justify-between gap-6">
        <div className="grid gap-1">
          <Typography as="h1" variant="heading">
            {data.content.title}
          </Typography>

          <Typography variant="body" className="text-muted-foreground">
            {data.content.description}
          </Typography>
        </div>
      </header>

      <Progress value={data.progress.value}>
        <ProgressLabel>{data.progress.label}</ProgressLabel>
        <ProgressValue />
      </Progress>

      <section className="grid gap-3">
        {data.steps.map((step) => (
          <div
            key={step.number}
            className="flex gap-3 border border-border p-3"
          >
            <div className="flex size-6 shrink-0 items-center justify-center bg-primary text-xs text-primary-foreground">
              {step.number}
            </div>

            <div className="grid gap-1">
              <Typography variant="body-strong">{step.title}</Typography>

              <Typography variant="caption" className="text-muted-foreground">
                {step.description}
              </Typography>
            </div>
          </div>
        ))}
      </section>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Workspace details</CardTitle>
            <CardDescription>
              Add the basic information for your workspace.
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-5">
            <div className="grid gap-2">
              <Label htmlFor="workspace-name">Workspace name</Label>
              <Input
                id="workspace-name"
                name="workspaceName"
                defaultValue={data.fields.workspaceName}
                placeholder="Enter a workspace name"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="team-size">Team size</Label>

              <Select name="teamSize" defaultValue={data.fields.teamSize}>
                <SelectTrigger id="team-size" className="w-full">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="1-10">1-10 members</SelectItem>
                  <SelectItem value="11-50">11-50 members</SelectItem>
                  <SelectItem value="51+">51+ members</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>

          <CardFooter className="justify-end gap-2">
            <Button type="button" variant="outline">
              Back
            </Button>
            <Button type="submit">Continue</Button>
          </CardFooter>
        </Card>
      </form>
    </main>
  )
}
