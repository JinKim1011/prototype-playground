"use client"

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/prototypes/select"
import { Textarea } from "@/components/prototypes/textarea"
import { Typography } from "@/components/prototypes/typography"

export default function IntegrationSettingsPage() {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    toast.success("Integration settings saved")
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
            <CardTitle>{data.content.sectionTitle}</CardTitle>
            <CardDescription>{data.content.sectionDescription}</CardDescription>
          </CardHeader>

          <CardContent className="grid gap-5">
            <div className="grid gap-2">
              <Label htmlFor="provider">Service provider</Label>

              <Select name="provider" defaultValue={data.integration.provider}>
                <SelectTrigger id="provider" className="w-full">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  {data.providers.map((provider) => (
                    <SelectItem key={provider.value} value={provider.value}>
                      {provider.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="endpoint">API endpoint</Label>
              <Input
                id="endpoint"
                name="endpoint"
                defaultValue={data.integration.endpoint}
                placeholder="https://api.example.com"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="notes">Integration notes</Label>
              <Textarea
                id="notes"
                name="notes"
                defaultValue={data.integration.notes}
                placeholder="Add integration notes"
              />
            </div>

            <label className="flex items-start gap-3 border-t pt-4">
              <input
                type="checkbox"
                name="enabled"
                defaultChecked={data.integration.enabled}
                className="mt-0.5 size-4 accent-primary"
              />

              <span className="text-xs font-medium">Enable integration</span>

              <span className="text-xs text-muted-foreground">
                Allow this service to exchange data with the workspace.
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
