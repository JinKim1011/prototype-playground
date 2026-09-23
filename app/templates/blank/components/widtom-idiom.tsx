"use client"

import { useState } from "react"
import { wisdoms } from "../data/wisdoms"
import { Button } from "@/components/prototypes/button"
import { Typography } from "@/components/prototypes/typography"
import { Wisdom } from "../types/wisdom"
import { ArrowClockwiseIcon } from "@phosphor-icons/react/dist/ssr"

export function WisdomIdiom() {
  const [wisdom, setWisdom] = useState<Wisdom>(wisdoms[0])

  function revealFortune() {
    const index = Math.floor(Math.random() * wisdoms.length)
    setWisdom(wisdoms[index])
  }

  return (
    <section className="flex flex-col items-center justify-center gap-5 bg-muted pt-8 pb-6">
      {wisdom && (
        <div className="flex flex-col items-center">
          <Typography variant="body">"{wisdom.message}"</Typography>
          <Typography variant="caption" className="text-muted-foreground">
            {wisdom.author}
          </Typography>
        </div>
      )}
      <Button
        type="button"
        variant="outline"
        onClick={revealFortune}
        className="w-fit"
      >
        <ArrowClockwiseIcon />
        Refresh
      </Button>
    </section>
  )
}
