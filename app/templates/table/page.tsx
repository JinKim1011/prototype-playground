"use client"

import { useState } from "react"
import type { MouseEvent } from "react"
import { usePathname } from "next/navigation"
import data from "./data/data.json"
import { toast } from "@/components/prototypes/sonner"
import { Badge } from "@/components/prototypes/badge"
import { Button } from "@/components/prototypes/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/prototypes/card"
import { Input } from "@/components/prototypes/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/prototypes/table"
import { Typography } from "@/components/prototypes/typography"
import { openInEditor } from "./lib/openInEditor"

export default function TableTemplatePage() {
  const pathname = usePathname()
  const isPreview = pathname.startsWith("/templates/")
  const [query, setQuery] = useState("")

  const filteredRows = data.rows.filter((row) => {
    const searchableText = `${row.id} ${row.name} ${row.owner} ${row.status}`
    return searchableText.toLowerCase().includes(query.toLowerCase())
  })

  async function handleOpenInEditor(event: MouseEvent) {
    event.preventDefault()
    event.stopPropagation()

    try {
      if (isPreview) {
        toast.error("This is template preview mode")
        return
      }

      await openInEditor(window.location.pathname)
      toast.success("Opened Table in editor")
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to open editor"
      )
    }
  }

  function handleRowAction(name: string) {
    toast.success(`Selected ${name}`)
  }

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-10">
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

      <Card>
        <CardHeader className="gap-4 border-b">
          <div className="grid gap-1">
            <CardTitle>All records</CardTitle>
            <CardDescription>
              Search, review, and manage workspace records.
            </CardDescription>
          </div>

          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search records"
            aria-label="Search records"
            className="max-w-sm"
          />
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredRows.length > 0 ? (
                filteredRows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="font-medium">{row.id}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.owner}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          row.status === "Active"
                            ? "default"
                            : row.status === "Review"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {row.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {row.updated}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => handleRowAction(row.name)}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-24 text-center text-muted-foreground"
                  >
                    No records found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  )
}
