"use client"

import { useState } from "react"
import { wisdoms } from "../data/wisdoms"
import { Button } from "@/components/prototypes/button"
import { Typography } from "@/components/prototypes/typography"
import { Wisdom } from "../types/wisdom"

export function WisdomIdiom() {
  const [wisdom, setWisdom] = useState<Wisdom | null>(null)

  function revealFortune() {
    const index = Math.floor(Math.random() * wisdoms.length)
    setWisdom(wisdoms[index])
  }

  return (
    <section className="flex flex-col items-center justify-center gap-4 bg-muted pt-8 pb-6">
      {wisdom && (
        <div className="flex flex-col items-center gap-2">
          <Typography variant="label">"{wisdom.message}"</Typography>
          <Typography variant="label-small" className="text-muted-foreground">
            {wisdom.author}
          </Typography>
        </div>
      )}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={revealFortune}
        className="w-fit"
      >
        Give me wisdom
      </Button>
    </section>
  )
}
